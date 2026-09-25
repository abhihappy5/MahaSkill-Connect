import React from 'react';
import { Home, Compass, Briefcase, Bot, User } from 'lucide-react';

export function MobileBottomNav({ currentView, setCurrentView, onOpenAi, onOpenAuth, lang, t }) {
  const navLabels = {
    home: lang === 'mr' ? 'मुख्य' : (lang === 'hi' ? 'होम' : 'Home'),
    explore: lang === 'mr' ? 'शोधा' : (lang === 'hi' ? 'एक्सप्लोर' : 'Explore'),
    jobs: lang === 'mr' ? 'नोकऱ्या' : (lang === 'hi' ? 'नौकरियां' : 'Jobs'),
    ai: lang === 'mr' ? 'महास्किल कनेक्ट' : (lang === 'hi' ? 'महास्किल कनेक्ट' : 'MahaSkill Connect'),
    profile: lang === 'mr' ? 'प्रोफाइल' : (lang === 'hi' ? 'प्रोफ़ाइल' : 'Profile')
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <div className="mobile-bottom-grid">
        {/* Home */}
        <button
          type="button"
          className={`mobile-nav-btn ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Navigate to Home"
        >
          <Home size={20} />
          <span>{navLabels.home}</span>
        </button>

        {/* Explore */}
        <button
          type="button"
          className={`mobile-nav-btn ${currentView === 'explore' ? 'active' : ''}`}
          onClick={() => {
            if (currentView !== 'home') setCurrentView('home');
            const mapSection = document.getElementById('skill-demand-map') || document.getElementById('trending-careers');
            if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Explore Skill Demand & Careers"
        >
          <Compass size={20} />
          <span>{navLabels.explore}</span>
        </button>

        {/* Center Prominent AI Trigger */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            type="button"
            className="mobile-ai-center-btn"
            onClick={onOpenAi}
            aria-label="Open MahaSkill Connect"
          >
            <Bot size={26} />
          </button>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--saffron-primary)', marginTop: '-8px' }}>
            AI
          </span>
        </div>

        {/* Jobs */}
        <button
          type="button"
          className={`mobile-nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
          aria-label="Navigate to Jobs Dashboard"
        >
          <Briefcase size={20} />
          <span>{navLabels.jobs}</span>
        </button>

        {/* Profile / Auth */}
        <button
          type="button"
          className={`mobile-nav-btn ${currentView === 'restart' ? 'active' : ''}`}
          onClick={onOpenAuth}
          aria-label="User Profile & Login"
        >
          <User size={20} />
          <span>{navLabels.profile}</span>
        </button>
      </div>
    </nav>
  );
}
