// Mock Data for MahaSkill Connect - Student Portal (SiteMap Module 2)

exports.studentProfile = {
  name: "Aditya Patil",
  studentId: "MH-STU-2026-8942",
  avatar: "AP",
  institution: "Government Polytechnic, Pune",
  stream: "Diploma in Electrical & Electronics Engineering",
  semester: "Semester 5 (Final Year)",
  gpa: "8.6 / 10",
  careerMatchScore: 88,
  learningStreak: 14,
  coinsEarned: 1250,
  targetCareer: "Industrial Automation & Robotics Specialist",
  targetDistrict: "Pune / Chakan MIDC",
  digilockerVerified: true
};

exports.studentAssessmentQuestions = [
  {
    id: 1,
    category: "Technical Aptitude",
    question: "In an industrial PLC (Programmable Logic Controller) circuit, what is the primary function of an Optocoupler in the I/O module?",
    options: [
      { text: "Electrical isolation between high-voltage field devices and low-voltage CPU logic", isCorrect: true, score: 20 },
      { text: "Amplifying analog sensor signals to 240V AC", isCorrect: false, score: 0 },
      { text: "Providing battery backup for RAM data retention", isCorrect: false, score: 0 },
      { text: "Converting binary ladder logic to machine code", isCorrect: false, score: 0 }
    ],
    explanation: "Optocouplers prevent electrical transients and noise in field circuits from damaging sensitive microcontrollers."
  },
  {
    id: 2,
    category: "Automation & Sensors",
    question: "Which communication protocol is most commonly utilized for real-time sensor-to-cloud industrial telemetry in Industry 4.0?",
    options: [
      { text: "MQTT / Modbus TCP over Industrial Ethernet", isCorrect: true, score: 20 },
      { text: "FTP (File Transfer Protocol)", isCorrect: false, score: 0 },
      { text: "SMTP Email Relay", isCorrect: false, score: 0 },
      { text: "Legacy RS-232 without parity", isCorrect: false, score: 0 }
    ],
    explanation: "MQTT and Modbus TCP offer lightweight publish-subscribe architectures ideal for IIoT telemetry."
  },
  {
    id: 3,
    category: "EV & Battery Systems",
    question: "What is the primary danger prevented by a Battery Management System (BMS) during regenerative braking in an Electric Vehicle?",
    options: [
      { text: "Cell over-voltage, thermal runaway, and localized overcharging", isCorrect: true, score: 20 },
      { text: "Motor stator demagnetization", isCorrect: false, score: 0 },
      { text: "Mechanical brake pad wear", isCorrect: false, score: 0 },
      { text: "Headlight voltage drop", isCorrect: false, score: 0 }
    ],
    explanation: "BMS continuously monitors cell voltages and temperatures to avoid thermal runaway under high regenerative current pulses."
  },
  {
    id: 4,
    category: "Problem Solving & Logic",
    question: "A conveyor system stops unexpectedly with no alarm on the HMI. What is the standard diagnostic sequence?",
    options: [
      { text: "1. Emergency Stop loop status → 2. Field sensor LED states → 3. PLC I/O rack status → 4. VFD fault register", isCorrect: true, score: 20 },
      { text: "Replace the entire PLC power supply immediately", isCorrect: false, score: 0 },
      { text: "Reboot the factory transformer", isCorrect: false, score: 0 },
      { text: "Bypass all safety interlocks", isCorrect: false, score: 0 }
    ],
    explanation: "A methodical diagnosis begins with safety circuits (E-stops) and physical sensor inputs before inspecting firmware registers."
  },
  {
    id: 5,
    category: "Workplace Safety & Standards",
    question: "Under Directorate of Industrial Safety and Health (DISH) Maharashtra guidelines, what is Lockout/Tagout (LOTO) used for?",
    options: [
      { text: "Zero Energy State isolation before conducting maintenance on machinery", isCorrect: true, score: 20 },
      { text: "Recording employee attendance at factory gates", isCorrect: false, score: 0 },
      { text: "Inventory counting of spare components", isCorrect: false, score: 0 },
      { text: "Locking the IT server room during shifts", isCorrect: false, score: 0 }
    ],
    explanation: "LOTO guarantees that dangerous machines are properly shut down and cannot be energized prior to completion of maintenance."
  }
];

exports.studentSkillMatrix = [
  { skill: "PLC Ladder Logic (Siemens S7-1200)", level: "Advanced", score: 85, verified: true, authority: "Indo-German Tool Room (IGTR)" },
  { skill: "SCADA & Telemetry (Wonderware/Delta)", level: "Intermediate", score: 68, verified: true, authority: "MSBTE Certified" },
  { skill: "Industrial Robotics (ABB/Fanuc Arm)", level: "Intermediate", score: 62, verified: false, authority: "In Progress" },
  { skill: "Python for Industrial IoT", level: "Beginner", score: 45, verified: false, authority: "Self-Paced" },
  { skill: "Pneumatics & Electro-Hydraulics", level: "Advanced", score: 90, verified: true, authority: "Govt ITI Aundh" },
  { skill: "Electric Vehicle Safety & High Voltage", level: "Intermediate", score: 70, verified: true, authority: "ARAI Accredited" }
];

