import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { AdminKpiCards } from './AdminKpiCards';
import { AdminMapSection } from './AdminMapSection';
import { CourseHealthTable } from './CourseHealthTable';
import { CurriculumGapDetector } from './CurriculumGapDetector';
import { TrainingCapacityView } from './TrainingCapacityView';
import { TrainerReadinessView } from './TrainerReadinessView';
import { EmployerSignalsView } from './EmployerSignalsView';
import { EmergingSkillsRadar } from './EmergingSkillsRadar';
import { PlacementFunnelView } from './PlacementFunnelView';
import { AiGovCopilot } from './AiGovCopilot';
import { PanelLeftOpen } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export function AdminDashboard({ onBackToHome, lang, setLang, t }) {
  const [activeNav, setActiveNav] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 992;
    }
    return true;
  });
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedPeriod, setSelectedPeriod] = useState('Last 12 Months (FY 2025-26)');
  const [selectedDataType, setSelectedDataType] = useState('All Metrics (Jobs/Skills/Courses/Placements)');
  const [copilotInitialQuery, setCopilotInitialQuery] = useState('');

  // Result of the last "Recommend Curriculum Update" call, keyed by gap id
  const [curriculumMemoState, setCurriculumMemoState] = useState({});

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleExportStateReport = () => {
    alert(lang === 'mr' 
      ? "अधिकृत कार्यकारी अहवाल (PDF)\n\nशीर्षक: महाराष्ट्र श्रम बाजार व कौशल्य क्षमता अहवाल (FY २०२६-२७)\nस्थिती: राज्य सरकारच्या प्रमाणित आकडेवारीसह तयार.\nअहवाल डाऊनलोड होत आहे..."
      : (lang === 'hi' 
        ? "आधिकारिक कार्यकारी रिपोर्ट (PDF)\n\nशीर्षक: महाराष्ट्र श्रम बाजार एवं कौशल क्षमता ब्रीफिंग (वित्त वर्ष २०२६-२७)\nस्थिति: राज्य सरकार के सत्यापित आंकड़ों सहित तैयार।\nरिपोर्ट डाउनलोड हो रही है..."
        : "Official Executive Report (PDF)\n\nTitle: Maharashtra Labour Market & Skill Capacity Briefing (FY 2026-27)\nStatus: Generated with verified state data citations.\nDownloading report to your local system..."));
  };

  const handleGeneratePlanForDistrict = (districtName) => {
    const query = lang === 'mr' 
      ? `${districtName} जिल्ह्यासाठी कौशल्य विकास आराखडा तयार करा`
      : (lang === 'hi'
        ? `${districtName} जिले के लिए कौशल विकास योजना तैयार करें`
        : `Generate a district skill plan for ${districtName}`);
    setCopilotInitialQuery(query);
    setActiveNav('ai-copilot');
  };

  const handleRecommendCurriculumUpdate = async (gapItem) => {
    const gapId = gapItem.id;
    setCurriculumMemoState((prev) => ({ ...prev, [gapId]: { status: 'loading' } }));

    try {
      const res = await fetch(`${API_BASE}/admin/curriculum-gaps/${gapId}/recommend-update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ note: `Triggered from admin dashboard (${lang})` }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.success) {
        const errMessage = json?.message || `Request failed (${res.status})`;
        setCurriculumMemoState((prev) => ({
          ...prev,
          [gapId]: { status: 'error', message: errMessage },
        }));
        return;
      }

      setCurriculumMemoState((prev) => ({
        ...prev,
        [gapId]: { status: 'success', message: json.data.message, data: json.data },
      }));
    } catch (err) {
      setCurriculumMemoState((prev) => ({
        ...prev,
        [gapId]: {
          status: 'error',
          message: lang === 'mr'
            ? 'सर्व्हरशी संपर्क होऊ शकला नाही. कृपया पुन्हा प्रयत्न करा.'
            : (lang === 'hi'
              ? 'सर्वर से संपर्क नहीं हो सका। कृपया पुनः प्रयास करें।'
              : 'Could not reach the server. Please try again.'),
        },
      }));
    }
  };

  const handleReallocateSeats = (districtName) => {
    alert(lang === 'mr'
      ? `${districtName} साठी जागा मंजुरी प्रस्ताव सुरू करण्यात आला आहे.\nमसुदा वित्त व नियोजन विभागाकडे पाठवला गेला आहे.`
      : (lang === 'hi'
        ? `${districtName} के लिए सीट स्वीकृति प्रस्ताव शुरू किया गया है।\nप्रस्ताव वित्त एवं योजना विभाग को भेज दिया गया है।`
        : `Seat Sanction Request initiated for ${districtName}.\nDraft proposal routed to Finance & Planning Department.`));
  };

  const renderActiveSection = () => {
    switch (activeNav) {
      case 'overview':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* 1. Six Executive KPI Diagnostics Cards */}
            <AdminKpiCards
              lang={lang} 
              t={t}
              selectedDistrict={selectedDistrict}
              selectedIndustry={selectedIndustry}
              selectedPeriod={selectedPeriod}
            />

            {/* 2. Interactive High-Resolution Skill Demand Map & District Intelligence */}
            <AdminMapSection
              lang={lang} 
              t={t}
              selectedDistrict={selectedDistrict}
              onGeneratePlanForDistrict={handleGeneratePlanForDistrict}
            />
          </div>
        );

      case 'skill-demand':
      case 'skill-demand-map':
        return (
          <AdminMapSection
            lang={lang} 
            t={t}
            selectedDistrict={selectedDistrict}
            onGeneratePlanForDistrict={handleGeneratePlanForDistrict}
          />
        );

      case 'course-health':
        return (
          <CourseHealthTable 
            lang={lang} 
            t={t} 
            selectedDistrict={selectedDistrict} 
          />
        );

      case 'curriculum-alignment':
        return (
          <CurriculumGapDetector
            lang={lang} 
            t={t}
            memoState={curriculumMemoState}
            onRecommendUpdate={handleRecommendCurriculumUpdate}
          />
        );

      case 'training-capacity':
        return (
          <TrainingCapacityView
            lang={lang} 
            t={t}
            selectedDistrict={selectedDistrict}
            onReallocateSeats={handleReallocateSeats}
          />
        );

      case 'trainer-readiness':
        return (
          <TrainerReadinessView
            lang={lang}
            t={t}
            selectedDistrict={selectedDistrict}
          />
        );

      case 'placement-analytics':
        return (
          <PlacementFunnelView 
            lang={lang} 
            t={t} 
            selectedDistrict={selectedDistrict} 
          />
        );

      case 'employer-feedback':
        return (
          <EmployerSignalsView 
            lang={lang} 
            t={t} 
            selectedDistrict={selectedDistrict} 
          />
        );

      case 'emerging-skills':
      case 'emerging-skills-radar':
        return (
          <EmergingSkillsRadar 
            lang={lang} 
            t={t} 
          />
        );

      case 'ai-copilot':
        return (
          <AiGovCopilot 
            lang={lang} 
            t={t} 
            initialQuery={copilotInitialQuery} 
          />
        );

      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <AdminKpiCards
              lang={lang} 
              t={t}
              selectedDistrict={selectedDistrict}
              selectedIndustry={selectedIndustry}
              selectedPeriod={selectedPeriod}
            />
            <AdminMapSection
              lang={lang} 
              t={t}
              selectedDistrict={selectedDistrict}
              onGeneratePlanForDistrict={handleGeneratePlanForDistrict}
            />
          </div>
        );
    }
  };
  
  return (
    <div className={`admin-layout-wrapper ${!isSidebarOpen ? 'fullscreen-mode' : ''}`}>
      {/* Mobile Drawer Backdrop */}
      {isSidebarOpen && (
        <div 
          className="admin-sidebar-mobile-backdrop"
          onClick={toggleSidebar}
          aria-label="Close sidebar backdrop"
        />
      )}

      {/* Left Navigation Sidebar */}
      <AdminSidebar 
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        lang={lang}
        setLang={setLang}
        t={t}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className="admin-main-container">
        {/* Header & Filter Toolbar */}
        <AdminHeader 
          onBackToHome={onBackToHome}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          selectedDataType={selectedDataType}
          setSelectedDataType={setSelectedDataType}
          onExportReport={handleExportStateReport}
          lang={lang}
          setLang={setLang}
          t={t}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />

        {/* Dashboard Body Content */}
        <div className="admin-body-content">
          {renderActiveSection()}
        </div>
      </div>

      {/* Floating Reopen Button when Sidebar is Collapsed */}
      {!isSidebarOpen && (
        <button
          type="button"
          className="floating-sidebar-reopen-btn"
          onClick={toggleSidebar}
          title={lang === 'mr' ? 'साइडबार दाखवा' : (lang === 'hi' ? 'साइडबार दिखाएं' : 'Show Navigation Sidebar')}
          aria-label="Show Navigation Sidebar"
        >
          <PanelLeftOpen size={16} />
          <span>{lang === 'mr' ? 'मेन्यू / साइडबार' : (lang === 'hi' ? 'मेनू / साइडबार' : 'Navigation Menu')}</span>
        </button>
      )}
    </div>
  );
}