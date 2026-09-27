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
  ShieldCheck,
  BookOpen,
  MapPin,
  ChevronDown,
  Layers,
  Sparkles,
  LogOut
} from 'lucide-react';

export function Header({ 
  lang, 
  setLang, 
  t, 
  currentUser,
  onLogout,
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
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);

  // Close portals dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setPortalsDropdownOpen(false);
    if (portalsDropdownOpen) {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  }, [portalsDropdownOpen]);

  const changeFontSize = (size) => {
    setFontScale(size);
    document.documentElement.classList.remove('font-small', 'font-normal', 'font-large', 'font-xlarge');
    document.body.classList.remove('font-small', 'font-normal', 'font-large', 'font-xlarge');
    
    if (size === 'small') {
      document.documentElement.classList.add('font-small');
      document.documentElement.style.fontSize = '14px';
    } else if (size === 'large') {
      document.documentElement.classList.add('font-large');
      document.documentElement.style.fontSize = '18px';
    } else if (size === 'xlarge') {
      document.documentElement.classList.add('font-xlarge');
      document.documentElement.style.fontSize = '20px';
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

  const portalsList = [
    { key: 'student', label: t.studentPortal || 'Student & Youth', icon: GraduationCap, color: '#f59e0b', desc: 'ITI trades, aptitude & college courses' },
    { key: 'dashboard', label: t.jobSeekerPortal || 'Job Seeker', icon: Briefcase, color: '#3b82f6', desc: 'AI job match & DigiLocker applications' },
    { key: 'admin', label: t.govtAdminPortal || 'Govt Admin Cockpit', icon: ShieldCheck, color: '#6366f1', desc: '36 district heatmaps & labour KPIs' },
  ];

  return (
    <>
      {/* 1. Official Government Top Strip */}
      <div className="gov-top-bar" role="region" aria-label="Official Government Banner">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          
          {/* Left: Official Gov Seal & Title */}
          <div className="gov-brand-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="gov-emblem-mini" aria-hidden="true" style={{ width: '22px', height: '22px' }}>
              <img 
                src="/maharashtra_seal.svg" 
                alt="Government of Maharashtra Official Seal" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <span style={{ fontSize: '0.78rem', color: '#f8fafc' }}>
              <strong>{t.govTitle || 'Government of Maharashtra'}</strong> | {t.deptTitle || 'Skill & Employment Mission'}
            </span>
          </div>

          {/* Right: Live Market Stats + Accessibility + Language Selector */}
          <div className="gov-top-right" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            
            {/* Live Stats Pill */}
            <div style={{ display: 'none', md: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#86efac', fontWeight: 700 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
              <span>1,42,850+ Live Vacancies</span>
            </div>

            {/* Accessibility Controls: Font Resizing */}
            <div className="accessibility-controls" aria-label="Accessibility settings" style={{ display: 'flex', gap: '2px' }}>
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
                मराठी
              </button>
              <button 
                className={`lang-btn ${lang === 'hi' ? 'active' : ''}`} 
                onClick={() => setLang('hi')}
                aria-pressed={lang === 'hi'}
              >
                हिन्दी
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

      {/* 2. Main GovTech Header */}
      <header className="main-header" role="banner" style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div className="container">
          <div className="header-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', gap: '16px' }}>
            
            {/* Logo Area */}
            <a 
              href="#home" 
              className="logo-area" 
              onClick={(e) => { e.preventDefault(); handlePublicNavClick('home', 'home'); }}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <div className="logo-badge" style={{ width: '40px', height: '40px', borderRadius: '10px', fontSize: '1.25rem', fontWeight: 800 }}>
                M
              </div>
              <div className="logo-text-group">
                <div className="logo-brand" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-deep)', lineHeight: 1.1 }}>
                  MahaSkill <span style={{ color: 'var(--saffron-primary)' }}>Connect</span>
                </div>
                <div className="logo-tagline" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {t.tagline || 'Statewide AI Labour & Skill Intelligence'}
                </div>
              </div>
            </a>

            {/* Public Website Navigation Links */}
            <nav className="header-nav" role="navigation" aria-label="Main Navigation" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              
              {/* Home */}
              <button 
                type="button"
                className={`nav-link ${currentView === 'home' && (!publicSubView || publicSubView === 'home') ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: '6px 10px', fontSize: '0.86rem' }}
                onClick={() => handlePublicNavClick('home', 'home')}
              >
                {t.home}
              </button>

              {/* Careers */}
              <button 
                type="button"
                className={`nav-link ${currentView === 'home' && publicSubView === 'careers' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: '6px 10px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                onClick={() => handlePublicNavClick('careers', 'trending-careers')}
              >
                <Briefcase size={14} />
                {t.exploreCareers || 'Careers'}
              </button>

              {/* Courses */}
              <button 
                type="button"
                className={`nav-link ${currentView === 'home' && publicSubView === 'courses' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: '6px 10px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                onClick={() => handlePublicNavClick('courses', 'trending-careers')}
              >
                <BookOpen size={14} />
                {t.findCourses || 'Courses'}
              </button>

              {/* Jobs */}
              <button 
                type="button"
                className={`nav-link ${currentView === 'home' && publicSubView === 'jobs' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: '6px 10px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                onClick={() => handlePublicNavClick('jobs', '')}
              >
                <TrendingUp size={14} />
                {t.findJobs || 'Jobs'}
              </button>

              {/* PORTALS DROPDOWN MENU */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPortalsDropdownOpen(!portalsDropdownOpen);
                  }}
                  style={{
                    background: currentView !== 'home' ? '#f1f5f9' : 'transparent',
                    border: '1px solid #cbd5e1',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    color: 'var(--navy-deep)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Layers size={14} style={{ color: 'var(--saffron-primary)' }} />
                  <span>{currentView !== 'home' ? portalsList.find(p => p.key === currentView)?.label : 'Portals'}</span>
                  <ChevronDown size={13} style={{ transform: portalsDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {portalsDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: '0',
                    width: '240px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0',
                    padding: '6px',
                    zIndex: 1100
                  }}>
                    {portalsList.map((p) => {
                      const Icon = p.icon;
                      const isSelected = currentView === p.key;
                      return (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => {
                            setCurrentView(p.key);
                            setPortalsDropdownOpen(false);
                          }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            border: 'none',
                            background: isSelected ? '#f8fafc' : 'transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            transition: 'background 0.15s'
                          }}
                        >
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: `${p.color}15`,
                            color: p.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--navy-deep)' }}>
                              {p.label}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                              {p.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* AI Assistant Pill */}
              <button 
                type="button"
                className="nav-link" 
                style={{ 
                  background: 'rgba(255, 107, 0, 0.08)', 
                  border: '1px solid rgba(255, 107, 0, 0.3)', 
                  borderRadius: '20px',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
                onClick={onOpenAssistant}
              >
                <Bot size={14} style={{ color: 'var(--saffron-primary)' }} />
                <span style={{ color: 'var(--saffron-primary)', fontWeight: 800, fontSize: '0.82rem' }}>{t.aiAssistant}</span>
              </button>
            </nav>

            {/* Header Actions (User Profile if logged in, otherwise Login / Register) */}
            <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {currentUser ? (
                /* Authenticated User Profile Pill */
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div 
                    onClick={() => {
                      if (currentUser.role === 'student') setCurrentView('student');
                      else if (currentUser.role === 'candidate' || currentUser.role === 'jobseeker') setCurrentView('dashboard');
                      else if (currentUser.role === 'restart') setCurrentView('restart');
                      else if (currentUser.role === 'admin' || currentUser.role === 'employer') setCurrentView('admin');
                    }}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      background: '#f8fafc', 
                      padding: '4px 10px', 
                      borderRadius: '24px', 
                      border: '1px solid #cbd5e1',
                      cursor: 'pointer'
                    }}
                    title="Click to view dashboard"
                  >
                    <div style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      background: 'var(--navy-deep)', 
                      color: '#ffffff', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 800, 
                      fontSize: '0.78rem' 
                    }}>
                      {currentUser.avatar || currentUser.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy-deep)', lineHeight: 1.1 }}>
                        {currentUser.name}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--saffron-primary)', fontWeight: 700 }}>
                        {currentUser.roleLabel || currentUser.role}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onLogout}
                    title="Logout"
                    style={{
                      background: '#fef2f2',
                      color: '#dc2626',
                      border: '1px solid #fecaca',
                      borderRadius: '20px',
                      padding: '5px 10px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <LogOut size={13} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                /* Guest User Actions */
                <>
                  <button 
                    className="btn btn-outline btn-sm" 
                    onClick={() => onOpenAuth('login')}
                    style={{ padding: '6px 14px', fontSize: '0.84rem', fontWeight: 700 }}
                  >
                    <User size={14} />
                    {t.login}
                  </button>
                  <button 
                    className="btn btn-primary btn-sm" 
                    onClick={() => onOpenAuth('register')}
                    style={{ padding: '6px 14px', fontSize: '0.84rem', fontWeight: 700 }}
                  >
                    {t.register}
                  </button>
                </>
              )}
              
              {/* Mobile Menu Trigger */}
              <button 
                className="mobile-menu-btn" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {currentUser && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '6px' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--navy-deep)' }}>{currentUser.name}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--saffron-primary)', fontWeight: 700 }}>{currentUser.roleLabel || currentUser.role}</div>
                </div>
                <button
                  type="button"
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Logout
                </button>
              </div>
            )}

            <button 
              type="button" 
              className="btn btn-outline" 
              style={{ width: '100%', justifyContent: 'flex-start' }}
              onClick={() => handlePublicNavClick('home', 'home')}
            >
              {t.home}
            </button>
            <button 
              type="button" 
              className="btn btn-outline" 
              style={{ width: '100%', justifyContent: 'flex-start' }}
              onClick={() => handlePublicNavClick('careers', 'trending-careers')}
            >
              <Briefcase size={15} /> {t.exploreCareers || 'Careers'}
            </button>
            <button 
              type="button" 
              className="btn btn-outline" 
              style={{ width: '100%', justifyContent: 'flex-start' }}
              onClick={() => handlePublicNavClick('courses', 'trending-careers')}
            >
              <BookOpen size={15} /> {t.findCourses || 'Courses'}
            </button>
            <button 
              type="button" 
              className="btn btn-outline" 
              style={{ width: '100%', justifyContent: 'flex-start' }}
              onClick={() => handlePublicNavClick('jobs', '')}
            >
              <TrendingUp size={15} /> {t.findJobs || 'Jobs'}
            </button>
            
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px', marginTop: '4px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Portals:</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '6px' }}>
                {portalsList.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => {
                      setCurrentView(p.key);
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0',
                      background: '#f8fafc',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}