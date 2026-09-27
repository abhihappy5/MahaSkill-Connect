import React, { useState, useMemo } from 'react';
import { Sparkles, MapPin, BookOpen, ArrowRight } from 'lucide-react';
import { trendingCareersData } from '../data/careersData';

// This component was imported and rendered in App.jsx's homepage
// ("Homepage Section 2: Trending Careers") but never actually existed as a file —
// that's what was breaking the Vite build. Built to match the existing
// .trending-careers-section / .career-card CSS already defined in components.css.
//
// Only fields already confirmed in use elsewhere (StudentDashboard.jsx's Career
// Explorer tab) are relied on directly: id, sector(+Mr/Hi), title(+Mr/Hi),
// description(+Mr/Hi), demandGrowth, salaryRange, topDistricts.
// Anything not yet confirmed (e.g. a skills list, a courses count) is read
// defensively with `|| []` / `|| null` so a missing field can't crash the page —
// if your data file does have those fields under different names, tell me and
// I'll wire them in properly instead of guessing.
export function TrendingCareers({ t, lang, onAskAI, externalFilter }) {
  const [activeSector, setActiveSector] = useState('all');

  const sectors = useMemo(() => {
    const unique = Array.from(
      new Set(trendingCareersData.map((c) => c.sector).filter(Boolean))
    );
    return unique;
  }, []);

  const localizedSector = (career) =>
    lang === 'mr' ? career.sectorMr || career.sector : (lang === 'hi' ? career.sectorHi || career.sector : career.sector);
  const localizedTitle = (career) =>
    lang === 'mr' ? career.titleMr || career.title : (lang === 'hi' ? career.titleHi || career.title : career.title);
  const localizedDescription = (career) =>
    lang === 'mr' ? career.descriptionMr || career.description : (lang === 'hi' ? career.descriptionHi || career.description : career.description);

  const filteredCareers = useMemo(() => {
    let list = trendingCareersData;

    if (activeSector !== 'all') {
      list = list.filter((c) => c.sector === activeSector);
    }

    if (externalFilter && externalFilter.trim()) {
      const q = externalFilter.trim().toLowerCase();
      list = list.filter((c) =>
        (c.title || '').toLowerCase().includes(q) ||
        (c.sector || '').toLowerCase().includes(q) ||
        (c.description || '').toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeSector, externalFilter]);

  return (
    <section id="trending-careers" className="trending-careers-section">
      <div className="container-wide">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '8px' }}>
            {t?.trendingCareersTitle || (lang === 'mr' ? 'ट्रेंडिंग करिअर्स' : (lang === 'hi' ? 'ट्रेंडिंग करियर' : 'Trending Careers'))}
          </h2>
          <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
            {t?.trendingCareersSubtitle || (lang === 'mr'
              ? 'महाराष्ट्रातील वाढत्या मागणी असलेल्या करिअर संधी शोधा'
              : (lang === 'hi'
                ? 'महाराष्ट्र में बढ़ती मांग वाले करियर अवसर खोजें'
                : 'Explore high-growth career opportunities across Maharashtra'))}
          </div>
        </div>

        {/* Sector Filter Pills */}
        {sectors.length > 0 && (
          <div className="sector-filters-bar">
            <button
              type="button"
              className={`sector-filter-btn ${activeSector === 'all' ? 'active' : ''}`}
              onClick={() => setActiveSector('all')}
            >
              {t?.allSectorsLbl || (lang === 'mr' ? 'सर्व क्षेत्रे' : (lang === 'hi' ? 'सभी क्षेत्र' : 'All Sectors'))}
            </button>
            {sectors.map((sector) => (
              <button
                key={sector}
                type="button"
                className={`sector-filter-btn ${activeSector === sector ? 'active' : ''}`}
                onClick={() => setActiveSector(sector)}
              >
                {sector}
              </button>
            ))}
          </div>
        )}

        {/* Career Cards Grid */}
        {filteredCareers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            {t?.noCareersFoundLbl || (lang === 'mr' ? 'कोणतेही करिअर सापडले नाहीत.' : (lang === 'hi' ? 'कोई करियर नहीं मिला।' : 'No careers found for this filter.'))}
          </div>
        ) : (
          <div className="careers-cards-grid">
            {filteredCareers.map((career) => (
              <div key={career.id} className="career-card">
                <div>
                  <div className="career-card-header">
                    <span className="career-sector-tag">{localizedSector(career)}</span>
                    {career.demandGrowth && (
                      <span className="metric-value growth">{career.demandGrowth}</span>
                    )}
                  </div>

                  <h3 className="career-title">{localizedTitle(career)}</h3>
                  <p className="career-description">{localizedDescription(career)}</p>

                  {(career.salaryRange || (career.topDistricts && career.topDistricts.length > 0)) && (
                    <div className="career-stats-row">
                      {career.salaryRange && (
                        <div className="stat-metric-block">
                          <span className="metric-label">{t?.salaryScaleLbl || 'Salary Scale'}</span>
                          <span className="metric-value">{career.salaryRange}</span>
                        </div>
                      )}
                      {career.topDistricts && career.topDistricts.length > 0 && (
                        <div className="stat-metric-block">
                          <span className="metric-label">{t?.topHubsLbl || 'Top Hubs'}</span>
                          <span className="metric-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={13} />
                            {career.topDistricts.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {Array.isArray(career.requiredSkills) && career.requiredSkills.length > 0 && (
                    <div className="skills-tags-wrap">
                      {career.requiredSkills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="skill-tag-pill">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="career-card-footer">
                  {career.coursesCount != null ? (
                    <span className="courses-count-info">
                      <BookOpen size={14} />
                      {career.coursesCount} {t?.coursesAvailableLbl || (lang === 'mr' ? 'कोर्सेस' : (lang === 'hi' ? 'कोर्स' : 'Courses'))}
                    </span>
                  ) : <span />}

                  <button
                    type="button"
                    className="btn btn-outline-saffron btn-sm"
                    onClick={() => onAskAI && onAskAI(
                      lang === 'mr'
                        ? `${localizedTitle(career)} बद्दल अधिक सांगा`
                        : (lang === 'hi' ? `${localizedTitle(career)} के बारे में और बताएं` : `Tell me more about ${localizedTitle(career)}`)
                    )}
                  >
                    <Sparkles size={14} />
                    {t?.askAiBtn || (lang === 'mr' ? 'एआयला विचारा' : (lang === 'hi' ? 'एआई से पूछें' : 'Ask AI'))}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}