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
    { key: 'all', label: t.allSectors || 'All Sectors' },
    { key: 'it', label: t.filterIT || 'IT & AI' },
    { key: 'auto', label: t.filterAuto || 'Automotive & EV' },
    { key: 'green', label: t.filterGreen || 'Green Energy' },
    { key: 'mfg', label: t.filterMfg || 'Manufacturing 4.0' },
    { key: 'health', label: t.filterHealth || 'Healthcare' }
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
    <section id="trending-careers" className="trending-careers-section" aria-label="Trending Careers" style={{ padding: '36px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--saffron-primary)' }}>
            <TrendingUp size={14} />
            {t.trendingTag || 'High Growth Opportunities'}
          </span>
          <h2 className="section-title" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '4px 0 8px 0' }}>
            {t.trendingTitle || 'High-Demand Careers in Maharashtra'}
          </h2>
          <p className="section-subtitle" style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            {t.trendingSubtitle || 'Explore roles experiencing rapid salary growth and statewide employer hiring.'}
          </p>
        </div>

        {/* Sector Filter Buttons */}
        <div className="sector-filters-bar" role="tablist" aria-label="Filter careers by sector" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {sectors.map((sec) => (
            <button
              key={sec.key}
              type="button"
              className={`sector-filter-btn ${selectedSector === sec.key ? 'active' : ''}`}
              onClick={() => setSelectedSector(sec.key)}
              role="tab"
              aria-selected={selectedSector === sec.key}
              style={{
                background: selectedSector === sec.key ? 'var(--navy-deep)' : '#f1f5f9',
                color: selectedSector === sec.key ? '#ffffff' : 'var(--navy-deep)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Careers Cards Grid */}
        <div className="careers-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
          {filteredCareers.map((career) => (
            <div 
              key={career.id} 
              className="career-card"
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                {/* Header with Sector & Demand Level */}
                <div className="career-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="career-sector-tag" style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {lang === 'mr' && career.sectorMr ? career.sectorMr : (lang === 'hi' && career.sectorHi ? career.sectorHi : career.sector)}
                  </span>
                  <span className={`badge ${career.demandLevel.includes('Critical') ? 'badge-amber' : 'badge-green'}`} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                    {lang === 'mr' && career.demandLevelMr ? career.demandLevelMr : (lang === 'hi' && career.demandLevelHi ? career.demandLevelHi : career.demandLevel)}
                  </span>
                </div>

                {/* Occupation Title */}
                <h3 className="career-title" style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '8px', lineHeight: 1.25 }}>
                  {lang === 'mr' && career.titleMr ? career.titleMr : (lang === 'hi' && career.titleHi ? career.titleHi : career.title)}
                </h3>

                {/* Short Description */}
                <p className="career-description" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '14px' }}>
                  {lang === 'mr' && career.descriptionMr ? career.descriptionMr : (lang === 'hi' && career.descriptionHi ? career.descriptionHi : career.description)}
                </p>

                {/* Growth & Salary Stats */}
                <div className="career-stats-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: '#f8fafc', padding: '8px 10px', borderRadius: '8px', marginBottom: '14px' }}>
                  <div className="stat-metric-block">
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.growthLabel || 'YoY Hiring'}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#16a34a' }}>{career.growth}</div>
                  </div>
                  <div className="stat-metric-block">
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.salaryLabel || 'Avg Salary'}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--navy-deep)' }}>{career.avgSalary}</div>
                  </div>
                </div>

                {/* Required Skills Badges */}
                <div className="skills-tags-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
                  {career.requiredSkills.slice(0, 3).map((sk, idx) => (
                    <span key={idx} style={{ fontSize: '0.7rem', fontWeight: 600, color: '#334155', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                      {sk}
                    </span>
                  ))}
                  {career.requiredSkills.length > 3 && (
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>
                      +{career.requiredSkills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="career-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                <span className="courses-count-info" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <GraduationCap size={13} style={{ color: 'var(--saffron-primary)' }} />
                  {career.availableCourses} {t.coursesAvailable || 'Courses'}
                </span>

                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => setSelectedCareer(career)}
                  aria-label={`Explore pathway for ${career.title}`}
                  style={{ padding: '4px 10px', fontSize: '0.76rem', fontWeight: 700 }}
                >
                  <span>{t.viewRoadmap || 'Pathway'}</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCareers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '36px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>
              No careers match your search criteria. Try clearing filters or searching for "AI", "EV", "CNC", or "Solar".
            </p>
            <button className="btn btn-outline" onClick={() => setSelectedSector('all')}>
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
