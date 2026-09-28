export const adminKpisData = {
  highDemandSkills: {
    value: "42 Clusters",
    subtext: "+48% YoY hiring across 36 districts",
    trend: "+12.4%",
    status: "positive",
    indicator: "Labour Market Data Q3 2026"
  },
  skillShortages: {
    value: "18 Critical",
    subtext: "Acute gaps in BMS, SCADA & 5-Axis CNC",
    trend: "+4 new shortages",
    status: "warning",
    indicator: "Employer Survey Index"
  },
  oversuppliedCourses: {
    value: "6 Trades",
    subtext: "Below 32% placement (DTP, Manual Drafting)",
    trend: "-14% Placement YoY",
    status: "danger",
    indicator: "DVET Placement Audit"
  },
  trainingCapacityGap: {
    value: "-14,850 Seats",
    subtext: "Demand: 48,200 vs Sanctioned: 33,350",
    trend: "-30.8% Deficit",
    status: "danger",
    indicator: "State Capacity Heatmap"
  },
  placementRate: {
    value: "78.4%",
    subtext: "Target: 85.0% | +6.2% vs FY25",
    trend: "+6.2%",
    status: "positive",
    indicator: "DigiLocker Verified"
  },
  employerSatisfaction: {
    value: "4.4 / 5.0",
    subtext: "Surveyed across 1,840 Maharashtra MSMEs",
    trend: "+0.3 pts",
    status: "positive",
    indicator: "CII / MCCIA Feedback"
  }
};

export const adminDistrictIntelligence = {
  pune: {
    name: "Pune",
    nameMr: "पुणे",
    nameHi: "पुणे",
    division: "Pune Division",
    demandStatus: "high-demand",
    topIndustries: ["EV & Auto Manufacturing", "IT & AI Services", "Precision Engineering", "Biotech"],
    topSkills: ["EV Powertrain & BMS", "PLC & Industrial Robotics", "Python & Prompt Engineering", "CAD/CAM"],
    skillShortages: ["Lithium BMS Diagnostics", "SCADA Telemetry", "ROS Robotics"],
    currentCapacity: 1240,
    estimatedDemand: 1890,
    gap: -650,
    placementRate: "84.2%",
    employerDemandIndex: "94 / 100",
    activeITIs: 28,
    privateTrainingPartners: 44,
    recommendedAction: "Increase EV & Robotics Sanctioned Seats by 650 under Pramod Mahajan Phase-IV."
  },
  mumbai: {
    name: "Mumbai & Thane",
    nameMr: "मुंबई आणि ठाणे",
    nameHi: "मुंबई और ठाणे",
    division: "Konkan Division",
    demandStatus: "high-demand",
    topIndustries: ["Fintech & Banking", "Data Center Cloud", "Pharma API", "Maritime Logistics"],
    topSkills: ["Cloud Security / DevSecOps", "AI & NLP Annotation", "Cleanroom GMP", "Cold Chain Logistics"],
    skillShortages: ["Zero-Trust Cyber Defense", "RAG & Vector AI", "Pharma HPLC Validation"],
    currentCapacity: 1850,
    estimatedDemand: 2420,
    gap: -570,
    placementRate: "88.6%",
    employerDemandIndex: "96 / 100",
    activeITIs: 22,
    privateTrainingPartners: 68,
    recommendedAction: "Establish State Cyber Defense CoE in BKC and expand Pharma Quality Testing Labs in Tarapur."
  },
  aurangabad: {
    name: "Chhatrapati Sambhaji Nagar",
    nameMr: "छत्रपती संभाजीनगर",
    nameHi: "छत्रपति संभाजीनगर",
    division: "Marathwada Division",
    demandStatus: "shortage",
    topIndustries: ["AURIC Smart City", "Automotive Components", "Specialty Steel", "Pharma Formulations"],
    topSkills: ["Tool & Die CNC", "Smart Factory Maintenance", "Pharma QC", "Solar Grid Inverters"],
    skillShortages: ["5-Axis CNC Programming", "SCADA Calibration", "USFDA Compliance"],
    currentCapacity: 620,
    estimatedDemand: 1180,
    gap: -560,
    placementRate: "72.4%",
    employerDemandIndex: "88 / 100",
    activeITIs: 14,
    privateTrainingPartners: 18,
    recommendedAction: "Upgrade Waluj ITI to Indo-German Tool Room Precision Center; sanction 400 new CNC/CAD seats."
  },
  nagpur: {
    name: "Nagpur",
    nameMr: "नागपूर",
    nameHi: "नागपुर",
    division: "Vidarbha Division",
    demandStatus: "emerging",
    topIndustries: ["MIHAN Aerospace & MRO", "Multi-Modal Cargo Logistics", "Solar Green Energy", "Mining Heavy Equipment"],
    topSkills: ["Aviation MRO Avionics", "Warehouse Management WMS", "Solar Farm Commissioning", "Hydraulics"],
    skillShortages: ["Aerospace Composite Repair", "Automated Cargo Telematics", "High-Voltage Solar Inverters"],
    currentCapacity: 540,
    estimatedDemand: 980,
    gap: -440,
    placementRate: "76.8%",
    employerDemandIndex: "82 / 100",
    activeITIs: 16,
    privateTrainingPartners: 22,
    recommendedAction: "Partner with Boeing/Air India MRO for specialized aerospace avionics apprenticeship cohort."
  },
  nashik: {
    name: "Nashik",
    nameMr: "नाशिक",
    nameHi: "नासिक",
    division: "Nashik Division",
    demandStatus: "emerging",
    topIndustries: ["Defense & Aeronautics (HAL)", "Automotive Electricals", "Wine & Agritech", "Food Processing"],
    topSkills: ["Defense Electronics Wire Harnessing", "BLDC Motor Testing", "Cold Storage Telemetry", "Food Quality Assurance"],
    skillShortages: ["MIL-STD Harnessing", "Dynamometer Motor Testing", "Export HACCP Audit"],
    currentCapacity: 480,
    estimatedDemand: 790,
    gap: -310,
    placementRate: "74.1%",
    employerDemandIndex: "79 / 100",
    activeITIs: 12,
    privateTrainingPartners: 16,
    recommendedAction: "Establish Joint HAL-DVET Defense Electronics Training Cell at Ozar."
  },
  solapur: {
    name: "Solapur",
    nameMr: "सोलापूर",
    nameHi: "सोलापुर",
    division: "Pune Division",
    demandStatus: "shortage",
    topIndustries: ["Solar PV Mega Farms", "Technical Textiles", "Sugar Machinery", "Automated Looms"],
    topSkills: ["Solar Microgrid Maintenance", "Rapier Loom Electronics", "BESS Battery Storage", "Drip Automation"],
    skillShortages: ["Solar Inverter Net-Metering", "Electronic Shuttleless Loom Troubleshooting"],
    currentCapacity: 320,
    estimatedDemand: 680,
    gap: -360,
    placementRate: "69.5%",
    employerDemandIndex: "74 / 100",
    activeITIs: 9,
    privateTrainingPartners: 11,
    recommendedAction: "Deploy Surya Mitra Mobile Training Labs across Sangola and Pandharpur tehsils."
  },
  amravati: {
    name: "Amravati",
    nameMr: "अमरावती",
    nameHi: "अमरावती",
    division: "Amravati Division",
    demandStatus: "emerging",
    topIndustries: ["Textile Mega Parks", "Ginning & Spinning", "Citrus & Agro-Processing", "Solar Rooftop"],
    topSkills: ["Automated Loom Maintenance", "Modern Harvester Diagnostics", "Micro-Inverter Setup", "Organic Certification"],
    skillShortages: ["Air-Jet Spinning Machine Maintenance", "Harvester Telematics", "Solar Cold Storage"],
    currentCapacity: 380,
    estimatedDemand: 720,
    gap: -340,
    placementRate: "71.8%",
    employerDemandIndex: "76 / 100",
    activeITIs: 11,
    privateTrainingPartners: 14,
    recommendedAction: "Establish Textile Technology Center of Excellence at Nandgaon Peth MIDC."
  }
};

