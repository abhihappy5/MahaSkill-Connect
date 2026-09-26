# MahaSkill Connect — Backend API

Node.js + Express + MongoDB (Mongoose) REST API for the MahaSkill Connect frontend
(public site, Student Portal, Job Seeker Portal, Career Restart Portal, Admin Portal, Unified AI Assistant).

## Stack
Express 4, Mongoose 8, JWT auth (httpOnly cookie + Bearer token), bcryptjs, helmet, cors, morgan, express-rate-limit.

## Setup
```bash
cd backend
npm install
cp .env.example .env      # fill in MONGO_URI and JWT_SECRET
npm run seed               # loads reference/demo data (see below)
npm run dev                 # nodemon, http://localhost:5000
```

## Folder structure
```
config/db.js            Mongo connection
models/                 Mongoose schemas (12 models)
controllers/             Route handlers, one file per resource
routes/                  Express routers, one file per resource
middleware/auth.js        protect / authorize / optionalAuth
middleware/errorHandler.js  Central error + 404 handler
utils/generateToken.js     JWT signing + cookie response helper
seed/seed.js               Imports seed/data/raw/*.js into MongoDB
seed/data/raw/*.js          Your existing frontend src/data/*.js files, auto-converted
                            from `export const` to `module.exports` — same content,
                            just require()-able from Node. Regenerate by re-running the
                            conversion whenever you update a frontend data file (see below).
```

## Data model → frontend mapping
| Model | Frontend component(s) it feeds |
|---|---|
| `User` | Auth, Header, AuthModal (role now includes `employer`) |
| `StudentProfile` | StudentDashboard, RestartSkillGap-style widgets |
| `CandidateProfile` | JobSeekerDashboard |
| `RestartProfile` | CareerRestartDashboard, RestartSkillGap, TransferableSkillsMap |
| `EmployerProfile` | Employer dashboard (company details, requirements posted/hired counters) |
| `WorkerRequirement` | Employer "post a requirement" flow (form or voice/text), govt-dashboard demand feed |
| `Course` | PublicCoursesView, StudentDashboard course cards |
| `Job` | PublicJobsView, TrendingCareers, JobSeekerDashboard, RestartJobsOpportunities, StudentDashboard campus jobs |
| `Application` | JobSeekerDashboard "My Applications" tracker |
| `District` | SkillDemandMap, AdminDashboard district intelligence |
| `SkillGraphEntry` | Hyperlocal skill-gap view — district × occupation worker-supply/job-demand/training-supply + gap engine |
| `TrendingCareer` | TrendingCareers homepage section |
| `EmergingSkill` | EmergingSkills homepage section |
| `SuccessStory` | SuccessStories homepage section |
| `FaqEntry` / `ChatLog` | UnifiedAiModal / VoiceInteractionOverlay / floating "Ask MahaSkill Connect" button |

## Employer ↔ worker database layer
This implements the brief: *"database should take input, user can be employer or employee"* plus
the government-data skill-gap architecture (worker supply → job demand → training supply → skill
gap engine).

- **`User.role`** now includes `employer` alongside `student | jobseeker | restart | admin`.
  Registering with `role: "employer"` auto-creates an empty `EmployerProfile`, same pattern as the
  other roles.
- **`EmployerProfile`** — company/establishment info (name, industry, district, GST, verified flag,
  running counters for requirements posted / workers hired).
- **`WorkerRequirement`** — one employer "I need N workers of skill X" ask. Two ways in:
  - `POST /api/employer/requirements` — structured form (`district, occupation, requiredWorkers,
    requiredSkills?, salary?, experience?, urgency?`).
  - `POST /api/employer/requirements/voice` — raw utterance, e.g. `{ text: "Mujhe chaaris welder
    chahiye", district: "raipur", lang: "cg" }`. `utils/parseWorkerRequirement.js` turns Hindi/
    Chhattisgarhi number-words and occupation keywords into the structured fields (this is the
    "chaaris → 40" example from the brief), tagging `parseConfidence` so low-confidence parses can
    be queued for human review instead of silently trusting the NLP guess.
  - `GET /api/employer/requirements/me`, `PUT /api/employer/requirements/:id` (employer, own
    records) and `GET /api/employer/requirements` (admin, all employers — the demand-side feed for
    the govt dashboard).
  - `GET /api/employer/requirements/:id/candidates` — "employer advice: find workers". Scores
    every jobseeker/student/restart user in the requirement's district against its
    occupation/requiredSkills (`utils/matchWorkers.js`, the mirror of `Job.computeMatch`) and
    returns them ranked by match score.
