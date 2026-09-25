import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { AdminKpiCards } from './AdminKpiCards';
import { AdminMapSection } from './AdminMapSection';
import { CourseHealthTable } from './CourseHealthTable';
import { CurriculumGapDetector } from './CurriculumGapDetector';
import { TrainingCapacityView } from './TrainingCapacityView';
import { EmployerSignalsView } from './EmployerSignalsView';
import { EmergingSkillsRadar } from './EmergingSkillsRadar';
import { PlacementFunnelView } from './PlacementFunnelView';
import { AiGovCopilot } from './AiGovCopilot';
import { PanelLeftOpen } from 'lucide-react';

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
    const el = document.getElementById('admin-sec-ai-copilot');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRecommendCurriculumUpdate = (gapItem) => {
    alert(lang === 'mr'
      ? `${gapItem.occupation} साठी अधिकृत DVET मंडळ ठराव तयार केला गेला आहे.\n\nआवश्यक कौशल्ये: ${gapItem.missingCompetencies.join(', ')}.\nपुढील राज्य तांत्रिक परिषद बैठकीसाठी मसुदा पाठवला आहे.`
      : (lang === 'hi'
        ? `${gapItem.occupation} के लिए आधिकारिक DVET बोर्ड संकल्प तैयार किया गया है।\n\nआवश्यक क्षमताएं: ${gapItem.missingCompetencies.join(', ')}।\nअगली राज्य तकनीकी परिषद बैठक के लिए प्रस्ताव कतारबद्ध है।`
        : `Official DVET Board Resolution Generated for ${gapItem.occupation}.\n\nMissing competencies: ${gapItem.missingCompetencies.join(', ')}.\nMemo queued for next State Technical Council meeting.`));
  };

  const handleReallocateSeats = (districtName) => {
    alert(lang === 'mr'
      ? `${districtName} साठी जागा मंजुरी प्रस्ताव सुरू करण्यात आला आहे.\nमसुदा वित्त व नियोजन विभागाकडे पाठवला गेला आहे.`
      : (lang === 'hi'
        ? `${districtName} के लिए सीट स्वीकृति प्रस्ताव शुरू किया गया है।\nप्रस्ताव वित्त एवं योजना विभाग को भेज दिया गया है।`
        : `Seat Sanction Request initiated for ${districtName}.\nDraft proposal routed to Finance & Planning Department.`));
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

        {/* Dashboard Body */}
        <div className="admin-body-content">
          {/* 6 Main KPI Cards */}
          <AdminKpiCards 
            lang={lang}
            t={t}
          />

          {/* Large Interactive Skill Demand Map & District Intelligence */}
          <AdminMapSection 
            onGeneratePlanForDistrict={handleGeneratePlanForDistrict}
            lang={lang}
            t={t}
          />

          {/* Course Health Monitor Diagnostic Table */}
          <CourseHealthTable 
            onSelectCourseForAudit={(course) => alert(`Inspecting audit records for ${course.name}. Annual enrollment: ${course.annualEnrollment}. Placement: ${course.placementRate}.`)}
            lang={lang}
            t={t}
          />

          {/* Curriculum Gap Detector */}
          <CurriculumGapDetector 
            onRecommendUpdate={handleRecommendCurriculumUpdate}
            lang={lang}
            t={t}
          />

          {/* Training Capacity & Seat Gap View */}
          <TrainingCapacityView 
            onReallocateSeats={handleReallocateSeats}
            lang={lang}
            t={t}
          />

          {/* Employer Signals & Survey Telemetry */}
          <EmployerSignalsView 
            lang={lang}
            t={t}
          />

          {/* Emerging Skills Radar */}
          <EmergingSkillsRadar 
            lang={lang}
            t={t}
          />

          {/* Placement Analytics & Drop-off Funnel */}
          <PlacementFunnelView 
            lang={lang}
            t={t}
          />

          {/* AI Government Policy Copilot */}
          <AiGovCopilot 
            initialQuery={copilotInitialQuery}
            onExportStateReport={handleExportStateReport}
            lang={lang}
            t={t}
          />
        </div>
      </div>

      {/* Floating Reopen Button when Sidebar is Collapsed / Full Screen Mode */}
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