export const courseHealthTableData = [
  {
    id: "crs-h-1",
    name: "EV Powertrain & Battery Diagnostic Specialist",
    sector: "EV & Automotive",
    demandLevel: "Surging (+52%)",
    placementRate: "89.4%",
    curriculumFreshness: "Updated 2026",
    trainerReadiness: "84% Certified",
    equipmentReadiness: "78% Modern",
    status: "Emerging Demand",
    statusKey: "emerging",
    annualEnrollment: 1420
  },
  {
    id: "crs-h-2",
    name: "Industrial Robotics & Automation Cell Tech",
    sector: "Advanced Manufacturing",
    demandLevel: "High (+38%)",
    placementRate: "82.1%",
    curriculumFreshness: "Updated 2025",
    trainerReadiness: "76% Certified",
    equipmentReadiness: "68% Modern",
    status: "Aligned",
    statusKey: "aligned",
    annualEnrollment: 1850
  },
  {
    id: "crs-h-3",
    name: "Traditional Manual DTP & Offset Desktop Publishing",
    sector: "Media & Printing",
    demandLevel: "Declining (-34%)",
    placementRate: "28.5%",
    curriculumFreshness: "Outdated (2018)",
    trainerReadiness: "45% Certified",
    equipmentReadiness: "40% Legacy",
    status: "Oversupplied",
    statusKey: "oversupplied",
    annualEnrollment: 2400
  },
  {
    id: "crs-h-4",
    name: "Solar PV Micro-Grid & Inverter Technician",
    sector: "Green Energy",
    demandLevel: "Surging (+44%)",
    placementRate: "86.2%",
    curriculumFreshness: "Updated 2026",
    trainerReadiness: "88% Certified",
    equipmentReadiness: "82% Modern",
    status: "Aligned",
    statusKey: "aligned",
    annualEnrollment: 1650
  },
  {
    id: "crs-h-5",
    name: "Conventional Manual Drafting & Tracing",
    sector: "Civil & Architecture",
    demandLevel: "Critical Decline (-52%)",
    placementRate: "22.0%",
    curriculumFreshness: "Outdated (2016)",
    trainerReadiness: "38% Certified",
    equipmentReadiness: "30% Legacy",
    status: "Review Required",
    statusKey: "review",
    annualEnrollment: 1980
  },
  {
    id: "crs-h-6",
    name: "Cloud Cybersecurity & SOC Analyst",
    sector: "IT & Cyber",
    demandLevel: "Surging (+64%)",
    placementRate: "92.0%",
    curriculumFreshness: "Updated 2026",
    trainerReadiness: "90% Certified",
    equipmentReadiness: "94% Modern",
    status: "Emerging Demand",
    statusKey: "emerging",
    annualEnrollment: 940
  }
];

export const curriculumGapAnalyses = [
  {
    id: "gap-ev",
    occupation: "Electric Vehicle (EV) Service & Battery Technician",
    industryRequired: [
      "Lithium-ion & Sodium-ion Battery Diagnostics",
      "Battery Management System (BMS) Telemetry & Flashing",
      "CAN Bus Protocol & Diagnostic Trouble Codes (DTC)",
      "High-Voltage Electrical Safety (HVE ISO 6469)",
      "Thermal Runaway Mitigation & Coolant Loops"
    ],
    currentCurriculum: [
      "Basic Electrical Circuits & DC Motors (Legacy)",
      "Lead-Acid Battery Maintenance (Legacy)",
      "Internal Combustion Engine Ignition Basics",
      "General Mechanical Vehicle Maintenance"
    ],
    missingCompetencies: [
      "BMS Firmware Calibration",
      "High-Voltage Safety Protocols (600V+ Isolation)",
      "CAN Bus Telemetry Extraction",
      "Thermal Simulation & Liquid Cooling Circuits"
    ],
    evidenceCitation: "ARAI & Tata Motors Industry Council Audit (August 2026)",
    urgency: "High (Affecting 4,200 graduates in Pune/Waluj)",
    memoAction: "Drafting Board Resolution for DVET Curriculum Committee"
  },
  {
    id: "gap-cnc",
    occupation: "5-Axis Precision CNC Machinist & Tool Maker",
    industryRequired: [
      "MasterCAM 5-Axis Multi-Axis Programming",
      "Geometric Dimensioning & Tolerancing (GD&T ASME Y14.5)",
      "Coordinate Measuring Machine (CMM) Automated Inspection",
      "Aerospace Superalloy Machining (Titanium/Inconel)"
    ],
    currentCurriculum: [
      "2-Axis Manual Lathe Turning",
      "Basic 3-Axis G-Code & M-Code Programming",
      "Vernier Caliper & Micrometer Manual Measurement",
      "Mild Steel Block Milling"
    ],
    missingCompetencies: [
      "5-Axis Simultaneous CAM Programming",
      "CMM Digital Optical Inspection",
      "Superalloy Heat Dissipation & Tool Wear Monitoring"
    ],
    evidenceCitation: "Indo-German Tool Room (IGTR) & Bharat Forge Quality Audit (July 2026)",
    urgency: "High (Affecting 1,800 seats in Kolhapur & Nashik)",
    memoAction: "Curriculum Modernization Memo Submitted"
  }
];

