import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  RefreshCw, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export function RoleEntryCards({ 
  t, 
  onSelectRole, 
  onOpenAuth, 
  onFindCareer, 
  onOpenStudentDashboard,
  onOpenJobSeekerDashboard,
  onOpenAdminDashboard
}) {
  const cards = [
    {
      id: "student",
      type: "card-student",
      icon: GraduationCap,
      color: "#f59e0b",
      bgColor: "#fffbeb",
      tag: t.studentTag || "Student & Youth",
      title: t.studentTitle || "Student Pathway Explorer",
      desc: t.studentDesc || "Explore 3,400+ ITI & diploma courses, aptitude career matches & scholarships.",
      cta: t.studentCta || "Enter Student Portal",
      tags: ["Aptitude Match", "3,400+ ITIs", "Scholarships"],
      action: () => (onOpenStudentDashboard ? onOpenStudentDashboard() : onFindCareer("student"))
    },
    {
      id: "job-seeker",
      type: "card-seeker",
      icon: Briefcase,
      color: "#3b82f6",
      bgColor: "#eff6ff",
      tag: t.jobSeekerTag || "Job Seeker",
      title: t.jobSeekerTitle || "Candidate & Job Matching",
      desc: t.jobSeekerDesc || "Scan skill gaps, apply to verified MSME vacancies & earn digital credentials.",
      cta: t.jobSeekerCta || "Enter Seeker Dashboard",
      tags: ["AI Resume Scan", "Direct MSME Jobs", "Digital Badge"],
      action: () => onOpenJobSeekerDashboard()
    },

    {
      id: "admin",
      type: "card-admin",
      icon: ShieldCheck,
      color: "#6366f1",
      bgColor: "#eef2ff",
      tag: t.adminTag || "Govt Admin",
      title: t.adminTitle || "Labour Intelligence Cockpit",
      desc: t.adminDesc || "Real-time 36-district heatmaps, supply/demand indices & curriculum audits.",
      cta: t.adminCta || "Launch Admin Cockpit",
      tags: ["36 District Heatmaps", "Labour Gap Engine", "Partner Audits"],
      action: () => onOpenAdminDashboard()
    }
  ];

  return (
    <section id="role-cards" className="role-cards-section" aria-label="Portal Entry by Role" style={{ padding: '24px 0 36px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--saffron-primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            Choose Your Pathway
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '4px 0' }}>
            Tailored Portals for Every Stakeholder
          </h2>
        </div>

        <div className="role-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id} 
                className="role-card"
                onClick={card.action}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') card.action(); }}
                aria-label={`${card.title} - ${card.desc}`}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: card.bgColor, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={22} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: card.color, background: card.bgColor, padding: '3px 8px', borderRadius: '12px' }}>
                      {card.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '8px', lineHeight: 1.25 }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '16px' }}>
                    {card.desc}
                  </p>

                  {/* Compact Feature Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                    {card.tags.map((tag, idx) => (
                      <span key={idx} style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569', background: '#f1f5f9', padding: '2px 7px', borderRadius: '6px' }}>
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid #f1f5f9',
                  color: card.color,
                  fontWeight: 800,
                  fontSize: '0.84rem'
                }}>
                  <span>{card.cta}</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
