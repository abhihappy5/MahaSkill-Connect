import React, { useState } from 'react';
import { BrainCircuit, Zap, Bot, Cpu, SunMedium, ShieldCheck, Layers, Sparkles, MapPin, Users, Award } from 'lucide-react';
import { emergingSkillsData } from '../data/emergingSkillsData';

// Imported in App.jsx ("Homepage Section 3: Emerging Skills") but never existed as a file —
// same missing-component bug as TrendingCareers.jsx. Built to match the existing
// .emerging-skills-section CSS in components.css, and data field shape confirmed from
// backend/seed/data/raw/emergingSkillsData.js (id, title(+Mr/Hi), iconName, growth(+Mr/Hi),
// vacancies(+Mr/Hi), keyFocusAreas[](+Mr/Hi), targetHubs[](+Mr/Hi), leadPartners[],
// stipendEligibility(+Mr/Hi), recommendedCertification(+Mr/Hi)).
const ICON_MAP = { BrainCircuit, Zap, Bot, Cpu, SunMedium, ShieldCheck, Layers };

export function EmergingSkills({ t, lang, onAskAI }) {
  const [activeId, setActiveId] = useState(emergingSkillsData[0]?.id);
  const active = emergingSkillsData.find((s) => s.id === activeId) || emergingSkillsData[0];

  if (!active) return null;

  const localized = (base, mr, hi) => (lang === 'mr' ? mr || base : (lang === 'hi' ? hi || base : base));
  const localizedList = (base, mr, hi) => (lang === 'mr' ? mr || base : (lang === 'hi' ? hi || base : base)) || [];

  const ActiveIcon = ICON_MAP[active.iconName] || Sparkles;

  return (
    <section className="emerging-skills-section">
      <div className="container-wide">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '8px' }}>
            {t?.emergingSkillsTitle || (lang === 'mr' ? 'उदयोन्मुख कौशल्ये' : (lang === 'hi' ? 'उभरते कौशल' : 'Emerging Skills'))}
          </h2>
          <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
            {t?.emergingSkillsSubtitle || (lang === 'mr'
              ? 'महाराष्ट्रातील भविष्यातील उच्च-मागणी तंत्रज्ञान क्षेत्रे'
              : (lang === 'hi'
                ? 'महाराष्ट्र में भविष्य के उच्च-मांग वाले तकनीकी क्षेत्र'
                : "Maharashtra's future high-demand technology domains"))}
          </div>
        </div>

        <div className="emerging-skills-layout">
          {/* Left: Skill Nav List */}
          <div className="emerging-skills-nav">
            {emergingSkillsData.map((skill) => {
              const Icon = ICON_MAP[skill.iconName] || Sparkles;
              const isActive = skill.id === active.id;
              return (
                <button
                  key={skill.id}
                  type="button"
                  className={`emerging-nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveId(skill.id)}
                >
                  <Icon size={20} className="nav-icon" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                      {localized(skill.title, skill.titleMr, skill.titleHi)}
                    </div>
                    <div style={{ fontSize: '0.76rem', opacity: 0.8 }}>
                      {localized(skill.growth, skill.growthMr, skill.growthHi)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Skill Detail */}
          <div className="emerging-skill-detail-card">
            <div className="emerging-detail-header">
              <div className="emerging-title-wrap">
                <div className="emerging-detail-icon">
                  <ActiveIcon size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                    {localized(active.title, active.titleMr, active.titleHi)}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--success-green)', fontWeight: 700, marginTop: '2px' }}>
                    {localized(active.growth, active.growthMr, active.growthHi)} • {localized(active.vacancies, active.vacanciesMr, active.vacanciesHi)}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-outline-saffron btn-sm"
                onClick={() => onAskAI && onAskAI(
                  lang === 'mr'
                    ? `${localized(active.title, active.titleMr, active.titleHi)} बद्दल अधिक सांगा`
                    : (lang === 'hi' ? `${localized(active.title, active.titleMr, active.titleHi)} के बारे में और बताएं` : `Tell me more about ${localized(active.title, active.titleMr, active.titleHi)}`)
                )}
              >
                <Sparkles size={14} /> {t?.askAiBtn || (lang === 'mr' ? 'एआयला विचारा' : (lang === 'hi' ? 'एआई से पूछें' : 'Ask AI'))}
              </button>
            </div>

            {Array.isArray(localizedList(active.keyFocusAreas, active.keyFocusAreasMr, active.keyFocusAreasHi)) && (
              <div className="focus-areas-grid">
                {localizedList(active.keyFocusAreas, active.keyFocusAreasMr, active.keyFocusAreasHi).map((area, idx) => (
                  <div key={idx} className="focus-area-item">
                    <span className="focus-area-bullet">✓</span>
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="emerging-meta-grid">
              <div className="meta-box">
                <div className="meta-box-title">
                  <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  {t?.targetHubsLbl || (lang === 'mr' ? 'लक्ष्य केंद्रे' : (lang === 'hi' ? 'लक्षित केंद्र' : 'Target Hubs'))}
                </div>
                <div className="meta-box-content">
                  {(localizedList(active.targetHubs, active.targetHubsMr, active.targetHubsHi) || []).join(', ')}
                </div>
              </div>
              <div className="meta-box">
                <div className="meta-box-title">
                  <Users size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  {t?.leadPartnersLbl || (lang === 'mr' ? 'भागीदार संस्था' : (lang === 'hi' ? 'साझेदार संस्थान' : 'Lead Partners'))}
                </div>
                <div className="meta-box-content">
                  {(active.leadPartners || []).join(', ')}
                </div>
              </div>
              <div className="meta-box">
                <div className="meta-box-title">
                  <Award size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  {t?.certificationLbl || (lang === 'mr' ? 'शिफारस प्रमाणपत्र' : (lang === 'hi' ? 'अनुशंसित प्रमाणन' : 'Recommended Certification'))}
                </div>
                <div className="meta-box-content">
                  {localized(active.recommendedCertification, active.recommendedCertificationMr, active.recommendedCertificationHi)}
                </div>
              </div>
            </div>

            {active.stipendEligibility && (
              <div style={{ fontSize: '0.85rem', color: 'var(--saffron-primary)', fontWeight: 700, marginTop: '4px' }}>
                🪙 {localized(active.stipendEligibility, active.stipendEligibilityMr, active.stipendEligibilityHi)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}