export const trainingCapacityData = [
  { district: "Pune", requiredSeats: 1890, availableSeats: 1240, gap: -650, budgetAllocated: "₹14.2 Cr", utilization: "98%" },
  { district: "Mumbai & Thane", requiredSeats: 2420, availableSeats: 1850, gap: -570, budgetAllocated: "₹18.5 Cr", utilization: "96%" },
  { district: "Chhatrapati Sambhaji Nagar", requiredSeats: 1180, availableSeats: 620, gap: -560, budgetAllocated: "₹8.4 Cr", utilization: "92%" },
  { district: "Nagpur", requiredSeats: 980, availableSeats: 540, gap: -440, budgetAllocated: "₹7.1 Cr", utilization: "88%" },
  { district: "Nashik", requiredSeats: 790, availableSeats: 480, gap: -310, budgetAllocated: "₹5.8 Cr", utilization: "85%" },
  { district: "Solapur", requiredSeats: 680, availableSeats: 320, gap: -360, budgetAllocated: "₹4.2 Cr", utilization: "89%" },
  { district: "Kolhapur", requiredSeats: 720, availableSeats: 450, gap: -270, budgetAllocated: "₹5.0 Cr", utilization: "91%" }
];

export const employerSignalsData = {
  totalSurveyed: "1,840 Enterprises",
  topHiringCorridors: [
    { corridor: "Chakan-Talegaon Auto-EV Hub (Pune)", vacancies: "18,400+", growth: "+34% YoY", topNeed: "EV Battery Tech, Robotics PLC" },
    { corridor: "AURIC Shendra-Bidkin (Chhatrapati Sambhaji Nagar)", vacancies: "8,900+", growth: "+42% YoY", topNeed: "Tool & Die, Smart Factory IoT" },
    { corridor: "MIHAN SEZ Multi-Modal Corridor (Nagpur)", vacancies: "7,200+", growth: "+38% YoY", topNeed: "Aero Avionics, WMS Logistics" },
    { corridor: "Ambad & Satpur Defense Belt (Nashik)", vacancies: "5,400+", growth: "+29% YoY", topNeed: "Wire Harnessing, Agro Processing" },
    { corridor: "JNPA & Tarapur Industrial Belt (Konkan)", vacancies: "12,100+", growth: "+31% YoY", topNeed: "Port Logistics, API Pharma" }
  ],
  surveyHighlights: [
    { metric: "82% Employers", insight: "Willing to offer higher initial packages (₹4.5L+) for candidates with certified hands-on lab experience." },
    { metric: "68% Employers", insight: "Report acute difficulty finding certified SCADA and BMS technicians in Western Maharashtra." },
    { metric: "91% Employers", insight: "Support NAPS apprenticeship scheme with average monthly stipend offer of ₹11,500." }
  ]
};

export const employerValidationData = [
  {
    id: "VAL-EV-2026",
    curriculumTitle: "Electric Vehicle (EV) Powertrain & BMS Diagnostics",
    trade: "Mechanic Auto Electrical & Electronics",
    targetNSQF: "Level 5",
    reviewingBody: "Automotive Skills Development Council (ASDC) & Tata Motors",
    districtHub: "Pune (Chakan-Talegaon)",
    status: "Fully Endorsed",
    statusKey: "endorsed",
    industryPartner: "Tata Motors Passenger Vehicles & ARAI",
    hiringPledged: 450,
    readinessScore: 94,
    feedbackSummary: "Curriculum covers high-voltage safety (600V+ isolation) and CAN Bus diagnostics accurately. Practical lab hours expanded to 60%.",
    endorsedDate: "18 Aug 2026",
    modulesValidated: [
      { name: "Li-Ion & LFP Cell Chemistry Diagnostics", approved: true },
      { name: "High-Voltage Safety Protocols (ISO 6469)", approved: true },
      { name: "BMS Flashing & Diagnostic Trouble Codes (DTC)", approved: true },
      { name: "Thermal Runaway Containment Simulation", approved: true }
    ],
    reviewer: "Dr. R. K. Deshmukh (Head of Technical Training, Tata Motors Auto)"
  },
  {
    id: "VAL-CNC-2026",
    curriculumTitle: "5-Axis Multi-Axis CNC Programming & CMM Metrology",
    trade: "Machinist / Tool & Die Maker",
    targetNSQF: "Level 5",
    reviewingBody: "Mahratta Chamber of Commerce, Industries and Agriculture (MCCIA) & Bharat Forge",
    districtHub: "Kolhapur & Nashik",
    status: "Endorsed with Modifications",
    statusKey: "modified",
    industryPartner: "Bharat Forge Ltd & Indo-German Tool Room",
    hiringPledged: 280,
    readinessScore: 88,
    feedbackSummary: "Recommended adding GD&T (ASME Y14.5) optical coordinate measurement module before final certification.",
    endorsedDate: "02 Sep 2026",
    modulesValidated: [
      { name: "MasterCAM 5-Axis Toolpath Optimization", approved: true },
      { name: "Superalloy Machining (Titanium/Inconel)", approved: true },
      { name: "CMM 3D Optical Metrology Inspection", approved: true },
      { name: "Tool Wear Sensor Telemetry", approved: false }
    ],
    reviewer: "Sunil K. Patwardhan (VP Operations, Bharat Forge Precision Div)"
  },
  {
    id: "VAL-SOLAR-2026",
    curriculumTitle: "Grid-Tied Solar Micro-Grid & Battery Energy Storage (BESS)",
    trade: "Solar PV Technician (Surya Mitra)",
    targetNSQF: "Level 4",
    reviewingBody: "Skill Council for Green Jobs (SCGJ) & Schneider Electric",
    districtHub: "Chhatrapati Sambhaji Nagar & Solapur",
    status: "Under Industry Review",
    statusKey: "review",
    industryPartner: "Schneider Electric India & Tata Power Solar",
    hiringPledged: 320,
    readinessScore: 78,
    feedbackSummary: "Review in progress. Evaluating hybrid string inverter synchronization with MSEDCL net metering standards.",
    endorsedDate: "In Review (Exp. 15 Oct 2026)",
    modulesValidated: [
      { name: "Hybrid Inverter Synchronization & Islanding", approved: true },
      { name: "BESS Container Energy Storage Protocols", approved: true },
      { name: "MSEDCL Grid Interconnection Compliance", approved: false },
      { name: "Drone-Assisted Thermographic PV Inspection", approved: false }
    ],
    reviewer: "Ananya Roy (Senior Grid Lead, Schneider Electric)"
  },
  {
    id: "VAL-IOT-2026",
    curriculumTitle: "Smart Factory Industrial IoT & Edge SCADA Integration",
    trade: "Instrument Mechanic / Industrial Electronics",
    targetNSQF: "Level 6",
    reviewingBody: "CII Maharashtra Digital Manufacturing Taskforce",
    districtHub: "Nagpur (MIHAN) & Mumbai Belt",
    status: "Fully Endorsed",
    statusKey: "endorsed",
    industryPartner: "Siemens India & L&T Heavy Engineering",
    hiringPledged: 210,
    readinessScore: 92,
    feedbackSummary: "Fully aligned with Industry 4.0 shopfloor telemetry standards. Apprentices will be fast-tracked for Automation Technician roles.",
    endorsedDate: "28 Aug 2026",
    modulesValidated: [
      { name: "Siemens S7-1500 PLC & TIA Portal Logic", approved: true },
      { name: "OPC-UA Edge Gateway & MQTT Sensor Feeds", approved: true },
      { name: "Industrial Cybersecurity (IEC 62443)", approved: true },
      { name: "Predictive Maintenance Vibration Analytics", approved: true }
    ],
    reviewer: "V. R. Natarajan (Principal Architect, Siemens Industry Digital)"
  }
];

