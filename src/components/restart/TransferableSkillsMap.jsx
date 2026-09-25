import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Building2, 
  TrendingUp,
  Compass,
  ChevronDown
} from 'lucide-react';
import { transferableSkillsProfiles } from '../../data/careerRestartData';

export function TransferableSkillsMap({ onSelectCareerPath }) {
  const [activeProfileId, setActiveProfileId] = useState('retail-to-office');

  const currentProfile = transferableSkillsProfiles.find(p => p.id === activeProfileId) || transferableSkillsProfiles[0];
  const map = currentProfile.transitionMap;

  return (
    <div class="transferable-skills-section" id="section-career-paths" role="region" aria-label="Transferable Skills and Transition Map">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span class="section-tag">
            <Compass size={14} />
            Skill Transfer Intelligence
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
            Transferable Skills & Possible New Careers
          </h2>
        </div>

        {/* Profile Switcher */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            class={`btn btn-sm ${activeProfileId === 'retail-to-office' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveProfileId('retail-to-office')}
          >
            Retail Associate Profile
          </button>
          <button
            type="button"
            class={`btn btn-sm ${activeProfileId === 'caregiver-to-tech' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveProfileId('caregiver-to-tech')}
          >
            Career Break Profile
          </button>
        </div>
      </div>

      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Your past experience is not lost. MahaSkill Connect maps your existing competencies directly to high-growth, modern Maharashtra industries.
      </p>

      {/* Transferable Skills Cards */}
      <div class="transferable-skills-grid">
        {currentProfile.transferableSkills.map((item, idx) => (
          <div key={idx} class="transfer-skill-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--navy-deep)' }}>
                {item.skill}
              </span>
              <span class="badge badge-green">
                {item.matchPct}% Match
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              {item.context}
            </p>
          </div>
        ))}
      </div>

      {/* Possible New Careers Grid */}
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Briefcase size={18} style={{ color: 'var(--saffron-primary)' }} />
          Possible New Career Destinations
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {currentProfile.possibleNewCareers.map((c, idx) => (
            <div key={idx} style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-xs)' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-deep)' }}>{c.title}</h4>
                  <span class="badge badge-saffron">{c.readinessPct}% Ready</span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--success-dark)', marginBottom: '8px' }}>
                  {c.salaryRange}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  <Building2 size={12} style={{ display: 'inline', marginRight: '3px' }} />
                  {c.hiringSectors}
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--navy-accent)', fontWeight: 600 }}>
                  <GraduationCap size={12} style={{ display: 'inline', marginRight: '3px' }} />
                  Bridge Course: {c.trainingNeeded}
                </div>
              </div>

              <button 
                type="button" 
                class="btn btn-outline-saffron btn-sm"
                style={{ marginTop: '16px' }}
                onClick={() => onSelectCareerPath(c.title)}
              >
                Explore Roadmap <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Career Transition Map Visual Pipeline */}
      <div class="transition-map-pipeline">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Sparkles size={18} style={{ color: 'var(--saffron-primary)' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
            Career Transition Map (End-to-End Pathway)
          </h3>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
          Visual progression from your previous experience to your target career:
        </p>

        <div class="transition-map-steps">
          {/* Step 1: Previous Career */}
          <div class="trans-step-card">
            <div class="trans-step-title">1. Previous Career</div>
            <div class="trans-step-content">{map.previousCareer}</div>
          </div>

          {/* Step 2: Transferable Skills */}
          <div class="trans-step-card" style={{ borderColor: 'var(--success-green)' }}>
            <div class="trans-step-title" style={{ color: 'var(--success-green)' }}>2. Transferable Skills</div>
            <div class="trans-step-content" style={{ fontSize: '0.78rem' }}>{map.transferableSkills}</div>
          </div>

          {/* Step 3: Recommended Training */}
          <div class="trans-step-card" style={{ borderColor: '#3b82f6' }}>
            <div class="trans-step-title" style={{ color: '#60a5fa' }}>3. Bridge Training</div>
            <div class="trans-step-content" style={{ fontSize: '0.78rem' }}>{map.recommendedTraining}</div>
          </div>

          {/* Step 4: Target Career */}
          <div class="trans-step-card" style={{ borderColor: 'var(--saffron-primary)' }}>
            <div class="trans-step-title">4. Target Career</div>
            <div class="trans-step-content">{map.targetCareer}</div>
          </div>

          {/* Step 5: Available Jobs */}
          <div class="trans-step-card" style={{ background: '#059669', borderColor: '#10b981' }}>
            <div class="trans-step-title" style={{ color: '#ffffff' }}>5. Available Jobs</div>
            <div class="trans-step-content" style={{ color: '#ffffff', fontWeight: 800 }}>{map.availableJobs}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
