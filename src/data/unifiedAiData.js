export const personaPrompts = {
  student: {
    label: "Student",
    labelMr: "विद्यार्थी",
    labelHi: "विद्यार्थी",
    badge: "Career Discovery & Courses",
    prompts: {
      en: [
        "What career suits me?",
        "Which course should I choose?",
        "What skills are in demand?",
        "Create my career path"
      ],
      mr: [
        "माझ्यासाठी कोणते करिअर योग्य आहे?",
        "मी कोणता अभ्यासक्रम निवडावा?",
        "कोणत्या कौशल्यांना जास्त मागणी आहे?",
        "माझा करिअर मार्ग तयार करा"
      ],
      hi: [
        "मेरे लिए कौन सा करियर उपयुक्त है?",
        "मुझे कौन सा कोर्स चुनना चाहिए?",
        "किन कौशलों की सबसे ज्यादा मांग है?",
        "मेरा करियर रोडमैप बनाएं"
      ]
    }
  },
  seeker: {
    label: "Job Seeker",
    labelMr: "नोकरी शोधणारे",
    labelHi: "नौकरी चाहने वाले",
    badge: "Matching & Eligibility",
    prompts: {
      en: [
        "Find jobs matching my skills",
        "Why am I not eligible?",
        "What skills am I missing?",
        "Help me prepare for an interview"
      ],
      mr: [
        "माझ्या कौशल्यांशी जुळणाऱ्या नोकऱ्या शोधा",
        "मी का पात्र ठरत नाही?",
        "माझ्यात कोणती कौशल्ये कमी आहेत?",
        "मुलाखतीची तयारी कशी करावी?"
      ],
      hi: [
        "मेरे कौशल से मेल खाने वाली नौकरियां खोजें",
        "मैं योग्य क्यों नहीं हूँ?",
        "मुझमें कौन से कौशल छूट रहे हैं?",
        "साक्षात्कार की तैयारी में मदद करें"
      ]
    }
  },
  restart: {
    label: "Career Restart",
    labelMr: "करिअर रीस्टार्ट",
    labelHi: "करियर रीस्टार्ट",
    badge: "Reskilling & Transition",
    prompts: {
      en: [
        "What careers can I transition into?",
        "What skills from my previous job are useful?",
        "Create a reskilling plan",
        "Find jobs I can qualify for"
      ],
      mr: [
        "मी कोणत्या नव्या करिअरमध्ये जाऊ शकतो?",
        "माझ्या जुन्या कामातील कोणती कौशल्ये उपयोगी आहेत?",
        "पुनर्कौशल्य योजना तयार करा",
        "मी पात्र ठरू शकणाऱ्या नोकऱ्या शोधा"
      ],
      hi: [
        "मैं किन नए करियर में बदलाव कर सकता हूँ?",
        "मेरी पिछली नौकरी के कौन से कौशल उपयोगी हैं?",
        "रीस्किलिंग योजना बनाएं",
        "ऐसी नौकरियां खोजें जिनके लिए मैं योग्य हूँ"
      ]
    }
  },
  admin: {
    label: "Govt Admin",
    labelMr: "प्रशासक",
    labelHi: "व्यवस्थापक",
    badge: "Labour Market Policy",
    prompts: {
      en: [
        "Show skill shortages by district",
        "Which courses need curriculum updates?",
        "Where is training capacity insufficient?",
        "Show emerging skills",
        "Generate a district skill plan"
      ],
      mr: [
        "जिल्ह्यानुसार कौशल्यांची कमतरता दाखवा",
        "कोणत्या अभ्यासक्रमांचे अद्ययावतीकरण आवश्यक आहे?",
        "प्रशिक्षण क्षमता कुठे अपुरी आहे?",
        "उदयोन्मुख कौशल्ये दाखवा",
        "जिल्हा कौशल्य योजना तयार करा"
      ],
      hi: [
        "जिलेवार कौशल की कमी दिखाएं",
        "किन पाठ्यक्रमों के पाठ्यक्रम अपडेट की आवश्यकता है?",
        "प्रशिक्षण क्षमता कहाँ अपर्याप्त है?",
        "उभरते कौशल दिखाएं",
        "जिला कौशल योजना बनाएं"
      ]
    }
  }
};