export const emergingSkillsRadarData = [
  { skill: "Generative AI & LLM Data", demandIndex: 94, growthYoY: "+64%", seatAvailability: 32, industryAdoption: "78% (High)" },
  { skill: "EV Powertrain & BMS", demandIndex: 92, growthYoY: "+52%", seatAvailability: 45, industryAdoption: "85% (High)" },
  { skill: "Industrial Robotics & Cobots", demandIndex: 86, growthYoY: "+41%", seatAvailability: 54, industryAdoption: "72% (Moderate)" },
  { skill: "Industrial IoT & Edge SCADA", demandIndex: 84, growthYoY: "+45%", seatAvailability: 40, industryAdoption: "68% (Moderate)" },
  { skill: "Green Hydrogen & Solar BESS", demandIndex: 88, growthYoY: "+47%", seatAvailability: 48, industryAdoption: "65% (Emerging)" },
  { skill: "Cyber Defense & DevSecOps", demandIndex: 90, growthYoY: "+58%", seatAvailability: 38, industryAdoption: "82% (High)" },
  { skill: "Additive 5-Axis 3D Precision", demandIndex: 78, growthYoY: "+35%", seatAvailability: 50, industryAdoption: "60% (Moderate)" }
];

export const placementFunnelData = {
  enrolled: { count: "1,04,200 Candidates", pct: "100%" },
  trainingCompleted: { count: "89,600 Candidates", pct: "86.0%", dropOff: "14.0% drop-off during mid-term" },
  certificationPassed: { count: "78,400 Candidates", pct: "75.2%", dropOff: "10.8% failure on practical exam" },
  employmentPlaced: { count: "61,460 Candidates", pct: "78.4% of certified (59.0% total)", dropOff: "16.940 awaiting interview allocation" },
  bottlenecks: [
    { stage: "Training Completion", cause: "Rural travel distance to regional ITI centers", solution: "Deploy 12 Mobile Training Labs under MMKVY Phase-3" },
    { stage: "Practical Certification", cause: "Outdated lab test equipment in 18 older ITIs", solution: "Approved ₹22.5 Cr lab modernization grant (FY26-27)" },
    { stage: "Final Placement", cause: "Recruiter friction in Tier-2/3 district MSMEs", solution: "Automated DigiLocker 1-click hiring pipeline integrated with MahaSkill" }
  ]
};

export const aiGovCopilotKnowledge = [
  {
    trigger: "ev technician shortage",
    question: "Which districts have the largest EV technician shortage?",
    response: "Based on verified Maharashtra Labour Intelligence data (August 2026), the top districts with acute EV Technician shortages are:\n\n1. **Pune District**: Deficit of **650 seats** (Industry Demand: 1,890 vs Sanctioned Capacity: 1,240). High hiring demand at Chakan & Talegaon auto hubs.\n2. **Chhatrapati Sambhaji Nagar**: Deficit of **340 seats** in Waluj MIDC cluster.\n3. **Nashik District**: Deficit of **220 seats** in BLDC motor and battery assembly units.\n\n**Actionable Policy Recommendation**: Reallocate 650 surplus seats from declining manual trades (DTP/Drafting) to ARAI-accredited EV CoEs in Pune and Waluj.",
    supportingData: {
      source: "MSSDS Labour Demand Heatmap & ARAI OEM Council Audit",
      dateOfData: "August 24, 2026",
      indicators: ["Annual Vacancies: 4,820", "Seat Deficit: -1,210 statewide", "YoY Hiring Growth: +52%"],
      confidenceStatus: "High (96% Confidence - Verified against 42 Tier-1 OEM filings)"
    }
  },
  {
    trigger: "courses to review",
    question: "Which courses should be reviewed or phased out?",
    response: "Diagnostic audit of 104,200 candidate records indicates **6 trade courses requiring immediate restructuring or phase-out**:\n\n1. **Manual Offset DTP & Typewriting**: Placement rate has dropped to **28.5%** with zero industry demand across major MIDCs.\n2. **Conventional Manual Drafting**: Placement rate is **22.0%** due to industry-wide transition to 3D BIM and CAD.\n3. **Lead-Acid Battery Maintenance (Legacy)**: Needs replacement with Lithium-Ion & Sodium Battery BMS curriculum.\n\n**Policy Action**: Repurpose ₹8.4 Cr existing budget into High-Growth Green & AI Micro-credentials.",
    supportingData: {
      source: "DVET Annual Placement Audit & Employer Satisfaction Survey",
      dateOfData: "September 02, 2026",
      indicators: ["Placement Threshold: <30%", "Industry Demand Index: -48% YoY", "Trainer Obsolescence: 55%"],
      confidenceStatus: "High (94% Evidence - Verified by DVET Audit Bureau)"
    }
  },
  {
    trigger: "nashik",
    question: "Show skill gaps and intelligence for Nashik district.",
    response: "Nashik District Intelligence Profile (Q3 2026):\n\n- **Primary Industries**: Defense Aeronautics (HAL Ozar), Automotive Electricals, Agritech & Cold Chain.\n- **Acute Skill Gaps**: MIL-STD Aerospace Wire Harnessing (Deficit: 240), BLDC Motor Testing (Deficit: 180), HACCP Export Food Auditing (Deficit: 110).\n- **Current Capacity**: 480 seats against 790 industry demand (Gap: **-310 seats**).\n- **Placement Rate**: 74.1%.\n\n**Policy Recommendation**: Establish a Joint Defense Electronics Training Cell with HAL at Ozar with ₹4.5 Cr sanctioned seed funding.",
    supportingData: {
      source: "Nashik District Skill Committee (DSDO) & HAL Vendor Association",
      dateOfData: "August 18, 2026",
      indicators: ["District Vacancies: 5,400+", "Active ITIs: 12", "Placement Rate: 74.1%"],
      confidenceStatus: "High (92% Confidence - Verified)"
    }
  },
  {
    trigger: "district skill plan",
    question: "Generate a district skill plan.",
    response: "### Official State Skill Allocation Plan (FY 2026-27)\n\n**Target Region**: Pune & Marathwada Corridors\n\n1. **Capacity Expansion**: Sanction +1,210 high-tech seats across 8 ITIs in Pune, Chhatrapati Sambhaji Nagar, and Nashik.\n2. **Curriculum Modernization**: Integrate BMS, CAN Bus, and 5-Axis CAM into DVET syllabus by Q4 2026.\n3. **Modernization Grant**: Disburse ₹22.5 Cr lab equipment grant for CMM optical testers and robotic welding cells.\n4. **Placement Mandate**: Mandatory 6-month NAPS apprenticeship tie-ups for all accredited training partners.",
    supportingData: {
      source: "State Skill Mission Directorate & Cabinet Policy Working Group",
      dateOfData: "September 15, 2026",
      indicators: ["Target Placement: 85.0%", "Budget Utilization: 94.2%", "Youth Beneficiaries: 1.4 Lakh"],
      confidenceStatus: "Official Policy Formulation (98% Evidence)"
    }
  }
];