- **`SkillGraphEntry`** — the "your data layer" row for one `(district, occupation)` pair:
  `workerSupply` (e-Shram/PLFS/Census/UDISE+), `jobDemand` (NCS/EPFO/DSDPs/State Skill Gap Reports),
  `trainingSupply` (DGT/ITI, Skill India Digital Hub, PMKVY, NAPS apprenticeships) — each figure
  tagged with which government source it came from.
  - `GET /api/skill-graph?district=&occupation=` — the demand-vs-supply table (public).
  - `GET /api/skill-graph/:district` — one district's full graph + count of critical shortages.
  - `PUT /api/skill-graph/:district/:occupation` (admin) — upsert one row, e.g. when importing a
    fresh e-Shram/NCS/DGT dataset; recomputes the gap engine for that row automatically.
  - `POST /api/skill-graph/recompute?district=` (admin) — bulk recompute after a batch import.
  - `GET /api/skill-graph/:district/recommend` — "worker advice: training path". Every tracked
    occupation in the district ranked by shortage severity with its nearest training option; when
    called by a logged-in student/jobseeker/restart user, each occupation is tagged
    `alreadyQualified` against their stored skills.
- **Skill gap engine** (`utils/skillGapEngine.js`) — `gap = max(0, jobDemand.total -
  workerSupply.total)`, a `gapSeverity` (`none/low/moderate/high/critical`) from the gap-to-demand
  ratio, and a human-readable `recommendedAction` that points at the nearest training option on
  file (or flags that none exists yet). This is deliberately a simple, transparent formula — swap
  in a weighted/ML model later without changing the schema or API shape.
- Seeded with the brief's own worked example: Raipur district × {Electrician, Welder, CNC
  Operator, Data Entry} (`seed/data/raw/skillGraphData.js`), so `npm run seed` gives you real
  gap-engine output (e.g. Welder comes out as a "high" shortage) out of the box.

Translations (`translations.js`) stay a **frontend-only** static file — there's no
per-user editable content in it, so there's nothing for the backend to serve there.

## Auth
- `POST /api/auth/register` `{ name, email, password, phone?, role, district?, preferredLang? }`
  — `role` is `student | jobseeker | restart | employer` (never `admin` from public signup).
- `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `PUT /api/auth/me`, `PUT /api/auth/password`
- JWT is returned in the JSON body **and** set as an httpOnly cookie, so both a mobile app
  (Bearer token) and the web app (cookie, `credentials: 'include'`) work against the same API.

## Endpoints (all under `/api`)
```
auth/            register, login, logout, me
users/           profile (own role-profile), admin list/get/status
courses/         list, get, admin CRUD, student enroll
jobs/            list (auto match-scored if logged in), get, admin CRUD
applications/    apply, my applications, withdraw, admin list + status update
districts/       list, get, admin upsert
careers/         trending list/get, emerging-skills list, admin upsert
success-stories/ list, admin CRUD
restart/         transition-map, jobs (today/unlocked), learning-path step update
admin/           kpis, district-intelligence, applications-funnel, user-breakdown
ai/               chat, chat/:id, faq (admin add)
employer/        profile (get/update), requirements (post form/voice, list mine, update,
                  find-candidates, admin list-all)
skill-graph/     district×occupation supply/demand/training table, worker recommend, admin
                  upsert + recompute
