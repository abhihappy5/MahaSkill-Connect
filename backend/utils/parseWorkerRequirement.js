// Turns a raw employer utterance ("Mujhe chaaris welder chahiye") into structured fields:
// { requiredWorkers, occupation, urgency, matchedSkills, confidence }.
//
// This is a deliberately simple, rule-based first pass (word-lookup + keyword matching), not a
// full NLP/ASR pipeline — it's meant to pre-fill a WorkerRequirement so an admin/employer only
// has to confirm/correct it, per parseConfidence on the model. Swap in a real LLM/NLU call later
// (see README "What's still worth building next") while keeping this as the offline fallback.

// Hindi number words (1-100, standard spelling). Transliterations vary a lot in casual romanized
// text, so a few common alternate spellings are included per number where they're common.
// NOTE: "chaaris" is included because it's the exact example used in the project brief
// (Chhattisgarhi for "forty"); Chhattisgarhi dialect coverage here is a starter set only —
// extend NUMBER_WORDS as real employer transcripts come in.
const NUMBER_WORDS = {
  ek: 1, ik: 1,
  do: 2,
  teen: 3, tin: 3,
  chaar: 4, char: 4,
  paanch: 5, panch: 5,
  chhah: 6, chhe: 6, che: 6,
  saat: 7, sat: 7,
  aath: 8, ath: 8,
  nau: 9, nou: 9,
  das: 10, dus: 10,
  gyaarah: 11, gyarah: 11,
  baarah: 12, barah: 12,
  pandrah: 15, pandhra: 15,
  bees: 20, bis: 20,
  pachchis: 25, pachees: 25,
  tees: 30, tis: 30,
  paintees: 35,
  chalis: 40, chaalis: 40, chaaris: 40, // "chaaris" — project-brief example (Chhattisgarhi)
  paintalis: 45,
  pachaas: 50, pachas: 50,
  saath: 60,
  sattar: 70,
  assi: 80,
  nabbe: 90,
  sau: 100, sau_ek: 100,
};

// Occupation/skill dictionary — English canonical name mapped to keyword variants
// (English, Hindi/Chhattisgarhi transliteration) to match against free text.
const OCCUPATIONS = {
  Welder: ['welder', 'welding', 'weld'],
  Electrician: ['electrician', 'electrical', 'bijli mistri', 'bijli'],
  Mason: ['mason', 'rajmistri', 'raj mistri', 'mistri'],
  Plumber: ['plumber', 'plumbing', 'nal mistri'],
  Carpenter: ['carpenter', 'badhai', 'sutar'],
  'CNC Operator': ['cnc operator', 'cnc'],
  'Data Entry': ['data entry', 'data operator'],
  Painter: ['painter', 'painting', 'rangsaz'],
  Driver: ['driver', 'gaadi chalak', 'chalak'],
  Tailor: ['tailor', 'darzi'],
  Fitter: ['fitter'],
  Helper: ['helper', 'labour', 'labourer', 'mazdoor'],
};

const URGENCY_KEYWORDS = {
  immediate: ['abhi', 'turant', 'ekdum', 'right now', 'immediately', 'urgent'],
  'this-week': ['is hafte', 'is hafta', 'this week', 'jaldi'],
  'this-month': ['is mahine', 'is mahina', 'this month'],
};

function extractRequiredWorkers(lowerText) {
  // 1) plain digits, e.g. "40 welder chahiye"
  const digitMatch = lowerText.match(/\b(\d{1,4})\b/);
  if (digitMatch) return { count: parseInt(digitMatch[1], 10), confidence: 40 };

  // 2) a known number word
  const words = lowerText.replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean);
  for (const w of words) {
    if (NUMBER_WORDS[w] != null) return { count: NUMBER_WORDS[w], confidence: 35 };
  }
  return { count: null, confidence: 0 };
}

function extractOccupation(lowerText) {
  for (const [canonical, variants] of Object.entries(OCCUPATIONS)) {
    if (variants.some((v) => lowerText.includes(v))) {
      return { occupation: canonical, confidence: 40 };
    }
  }
  return { occupation: null, confidence: 0 };
}

function extractUrgency(lowerText) {
  for (const [level, variants] of Object.entries(URGENCY_KEYWORDS)) {
    if (variants.some((v) => lowerText.includes(v))) return level;
  }
  return 'flexible';
}

// Main entry point. `text` is the raw utterance/message; `lang` is a hint only ('hi' | 'cg' | 'en' | 'mr').
function parseWorkerRequirement(text, lang = 'hi') {
  const lowerText = (text || '').toLowerCase().trim();

  const { count: requiredWorkers, confidence: workerConfidence } = extractRequiredWorkers(lowerText);
  const { occupation, confidence: occupationConfidence } = extractOccupation(lowerText);
  const urgency = extractUrgency(lowerText);

  // Confidence is a simple average of what we managed to extract — not a probability, just a
  // signal for how much an admin/employer should double-check the auto-filled requirement.
  const confidence = Math.round((workerConfidence + occupationConfidence) / 2) || 0;

  return {
    requiredWorkers: requiredWorkers || undefined,
    occupation: occupation || undefined,
    urgency,
    confidence,
    rawInput: { text, lang },
    needsReview: confidence < 50 || !requiredWorkers || !occupation,
  };
}

module.exports = { parseWorkerRequirement, NUMBER_WORDS, OCCUPATIONS };
