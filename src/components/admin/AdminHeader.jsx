import React from 'react';
import { 
  Building2, 
  Bell, 
  Globe, 
  User, 
  Download, 
  Filter, 
  ArrowLeft,
  ShieldCheck,
  Calendar,
  FileSpreadsheet,
  PanelLeftClose,
  PanelLeftOpen,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { allDistrictsList } from '../../data/districtsData';

export function AdminHeader({ 
  onBackToHome, 
  selectedDistrict, 
  setSelectedDistrict,
  selectedIndustry, 
  setSelectedIndustry,
  selectedPeriod, 
  setSelectedPeriod,
  selectedDataType, 
  setSelectedDataType,
  onExportReport,
  lang,
  setLang,
  t,
  isSidebarOpen = true,
  onToggleSidebar
}) {
  const industries = [
    { value: "All Industries", label: lang === 'mr' ? 'सर्व उद्योग' : (lang === 'hi' ? 'सभी उद्योग' : 'All Industries') },
    { value: "EV & Automotive", label: lang === 'mr' ? 'ईव्ही व ऑटोमोटिव्ह' : (lang === 'hi' ? 'ईवी एवं ऑटोमोटिव' : 'EV & Automotive') },
    { value: "Advanced Manufacturing", label: lang === 'mr' ? 'प्रगत उत्पादन व रोबोटिक्स' : (lang === 'hi' ? 'उन्नत विनिर्माण एवं रोबोटिक्स' : 'Advanced Manufacturing') },
    { value: "Renewable & Green Energy", label: lang === 'mr' ? 'हरित व सौर ऊर्जा' : (lang === 'hi' ? 'हरित एवं सौर ऊर्जा' : 'Renewable & Green Energy') },
    { value: "IT & Cybersecurity", label: lang === 'mr' ? 'आयटी व सायबर सुरक्षा' : (lang === 'hi' ? 'आईटी एवं साइबर सुरक्षा' : 'IT & Cybersecurity') },
    { value: "Healthcare & MedTech", label: lang === 'mr' ? 'आरोग्य व वैद्यकीय तंत्रज्ञान' : (lang === 'hi' ? 'स्वास्थ्य एवं चिकित्सा तकनीक' : 'Healthcare & MedTech') },
    { value: "Logistics & Supply Chain", label: lang === 'mr' ? 'लॉजिस्टिक्स व पुरवठा साखळी' : (lang === 'hi' ? 'लॉजिस्टिक्स एवं आपूर्ति श्रृंखला' : 'Logistics & Supply Chain') }
  ];

  const periods = [
    { value: "Last 12 Months (FY 2025-26)", label: lang === 'mr' ? 'मागील १२ महिने (FY २०२५-२६)' : (lang === 'hi' ? 'पिछले १२ महीने (वित्त वर्ष २०२५-२६)' : 'Last 12 Months (FY 2025-26)') },
    { value: "Current Quarter (Q3 2026)", label: lang === 'mr' ? 'चालू तिमाही (Q3 २०२६)' : (lang === 'hi' ? 'वर्तमान तिमाही (Q3 २०२६)' : 'Current Quarter (Q3 2026)') },
    { value: "Year to Date (YTD 2026)", label: lang === 'mr' ? 'वर्ष ते आजपर्यंत (YTD २०२६)' : (lang === 'hi' ? 'वर्ष से आज तक (YTD २०२६)' : 'Year to Date (YTD 2026)') },
    { value: "3-Year Forecast Horizon", label: lang === 'mr' ? '३-वर्षीय अंदाज' : (lang === 'hi' ? '३-वर्षीय पूर्वानुमान' : '3-Year Forecast Horizon') }
  ];

  const dataTypes = [
    { value: "All Metrics (Jobs/Skills/Courses/Placements)", label: lang === 'mr' ? 'सर्व मेट्रिक्स (नोकऱ्या/कौशल्ये/अभ्यासक्रम/प्लेसमेंट)' : (lang === 'hi' ? 'सभी मेट्रिक्स (नौकरियां/कौशल/पाठ्यक्रम/प्लेसमेंट)' : 'All Metrics (Jobs/Skills/Courses/Placements)') },
    { value: "Employment & Vacancy Demand", label: lang === 'mr' ? 'रोजगार व रिक्त पदे मागणी' : (lang === 'hi' ? 'रोजगार एवं रिक्तियां मांग' : 'Employment & Vacancy Demand') },
    { value: "Curriculum & Course Health", label: lang === 'mr' ? 'अभ्यासक्रम व कोर्स आरोग्य' : (lang === 'hi' ? 'पाठ्यक्रम एवं कोर्स स्वास्थ्य' : 'Curriculum & Course Health') },
    { value: "Training Capacity Deficit", label: lang === 'mr' ? 'प्रशिक्षण क्षमता तफावत' : (lang === 'hi' ? 'प्रशिक्षण क्षमता अंतर' : 'Training Capacity Deficit') },
    { value: "Placement Verification Audit", label: lang === 'mr' ? 'प्लेसमेंट पडताळणी ऑडिट' : (lang === 'hi' ? 'प्लेसमेंट सत्यापन ऑडिट' : 'Placement Verification Audit') }
  ];

  const handleAlertClick = () => {
    alert(lang === 'mr'
      ? "शासकीय राज्य सूचना:\n१. पुणे ईव्ही जागांची तफावत -६५० जागांवर पोहोचली (तातडीने वाटप आवश्यक).\n२. ६ आयटीआय ट्रेड्स ३०% पेक्षा कमी प्लेसमेंटसह ध्वजांकित.\n३. ₹२२.५ कोटी लॅब आधुनिकीकरण अनुदान मंजूर.\n४. नाशिक संरक्षण सेल प्रस्ताव स्वाक्षरीसाठी प्रलंबित."
      : (lang === 'hi'
        ? "सरकारी राज्य अलर्ट:\n१. पुणे ईवी सीट अंतर -६५० सीटों पर पहुंचा (तत्काल आवंटन आवश्यक)।\n२. ६ आईटीआई ट्रेड्स ३०% से कम प्लेसमेंट के साथ चिह्नित।\n३. ₹२२.५ करोड़ लैब आधुनिकीकरण अनुदान स्वीकृत।\n४. नासिक रक्षा सेल प्रस्ताव हस्ताक्षर हेतु लंबित।"
        : "Government State Alerts:\n1. Pune EV seat deficit reached -650 seats (Immediate allocation needed).\n2. 6 ITI trades flagged with <30% placement.\n3. ₹22.5 Cr lab modernization grant approved.\n4. Nashik Defense Cell proposal pending sign-off."));
  };

  return (
    <div className="admin-header-sticky-wrapper">
      {/* Top Header Bar */}
      <header className="admin-top-header" role="banner" aria-label="Government Admin Header">
        {/* Left Side: Sidebar Toggle & Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onToggleSidebar && (
            <button 
              type="button"
              className="btn btn-outline btn-sm admin-sidebar-toggle-btn"
              onClick={onToggleSidebar}
              title={isSidebarOpen 
                ? (lang === 'mr' ? 'फुल स्क्रीन: साइडबार लपवा' : (lang === 'hi' ? 'फुल स्क्रीन: साइडबार छिपाएं' : 'Full Screen: Hide Sidebar')) 
                : (lang === 'mr' ? 'साइडबार दाखवा' : (lang === 'hi' ? 'साइडबार दिखाएं' : 'Show Navigation Sidebar'))}
              aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: !isSidebarOpen ? 'var(--saffron-light)' : 'transparent',
                borderColor: !isSidebarOpen ? 'var(--saffron-border)' : 'var(--border-medium)',
                color: !isSidebarOpen ? 'var(--saffron-primary)' : 'var(--navy-deep)',
                fontWeight: 700
              }}
            >
              {isSidebarOpen ? <PanelLeftClose size={15} /> : <PanelLeftOpen size={15} style={{ color: 'var(--saffron-primary)' }} />}
              <span style={{ fontSize: '0.78rem' }}>
                {isSidebarOpen 
                  ? (lang === 'mr' ? 'फुल स्क्रीन' : (lang === 'hi' ? 'फुल स्क्रीन' : 'Full Screen')) 
                  : (lang === 'mr' ? 'साइडबार उघडा' : (lang === 'hi' ? 'साइडबार खोलें' : 'Show Sidebar'))}
              </span>
            </button>
          )}

          <button 
            type="button" 
            className="btn btn-outline btn-sm"
            onClick={onBackToHome}
            title={lang === 'mr' ? 'सार्वजनिक पोर्टलवर परत जा' : (lang === 'hi' ? 'सार्वजनिक पोर्टल पर वापस जाएं' : 'Return to Public Portal')}
            style={{ padding: '6px 12px' }}
          >
            <ArrowLeft size={14} />
            <span>{t?.adminPublicPortalBtn || (lang === 'mr' ? 'सार्वजनिक पोर्टल' : (lang === 'hi' ? 'सार्वजनिक पोर्टल' : 'Public Portal'))}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-navy" style={{ background: '#0f172a', color: '#ffffff', fontWeight: 800 }}>
              {t?.adminGovtechBadge || (lang === 'mr' ? 'शासकीय प्रशासक' : (lang === 'hi' ? 'शासकीय व्यवस्थापक' : 'GOVTECH ADMIN'))}
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy-deep)' }}>
              {t?.adminCockpitTitle || (lang === 'mr' ? 'महास्किल श्रम बुद्धिमत्ता कॉकपिट' : (lang === 'hi' ? 'महास्किल श्रम खुफिया कॉकपिट' : 'MahaSkill Labour Intelligence Cockpit'))}
            </span>
          </div>
        </div>

        {/* Right Side: Notifications, Language, Officer Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <Globe size={13} style={{ color: 'var(--saffron-primary)' }} />
            {['mr', 'hi', 'en'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                style={{
                  border: 'none',
                  background: lang === code ? 'var(--saffron-primary)' : 'transparent',
                  color: lang === code ? '#ffffff' : 'var(--text-secondary)',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                {code === 'mr' ? 'मराठी' : (code === 'hi' ? 'हिन्दी' : 'EN')}
              </button>
            ))}
          </div>

          {/* Notifications Button */}
          <button 
            type="button" 
            className="btn btn-outline btn-sm"
            style={{ width: '34px', height: '34px', padding: 0, borderRadius: '50%', position: 'relative' }}
            title={lang === 'mr' ? 'शासकीय सूचना (४ कृती बाबी)' : (lang === 'hi' ? 'सरकारी अलर्ट (४ कार्रवाई योग्य वस्तुएं)' : 'Official Alerts (4 Action Items)')}
            onClick={handleAlertClick}
          >
            <Bell size={15} />
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#dc2626'
            }}></span>
          </button>

          {/* Officer Profile */}
          <div className="admin-officer-pill">
            <div className="officer-avatar">
              VP
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--navy-deep)', lineHeight: 1.1 }}>
                {lang === 'mr' ? 'डॉ. विजय पाटील, भा.प्र.से.' : (lang === 'hi' ? 'डॉ. विजय पाटिल, भा.प्र.से.' : 'Dr. Vijay Patil, IAS')}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {lang === 'mr' ? 'सहसचिव, कौशल्य व नाविन्यता विभाग' : (lang === 'hi' ? 'संयुक्त सचिव, कौशल्य एवं नवाचार विभाग' : 'Joint Secretary, Skill & Innovation Dept')}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Top Filter Toolbar */}
      <div className="admin-filter-toolbar" role="region" aria-label="Data Filters">
        <div className="filter-select-group">
          {/* State (Fixed) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', background: '#f8fafc', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <Building2 size={13} style={{ color: 'var(--saffron-primary)' }} />
            {lang === 'mr' ? 'राज्य:' : (lang === 'hi' ? 'राज्य:' : 'State:')} <strong>{lang === 'mr' ? 'महाराष्ट्र' : (lang === 'hi' ? 'महाराष्ट्र' : 'Maharashtra')}</strong>
          </div>

          {/* District Filter */}
          <select 
            className="gov-filter-select"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            aria-label="Filter by District"
          >
            <option value="all">{t?.adminFilterDistrictAll || (lang === 'mr' ? 'जिल्हा: सर्व ३६ जिल्हे' : (lang === 'hi' ? 'जिला: सभी ३६ जिले' : 'District: All 36 Districts'))}</option>
            <option value="pune">{lang === 'mr' ? 'पुणे जिल्हा' : (lang === 'hi' ? 'पुणे जिला' : 'Pune District')}</option>
            <option value="mumbai">{lang === 'mr' ? 'मुंबई व ठाणे' : (lang === 'hi' ? 'मुंबई एवं ठाणे' : 'Mumbai & Thane')}</option>
            <option value="aurangabad">{lang === 'mr' ? 'छत्रपती संभाजीनगर' : (lang === 'hi' ? 'छत्रपति संभाजीनगर' : 'Chhatrapati Sambhaji Nagar')}</option>
            <option value="nagpur">{lang === 'mr' ? 'नागपूर जिल्हा' : (lang === 'hi' ? 'नागपुर जिला' : 'Nagpur District')}</option>
            <option value="nashik">{lang === 'mr' ? 'नाशिक जिल्हा' : (lang === 'hi' ? 'नासिक जिला' : 'Nashik District')}</option>
            <option value="solapur">{lang === 'mr' ? 'सोलापूर जिल्हा' : (lang === 'hi' ? 'सोलापुर जिला' : 'Solapur District')}</option>
            {allDistrictsList.map((d) => (
              <option key={d} value={d.toLowerCase()}>{d} {lang === 'mr' ? 'जिल्हा' : (lang === 'hi' ? 'जिला' : 'District')}</option>
            ))}
          </select>

          {/* Industry Filter */}
          <select 
            className="gov-filter-select"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            aria-label="Filter by Industry"
          >
            {industries.map((ind, idx) => (
              <option key={idx} value={ind.value}>{ind.label}</option>
            ))}
          </select>

          {/* Period Filter */}
          <select 
            className="gov-filter-select"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            aria-label="Filter by Period"
          >
            {periods.map((p, idx) => (
              <option key={idx} value={p.value}>{p.label}</option>
            ))}
          </select>

          {/* Data Filter */}
          <select 
            className="gov-filter-select"
            value={selectedDataType}
            onChange={(e) => setSelectedDataType(e.target.value)}
            aria-label="Filter by Data Type"
          >
            {dataTypes.map((dt, idx) => (
              <option key={idx} value={dt.value}>{dt.label}</option>
            ))}
          </select>
        </div>

        {/* Export Report CTA */}
        <button 
          type="button" 
          className="btn btn-primary btn-sm"
          onClick={onExportReport}
          title={lang === 'mr' ? 'राज्य बुद्धिमत्ता अहवाल निर्यात करा' : (lang === 'hi' ? 'राज्य खुफिया रिपोर्ट निर्यात करें' : 'Export State Intelligence Briefing')}
        >
          <Download size={14} />
          {t?.adminExportReportBtn || (lang === 'mr' ? 'राज्य अहवाल निर्यात करा (PDF)' : (lang === 'hi' ? 'राज्य रिपोर्ट निर्यात करें (PDF)' : 'Export State Report (PDF)'))}
        </button>
      </div>
    </div>
  );
}
