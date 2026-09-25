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
  onOpenCareerRestartDashboard,
  onOpenAdminDashboard
}) {
  const cards = [
    {
      id: "student",
      type: "card-student",
      icon: GraduationCap,
      iconClass: "icon-student",
      tag: t.studentTag,
      title: t.studentTitle,
      desc: t.studentDesc,
      cta: t.studentCta,
      features: t.studentFeatures || ["Aptitude-to-Career Match", "3,400+ ITI & Diploma Courses", "Govt Scholarship Guidance"],
      action: () => (onOpenStudentDashboard ? onOpenStudentDashboard() : onFindCareer("student"))
    },
    {
      id: "job-seeker",
      type: "card-seeker",
      icon: Briefcase,
      iconClass: "icon-seeker",
      tag: t.jobSeekerTag,
      title: t.jobSeekerTitle,
      desc: t.jobSeekerDesc,
      cta: t.jobSeekerCta,
      features: t.jobSeekerFeatures || ["AI Resume & Skill Gap Scan", "Direct MSME & OEM Connect", "Tamper-proof Digital Badge"],
      action: () => onOpenJobSeekerDashboard()
    },
    {
      id: "reskill",
      type: "card-reskill",
      icon: RefreshCw,
      iconClass: "icon-reskill",
      tag: t.reskillTag,
      title: t.reskillTitle,
      desc: t.reskillDesc,
      cta: t.reskillCta,
      features: t.reskillFeatures || ["Women Returnship Cohorts", "Industry 4.0 Weekend Upskilling", "DBT Stipend Support"],
      action: () => onOpenCareerRestartDashboard()
    },
    {
      id: "admin",
      type: "card-admin",
      icon: ShieldCheck,
      iconClass: "icon-admin",
      tag: t.adminTag,
      title: t.adminTitle,
      desc: t.adminDesc,
      cta: t.adminCta,
      features: t.adminFeatures || ["36 District Heatmaps", "Labour Supply & Demand Index", "Training Partner Verification"],
      action: () => onOpenAdminDashboard()
    }
  ];

  return (
    <section id="role-cards" class="role-cards-section" aria-label="Portal Entry by Role">
      <div class="container">
        <div class="role-cards-grid">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id} 
                class={`role-card ${card.type}`}
                onClick={card.action}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') card.action(); }}
                aria-label={`${card.title} - ${card.desc}`}
              >
                <div>
                  <div class="role-card-top">
                    <div class={`role-icon-box ${card.iconClass}`}>
                      <Icon size={26} />
                    </div>
                    <span class="badge badge-navy">
                      {card.tag}
                    </span>
                  </div>

                  <h3 class="role-title">{card.title}</h3>
                  <p class="role-desc">{card.desc}</p>

                  <ul style={{ listStyle: 'none', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {card.features.map((feat, idx) => (
                      <li key={idx} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--success-green)', flexShrink: 0 }} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <button class="role-cta-btn">
                  <span>{card.cta}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