export const trainerReadinessData = [
  {
    id: "TR-001",
    trainer: "Trainer A (S. G. Kulkarni)",
    trainerShort: "Trainer A",
    institute: "Govt ITI Aundh (Pune)",
    district: "Pune",
    trade: "Automotive & EV",
    currentCapability: "Conventional automobile",
    currentCapabilityMr: "पारंपरिक ऑटोमोबाईल",
    currentCapabilityHi: "पारंपरिक ऑटोमोबाइल",
    gap: "EV diagnostics",
    gapMr: "ईव्ही डायग्नोस्टिक्स",
    gapHi: "ईवी डायग्नोस्टिक्स",
    action: "EV upskilling",
    actionMr: "ईव्ही कौशल्यवर्धन",
    actionHi: "ईवी अपस्किलिंग",
    status: "upskilling",
    totBatch: "Batch 4 - ARAI Pune (Starts Oct 15)",
    readinessScore: 68
  },
  {
    id: "TR-002",
    trainer: "Trainer B (M. R. Shinde)",
    trainerShort: "Trainer B",
    institute: "Govt ITI Chinchwad (Pune)",
    district: "Pune",
    trade: "Automotive & EV",
    currentCapability: "EV fundamentals",
    currentCapabilityMr: "ईव्ही मूलभूत ज्ञान",
    currentCapabilityHi: "ईवी मूलभूत ज्ञान",
    gap: "BMS",
    gapMr: "बॅटरी व्यवस्थापन प्रणाली (BMS)",
    gapHi: "बैटरी प्रबंधन प्रणाली (BMS)",
    action: "Advanced ToT",
    actionMr: "प्रगत ToT प्रशिक्षण",
    actionHi: "उन्नत ToT प्रशिक्षण",
    status: "tot",
    totBatch: "Batch 2 - NSTI Mumbai (Starts Oct 05)",
    readinessScore: 82
  },
  {
    id: "TR-003",
    trainer: "Trainer C (P. V. Deshpande)",
    trainerShort: "Trainer C",
    institute: "Govt ITI Waluj (Chhatrapati Sambhaji Nagar)",
    district: "Chhatrapati Sambhaji Nagar",
    trade: "Automotive & EV",
    currentCapability: "EV + BMS",
    currentCapabilityMr: "ईव्ही + बीएमएस प्रमाणित",
    currentCapabilityHi: "ईवी + बीएमएस प्रमाणित",
    gap: "Current",
    gapMr: "सद्यस्थितीत पूर्ण (निरंक)",
    gapHi: "वर्तमान में पूर्ण (शून्य)",
    action: "Ready",
    actionMr: "अध्यापनास सज्ज",
    actionHi: "अध्यापन हेतु तैयार",
    status: "ready",
    totBatch: "Certified Master Trainer (NSTI)",
    readinessScore: 98
  },
  {
    id: "TR-004",
    trainer: "Trainer D (R. N. Jadhav)",
    trainerShort: "Trainer D",
    institute: "Govt ITI Satpur (Nashik)",
    district: "Nashik",
    trade: "Automotive & EV",
    currentCapability: "Conventional automobile",
    currentCapabilityMr: "पारंपरिक ऑटोमोबाईल",
    currentCapabilityHi: "पारंपरिक ऑटोमोबाइल",
    gap: "EV + HV safety",
    gapMr: "ईव्ही + हाय व्होल्टेज सुरक्षा",
    gapHi: "ईवी + हाई वोल्टेज सुरक्षा",
    action: "Retraining",
    actionMr: "पुनःप्रशिक्षण वर्ग",
    actionHi: "पुनःप्रशिक्षण वर्ग",
    status: "retraining",
    totBatch: "State Safety Cohort - HAL Nashik",
    readinessScore: 45
  },
  {
    id: "TR-005",
    trainer: "Trainer E (A. K. More)",
    trainerShort: "Trainer E",
    institute: "Govt ITI Kurla (Mumbai)",
    district: "Mumbai & Thane",
    trade: "Industrial Automation",
    currentCapability: "Relay logic & 2-Axis CNC",
    currentCapabilityMr: "रिले लॉजिक व २-अक्ष सीएनसी",
    currentCapabilityHi: "रिले लॉजिक एवं २-एक्सिस सीएनसी",
    gap: "5-Axis CAM & ROS Cobots",
    gapMr: "५-अक्ष सीएएम व रोबोटिक्स",
    gapHi: "५-एक्सिस सीएएम एवं रोबोटिक्स",
    action: "Advanced ToT",
    actionMr: "प्रगत ToT प्रशिक्षण",
    actionHi: "उन्नत ToT प्रशिक्षण",
    status: "tot",
    totBatch: "Indo-German Tool Room ToT",
    readinessScore: 74
  },
  {
    id: "TR-006",
    trainer: "Trainer F (S. T. Gaikwad)",
    trainerShort: "Trainer F",
    institute: "Govt ITI Solapur",
    district: "Solapur",
    trade: "Renewable Energy",
    currentCapability: "Lead acid inverter wiring",
    currentCapabilityMr: "लेड ॲसिड इन्व्हर्टर वायरिंग",
    currentCapabilityHi: "लेड एसिड इन्वर्टर वायरिंग",
    gap: "Solar Microgrid & BESS",
    gapMr: "सौर मायक्रोग्रिड व स्टोरेज",
    gapHi: "सौर माइक्रोग्रिड एवं स्टोरेज",
    action: "EV upskilling",
    actionMr: "कौशल्यवर्धन वर्ग",
    actionHi: "अपस्किलिंग वर्ग",
    status: "upskilling",
    totBatch: "National Institute of Solar Energy ToT",
    readinessScore: 62
  },
  {
    id: "TR-007",
    trainer: "Trainer G (V. B. Joshi)",
    trainerShort: "Trainer G",
    institute: "Govt ITI Hingna (Nagpur)",
    district: "Nagpur",
    trade: "IT & AI Data",
    currentCapability: "Basic Python & SQL",
    currentCapabilityMr: "मूलभूत पायथॉन व एसक्यूएल",
    currentCapabilityHi: "मूलभूत पायथन एवं एसक्यूएल",
    gap: "GenAI & LLM Fine-tuning",
    gapMr: "जनरेटिव्ह एआय व एलएलएम",
    gapHi: "जेनरेटिव एआई एवं एलएलएम",
    action: "Advanced ToT",
    actionMr: "प्रगत ToT प्रशिक्षण",
    actionHi: "उन्नत ToT प्रशिक्षण",
    status: "tot",
    totBatch: "IIIT Nagpur Faculty Development",
    readinessScore: 79
  },
  {
    id: "TR-008",
    trainer: "Trainer H (D. S. Wagh)",
    trainerShort: "Trainer H",
    institute: "Govt ITI Kolhapur",
    district: "Kolhapur",
    trade: "Automotive & EV",
    currentCapability: "EV Powertrain + Diagnostics",
    currentCapabilityMr: "ईव्ही पॉवरट्रेन व डायग्नोस्टिक्स",
    currentCapabilityHi: "ईवी पावरट्रेन एवं डायग्नोस्टिक्स",
    gap: "Current",
    gapMr: "सद्यस्थितीत पूर्ण (निरंक)",
    gapHi: "वर्तमान में पूर्ण (शून्य)",
    action: "Ready",
    actionMr: "अध्यापनास सज्ज",
    actionHi: "अध्यापन हेतु तैयार",
    status: "ready",
    totBatch: "Certified Master Trainer (ARAI)",
    readinessScore: 95
  }
];