exports.studentEnrolledCourses = [
  {
    id: "stu-crs-1",
    title: "Advanced Industrial Automation & Robotics (Industry 4.0)",
    provider: "Indo-German Tool Room (IGTR) & Govt ITI Pune",
    progress: 78,
    totalModules: 12,
    completedModules: 9,
    hoursCompleted: 94,
    totalHours: 120,
    stipendEligible: true,
    stipendAmount: "₹10,000 / mo",
    badge: "Govt Subsidized • 100% Fee Reimbursed",
    nextMilestone: "Module 10: 6-Axis Robotic Arm Teach Pendant Programming",
    instructor: "Dr. Sandeep Kulkarni (Senior Mechatronics Lead)"
  },
  {
    id: "stu-crs-2",
    title: "EV Powertrain Diagnostics & High Voltage Battery Systems",
    provider: "Automotive Research Association of India (ARAI) & DVET",
    progress: 45,
    totalModules: 8,
    completedModules: 4,
    hoursCompleted: 36,
    totalHours: 80,
    stipendEligible: true,
    stipendAmount: "₹12,000 / mo NAPS",
    badge: "ARAI Industry Certified",
    nextMilestone: "Module 5: BMS CAN Bus Protocol Decoding & Fault Logs",
    instructor: "Prof. Ananya Deshmukh (ARAI Certified Master Trainer)"
  },
  {
    id: "stu-crs-3",
    title: "Industrial IoT & Cloud Telemetry for Modern Factories",
    provider: "Maharashtra State Innovation Society (MSInS)",
    progress: 25,
    totalModules: 10,
    completedModules: 2,
    hoursCompleted: 15,
    totalHours: 60,
    stipendEligible: false,
    stipendAmount: "Certificate Only",
    badge: "Micro-Credential",
    nextMilestone: "Module 3: Modbus TCP to AWS IoT Core Gateway Setup",
    instructor: "Vikram Gaikwad (Principal IoT Architect, Pune)"
  }
];

exports.studentLearningPathMilestones = [
  {
    step: 1,
    title: "Electrical & Sensor Fundamentals",
    status: "Completed",
    duration: "4 Weeks",
    topics: ["3-Phase AC/DC Power", "Proximity & Optical Sensors", "Relay Control Logic"],
    score: "94% Distinction"
  },
  {
    step: 2,
    title: "PLC Programming & Virtual HMI Simulation",
    status: "Completed",
    duration: "6 Weeks",
    topics: ["Siemens TIA Portal", "Timer & Counter Blocks", "HMI Screen Design"],
    score: "88% First Class"
  },
  {
    step: 3,
    title: "Industrial Robotics & Servo Motion",
    status: "In Progress",
    duration: "6 Weeks",
    topics: ["Robotic Kinematics", "Pick & Place Coordinates", "Collision Zone Interlocks"],
    progress: "75% Completed"
  },
  {
    step: 4,
    title: "Live Industry Capstone at Chakan Auto Cluster",
    status: "Upcoming",
    duration: "4 Weeks",
    topics: ["Automated Welding Cell Audit", "Telemetry Optimization", "Cycle Time Reduction"],
    progress: "Unlocks Next Week"
  },
  {
    step: 5,
    title: "NAPS Direct Placement / Apprenticeship",
    status: "Target",
    duration: "1 Year Contract",
    topics: ["Tata Motors / Bajaj Auto / Bharat Forge On-Floor Deployment", "₹18,500/mo + ₹12,000 Govt DBT"],
    progress: "Placement Drive: Nov 2026"
  }
];

exports.studentCampusJobs = [
  {
    id: "stu-job-1",
    title: "Junior Automation & Robotics Apprentice",
    company: "Tata Motors Limited",
    location: "Pune (Chakan Plant 2)",
    type: "NAPS Apprenticeship",
    stipend: "₹18,500/mo + ₹4,500 Govt DBT",
    matchScore: 94,
    eligible: true,
    deadline: "In 4 Days",
    requiredSkills: ["PLC Basics", "Electrical Safety", "Ladder Logic"],
    interviewsScheduled: 142
  },
  {
    id: "stu-job-2",
    title: "EV Battery Assembly & Quality Trainee",
    company: "Mahindra & Mahindra Last Mile Mobility",
    location: "Chhatrapati Sambhaji Nagar (Waluj)",
    type: "Graduate Apprentice (GAT)",
    stipend: "₹21,000/mo + Free Transport",
    matchScore: 89,
    eligible: true,
    deadline: "In 7 Days",
    requiredSkills: ["BMS Testing", "Multimeter Diagnostics", "LOTO Protocols"],
    interviewsScheduled: 98
  },
  {
    id: "stu-job-3",
    title: "Mechatronics Maintenance Trainee",
    company: "Bharat Forge Limited",
    location: "Pune (Mundhwa Forge Division)",
    type: "On-Roll Technical Trainee",
    stipend: "₹24,000/mo (₹3.6L CTC Post Training)",
    matchScore: 85,
    eligible: true,
    deadline: "In 10 Days",
    requiredSkills: ["Hydraulics", "Pneumatics", "PLC Troubleshooting"],
    interviewsScheduled: 210
  }
];
