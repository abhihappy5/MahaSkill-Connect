import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  GraduationCap, 
  Award, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export function RestartSkillGap({ onEnrollCourse }) {
  const comparisonList = [
    {
      domain: "Office Software & Spreadsheets",
      alreadyHave: "Basic Computer & Typing",
      needToLearn: "Advanced Excel (Pivot, VLOOKUP) & Google Sheets",
      training: "Digital Productivity Certificate (2 Weeks)",
      provider: "CDAC Pune",
      subsidy: "100% Free under MMKVY"
    },
    {
      domain: "Enterprise Resource Planning (ERP)",
      alreadyHave: "Point-of-Sale Billing & POS Terminals",
      needToLearn: "SAP MM (Materials) & Tally Prime GST",
      training: "ERP & Accounting Specialization (3 Weeks)",
      provider: "Govt Polytechnic Pune",
      subsidy: "100% State Subsidized"
    },
    {
      domain: "Client & Business Communication",
      alreadyHave: "Marathi & Hindi Verbal Fluency",
      needToLearn: "Corporate Business Email & Ticket Resolution",
      training: "Workplace Communication Lab (1 Week)",
      provider: "MSSDS Center of Excellence",
      subsidy: "Free Workshop"
    }
  ];

  return (
    <div class="skill-gap-section" style={{ marginBottom: '32px' }} id="section-skill-gap" role="region" aria-label="Skill Gap Analysis">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span class="section-tag" style={{ background: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' }}>
            <TrendingUp size={14} />
            Targeted Skill Gap Analysis
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
            What you already have vs What you need to learn
          </h2>
        </div>

        <span class="badge badge-navy">
          Clear 3-Skill Bridge Plan
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {comparisonList.map((item, idx) => (
          <div 
            key={idx} 
            style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '20px 24px', 
              display: 'grid', 
              gridTemplateColumns: '1.1fr 1.2fr 1.2fr 1fr', 
              gap: '20px', 
              alignItems: 'center' 
            }}
          >
            {/* Domain */}
            <div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Skill Domain
              </span>
              <div style={{ fontWeight: 800, fontSize: '1.02rem', color: 'var(--navy-deep)', marginTop: '2px' }}>
                {item.domain}
              </div>
            </div>

            {/* Already Have */}
            <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--success-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={12} style={{ color: 'var(--success-green)' }} />
                Already Have
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                {item.alreadyHave}
              </div>
            </div>

            {/* Need to Learn */}
            <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid #fed7aa' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--saffron-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <XCircle size={12} style={{ color: 'var(--saffron-primary)' }} />
                Need to Learn
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                {item.needToLearn}
              </div>
            </div>

            {/* Recommended Training */}
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--navy-accent)' }}>
                {item.training}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--success-dark)', fontWeight: 600 }}>
                {item.subsidy}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