// Equipment & Workshop Lab Modernization Dataset for Maharashtra ITIs
export const equipmentModernizationData = [
  {
    id: "EQ-PUNE-01",
    itiName: "Govt ITI Chakan",
    district: "Pune",
    division: "Pune Division",
    cluster: "Chakan Auto & EV MIDC Hub",
    tradeLab: "EV Powertrain & Battery Diagnostics",
    criticality: "Critical Deficit",
    currentLegacyEquipment: "Traditional IC Engine Test Rigs (2008 Vintage) — 0 EV Simulator Benches",
    requiredModernEquipment: "2x High-Voltage Battery Pack Diagnostics & BMS Simulator Benches (Tata Motors Spec)",
    studentsImpacted: 240,
    estimatedCapExLakhs: 65.0,
    csrPartner: "Tata Motors CSR & ARAI Pune",
    csrFundedPct: 60,
    stateBudgetPct: 40,
    status: "Sanction Proposal Ready",
    procurementStage: "Technical Evaluation",
    placementImpact: "+24% in Chakan EV Corridor"
  },
  {
    id: "EQ-NSK-02",
    itiName: "Govt ITI Satpur",
    district: "Nashik",
    division: "Nashik Division",
    cluster: "Satpur Engineering & Defense Hub",
    tradeLab: "Machinist & Precision Tooling",
    criticality: "Critical Deficit",
    currentLegacyEquipment: "Manual 2-Axis Lathes (1998 Vintage) with High Mechanical Tolerance Deviation",
    requiredModernEquipment: "2x 5-Axis CNC Milling Center with Siemens 840D / Fanuc CNC Simulators",
    studentsImpacted: 320,
    estimatedCapExLakhs: 85.0,
    csrPartner: "Bharat Forge & HAL Skill Trust",
    csrFundedPct: 50,
    stateBudgetPct: 50,
    status: "Approved for Procurement",
    procurementStage: "GeM Tender Issued",
    placementImpact: "+31% in Nashik Defense Tooling"
  },
  {
    id: "EQ-AUR-03",
    itiName: "Govt ITI Waluj",
    district: "Chhatrapati Sambhaji Nagar",
    division: "Marathwada Division",
    cluster: "AURIC Smart City & Waluj MIDC",
    tradeLab: "Industrial Robotics & Mechatronics",
    criticality: "Critical Deficit",
    currentLegacyEquipment: "Relay-only Logic Trainers (No PLC / SCADA / Pick-and-Place Robotic Arms)",
    requiredModernEquipment: "1x 6-Axis Industrial Robotic Arm & PLC Automation Station (IGTR Spec)",
    studentsImpacted: 180,
    estimatedCapExLakhs: 58.0,
    csrPartner: "Bajaj Auto CSR & Indo-German Tool Room",
    csrFundedPct: 70,
    stateBudgetPct: 30,
    status: "Funding Committed",
    procurementStage: "Site Prep & 3-Phase Power Ready",
    placementImpact: "+28% in AURIC Smart Factory"
  },
  {
    id: "EQ-NGP-04",
    itiName: "Govt ITI Hingna",
    district: "Nagpur",
    division: "Nagpur Division",
    cluster: "MIHAN SEZ & Butibori Cluster",
    tradeLab: "Solar PV & Micro-Grid Systems",
    criticality: "Urgent Upgrade",
    currentLegacyEquipment: "Basic DC Breadboards — No Microgrid Hybrid Inverter Simulation Test Benches",
    requiredModernEquipment: "3x Rooftop Solar Grid-Tied Inverter Testing Benches & Battery Storage Rig",
    studentsImpacted: 210,
    estimatedCapExLakhs: 36.0,
    csrPartner: "Mahagenco Green Energy & Solar Grid Fund",
    csrFundedPct: 40,
    stateBudgetPct: 60,
    status: "Sanction Proposal Ready",
    procurementStage: "Specification Vetting",
    placementImpact: "+19% in Vidarbha Solar Park"
  },
  {
    id: "EQ-KOL-05",
    itiName: "Govt ITI Gokul Shirgaon",
    district: "Kolhapur",
    division: "Pune Division",
    cluster: "Kolhapur Foundry & Auto Ancillary",
    tradeLab: "Foundry & Advanced Metallurgy QA",
    criticality: "Urgent Upgrade",
    currentLegacyEquipment: "Manual Sand Testing Rigs (No Optical Emission Spectrometer / Hardness Digital QA)",
    requiredModernEquipment: "1x Digital Optical Emission Spectrometer & Ultrasonic Flaw Detector",
    studentsImpacted: 160,
    estimatedCapExLakhs: 44.0,
    csrPartner: "Kolhapur Foundry Cluster CSR",
    csrFundedPct: 45,
    stateBudgetPct: 55,
    status: "Approved for Procurement",
    procurementStage: "GeM Tender Issued",
    placementImpact: "+22% in Castings Export Belt"
  },
  {
    id: "EQ-MMR-06",
    itiName: "Govt ITI Thane",
    district: "Mumbai & MMR",
    division: "Konkan Division",
    cluster: "Thane-Belapur Industrial Corridor",
    tradeLab: "Chemical Plant Ops & Cold Chain",
    criticality: "Moderate Gap",
    currentLegacyEquipment: "Non-insulated Fluid Flow Test Pipes (Vintage 2012)",
    requiredModernEquipment: "Automated PID Temperature Controller & Cleanroom HVAC Rig",
    studentsImpacted: 190,
    estimatedCapExLakhs: 32.0,
    csrPartner: "MIDC Chemical Safety Council",
    csrFundedPct: 50,
    stateBudgetPct: 50,
    status: "Under Review",
    procurementStage: "Budget Estimate Revision",
    placementImpact: "+15% in Pharma/Chemical Belt"
  },
  {
    id: "EQ-AMR-07",
    itiName: "Govt ITI Nandgaon",
    district: "Amravati",
    division: "Amravati Division",
    cluster: "Amravati Textile Park",
    tradeLab: "Textile Processing & Smart Looms",
    criticality: "Urgent Upgrade",
    currentLegacyEquipment: "Mechanical Shuttle Looms — Lacks Air-Jet & Electronic Jacquard Control",
    requiredModernEquipment: "2x Electronic Jacquard & High-Speed Air-Jet Loom Simulator",
    studentsImpacted: 220,
    estimatedCapExLakhs: 48.0,
    csrPartner: "Maharashtra Cotton Federation & PM MITRA Fund",
    csrFundedPct: 60,
    stateBudgetPct: 40,
    status: "Sanction Proposal Ready",
    procurementStage: "Technical Evaluation",
    placementImpact: "+27% in PM MITRA Textile Mega Park"
  },
  {
    id: "EQ-SOL-08",
    itiName: "Govt ITI Solapur",
    district: "Solapur",
    division: "Pune Division",
    cluster: "Solapur Solar & Garment Cluster",
    tradeLab: "Smart Garment CAD & Automatic Cutting",
    criticality: "Moderate Gap",
    currentLegacyEquipment: "Manual Scissor Cutting Tables (No CNC Fabric Laser Cutter)",
    requiredModernEquipment: "1x Automated Multi-Ply CNC Fabric Cutting & CAD Pattern Maker",
    studentsImpacted: 280,
    estimatedCapExLakhs: 38.0,
    csrPartner: "Solapur Garment Manufacturers Association",
    csrFundedPct: 50,
    stateBudgetPct: 50,
    status: "Approved for Procurement",
    procurementStage: "Site Prep Ready",
    placementImpact: "+20% in Solapur Uniform SEZ"
  }
];

