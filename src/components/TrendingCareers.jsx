import React, { useState } from 'react';
import { 
  TrendingUp, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  Layers,
  Search
} from 'lucide-react';
import { trendingCareersData } from '../data/careersData';
import { CareerDetailsModal } from './CareerDetailsModal';

export function TrendingCareers({ t, lang, onAskAI, externalFilter }) {
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedCareer, setSelectedCareer] = useState(null);

  const sectors = [
    { key: 'all', label: t.allSectors },
    { key: 'it', label: t.filterIT },
    { key: 'auto', label: t.filterAuto },
    { key: 'green', label: t.filterGreen },
    { key: 'mfg', label: t.filterMfg },
    { key: 'health', label: t.filterHealth }
  ];

  // Filter careers based on selected sector and optional search keyword
  const filteredCareers = trendingCareersData.filter((career) => {
    const matchesSector = selectedSector === 'all' || career.sectorKey === selectedSector;
    const matchesExternal = !externalFilter || 
      career.title.toLowerCase().includes(externalFilter.toLowerCase()) ||
      career.requiredSkills.some(s => s.toLowerCase().includes(externalFilter.toLowerCase())) ||
      career.sector.toLowerCase().includes(externalFilter.toLowerCase());
    return matchesSector && matchesExternal;
  });

  return (
    <section id="trending-careers" class="trending-careers-section" aria-label="Trending Careers">
      <div class="container">
        {/* Section Header */}
        <div class="section-header">
          <span class="section-tag">
            <TrendingUp size={14} />
            {t.trendingTag}
          </span>
          <h2 class="section-title">{t.trendingTitle}</h2>
          <p class="section-subtitle">{t.trendingSubtitle}</p>
        </div>

        {/* Sector Filter Buttons */}
        <div class="sector-filters-bar" role="tablist" aria-label="Filter careers by sector">
          {sectors.map((sec) => (
            <button
              key={sec.key}
              type="button"
              class={`sector-filter-btn ${selectedSector === sec.key ? 'active' : ''}`}
              onClick={() => setSelectedSector(sec.key)}
              role="tab"
              aria-selected={selectedSector === sec.key}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Careers Cards Grid */}
        <div class="careers-cards-grid">
          {filteredCareers.map((career) => (
            <div key={career.id} class="career-card">
              <div>
                {/* Header with Sector & Demand Level */}
                <div class="career-card-header">
                  <span class="career-sector-tag">
                    {lang === 'mr' && career.sectorMr ? career.sectorMr : (lang === 'hi' && career.sectorHi ? career.sectorHi : career.sector)}
                  </span>
                  <span className={`badge ${career.demandLevel.includes('Critical') ? 'badge-amber' : 'badge-green'}`}>
                    {lang === 'mr' && career.demandLevelMr ? career.demandLevelMr : (lang === 'hi' && career.demandLevelHi ? career.demandLevelHi : career.demandLevel)}
                  </span>
                </div>

                {/* Occupation Title */}
                <h3 class="career-title">
                  {lang === 'mr' && career.titleMr ? career.titleMr : (lang === 'hi' && career.titleHi ? career.titleHi : career.title)}
                </h3>

                {/* Short Description */}
                <p class="career-description">
                  {lang === 'mr' && career.descriptionMr ? career.descriptionMr : (lang === 'hi' && career.descriptionHi ? career.descriptionHi : career.description)}
                </p>

                {/* Growth & Salary Stats */}
                <div class="career-stats-row">
                  <div class="stat-metric-block">
                    <span class="metric-label">{t.growthLabel}</span>
                    <span class="metric-value growth">{career.growth}</span>
                  </div>
                  <div class="stat-metric-block">
                    <span class="metric-label">{t.salaryLabel}</span>
                    <span class="metric-value">{career.avgSalary}</span>
                  </div>
                </div>

                {/* Required Skills Badges */}
                <div class="skills-tags-wrap">
                  {career.requiredSkills.slice(0, 3).map((sk, idx) => (
                    <span key={idx} class="skill-tag-pill">
                      {sk}
                    </span>
                  ))}
                  {career.requiredSkills.length > 3 && (
                    <span class="skill-tag-pill" style={{ background: '#e2e8f0' }}>
                      +{career.requiredSkills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Action */}
              <div class="career-card-footer">
                <span class="courses-count-info">
                  <GraduationCap size={15} style={{ color: 'var(--saffron-primary)' }} />
                  {career.availableCourses} {t.coursesAvailable}
                </span>

                <button 
                  class="btn btn-outline-saffron btn-sm"
                  onClick={() => setSelectedCareer(career)}
                  aria-label={`Explore pathway for ${career.title}`}
                >
                  {t.viewRoadmap}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCareers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', background: '#ffffff', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '12px' }}>
              No careers match your search criteria. Try clearing filters or searching for "AI", "EV", "CNC", or "Solar".
            </p>
            <button class="btn btn-outline" onClick={() => setSelectedSector('all')}>
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Career Details Modal */}
      {selectedCareer && (
        <CareerDetailsModal 
          career={selectedCareer} 
          onClose={() => setSelectedCareer(null)} 
          onAskAI={onAskAI}
          lang={lang}
          t={t}
        />
      )}
    </section>
  );
}
