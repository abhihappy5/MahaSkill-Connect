exports.mockRestartProfile = {
  id: "restart-10842",
  name: "Pooja Patil",
  nameMr: "पूजा पाटील",
  nameHi: "पूजा पाटिल",
  avatar: "PP",
  currentSituation: "Career Return & Reskilling (4-year gap for family care)",
  previousRole: "Retail Store Associate (5 Years)",
  previousIndustry: "Retail & Consumer Operations",
  education: "Bachelor of Commerce (B.Com) - Savitribai Phule Pune University",
  preferredLocation: "Pune / Pimpri-Chinchwad / Hybrid",
  preferredIndustry: "Office Operations & Logistics / IT Support",
  careerGoal: "Secure a full-time, stable Administrative Executive or Logistics Coordinator position with ₹3.6L - ₹5.8L CTC",
  careerReadinessScore: 74,
  readinessMetrics: {
    existingSkillsScore: 78,
    transferableSkillsScore: 88,
    skillsToImproveScore: 42,
    overallJobReadiness: 74
  },
  existingSkills: [
    "Customer Relationship Management",
    "Fluent Marathi & Hindi Communication",
    "Point-of-Sale (POS) & Billing",
    "Inventory & Stock Auditing",
    "Cash & Payment Reconciliation",
    "Team Coordination"
  ]
};

exports.transferableSkillsProfiles = [
  {
    id: "retail-to-office",
    previousRole: "Retail Associate / Store Executive",
    previousExp: "3 - 5 Years in Customer-facing Retail",
    transferableSkills: [
      { skill: "Customer Service & Conflict Resolution", matchPct: 95, context: "Transfers directly to Corporate Client Support & CRM" },
      { skill: "Verbal & Written Communication", matchPct: 92, context: "High value for Office Administration & Client Success" },
      { skill: "Sales & Account Management", matchPct: 88, context: "Applicable to B2B Inside Sales & Vendor Relations" },
      { skill: "Inventory Handling & Stock Audits", matchPct: 85, context: "Foundation for Modern Warehouse & Supply Chain Logistics" }
    ],
    possibleNewCareers: [
      {
        title: "Logistics & Supply Chain Coordinator",
        salaryRange: "₹3.8L - ₹6.2L LPA",
        hiringSectors: "E-Commerce, Manufacturing Hubs (Chakan/Bhiwandi)",
        readinessPct: 82,
        trainingNeeded: "ERP Inventory (SAP/Tally) & WMS Basics"
      },
      {
        title: "Customer Support & Client Success Executive",
        salaryRange: "₹3.5L - ₹5.5L LPA",
        hiringSectors: "IT Services, FinTech, Healthcare Platforms",
        readinessPct: 88,
        trainingNeeded: "Zendesk/CRM Software & Business Email Etiquette"
      },
      {
        title: "Front Office & Operations Admin Executive",
        salaryRange: "₹3.2L - ₹4.8L LPA",
        hiringSectors: "Corporate Offices, Hospitals, Educational Institutes",
        readinessPct: 85,
        trainingNeeded: "MS Excel Advanced & Google Workspace Tools"
      }
    ],
    transitionMap: {
      previousCareer: "Retail Associate",
      transferableSkills: "Customer Service, Communication, Billing, Stock Management",
      recommendedTraining: "MS Office 365 + Tally Prime / WMS Software (4 Weeks)",
      targetCareer: "Corporate Operations & Logistics Coordinator",
      availableJobs: "480+ Openings across Pune & Mumbai MIDC"
    }
  },
  {
    id: "caregiver-to-tech",
    previousRole: "Career Break / Homemaker & Family Care",
    previousExp: "4+ Years Career Gap (B.Sc / B.Com / B.A Graduate)",
    transferableSkills: [
      { skill: "Multitasking & Time Management", matchPct: 90, context: "Essential for Project Coordination & Operations" },
      { skill: "Budgeting & Expense Planning", matchPct: 85, context: "Transfers to Accounting & Financial Back-office" },
      { skill: "Communication & Empathy", matchPct: 92, context: "Ideal for HR Coordination & Healthcare Support" }
    ],
    possibleNewCareers: [
      {
        title: "Junior Data Annotation & AI Operations Specialist",
        salaryRange: "₹4.0L - ₹6.5L LPA",
        hiringSectors: "GovTech AI, Indic Language Models, IT Centers",
        readinessPct: 78,
        trainingNeeded: "Python Basics & Data Annotation Tools"
      },
      {
        title: "Digital Accounting & GST Associate",
        salaryRange: "₹3.5L - ₹5.2L LPA",
        hiringSectors: "MSMEs, Chartered Accountant Firms, Corporates",
        readinessPct: 84,
        trainingNeeded: "Tally Prime + GST Filing Certification"
      }
    ],
    transitionMap: {
      previousCareer: "Career Break (Family Care)",
      transferableSkills: "Time Management, Financial Budgeting, Empathy",
      recommendedTraining: "MahaSkill Women Returnship in Digital Tools (6 Weeks)",
      targetCareer: "Digital Operations / Executive Associate",
      availableJobs: "320+ Hybrid & Remote Jobs"
    }
  }
];