// Assessment Methods Modernization Dataset (Rote-learning Pen-Paper to Task Simulations & Jury)
export const assessmentModernizationData = [
  {
    id: "ASM-EV-01",
    trade: "EV Powertrain & Battery Diagnostics",
    nsqfLevel: "NSQF Level 5",
    sector: "Automotive & Electric Vehicles",
    pilotCenters: "Govt ITI Aundh (Pune), Govt ITI Chakan, Govt ITI Waluj",
    studentsEnrolled: 480,
    legacyScheme: {
      writtenTheoryPct: 70,
      fixedPracticalPct: 30,
      description: "3-Hour Written Pen-Paper Exam on IC engine basics & static battery formulas; single manual multimeter wiring test on de-energized board.",
      shortcomings: "Zero fault-finding under live simulated load; cannot test CAN Bus error tracing or high-voltage safety isolation protocols."
    },
    modernScheme: {
      cbtTheoryPct: 20,
      simulationTaskPct: 35,
      digitalLogbookPct: 25,
      industryJuryPct: 20,
      components: [
        { name: "Digital E-Logbook", weight: "25%", method: "Continuous biometric log of 40 practical workshop tasks with instructor timestamp." },
        { name: "VR / Digital Fault Simulator", weight: "35%", method: "Timed diagnosis of high-voltage BMS isolation faults & CAN bus telemetry errors." },
        { name: "Hands-on Live Benchmark", weight: "20%", method: "Physical battery module cell balancing & thermal management circuit assembly." },
        { name: "Industry-Jury Evaluation", weight: "20%", method: "Tata Motors / ARAI Plant Assessors evaluating workplace safety SOPs & 5S compliance." }
      ]
    },
    industryEndorsement: "Tata Motors, ARAI & Mahindra Electric (98% Endorsed)",
    employerSatisfactionScore: "4.8 / 5.0",
    workplaceReadinessGain: "+44% faster floor integration",
    status: "State Pilot Active (DVET Circular 88/26)"
  },
  {
    id: "ASM-CNC-02",
    trade: "5-Axis CNC Precision Machining & Tooling",
    nsqfLevel: "NSQF Level 5",
    sector: "Advanced Capital Goods & Defense",
    pilotCenters: "Govt ITI Satpur (Nashik), Govt ITI Kudal, Govt ITI Karad",
    studentsEnrolled: 620,
    legacyScheme: {
      writtenTheoryPct: 65,
      fixedPracticalPct: 35,
      description: "Pen-paper handwritten G-code memorization on answer sheet; basic manual lathe squaring operation with coarse vernier caliper.",
      shortcomings: "Does not evaluate collision avoidance on multi-axis CAM controllers or surface roughness testing."
    },
    modernScheme: {
      cbtTheoryPct: 20,
      simulationTaskPct: 30,
      digitalLogbookPct: 25,
      industryJuryPct: 25,
      components: [
        { name: "Continuous CAM E-Logbook", weight: "25%", method: "Automated logging of 50 precision toolpath simulations in Siemens NX / Mastercam." },
        { name: "Machine Simulator Test", weight: "30%", method: "Real-time Fanuc/Siemens controller collision check & tool offset zeroing test." },
        { name: "Precision Tolerance Machining", weight: "25%", method: "Physical test coupon milled with tolerance verification (<0.015 mm on CMM)." },
        { name: "Defense / OEM Jury Review", weight: "20%", method: "Bharat Forge & HAL tooling engineers evaluating ISO inspection reports." }
      ]
    },
    industryEndorsement: "Bharat Forge, Godrej Aerospace & IGTR (96% Endorsed)",
    employerSatisfactionScore: "4.9 / 5.0",
    workplaceReadinessGain: "+38% reduction in machining scrap",
    status: "State Pilot Active"
  },
  {
    id: "ASM-SOLAR-03",
    trade: "Solar PV & Micro-Grid Systems (Surya Mitra)",
    nsqfLevel: "NSQF Level 4",
    sector: "Renewable & Green Energy",
    pilotCenters: "Govt ITI Hingna (Nagpur), Govt ITI Solapur, Govt ITI Latur",
    studentsEnrolled: 390,
    legacyScheme: {
      writtenTheoryPct: 75,
      fixedPracticalPct: 25,
      description: "Written descriptive theory exam on photovoltaic cell physics & single manual DC circuit breadboard wiring.",
      shortcomings: "No grid-synchronization testing, zero roof-top safety harness check, or inverter MPPT calibration assessment."
    },
    modernScheme: {
      cbtTheoryPct: 20,
      simulationTaskPct: 35,
      digitalLogbookPct: 25,
      industryJuryPct: 20,
      components: [
        { name: "Digital Installation Logbook", weight: "25%", method: "Geo-tagged photo audit of 15 rooftop test string connections." },
        { name: "Hybrid Inverter Simulator", weight: "35%", method: "Simulated islanding detection, grid surge, and MPPT tuning under shadow conditions." },
        { name: "Live Rooftop Mount & Earthing", weight: "20%", method: "Hands-on structural torque check, lightning arrestor and megger insulation test." },
        { name: "DISCOM / EPC Jury Assessment", weight: "20%", method: "MSEDCL Solar Inspectors evaluating net-metering grid interconnection compliance." }
      ]
    },
    industryEndorsement: "Mahagenco, Tata Power Solar & Solar EPC Council (95% Endorsed)",
    employerSatisfactionScore: "4.7 / 5.0",
    workplaceReadinessGain: "+32% direct hire rate",
    status: "Approved for Statewide Rollout"
  },
  {
    id: "ASM-ROBOT-04",
    trade: "Industrial Robotics & PLC Automation Tech",
    nsqfLevel: "NSQF Level 6",
    sector: "Industrial Automation & Mechatronics",
    pilotCenters: "Govt ITI Waluj, Govt ITI Bhosari (Pune), Govt ITI Thane",
    studentsEnrolled: 310,
    legacyScheme: {
      writtenTheoryPct: 80,
      fixedPracticalPct: 20,
      description: "Pen-paper boolean logic truth tables and hand-drawn ladder diagrams without real-time PLC debugging.",
      shortcomings: "Fails to test robot emergency e-stop interlocks, pick-and-place cycle times, or SCADA alarm handling."
    },
    modernScheme: {
      cbtTheoryPct: 15,
      simulationTaskPct: 40,
      digitalLogbookPct: 25,
      industryJuryPct: 20,
      components: [
        { name: "Digital PLC Project Portfolio", weight: "25%", method: "GitHub/E-Portfolio repository of 12 verified PLC ladder programs & HMI screens." },
        { name: "Robotic Cell Fault Simulation", weight: "40%", method: "6-Axis arm trajectory programming, payload zeroing, and emergency recovery in 10 mins." },
        { name: "Sensor & Actuator Calibration", weight: "15%", method: "Hardware wiring of photoelectric, inductive sensors and pneumatic valves." },
        { name: "System Integrator Jury Review", weight: "20%", method: "ABB & Siemens automation partners auditing cycle time efficiency and safety." }
      ]
    },
    industryEndorsement: "Bajaj Auto, Schneider Electric & Fanuc India (99% Endorsed)",
    employerSatisfactionScore: "4.9 / 5.0",
    workplaceReadinessGain: "+52% faster plant commissioning",
    status: "State Pilot Active"
  },
  {
    id: "ASM-WELD-05",
    trade: "Advanced Welder (MIG/MAG & TIG Robotic Fabrication)",
    nsqfLevel: "NSQF Level 4",
    sector: "Heavy Fabrication & Infrastructure",
    pilotCenters: "Govt ITI Gokul Shirgaon (Kolhapur), Govt ITI Butibori, Govt ITI Ambad",
    studentsEnrolled: 540,
    legacyScheme: {
      writtenTheoryPct: 60,
      fixedPracticalPct: 40,
      description: "Visual inspection of single manual arc lap joint with basic theoretical metallurgy multiple-choice questions.",
      shortcomings: "Zero ultrasonic flaw detection, no shielding gas flow rate calibration or radiographic test evaluation."
    },
    modernScheme: {
      cbtTheoryPct: 15,
      simulationTaskPct: 35,
      digitalLogbookPct: 25,
      industryJuryPct: 25,
      components: [
        { name: "Weld E-Logbook & WPS Audit", weight: "25%", method: "Continuous logging of 30 Welding Procedure Specifications (WPS) with gas mix ratios." },
        { name: "VR Welding Simulator", weight: "35%", method: "Arc length, travel speed, and gun angle real-time feedback with instant bead QA score." },
        { name: "X-Ray & NDT Coupon Test", weight: "20%", method: "Radiographic and ultrasonic non-destructive testing of T-joint penetration." },
        { name: "L&T / Indian Institute of Welding Jury", weight: "20%", method: "IIW certified inspectors evaluating ASME/ISO compliance." }
      ]
    },
    industryEndorsement: "L&T Heavy Engineering, Mazagon Dock & Thermax (97% Endorsed)",
    employerSatisfactionScore: "4.8 / 5.0",
    workplaceReadinessGain: "+41% first-time weld quality pass",
    status: "State Pilot Active"
  }
];