// Automatic language detection helper
export function detectLanguage(text) {
  if (!text) return 'en';
  // Devanagari Unicode range: \u0900-\u097F
  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  if (hasDevanagari) {
    // Check characteristic Marathi words/characters
    const marathiMarkers = ["आहे", "माझ्या", "कोणत्या", "करिअर", "सांगा", "कसे", "करा", "नोकरी", "पाहिजे", "जिल्ह्यात", "कौशल्य"];
    const isMarathi = marathiMarkers.some(word => text.includes(word));
    return isMarathi ? 'mr' : 'hi';
  }
  return 'en';
}

// Structured GovTech Response Generator adhering strictly to Phase 5 format
export function generateStructuredAiResponse(query, persona, lang, isSimpleMode = false) {
  const qLower = query.toLowerCase();

  // 1. Industrial Automation / Electrical Case (Direct prompt requirement example)
  if (qLower.includes("automation") || qLower.includes("electrical") || qLower.includes("career suits") || qLower.includes("योग्य आहे") || qLower.includes("उपयुक्त")) {
    if (lang === 'mr') {
      return {
        text: isSimpleMode 
          ? "तुमच्यासाठी इंडस्ट्रियल ऑटोमेशन हे सर्वोत्तम करिअर आहे. पुण्यामध्ये यासाठी खूप नोकऱ्या आहेत."
          : "तुमच्या शैक्षणिक पार्श्वभूमीचे आणि महाराष्ट्रातील औद्योगिक मागणीचे विश्लेषण करून खालील शिफारस तयार केली आहे:",
        recommendation: "इंडस्ट्रियल ऑटोमेशन व रोबोटिक्स तंत्रज्ञ",
        whyRecommended: [
          "महाराष्ट्रातील ऑटोमोबाईल व मॅन्युफॅक्चरिंग उद्योगांमध्ये प्रचंड मागणी",
          "मागील वर्षाच्या तुलनेत +३८% वाढीचा दर",
          "तुमच्या इलेक्ट्रिकल / डिप्लोमा पार्श्वभूमीशी थेट सुसंगत",
          "पुणे, नाशिक व छत्रपती संभाजीनगर येथे शासकीय प्रशिक्षण केंद्रे उपलब्ध"
        ],
        supportingData: {
          vacancies: "५,१२०+ सक्रिय रिक्त पदे",
          avgPackage: "₹४.५ लाख ते ₹८.२ लाख प्रति वर्ष",
          topDistricts: "पुणे (चाकण), छत्रपती संभाजीनगर (वालूज), कोल्हापूर"
        },
        relevantSkills: ["PLC प्रोग्रामिंग", "रोबोटिक्स", "SCADA", "हायड्रोलिक्स व सेन्सर्स"],
        nextAction: "लर्निंग पाथ पहा",
        nextActionId: "learning-path"
      };
    } else if (lang === 'hi') {
      return {
        text: isSimpleMode 
          ? "आपके लिए इंडस्ट्रियल ऑटोमेशन सबसे अच्छा करियर है। महाराष्ट्र में इसकी भारी मांग है।"
          : "आपकी शैक्षिक पृष्ठभूमि और राज्य में औद्योगिक मांग के विश्लेषण पर आधारित सिफारिश:",
        recommendation: "इंडस्ट्रियल ऑटोमेशन व रोबोटिक्स तकनीशियन",
        whyRecommended: [
          "ऑटोमोटिव और विनिर्माण उद्योगों में भारी नियोक्ता मांग",
          "वार्षिक भर्ती में +३८% की मजबूत वृद्धि",
          "आपकी इलेक्ट्रिकल पृष्ठभूमि के अनुकूल",
          "पुणे और वालुज में सरकारी आईटीआई प्रशिक्षण उपलब्ध"
        ],
        supportingData: {
          vacancies: "५,१२०+ सक्रिय नौकरियां",
          avgPackage: "₹४.५ लाख से ₹८.२ लाख वार्षिक",
          topDistricts: "पुणे (चाकण), छत्रपति संभाजीनगर, कोल्हापुर"
        },
        relevantSkills: ["PLC प्रोग्रामिंग", "रोबोटिक्स", "SCADA", "सेंसर कैलिब्रेशन"],
        nextAction: "लर्निंग पाथ देखें",
        nextActionId: "learning-path"
      };
    } else {
      return {
        text: isSimpleMode 
          ? "Industrial Automation is the best matching career for you. High job openings available in Pune and Aurangabad."
          : "Based on our AI skill intelligence scan of Maharashtra's labour market, here is your customized career pathway:",
        recommendation: "Industrial Automation & Robotics Technician",
        whyRecommended: [
          "High employer demand across Pune & Marathwada industrial corridors",
          "Strong demand growth (+38% YoY hiring trajectory)",
          "Matches your electrical & technical diploma foundation",
          "Subsidized training available at Indo-German Tool Room & ITIs"
        ],
        supportingData: {
          vacancies: "5,120+ Active Openings in Maharashtra",
          avgPackage: "₹4.5L - ₹8.2L CTC / Year",
          topDistricts: "Pune (Chakan/Talegaon), Chhatrapati Sambhaji Nagar (Waluj), Kolhapur"
        },
        relevantSkills: ["PLC Programming (Siemens/Delta)", "Industrial Robotics", "SCADA Telemetry", "Pneumatics"],
        nextAction: "View Learning Path",
        nextActionId: "learning-path"
      };
    }
  }

  // 2. EV / Electric Vehicle Query
  if (qLower.includes("ev") || qLower.includes("battery") || qLower.includes("ईव्ही") || qLower.includes("बॅटरी")) {
    if (lang === 'mr') {
      return {
        text: "महाराष्ट्रातील ईव्ही तंत्रज्ञानावरील विश्लेषण:",
        recommendation: "ईव्ही पॉवरट्रेन आणि बॅटरी डायग्नोस्टिक विशेषज्ञ",
        whyRecommended: [
          "टाटा मोटर्स, बजाज आणि महिंद्रा द्वारे चाकणमध्ये मोठ्या प्रमाणावर भरती",
          "+५२% वार्षिक रोजगार वृद्धी",
          "राष्ट्रीय शिक्षुता योजनेंतर्गत दरमहा ₹१२,००० चे विद्यावेतन",
          "एआरएआय (ARAI) मान्यताप्राप्त प्रमाणपत्र"
        ],
        supportingData: {
          vacancies: "६,८४०+ सक्रिय पदे",
          avgPackage: "₹४.८ लाख ते ₹९.२ लाख प्रति वर्ष",
          topDistricts: "पुणे, नाशिक, छत्रपती संभाजीनगर"
        },
        relevantSkills: ["BMS टेस्टिंग", "CAN बस प्रोटोकॉल", "हाय व्होल्टेज सेफ्टी", "थर्मल मॅनेजमेंट"],
        nextAction: "ईव्ही कोर्सेस पहा",
        nextActionId: "courses-ev"
      };
    } else {
      return {
        text: "Labour intelligence assessment for Electric Vehicle & Battery Systems:",
        recommendation: "EV Powertrain & Battery Diagnostic Specialist",
        whyRecommended: [
          "Surging hiring demand from Tier-1 EV OEMs across Chakan & Talegaon",
          "Fastest growing green tech sector in Maharashtra (+52% YoY)",
          "Subsidized training with ₹12,000/mo DBT stipend under NAPS",
          "ARAI & DVET state-accredited certification"
        ],
        supportingData: {
          vacancies: "6,840+ Active Vacancies",
          avgPackage: "₹4.8L - ₹9.2L LPA",
          topDistricts: "Pune, Nashik, Chhatrapati Sambhaji Nagar, Nagpur"
        },
        relevantSkills: ["BMS Diagnostics", "CAN Bus Protocol", "High Voltage Safety (HVE)", "Thermal Runaway Mitigation"],
        nextAction: "View EV Courses & Vacancies",
        nextActionId: "courses-ev"
      };
    }
  }

  // 3. Career Restart / Retail to Office Query
  if (qLower.includes("restart") || qLower.includes("retail") || qLower.includes("gap") || qLower.includes("रिटेल") || qLower.includes("संक्रमण")) {
    return {
      text: lang === 'mr' 
        ? "करिअर रीस्टार्ट व कौशल्यांचे हस्तांतरण विश्लेषण:"
        : "Career restart and transferable skills diagnostic:",
      recommendation: lang === 'mr' ? "लॉजिस्टिक्स व ऑपरेशन्स समन्वयक" : "Corporate Logistics & Operations Coordinator",
      whyRecommended: [
        lang === 'mr' ? "तुमचा ५ वर्षांचा ग्राहक सेवा व स्टॉक अनुभव थेट लागू होतो" : "Your 5 years of client handling & inventory transfer seamlessly",
        lang === 'mr' ? "३ आठवड्यांचे एमएस ऑफिस व ईआरपी प्रशिक्षण पूर्ण केल्यास १००% पात्रता" : "3-week digital bridge course achieves 100% role eligibility",
        lang === 'mr' ? "महाराष्ट्र महिला पुनर्कौशल्य योजनेअंतर्गत १००% मोफत" : "100% subsidized under Maharashtra Women Returnship initiative",
        lang === 'mr' ? "पुणे व मुंबईमध्ये ४८०+ सक्रिय नोकऱ्या" : "480+ active openings across Pune and Mumbai MIDCs"
      ],
      supportingData: {
        vacancies: "480+ Immediate Positions",
        avgPackage: "₹3.8L - ₹6.2L LPA",
        topDistricts: "Pune, Thane, Bhiwandi, Chhatrapati Sambhaji Nagar"
      },
      relevantSkills: ["Customer CRM", "SAP Inventory / Tally", "Business Communication", "Excel Pivot"],
      nextAction: lang === 'mr' ? "रीस्टार्ट प्लॅन सुरू करा" : "Start My Career Restart Plan",
      nextActionId: "restart-plan"
    };
  }

  // 4. Admin / Policy Planning Query
  if (qLower.includes("shortage") || qLower.includes("district") || qLower.includes("curriculum") || qLower.includes("जिल्हा") || qLower.includes("कमतरता")) {
    return {
      text: lang === 'mr' 
        ? "महाराष्ट्र राज्य अधिकृत कौशल्य व क्षमता विश्लेषण अहवाल:"
        : "Official Maharashtra State Labour Capacity & Shortage Intelligence:",
      recommendation: lang === 'mr' ? "पुणे व मराठवाडा ईव्ही व रोबोटिक्स क्षमता विस्तार" : "Pune & Marathwada Capacity Expansion Plan",
      whyRecommended: [
        lang === 'mr' ? "पुणे जिल्ह्यात ६५० जागांची तीव्र कमतरता" : "Acute -650 seat deficit in Pune District EV & Robotics corridor",
        lang === 'mr' ? "वालूज (छ. संभाजीनगर) मध्ये ५६० सीएनसी जागांची कमतरता" : "Waluj (Chhatrapati Sambhaji Nagar) requires +560 precision seats",
        lang === 'mr' ? "डीटीपी सारख्या अप्रचलित कोर्सेसच्या जागा पुनर्नियोजित करण्याची गरज" : "Repurpose surplus seats from obsolete DTP trades (<30% placement)",
        lang === 'mr' ? "₹२२.५ कोटी आधुनिक लॅब अनुदानाचा प्रस्ताव मंजूर" : "Approved ₹22.5 Cr modern equipment grant for FY26-27"
      ],
      supportingData: {
        vacancies: "State Deficit: -14,850 Seats",
        avgPackage: "Target Placement: 85.0%",
        topDistricts: "Pune, Chhatrapati Sambhaji Nagar, Nashik, Nagpur"
      },
      relevantSkills: ["BMS Diagnostics", "5-Axis CNC", "SCADA Telemetry", "Aero Avionics"],
      nextAction: lang === 'mr' ? "जिल्हा योजना डाऊनलोड करा" : "Generate District Skill Plan",
      nextActionId: "admin-plan"
    };
  }

  // General Fallback
  return {
    text: lang === 'mr' 
      ? `तुमच्या "${query}" या प्रश्नासाठी महास्किल कनेक्ट ची शिफारस:`
      : `Intelligence Assessment for "${query}":`,
    recommendation: lang === 'mr' ? "राज्य मान्यताप्राप्त प्रगत कौशल्य मार्ग" : "State-Accredited High Growth Pathway",
    whyRecommended: [
      lang === 'mr' ? "महाराष्ट्रातील ५०,०००+ उद्योगांच्या थेट भरती विश्लेषणावर आधारित" : "Anchored on live hiring data from 50,000+ Maharashtra enterprises",
      lang === 'mr' ? "३६ जिल्ह्यांतील ३,४२०+ शासकीय व खाजगी आयटीआयमध्ये उपलब्ध" : "Available across 3,420+ accredited training centers statewide",
      lang === 'mr' ? "शासकीय शिष्यवृत्ती व थेट बँक हस्तांतरण (DBT) सुविधा" : "Eligible for state-funded fee reimbursement and DBT stipends"
    ],
    supportingData: {
      vacancies: "1,42,850+ Active Vacancies",
      avgPackage: "₹4.8L LPA Entry Average",
      topDistricts: "Pune, Mumbai, Nagpur, Nashik, Chhatrapati Sambhaji Nagar"
    },
    relevantSkills: ["Problem Solving", "Digital Literacy", "Modern Vocational Tools"],
    nextAction: lang === 'mr' ? "तपशील पहा" : "View Full Career Details",
    nextActionId: "general-details"
  };
}