```

## What's complete
- Full auth (register/login/JWT/roles), password change, profile self-service.
- Role-scoped profile models for all three portals (student / jobseeker / restart), matching
  every field your dashboards currently render from mock data.
- Courses + Jobs with real filtering, text search, pagination, and a live skill-match scorer
  (`Job.computeMatch`) that replaces the hardcoded `matchScore`/`matchingSkills`/`missingSkills`
  in `jobSeekerData.js` with a real calculation against the logged-in user's stored skills.
- Applications with a status/stage pipeline (Applied → Shortlisted → Interview → Selected/Rejected).
- District intelligence, trending careers, emerging skills, success stories — public read
  endpoints + admin write endpoints.
- Admin KPIs computed live from real collections (users, courses, jobs, applications) plus
  the seeded district-gap data, instead of the static numbers in `adminDashboardData.js`.
- A working (if intentionally simple) AI assistant endpoint: keyword-matches the message
  against a `FaqEntry` knowledge base seeded from `faqAssistantData.js`, and logs every
  exchange to `ChatLog` so real questions can be reviewed and turned into new FAQ entries.
- A one-command seed script that imports your actual `coursesData`, `jobSeekerData`,
  `studentData`, `careerRestartData`, `successStoriesData`, `adminDashboardData`,
  `careersData`, `emergingSkillsData`, and `faqAssistantData` files straight into MongoDB.
- Centralized error handling, role-based route guards, rate limiting, helmet, CORS allowlist.

## What's still worth building next
- **Real AI**: swap `aiController.chat`'s keyword matcher for an actual LLM call (Anthropic/OpenAI),
  keeping the same `FaqEntry` data as retrieval context (RAG) instead of exact-match fallback.
  `unifiedAiData.js`'s `generateStructuredAiResponse` already shows the structured-response shape
  (recommendation, whyRecommended[], supportingData, relevantSkills, nextAction) the frontend expects —
  worth having the LLM return that same JSON shape.
- **File uploads**: resume upload (jobseeker), DigiLocker certificate verification (student),
  company logos (admin) — none of that exists yet; needs multer + S3/Cloudinary or similar.
- **Notifications**: interview reminders, application status changes, new-course alerts — no
  email/SMS/push integration yet.
- **Admin write surface for course/skill health tables**: `courseHealthTableData`,
  `curriculumGapAnalyses`, `trainingCapacityData`, `employerSignalsData`,
  `emergingSkillsRadarData`, `placementFunnelData` from `adminDashboardData.js` aren't modeled
  yet — same pattern as `District`/`TrendingCareer`, just not built out.
- **Full 36-district dataset**: only the 7 districts with intelligence data in
  `adminDashboardData.js` are seeded; `districtsData.js`'s full name/division list (36 districts,
  6 divisions) can be seeded as lightweight `District` records too.
- **Payments/scheme verification**: none of the "100% Free", "State Subsidized" scheme
  claims are backed by a real verification workflow — currently just descriptive text.
- **Tests**: no automated tests yet (Jest + supertest + `mongodb-memory-server` would be the
  natural setup — this sandbox couldn't reach the Mongo binary download to run that here).
- **Deployment config**: no Dockerfile / CI pipeline / production logging (e.g. Winston) yet.
- **Refresh tokens**: current JWT is a single long-lived token; no rotation/refresh-token flow.

## Validation done in this sandbox
No outbound MongoDB was reachable here, so I couldn't run a live end-to-end request, but I did:
- `node --check` every file (routes/controllers/models/seed data) — all parse clean.
- `npm install` for real, then `require()`d every model and every route file — this is a real
  test, because Express throws immediately if a route handler is `undefined`, so a clean
  `require()` of all 11 route files confirms every controller export is wired correctly.
- Converted and dry-ran the seed data transforms against your actual uploaded `*.js` files
  (not placeholder data) to make sure the field names in the mappers match reality.

Recommended before you trust it fully: `npm run seed` against a real Mongo instance, then hit
`GET /api/health`, `POST /api/auth/register`, and `GET /api/courses` to confirm end-to-end.
