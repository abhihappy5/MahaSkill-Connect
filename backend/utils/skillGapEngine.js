// The "SKILL GAP ENGINE" block in the project architecture: takes worker-supply and
// job-demand totals already sitting on a SkillGraphEntry and derives gap / severity /
// a recommended action for each of the three audiences (worker / employer / govt dashboard).

const severityFromRatio = (gap, demand) => {
  if (gap <= 0) return 'none';
  const ratio = demand > 0 ? gap / demand : 1;
  if (ratio >= 0.75) return 'critical';
  if (ratio >= 0.5) return 'high';
  if (ratio >= 0.25) return 'moderate';
  return 'low';
};

const recommendationFor = (entry, gap, severity) => {
  if (gap <= 0) {
    return `${entry.occupation} supply meets or exceeds demand in ${entry.district} — no training push needed.`;
  }
  const nearest = (entry.trainingSupply?.options || [])
    .slice()
    .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity))[0];
  const trainingNote = nearest
    ? `Nearest training: ${nearest.institute || nearest.source}${
        nearest.durationMonths ? ` (${nearest.durationMonths} months)` : ''
      }${nearest.distanceKm != null ? `, ${nearest.distanceKm} km away` : ''}.`
    : 'No nearby training option on record yet — flag for a new ITI/Skill India batch.';
  return `${severity.toUpperCase()} shortage of ${gap} ${entry.occupation}(s) in ${entry.district}. ${trainingNote}`;
};

// Mutates and returns the entry with gap/gapSeverity/recommendedAction/lastComputedAt set.
// Caller is responsible for .save()-ing (or use recomputeAndSave below).
function computeGap(entry) {
  const supply = entry.workerSupply?.total || 0;
  const demand = entry.jobDemand?.total || 0;
  const gap = Math.max(0, demand - supply);
  const gapSeverity = severityFromRatio(gap, demand);

  entry.gap = gap;
  entry.gapSeverity = gapSeverity;
  entry.recommendedAction = recommendationFor(entry, gap, gapSeverity);
  entry.lastComputedAt = new Date();
  return entry;
}

async function recomputeAndSave(entry) {
  computeGap(entry);
  await entry.save();
  return entry;
}

// Recomputes every entry matching filter (e.g. { district: 'raipur' }) in bulk.
async function recomputeMany(SkillGraphEntry, filter = {}) {
  const entries = await SkillGraphEntry.find(filter);
  await Promise.all(entries.map((e) => recomputeAndSave(e)));
  return entries.length;
}

module.exports = { computeGap, recomputeAndSave, recomputeMany };
