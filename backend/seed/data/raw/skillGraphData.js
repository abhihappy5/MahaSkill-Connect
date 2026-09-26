// Demo rows for the district-wise skill graph — reproduces the worked example from the
// project brief (Raipur district: Electrician/Welder/CNC operator/Data entry demand-vs-supply
// table) so the skill gap engine has something real to compute against out of the box.
// Replace/extend via PUT /api/skill-graph/:district/:occupation as real e-Shram/PLFS/NCS/
// DGT-ITI dataset imports come online.

const skillGraphSeedData = [
  {
    district: 'raipur',
    division: 'Raipur',
    occupation: 'Electrician',
    workerSupply: {
      total: 6500,
      breakdown: [{ source: 'e-Shram', value: 5200, asOf: new Date('2025-04-01') }, { source: 'PLFS', value: 1300, asOf: new Date('2025-01-01') }],
    },
    jobDemand: {
      total: 9200,
      demandLevel: 'high',
      breakdown: [{ source: 'NCS', value: 6100, asOf: new Date('2025-06-01') }, { source: 'District Skill Development Plan', value: 3100, asOf: new Date('2025-03-01') }],
    },
    trainingSupply: {
      totalSeats: 420,
      options: [
        { source: 'DGT/ITI', institute: 'Govt ITI Raipur', courseName: 'Electrician (NCVT)', durationMonths: 24, seatsAvailable: 240, distanceKm: 4, hasApprenticeship: true },
        { source: 'Skill India Digital Hub', institute: 'PMKVY Raipur Centre', courseName: 'Electrician Trade', durationMonths: 6, seatsAvailable: 180, distanceKm: 9 },
      ],
    },
  },
  {
    district: 'raipur',
    division: 'Raipur',
    occupation: 'Welder',
    workerSupply: {
      total: 1800,
      breakdown: [{ source: 'e-Shram', value: 1300, asOf: new Date('2025-04-01') }, { source: 'Census', value: 500, asOf: new Date('2024-01-01') }],
    },
    jobDemand: {
      total: 5400,
      demandLevel: 'very-high',
      breakdown: [{ source: 'NCS', value: 3900, asOf: new Date('2025-06-01') }, { source: 'State Skill Gap Report', value: 1500, asOf: new Date('2025-02-01') }],
    },
    trainingSupply: {
      totalSeats: 150,
      options: [
        { source: 'DGT/ITI', institute: 'Govt ITI Raipur', courseName: 'Welder (NCVT)', durationMonths: 12, seatsAvailable: 90, distanceKm: 4, hasApprenticeship: true },
        { source: 'Apprenticeship India/NAPS', institute: 'NAPS Raipur Industrial Cluster', courseName: 'Welding Apprenticeship', durationMonths: 12, seatsAvailable: 60, distanceKm: 18, hasApprenticeship: true },
      ],
    },
  },
  {
    district: 'raipur',
    division: 'Raipur',
    occupation: 'CNC Operator',
    workerSupply: {
      total: 320,
      breakdown: [{ source: 'e-Shram', value: 320, asOf: new Date('2025-04-01') }],
    },
    jobDemand: {
      total: 2100,
      demandLevel: 'high',
      breakdown: [{ source: 'NCS', value: 1500, asOf: new Date('2025-06-01') }, { source: 'EPFO', value: 600, asOf: new Date('2025-05-01') }],
    },
    trainingSupply: {
      totalSeats: 60,
      options: [
        { source: 'DGT/ITI', institute: 'Govt ITI Raipur', courseName: 'CNC Machining', durationMonths: 9, seatsAvailable: 60, distanceKm: 4 },
      ],
    },
  },
  {
    district: 'raipur',
    division: 'Raipur',
    occupation: 'Data Entry',
    workerSupply: {
      total: 8800,
      breakdown: [{ source: 'e-Shram', value: 6000, asOf: new Date('2025-04-01') }, { source: 'UDISE+', value: 2800, asOf: new Date('2025-01-01') }],
    },
    jobDemand: {
      total: 4200,
      demandLevel: 'medium',
      breakdown: [{ source: 'NCS', value: 4200, asOf: new Date('2025-06-01') }],
    },
    trainingSupply: {
      totalSeats: 500,
      options: [
        { source: 'Skill India Digital Hub', institute: 'PMKVY Raipur Centre', courseName: 'Data Entry Operator', durationMonths: 3, seatsAvailable: 500, distanceKm: 9 },
      ],
    },
  },
];

module.exports = { skillGraphSeedData };
