import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  GraduationCap, 
  Compass, 
  Bot, 
  User, 
  Bell, 
  ArrowLeft,
  Globe
} from 'lucide-react';
import { mockCandidateProfile } from '../../data/jobSeekerData';

export function DashboardHeader({ 
  activeTab, 
  setActiveTab, 
  onBackToHome, 
  onOpenAssistant,
  lang,
  setLang
}) {
  const getTabLabel = (key) => {
    if (lang === 'mr') {
      const mrLabels = {
        'dashboard': 'डॅशबोर्ड',
        'find-jobs': 'नोकऱ्या शोधा',
        'applications': 'माझे अर्ज',
        'skill-gap': 'कौशल्य तफावत',
        'recommended-skills': 'शिफारस कौशल्ये',
        'courses': 'अभ्यासक्रम',
        'career-path': 'करिअर मार्ग',
        'ai-assistant': 'महास्किल कनेक्ट',
        'profile': 'प्रोफाइल'
      };
      return mrLabels[key] || key;
    }
    if (lang === 'hi') {
      const hiLabels = {
        'dashboard': 'डैशबोर्ड',
        'find-jobs': 'नौकरियां खोजें',
        'applications': 'मेरे आवेदन',
        'skill-gap': 'कौशल अंतर',
        'recommended-skills': 'सुझाए गए कौशल',
        'courses': 'पाठ्यक्रम',
        'career-path': 'करियर पथ',
        'ai-assistant': 'महास्किल कनेक्ट',
        'profile': 'प्रोफाइल'
      };
      return hiLabels[key] || key;
    }
    const enLabels = {
      'dashboard': 'Dashboard',
      'find-jobs': 'Find Jobs',
      'applications': 'My Applications',
      'skill-gap': 'Skill Gap',
      'recommended-skills': 'Recommended Skills',
      'courses': 'Courses',
      'career-path': 'Career Path',
      'ai-assistant': 'AI Assistant',
      'profile': 'Profile'
    };
    return enLabels[key] || key;
  };

  const tabs = [
    { key: 'dashboard', label: getTabLabel('dashboard'), icon: LayoutDashboard },
    { key: 'find-jobs', label: getTabLabel('find-jobs'), icon: Search },
    { key: 'applications', label: getTabLabel('applications'), icon: Briefcase, count: 12 },
    { key: 'skill-gap', label: getTabLabel('skill-gap'), icon: TrendingUp },
    { key: 'recommended-skills', label: getTabLabel('recommended-skills'), icon: Sparkles },
    { key: 'courses', label: getTabLabel('courses'), icon: GraduationCap },
    { key: 'career-path', label: getTabLabel('career-path'), icon: Compass },
    { key: 'ai-assistant', label: getTabLabel('ai-assistant'), icon: Bot, isSpecial: true },
    { key: 'profile', label: getTabLabel('profile'), icon: User }
  ];

  return (
    <header className="dashboard-nav-bar" role="navigation" aria-label="Job Seeker Dashboard Navigation">
      <div className="dash-nav-container">
        {/* Left Side: Back to Home + Portal Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onBackToHome}
            title="Return to MahaSkill Portal"
            style={{ padding: '6px 12px' }}
          >
            <ArrowLeft size={15} />
            <span>{lang === 'mr' ? 'मुख्य पोर्टल' : (lang === 'hi' ? 'मुख्य पोर्टल' : 'Main Portal')}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--saffron-primary)',
              color: '#ffffff',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem'
            }}>
              M
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--navy-deep)', lineHeight: 1.1 }}>
                {lang === 'mr' ? 'नोकरी शोध केंद्र' : (lang === 'hi' ? 'रोजगार केंद्र' : 'Job Seeker Hub')}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {lang === 'mr' ? 'महाराष्ट्र शासन' : (lang === 'hi' ? 'महाराष्ट्र सरकार' : 'Government of Maharashtra')}
              </div>
            </div>
          </div>
        </div>

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
                  if (t.key === 'ai-assistant') {
                    onOpenAssistant();
                  } else {
                    setActiveTab(t.key);
                    const el = document.getElementById(`section-${t.key}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                role="tab"
                aria-selected={isActive}
              >
                <Icon size={16} style={{ color: t.isSpecial ? 'var(--saffron-primary)' : 'inherit' }} />
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

        {/* Right Side: Notifications & User Profile */}
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

          {/* User Profile Badge */}
          <div className="dash-user-badge">
            <div className="dash-user-avatar">
              {mockCandidateProfile.avatar}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-deep)', lineHeight: 1.1 }}>
                {lang === 'mr' ? mockCandidateProfile.nameMr : (lang === 'hi' ? mockCandidateProfile.nameHi : mockCandidateProfile.name)}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--success-dark)', fontWeight: 600 }}>
                {mockCandidateProfile.district} • {lang === 'mr' ? 'प्रमाणित' : (lang === 'hi' ? 'सत्यापित' : 'Verified')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
