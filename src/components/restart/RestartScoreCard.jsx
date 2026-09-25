import React from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { mockRestartProfile } from '../../data/careerRestartData';

export function RestartScoreCard({ onExploreTransferable }) {
  const metrics = mockRestartProfile.readinessMetrics;
  const overallScore = mockRestartProfile.careerReadinessScore;

  return (
    <div class="restart-score-section" id="section-assessment" role="region" aria-label="Career Readiness Score">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span class="section-tag" style={{ background: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' }}>
            <Award size={14} />
            Diagnostic Readiness Audit
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
            Career Readiness & Transferable Assets
          </h2>
        </div>

        <span class="badge badge-green" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
          <ShieldCheck size={14} />
          High Transferability Index
        </span>
      </div>

      <div class="score-layout">
        {/* Left Side: Circular Progress Meter for "Career Readiness" */}
        <div class="circular-score-wrapper">
          <div class="score-radial-large">
            <svg width="130" height="130">
              <circle 
                cx="65" 
                cy="65" 
                r="52" 
                stroke="#e2e8f0" 
                strokeWidth="10" 
                fill="transparent" 
              />
              <circle 
                cx="65" 
                cy="65" 
                r="52" 
                stroke="#059669" 
                strokeWidth="10" 
                fill="transparent" 
                strokeDasharray="326.72"
                strokeDashoffset={326.72 * (1 - overallScore / 100)}
                strokeLinecap="round"
              />
            </svg>
            <span class="score-center-text">{overallScore}%</span>
          </div>

          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--navy-deep)' }}>
            Career Readiness
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Strong Foundation in Customer Operations
          </div>
        </div>

        {/* Right Side: 4 Metric Cards */}
        <div class="score-metrics-4grid">
          {/* 1. Existing Skills */}
          <div class="score-metric-card">
            <div class="metric-card-top">
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Existing Skills
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                {metrics.existingSkillsScore}%
              </span>
            </div>
            <div class="proficiency-bar-bg">
              <div class="proficiency-bar-fill high" style={{ width: `${metrics.existingSkillsScore}%` }}></div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Customer empathy, billing, and inventory tracking verified.
            </div>
          </div>

          {/* 2. Transferable Skills (Highlight Asset!) */}
          <div class="score-metric-card" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
            <div class="metric-card-top">
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={13} />
                Transferable Skills
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#047857' }}>
                {metrics.transferableSkillsScore}%
              </span>
            </div>
            <div class="proficiency-bar-bg">
              <div class="proficiency-bar-fill high" style={{ width: `${metrics.transferableSkillsScore}%`, background: '#059669' }}></div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600 }}>
              Directly transfers to Office Admin, Logistics, and CRM.
            </div>
          </div>

          {/* 3. Skills to Improve */}
          <div class="score-metric-card">
            <div class="metric-card-top">
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Skills to Improve
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--warning-amber)' }}>
                {metrics.skillsToImproveScore}%
              </span>
            </div>
            <div class="proficiency-bar-bg">
              <div class="proficiency-bar-fill medium" style={{ width: `${metrics.skillsToImproveScore}%` }}></div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Targeted focus: Advanced Excel, Tally Prime & ERP Inventory.
            </div>
          </div>

          {/* 4. Job Readiness */}
          <div class="score-metric-card">
            <div class="metric-card-top">
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Job Readiness
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--success-green)' }}>
                {metrics.overallJobReadiness}%
              </span>
            </div>
            <div class="proficiency-bar-bg">
              <div class="proficiency-bar-fill high" style={{ width: `${metrics.overallJobReadiness}%` }}></div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Ready for immediate front-desk and logistics assistant roles.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
