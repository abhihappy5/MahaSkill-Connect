// Complete 36 Districts of Maharashtra mapped across all 6 Official Revenue Divisions
exports.districtTranslations = {
  // 1. Konkan Division (7)
  "Mumbai City": { mr: "मुंबई शहर", hi: "मुंबई शहर", en: "Mumbai City" },
  "Mumbai Suburban": { mr: "मुंबई उपनगर", hi: "मुंबई उपनगर", en: "Mumbai Suburban" },
  "Thane": { mr: "ठाणे", hi: "ठाणे", en: "Thane" },
  "Palghar": { mr: "पालघर", hi: "पालघर", en: "Palghar" },
  "Raigad": { mr: "रायगड", hi: "रायगढ़", en: "Raigad" },
  "Ratnagiri": { mr: "रत्नागिरी", hi: "रत्नागिरि", en: "Ratnagiri" },
  "Sindhudurg": { mr: "सिंधुदुर्ग", hi: "सिंधुदुर्ग", en: "Sindhudurg" },

  // 2. Pune Division (5)
  "Pune": { mr: "पुणे", hi: "पुणे", en: "Pune" },
  "Satara": { mr: "सातारा", hi: "सतारा", en: "Satara" },
  "Kolhapur": { mr: "कोल्हापूर", hi: "कोल्हापुर", en: "Kolhapur" },
  "Solapur": { mr: "सोलापूर", hi: "सोलापुर", en: "Solapur" },
  "Sangli": { mr: "सांगली", hi: "सांगली", en: "Sangli" },

  // 3. Nashik Division (5)
  "Nashik": { mr: "नाशिक", hi: "नासिक", en: "Nashik" },
  "Ahmednagar": { mr: "अहिल्यानगर (अहमदनगर)", hi: "अहिल्यानगर (अहमदनगर)", en: "Ahmednagar" },
  "Ahmadnagar": { mr: "अहिल्यानगर (अहमदनगर)", hi: "अहिल्यानगर (अहमदनगर)", en: "Ahmednagar" },
  "Jalgaon": { mr: "जळगाव", hi: "जलगांव", en: "Jalgaon" },
  "Dhule": { mr: "धुळे", hi: "धुले", en: "Dhule" },
  "Nandurbar": { mr: "नंदुरबार", hi: "नंदुरबार", en: "Nandurbar" },

  // 4. Chhatrapati Sambhajinagar (Marathwada) Division (8)
  "Chhatrapati Sambhaji Nagar": { mr: "छत्रपती संभाजीनगर", hi: "छत्रपति संभाजीनगर", en: "Chhatrapati Sambhajinagar" },
  "Chhatrapati Sambhajinagar": { mr: "छत्रपती संभाजीनगर", hi: "छत्रपति संभाजीनगर", en: "Chhatrapati Sambhajinagar" },
  "Aurangabad": { mr: "छत्रपती संभाजीनगर", hi: "छत्रपति संभाजीनगर", en: "Chhatrapati Sambhajinagar" },
  "Jalna": { mr: "जालना", hi: "जालना", en: "Jalna" },
  "Beed": { mr: "बीड", hi: "बीड", en: "Beed" },
  "Dharashiv": { mr: "धाराशिव (उस्मानाबाद)", hi: "धाराशिव (उस्मानाबाद)", en: "Dharashiv (Osmanabad)" },
  "Usmanabad (Dharashiv)": { mr: "धाराशिव (उस्मानाबाद)", hi: "धाराशिव (उस्मानाबाद)", en: "Dharashiv (Osmanabad)" },
  "Dharashiv (Osmanabad)": { mr: "धाराशिव (उस्मानाबाद)", hi: "धाराशिव (उस्मानाबाद)", en: "Dharashiv (Osmanabad)" },
  "Nanded": { mr: "नांदेड", hi: "नांदेड़", en: "Nanded" },
  "Latur": { mr: "लातूर", hi: "लातुर", en: "Latur" },
  "Parbhani": { mr: "परभणी", hi: "परभणी", en: "Parbhani" },
  "Hingoli": { mr: "हिंगोली", hi: "हिंगोली", en: "Hingoli" },

  // 5. Amravati Division (5)
  "Amravati": { mr: "अमरावती", hi: "अमरावती", en: "Amravati" },
  "Amaravati": { mr: "अमरावती", hi: "अमरावती", en: "Amravati" },
  "Akola": { mr: "अकोला", hi: "अकोला", en: "Akola" },
  "Buldhana": { mr: "बुलढाणा", hi: "बुलढाणा", en: "Buldhana" },
  "Washim": { mr: "वाशिम", hi: "वाशिम", en: "Washim" },
  "Yavatmal": { mr: "यवतमाळ", hi: "यवतमाल", en: "Yavatmal" },

  // 6. Nagpur Division (6)
  "Nagpur": { mr: "नागपूर", hi: "नागपुर", en: "Nagpur" },
  "Wardha": { mr: "वर्धा", hi: "वर्धा", en: "Wardha" },
  "Bhandara": { mr: "भंडारा", hi: "भंडारा", en: "Bhandara" },
  "Gondia": { mr: "गोंदिया", hi: "गोंदिया", en: "Gondia" },
  "Chandrapur": { mr: "चंद्रपूर", hi: "चंद्रपुर", en: "Chandrapur" },
  "Gadchiroli": { mr: "गडचिरोली", hi: "गडचिरोली", en: "Gadchiroli" }
};

