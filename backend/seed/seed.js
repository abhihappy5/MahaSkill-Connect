// Populates MongoDB from the same content that ships in the React frontend's src/data/*.js files
// (converted at build time into seed/data/raw/*.js — see that folder's note below).
// Run:   npm run seed          -> import
//        npm run seed:destroy  -> wipe all collections
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const Course = require('../models/Course');
const Job = require('../models/Job');
const SuccessStory = require('../models/SuccessStory');
const District = require('../models/District');
const TrendingCareer = require('../models/TrendingCareer');
const EmergingSkill = require('../models/EmergingSkill');
const FaqEntry = require('../models/FaqEntry');
const SkillGraphEntry = require('../models/SkillGraphEntry');
const { recomputeAndSave } = require('../utils/skillGapEngine');

const { mahaCoursesData } = require('./data/raw/coursesData.js');
const { mockJobsData } = require('./data/raw/jobSeekerData.js');
const { studentCampusJobs } = require('./data/raw/studentData.js');
const { restartJobsToday, restartJobsUnlocked } = require('./data/raw/careerRestartData.js');
const { successStoriesData } = require('./data/raw/successStoriesData.js');
const { adminDistrictIntelligence } = require('./data/raw/adminDashboardData.js');
const { trendingCareersData } = require('./data/raw/careersData.js');
const { emergingSkillsData } = require('./data/raw/emergingSkillsData.js');
const { assistantKnowledgeBase } = require('./data/raw/faqAssistantData.js');
const { skillGraphSeedData } = require('./data/raw/skillGraphData.js');

const mapCourse = (c) => ({
  title: c.title,
  provider: c.provider,
  district: c.district,
  division: c.division,
  sector: c.sector,
  duration: c.duration,
  fee: c.fee,
  stipend: c.stipend,
  eligibility: c.eligibility,
  placementRate: c.placementRate,
  nsqfLevel: c.nsqfLevel,
  rating: c.rating,
  reviewsCount: c.reviewsCount,
  seatsAvailable: c.seatsAvailable,
  skills: c.skills,
  description: c.description,
  audience: ['public', 'student'],
});

const mapJob = (j, audience) => ({
  title: j.title,
  titleMr: j.titleMr,
  company: j.company,
  companyLogo: j.companyLogo,
  location: j.location,
  district: j.district || (j.location || '').split('(')[0].trim(),
  salary: j.salary || j.stipend,
  experience: j.experience || j.type,
  industry: j.industry || 'General',
  workType: j.workType || j.type,
  applicantsCount: j.applicantsCount || j.interviewsScheduled || 0,
  isGovtPartner: j.isGovtPartner ?? true,
  requiredSkills: j.requiredSkills || [],
  jobDescription: j.jobDescription || j.whyEligible || j.whyUnlocked || '',
  interviewPreparationTips: j.interviewPreparationTips || '',
  audience: ['public', audience],
});

const mapStory = (s) => ({
  name: s.name, nameMr: s.nameMr, nameHi: s.nameHi,
  district: s.district, districtMr: s.districtMr, districtHi: s.districtHi,
  role: s.role, roleMr: s.roleMr, roleHi: s.roleHi,
  company: s.company, background: s.background,
  category: s.category, categoryMr: s.categoryMr, categoryHi: s.categoryHi,
  quote: s.quote, quoteMr: s.quoteMr, quoteHi: s.quoteHi,
  initialIncome: s.initialIncome, placedSalary: s.placedSalary,
  verifiedScheme: s.verifiedScheme, badge: s.badge,
});

const mapDistrict = (key, d) => ({
  key,
  name: d.name, nameMr: d.nameMr, nameHi: d.nameHi,
  division: d.division, demandStatus: d.demandStatus,
  topIndustries: d.topIndustries, topSkills: d.topSkills, skillShortages: d.skillShortages,
  currentCapacity: d.currentCapacity, estimatedDemand: d.estimatedDemand, gap: d.gap,
  placementRate: d.placementRate, employerDemandIndex: d.employerDemandIndex,
  activeITIs: d.activeITIs, privateTrainingPartners: d.privateTrainingPartners,
  recommendedAction: d.recommendedAction,
});

const mapCareer = (c) => ({
  slug: c.id, title: c.title, titleMr: c.titleMr, titleHi: c.titleHi,
  sector: c.sector, sectorKey: c.sectorKey, demandLevel: c.demandLevel, growth: c.growth,
  avgSalary: c.avgSalary, experienceLevel: c.experienceLevel, availableCourses: c.availableCourses,
  openingsMaharashtra: c.openingsMaharashtra, requiredSkills: c.requiredSkills, topDistricts: c.topDistricts,
  description: c.description, careerPathway: c.careerPathway, govtScheme: c.govtScheme,
});

const mapEmergingSkill = (s) => ({
  slug: s.id, title: s.title, titleMr: s.titleMr, titleHi: s.titleHi, iconName: s.iconName,
  growth: s.growth, vacancies: s.vacancies, keyFocusAreas: s.keyFocusAreas, targetHubs: s.targetHubs,
  leadPartners: s.leadPartners, stipendEligibility: s.stipendEligibility,
  recommendedCertification: s.recommendedCertification,
});

const mapFaq = (lang, entries) => entries.map((e) => ({ lang, keywords: e.keywords, response: e.response }));

const importData = async () => {
  await connectDB();

  await Promise.all([
    Course.deleteMany(), Job.deleteMany(), SuccessStory.deleteMany(),
    District.deleteMany(), TrendingCareer.deleteMany(), EmergingSkill.deleteMany(), FaqEntry.deleteMany(),
    SkillGraphEntry.deleteMany(),
  ]);

  await Course.insertMany(mahaCoursesData.map(mapCourse));
  await Job.insertMany([
    ...mockJobsData.map((j) => mapJob(j, 'jobseeker')),
    ...studentCampusJobs.map((j) => mapJob(j, 'student')),
    ...restartJobsToday.map((j) => mapJob(j, 'restart')),
    ...restartJobsUnlocked.map((j) => mapJob(j, 'restart')),
  ]);
  await SuccessStory.insertMany(successStoriesData.map(mapStory));
  await District.insertMany(Object.entries(adminDistrictIntelligence).map(([key, d]) => mapDistrict(key, d)));
  await TrendingCareer.insertMany(trendingCareersData.map(mapCareer));
  await EmergingSkill.insertMany(emergingSkillsData.map(mapEmergingSkill));
  await FaqEntry.insertMany([
    ...mapFaq('en', assistantKnowledgeBase.en),
    ...mapFaq('mr', assistantKnowledgeBase.mr),
    ...mapFaq('hi', assistantKnowledgeBase.hi),
  ]);

  const skillGraphEntries = await SkillGraphEntry.insertMany(skillGraphSeedData);
  await Promise.all(skillGraphEntries.map((e) => recomputeAndSave(e))); // populate gap/gapSeverity/recommendedAction

  console.log('[seed] Data imported successfully');
  process.exit(0);
};

const destroyData = async () => {
  await connectDB();
  await Promise.all([
    Course.deleteMany(), Job.deleteMany(), SuccessStory.deleteMany(),
    District.deleteMany(), TrendingCareer.deleteMany(), EmergingSkill.deleteMany(), FaqEntry.deleteMany(),
    SkillGraphEntry.deleteMany(),
  ]);
  console.log('[seed] Data destroyed');
  process.exit(0);
};

if (process.argv[2] === '-d') destroyData();
else importData();
