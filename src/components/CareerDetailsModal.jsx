import React from 'react';
import { 
  X, 
  Sparkles, 
  MapPin, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase 
} from 'lucide-react';

export function CareerDetailsModal({ career, onClose, onAskAI, lang, t }) {
  if (!career) return null;

  const currentTitle = lang === 'mr' && career.titleMr ? career.titleMr : (lang === 'hi' && career.titleHi ? career.titleHi : career.title);
  const currentSector = lang === 'mr' && career.sectorMr ? career.sectorMr : (lang === 'hi' && career.sectorHi ? career.sectorHi : career.sector);
  const currentDemand = lang === 'mr' && career.demandLevelMr ? career.demandLevelMr : (lang === 'hi' && career.demandLevelHi ? career.demandLevelHi : career.demandLevel);
  const currentDescription = lang === 'mr' && career.descriptionMr ? career.descriptionMr : (lang === 'hi' && career.descriptionHi ? career.descriptionHi : career.description);
  const currentPathway = lang === 'mr' && career.careerPathwayMr ? career.careerPathwayMr : (lang === 'hi' && career.careerPathwayHi ? career.careerPathwayHi : career.careerPathway);
  const currentGovtScheme = lang === 'mr' && career.govtSchemeMr ? career.govtSchemeMr : (lang === 'hi' && career.govtSchemeHi ? career.govtSchemeHi : career.govtScheme);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge badge-saffron" style={{ marginBottom: '6px' }}>
              {currentSector} • {currentDemand}
            </span>
            <h2 className="modal-title">
              {currentTitle}
            </h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        <div className="modal-body">
          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            background: 'var(--bg-secondary)',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.growthLabel || 'YoY Growth'}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--success-green)' }}>{career.growth}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.salaryLabel || 'Avg Package'}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy-deep)' }}>{career.avgSalary}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.vacanciesInMH || 'Vacancies in MH'}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--saffron-primary)' }}>{career.openingsMaharashtra.toLocaleString()}+</div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '6px' }}>
              {t.roleOverview || 'Role Overview'}
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{currentDescription}</p>
          </div>

          {/* Career Pathway Steps */}
          <div style={{ marginBottom: '20px', background: '#eff6ff', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid #bfdbfe' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} /> {t.recommendedRoute || 'Recommended Skill & Education Route'}
            </h4>
            <p style={{ fontSize: '0.86rem', color: '#1e40af', lineHeight: 1.5 }}>{currentPathway}</p>
          </div>

          {/* Government Scheme Subsidy */}
          <div style={{ marginBottom: '20px', background: '#f0fdf4', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid #bbf7d0' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#166534', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} /> {t.govtSupport || 'Government Financial Support'}
            </h4>
            <p style={{ fontSize: '0.86rem', color: '#15803d' }}>{currentGovtScheme}</p>
          </div>

          {/* Required Skills Badges */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '10px' }}>
              {t.reqSkillsTitle || 'Required Technical & Core Skills'}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {career.requiredSkills.map((sk, idx) => (
                <span key={idx} className="badge badge-navy">
                  <CheckCircle2 size={12} style={{ color: 'var(--success-green)' }} />
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Top Maharashtra Districts */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '10px' }}>
              {t.keyHiringHubs || 'Key Hiring Districts & Industrial Hubs'}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {career.topDistricts.map((d, idx) => (
                <span key={idx} className="badge badge-saffron">
                  <MapPin size={12} />
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary" 
              style={{ flex: 1 }}
              onClick={() => {
                onClose();
                onAskAI(`Tell me how to start career in ${career.title} in Maharashtra`);
              }}
            >
              <GraduationCap size={16} />
              {t.findCoursesBtn || 'Find Accredited Courses'} ({career.availableCourses})
            </button>
            <button 
              className="btn btn-navy" 
              style={{ flex: 1 }}
              onClick={() => {
                onClose();
                onAskAI(`Show me open jobs and eligibility for ${career.title}`);
              }}
            >
              <Briefcase size={16} />
              {t.applyVacanciesBtn || 'Apply for Vacancies'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