exports.personalizedLearningSteps = [
  {
    step: 1,
    title: "Digital & Office Productivity Skills",
    titleMr: "डिजिटल व कार्यालयीन कौशल्ये",
    duration: "2 Weeks (Self-paced + Hybrid Lab)",
    provider: "MahaSkill Foundation Academy & CDAC",
    description: "Master Microsoft Excel, Google Sheets, professional email communication, and digital collaboration tools.",
    status: "completed",
    completionDate: "Completed Sep 15, 2026",
    subsidy: "100% Free Government Initiative",
    skillsGained: ["Advanced Excel (VLOOKUP, Pivot)", "Business Email Writing", "Cloud Document Management"]
  },
  {
    step: 2,
    title: "Industry Software (ERP & CRM)",
    titleMr: "उद्योग सॉफ्टवेअर (ईआरपी व सीआरएम)",
    duration: "3 Weeks (Evening / Weekend Cohort)",
    provider: "Government Polytechnic Pune & Indo-German Tool Room",
    description: "Hands-on training in SAP ERP inventory management, Tally Prime accounting, and Zendesk/Salesforce CRM basics.",
    status: "in-progress",
    currentProgress: 65,
    subsidy: "State Subsidized under MMKVY (₹0 Student Fee)",
    skillsGained: ["SAP Material Management (MM)", "Tally Prime with GST", "CRM Ticket Resolution"]
  },
  {
    step: 3,
    title: "Practical Simulation & Workplace Readiness",
    titleMr: "प्रत्यक्ष प्रात्यक्षिक व कार्यालयीन तयारी",
    duration: "2 Weeks (On-site Simulation Lab)",
    provider: "MSSDS Center of Excellence, Pimpri",
    description: "Simulated corporate office environment, mock client calls, document processing, and interview confidence workshops.",
    status: "upcoming",
    subsidy: "Eligible for ₹2,000 Travel Allowance",
    skillsGained: ["Corporate Workplace Etiquette", "Problem Solving Under Deadlines", "Mock Video Interviewing"]
  },
  {
    step: 4,
    title: "State-Verified Micro-Certification",
    titleMr: "राज्य-मान्यताप्राप्त डिजिटल प्रमाणपत्र",
    duration: "1 Week (Digital Exam & Assessment)",
    provider: "Maharashtra State Skill Development Society (MSSDS)",
    description: "Standardized competency evaluation and issuance of tamper-proof DigiLocker certificate recognized by 5,000+ state employers.",
    status: "upcoming",
    subsidy: "Free Examination Voucher",
    skillsGained: ["Certified Operations Associate (COA)", "Verified Digital Skill Badge"]
  },
  {
    step: 5,
    title: "Direct Job Applications & Placement Drives",
    titleMr: "थेट रोजगार व भरती मेळावे",
    duration: "Immediate Placement Support",
    provider: "MahaSkill Placement Cell & Partner MSMEs",
    description: "Dedicated interview scheduling with companies committed to hiring career-restart candidates and women returnees.",
    status: "upcoming",
    subsidy: "Guaranteed 3 Interview Opportunities",
    skillsGained: ["Full-Time Corporate Employment", "Financial Independence"]
  }
];

exports.restartJobsToday = [
  {
    id: "today-1",
    title: "Front Desk & Customer Operations Associate",
    company: "Sahyadri Hospitals & Wellness Centers",
    location: "Pune (Deccan Gymkhana & Kothrud)",
    salary: "₹3.2L - ₹4.5L LPA",
    workType: "Full-Time (Day Shift)",
    readiness: "100% Ready Today",
    badge: "Immediate Start",
    whyEligible: "Your 5-year customer handling and billing background perfectly fulfills all requirements for this hospital front-desk role.",
    requiredSkills: ["Customer Communication", "Basic Billing", "Marathi/Hindi Fluency"]
  },
  {
    id: "today-2",
    title: "Warehouse Inventory & Dispatch Assistant",
    company: "Maharashtra Agro-Logistics Corp",
    location: "Pune (Hadapsar MIDC)",
    salary: "₹3.4L - ₹4.8L LPA",
    workType: "Full-Time (On-site)",
    readiness: "95% Ready Today",
    badge: "Immediate Start",
    whyEligible: "Strong stock counting and inventory audit experience from retail gives you a high hiring priority.",
    requiredSkills: ["Inventory Auditing", "Stock Entry", "POS Systems"]
  }
];

