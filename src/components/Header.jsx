import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Menu, 
  X, 
  User, 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  Bot,
  RotateCcw,
  ShieldCheck,
  BookOpen,
  MapPin
} from 'lucide-react';

export function Header({ 
  lang, 
  setLang, 
  t, 
  onOpenAuth, 
  onOpenAssistant,
  activeSection,
  setActiveSection,
  currentView,
  setCurrentView,
  publicSubView,
  setPublicSubView
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontScale, setFontScale] = useState('normal');

  // Ensure clean state without theme or contrast classes
  useEffect(() => {
    document.documentElement.classList.remove('dark-theme', 'high-contrast');
    document.body.classList.remove('dark-theme', 'high-contrast');
  }, []);

  const changeFontSize = (size) => {
    setFontScale(size);
    document.documentElement.classList.remove('font-small', 'font-normal', 'font-large', 'font-xlarge');
    document.body.classList.remove('font-small', 'font-normal', 'font-large', 'font-xlarge');
    
    if (size === 'small') {
      document.documentElement.classList.add('font-small');
      document.documentElement.style.fontSize = '13.5px';
    } else if (size === 'large') {
      document.documentElement.classList.add('font-large');
      document.documentElement.style.fontSize = '18.5px';
    } else if (size === 'xlarge') {
      document.documentElement.classList.add('font-xlarge');
      document.documentElement.style.fontSize = '21px';
    } else {
      document.documentElement.classList.add('font-normal');
      document.documentElement.style.fontSize = '16px';
    }
  };

  const handlePublicNavClick = (subView, sectionId) => {
    setCurrentView('home');
    if (setPublicSubView) setPublicSubView(subView);
    setActiveSection(sectionId || subView);
    setMobileMenuOpen(false);
    
    if (subView === 'home' && sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Official Government Top Strip */}
      <div className="gov-top-bar" role="region" aria-label="Official Government Banner">
        <div className="container">
          <div className="gov-brand-left">
            <div className="gov-emblem-mini" aria-hidden="true">
              <img 
                src="/maharashtra_seal.svg" 
                alt="Government of Maharashtra Official Seal" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <span><strong>{t.govTitle || 'Government of Maharashtra'}</strong> | {t.deptTitle || 'Department of Skills, Employment, Entrepreneurship and Innovation'}</span>
          </div>

          <div className="gov-top-right">
            {/* Accessibility Controls: Font Resizing */}
            <div className="accessibility-controls" aria-label="Accessibility settings">
              <button 
                className={`a11y-btn ${fontScale === 'small' ? 'active' : ''}`} 
                onClick={() => changeFontSize('small')}
                title="Decrease font size (A-)"
                aria-label="Decrease font size"
              >
                A-
              </button>
              <button 
                className={`a11y-btn ${fontScale === 'normal' ? 'active' : ''}`} 
                onClick={() => changeFontSize('normal')}
                title="Default font size (A)"
                aria-label="Default font size"
              >
                A
              </button>
              <button 
                className={`a11y-btn ${fontScale === 'large' ? 'active' : ''}`} 
                onClick={() => changeFontSize('large')}
                title="Increase font size (A+)"
                aria-label="Increase font size"
              >
                A+
              </button>
            </div>

            {/* Language Selector */}
            <div className="lang-selector" role="group" aria-label="Language selector">
              <Globe size={13} style={{ color: '#ffffff', marginRight: '2px' }} />
              <button 
                className={`lang-btn ${lang === 'mr' ? 'active' : ''}`} 
                onClick={() => setLang('mr')}
                aria-pressed={lang === 'mr'}
              >
                {'\u092E\u0930\u093E\u0920\u0940'}
              </button>
              <button 
                className={`lang-btn ${lang === 'hi' ? 'active' : ''}`} 
                onClick={() => setLang('hi')}
                aria-pressed={lang === 'hi'}
              >
                {'\u0939\u093F\u0928\u094D\u0926\u0940'}
              </button>
              <button 
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Portal Switcher Bar (Direct access to all 5 Portals) */}
      <div style={{
        background: '#0f172a',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        padding: '6px 0',
        fontSize: '0.8rem'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            <span style={{ color: '#94a3b8', fontWeight: 700, marginRight: '4px', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              {lang === 'mr' ? '\u092A\u094B\u0930\u094D\u091F\u0932\u094D\u0938:' : (lang === 'hi' ? '\u092A\u094B\u0930\u094D\u091F\u0932:' : 'PORTALS:')}
            </span>

            {/* 1. Public Website */}
            <button
              type="button"
              onClick={() => { setCurrentView('home'); if (setPublicSubView) setPublicSubView('home'); }}
              style={{
                background: currentView === 'home' ? 'var(--saffron-primary)' : 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                border: 'none',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease'
              }}
            >
              <Globe size={13} /> {t.publicPlatform || 'Public Platform'}
            </button>

            {/* 2. Student Portal */}
            <button
              type="button"
              onClick={() => setCurrentView('student')}
              style={{
                background: currentView === 'student' ? 'var(--saffron-primary)' : 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                border: 'none',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease'
              }}
            >
              <GraduationCap size={13} /> {t.studentPortal || 'Student'}
            </button>

            {/* 3. Job Seeker Portal */}
            <button
              type="button"
              onClick={() => setCurrentView('dashboard')}
              style={{
                background: currentView === 'dashboard' ? 'var(--saffron-primary)' : 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                border: 'none',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease'
              }}
            >
              <Briefcase size={13} /> {t.jobSeekerPortal || 'Job Seeker'}
            </button>

            {/* 4. Career Restart Portal */}
            <button
              type="button"
              onClick={() => setCurrentView('restart')}
              style={{
                background: currentView === 'restart' ? 'var(--success-dark)' : 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                border: 'none',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease'
              }}
            >
              <RotateCcw size={13} /> {t.careerRestartPortal || 'Career Restart'}
            </button>

            {/* 5. Government Admin */}
            <button
              type="button"
              onClick={() => setCurrentView('admin')}
              style={{
                background: currentView === 'admin' ? '#3b82f6' : 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                border: 'none',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease'
              }}
            >
              <ShieldCheck size={13} /> {t.govtAdminPortal || 'Govt Admin'}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#22c55e', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></span>
              {t.liveStatsBanner || 'Live Data: 1,42,850+ Jobs \u2022 36 Districts'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main GovTech Header */}
      <header className="main-header" role="banner">
        <div className="container">
          <div className="header-inner">
            {/* Logo Area */}
            <a href="#home" className="logo-area" onClick={(e) => { e.preventDefault(); handlePublicNavClick('home', 'home'); }}>
              <div className="logo-badge">
                M
              </div>
              <div className="logo-text-group">
                <div className="logo-brand">
                  MahaSkill <span>Connect</span>
                </div>
                <div className="logo-tagline">{t.tagline}</div>
                <div className="logo-dept">
                  {lang === 'mr' ? 'कौशल्य व रोजगार महासंचालनालय' : (lang === 'hi' ? 'कौशल एवं रोजगार महानिदेशालय' : 'Skill & Employment Intelligence')}
                </div>
              </div>
            </a>

            {/* Public Website Navigation Links */}
            <nav className="header-nav" role="navigation" aria-label="Main Navigation">
              {/* Home */}
              <button 
                type="button"
                className={`nav-link ${currentView === 'home' && (!publicSubView || publicSubView === 'home') ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                onClick={() => handlePublicNavClick('home', 'home')}
              >
                {t.home}
              </button>

              {/* Careers */}
              <button 
                type="button"
                className={`nav-link ${currentView === 'home' && publicSubView === 'careers' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                onClick={() => handlePublicNavClick('careers', 'trending-careers')}
              >
                <Briefcase size={15} />
                {t.exploreCareers || 'Careers'}
              </button>

              {/* Courses */}
              <button 
                type="button"
                className={`nav-link ${currentView === 'home' && publicSubView === 'courses' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                onClick={() => handlePublicNavClick('courses', 'emerging-skills')}
              >
                <BookOpen size={15} />
                {t.findCourses || 'Courses'}
              </button>

              {/* Jobs */}
              <button 
                type="button"
                className={`nav-link ${currentView === 'home' && publicSubView === 'jobs' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                onClick={() => handlePublicNavClick('jobs', '')}
              >
                <TrendingUp size={15} />
                {t.findJobs || 'Jobs'}
              </button>

              {/* Skill Demand */}
              <button 
                type="button"
                className={`nav-link ${currentView === 'home' && publicSubView === 'demand' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                onClick={() => handlePublicNavClick('demand', 'skill-demand-map')}
              >
                <MapPin size={15} />
                {t.skillDemand || 'Skill Demand'}
              </button>

              {/* AI Assistant */}
              <button 
                type="button"
                className="nav-link" 
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={onOpenAssistant}
              >
                <Bot size={15} style={{ color: 'var(--saffron-primary)' }} />
                <span style={{ color: 'var(--saffron-primary)', fontWeight: 700 }}>{t.aiAssistant}</span>
              </button>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              <button 
                className="btn btn-outline btn-sm" 
                onClick={() => onOpenAuth('login')}
              >
                <User size={15} />
                {t.login}
              </button>
              <button 
                className="btn btn-primary btn-sm" 
                onClick={() => onOpenAuth('register')}
              >
                {t.register}
              </button>
              
              {/* Mobile Menu Trigger */}
              <button 
                className="mobile-menu-btn" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px 24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <button className="nav-link" onClick={() => { handlePublicNavClick('home', 'home'); setMobileMenuOpen(false); }}>{t.home}</button>
            <button className="nav-link" onClick={() => { handlePublicNavClick('careers', 'trending-careers'); setMobileMenuOpen(false); }}><Briefcase size={15} /> {t.exploreCareers || 'Careers'}</button>
            <button className="nav-link" onClick={() => { handlePublicNavClick('courses', 'emerging-skills'); setMobileMenuOpen(false); }}><BookOpen size={15} /> {t.findCourses || 'Courses'}</button>
            <button className="nav-link" onClick={() => { handlePublicNavClick('jobs', ''); setMobileMenuOpen(false); }}><TrendingUp size={15} /> {t.findJobs || 'Jobs'}</button>
            <button className="nav-link" onClick={() => { handlePublicNavClick('demand', 'skill-demand-map'); setMobileMenuOpen(false); }}><MapPin size={15} /> {t.skillDemand || 'Skill Demand'}</button>
            
            <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '4px 0' }}></div>
            
            <button className="nav-link" style={{ fontWeight: 800, color: 'var(--saffron-primary)', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => { setCurrentView('student'); setMobileMenuOpen(false); }}><GraduationCap size={16} /> {t.studentPortal || 'Student Portal'}</button>
            <button className="nav-link" style={{ fontWeight: 800, color: 'var(--navy-deep)', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }}><Briefcase size={16} /> {t.jobSeekerPortal || 'Job Seeker Portal'}</button>
            <button className="nav-link" style={{ fontWeight: 800, color: 'var(--success-dark)', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => { setCurrentView('restart'); setMobileMenuOpen(false); }}><RotateCcw size={16} /> {t.careerRestartPortal || 'Career Restart Hub'}</button>
            <button className="nav-link" style={{ fontWeight: 800, color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}><ShieldCheck size={16} /> {t.govtAdminPortal || 'Govt Admin Intelligence'}</button>
            
            <button 
              className="btn btn-primary btn-sm" 
              onClick={() => { setMobileMenuOpen(false); onOpenAssistant(); }}
              style={{ width: '100%', marginTop: '8px' }}
            >
              <Bot size={16} /> {t.askMahaSkillAI || 'Ask MahaSkill Connect'}
            </button>
          </div>
        )}
      </header>
    </>
  );
}
