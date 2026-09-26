exports.adminKpisData = {
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

exports.adminDistrictIntelligence = {
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

exports.courseHealthTableData = [
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

exports.curriculumGapAnalyses = [
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

exports.trainingCapacityData = [
  { district: "Pune", requiredSeats: 1890, availableSeats: 1240, gap: -650, budgetAllocated: "₹14.2 Cr", utilization: "98%" },
  { district: "Mumbai & Thane", requiredSeats: 2420, availableSeats: 1850, gap: -570, budgetAllocated: "₹18.5 Cr", utilization: "96%" },
  { district: "Chhatrapati Sambhaji Nagar", requiredSeats: 1180, availableSeats: 620, gap: -560, budgetAllocated: "₹8.4 Cr", utilization: "92%" },
  { district: "Nagpur", requiredSeats: 980, availableSeats: 540, gap: -440, budgetAllocated: "₹7.1 Cr", utilization: "88%" },
  { district: "Nashik", requiredSeats: 790, availableSeats: 480, gap: -310, budgetAllocated: "₹5.8 Cr", utilization: "85%" },
  { district: "Solapur", requiredSeats: 680, availableSeats: 320, gap: -360, budgetAllocated: "₹4.2 Cr", utilization: "89%" },
  { district: "Kolhapur", requiredSeats: 720, availableSeats: 450, gap: -270, budgetAllocated: "₹5.0 Cr", utilization: "91%" }
];

exports.employerSignalsData = {
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

exports.emergingSkillsRadarData = [
  { skill: "Generative AI & LLM Data", demandIndex: 94, growthYoY: "+64%", seatAvailability: 32, industryAdoption: "78% (High)" },
  { skill: "EV Powertrain & BMS", demandIndex: 92, growthYoY: "+52%", seatAvailability: 45, industryAdoption: "85% (High)" },
  { skill: "Industrial Robotics & Cobots", demandIndex: 86, growthYoY: "+41%", seatAvailability: 54, industryAdoption: "72% (Moderate)" },
  { skill: "Industrial IoT & Edge SCADA", demandIndex: 84, growthYoY: "+45%", seatAvailability: 40, industryAdoption: "68% (Moderate)" },
  { skill: "Green Hydrogen & Solar BESS", demandIndex: 88, growthYoY: "+47%", seatAvailability: 48, industryAdoption: "65% (Emerging)" },
  { skill: "Cyber Defense & DevSecOps", demandIndex: 90, growthYoY: "+58%", seatAvailability: 38, industryAdoption: "82% (High)" },
  { skill: "Additive 5-Axis 3D Precision", demandIndex: 78, growthYoY: "+35%", seatAvailability: 50, industryAdoption: "60% (Moderate)" }
];

exports.placementFunnelData = {
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

exports.aiGovCopilotKnowledge = [
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