exports.restartJobsUnlocked = [
  {
    id: "unlocked-1",
    title: "Supply Chain & ERP Operations Specialist",
    company: "Bajaj Auto Logistics Hub / Tier-1 Supplier",
    location: "Pune (Chakan & Akurdi)",
    salary: "₹4.8L - ₹7.0L LPA (+55% Salary Increase)",
    workType: "Full-Time (Hybrid options)",
    unlockStep: "Unlocked after Step 2 (ERP & Industry Software)",
    badge: "High Growth Career",
    whyUnlocked: "Combining your inventory background with the current SAP/ERP training unlocks mid-level supply chain positions.",
    requiredSkills: ["SAP ERP (In Progress)", "Vendor Management", "Excel Reporting", "Customer Service"]
  },
  {
    id: "unlocked-2",
    title: "Corporate Client Success & CRM Lead",
    company: "TechMahindra GovTech Solutions",
    location: "Pune (Hinjawadi / Work from Home 3 days)",
    salary: "₹5.0L - ₹7.5L LPA (+66% Salary Increase)",
    workType: "Hybrid (3 days WFH)",
    unlockStep: "Unlocked after Step 4 (MSSDS Certified)",
    badge: "High Growth Career",
    whyUnlocked: "Your natural customer resolution skills combined with digital CRM tools qualifies you for corporate client success roles.",
    requiredSkills: ["CRM Tools", "Business Writing", "Client Onboarding", "Conflict Resolution"]
  }
];

exports.aiCareerCoachQA = {
  en: [
    {
      q: "I worked in retail for 5 years but now I want an office job.",
      a: "Your 5 years of retail experience are highly valuable! You already possess customer empathy, real-time problem-solving, and inventory handling. By adding a 3-week certification in **MS Office & ERP (Tally/SAP)**, you can comfortably transition into:\n\n1. **Operations & Logistics Coordinator** (Avg. ₹4.2L - ₹6.0L)\n2. **Corporate Client Support Specialist** (Avg. ₹3.8L - ₹5.5L)\n3. **Front Office Administrative Lead** (Avg. ₹3.5L - ₹4.8L)\n\nWe have subsidized batches starting this Monday in Pune. Would you like me to reserve your free seat?"
    },
    {
      q: "How should I explain my 4-year career gap on my resume?",
      a: "Career breaks for family or personal care are completely natural and respected by modern Maharashtra employers! In MahaSkill Connect:\n\n- We format your resume using a **Functional / Hybrid Skill-First Format** that highlights your transferable competencies rather than chronological gaps.\n- We attach your **MahaSkill Digital Upskilling Badge** which proves you are actively up to date with modern workplace tools.\n- 85+ partnered companies on our portal have committed to zero gap penalties under the Maharashtra Women Returnship initiative."
    }
  ],
  mr: [
    {
      q: "मी ५ वर्षे रिटेलमध्ये काम केले पण आता मला ऑफिस जॉब हवा आहे.",
      a: "तुमचा ५ वर्षांचा रिटेलमधील अनुभव अत्यंत उपयुक्त आहे! तुमच्याकडे ग्राहकांशी संवाद, समस्या निवारण आणि स्टॉक मॅनेजमेंटचे उत्कृष्ट कौशल्य आहे. **एमएस ऑफिस आणि ईआरपी (Tally/SAP)** चे ३ आठवड्यांचे मोफत शासकीय प्रशिक्षण पूर्ण करून तुम्ही खालील पदांसाठी थेट पात्र ठराल:\n\n१. **लॉजिस्टिक्स व ऑपरेशन्स समन्वयक** (वेतन: ₹४.२ लाख ते ₹६.० लाख)\n२. **क्लायंट सपोर्ट व प्रशासन अधिकारी** (वेतन: ₹३.५ लाख ते ₹५.५ लाख)\n\nपुण्यात यासाठी मोफत बॅच उपलब्ध आहे. आपण नावनोंदणी करू इच्छिता का?"
    }
  ],
  hi: [
    {
      q: "मैंने ५ साल रिटेल में काम किया लेकिन अब मैं ऑफिस जॉब चाहता हूँ।",
      a: "आपका ५ साल का रिटेल अनुभव बहुत मूल्यवान है! आपके पास ग्राहक सेवा और बातचीत का बेहतरीन अनुभव है। **एमएस ऑफिस और ईआरपी** का ३ सप्ताह का प्रशिक्षण लेकर आप आसानी से ऑफिस एडमिन या लॉजिस्टिक्स कोऑर्डिनेटर बन सकते हैं।\n\nक्या आप निशुल्क बैच में अपना स्थान सुरक्षित करना चाहते हैं?"
    }
  ]
};
