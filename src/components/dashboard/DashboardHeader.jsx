import React from 'react';
import { 
  Search, 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  GraduationCap, 
  Compass, 
  Bell,
  Settings
} from 'lucide-react';
import { mockCandidateProfile } from '../../data/jobSeekerData';

export function DashboardHeader({ 
  activeTab, 
  setActiveTab, 
  onBackToHome, 
  onOpenAssistant,
  onOpenSettings,
  lang,
  setLang
}) {
  const getTabLabel = (key) => {
    if (lang === 'mr') {
      const mrLabels = {
        'find-jobs': 'नोकऱ्या शोधा',
        'applications': 'माझे अर्ज',
        'skill-gap': 'कौशल्य तफावत',
        'recommended-skills': 'शिफारस कौशल्ये',
        'courses': 'अभ्यासक्रम',
        'career-path': 'करिअर मार्ग'
      };
      return mrLabels[key] || key;
    }
    if (lang === 'hi') {
      const hiLabels = {
        'find-jobs': 'नौकरियां खोजें',
        'applications': 'मेरे आवेदन',
        'skill-gap': 'कौशल अंतर',
        'recommended-skills': 'सुझाए गए कौशल',
        'courses': 'पाठ्यक्रम',
        'career-path': 'करियर पथ'
      };
      return hiLabels[key] || key;
    }
    const enLabels = {
      'find-jobs': 'Find Jobs',
      'applications': 'My Applications',
      'skill-gap': 'Skill Gap',
      'recommended-skills': 'Recommended Skills',
      'courses': 'Courses',
      'career-path': 'Career Path'
    };
    return enLabels[key] || key;
  };

  // 'dashboard' tab removed per request — Find Jobs is now the landing tab
  const tabs = [
    { key: 'find-jobs', label: getTabLabel('find-jobs'), icon: Search },
    { key: 'applications', label: getTabLabel('applications'), icon: Briefcase, count: 12 },
    { key: 'skill-gap', label: getTabLabel('skill-gap'), icon: TrendingUp },
    { key: 'recommended-skills', label: getTabLabel('recommended-skills'), icon: Sparkles },
    { key: 'courses', label: getTabLabel('courses'), icon: GraduationCap },
    { key: 'career-path', label: getTabLabel('career-path'), icon: Compass }
  ];

  return (
    <header className="dashboard-nav-bar" role="navigation" aria-label="Job Seeker Dashboard Navigation">
      <div className="dash-nav-container">

        {/* Left Side: Brand Logo (click to return to the public homepage).
            Reuses the same brand-logo classes as the Student Portal subnav
            (defined in student.css, loaded globally) so both portals share
            an identical lockup here instead of duplicating the CSS. */}
        <button
          type="button"
          className="student-logo-link"
          onClick={onBackToHome}
          aria-label={lang === 'mr' ? 'मुख्यपृष्ठावर परत जा' : (lang === 'hi' ? 'होमपेज पर वापस जाएं' : 'Back to homepage')}
          title={lang === 'mr' ? 'मुख्यपृष्ठावर परत जा' : (lang === 'hi' ? 'होमपेज पर वापस जाएं' : 'Back to homepage')}
        >
          <div className="student-logo-badge">M</div>
          <div className="student-logo-text">
            <div className="student-logo-brand">
              MahaSkill <span>Connect</span>
            </div>
            <div className="student-logo-tagline">
              {lang === 'mr' ? 'आजसाठी कौशल्ये. उद्यासाठी करिअर.' : (lang === 'hi' ? 'आज के लिए कौशल। कल के लिए करियर।' : 'Skills for today. Careers for tomorrow.')}
            </div>
          </div>
        </button>

        {/* Center: Scrollable Tabs */}
        <div className="dash-nav-links-scroll">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                className={`dash-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(t.key);
                  const el = document.getElementById(`section-${t.key}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="tab"
                aria-selected={isActive}
              >
                <Icon size={16} />
                <span>{t.label}</span>
                {t.count && (
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'var(--saffron-light)',
                    color: isActive ? '#ffffff' : 'var(--saffron-primary)',
                    fontWeight: 700
                  }}>
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Notifications, Account Settings & Profile Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Notification Button */}
          <button 
            type="button"
            className="btn btn-outline btn-sm"
            style={{ width: '34px', height: '34px', padding: 0, borderRadius: '50%', position: 'relative' }}
            title="Notifications (2 new)"
            onClick={() => alert("You have 2 notifications:\n1. Video interview scheduled with Tata AutoComp for Sep 28.\n2. 4-week SCADA CoE course subsidy approved by MSSDS.")}
          >
            <Bell size={15} />
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: '#dc2626',
              border: '2px solid #ffffff'
            }}></span>
          </button>

          {/* Account Settings Button — also where the job-search preference
              can be edited after the first-time prompt */}
          <button
            type="button"
            className="btn btn-outline btn-sm"
            style={{ width: '34px', height: '34px', padding: 0, borderRadius: '50%' }}
            title={lang === 'mr' ? 'खाते सेटिंग्ज' : (lang === 'hi' ? 'खाता सेटिंग्स' : 'Account Settings')}
            onClick={onOpenSettings}
          >
            <Settings size={16} />
          </button>

          {/* Compact Profile Avatar — same shared style as the Student Portal */}
          <button
            type="button"
            className="portal-user-avatar"
            onClick={onOpenSettings}
            title={lang === 'mr' ? mockCandidateProfile.nameMr : (lang === 'hi' ? mockCandidateProfile.nameHi : mockCandidateProfile.name)}
            aria-label="Profile"
          >
            {mockCandidateProfile.avatar}
          </button>
        </div>
      </div>
    </header>
  );
}