exports.divisionsData = [
  {
    id: "pune",
    name: "Pune Division",
    nameMr: "पुणे विभाग",
    nameHi: "पुणे संभाग",
    headquarters: "Pune",
    headquartersMr: "पुणे",
    headquartersHi: "पुणे",
    color: "#73b06f",
    lightColor: "#f0f7ef",
    borderColor: "#96c693",
    districts: ["Pune", "Satara", "Solapur", "Sangli", "Kolhapur"],
    districtsCount: 5,
    summary: "Auto, EV Manufacturing, IT & AI, Precision Tooling & Agritech corridor",
    summaryMr: "ऑटोमोबाईल, ईव्ही उत्पादन, आयटी व एआय, प्रिसिजन टूलिंग आणि ॲग्रीटेक कॉरिडॉर",
    summaryHi: "ऑटोमोबाइल, ईवी निर्माण, आईटी एवं एआई, प्रिसिजन टूलिंग और एग्रीटेक गलियारा",
    vacancies: "48,200+",
    trainingCenters: 420,
    shortageIndex: "High (41% Tech Gap)",
    shortageIndexMr: "उच्च (४१% तांत्रिक कौशल्य तफावत)",
    shortageIndexHi: "उच्च (४१% तकनीकी कौशल अंतर)",
    focus: "Automotive, EV Manufacturing, IT Services & Precision Foundry",
    focusMr: "ऑटोमोटिव्ह, ईव्ही मॅन्युफॅक्चरिंग, आयटी सेवा आणि प्रिसिजन फाउंड्री",
    focusHi: "ऑटोमोटिव, ईवी विनिर्माण, आईटी सेवाएं और प्रिसिजन फाउंड्री",
    topOccupations: [
      { 
        role: "EV Powertrain & Battery Tech", 
        roleMr: "ईव्ही पॉवरट्रेन व बॅटरी तंत्रज्ञ", 
        roleHi: "ईवी पावरट्रेन एवं बैटरी तकनीशियन", 
        demand: "Surging (+48%)", 
        demandMr: "वेगाने वाढणारी (+४८%)", 
        demandHi: "तीव्र मांग (+४८%)", 
        salary: "₹5.2L - ₹9.8L", 
        openings: 4200 
      },
      { 
        role: "Industrial Robotics & Automation Operator", 
        roleMr: "औद्योगिक रोबोटिक्स व ऑटोमेशन ऑपरेटर", 
        roleHi: "औद्योगिक रोबोटिक्स एवं ऑटोमेशन ऑपरेटर", 
        demand: "High (+36%)", 
        demandMr: "उच्च (+३६%)", 
        demandHi: "उच्च (+३६%)", 
        salary: "₹4.5L - ₹8.2L", 
        openings: 3800 
      },
      { 
        role: "Embedded Systems & IoT Engineer", 
        roleMr: "एम्बेडेड सिस्टीम्स व IoT अभियंता", 
        roleHi: "एम्बेडेड सिस्टम्स एवं IoT इंजीनियर", 
        demand: "Surging (+52%)", 
        demandMr: "वेगाने वाढणारी (+५२%)", 
        demandHi: "तीव्र मांग (+५२%)", 
        salary: "₹6.0L - ₹14.0L", 
        openings: 5100 
      },
      { 
        role: "Precision CNC Machine Programmer", 
        roleMr: "प्रिसिजन सीएनसी मशीन प्रोग्रामर", 
        roleHi: "प्रिसिजन सीएनसी मशीन प्रोग्रामर", 
        demand: "High (+29%)", 
        demandMr: "उच्च (+२९%)", 
        demandHi: "उच्च (+२९%)", 
        salary: "₹3.8L - ₹6.5L", 
        openings: 2900 
      }
    ],
    skillShortages: [
      "Lithium Battery Management & BMS Testing",
      "ROS (Robot Operating System) & PLC Programming",
      "ISO/TS Automotive Quality Auditing",
      "Full-stack Edge Computing & AI Inference"
    ],
    skillShortagesMr: [
      "लिथियम बॅटरी मॅनेजमेंट व बीएमएस चाचणी",
      "रोबोट ऑपरेटिंग सिस्टीम (ROS) व पीएलसी प्रोग्रामिंग",
      "आयएसओ/टीएस ऑटोमोटिव्ह गुणवत्ता ऑडिटिंग",
      "फुल-स्टॅक एज कॉम्प्युटिंग व एआय इन्फरन्स"
    ],
    skillShortagesHi: [
      "लिथियम बैटरी प्रबंधन एवं बीएमएस परीक्षण",
      "रोबोट ऑपरेटिंग सिस्टम (ROS) व पीएलसी प्रोग्रामिंग",
      "आईएसओ/टीएस ऑटोमोटिव गुणवत्ता ऑडिटिंग",
      "फुल-स्टैक एज कंप्यूटिंग एवं एआई इंफरेंस"
    ],
    industrialCorridors: [
      "Chakan-Talegaon Auto Hub",
      "Hinjawadi Infotech Zone",
      "Khed City",
      "Kolhapur Foundry & Sugar Machinery"
    ],
    industrialCorridorsMr: [
      "चाकण-तळेगाव ऑटो हब",
      "हिंजवडी इन्फोटेक झोन",
      "खेड सिटी",
      "कोल्हापूर फाउंड्री व साखर यंत्रसामग्री"
    ],
    industrialCorridorsHi: [
      "चाकण-तलेगांव ऑटो हब",
      "हिंजवडी इन्फोटेक जोन",
      "खेड सिटी",
      "कोल्हापुर फाउंड्री एवं चीनी मशीनरी"
    ]
  },
  {
    id: "konkan",
    name: "Konkan Division",
    nameMr: "कोकण विभाग",
    nameHi: "कोंकण संभाग",
    headquarters: "Mumbai",
    headquartersMr: "मुंबई",
    headquartersHi: "मुंबई",
    color: "#857368",
    lightColor: "#f5f3f0",
    borderColor: "#a89b91",
    districts: ["Palghar", "Thane", "Mumbai Suburban", "Mumbai City", "Raigad", "Ratnagiri", "Sindhudurg"],
    districtsCount: 7,
    summary: "Fintech, Logistics & Maritime, Cyber Defense, AI Systems & Chem-Pharma",
    summaryMr: "फिनटेक, सागरी लॉजिस्टिक्स, सायबर सुरक्षा, एआय सिस्टीम्स आणि केमिकल-फार्मा",
    summaryHi: "फिनटेक, समुद्री लॉजिस्टिक्स, साइबर सुरक्षा, एआई सिस्टम और केमिकल-फार्मा",
    vacancies: "54,600+",
    trainingCenters: 510,
    shortageIndex: "Critical (47% Advanced Skills Gap)",
    shortageIndexMr: "गंभीर (४७% प्रगत कौशल्य तफावत)",
    shortageIndexHi: "गंभीर (४७% उन्नत कौशल अंतर)",
    focus: "Fintech, Maritime Logistics, AI Data Centers & Chem-Pharma",
    focusMr: "फिनटेक, सागरी लॉजिस्टिक्स, एआय डेटा सेंटर्स आणि केमिकल-फार्मा",
    focusHi: "फिनटेक, समुद्री लॉजिस्टिक्स, एआई डेटा सेंटर और केमिकल-फार्मा",
    topOccupations: [
      { 
        role: "AI & LLM Solutions Architect", 
        roleMr: "एआय व एलएलएम सोल्युशन्स आर्किटेक्ट", 
        roleHi: "एआई एवं एलएलएम सॉल्यूशंस आर्किटेक्ट", 
        demand: "Surging (+64%)", 
        demandMr: "वेगाने वाढणारी (+६४%)", 
        demandHi: "तीव्र मांग (+६४%)", 
        salary: "₹9.0L - ₹22.0L", 
        openings: 7400 
      },
      { 
        role: "Cloud Security & DevSecOps Lead", 
        roleMr: "क्लाउड सुरक्षा व DevSecOps लीड", 
        roleHi: "क्लाउड सुरक्षा एवं DevSecOps लीड", 
        demand: "Surging (+44%)", 
        demandMr: "वेगाने वाढणारी (+४४%)", 
        demandHi: "तीव्र मांग (+४४%)", 
        salary: "₹7.5L - ₹18.0L", 
        openings: 6100 
      },
      { 
        role: "Maritime Logistics & Cold Chain Manager", 
        roleMr: "सागरी वाहतूक व कोल्ड चेन व्यवस्थापक", 
        roleHi: "समुद्री लॉजिस्टिक्स एवं कोल्ड चेन प्रबंधक", 
        demand: "High (+31%)", 
        demandMr: "उच्च (+३१%)", 
        demandHi: "उच्च (+३१%)", 
        salary: "₹4.8L - ₹10.5L", 
        openings: 3200 
      },
      { 
        role: "API & Chemical Process Operator", 
        roleMr: "API व केमिकल प्रक्रिया ऑपरेटर", 
        roleHi: "एपीआई एवं केमिकल प्रोसेस ऑपरेटर", 
        demand: "High (+27%)", 
        demandMr: "उच्च (+२७%)", 
        demandHi: "उच्च (+२७%)", 
        salary: "₹3.6L - ₹6.8L", 
        openings: 4100 
      }
    ],
    skillShortages: [
      "Generative AI Prompting & Fine-Tuning",
      "Zero Trust Architecture & CERT-In Compliance",
      "Automated Port Cargo & RFID Tracking",
      "GMP Cleanroom Validation"
    ],
    skillShortagesMr: [
      "जनरेटिव्ह एआय प्रॉम्टिंग व फाइन-ट्यूनिंग",
      "झिरो ट्रस्ट आर्किटेक्चर व सायबर नियम",
      "स्वयंचलित बंदर कार्गो व RFID ट्रॅकिंग",
      "जीएमपी क्लिनरूम प्रमाणीकरण"
    ],
    skillShortagesHi: [
      "जनरेटिव एआई प्रॉम्प्टिंग एवं फाइन-ट्यूनिंग",
      "जीरो ट्रस्ट आर्किटेक्चर व साइबर अनुपालन",
      "स्वचालित पोर्ट कार्गो एवं आरएफआईडी ट्रैकिंग",
      "जीएमपी क्लीनरूम सत्यापन"
    ],
    industrialCorridors: [
      "BKC & Navi Mumbai Data Centers",
      "JNPA Special Economic Zone",
      "Tarapur MIDC",
      "Taloja Chem-Hub"
    ],
    industrialCorridorsMr: [
      "बीकेसी व नवी मुंबई डेटा सेंटर्स",
      "जेएनपीए विशेष आर्थिक क्षेत्र (SEZ)",
      "तारापूर एमआयडीसी",
      "तळोजा केमिकल हब"
    ],
    industrialCorridorsHi: [
      "बीकेसी एवं नवी मुंबई डेटा सेंटर",
      "जेएनपीए विशेष आर्थिक क्षेत्र (SEZ)",
      "तारापुर एमआईडीसी",
      "तळोजा केमिकल हब"
    ]
  },
  {
    id: "marathwada",
    name: "Aurangabad / Marathwada Division",
    nameMr: "छत्रपती संभाजीनगर (मराठवाडा)",
    nameHi: "छत्रपति संभाजीनगर (मराठवाड़ा)",
    headquarters: "Chhatrapati Sambhajinagar",
    headquartersMr: "छत्रपती संभाजीनगर",
    headquartersHi: "छत्रपति संभाजीनगर",
    color: "#8a9bf3",
    lightColor: "#f0f3fd",
    borderColor: "#b2bef7",
    districts: ["Aurangabad", "Jalna", "Beed", "Usmanabad (Dharashiv)", "Latur", "Parbhani", "Hingoli", "Nanded"],
    districtsCount: 8,
    summary: "AURIC Smart City, Auto Components, Steel, Seed Tech & Pharma hub",
    summaryMr: "ऑरिक स्मार्ट सिटी, ऑटो घटक, स्टील, कृषी बियाणे तंत्रज्ञान आणि फार्मा हब",
    summaryHi: "ऑरिक स्मार्ट सिटी, ऑटो कंपोनेंट्स, स्टील, कृषि बीज तकनीक और फार्मा हब",
    vacancies: "16,800+",
    trainingCenters: 210,
    shortageIndex: "Moderate (33% Industrial Skills)",
    shortageIndexMr: "मध्यम (३३% औद्योगिक कौशल्य तफावत)",
    shortageIndexHi: "मध्यम (३३% औद्योगिक कौशल अंतर)",
    focus: "AURIC Smart City, Auto Components, Steel & Seed Tech",
    focusMr: "ऑरिक स्मार्ट सिटी, ऑटो घटक, स्टील आणि बियाणे तंत्रज्ञान",
    focusHi: "ऑरिक स्मार्ट सिटी, ऑटो कंपोनेंट्स, स्टील एवं बीज तकनीक",
    topOccupations: [
      { 
        role: "Auto Component Tool & Die Maker", 
        roleMr: "ऑटो घटक टूल व डाय मेकर", 
        roleHi: "ऑटो घटक टूल एवं डाई मेकर", 
        demand: "High (+34%)", 
        demandMr: "उच्च (+३४%)", 
        demandHi: "उच्च (+३४%)", 
        salary: "₹3.6L - ₹6.8L", 
        openings: 2100 
      },
      { 
        role: "Smart Factory Maintenance Tech", 
        roleMr: "स्मार्ट फॅक्टरी देखभाल तंत्रज्ञ", 
        roleHi: "स्मार्ट फैक्ट्री रखरखाव तकनीशियन", 
        demand: "Surging (+41%)", 
        demandMr: "वेगाने वाढणारी (+४१%)", 
        demandHi: "तीव्र मांग (+४१%)", 
        salary: "₹4.0L - ₹7.5L", 
        openings: 1800 
      },
      { 
        role: "Pharma QC & HPLC Analyst", 
        roleMr: "फार्मा क्यूसी व एचपीएलसी विश्लेषक", 
        roleHi: "फार्मा क्यूसी एवं एचपीएलसी विश्लेषक", 
        demand: "High (+28%)", 
        demandMr: "उच्च (+२८%)", 
        demandHi: "उच्च (+२८%)", 
        salary: "₹3.8L - ₹7.0L", 
        openings: 1600 
      },
      { 
        role: "Solar Farm Installation Tech", 
        roleMr: "सोलर फार्म इन्स्टॉलेशन तंत्रज्ञ", 
        roleHi: "सोलर फार्म इंस्टॉलेशन तकनीशियन", 
        demand: "High (+38%)", 
        demandMr: "उच्च (+३८%)", 
        demandHi: "उच्च (+३८%)", 
        salary: "₹3.2L - ₹5.5L", 
        openings: 1400 
      }
    ],
    skillShortages: [
      "CAD/CAM Injection Moulding",
      "SCADA & Sensor Calibration",
      "USFDA Regulatory Compliance for API",
      "Grid Inverter Synchronization"
    ],
    skillShortagesMr: [
      "CAD/CAM इंजेक्शन मोल्डिंग",
      "SCADA व सेन्सर कॅलिब्रेशन",
      "API साठी यूएसएफडीए नियम अनुपालन",
      "ग्रिड इन्व्हर्टर सिंक्रोनायझेशन"
    ],
    skillShortagesHi: [
      "CAD/CAM इंजेक्शन मोल्डिंग",
      "SCADA एवं सेंसर कैलिब्रेशन",
      "एपीआई हेतु यूएसएफडीए नियामक अनुपालन",
      "ग्रिड इन्वर्टर सिंक्रोनाइजेशन"
    ],
    industrialCorridors: [
      "AURIC Shendra-Bidkin",
      "Waluj MIDC",
      "Jalna Steel & Seed Corridor",
      "Nanded Textile Park"
    ],
    industrialCorridorsMr: [
      "ऑरिक शेंद्रा-बिडकीन",
      "वाळूज एमआयडीसी",
      "जालना स्टील व सीड कॉरिडॉर",
      "नांदेड वस्त्रोद्योग पार्क"
    ],
    industrialCorridorsHi: [
      "ऑरिक शेंद्रा-बिडकीन",
      "वालुज एमआईडीसी",
      "जालना स्टील एवं बीज गलियारा",
      "नांदेड़ टेक्सटाइल पार्क"
    ]
  },
  {
    id: "nagpur",
    name: "Nagpur Division (East Vidarbha)",
    nameMr: "नागपूर विभाग (पूर्व विदर्भ)",
    nameHi: "नागपुर संभाग (पूर्व विदर्भ)",
    headquarters: "Nagpur",
    headquartersMr: "नागपूर",
    headquartersHi: "नागपुर",
    color: "#dd9d64",
    lightColor: "#fdf5ee",
    borderColor: "#e8b78d",
    districts: ["Nagpur", "Wardha", "Bhandara", "Gondia", "Chandrapur", "Gadchiroli"],
    districtsCount: 6,
    summary: "MIHAN Aerospace & Cargo, Multi-Modal Logistics Hub, Mining & Green Energy",
    summaryMr: "मिहान एरोस्पेस आणि कार्गो, मल्टी-मॉडल लॉजिस्टिक्स हब, खाणकाम आणि हरित ऊर्जा",
    summaryHi: "मिहान एयरोस्पेस और कार्गो, मल्टी-मॉडल लॉजिस्टिक्स हब, खनन एवं हरित ऊर्जा",
    vacancies: "14,300+",
    trainingCenters: 185,
    shortageIndex: "Moderate (29% Technical Gap)",
    shortageIndexMr: "मध्यम (२९% तांत्रिक तफावत)",
    shortageIndexHi: "मध्यम (२९% तकनीकी अंतर)",
    focus: "MIHAN Aerospace & Cargo, Heavy Mining & Clean Energy",
    focusMr: "मिहान एरोस्पेस व कार्गो, अवजड खाणकाम आणि स्वच्छ ऊर्जा",
    focusHi: "मिहान एयरोस्पेस एवं कार्गो, भारी खनन और स्वच्छ ऊर्जा",
    topOccupations: [
      { 
        role: "Aerospace Maintenance & Avionics Tech", 
        roleMr: "एरोस्पेस देखभाल व एव्हिओनिक्स तंत्रज्ञ", 
        roleHi: "एयरोस्पेस रखरखाव एवं एवियोनिक्स तकनीशियन", 
        demand: "Surging (+45%)", 
        demandMr: "वेगाने वाढणारी (+४५%)", 
        demandHi: "तीव्र मांग (+४५%)", 
        salary: "₹4.8L - ₹11.0L", 
        openings: 1700 
      },
      { 
        role: "Multi-Modal Warehouse Logistics Tech", 
        roleMr: "मल्टी-मॉडल वेअरहाऊस लॉजिस्टिक्स तंत्रज्ञ", 
        roleHi: "मल्टी-मॉडल वेयरहाउस लॉजिस्टिक्स तकनीशियन", 
        demand: "High (+38%)", 
        demandMr: "उच्च (+३८%)", 
        demandHi: "उच्च (+३८%)", 
        salary: "₹3.5L - ₹6.5L", 
        openings: 2800 
      },
      { 
        role: "Heavy Mining Machinery Operator", 
        roleMr: "अवजड खाण मशिनरी ऑपरेटर", 
        roleHi: "भारी खनन मशीनरी ऑपरेटर", 
        demand: "High (+26%)", 
        demandMr: "उच्च (+२६%)", 
        demandHi: "उच्च (+२६%)", 
        salary: "₹4.2L - ₹8.0L", 
        openings: 1900 
      },
      { 
        role: "Thermal to Green Transition Tech", 
        roleMr: "थर्मल ते हरित ऊर्जा संक्रमण तंत्रज्ञ", 
        roleHi: "थर्मल से हरित ऊर्जा संक्रमण तकनीशियन", 
        demand: "Surging (+35%)", 
        demandMr: "वेगाने वाढणारी (+३५%)", 
        demandHi: "तीव्र मांग (+३५%)", 
        salary: "₹3.8L - ₹7.2L", 
        openings: 1200 
      }
    ],
    skillShortages: [
      "Aircraft MRO Composite Repair",
      "WMS (Warehouse Management Systems) & Barcoding",
      "Automated Dragline & Excavator Telematics",
      "Carbon Capture & Flue Gas Scrubbing"
    ],
    skillShortagesMr: [
      "विमान MRO कंपोझिट दुरुस्ती",
      "वेअरहाऊस मॅनेजमेंट सिस्टीम्स (WMS) व बारकोडिंग",
      "स्वयंचलित ड्रॅगलाइन व उत्खनन टेलीमॅटिक्स",
      "कार्बन कॅप्चर व फ्ल्यू गॅस स्क्रबिंग"
    ],
    skillShortagesHi: [
      "विमान एमआरओ कंपोजिट मरम्मत",
      "वेयरहाउस मैनेजमेंट सिस्टम (WMS) व बारकोडिंग",
      "स्वचालित ड्रैगलाइन एवं एक्सकेवेटर टेलीमैटिक्स",
      "कार्बन कैप्चर एवं फ्लू गैस स्क्रबिंग"
    ],
    industrialCorridors: [
      "MIHAN SEZ",
      "Butibori Industrial Area",
      "Chandrapur Thermal & Cement Zone",
      "Wardha Dry Port"
    ],
    industrialCorridorsMr: [
      "मिहान विशेष आर्थिक क्षेत्र (SEZ)",
      "बुटीबोरी औद्योगिक क्षेत्र",
      "चंद्रपूर थर्मल व सिमेंट झोन",
      "वर्धा ड्राय पोर्ट"
    ],
    industrialCorridorsHi: [
      "मिहान सेज (SEZ)",
      "बुटीबोरी औद्योगिक क्षेत्र",
      "चंद्रपुर थर्मल एवं सीमेंट जोन",
      "वर्धा ड्राई पोर्ट"
    ]
  },
  {
    id: "nashik",
    name: "Nashik Division",
    nameMr: "नाशिक विभाग",
    nameHi: "नासिक संभाग",
    headquarters: "Nashik",
    headquartersMr: "नाशिक",
    headquartersHi: "नासिक",
    color: "#e2d24c",
    lightColor: "#fcf9e8",
    borderColor: "#eee37e",
    districts: ["Nandurbar", "Dhule", "Jalgaon", "Nashik", "Ahmadnagar"],
    districtsCount: 5,
    summary: "Defense & Aeronautics (HAL), Wine & Agro-Processing, Electricals & EV Motors",
    summaryMr: "संरक्षण व वैमानिकी (HAL), वाइन व अन्न प्रक्रिया, इलेक्ट्रिकल आणि ईव्ही मोटर्स",
    summaryHi: "रक्षा एवं वैमानिकी (HAL), वाइन व खाद्य प्रसंस्करण, इलेक्ट्रिकल्स और ईवी मोटर्स",
    vacancies: "11,200+",
    trainingCenters: 160,
    shortageIndex: "Moderate (27% Shortage)",
    shortageIndexMr: "मध्यम (२७% कौशल्य कमतरता)",
    shortageIndexHi: "मध्यम (२७% कौशल कमी)",
    focus: "Defense & Aeronautics (HAL), Solar & Wine/Agro-Processing",
    focusMr: "संरक्षण व वैमानिकी (HAL), सौर ऊर्जा आणि वाइन/कृषी प्रक्रिया",
    focusHi: "रक्षा एवं वैमानिकी (HAL), सौर ऊर्जा और वाइन/कृषि प्रसंस्करण",
    topOccupations: [
      { 
        role: "Defense Electronics & Radar Tech", 
        roleMr: "संरक्षण इलेक्ट्रॉनिक्स व रडार तंत्रज्ञ", 
        roleHi: "रक्षा इलेक्ट्रॉनिक्स एवं रडार तकनीशियन", 
        demand: "High (+33%)", 
        demandMr: "उच्च (+३३%)", 
        demandHi: "उच्च (+३३%)", 
        salary: "₹4.5L - ₹9.5L", 
        openings: 1400 
      },
      { 
        role: "Agri-Tech & Cold Chain Technician", 
        roleMr: "ॲग्री-टेक व कोल्ड चेन तंत्रज्ञ", 
        roleHi: "एग्री-टेक एवं कोल्ड चेन तकनीशियन", 
        demand: "Surging (+40%)", 
        demandMr: "वेगाने वाढणारी (+४०%)", 
        demandHi: "तीव्र मांग (+४०%)", 
        salary: "₹3.4L - ₹6.2L", 
        openings: 2100 
      },
      { 
        role: "Electric Motor Winding & Testing Tech", 
        roleMr: "इलेक्ट्रिक मोटर वाइंडिंग व चाचणी तंत्रज्ञ", 
        roleHi: "इलेक्ट्रिक मोटर वाइंडिंग एवं परीक्षण तकनीशियन", 
        demand: "High (+31%)", 
        demandMr: "उच्च (+३१%)", 
        demandHi: "उच्च (+३१%)", 
        salary: "₹3.2L - ₹5.8L", 
        openings: 1900 
      },
      { 
        role: "Food Safety & Quality Assurance Officer", 
        roleMr: "अन्न सुरक्षा व गुणवत्ता हमी अधिकारी", 
        roleHi: "खाद्य सुरक्षा एवं गुणवत्ता आश्वासन अधिकारी", 
        demand: "High (+24%)", 
        demandMr: "उच्च (+२४%)", 
        demandHi: "उच्च (+२४%)", 
        salary: "₹3.5L - ₹6.5L", 
        openings: 1200 
      }
    ],
    skillShortages: [
      "MIL-STD Aerospace Harnessing",
      "Post-Harvest Climate Controlled Storage",
      "BLDC Motor Dynamometer Testing",
      "FSSAI & HACCP Export Audit"
    ],
    skillShortagesMr: [
      "MIL-STD एरोस्पेस हार्नेसिंग",
      "कापणीनंतरचे वातानुकूलित साठवणूक तंत्रज्ञान",
      "बीएलडीसी मोटर डायनामोमीटर चाचणी",
      "FSSAI व HACCP निर्यात ऑडिट"
    ],
    skillShortagesHi: [
      "MIL-STD एयरोस्पेस हार्नेसिंग",
      "कटाई उपरांत वातानुकूलित भंडारण",
      "बीएलडीसी मोटर डायनेमोमीटर परीक्षण",
      "FSSAI एवं HACCP निर्यात ऑडिट"
    ],
    industrialCorridors: [
      "Ambad & Satpur MIDC",
      "Ozar HAL Defense Zone",
      "Jalgaon Pipe & Solar Hub",
      "Sinnar SEZ"
    ],
    industrialCorridorsMr: [
      "आंबड व सातपूर एमआयडीसी",
      "ओझर एचएएल संरक्षण झोन",
      "जळगाव पाईप व सोलर हब",
      "सिन्नर सेझ"
    ],
    industrialCorridorsHi: [
      "अंबड एवं सातपुर एमआईडीसी",
      "ओझर एचएएल रक्षा क्षेत्र",
      "जलगांव पाइप एवं सोलर हब",
      "सिन्नर सेज"
    ]
  },
  {
    id: "amravati",
    name: "Amaravati Division (West Vidarbha)",
    nameMr: "अमरावती विभाग (पश्चिम विदर्भ)",
    nameHi: "अमरावती संभाग (पश्चिम विदर्भ)",
    headquarters: "Amaravati",
    headquartersMr: "अमरावती",
    headquartersHi: "अमरावती",
    color: "#e68d8d",
    lightColor: "#fdf2f2",
    borderColor: "#efa6a6",
    districts: ["Buldhana", "Akola", "Amaravati", "Washim", "Yavatmal"],
    districtsCount: 5,
    summary: "Textile Mega Parks, Ginning, Citrus Processing, Solar & Farm Equipment",
    summaryMr: "टेक्सटाइल मेगा पार्क, जिनिंग, संत्रा प्रक्रिया, सौर ऊर्जा आणि शेती उपकरणे",
    summaryHi: "टेक्सटाइल मेगा पार्क, जिनिंग, संतरा प्रसंस्करण, सौर ऊर्जा और कृषि उपकरण",
    vacancies: "8,700+",
    trainingCenters: 130,
    shortageIndex: "Moderate (24% Shortage)",
    shortageIndexMr: "मध्यम (२४% कौशल्य कमतरता)",
    shortageIndexHi: "मध्यम (२४% कौशल कमी)",
    focus: "Textile Mega Parks, Ginning, Citrus Processing & Solar Rooftop",
    focusMr: "टेक्सटाइल मेगा पार्क, जिनिंग, संत्रा प्रक्रिया आणि सोलर रूफटॉप",
    focusHi: "टेक्सटाइल मेगा पार्क, जिनिंग, साइट्रस प्रसंस्करण एवं सोलर रूफटॉप",
    topOccupations: [
      { 
        role: "Automated Textile Loom Technician", 
        roleMr: "स्वयंचलित वस्त्रोद्योग लूम तंत्रज्ञ", 
        roleHi: "स्वचालित कपड़ा लूम तकनीशियन", 
        demand: "High (+29%)", 
        demandMr: "उच्च (+२९%)", 
        demandHi: "उच्च (+२९%)", 
        salary: "₹3.0L - ₹5.4L", 
        openings: 1500 
      },
      { 
        role: "Agro-Equipment Maintenance Mechanic", 
        roleMr: "कृषी उपकरण देखभाल मेकॅनिक", 
        roleHi: "कृषि उपकरण रखरखाव मैकेनिक", 
        demand: "High (+26%)", 
        demandMr: "उच्च (+२६%)", 
        demandHi: "उच्च (+२६%)", 
        salary: "₹2.8L - ₹4.8L", 
        openings: 1800 
      },
      { 
        role: "Solar Grid Rooftop Installer", 
        roleMr: "सौर ग्रिड रूफटॉप इंस्टॉलर", 
        roleHi: "सोलर ग्रिड रूफटॉप इंस्टॉलर", 
        demand: "Surging (+39%)", 
        demandMr: "वेगाने वाढणारी (+३९%)", 
        demandHi: "तीव्र मांग (+३९%)", 
        salary: "₹3.0L - ₹5.2L", 
        openings: 1200 
      },
      { 
        role: "Cotton Grading & Quality Assessor", 
        roleMr: "कापूस प्रतवारी व गुणवत्ता मूल्यनिर्धारक", 
        roleHi: "कपास ग्रेडिंग एवं गुणवत्ता मूल्यांकनकर्ता", 
        demand: "High (+22%)", 
        demandMr: "उच्च (+२२%)", 
        demandHi: "उच्च (+२२%)", 
        salary: "₹2.9L - ₹4.5L", 
        openings: 1100 
      }
    ],
    skillShortages: [
      "Air-Jet Spinning Machine Maintenance",
      "Modern Harvester & Tractor Diagnostics",
      "Micro-Inverter Setup & Net Metering",
      "Organic Fiber Certification"
    ],
    skillShortagesMr: [
      "एअर-जेट स्पिनिंग मशीन देखभाल",
      "आधुनिक हार्वेस्टर व ट्रॅक्टर डायग्नोस्टिक्स",
      "मायक्रो-इन्व्हर्टर सेटअप व नेट मीटरिंग",
      "सेंद्रिय फायबर प्रमाणीकरण"
    ],
    skillShortagesHi: [
      "एयर-जेट स्पिनिंग मशीन रखरखाव",
      "आधुनिक हार्वेस्टर व ट्रैक्टर डायग्नोस्टिक्स",
      "माइक्रो-इन्वर्टर सेटअप व नेट मीटरिंग",
      "जैविक फाइबर प्रमाणन"
    ],
    industrialCorridors: [
      "Nandgaon Peth Textile Park",
      "Akola Agro-Cluster",
      "Yavatmal Cotton Hub",
      "Buldhana Engineering"
    ],
    industrialCorridorsMr: [
      "नांदगाव पेठ वस्त्रोद्योग पार्क",
      "अकोला कृषी-क्लस्टर",
      "यवतमाळ कापूस केंद्र",
      "बुलढाणा अभियांत्रिकी हब"
    ],
    industrialCorridorsHi: [
      "नांदगांव पेठ टेक्सटाइल पार्क",
      "अकोला एग्रो-क्लस्टर",
      "यवतमाल कपास हब",
      "बुलढाणा इंजीनियरिंग हब"
    ]
  }
];

exports.allDistrictsList = [
  "Ahmednagar", "Akola", "Amravati", "Chhatrapati Sambhaji Nagar", "Beed", "Bhandara", "Buldhana",
  "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur",
  "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Dharashiv", "Palghar",
  "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane",
  "Wardha", "Washim", "Yavatmal"
];
