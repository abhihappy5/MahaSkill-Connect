import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Sparkles, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Compass, 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  PlayCircle, 
  FileCheck2, 
  ShieldCheck, 
  Bot, 
  RotateCcw, 
  Star,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { 
  studentProfile, 
  studentAssessmentQuestions, 
  studentSkillMatrix, 
  studentEnrolledCourses, 
  studentLearningPathMilestones, 
  studentCampusJobs 
} from '../../data/studentData';
import { trendingCareersData } from '../../data/careersData';

export function StudentDashboard({ onBackToHome, onOpenAssistant, lang, setLang, t }) {
  // Navigation Tabs matching exact SiteMap: 'dashboard' | 'assessment' | 'explorer' | 'skills' | 'courses' | 'pathway' | 'jobs'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Assessment Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Enrolled courses state
  const [courses, setCourses] = useState(studentEnrolledCourses);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [videoModalCourse, setVideoModalCourse] = useState(null);

  const handleSelectOption = (questionId, optionIndex, score) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: { optionIndex, score }
    }));
  };

  const handleNextQuestion = () => {
    if (currentQIndex < studentAssessmentQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      // Calculate total score
      const total = Object.values(selectedAnswers).reduce((acc, curr) => acc + (curr.score || 0), 0);
      setQuizScore(total);
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setQuizScore(0);
  };

  const handleApplyCampusJob = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs(prev => [...prev, jobId]);
      alert(t.applicationSuccessAlert || "Application successfully submitted via Maharashtra Student Portal! Recruiter notified.");
    }
  };

  // Localized Quiz Questions
  const localizedQuestions = [
    {
      id: 1,
      category: lang === 'mr' ? 'तांत्रिक अभियोग्यता' : (lang === 'hi' ? 'तकनीकी योग्यता' : 'Technical Aptitude'),
      question: lang === 'mr' 
        ? "औद्योगिक पीएलसी (प्रोग्रॅमेबल लॉजिक कंट्रोलर) सर्किटमध्ये, आय/ओ मॉड्यूलमध्ये ऑप्टोकपलरचे मुख्य कार्य काय असते?"
        : (lang === 'hi' 
          ? "एक औद्योगिक पीएलसी (प्रोग्रामेबल लॉजिक कंट्रोलर) सर्किट में, आई/ओ मॉड्यूल में ऑप्टोकपलर का प्राथमिक कार्य क्या है?"
          : "In an industrial PLC (Programmable Logic Controller) circuit, what is the primary function of an Optocoupler in the I/O module?"),
      options: [
        { 
          text: lang === 'mr' ? "उच्च व्होल्टेज फील्ड उपकरणे आणि कमी व्होल्टेज सीपीयू लॉजिक दरम्यान विद्युत अलगीकरण (Electrical Isolation)" : (lang === 'hi' ? "हाई-वोल्टेज फील्ड उपकरणों और लो-वोल्टेज सीपीयू लॉजिक के बीच इलेक्ट्रिकल आइसोलेशन" : "Electrical isolation between high-voltage field devices and low-voltage CPU logic"), 
          isCorrect: true, 
          score: 20 
        },
        { 
          text: lang === 'mr' ? "अॅनालॉग सेन्सर सिग्नल्सना २४०V एसी पर्यंत ॲम्प्लिफाय करणे" : (lang === 'hi' ? "एनालॉग सेंसर सिग्नल को २४०V एसी तक बढ़ाना" : "Amplifying analog sensor signals to 240V AC"), 
          isCorrect: false, 
          score: 0 
        },
        { 
          text: lang === 'mr' ? "रॅम डेटा टिकवून ठेवण्यासाठी बॅटरी बॅकअप देणे" : (lang === 'hi' ? "रैम डेटा सुरक्षित रखने के लिए बैटरी बैकअप प्रदान करना" : "Providing battery backup for RAM data retention"), 
          isCorrect: false, 
          score: 0 
        },
        { 
          text: lang === 'mr' ? "बायनरी लॅडर लॉजिकचे मशीन कोडमध्ये रूपांतर करणे" : (lang === 'hi' ? "बाइनरी लैडर लॉजिक को मशीन कोड में बदलना" : "Converting binary ladder logic to machine code"), 
          isCorrect: false, 
          score: 0 
        }
      ]
    },
    {
      id: 2,
      category: lang === 'mr' ? 'ऑटोमेशन आणि सेन्सर्स' : (lang === 'hi' ? 'स्वचालन एवं सेंसर' : 'Automation & Sensors'),
      question: lang === 'mr'
        ? "उद्योग ४.० मध्ये रिअल-टाइम सेन्सर-टू-क्लाउड औद्योगिक टेलिमेट्रीसाठी कोणता संप्रेषण प्रोटोकॉल सर्वाधिक वापरला जातो?"
        : (lang === 'hi'
          ? "उद्योग ४.० में रीयल-टाइम सेंसर-टू-क्लाउड औद्योगिक टेलीमेट्री के लिए किस संचार प्रोटोकॉल का सबसे अधिक उपयोग किया जाता है?"
          : "Which communication protocol is most commonly utilized for real-time sensor-to-cloud industrial telemetry in Industry 4.0?"),
      options: [
        { 
          text: lang === 'mr' ? "औद्योगिक इथरनेटवर MQTT / Modbus TCP" : (lang === 'hi' ? "औद्योगिक ईथरनेट पर MQTT / Modbus TCP" : "MQTT / Modbus TCP over Industrial Ethernet"), 
          isCorrect: true, 
          score: 20 
        },
        { 
          text: lang === 'mr' ? "FTP (फाइल ट्रान्सफर प्रोटोकॉल)" : (lang === 'hi' ? "FTP (फाइल ट्रांसफर प्रोटोकॉल)" : "FTP (File Transfer Protocol)"), 
          isCorrect: false, 
          score: 0 
        },
        { 
          text: lang === 'mr' ? "SMTP ईमेल रिले" : (lang === 'hi' ? "SMTP ईमेल रिले" : "SMTP Email Relay"), 
          isCorrect: false, 
          score: 0 
        },
        { 
          text: lang === 'mr' ? "पॅरिटी नसलेला जुना RS-232" : (lang === 'hi' ? "समानता रहित पुराना RS-232" : "Legacy RS-232 without parity"), 
          isCorrect: false, 
          score: 0 
        }
      ]
    },
    {
      id: 3,
      category: lang === 'mr' ? 'ईव्ही आणि बॅटरी सिस्टीम्स' : (lang === 'hi' ? 'ईवी एवं बैटरी सिस्टम' : 'EV & Battery Systems'),
      question: lang === 'mr'
        ? "इलेक्ट्रिक वाहनामध्ये रिजनरेटिव्ह ब्रेकिंग दरम्यान बॅटरी मॅनेजमेंट सिस्टीम (BMS) द्वारे कोणता मुख्य धोका टाळला जातो?"
        : (lang === 'hi'
          ? "इलेक्ट्रिक वाहन में पुनर्योजी ब्रेकिंग के दौरान बैटरी प्रबंधन प्रणाली (BMS) द्वारा किस प्राथमिक खतरे को रोका जाता है?"
          : "What is the primary danger prevented by a Battery Management System (BMS) during regenerative braking in an Electric Vehicle?"),
      options: [
        { 
          text: lang === 'mr' ? "सेल ओव्हर-व्होल्टेज, थर्मल रनअवे आणि स्थानिक ओव्हरचार्जिंग" : (lang === 'hi' ? "सेल ओवर-वोल्टेज, थर्मल रनवे और अत्यधिक चार्जिंग" : "Cell over-voltage, thermal runaway, and localized overcharging"), 
          isCorrect: true, 
          score: 20 
        },
        { 
          text: lang === 'mr' ? "मोटर स्टेटरचे विचुंबकीकरण" : (lang === 'hi' ? "मोटर स्टेटर विचुंबकीकरण" : "Motor stator demagnetization"), 
          isCorrect: false, 
          score: 0 
        },
        { 
          text: lang === 'mr' ? "यांत्रिक ब्रेक पॅडची झीज" : (lang === 'hi' ? "मैकेनिकल ब्रेक पैड घिसाव" : "Mechanical brake pad wear"), 
          isCorrect: false, 
          score: 0 
        },
        { 
          text: lang === 'mr' ? "हेडलाइट व्होल्टेज ड्रॉप" : (lang === 'hi' ? "हेडलाइट वोल्टेज गिरावट" : "Headlight voltage drop"), 
          isCorrect: false, 
          score: 0 
        }
      ]
    },
    {
      id: 4,
      category: lang === 'mr' ? 'समस्या निवारण आणि लॉजिक' : (lang === 'hi' ? 'समस्या समाधान और तर्क' : 'Problem Solving & Logic'),
      question: lang === 'mr'
        ? "कन्व्हेयर सिस्टीम HMI वर अलार्म न येता अचानक थांबते. मानक डायग्नोस्टिक क्रम काय आहे?"
        : (lang === 'hi'
          ? "एक कन्वेयर सिस्टम एचएमआई पर बिना किसी अलार्म के अचानक रुक जाता है। मानक निदान अनुक्रम क्या है?"
          : "A conveyor system stops unexpectedly with no alarm on the HMI. What is the standard diagnostic sequence?"),
      options: [
        { 
          text: lang === 'mr' ? "१. आपत्कालीन स्टॉप लूप स्थिती → २. फील्ड सेन्सर एलईडी → ३. पीएलसी I/O रॅक → ४. व्हीएफडी फॉल्ट रजिस्टर" : (lang === 'hi' ? "१. आपातकालीन स्टॉप लूप स्थिति → २. फील्ड सेंसर एलईडी → ३. पीएलसी I/O रैक → ४. वीएफडी फॉल्ट रजिस्टर" : "1. Emergency Stop loop status → 2. Field sensor LED states → 3. PLC I/O rack status → 4. VFD fault register"), 
          isCorrect: true, 
          score: 20 
        },
        { 
          text: lang === 'mr' ? "संपूर्ण पीएलसी पॉवर सप्लाय ताबडतोब बदला" : (lang === 'hi' ? "पूरे पीएलसी पावर सप्लाई को तुरंत बदलें" : "Replace the entire PLC power supply immediately"), 
          isCorrect: false, 
          score: 0 
        },
        { 
          text: lang === 'mr' ? "फॅक्टरी ट्रान्सफॉर्मर रीबूट करा" : (lang === 'hi' ? "फैक्टरी ट्रांसफॉर्मर रीबूट करें" : "Reboot the factory transformer"), 
          isCorrect: false, 
          score: 0 
        },
        { 
          text: lang === 'mr' ? "सर्व सुरक्षा इंटरलॉक बायपास करा" : (lang === 'hi' ? "सभी सुरक्षा इंटरलॉक बाईपास करें" : "Bypass all safety interlocks"), 
          isCorrect: false, 
          score: 0 
        }
      ]
    },
    {
      id: 5,
      category: lang === 'mr' ? 'कामाच्या ठिकाणची सुरक्षा' : (lang === 'hi' ? 'कार्यस्थल सुरक्षा एवं मानक' : 'Workplace Safety & Standards'),
      question: lang === 'mr'
        ? "औद्योगिक सुरक्षा आणि आरोग्य संचालनालय (DISH) महाराष्ट्र मार्गदर्शक तत्त्वांनुसार, लॉकआउट/टॅगआउट (LOTO) कशासाठी वापरले जाते?"
        : (lang === 'hi'
          ? "औद्योगिक सुरक्षा और स्वास्थ्य निदेशालय (DISH) महाराष्ट्र दिशानिर्देशों के तहत, लॉकआउट/टैगआउट (LOTO) का उपयोग किस लिए किया जाता है?"
          : "Under Directorate of Industrial Safety and Health (DISH) Maharashtra guidelines, what is Lockout/Tagout (LOTO) used for?"),
      options: [
        { 
          text: lang === 'mr' ? "यंत्रसामग्रीवर देखभाल करण्यापूर्वी झीरो एनर्जी स्टेट अलगीकरण" : (lang === 'hi' ? "मशीनरी पर रखरखाव करने से पहले शून्य ऊर्जा स्थिति अलगाव" : "Zero Energy State isolation before conducting maintenance on machinery"), 
          isCorrect: true, 
          score: 20 
        },
        { 
          text: lang === 'mr' ? "कारखान्याच्या गेटवर कर्मचाऱ्यांची उपस्थिती नोंदवणे" : (lang === 'hi' ? "कारखाने के गेट पर कर्मचारियों की उपस्थिति दर्ज करना" : "Recording employee attendance at factory gates"), 
          isCorrect: false, 
          score: 0 
        },
        { 
          text: lang === 'mr' ? "सुट्या भागांची इन्व्हेंटरी मोजणी" : (lang === 'hi' ? "अतिरिक्त घटकों की सूची गणना" : "Inventory counting of spare components"), 
          isCorrect: false, 
          score: 0 
        },
        { 
          text: lang === 'mr' ? "शिफ्ट दरम्यान आयटी सर्व्हर रूम लॉक करणे" : (lang === 'hi' ? "शिफ्ट के दौरान आईटी सर्वर रूम लॉक करना" : "Locking the IT server room during shifts"), 
          isCorrect: false, 
          score: 0 
        }
      ]
    }
  ];

  const currentQ = localizedQuestions[currentQIndex];

  const studentName = lang === 'mr' ? 'आदित्य पाटील' : (lang === 'hi' ? 'आदित्य पाटिल' : studentProfile.name);

  // Localized Profile Information
  const profileStream = lang === 'mr' 
    ? "इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स अभियांत्रिकी पदविका" 
    : (lang === 'hi' ? "इलेक्ट्रिकल और इलेक्ट्रॉनिक्स इंजीनियरिंग डिप्लोमा" : studentProfile.stream);

  const profileInstitution = lang === 'mr' 
    ? "शासकीय तंत्रनिकेतन, पुणे" 
    : (lang === 'hi' ? "शासकीय पॉलिटेक्निक, पुणे" : studentProfile.institution);

  const profileTargetCareer = lang === 'mr' 
    ? "औद्योगिक ऑटोमेशन व रोबोटिक्स विशेषज्ञ" 
    : (lang === 'hi' ? "औद्योगिक स्वचालन एवं रोबोटिक्स विशेषज्ञ" : studentProfile.targetCareer);

  const profileTargetDistrict = lang === 'mr' 
    ? "पुणे / चाकण एमआयडीसी" 
    : (lang === 'hi' ? "पुणे / चाकण औद्योगिक क्षेत्र" : studentProfile.targetDistrict);

  return (
    <div className="student-wrapper">
      {/* Student Top Sticky Subnavigation (7 SiteMap Sub-Modules) */}
      <div className="student-subnav">
        <div className="container-wide">
          <div className="student-subnav-inner">
            <div className="student-nav-tabs">
              {[
                { id: 'dashboard', label: t.stuTabDashboard || (lang === 'mr' ? 'डॅशबोर्ड' : (lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard')), icon: GraduationCap },
                { id: 'assessment', label: t.stuTabAssessment || (lang === 'mr' ? 'कौशल्य चाचणी' : (lang === 'hi' ? 'कौशल मूल्यांकन' : 'Skill Assessment')), icon: Award },
                { id: 'explorer', label: t.stuTabExplorer || (lang === 'mr' ? 'करिअर शोध' : (lang === 'hi' ? 'करियर एक्सप्लोरर' : 'Career Explorer')), icon: Compass },
                { id: 'skills', label: t.stuTabSkills || (lang === 'mr' ? 'माझी कौशल्ये' : (lang === 'hi' ? 'मेरे कौशल' : 'My Skills')), icon: Layers },
                { id: 'courses', label: t.stuTabCourses || (lang === 'mr' ? 'माझे कोर्सेस' : (lang === 'hi' ? 'मेरे कोर्सेस' : 'Courses')), icon: BookOpen },
                { id: 'pathway', label: t.stuTabPathway || (lang === 'mr' ? 'लर्निंग पाथ' : (lang === 'hi' ? 'लर्निंग पाथ' : 'Learning Path')), icon: TrendingUp },
                { id: 'jobs', label: t.stuTabJobs || (lang === 'mr' ? 'कॅम्पस नोकऱ्या' : (lang === 'hi' ? 'कैंपस नौकरियां' : 'Jobs')), icon: Briefcase }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`student-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => onOpenAssistant()}
                style={{
                  background: 'var(--saffron-light)',
                  color: 'var(--saffron-primary)',
                  border: '1px solid var(--saffron-border)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Bot size={15} />
                <span>{t.askStudentAi || 'Ask Student AI'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide" style={{ marginTop: '16px' }}>
        
        {/* ================= 1. STUDENT DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Student Profile Hero Card */}
            <div className="student-hero-card">
              <div className="student-profile-flex">
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div className="student-avatar-box">
                    {studentProfile.avatar}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                        {studentName}
                      </h2>
                      <span style={{ background: '#ecfdf5', color: 'var(--success-dark)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.74rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ShieldCheck size={13} /> {t.digiLockerVerified || 'DigiLocker Verified'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '4px' }}>
                      {profileStream} • {profileInstitution}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--saffron-primary)', fontWeight: 700, marginTop: '2px' }}>
                      {t.targetLbl || 'Target'}: {profileTargetCareer} ({profileTargetDistrict})
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('assessment')}
                    className="btn btn-primary btn-sm"
                  >
                    <Award size={15} />
                    {t.takeAssessmentBtn || 'Take Assessment'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('pathway')}
                    className="btn btn-outline btn-sm"
                    style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff' }}
                  >
                    {t.viewRoadmapBtn || 'View Roadmap'}
                  </button>
                </div>
              </div>

              {/* 4 Stat Badges */}
              <div className="student-quick-stats">
                <div className="student-stat-pill">
                  <span className="student-stat-pill-lbl">{t.careerMatchLbl || 'Career Match'}</span>
                  <span className="student-stat-pill-val" style={{ color: '#4ade80' }}>
                    {studentProfile.careerMatchScore}%
                  </span>
                </div>
                <div className="student-stat-pill">
                  <span className="student-stat-pill-lbl">{t.learningStreakLbl || 'Learning Streak'}</span>
                  <span className="student-stat-pill-val" style={{ color: '#fb923c' }}>
                    🔥 {studentProfile.learningStreak} {lang === 'mr' ? 'दिवस' : (lang === 'hi' ? 'दिन' : 'Days')}
                  </span>
                </div>
                <div className="student-stat-pill">
                  <span className="student-stat-pill-lbl">{t.activeCoursesLbl || 'Active Courses'}</span>
                  <span className="student-stat-pill-val">
                    {t.inProgressCount || '3 In Progress'}
                  </span>
                </div>
                <div className="student-stat-pill">
                  <span className="student-stat-pill-lbl">{t.skillCoinsLbl || 'Skill Coins'}</span>
                  <span className="student-stat-pill-val" style={{ color: '#facc15' }}>
                    🪙 {studentProfile.coinsEarned}
                  </span>
                </div>
              </div>
            </div>

            {/* In-Progress Course & NAPS Stipend Banner Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
              {/* Primary Active Course */}
              <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', padding: '24px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={20} style={{ color: 'var(--saffron-primary)' }} />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--navy-deep)' }}>
                      {t.inProgressCourseLbl || 'Current In-Progress Course'}
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--saffron-primary)', fontWeight: 700, background: 'var(--saffron-light)', padding: '3px 10px', borderRadius: '12px' }}>
                    {studentEnrolledCourses[0].progress}% {t.completedLbl || 'Completed'}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                  {lang === 'mr' ? 'प्रगत औद्योगिक ऑटोमेशन व रोबोटिक्स (उद्योग ४.०)' : (lang === 'hi' ? 'उन्नत औद्योगिक स्वचालन एवं रोबोटिक्स (उद्योग ४.०)' : studentEnrolledCourses[0].title)}
                </h4>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  {lang === 'mr' ? 'इंडो-जर्मन टूल रूम (IGTR) व शासकीय आयटीआय पुणे' : (lang === 'hi' ? 'इंडो-जर्मन टूल रूम (IGTR) एवं सरकारी आईटीआई पुणे' : studentEnrolledCourses[0].provider)} • {lang === 'mr' ? 'प्रशिक्षक' : (lang === 'hi' ? 'प्रशिक्षक' : 'Instructor')}: {studentEnrolledCourses[0].instructor}
                </div>

                <div className="course-progress-bar-wrap">
                  <div className="course-progress-bar-fill" style={{ width: `${studentEnrolledCourses[0].progress}%` }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  <span>{t.completedModules || 'Completed'} {studentEnrolledCourses[0].completedModules} / {studentEnrolledCourses[0].totalModules} {t.modulesLbl || 'Modules'}</span>
                  <span>{studentEnrolledCourses[0].hoursCompleted} {t.hoursLbl || 'hrs'} / {studentEnrolledCourses[0].totalHours} {t.hoursLbl || 'hrs'}</span>
                </div>

                <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t.nextMilestoneLbl || 'Next Milestone'}</span>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-deep)' }}>
                      {lang === 'mr' ? 'मॉड्यूल १०: ६-अक्षीय रोबोटिक आर्म टीच पेंडंट प्रोग्रामिंग' : (lang === 'hi' ? 'मॉड्यूल १०: ६-अक्षीय रोबोटिक आर्म टीच पेंडेंट प्रोग्रामिंग' : studentEnrolledCourses[0].nextMilestone)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('courses')}
                    className="btn btn-primary btn-sm"
                  >
                    {t.resumeLabBtn || 'Resume Lab'} <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Maharashtra Govt DBT & NAPS Stipend Alert */}
              <div style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)', borderRadius: 'var(--radius-xl)', padding: '24px', border: '1px solid #a7f3d0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success-dark)', fontWeight: 800, fontSize: '0.9rem', marginBottom: '8px' }}>
                    <ShieldCheck size={18} />
                    <span>{t.napsStipendActiveLbl || 'NAPS DBT Stipend Active'}</span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success-dark)', marginBottom: '6px' }}>
                    ₹12,000 {t.perMonth || '/ mo'}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    {t.napsStipendDesc || 'Under Maharashtra Kaushalya Setu & NAPS, you are verified for monthly Direct Benefit Transfer during industrial apprenticeship.'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('jobs')}
                  className="btn btn-success btn-sm"
                  style={{ marginTop: '16px' }}
                >
                  {t.viewApprenticeshipOpenings || 'View Apprenticeship Openings'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. SKILL ASSESSMENT ================= */}
        {activeTab === 'assessment' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                  {t.diagnosticAssessmentTitle || 'Diagnostic Skill & Aptitude Assessment'}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {t.diagnosticAssessmentSubtitle || 'Interactive technical assessment calibrated with Maharashtra State Board of Technical Education (MSBTE) standards.'}
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetQuiz}
                className="btn btn-outline btn-sm"
              >
                <RotateCcw size={14} /> {t.resetDiagnosticBtn || 'Reset Diagnostic'}
              </button>
            </div>

            {!quizFinished ? (
              <div className="quiz-container-card">
                <div className="quiz-question-header">
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--saffron-primary)', textTransform: 'uppercase' }}>
                      {currentQ.category}
                    </span>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
                      {t.questionLbl || 'Question'} {currentQIndex + 1} {t.ofLbl || 'of'} {localizedQuestions.length}
                    </h4>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    20 {t.marksLbl || 'Marks'}
                  </span>
                </div>

                <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--navy-deep)', marginBottom: '20px', lineHeight: 1.5 }}>
                  {currentQ.question}
                </p>

                <div>
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedAnswers[currentQ.id]?.optionIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectOption(currentQ.id, idx, opt.score)}
                      >
                        <span>{opt.text}</span>
                        {isSelected && <CheckCircle2 size={18} style={{ color: 'var(--saffron-primary)' }} />}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {Object.keys(selectedAnswers).length} {t.answeredLbl || 'answered'}
                  </span>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={selectedAnswers[currentQ.id] === undefined}
                    onClick={handleNextQuestion}
                  >
                    {currentQIndex < localizedQuestions.length - 1 ? (t.nextQuestionBtn || 'Next Question') : (t.completeQuizBtn || 'Complete & Generate Score')}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* Quiz Score Result Box */
              <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', padding: '36px', textAlign: 'center', border: '2px solid var(--success-dark)', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ecfdf5', color: 'var(--success-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Award size={44} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                  {t.assessmentCompletedTitle || 'Assessment Completed!'}
                </h3>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--success-dark)', margin: '12px 0' }}>
                  {quizScore} / 100
                </div>
                <p style={{ maxWidth: '520px', margin: '0 auto 24px', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                  {t.assessmentScoreSubtitle || 'Outstanding performance! Your core PLC and industrial electrical diagnostics match 94% of Industry 4.0 requirements in Pune and Marathwada clusters.'}
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('pathway')}
                    className="btn btn-primary"
                  >
                    {t.viewRecommendedLearningPath || 'View Recommended Learning Path'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAssistant(lang === 'mr' ? 'माझ्या ९४% गुणांच्या आधारे औद्योगिक मुलाखतीची तयारी करा' : 'Help me prepare for an industrial interview based on my 94% assessment score')}
                    className="btn btn-outline"
                  >
                    <Bot size={16} /> {t.aiInterviewCoach || 'AI Interview Coach'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 3. CAREER EXPLORER ================= */}
        {activeTab === 'explorer' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                {t.highGrowthExplorerTitle || 'High-Growth Career Explorer'}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {t.highGrowthExplorerSubtitle || 'Explore live career paths with real-time employer demand, salary trajectories, and district clusters across Maharashtra.'}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
              {trendingCareersData.map((career) => (
                <div key={career.id} className="career-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.72rem', background: 'var(--navy-subtle)', color: 'var(--navy-deep)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      {lang === 'mr' ? career.sectorMr || career.sector : (lang === 'hi' ? career.sectorHi || career.sector : career.sector)}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--success-dark)', fontWeight: 800 }}>
                      {career.demandGrowth} {t.growthSuffix || 'Growth'}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '8px' }}>
                    {lang === 'mr' ? career.titleMr || career.title : (lang === 'hi' ? career.titleHi || career.title : career.title)}
                  </h4>

                  <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    {lang === 'mr' ? career.descriptionMr || career.description : (lang === 'hi' ? career.descriptionHi || career.description : career.description)}
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{t.salaryScaleLbl || 'Salary Scale'}</span>
                      <span style={{ color: 'var(--navy-deep)', fontWeight: 800 }}>{career.salaryRange}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{t.topHubsLbl || 'Top Hubs'}</span>
                      <span style={{ color: 'var(--saffron-primary)', fontWeight: 700 }}>{career.topDistricts.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('pathway')}
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {t.selectPathwayBtn || 'Select Pathway'} <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 4. MY SKILLS MATRIX ================= */}
        {activeTab === 'skills' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                  {t.verifiedSkillMatrixTitle || 'Verified Skill Matrix'}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {t.verifiedSkillMatrixSubtitle || 'State-accredited competency portfolio with cryptographic DVET & MSBTE verification.'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenAssistant(lang === 'mr' ? 'माझ्याकडे कोणत्या कौशल्यांची कमतरता आहे?' : 'What skills am I missing for senior robotics technician?')}
                className="btn btn-primary btn-sm"
              >
                <Sparkles size={14} /> {t.aiSkillGapAnalysisBtn || 'AI Skill Gap Analysis'}
              </button>
            </div>

            <div className="skill-matrix-grid">
              {studentSkillMatrix.map((item, idx) => {
                const localizedSkills = [
                  { 
                    skill: lang === 'mr' ? 'पीएलसी लॅडर लॉजिक (Siemens S7-1200)' : (lang === 'hi' ? 'पीएलसी लैडर लॉजिक (Siemens S7-1200)' : item.skill),
                    level: lang === 'mr' ? 'प्रगत' : (lang === 'hi' ? 'उन्नत' : item.level),
                    authority: lang === 'mr' ? 'इंडो-जर्मन टूल रूम (IGTR)' : (lang === 'hi' ? 'इंडो-जर्मन टूल रूम (IGTR)' : item.authority)
                  },
                  {
                    skill: lang === 'mr' ? 'SCADA आणि टेलिमेट्री (Wonderware/Delta)' : (lang === 'hi' ? 'SCADA एवं टेलीमेट्री (Wonderware/Delta)' : item.skill),
                    level: lang === 'mr' ? 'मध्यम' : (lang === 'hi' ? 'मध्यम' : item.level),
                    authority: lang === 'mr' ? 'MSBTE प्रमाणित' : (lang === 'hi' ? 'MSBTE प्रमाणित' : item.authority)
                  },
                  {
                    skill: lang === 'mr' ? 'औद्योगिक रोबोटिक्स (ABB/Fanuc आर्म)' : (lang === 'hi' ? 'औद्योगिक रोबोटिक्स (ABB/Fanuc आर्म)' : item.skill),
                    level: lang === 'mr' ? 'मध्यम' : (lang === 'hi' ? 'मध्यम' : item.level),
                    authority: lang === 'mr' ? 'सुरू आहे' : (lang === 'hi' ? 'प्रगति पर' : item.authority)
                  },
                  {
                    skill: lang === 'mr' ? 'इंडस्ट्रियल आयओटीसाठी पायथन' : (lang === 'hi' ? 'औद्योगिक आईओटी के लिए पायथन' : item.skill),
                    level: lang === 'mr' ? 'सुरुवातीचे' : (lang === 'hi' ? 'प्रारंभिक' : item.level),
                    authority: lang === 'mr' ? 'स्वयं-अध्ययन' : (lang === 'hi' ? 'स्वयं-अध्ययन' : item.authority)
                  },
                  {
                    skill: lang === 'mr' ? 'न्यूमॅटिक्स व इलेक्ट्रो-हायड्रोलिक्स' : (lang === 'hi' ? 'न्यूमेटिक्स एवं इलेक्ट्रो-हाइड्रोलिक्स' : item.skill),
                    level: lang === 'mr' ? 'प्रगत' : (lang === 'hi' ? 'उन्नत' : item.level),
                    authority: lang === 'mr' ? 'शासकीय आयटीआय औंध' : (lang === 'hi' ? 'सरकारी आईटीआई औंध' : item.authority)
                  },
                  {
                    skill: lang === 'mr' ? 'इलेक्ट्रिक व्हेईकल सुरक्षा व हाय व्होल्टेज' : (lang === 'hi' ? 'इलेक्ट्रिक वाहन सुरक्षा एवं हाई वोल्टेज' : item.skill),
                    level: lang === 'mr' ? 'मध्यम' : (lang === 'hi' ? 'मध्यम' : item.level),
                    authority: lang === 'mr' ? 'ARAI मान्यताप्राप्त' : (lang === 'hi' ? 'ARAI मान्यता प्राप्त' : item.authority)
                  }
                ];
                const curSkill = localizedSkills[idx] || item;

                return (
                  <div key={idx} className="skill-matrix-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                        {curSkill.skill}
                      </h4>
                      {item.verified ? (
                        <span style={{ color: 'var(--success-dark)', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem', fontWeight: 700 }}>
                          <ShieldCheck size={14} /> {t.verifiedBadge || 'Verified'}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700 }}>
                          {t.selfPacedBadge || 'Self-Paced'}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      <span>{t.levelLbl || 'Level'}: <strong>{curSkill.level}</strong></span>
                      <span><strong>{item.score}%</strong></span>
                    </div>

                    <div className="course-progress-bar-wrap">
                      <div 
                        className="course-progress-bar-fill" 
                        style={{ 
                          width: `${item.score}%`,
                          background: item.score >= 80 ? 'var(--success-dark)' : (item.score >= 60 ? 'var(--saffron-primary)' : '#3b82f6')
                        }}
                      ></div>
                    </div>

                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                      {t.authorityLbl || 'Authority'}: {curSkill.authority}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= 5. COURSES ================= */}
        {activeTab === 'courses' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                {t.enrolledCoursesTitle || 'Enrolled & Recommended Courses'}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {t.enrolledCoursesSubtitle || 'Government subsidized vocational and advanced engineering certifications with practical lab simulations.'}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {courses.map((crs, idx) => {
                const localizedTitles = [
                  lang === 'mr' ? 'प्रगत औद्योगिक ऑटोमेशन व रोबोटिक्स (उद्योग ४.०)' : (lang === 'hi' ? 'उन्नत औद्योगिक स्वचालन एवं रोबोटिक्स (उद्योग ४.०)' : crs.title),
                  lang === 'mr' ? 'ईव्ही पॉवरट्रेन निदान व उच्च व्होल्टेज बॅटरी सिस्टीम्स' : (lang === 'hi' ? 'ईवी पावरट्रेन डायग्नोस्टिक्स एवं उच्च वोल्टेज बैटरी सिस्टम' : crs.title),
                  lang === 'mr' ? 'आधुनिक कारखान्यांसाठी इंडस्ट्रियल आयओटी व क्लाउड टेलिमेट्री' : (lang === 'hi' ? 'आधुनिक कारखानों के लिए इंडस्ट्रियल आईओटी एवं क्लाउड टेलीमेट्री' : crs.title)
                ];
                const localizedBadges = [
                  lang === 'mr' ? 'शासकीय अनुदानित • १००% फी परतावा' : (lang === 'hi' ? 'सरकारी रियायती • १००% शुल्क प्रतिपूर्ति' : crs.badge),
                  lang === 'mr' ? 'ARAI उद्योग प्रमाणित' : (lang === 'hi' ? 'ARAI उद्योग प्रमाणित' : crs.badge),
                  lang === 'mr' ? 'मायक्रो-क्रेडेंशियल' : (lang === 'hi' ? 'माइक्रो-क्रेडेंशियल' : crs.badge)
                ];
                const localizedMilestones = [
                  lang === 'mr' ? 'मॉड्यूल १०: ६-अक्षीय रोबोटिक आर्म टीच पेंडंट प्रोग्रामिंग' : (lang === 'hi' ? 'मॉड्यूल १०: ६-अक्षीय रोबोटिक आर्म टीच पेंडेंट प्रोग्रामिंग' : crs.nextMilestone),
                  lang === 'mr' ? 'मॉड्यूल ५: BMS CAN बस प्रोटोकॉल डिकोडिंग व फॉल्ट लॉग्स' : (lang === 'hi' ? 'मॉड्यूल ५: BMS CAN बस प्रोटोकॉल डिकोडिंग एवं फॉल्ट लॉग' : crs.nextMilestone),
                  lang === 'mr' ? 'मॉड्यूल ३: Modbus TCP ते AWS IoT कोर गेटवे सेटअप' : (lang === 'hi' ? 'मॉड्यूल ३: Modbus TCP से AWS IoT कोर गेटवे सेटअप' : crs.nextMilestone)
                ];

                return (
                  <div key={crs.id} className="student-course-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <span style={{ fontSize: '0.74rem', background: '#ecfdf5', color: 'var(--success-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                          {localizedBadges[idx] || crs.badge}
                        </span>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '6px', marginBottom: '2px' }}>
                          {localizedTitles[idx] || crs.title}
                        </h4>
                        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                          {localizedProviders[idx] || crs.provider} • {crs.instructor}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--saffron-primary)' }}>
                          {crs.progress}%
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {crs.hoursCompleted} / {crs.totalHours} {t.hoursLbl || 'Hours'}
                        </div>
                      </div>
                    </div>

                    <div className="course-progress-bar-wrap">
                      <div className="course-progress-bar-fill" style={{ width: `${crs.progress}%` }}></div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--navy-deep)', fontWeight: 600 }}>
                        {t.nextMilestoneLbl || 'Next'}: <span style={{ color: 'var(--saffron-primary)' }}>{localizedMilestones[idx] || crs.nextMilestone}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => alert(`Starting Virtual Simulator for: ${crs.title}`)}
                          className="btn btn-outline btn-sm"
                        >
                          <PlayCircle size={14} /> {t.launchVirtualLabBtn || 'Launch Virtual Lab'}
                        </button>
                        <button
                          type="button"
                          onClick={() => alert(`Syllabus & notes downloaded for ${crs.title}`)}
                          className="btn btn-primary btn-sm"
                        >
                          {t.continueLearningBtn || 'Continue Learning'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= 6. LEARNING PATH ================= */}
        {activeTab === 'pathway' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                {t.learningPathMilestonesTitle || 'Personalized 5-Stage Learning Pathway'}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {t.targetLbl || 'Target'}: <strong>{profileTargetCareer}</strong> • {lang === 'mr' ? 'अंदाजे कालावधी: ४ महिने' : (lang === 'hi' ? 'अनुमानित अवधि: ४ महीने' : 'Estimated Completion: 4 Months')}
              </div>
            </div>

            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', padding: '32px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="timeline-stepper">
                {studentLearningPathMilestones.map((m, idx) => {
                  const localizedStageTitles = [
                    lang === 'mr' ? 'इलेक्ट्रिकल व सेन्सर मूलभूत तत्त्वे' : (lang === 'hi' ? 'इलेक्ट्रिकल एवं सेंसर मूल बातें' : m.title),
                    lang === 'mr' ? 'पीएलसी प्रोग्रॅमिंग व व्हर्च्युअल एचएमआय सिम्युलेशन' : (lang === 'hi' ? 'पीएलसी प्रोग्रामिंग एवं वर्चुअल एचएमआई सिमुलेशन' : m.title),
                    lang === 'mr' ? 'औद्योगिक रोबोटिक्स व सर्व्हो मोशन' : (lang === 'hi' ? 'औद्योगिक रोबोटिक्स एवं सर्वो मोशन' : m.title),
                    lang === 'mr' ? 'चाकण ऑटो क्लस्टरमध्ये थेट इंडस्ट्री कॅपस्टोन प्रकल्प' : (lang === 'hi' ? 'चाकण ऑटो क्लस्टर में लाइव इंडस्ट्री कैपस्टोन प्रोजेक्ट' : m.title),
                    lang === 'mr' ? 'NAPS थेट प्लेसमेंट / शिकाऊ उमेदवारी' : (lang === 'hi' ? 'NAPS प्रत्यक्ष प्लेसमेंट / शिक्षुता' : m.title)
                  ];
                  const localizedStatus = m.status === 'Completed' 
                    ? (lang === 'mr' ? 'पूर्ण झाले' : (lang === 'hi' ? 'पूर्ण' : 'Completed'))
                    : (m.status === 'In Progress' 
                      ? (lang === 'mr' ? 'सुरू आहे' : (lang === 'hi' ? 'जारी है' : 'In Progress'))
                      : (lang === 'mr' ? 'आगामी' : (lang === 'hi' ? 'आगामी' : m.status)));

                  return (
                    <div 
                      key={m.step} 
                      className={`timeline-step-item ${m.status.toLowerCase().replace(' ', '-')}`}
                    >
                      <div className="timeline-dot">
                        {m.status === 'Completed' ? '✓' : m.step}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                              {lang === 'mr' ? `टप्पा ${m.step}:` : (lang === 'hi' ? `चरण ${m.step}:` : `Stage ${m.step}:`)} {localizedStageTitles[idx] || m.title}
                            </h4>
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '12px',
                              background: m.status === 'Completed' ? '#ecfdf5' : (m.status === 'In Progress' ? 'var(--saffron-light)' : 'var(--bg-secondary)'),
                              color: m.status === 'Completed' ? 'var(--success-dark)' : (m.status === 'In Progress' ? 'var(--saffron-primary)' : 'var(--text-muted)')
                            }}>
                              {localizedStatus}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            {t.durationLbl || 'Duration'}: {m.duration} • {m.progress || m.score}
                          </div>

                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                            {m.topics.map((top, tIdx) => (
                              <span key={tIdx} style={{ background: 'var(--navy-subtle)', color: 'var(--navy-deep)', fontSize: '0.74rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                                {top}
                              </span>
                            ))}
                          </div>
                        </div>

                        {m.status === 'In Progress' && (
                          <button
                            type="button"
                            onClick={() => setActiveTab('courses')}
                            className="btn btn-primary btn-sm"
                          >
                            {t.resumeStageBtn || 'Resume Stage'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= 7. CAMPUS JOBS & APPRENTICESHIPS ================= */}
        {activeTab === 'jobs' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                {t.campusJobsTitle || 'Campus Placements & NAPS Apprenticeships'}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {t.campusJobsSubtitle || 'Direct enterprise openings matching your diploma stream with guaranteed government stipend backing.'}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {studentCampusJobs.map((job, idx) => {
                const isApplied = appliedJobs.includes(job.id);
                const localizedJobTitles = [
                  lang === 'mr' ? 'कनिष्ठ ऑटोमेशन व रोबोटिक्स शिकाऊ उमेदवार' : (lang === 'hi' ? 'कनिष्ठ स्वचालन एवं रोबोटिक्स शिक्षु' : job.title),
                  lang === 'mr' ? 'ईव्ही बॅटरी असेंब्ली व गुणवत्ता प्रशिक्षणार्थी' : (lang === 'hi' ? 'ईवी बैटरी असेंबली एवं गुणवत्ता प्रशिक्षु' : job.title),
                  lang === 'mr' ? 'मेकाट्रॉनिक्स देखभाल प्रशिक्षणार्थी' : (lang === 'hi' ? 'मेकाट्रॉनिक्स रखरखाव प्रशिक्षु' : job.title)
                ];

                const localizedLocations = [
                  lang === 'mr' ? 'पुणे (चाकण प्लांट २)' : (lang === 'hi' ? 'पुणे (चाकण प्लांट २)' : job.location),
                  lang === 'mr' ? 'छत्रपती संभाजीनगर (वाळूज)' : (lang === 'hi' ? 'छत्रपति संभाजीनगर (वालुज)' : job.location),
                  lang === 'mr' ? 'पुणे (मुंढवा फोर्ज विभाग)' : (lang === 'hi' ? 'पुणे (मुंढवा फोर्ज डिवीजन)' : job.location)
                ];
                const localizedStipends = [
                  lang === 'mr' ? '₹१८,५००/महिना + ₹४,५०० शासकीय DBT' : (lang === 'hi' ? '₹१८,५००/माह + ₹४,५०० सरकारी DBT' : job.stipend),
                  lang === 'mr' ? '₹२१,०००/महिना + मोफत वाहतूक' : (lang === 'hi' ? '₹२१,०००/माह + निःशुल्क परिवहन' : job.stipend),
                  lang === 'mr' ? '₹२४,०००/महिना (प्रशिक्षणानंतर ₹३.६ लाख CTC)' : (lang === 'hi' ? '₹२४,०००/माह (प्रशिक्षणोपरांत ₹३.६ लाख CTC)' : job.stipend)
                ];
                const localizedDeadlines = [
                  lang === 'mr' ? '४ दिवसांत' : (lang === 'hi' ? '४ दिनों में' : job.deadline),
                  lang === 'mr' ? '७ दिवसांत' : (lang === 'hi' ? '७ दिनों में' : job.deadline),
                  lang === 'mr' ? '१० दिवसांत' : (lang === 'hi' ? '१० दिनों में' : job.deadline)
                ];

                return (
                  <div key={job.id} className="job-card-premium" style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.75rem', background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                            {job.type}
                          </span>
                          <span style={{ fontSize: '0.75rem', background: '#ecfdf5', color: 'var(--success-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                            {job.matchScore}% {t.careerMatchLbl || 'Match'}
                          </span>
                        </div>

                        <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '0 0 4px 0' }}>
                          {localizedJobTitles[idx] || job.title}
                        </h4>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          {job.company} • 📍 {localizedLocations[idx] || job.location}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--success-dark)' }}>
                          {localizedStipends[idx] || job.stipend}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 700, marginTop: '2px' }}>
                          ⏳ {lang === 'mr' ? 'अंतिम मुदत:' : (lang === 'hi' ? 'अंतिम तिथि:' : 'Deadline:')} {localizedDeadlines[idx] || job.deadline}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', margin: '14px 0' }}>
                      {job.requiredSkills.map((sk, sIdx) => (
                        <span key={sIdx} style={{ background: 'var(--bg-secondary)', color: 'var(--navy-deep)', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          {sk}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        👥 {job.interviewsScheduled} {t.candidatesInBatch || 'Candidates in current batch'}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleApplyCampusJob(job.id)}
                        className={`btn btn-sm ${isApplied ? 'btn-success' : 'btn-primary'}`}
                        disabled={isApplied}
                      >
                        {isApplied ? (t.applicationDispatched || '✓ Application Dispatched') : (t.oneClickCampusApply || '1-Click Campus Apply')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
