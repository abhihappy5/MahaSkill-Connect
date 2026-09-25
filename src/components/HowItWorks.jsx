import React, { useState } from 'react';
import { 
  Workflow, 
  Building2, 
  BrainCircuit, 
  GraduationCap, 
  Award, 
  Briefcase, 
  RotateCw,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export function HowItWorks({ t, lang }) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      num: 1,
      title: t.step1Title,
      desc: t.step1Desc,
      icon: Building2,
      detail: lang === 'mr' 
        ? "पुण्यातील ऑटो कंपन्या, मुंबईतील आयटी व फिनटेक दिग्गज आणि ५०,०००+ एमएसएमई कडून थेट भरती गरजांचे विश्लेषण केले जाते."
        : (lang === 'hi'
          ? "पुणे की ऑटो कंपनियों, मुंबई के आईटी दिग्गजों और ५०,०००+ एमएसएमई से वास्तविक समय की भर्ती मांग का विश्लेषण किया जाता है।"
          : "Aggregates real-time hiring demands from 50,000+ MSMEs, Tier-1 auto majors in Pune, IT giants in Mumbai, and new MIDC projects.")
    },
    {
      num: 2,
      title: t.step2Title,
      desc: t.step2Desc,
      icon: BrainCircuit,
      detail: lang === 'mr'
        ? "एआय अल्गोरिदम जिल्हास्तरीय मनुष्यबळ आकडेवारी आणि नवीन तंत्रज्ञान गरजांची तुलना करून कौशल्य तफावत अचूकपणे ओळखतात."
        : (lang === 'hi'
          ? "एआई एल्गोरिदम जिला स्तरीय कार्यबल आंकड़ों और तकनीकी आवश्यकताओं का मिलान करके सटीक कौशल अंतर की पहचान करते हैं।"
          : "AI algorithms cross-reference district workforce stats with emerging technological requirements to pinpoint exact skill deficits.")
    },
    {
      num: 3,
      title: t.step3Title,
      desc: t.step3Desc,
      icon: GraduationCap,
      detail: lang === 'mr'
        ? "विद्यार्थ्यांना थेट ३,४२०+ मान्यताप्राप्त आयटीआय, तंत्रनिकेतन आणि उत्कृष्ट केंद्रांमध्ये शासकीय शिष्यवृत्तीसह प्रवेश दिला जातो."
        : (lang === 'hi'
          ? "छात्रों को सीधे ३,४२०+ मान्यता प्राप्त आईटीआई, पॉलिटेक्निक और उत्कृष्ट केंद्रों में सरकारी वित्तीय सहायता के साथ नामांकित किया जाता है।"
          : "Directly enrolls learners into 3,420+ accredited ITIs, polytechnics, and Centers of Excellence with state-backed financial aid.")
    },
    {
      num: 4,
      title: t.step4Title,
      desc: t.step4Desc,
      icon: Award,
      detail: lang === 'mr'
        ? "प्रात्यक्षिक व डिजिटल परीक्षांद्वारे मूल्यांकन करून संपूर्ण राज्यात ग्राह्य असणारे सुरक्षित डिजिटल प्रमाणपत्र दिले जाते."
        : (lang === 'hi'
          ? "व्यावहारिक एवं डिजिटल परीक्षाओं द्वारा मूल्यांकन कर राज्य भर में मान्य डिजिटल प्रमाणित बैज जारी किए जाते हैं।"
          : "Conducts hands-on and digital assessments to issue tamper-proof verifiable digital micro-credentials recognized statewide.")
    },
    {
      num: 5,
      title: t.step5Title,
      desc: t.step5Desc,
      icon: Briefcase,
      detail: lang === 'mr'
        ? "थेट मॅचमेकिंग अल्गोरिदम प्रमाणित उमेदवारांना मध्यस्थांशिवाय थेट उद्योगांमधील रिक्त पदांशी जोडतात."
        : (lang === 'hi'
          ? "सीधे मैचमेकिंग एल्गोरिदम प्रमाणित उम्मीदवारों को बिना किसी बिचौलिए के सक्रिय रिक्तियों से जोड़ते हैं।"
          : "Direct matchmaking algorithms connect verified job seekers to matching vacancies without middleman overhead.")
    },
    {
      num: 6,
      title: t.step6Title,
      desc: t.step6Desc,
      icon: RotateCw,
      detail: lang === 'mr'
        ? "उद्योगांकडून सतत मिळणाऱ्या अभिप्रायाच्या आधारे अभ्यासक्रम वेळोवेळी अद्ययावत केला जातो जेणेकरून मनुष्यबळ दर्जेदार राहील."
        : (lang === 'hi'
          ? "उद्योगों से निरंतर फीडबैक के आधार पर पाठ्यक्रमों को अद्यतन किया जाता है ताकि प्रतिभा विश्वस्तरीय बनी रहे।"
          : "Ongoing employer retention feedback continuously updates vocational syllabi to keep Maharashtra's talent world-class.")
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section" aria-label="How MahaSkill Connect Works">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Workflow size={14} />
            {t.howItWorksTag}
          </span>
          <h2 className="section-title">{t.howItWorksTitle}</h2>
          <p className="section-subtitle">{t.howItWorksSubtitle}</p>
        </div>

        {/* 6 Steps Grid */}
        <div className="pipeline-steps-grid">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.num;
            return (
              <div 
                key={step.num}
                className={`pipeline-step-card ${isActive ? 'active' : ''}`}
                onClick={() => setActiveStep(step.num)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setActiveStep(step.num); }}
                aria-label={`Step ${step.num}: ${step.title}`}
              >
                <div className="step-num-badge">
                  {step.num}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Icon size={22} style={{ color: isActive ? 'var(--saffron-primary)' : 'var(--navy-deep)' }} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Active Step Highlight Card */}
        <div style={{
          marginTop: '32px',
          background: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          boxShadow: 'var(--shadow-sm)',
          flexWrap: 'wrap'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--saffron-primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.2rem',
            flexShrink: 0
          }}>
            {activeStep}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--saffron-primary)', textTransform: 'uppercase' }}>
              {(t.howPhaseDeepDive || 'Phase {num} Deep Dive: {title}').replace('{num}', activeStep).replace('{title}', steps[activeStep - 1].title)}
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--navy-deep)', fontWeight: 600, marginTop: '2px' }}>
              {steps[activeStep - 1].detail}
            </div>
          </div>

          <button 
            className="btn btn-outline-saffron btn-sm"
            onClick={() => setActiveStep(activeStep === 6 ? 1 : activeStep + 1)}
          >
            {activeStep === 6 ? (t.howRestartCycle || "Restart Cycle") : (t.howNextPhase || "Next Phase")}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
