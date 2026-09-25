import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  MapPin, 
  Building2, 
  Activity, 
  BookOpen, 
  Layers, 
  Users, 
  Wrench, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  FileText, 
  ShieldAlert,
  Bot,
  PanelLeftClose
} from 'lucide-react';

export function AdminSidebar({ activeNav, setActiveNav, lang, setLang, t, isSidebarOpen = true, onToggleSidebar }) {
  const navItems = [
    { key: 'overview', label: t?.adminNavOverview || (lang === 'mr' ? 'विहंगावलोकन' : (lang === 'hi' ? 'अवलोकन' : 'Overview')), icon: LayoutDashboard },
    { key: 'skill-demand', label: t?.adminNavSkillDemand || (lang === 'mr' ? 'कौशल्य मागणी नकाशा' : (lang === 'hi' ? 'कौशल मांग मानचित्र' : 'Skill Demand Map')), icon: TrendingUp },
    { key: 'district-intelligence', label: t?.adminNavDistrictIntel || (lang === 'mr' ? 'जिल्हा बुद्धिमत्ता' : (lang === 'hi' ? 'जिला खुफिया' : 'District Intelligence')), icon: MapPin },
    { key: 'industry-demand', label: t?.adminNavIndustryDemand || (lang === 'mr' ? 'औद्योगिक मागणी' : (lang === 'hi' ? 'उद्योग मांग' : 'Industry Demand')), icon: Building2 },
    { key: 'course-health', label: t?.adminNavCourseHealth || (lang === 'mr' ? 'अभ्यासक्रम आरोग्य मॉनिटर' : (lang === 'hi' ? 'पाठ्यक्रम स्वास्थ्य मॉनिटर' : 'Course Health Monitor')), icon: Activity },
    { key: 'curriculum-alignment', label: t?.adminNavCurriculum || (lang === 'mr' ? 'अभ्यासक्रम संरेखन' : (lang === 'hi' ? 'पाठ्यक्रम संरेखण' : 'Curriculum Alignment')), icon: BookOpen },
    { key: 'training-capacity', label: t?.adminNavTrainingCapacity || (lang === 'mr' ? 'प्रशिक्षण क्षमता' : (lang === 'hi' ? 'प्रशिक्षण क्षमता' : 'Training Capacity')), icon: Layers },
    { key: 'trainer-readiness', label: t?.adminNavTrainerReadiness || (lang === 'mr' ? 'प्रशिक्षक सज्जता' : (lang === 'hi' ? 'प्रशिक्षक तत्परता' : 'Trainer Readiness')), icon: Users },
    { key: 'equipment-readiness', label: t?.adminNavEquipmentReadiness || (lang === 'mr' ? 'उपकरण सज्जता' : (lang === 'hi' ? 'उपकरण तत्परता' : 'Equipment Readiness')), icon: Wrench },
    { key: 'placement-analytics', label: t?.adminNavPlacementAnalytics || (lang === 'mr' ? 'प्लेसमेंट विश्लेषण' : (lang === 'hi' ? 'प्लेसमेंट एनालिटिक्स' : 'Placement Analytics')), icon: CheckCircle2 },
    { key: 'employer-feedback', label: t?.adminNavEmployerFeedback || (lang === 'mr' ? 'नियोक्ता अभिप्राय' : (lang === 'hi' ? 'नियोक्ता प्रतिक्रिया' : 'Employer Feedback')), icon: MessageSquare },
    { key: 'emerging-skills', label: t?.adminNavEmergingSkills || (lang === 'mr' ? 'उदयोन्मुख कौशल्य रडार' : (lang === 'hi' ? 'उभरते कौशल रडार' : 'Emerging Skills Radar')), icon: Sparkles },
    { key: 'reports', label: t?.adminNavReports || (lang === 'mr' ? 'कार्यकारी अहवाल' : (lang === 'hi' ? 'कार्यकारी रिपोर्ट' : 'Executive Reports')), icon: FileText },
    { key: 'policy-planning', label: t?.adminNavPolicyPlanning || (lang === 'mr' ? 'धोरण व वाटप' : (lang === 'hi' ? 'नीति एवं आवंटन' : 'Policy & Allocations')), icon: ShieldAlert }
  ];

  const handleNavClick = (key) => {
    setActiveNav(key);
    const targetEl = document.getElementById(`admin-sec-${key}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className={`admin-sidebar ${isSidebarOpen ? '' : 'collapsed'}`} role="navigation" aria-label="Admin Sidebar Navigation" aria-hidden={!isSidebarOpen}>
      {/* Sidebar Header */}
      <div className="admin-sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="admin-seal-emblem">
            <img 
              src="/maharashtra_seal.svg" 
              alt="Government of Maharashtra Official Seal" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff', lineHeight: 1.1 }}>
              MahaSkill Connect
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
              {t?.govTitle || (lang === 'mr' ? 'महाराष्ट्र शासन' : (lang === 'hi' ? 'महाराष्ट्र सरकार' : 'Government of Maharashtra'))}
            </div>
          </div>
        </div>

        {onToggleSidebar && (
          <button
            type="button"
            className="sidebar-toggle-close-btn"
            onClick={onToggleSidebar}
            title={lang === 'mr' ? 'फुल स्क्रीन: साइडबार लपवा' : (lang === 'hi' ? 'फुल स्क्रीन: साइडबार छिपाएं' : 'Hide Sidebar (Full Screen)')}
            aria-label="Hide Sidebar"
          >
            <PanelLeftClose size={17} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="admin-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.key;
          return (
            <button
              key={item.key}
              type="button"
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item.key)}
              role="tab"
              aria-selected={isActive}
            >
              <Icon size={16} style={{ flexShrink: 0 }} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* AI Government Copilot */}
        <button
          type="button"
          className="sidebar-nav-item special-ai"
          onClick={() => handleNavClick('ai-copilot')}
        >
          <Bot size={16} style={{ color: 'var(--saffron-primary)' }} />
          <span>{t?.adminNavAiCopilot || (lang === 'mr' ? 'एआय धोरण सहाय्यक' : (lang === 'hi' ? 'एआय नीति सहायक' : 'AI Policy Copilot'))}</span>
        </button>
      </div>

      {/* Bottom Status */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.74rem', color: '#94a3b8' }}>
        <div>
          {lang === 'mr' 
            ? <>राज्य डेटा फीड: <strong>सक्रिय (थेट)</strong></> 
            : (lang === 'hi' 
              ? <>राज्य डेटा फीड: <strong>ऑनलाइन (लाइव)</strong></> 
              : <>State Data Feed: <strong>Online (Live)</strong></>)}
        </div>
        <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
          {lang === 'mr' ? 'MSSDS बुद्धिमत्ता इंजिन २.०' : (lang === 'hi' ? 'MSSDS इंटेलिजेंस इंजन २.०' : 'MSSDS Intelligence Engine 2.0')}
        </div>
      </div>
    </aside>
  );
}
