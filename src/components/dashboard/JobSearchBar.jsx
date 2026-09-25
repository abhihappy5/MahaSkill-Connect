import React from 'react';
import { Search, MapPin, Filter, RotateCcw, Briefcase } from 'lucide-react';
import { allDistrictsList } from '../../data/districtsData';

export function JobSearchBar({ 
  lang,
  searchQuery, 
  setSearchQuery,
  locationFilter,
  setLocationFilter,
  salaryFilter,
  setSalaryFilter,
  expFilter,
  setExpFilter,
  industryFilter,
  setIndustryFilter,
  skillFilter,
  setSkillFilter,
  workTypeFilter,
  setWorkTypeFilter,
  onSearchSubmit,
  onResetFilters
}) {
  const industries = [
    lang === 'mr' ? "सर्व उद्योग" : (lang === 'hi' ? "सभी उद्योग" : "All Industries"),
    "EV & Automotive",
    "Advanced Manufacturing",
    "Renewable & Green Energy",
    "IT & AI",
    "Healthcare & MedTech"
  ];

  const salaries = [
    lang === 'mr' ? "सर्व वेतन श्रेणी" : (lang === 'hi' ? "सभी वेतन" : "All Salaries"),
    "₹3.0L - ₹5.0L LPA",
    "₹5.0L - ₹8.0L LPA",
    "₹8.0L - ₹12.0L LPA",
    "₹12.0L+ LPA"
  ];

  const experiences = [
    lang === 'mr' ? "सर्व अनुभव" : (lang === 'hi' ? "सभी अनुभव" : "All Experience"),
    lang === 'mr' ? "नवीन / फ्रेशर (०-१ वर्ष)" : "Fresher / Entry (0-1 Yrs)",
    "1 - 3 Years",
    "3 - 5 Years",
    "5+ Years"
  ];

  const skillsList = [
    lang === 'mr' ? "सर्व कौशल्ये" : (lang === 'hi' ? "सभी कौशल" : "All Skills"),
    "PLC Programming",
    "BMS Diagnostics",
    "CAN Bus Protocol",
    "SCADA",
    "High Voltage Safety",
    "AutoCAD Electrical",
    "Python",
    "CNC"
  ];

  const workTypes = [
    lang === 'mr' ? "सर्व कामाचे प्रकार" : (lang === 'hi' ? "सभी कार्य प्रकार" : "All Work Types"),
    lang === 'mr' ? "पूर्ण वेळ (ऑन-साइट)" : "Full-Time (On-site)",
    "Hybrid",
    lang === 'mr' ? "शिकाऊ उमेदवारी (NAPS)" : "Apprenticeship (NAPS)",
    "Remote"
  ];

  return (
    <div className="job-search-card" id="section-find-jobs" role="search" aria-label="Job Search Engine">
      <h2 className="search-bar-headline">
        <Search size={20} style={{ color: 'var(--saffron-primary)' }} />
        {lang === 'mr' ? 'तुम्ही कोणती नोकरी शोधत आहात?' : (lang === 'hi' ? 'आप कौन सी नौकरी खोज रहे हैं?' : 'What job are you looking for?')}
      </h2>

      {/* Main Search Query Box */}
      <div className="dash-search-input-wrap">
        <Search size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input 
          type="text"
          className="dash-search-input"
          placeholder={lang === 'mr' ? "नोकरी शीर्षक, कंपनी किंवा कौशल्य शोधा (उदा. ईव्ही, पीएलसी, स्काडा)..." : (lang === 'hi' ? "पद, कंपनी या कौशल्य खोजें (जैसे EV, PLC, SCADA)..." : "Search by job title, company name, skill keywords (e.g. EV Powertrain, PLC, SCADA)...")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onSearchSubmit(); }}
        />
        {searchQuery && (
          <button 
            type="button" 
            onClick={() => setSearchQuery('')}
            style={{ border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            {lang === 'mr' ? 'साफ करा' : 'Clear'}
          </button>
        )}
      </div>

      {/* 6 Advanced Filters Grid */}
      <div className="dash-filters-grid">
        {/* 1. Location */}
        <div className="dash-filter-item">
          <label className="filter-lbl">{lang === 'mr' ? 'स्थान / जिल्हा' : (lang === 'hi' ? 'स्थान / जिला' : 'Location / District')}</label>
          <select 
            className="dash-filter-select"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">{lang === 'mr' ? 'संपूर्ण महाराष्ट्र' : 'All Maharashtra'}</option>
            <option value="Pune">Pune (Auto & EV Hub)</option>
            <option value="Mumbai">Mumbai (IT / Fintech)</option>
            <option value="Chhatrapati Sambhaji Nagar">Chhatrapati Sambhaji Nagar</option>
            <option value="Nagpur">Nagpur (MIHAN)</option>
            <option value="Nashik">Nashik (Defense & Auto)</option>
            <option value="Solapur">Solapur (Solar & Textile)</option>
            <option value="Thane">Thane (Manufacturing)</option>
            {allDistrictsList.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* 2. Salary */}
        <div className="dash-filter-item">
          <label className="filter-lbl">{lang === 'mr' ? 'वेतन पॅकेज' : (lang === 'hi' ? 'वेतन पैकेज' : 'Salary Package')}</label>
          <select 
            className="dash-filter-select"
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(e.target.value)}
          >
            {salaries.map((s, idx) => (
              <option key={idx} value={idx === 0 ? "" : s}>{s}</option>
            ))}
          </select>
        </div>

        {/* 3. Experience */}
        <div className="dash-filter-item">
          <label className="filter-lbl">{lang === 'mr' ? 'अनुभव' : (lang === 'hi' ? 'अनुभव' : 'Experience')}</label>
          <select 
            className="dash-filter-select"
            value={expFilter}
            onChange={(e) => setExpFilter(e.target.value)}
          >
            {experiences.map((exp, idx) => (
              <option key={idx} value={idx === 0 ? "" : exp}>{exp}</option>
            ))}
          </select>
        </div>

        {/* 4. Industry */}
        <div className="dash-filter-item">
          <label className="filter-lbl">{lang === 'mr' ? 'उद्योग' : (lang === 'hi' ? 'उद्योग' : 'Industry')}</label>
          <select 
            className="dash-filter-select"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            {industries.map((ind, idx) => (
              <option key={idx} value={idx === 0 ? "" : ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* 5. Skills */}
        <div className="dash-filter-item">
          <label className="filter-lbl">{lang === 'mr' ? 'विशिष्ट कौशल्य' : (lang === 'hi' ? 'विशिष्ट कौशल' : 'Specific Skill')}</label>
          <select 
            className="dash-filter-select"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
          >
            {skillsList.map((sk, idx) => (
              <option key={idx} value={idx === 0 ? "" : sk}>{sk}</option>
            ))}
          </select>
        </div>

        {/* 6. Work Type */}
        <div className="dash-filter-item">
          <label className="filter-lbl">{lang === 'mr' ? 'कामाचे स्वरूप' : (lang === 'hi' ? 'कार्य प्रकार' : 'Work Type')}</label>
          <select 
            className="dash-filter-select"
            value={workTypeFilter}
            onChange={(e) => setWorkTypeFilter(e.target.value)}
          >
            {workTypes.map((wt, idx) => (
              <option key={idx} value={idx === 0 ? "" : wt}>{wt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="search-actions-bar">
        <button 
          type="button" 
          className="btn btn-outline btn-sm"
          onClick={onResetFilters}
        >
          <RotateCcw size={14} />
          {lang === 'mr' ? 'सर्व फिल्टर रीसेट करा' : (lang === 'hi' ? 'सभी फिल्टर रीसेट करें' : 'Reset All Filters')}
        </button>

        <button 
          type="button" 
          className="btn btn-primary btn-lg"
          onClick={onSearchSubmit}
        >
          <Search size={18} />
          {lang === 'mr' ? 'नोकऱ्या शोधा' : (lang === 'hi' ? 'नौकरियां खोजें' : 'Search Jobs')}
        </button>
      </div>
    </div>
  );
}
