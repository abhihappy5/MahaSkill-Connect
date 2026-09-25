import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Building2, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  BookmarkCheck,
  Bot, 
  Send,
  ArrowRight,
  Clock,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function AiJobMatches({ 
  jobs, 
  onAskAIJob, 
  onApplyJob, 
  appliedJobIds, 
  savedJobIds, 
  onToggleSaveJob,
  lang 
}) {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleApply = (job) => {
    if (appliedJobIds.includes(job.id)) return;
    triggerConfetti();
    onApplyJob(job);
  };

  return (
    <div className="ai-matches-section" id="section-ai-matches" role="region" aria-label="AI Matched Jobs">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span className="section-tag">
            <Sparkles size={14} />
            {lang === 'mr' ? 'महास्किल कनेक्ट मॅचमेकिंग २.०' : (lang === 'hi' ? 'महास्किल कनेक्ट मैचमेकिंग २.०' : 'MahaSkill Connect Matchmaking 2.0')}
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
            {lang === 'mr' ? 'तुमच्या प्रोफाइलशी जुळणाऱ्या नोकऱ्या' : (lang === 'hi' ? 'आपके प्रोफाइल से मेल खाने वाली नौकरियां' : 'Jobs matched to your profile')}
          </h2>
        </div>

        <span className="badge badge-green" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
          {jobs.length} {lang === 'mr' ? 'सक्रिय नोकरी संधी सापडल्या' : (lang === 'hi' ? 'नौकरियां उपलब्ध' : 'Precision Vacancies Found')}
        </span>
      </div>

      {/* List of Large Job Match Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {jobs.map((job) => {
          const isApplied = appliedJobIds.includes(job.id);
          const isSaved = savedJobIds.includes(job.id);

          const matchClass = job.matchScore >= 90 
            ? 'high-match' 
            : (job.matchScore >= 80 ? 'good-match' : 'moderate-match');

          const scorePillClass = job.matchScore >= 90 
            ? 'score-90' 
            : (job.matchScore >= 80 ? 'score-80' : 'score-70');

          return (
            <div key={job.id} className={`ai-match-card-large ${matchClass}`}>
              {/* Header */}
              <div className="match-card-header">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div className="company-logo-badge">
                    {job.companyLogo}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                        {job.company}
                      </span>
                      {job.isGovtPartner && (
                        <span className="badge badge-navy" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                          <ShieldCheck size={12} style={{ color: 'var(--saffron-primary)' }} />
                          {lang === 'mr' ? 'शासकीय भागीदार' : (lang === 'hi' ? 'सरकारी भागीदार' : 'Govt Partner')}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
                      {job.title}
                    </h3>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className={`match-score-pill ${scorePillClass}`}>
                  <Sparkles size={16} />
                  <span>{job.matchScore}% {lang === 'mr' ? 'मॅच' : 'Match'}</span>
                </div>
              </div>

              {/* Meta Chips Row */}
              <div className="job-meta-chips-row">
                <span className="job-meta-chip">
                  <MapPin size={15} style={{ color: 'var(--saffron-primary)' }} />
                  {job.location}
                </span>
                <span>•</span>
                <span className="job-meta-chip" style={{ fontWeight: 700, color: 'var(--success-dark)' }}>
                  {job.salary}
                </span>
                <span>•</span>
                <span className="job-meta-chip">
                  <Briefcase size={15} />
                  {job.experience}
                </span>
                <span>•</span>
                <span className="job-meta-chip">
                  <Clock size={15} />
                  {job.postedDate}
                </span>
              </div>

              {/* Job Brief Description */}
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                {job.jobDescription}
              </p>

              {/* Skills Comparison Box: Matching vs Missing Skills */}
              <div className="skills-comparison-box">
                {/* Matching Skills */}
                <div className="matching-skills-col">
                  <span className="skill-col-heading" style={{ color: 'var(--success-dark)' }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--success-green)' }} />
                    {lang === 'mr' ? 'जुळणारी कौशल्ये' : (lang === 'hi' ? 'मेल खाने वाले कौशल' : 'Matching Skills')} ({job.matchingSkills.length})
                  </span>
                  <div>
                    {job.matchingSkills.map((sk, idx) => (
                      <span key={idx} className="skill-pill-check">
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="missing-skills-col">
                  <span className="skill-col-heading" style={{ color: '#b91c1c' }}>
                    <XCircle size={14} style={{ color: '#dc2626' }} />
                    {lang === 'mr' ? 'आवश्यक इतर कौशल्ये' : (lang === 'hi' ? 'अपेक्षित अन्य कौशल' : 'Missing Skills')} ({job.missingSkills.length})
                  </span>
                  <div>
                    {job.missingSkills.map((sk, idx) => (
                      <span key={idx} className="skill-pill-cross">
                        ✕ {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Eligibility Note */}
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                color: '#1e40af',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles size={16} style={{ color: '#2563eb', flexShrink: 0 }} />
                <span><strong>{lang === 'mr' ? 'एआय विश्लेषण:' : 'AI Insight:'}</strong> {job.eligibilityAnalysis}</span>
              </div>

              {/* Action Buttons */}
              <div className="match-card-actions">
                <button 
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => onAskAIJob(job)}
                  style={{ color: 'var(--navy-deep)', fontWeight: 700 }}
                >
                  <Bot size={16} style={{ color: 'var(--saffron-primary)' }} />
                  {lang === 'mr' ? 'या नोकरीबाबत एआय ला विचारा' : (lang === 'hi' ? 'एआई से पूछें' : 'Ask AI about this job')}
                </button>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button"
                    className={`btn btn-outline btn-sm ${isSaved ? 'btn-outline-saffron' : ''}`}
                    onClick={() => onToggleSaveJob(job.id)}
                    title={isSaved ? 'Saved to bookmarks' : 'Save job'}
                  >
                    {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    {isSaved ? (lang === 'mr' ? 'जतन केले' : 'Saved') : (lang === 'mr' ? 'जतन करा' : 'Save')}
                  </button>

                  <button 
                    type="button"
                    className={`btn btn-sm ${isApplied ? 'btn-success' : 'btn-primary'}`}
                    onClick={() => handleApply(job)}
                    disabled={isApplied}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 size={16} />
                        {lang === 'mr' ? 'अर्ज केला आहे (प्रक्रिया सुरू)' : 'Applied (In Review)'}
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        {lang === 'mr' ? '१-क्लिक अर्ज करा' : 'Apply Now'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
