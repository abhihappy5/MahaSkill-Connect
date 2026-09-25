import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Briefcase, 
  MapPin, 
  GraduationCap,
  Award,
  ArrowRight
} from 'lucide-react';
import { mockCandidateProfile } from '../../data/jobSeekerData';

export function CandidateOverview({ lang, onOpenSkillGap, onFindJobs }) {
  // Determine time-of-day greeting
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return lang === 'mr' ? 'शुभ प्रभात' : (lang === 'hi' ? 'शुभ प्रभात' : 'Good morning');
    if (hours < 17) return lang === 'mr' ? 'शुभ दुपार' : (lang === 'hi' ? 'शुभ दोपहर' : 'Good afternoon');
    return lang === 'mr' ? 'शुभ संध्या' : (lang === 'hi' ? 'शुभ संध्या' : 'Good evening');
  };

  const candidateName = lang === 'mr' ? mockCandidateProfile.nameMr : (lang === 'hi' ? mockCandidateProfile.nameHi : mockCandidateProfile.name);

  return (
    <div className="candidate-welcome-card" id="section-dashboard" role="region" aria-label="Candidate Overview">
      <div className="welcome-layout">
        {/* Left Side: Greeting & Status */}
        <div>
          <span className="badge badge-saffron" style={{ marginBottom: '10px' }}>
            <Sparkles size={13} />
            {lang === 'mr' ? 'महास्किल श्रम बुद्धिमत्ता • सक्रिय नोकरी शोधक' : (lang === 'hi' ? 'महास्किल रोजगार बुद्धिमत्ता • सक्रिय नौकरी खोजी' : 'MahaSkill Labour Intelligence • Active Seeker')}
          </span>

          <h1 className="welcome-greeting-title">
            {getGreeting()}, {candidateName}
          </h1>

          <p className="welcome-greeting-sub">
            {lang === 'mr' ? 'चला तुमची पुढची उत्तम करिअर संधी शोधूया.' : (lang === 'hi' ? 'आइए आपका अगला अवसर खोजें।' : "Let's find your next opportunity.")}
          </p>

          <div className="candidate-details-row">
            <span>
              <GraduationCap size={14} style={{ display: 'inline', marginRight: '4px', color: 'var(--navy-accent)' }} />
              {mockCandidateProfile.education}
            </span>
            <span>•</span>
            <span>
              <MapPin size={14} style={{ display: 'inline', marginRight: '4px', color: 'var(--saffron-primary)' }} />
              {mockCandidateProfile.district} ({mockCandidateProfile.division})
            </span>
            <span>•</span>
            <span>
              <Award size={14} style={{ display: 'inline', marginRight: '4px', color: 'var(--success-green)' }} />
              {mockCandidateProfile.experienceYears} {lang === 'mr' ? 'वर्षे अनुभव' : (lang === 'hi' ? 'वर्ष अनुभव' : 'Yrs Exp')}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-sm" onClick={onFindJobs}>
              <Briefcase size={15} />
              {lang === 'mr' ? 'जुळणाऱ्या नोकऱ्या पहा' : (lang === 'hi' ? 'मिलने वाली नौकरियां देखें' : 'Explore Matched Jobs')}
            </button>
            <button className="btn btn-outline btn-sm" onClick={onOpenSkillGap}>
              <TrendingUp size={15} />
              {lang === 'mr' ? 'कौशल्य तफावत अहवाल' : (lang === 'hi' ? 'कौशल अंतर रिपोर्ट' : 'View Skill Gap Report')}
            </button>
          </div>
        </div>

        {/* Right Side: 4 Radial Metric Progress Tiles */}
        <div className="candidate-metrics-grid">
          {/* Profile Completeness */}
          <div className="metric-tile">
            <div className="radial-progress-ring">
              <svg width="58" height="58">
                <circle cx="29" cy="29" r="24" stroke="#e2e8f0" strokeWidth="5" fill="transparent" />
                <circle 
                  cx="29" 
                  cy="29" 
                  r="24" 
                  stroke="#3b82f6" 
                  strokeWidth="5" 
                  fill="transparent" 
                  strokeDasharray="150.79"
                  strokeDashoffset={150.79 * (1 - mockCandidateProfile.profileCompleteness / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="ring-percent-text">{mockCandidateProfile.profileCompleteness}%</span>
            </div>
            <div className="metric-tile-title">{lang === 'mr' ? 'प्रोफाइल पूर्णता' : (lang === 'hi' ? 'प्रोफाइल पूर्णता' : 'Profile Completeness')}</div>
            <div className="metric-tile-sub">{lang === 'mr' ? 'आधार व डिजीलाॅकर प्रमाणित' : (lang === 'hi' ? 'आधार एवं डिजिलॉकर सत्यापित' : 'Aadhaar & DigiLocker verified')}</div>
          </div>

          {/* Resume Completeness */}
          <div className="metric-tile">
            <div className="radial-progress-ring">
              <svg width="58" height="58">
                <circle cx="29" cy="29" r="24" stroke="#e2e8f0" strokeWidth="5" fill="transparent" />
                <circle 
                  cx="29" 
                  cy="29" 
                  r="24" 
                  stroke="#10b981" 
                  strokeWidth="5" 
                  fill="transparent" 
                  strokeDasharray="150.79"
                  strokeDashoffset={150.79 * (1 - mockCandidateProfile.resumeCompleteness / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="ring-percent-text">{mockCandidateProfile.resumeCompleteness}%</span>
            </div>
            <div className="metric-tile-title">{lang === 'mr' ? 'रेझ्युमे गुण' : (lang === 'hi' ? 'रिज्यूमे स्कोर' : 'Resume Score')}</div>
            <div className="metric-tile-sub">{lang === 'mr' ? 'शासकीय एआय द्वारे विश्लेषित' : (lang === 'hi' ? 'सरकारी एआई द्वारा विश्लेषित' : 'GovTech AI Parsed')}</div>
          </div>

          {/* Skill Match Score */}
          <div className="metric-tile" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
            <div className="radial-progress-ring">
              <svg width="58" height="58">
                <circle cx="29" cy="29" r="24" stroke="#d1fae5" strokeWidth="5" fill="transparent" />
                <circle 
                  cx="29" 
                  cy="29" 
                  r="24" 
                  stroke="#059669" 
                  strokeWidth="5" 
                  fill="transparent" 
                  strokeDasharray="150.79"
                  strokeDashoffset={150.79 * (1 - mockCandidateProfile.topSkillMatchScore / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="ring-percent-text" style={{ color: '#047857' }}>{mockCandidateProfile.topSkillMatchScore}%</span>
            </div>
            <div className="metric-tile-title" style={{ color: '#065f46' }}>{lang === 'mr' ? 'सर्वोच्च मॅच गुण' : (lang === 'hi' ? 'शीर्ष मैच स्कोर' : 'Top Match Score')}</div>
            <div className="metric-tile-sub" style={{ color: '#047857' }}>{lang === 'mr' ? 'टाटा ऑटोकाॅम्प व बजाज' : (lang === 'hi' ? 'टाटा ऑटोकॉम्प एवं बजाज' : 'Tata AutoComp & Bajaj')}</div>
          </div>

          {/* Applications Count */}
          <div className="metric-tile">
            <div style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              background: 'var(--saffron-light)',
              color: 'var(--saffron-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 800,
              marginBottom: '8px'
            }}>
              {mockCandidateProfile.applicationsCount}
            </div>
            <div className="metric-tile-title">{lang === 'mr' ? 'अर्ज केलेले' : (lang === 'hi' ? 'कुल आवेदन' : 'Applications')}</div>
            <div className="metric-tile-sub" style={{ color: 'var(--saffron-hover)', fontWeight: 600 }}>
              {mockCandidateProfile.activeInterviews} {lang === 'mr' ? 'मुलाखती नियोजित' : (lang === 'hi' ? 'साक्षात्कार निर्धारित' : 'Interviews Scheduled')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
