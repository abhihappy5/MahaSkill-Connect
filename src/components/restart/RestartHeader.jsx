import React from 'react';
import { 
  RotateCcw, 
  LayoutDashboard, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Compass, 
  Bot, 
  User, 
  ArrowLeft,
  Award,
  CheckCircle2
} from 'lucide-react';
import { mockRestartProfile } from '../../data/careerRestartData';

export function RestartHeader({ 
  activeTab, 
  setActiveTab, 
  onBackToHome, 
  onOpenAssistant,
  lang,
  setLang 
}) {
  const getTabLabel = (key) => {
    if (lang === 'mr') {
      const mr = {
        'dashboard': 'डॅशबोर्ड',
        'restart-home': 'करिअर रीस्टार्ट',
        'assessment': 'कौशल्य मूल्यांकन',
        'training': 'प्रशिक्षण',
        'jobs': 'नोकऱ्या',
        'career-paths': 'करिअर मार्ग',
        'ai-assistant': 'महास्किल कनेक्ट',
        'profile': 'प्रोफाइल'
      };
      return mr[key] || key;
    }
    if (lang === 'hi') {
      const hi = {
        'dashboard': 'डैशबोर्ड',
        'restart-home': 'करियर रीस्टार्ट',
        'assessment': 'कौशल्य मूल्यांकन',
        'training': 'प्रशिक्षण',
        'jobs': 'नौकरियां',
        'career-paths': 'करियर पथ',
        'ai-assistant': 'महास्किल कनेक्ट',
        'profile': 'प्रोफाइल'
      };
      return hi[key] || key;
    }
    const en = {
      'dashboard': 'Dashboard',
      'restart-home': 'Career Restart',
      'assessment': 'Skill Assessment',
      'training': 'Training',
      'jobs': 'Jobs',
      'career-paths': 'Career Paths',
      'ai-assistant': 'AI Assistant',
      'profile': 'Profile'
    };
    return en[key] || key;
  };

  const tabs = [
    { key: 'dashboard', label: getTabLabel('dashboard'), icon: LayoutDashboard },
    { key: 'restart-home', label: getTabLabel('restart-home'), icon: RotateCcw, isHighlight: true },
    { key: 'assessment', label: getTabLabel('assessment'), icon: Sparkles },
    { key: 'training', label: getTabLabel('training'), icon: GraduationCap },
    { key: 'jobs', label: getTabLabel('jobs'), icon: Briefcase },
    { key: 'career-paths', label: getTabLabel('career-paths'), icon: Compass },
    { key: 'ai-assistant', label: getTabLabel('ai-assistant'), icon: Bot, isSpecial: true },
    { key: 'profile', label: getTabLabel('profile'), icon: User }
  ];

  return (
    <header className="dashboard-nav-bar" role="navigation" aria-label="Career Restart Navigation">
      <div className="dash-nav-container">
        {/* Left: Back to Home + Logo */}
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
              background: '#059669',
              color: '#ffffff',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem'
            }}>
              <RotateCcw size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--navy-deep)', lineHeight: 1.1 }}>
                {lang === 'mr' ? 'करिअर रीस्टार्ट' : (lang === 'hi' ? 'करियर रीस्टार्ट' : 'Career Restart')}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {lang === 'mr' ? 'महाराष्ट्र शासन पुनर्कौशल्य अभियान' : 'Government of Maharashtra Reskill Mission'}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Scrollable Navigation Tabs */}
        <div className="dash-nav-links-scroll">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                className={`dash-tab-btn ${isActive ? 'active' : ''}`}
                style={{
                  background: isActive ? (t.isHighlight ? 'var(--success-green)' : 'var(--navy-deep)') : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)'
                }}
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
              </button>
            );
          })}
        </div>

        {/* Right: Candidate Verified Status */}
        <div className="dash-user-badge">
          <div className="dash-user-avatar" style={{ background: 'var(--success-green)' }}>
            {mockRestartProfile.avatar}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-deep)', lineHeight: 1.1 }}>
              {lang === 'mr' ? mockRestartProfile.nameMr : (lang === 'hi' ? mockRestartProfile.nameHi : mockRestartProfile.name)}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--success-dark)', fontWeight: 600 }}>
              {lang === 'mr' ? 'करिअर संक्रमण • प्रमाणित' : 'Career Transition • Verified'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
