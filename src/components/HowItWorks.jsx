import React, { useState } from 'react';
import { UserPlus, ClipboardCheck, Sparkles, GraduationCap, BadgeCheck, Briefcase } from 'lucide-react';

// Imported in App.jsx ("Homepage Section 4: How MahaSkill Connect Works") but never existed
// as a file. No backing data file for this one (it's a fixed 6-step pipeline, matching
// components.css's .pipeline-steps-grid which is a hard-coded repeat(6, 1fr)), so the steps
// are defined locally here rather than pulled from src/data.
export function HowItWorks({ t, lang }) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      num: 1,
      icon: UserPlus,
      title: t?.step1Title || (lang === 'mr' ? 'प्रोफाइल तयार करा' : (lang === 'hi' ? 'प्रोफ़ाइल बनाएं' : 'Create Your Profile')),
      desc: t?.step1Desc || (lang === 'mr' ? 'DigiLocker सह सत्यापित प्रोफाइल तयार करा.' : (lang === 'hi' ? 'DigiLocker से सत्यापित प्रोफ़ाइल बनाएं।' : 'Set up a DigiLocker-verified profile in minutes.')),
    },
    {
      num: 2,
      icon: ClipboardCheck,
      title: t?.step2Title || (lang === 'mr' ? 'कौशल्य मूल्यांकन' : (lang === 'hi' ? 'कौशल मूल्यांकन' : 'Skill Assessment')),
      desc: t?.step2Desc || (lang === 'mr' ? 'तुमची सद्यस्थिती जाणून घ्या.' : (lang === 'hi' ? 'अपनी वर्तमान स्थिति जानें।' : 'Understand where you stand against industry benchmarks.')),
    },
    {
      num: 3,
      icon: Sparkles,
      title: t?.step3Title || (lang === 'mr' ? 'एआय शिफारसी' : (lang === 'hi' ? 'एआई सिफारिशें' : 'AI Recommendations')),
      desc: t?.step3Desc || (lang === 'mr' ? 'तुमच्यासाठी योग्य करिअर व कोर्सेस शोधा.' : (lang === 'hi' ? 'अपने लिए सही करियर एवं कोर्स खोजें।' : 'Get matched to careers and courses that fit your profile.')),
    },
    {
      num: 4,
      icon: GraduationCap,
      title: t?.step4Title || (lang === 'mr' ? 'नोंदणी व शिकणे' : (lang === 'hi' ? 'नामांकन एवं सीखना' : 'Enroll & Learn')),
      desc: t?.step4Desc || (lang === 'mr' ? 'शासकीय अनुदानित अभ्यासक्रमांमध्ये सहभागी व्हा.' : (lang === 'hi' ? 'सरकारी सब्सिडी वाले पाठ्यक्रमों में शामिल हों।' : 'Join government-subsidized vocational courses.')),
    },
    {
      num: 5,
      icon: BadgeCheck,
      title: t?.step5Title || (lang === 'mr' ? 'प्रमाणपत्र मिळवा' : (lang === 'hi' ? 'प्रमाणन प्राप्त करें' : 'Get Certified')),
      desc: t?.step5Desc || (lang === 'mr' ? 'DVET/MSBTE मान्यताप्राप्त प्रमाणपत्र मिळवा.' : (lang === 'hi' ? 'DVET/MSBTE मान्यता प्राप्त प्रमाणन पाएं।' : 'Earn a DVET/MSBTE-recognized credential.')),
    },
    {
      num: 6,
      icon: Briefcase,
      title: t?.step6Title || (lang === 'mr' ? 'नोकरी मिळवा' : (lang === 'hi' ? 'नौकरी पाएं' : 'Get Placed')),
      desc: t?.step6Desc || (lang === 'mr' ? 'थेट नियोक्त्यांशी जोडले जा.' : (lang === 'hi' ? 'सीधे नियोक्ताओं से जुड़ें।' : 'Connect directly with verified employers hiring now.')),
    },
  ];

  return (
    <section className="how-it-works-section">
      <div className="container-wide">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '8px' }}>
            {t?.howItWorksTitle || (lang === 'mr' ? 'महास्किल कनेक्ट कसे कार्य करते' : (lang === 'hi' ? 'महास्किल कनेक्ट कैसे काम करता है' : 'How MahaSkill Connect Works'))}
          </h2>
          <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
            {t?.howItWorksSubtitle || (lang === 'mr'
              ? 'प्रोफाइलपासून प्लेसमेंटपर्यंत, सहा सोप्या टप्प्यांत'
              : (lang === 'hi' ? 'प्रोफ़ाइल से प्लेसमेंट तक, छह आसान चरणों में' : 'From profile to placement, in six simple steps'))}
          </div>
        </div>

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
              >
                <div className="step-num-badge">{step.num}</div>
                <Icon size={24} style={{ color: 'var(--saffron-primary)', marginBottom: '10px' }} />
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}