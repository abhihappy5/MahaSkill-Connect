import React from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Award, 
  Building2, 
  ArrowRight,
  Sparkles,
  BookOpen,
  Send
} from 'lucide-react';
import { personalizedLearningSteps } from '../../data/careerRestartData';

export function PersonalizedLearningPath({ onExploreJobs }) {
  return (
    <div class="learning-path-section" id="section-training" role="region" aria-label="Personalized Learning Path">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span class="section-tag">
            <GraduationCap size={14} />
            Structured Career Re-entry Route
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
            Personalized 5-Step Learning Path
          </h2>
        </div>

        <span class="badge badge-green" style={{ fontSize: '0.85rem' }}>
          Step 2 in Progress (65% Complete)
        </span>
      </div>

      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        A practical step-by-step curriculum built with government training partners to take you from foundational digital literacy to guaranteed placement drives.
      </p>

      {/* 5-Step Timeline List */}
      <div class="path-steps-timeline">
        {personalizedLearningSteps.map((s) => {
          const isCompleted = s.status === 'completed';
          const isInProgress = s.status === 'in-progress';
          const isUpcoming = s.status === 'upcoming';

          return (
            <div 
              key={s.step} 
              class={`timeline-step-row ${s.status}`}
            >
              {/* Left Circle Number / Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '220px' }}>
                <div class={`step-number-circle ${isCompleted ? 'done' : (isInProgress ? 'active' : '')}`}>
                  {isCompleted ? <CheckCircle2 size={24} /> : s.step}
                </div>

                <div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: isCompleted ? 'var(--success-dark)' : (isInProgress ? 'var(--saffron-primary)' : 'var(--text-muted)') }}>
                    Step {s.step} • {isCompleted ? 'Completed' : (isInProgress ? 'Current Focus' : 'Upcoming Milestone')}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
                    {s.title}
                  </h3>
                </div>
              </div>

              {/* Center Info: Description & Skills Gained */}
              <div style={{ flex: 1, minWidth: '260px' }}>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {s.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Key Outcomes:</span>
                  {s.skillsGained.map((sk, idx) => (
                    <span key={idx} class="badge badge-navy" style={{ fontSize: '0.72rem' }}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side: Provider, Duration & Action */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', minWidth: '180px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-deep)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} style={{ color: 'var(--saffron-primary)' }} />
                  {s.duration}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 600 }}>
                  {s.subsidy}
                </div>

                {isInProgress && (
                  <div style={{ width: '100%', marginTop: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700, color: 'var(--saffron-primary)', marginBottom: '2px' }}>
                      <span>Batch Progress</span>
                      <span>{s.currentProgress}%</span>
                    </div>
                    <div class="proficiency-bar-bg" style={{ height: '6px' }}>
                      <div class="proficiency-bar-fill medium" style={{ width: `${s.currentProgress}%`, background: 'var(--saffron-primary)' }}></div>
                    </div>
                  </div>
                )}

                {s.step === 5 && (
                  <button 
                    type="button" 
                    class="btn btn-primary btn-sm"
                    style={{ marginTop: '8px' }}
                    onClick={onExploreJobs}
                  >
                    <Send size={13} />
                    View Placement Drives
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
