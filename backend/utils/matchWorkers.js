// Scores how well a worker's skill list fits one employer WorkerRequirement — the mirror image
// of Job.computeMatch (which scores a *job* against a worker). Used for the "employer advice:
// find workers" step in the project's architecture.
function scoreWorkerMatch(requirement, skillNames = []) {
  const normalized = skillNames.map((s) => s.toLowerCase());
  const wanted = [requirement.occupation, ...(requirement.requiredSkills || [])].filter(Boolean);

  const matching = wanted.filter((w) =>
    normalized.some((u) => w.toLowerCase().includes(u) || u.includes(w.toLowerCase()))
  );
  const missing = wanted.filter((w) => !matching.includes(w));
  const matchScore = wanted.length ? Math.round((matching.length / wanted.length) * 100) : 0;

  return { matchScore, matchingSkills: matching, missingSkills: missing };
}

module.exports = { scoreWorkerMatch };
