import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { mockCandidateProfile } from '../../data/jobSeekerData';

export function SkillGapAnalysis({ onCloseSkillGap, onExploreCourses, lang }) {
  const exampleBenchmark = [
    {
      skill: lang === 'mr' ? "पीएलसी प्रोग्रामिंग (सीमेन्स/डेल्टा)" : "PLC Programming (Siemens/Delta)",
      requiredLevel: lang === 'mr' ? "प्रगत (८०%)" : "Advanced (80%)",
      currentLevel: 85,
      status: "match",
      statusText: "PLC ✓",
      note: lang === 'mr' ? "उद्योग मानकांपेक्षा ५% जास्त" : "Exceeds standard hiring baseline by 5%"
    },
    {
      skill: lang === 'mr' ? "स्काडा आणि टेलिमेट्री प्रणाली" : "SCADA & Telemetry Systems",
      requiredLevel: lang === 'mr' ? "मध्यम (७०%)" : "Intermediate (70%)",
      currentLevel: 25,
      status: "missing",
      statusText: "SCADA ✕",
      note: lang === 'mr' ? "मोठी तफावत - ४ आठवड्यांचा कोर्स सुचवला" : "Major deficit - 4-week certification recommended"
    },
    {
      skill: lang === 'mr' ? "औद्योगिक ऑटोमेशन तत्त्वे" : "Industrial Automation Principles",
      requiredLevel: lang === 'mr' ? "मध्यम (७५%)" : "Intermediate (75%)",
      currentLevel: 60,
      status: "partial",
      statusText: "Automation 60%",
      note: lang === 'mr' ? "लॅब प्रॅक्टिकल आवश्यक" : "Minor deficit - hands-on lab required"
    },
    {
      skill: lang === 'mr' ? "हाय व्होल्टेज ईव्ही सुरक्षा (HVE)" : "High Voltage EV Safety (HVE)",
      requiredLevel: lang === 'mr' ? "प्रगत (८५%)" : "Advanced (85%)",
      currentLevel: 90,
      status: "match",
      statusText: "HVE Safety ✓",
      note: lang === 'mr' ? "डिजीलाॅकर प्रमाणित प्रमाणपत्र" : "Verified DigiLocker Certificate"
    }
  ];

  return (
    <div className="skill-gap-section" id="section-skill-gap" role="region" aria-label="Skill Gap Analysis">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="section-tag" style={{ background: '#fffbeb', color: '#b45309', borderColor: '#fde68a' }}>
            <TrendingUp size={14} />
            {lang === 'mr' ? 'निदान कौशल्य बुद्धिमत्ता' : (lang === 'hi' ? 'निदान कौशल्य बुद्धिमत्ता' : 'Diagnostic Skill Intelligence')}
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
            {lang === 'mr' ? 'तुम्ही १००% का जुळत नाही आहात?' : (lang === 'hi' ? 'आप १००% मैच क्यों नहीं कर रहे हैं?' : "Why aren't you matching 100%?")}
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '720px' }}>
            {lang === 'mr' 
              ? 'महास्किल कनेक्टने पुणे आणि छत्रपती संभाजीनगरमधील १,४२०+ सक्रिय नोकऱ्या तपासल्या. १००% मॅच आणि उच्च वेतनासाठी तुमच्यातील कौशल्य तफावत खालीलप्रमाणे आहे.'
              : (lang === 'hi'
                ? 'महास्किल कनेक्ट ने पुणे और छत्रपति संभाजीनगर में १,४२०+ सक्रिय नौकरियों का विश्लेषण किया। १००% मैच के लिए कौशल अंतर नीचे दिया गया है।'
                : 'MahaSkill Connect scanned 1,420+ active job openings in Pune and Chhatrapati Sambhaji Nagar for your target roles. Here is the exact competency gap holding back top-tier 100% matches and salary packages.')}
          </p>
        </div>

        <button 
          type="button" 
          className="btn btn-primary btn-lg"
          onClick={onExploreCourses}
        >
          <Sparkles size={18} />
          {lang === 'mr' ? 'कौशल्य तफावत पूर्ण करा' : 'Close My Skill Gap'}
        </button>
      </div>

      {/* Visual Gap Breakdown Grid */}
      <div className="gap-breakdown-grid">
        {exampleBenchmark.map((item, idx) => {
          const isMatch = item.status === 'match';
          const isPartial = item.status === 'partial';
          const isMissing = item.status === 'missing';

          const fillClass = isMatch ? 'high' : (isPartial ? 'medium' : 'low');

          return (
            <div key={idx} className="gap-skill-item">
              <div className="gap-item-top">
                <div>
                  <span className="gap-skill-name">{item.skill}</span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {lang === 'mr' ? 'उद्योग आवश्यकता:' : 'Industry Requirement:'} {item.requiredLevel}
                  </div>
                </div>

                {isMatch && (
                  <span className="badge badge-green" style={{ fontSize: '0.8rem' }}>
                    <CheckCircle2 size={13} /> {item.statusText}
                  </span>
                )}
                {isPartial && (
                  <span className="badge badge-amber" style={{ fontSize: '0.8rem' }}>
                    <AlertTriangle size={13} /> {item.statusText}
                  </span>
                )}
                {isMissing && (
                  <span className="badge badge-saffron" style={{ fontSize: '0.8rem', background: '#fef2f2', color: '#b91c1c', borderColor: '#fecaca' }}>
                    <XCircle size={13} /> {item.statusText}
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="proficiency-bar-bg">
                <div 
                  className={`proficiency-bar-fill ${fillClass}`} 
                  style={{ width: `${item.currentLevel}%` }}
                ></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{lang === 'mr' ? 'सध्याची क्षमता:' : 'Current Proficiency:'} <strong>{item.currentLevel}%</strong></span>
                <span style={{ color: isMatch ? 'var(--success-dark)' : 'var(--saffron-primary)', fontWeight: 600 }}>
                  {item.note}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Banner for closing the gap */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        padding: '24px 28px',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>
            {lang === 'mr' ? 'स्काडा व ऑटोमेशन शिकल्यानंतर अंदाजित वेतन वाढ:' : 'Estimated Package Jump after closing SCADA & Automation gap:'}
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--saffron-primary)', marginTop: '2px' }}>
            ₹5.2 LPA → ₹8.5 LPA (+63% {lang === 'mr' ? 'वाढ' : 'Increase'})
          </div>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>
            {lang === 'mr' ? 'मुख्यमंत्री कौशल्य विकास योजनेअंतर्गत १००% शुल्क सवलत व मोफत बॅचेस उपलब्ध.' : 'Subsidized under Mukhyamantri Kaushalya Vikas Scheme with 100% fee waiver.'}
          </div>
        </div>

        <button 
          type="button" 
          className="btn btn-primary"
          onClick={onExploreCourses}
        >
          <GraduationCap size={16} />
          {lang === 'mr' ? 'अनुदानित बॅचेस पहा' : 'View Subsidized CoE Batches'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
