import React, { useState } from 'react';
import { translations } from './data/translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RoleEntryCards } from './components/RoleEntryCards';
import { SkillDemandMap } from './components/SkillDemandMap';
import { TrendingCareers } from './components/TrendingCareers';
import { EmergingSkills } from './components/EmergingSkills';
import { HowItWorks } from './components/HowItWorks';
import { SuccessStories } from './components/SuccessStories';
import { PublicCoursesView } from './components/public/PublicCoursesView';
import { PublicJobsView } from './components/public/PublicJobsView';
import { StudentDashboard } from './components/student/StudentDashboard';
import { JobSeekerDashboard } from './components/dashboard/JobSeekerDashboard';
import { CareerRestartDashboard } from './components/restart/CareerRestartDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UnifiedAiModal } from './components/ai/UnifiedAiModal';
import { VoiceInteractionOverlay } from './components/ai/VoiceInteractionOverlay';
import { MobileBottomNav } from './components/ai/MobileBottomNav';
import { AuthModal } from './components/AuthModal';
import { CareerPathwayModal } from './components/CareerPathwayModal';
import { Footer } from './components/Footer';
import { Bot, Sparkles, Mic } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'mr' | 'hi'
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'student' | 'dashboard' | 'restart' | 'admin'
  const [publicSubView, setPublicSubView] = useState('home'); // 'home' | 'careers' | 'courses' | 'jobs' | 'demand'
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [externalFilter, setExternalFilter] = useState('');

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  
  // Phase 5 Unified AI & Voice State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState('');
  const [aiActivePersona, setAiActivePersona] = useState('student');
  const [isVoiceOverlayOpen, setIsVoiceOverlayOpen] = useState(false);

  const [isPathwayOpen, setIsPathwayOpen] = useState(false);
  const [pathwayRolePreset, setPathwayRolePreset] = useState('');

  const t = translations[lang] || translations.en;

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleOpenAiModal = (initialPrompt = '', persona = 'student') => {
    setAiInitialPrompt(initialPrompt);
    setAiActivePersona(persona);
    setIsAiModalOpen(true);
  };

  const handleOpenVoiceOverlay = () => {
    setIsVoiceOverlayOpen(true);
  };

  const handleFindCareer = (rolePreset = '') => {
    if (rolePreset === 'student') {
      setCurrentView('student');
      return;
    }
    if (rolePreset === 'reskill') {
      setCurrentView('restart');
      return;
    }
    if (rolePreset === 'admin') {
      setCurrentView('admin');
      return;
    }
    setPathwayRolePreset(rolePreset);
    setIsPathwayOpen(true);
  };

  const handleSearchSubmit = (query) => {
    setExternalFilter(query);
    const element = document.getElementById('trending-careers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (role) => {
    if (role === 'student') {
      setCurrentView('student');
    } else if (role === 'candidate') {
      setCurrentView('dashboard');
    } else if (role === 'admin') {
      setCurrentView('admin');
    }
  };

  return (
    <div className={`app-wrapper ${lang === 'mr' || lang === 'hi' ? 'devanagari-text' : ''}`}>
      {/* Global Header (Only displayed in public views, Admin has its own integrated header) */}
      {currentView !== 'admin' && (
        <Header 
          lang={lang}
          setLang={setLang}
          t={t}
          onOpenAuth={handleOpenAuth}
          onOpenAssistant={() => handleOpenAiModal('', currentView === 'student' ? 'student' : (currentView === 'dashboard' ? 'seeker' : 'student'))}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          currentView={currentView}
          setCurrentView={setCurrentView}
          publicSubView={publicSubView}
          setPublicSubView={setPublicSubView}
        />
      )}

      {/* ================= 2. STUDENT PORTAL ================= */}
      {currentView === 'student' ? (
        <main id="main-content">
          <StudentDashboard 
            onBackToHome={() => { setCurrentView('home'); setPublicSubView('home'); }}
            onOpenAssistant={(prompt) => handleOpenAiModal(prompt || 'What career suits me?', 'student')}
            lang={lang}
            setLang={setLang}
            t={t}
          />
        </main>
      ) : currentView === 'dashboard' ? (
        /* ================= 3. JOB SEEKER PORTAL ================= */
        <main id="main-content">
          <JobSeekerDashboard 
            onBackToHome={() => { setCurrentView('home'); setPublicSubView('home'); }}
            onOpenAssistant={(prompt) => handleOpenAiModal(prompt || 'Find jobs matching my skills', 'seeker')}
            lang={lang}
            setLang={setLang}
            t={t}
          />
        </main>
      ) : currentView === 'restart' ? (
        /* ================= 4. CAREER RESTART PORTAL ================= */
        <main id="main-content">
          <CareerRestartDashboard 
            onBackToHome={() => { setCurrentView('home'); setPublicSubView('home'); }}
            onOpenAssistant={(prompt) => handleOpenAiModal(prompt || 'What careers can I transition into?', 'restart')}
            lang={lang}
            setLang={setLang}
            t={t}
          />
        </main>
      ) : currentView === 'admin' ? (
        /* ================= 5. GOVERNMENT ADMIN PORTAL ================= */
        <main id="main-content">
          <AdminDashboard 
            onBackToHome={() => { setCurrentView('home'); setPublicSubView('home'); }}
            lang={lang}
            setLang={setLang}
            t={t}
          />
        </main>
      ) : (
        /* ================= 1. PUBLIC WEBSITE ================= */
        <main id="main-content">
          {publicSubView === 'courses' ? (
            /* Dedicated Public Courses Explorer */
            <PublicCoursesView 
              onAskAI={(prompt) => handleOpenAiModal(prompt, 'student')}
              lang={lang}
              setLang={setLang}
              t={t}
            />
          ) : publicSubView === 'jobs' ? (
            /* Dedicated Public Jobs Explorer */
            <PublicJobsView 
              onAskAI={(prompt) => handleOpenAiModal(prompt, 'seeker')}
              lang={lang}
              setLang={setLang}
              t={t}
            />
          ) : (
            /* Complete Main Platform Landing Page */
            <>
              {/* Hero Section */}
              <Hero 
                t={t}
                lang={lang}
                onFindCareer={() => handleFindCareer()}
                onAskAI={() => handleOpenAiModal('What career suits me?', 'student')}
                onOpenVoice={handleOpenVoiceOverlay}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearchSubmit={handleSearchSubmit}
              />

              {/* Four Entry Cards */}
              <RoleEntryCards 
                t={t}
                onFindCareer={handleFindCareer}
                onOpenAuth={handleOpenAuth}
                onOpenStudentDashboard={() => setCurrentView('student')}
                onOpenJobSeekerDashboard={() => setCurrentView('dashboard')}
                onOpenCareerRestartDashboard={() => setCurrentView('restart')}
                onOpenAdminDashboard={() => setCurrentView('admin')}
              />

              {/* Homepage Section 1: Maharashtra Skill Demand */}
              <SkillDemandMap 
                t={t}
                lang={lang}
              />

              {/* Homepage Section 2: Trending Careers */}
              <TrendingCareers 
                t={t}
                lang={lang}
                onAskAI={(prompt) => handleOpenAiModal(prompt, 'student')}
                externalFilter={externalFilter}
              />

              {/* Homepage Section 3: Emerging Skills */}
              <EmergingSkills 
                t={t}
                lang={lang}
                onAskAI={(prompt) => handleOpenAiModal(prompt, 'student')}
              />

              {/* Homepage Section 4: How MahaSkill Connect Works */}
              <HowItWorks 
                t={t}
                lang={lang}
              />

              {/* Homepage Section 5: Career Success Stories */}
              <SuccessStories 
                t={t}
                lang={lang}
              />
            </>
          )}
        </main>
      )}

      {/* Global Government Footer (Public views only) */}
      {currentView !== 'admin' && (
        <Footer 
          t={t}
          lang={lang}
        />
      )}

      {/* Sleek, Compact Floating "Ask MahaSkill Connect" Button */}
      <button 
        type="button"
        className="ai-floating-trigger"
        onClick={() => handleOpenAiModal('', currentView === 'student' ? 'student' : (currentView === 'dashboard' ? 'seeker' : (currentView === 'restart' ? 'restart' : (currentView === 'admin' ? 'admin' : 'student'))))}
        aria-label={t.askMahaSkillAI || "Ask MahaSkill Connect"}
        title={t.askMahaSkillAI || "Ask MahaSkill Connect"}
      >
        <div className="ai-trigger-icon-badge">
          <Bot size={15} />
          <span className="ai-live-beacon" aria-hidden="true"></span>
        </div>
        <div className="ai-trigger-text-group">
          <span className="ai-trigger-main">{t.askMahaSkillAI || 'Ask MahaSkill Connect'}</span>
        </div>
        <Sparkles size={12} className="ai-trigger-sparkle" aria-hidden="true" />
      </button>

      {/* Phase 5: Large Conversational Unified AI Modal */}
      <UnifiedAiModal 
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        lang={lang}
        setLang={setLang}
        t={t}
        initialPrompt={aiInitialPrompt}
        initialPersona={aiActivePersona}
      />

      {/* Phase 5: Voice Interaction Overlay with Waveform Animation */}
      <VoiceInteractionOverlay 
        isOpen={isVoiceOverlayOpen}
        onClose={() => setIsVoiceOverlayOpen(false)}
        lang={lang}
        setLang={setLang}
        onQuerySubmit={(transcript) => handleOpenAiModal(transcript, 'student')}
      />

      {/* Phase 5: Mobile Bottom Navigation */}
      <MobileBottomNav 
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenAi={() => handleOpenAiModal('', 'student')}
        onOpenAuth={() => handleOpenAuth('login')}
        lang={lang}
        t={t}
      />

      {/* Multi-Role Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        mode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        t={t}
      />

      {/* Career Pathway Wizard Modal */}
      <CareerPathwayModal 
        isOpen={isPathwayOpen}
        onClose={() => setIsPathwayOpen(false)}
        onAskAI={(prompt) => handleOpenAiModal(prompt, 'student')}
        lang={lang}
        t={t}
        rolePreset={pathwayRolePreset}
      />
    </div>
  );
}
