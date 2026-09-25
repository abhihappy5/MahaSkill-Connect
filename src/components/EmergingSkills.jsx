import React, { useState } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Zap, 
  Bot, 
  Cpu, 
  SunMedium, 
  ShieldCheck, 
  Layers, 
  MapPin, 
  Award, 
  Building2, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { emergingSkillsData } from '../data/emergingSkillsData';

export function EmergingSkills({ t, lang, onAskAI }) {
  const [activeSkillId, setActiveSkillId] = useState('ai');

  const iconMap = {
    BrainCircuit: BrainCircuit,
    Zap: Zap,
    Bot: Bot,
    Cpu: Cpu,
    SunMedium: SunMedium,
    ShieldCheck: ShieldCheck,
    Layers: Layers
  };

  const currentSkill = emergingSkillsData.find(s => s.id === activeSkillId) || emergingSkillsData[0];
  const CurrentIcon = iconMap[currentSkill.iconName] || BrainCircuit;

  const currentTitle = lang === 'mr' && currentSkill.titleMr ? currentSkill.titleMr : (lang === 'hi' && currentSkill.titleHi ? currentSkill.titleHi : currentSkill.title);
  const currentGrowth = lang === 'mr' && currentSkill.growthMr ? currentSkill.growthMr : (lang === 'hi' && currentSkill.growthHi ? currentSkill.growthHi : currentSkill.growth);
  const currentVacancies = lang === 'mr' && currentSkill.vacanciesMr ? currentSkill.vacanciesMr : (lang === 'hi' && currentSkill.vacanciesHi ? currentSkill.vacanciesHi : currentSkill.vacancies);
  const currentFocusAreas = lang === 'mr' && currentSkill.keyFocusAreasMr ? currentSkill.keyFocusAreasMr : (lang === 'hi' && currentSkill.keyFocusAreasHi ? currentSkill.keyFocusAreasHi : currentSkill.keyFocusAreas);
  const currentHubs = lang === 'mr' && currentSkill.targetHubsMr ? currentSkill.targetHubsMr : (lang === 'hi' && currentSkill.targetHubsHi ? currentSkill.targetHubsHi : currentSkill.targetHubs);
  const currentStipend = lang === 'mr' && currentSkill.stipendEligibilityMr ? currentSkill.stipendEligibilityMr : (lang === 'hi' && currentSkill.stipendEligibilityHi ? currentSkill.stipendEligibilityHi : currentSkill.stipendEligibility);
  const currentCert = lang === 'mr' && currentSkill.recommendedCertificationMr ? currentSkill.recommendedCertificationMr : (lang === 'hi' && currentSkill.recommendedCertificationHi ? currentSkill.recommendedCertificationHi : currentSkill.recommendedCertification);

  return (
    <section id="emerging-skills" className="emerging-skills-section" aria-label="Emerging Skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} />
            {t.emergingTag}
          </span>
          <h2 className="section-title">{t.emergingTitle}</h2>
          <p className="section-subtitle">{t.emergingSubtitle}</p>
        </div>

        {/* Emerging Skills Interactive Layout */}
        <div className="emerging-skills-layout">
          {/* Left Navigation Buttons */}
          <div className="emerging-skills-nav" role="tablist" aria-label="Emerging Skill Domains">
            {emergingSkillsData.map((skill) => {
              const Icon = iconMap[skill.iconName] || BrainCircuit;
              const isActive = activeSkillId === skill.id;
              const title = lang === 'mr' && skill.titleMr ? skill.titleMr : (lang === 'hi' && skill.titleHi ? skill.titleHi : skill.title);
              const growth = lang === 'mr' && skill.growthMr ? skill.growthMr : (lang === 'hi' && skill.growthHi ? skill.growthHi : skill.growth);

              return (
                <button
                  key={skill.id}
                  type="button"
                  className={`emerging-nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveSkillId(skill.id)}
                  role="tab"
                  aria-selected={isActive}
                >
                  <Icon size={20} className="nav-icon" style={{ color: isActive ? 'var(--saffron-primary)' : 'var(--navy-deep)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>
                      {title}
                    </div>
                    <div style={{ fontSize: '0.74rem', opacity: 0.8 }}>
                      {growth}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Deep Dive Intelligence Card */}
          <div className="emerging-skill-detail-card">
            <div className="emerging-detail-header">
              <div className="emerging-title-wrap">
                <div className="emerging-detail-icon">
                  <CurrentIcon size={28} />
                </div>
                <div>
                  <span className="badge badge-saffron" style={{ marginBottom: '4px' }}>
                    {currentGrowth}
                  </span>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                    {currentTitle}
                  </h3>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-green">
                  {currentVacancies}
                </span>
              </div>
            </div>

            {/* Key Focus & Curriculum Pillars */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '10px' }}>
                {t.emergingFocusTitle || 'Key Technical Competencies & Curriculum Pillars'}
              </h4>
              <div className="focus-areas-grid">
                {currentFocusAreas.map((area, idx) => (
                  <div key={idx} className="focus-area-item">
                    <span className="focus-area-bullet">•</span>
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industrial Corridors, Lead Partners, and Stipend */}
            <div className="emerging-meta-grid">
              <div className="meta-box">
                <div className="meta-box-title">
                  <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {t.emergingHubs || 'Primary Maharashtra Hubs'}
                </div>
                <div className="meta-box-content">
                  {currentHubs.join(', ')}
                </div>
              </div>

              <div className="meta-box">
                <div className="meta-box-title">
                  <Building2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {t.emergingPartners || 'Industry & CoE Partners'}
                </div>
                <div className="meta-box-content">
                  {currentSkill.leadPartners.join(', ')}
                </div>
              </div>

              <div className="meta-box">
                <div className="meta-box-title">
                  <Award size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {t.emergingStipend || 'State Aid & Stipend'}
                </div>
                <div className="meta-box-content" style={{ color: 'var(--success-dark)' }}>
                  {currentStipend}
                </div>
              </div>
            </div>

            {/* Official Certification Pathway Box */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--saffron-border)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--saffron-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {t.emergingCertTag || 'Accredited Certification'}
                </div>
                <div style={{ fontWeight: 800, color: 'var(--navy-deep)', fontSize: '1.02rem' }}>
                  {currentCert}
                </div>
              </div>

              <button 
                className="btn btn-primary btn-sm"
                onClick={() => onAskAI(`How can I register for ${currentCert}?`)}
              >
                {t.emergingEnrollBtn || 'Enroll via MahaSkill Connect'}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
