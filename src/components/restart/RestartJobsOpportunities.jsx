import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  MapPin, 
  Building2, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Send,
  Zap
} from 'lucide-react';
import { restartJobsToday, restartJobsUnlocked } from '../../data/careerRestartData';
import confetti from 'canvas-confetti';

export function RestartJobsOpportunities({ onApplyJob }) {
  const [activeTab, setActiveTab] = useState('today'); // 'today' | 'unlocked'
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = (job) => {
    if (appliedJobs.includes(job.id)) return;
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 }
    });
    setAppliedJobs(prev => [...prev, job.id]);
    if (onApplyJob) onApplyJob(job);
  };

  return (
    <div style={{ marginBottom: '36px' }} id="section-jobs" role="region" aria-label="Restart Job Opportunities">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span class="section-tag">
            <Briefcase size={14} />
            Immediate vs Future Career Horizons
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
            Job Opportunities Tailored to Your Journey
          </h2>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            class={`btn btn-sm ${activeTab === 'today' ? 'btn-success' : ''}`}
            style={{ border: 'none', background: activeTab === 'today' ? 'var(--success-green)' : 'transparent', color: activeTab === 'today' ? '#ffffff' : 'var(--text-secondary)' }}
            onClick={() => setActiveTab('today')}
          >
            <CheckCircle2 size={14} />
            Jobs you can apply for today ({restartJobsToday.length})
          </button>
          <button
            type="button"
            class={`btn btn-sm ${activeTab === 'unlocked' ? 'btn-primary' : ''}`}
            style={{ border: 'none', background: activeTab === 'unlocked' ? 'var(--saffron-primary)' : 'transparent', color: activeTab === 'unlocked' ? '#ffffff' : 'var(--text-secondary)' }}
            onClick={() => setActiveTab('unlocked')}
          >
            <Zap size={14} />
            Jobs you can unlock after training ({restartJobsUnlocked.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Jobs You Can Apply For Today */}
      {activeTab === 'today' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          {restartJobsToday.map((job) => {
            const isApplied = appliedJobs.includes(job.id);
            return (
              <div key={job.id} class="gov-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '5px solid var(--success-green)' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span class="badge badge-green">{job.badge}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--success-dark)' }}>{job.readiness}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                    {job.title}
                  </h3>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Building2 size={14} />
                    <span>{job.company}</span>
                    <span>•</span>
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>

                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '12px' }}>
                    {job.salary} <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>({job.workType})</span>
                  </div>

                  {/* Why eligible */}
                  <div style={{ background: '#f0fdf4', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.84rem', color: '#166534', border: '1px solid #bbf7d0', marginBottom: '16px' }}>
                    <strong>Why you qualify today:</strong> {job.whyEligible}
                  </div>
                </div>

                <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {job.requiredSkills.map((sk, idx) => (
                      <span key={idx} class="badge badge-navy" style={{ fontSize: '0.72rem' }}>
                        {sk}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    class={`btn btn-sm ${isApplied ? 'btn-success' : 'btn-primary'}`}
                    onClick={() => handleApply(job)}
                    disabled={isApplied}
                  >
                    {isApplied ? <><CheckCircle2 size={14} /> Applied</> : <><Send size={14} /> Apply Today</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Jobs You Can Unlock After Training */}
      {activeTab === 'unlocked' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          {restartJobsUnlocked.map((job) => (
            <div key={job.id} class="gov-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '5px solid var(--saffron-primary)', background: '#fffcf9' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span class="badge badge-saffron">{job.badge}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--saffron-primary)' }}>
                    <Lock size={12} style={{ display: 'inline', marginRight: '3px' }} />
                    {job.unlockStep}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                  {job.title}
                </h3>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Building2 size={14} />
                  <span>{job.company}</span>
                  <span>•</span>
                  <MapPin size={14} />
                  <span>{job.location}</span>
                </div>

                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--saffron-primary)', marginBottom: '12px' }}>
                  {job.salary}
                </div>

                <div style={{ background: '#fff7ed', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.84rem', color: '#9a3412', border: '1px solid #fed7aa', marginBottom: '16px' }}>
                  <strong>How to unlock:</strong> {job.whyUnlocked}
                </div>
              </div>

              <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {job.requiredSkills.map((sk, idx) => (
                    <span key={idx} class="badge badge-navy" style={{ fontSize: '0.72rem' }}>
                      {sk}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  class="btn btn-outline-saffron btn-sm"
                  onClick={() => {
                    const el = document.getElementById('section-training');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Sparkles size={14} />
                  Continue Course
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
