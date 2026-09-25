import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  GraduationCap,
  Briefcase,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function RestartAssessmentModal({ isOpen, onClose, onGeneratedPlan }) {
  const [prevRole, setPrevRole] = useState('Retail & Customer Sales (3-5 Years)');
  const [careerBreakDuration, setCareerBreakDuration] = useState('2 - 4 Years');
  const [targetPreference, setTargetPreference] = useState('Office Administration & Logistics');
  const [isGenerated, setIsGenerated] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    setIsGenerated(true);
  };

  return (
    <div class="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Career Restart Assessment Wizard">
      <div class="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        {/* Header */}
        <div class="modal-header">
          <div>
            <span class="badge badge-green" style={{ marginBottom: '4px' }}>
              MahaSkill Connect Transition Engine
            </span>
            <h3 class="modal-title">
              {isGenerated ? 'Your Customized Career Restart Plan' : 'Career Restart Assessment'}
            </h3>
          </div>
          <button class="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div class="modal-body">
          {!isGenerated ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '6px' }}>
                  1. What was your primary previous work or background?
                </label>
                <select 
                  value={prevRole}
                  onChange={(e) => setPrevRole(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}
                >
                  <option value="Retail & Customer Sales (3-5 Years)">Retail & Store Operations (3-5 Years)</option>
                  <option value="Homemaker & Family Caregiver">Homemaker / Family Caregiver (Full Break)</option>
                  <option value="Manual / Traditional Machine Operator">Manual Workshop / Factory Operator</option>
                  <option value="Hospitality & Front Office">Hospitality & Food Service Associate</option>
                  <option value="Graduate Looking for First Structured Job">Graduate with Career Gap</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '6px' }}>
                  2. Duration of career gap / time away from formal workforce:
                </label>
                <select 
                  value={careerBreakDuration}
                  onChange={(e) => setCareerBreakDuration(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}
                >
                  <option value="Less than 1 Year">Less than 1 Year (Recent Job Seeker)</option>
                  <option value="1 - 3 Years">1 - 3 Years</option>
                  <option value="3 - 5 Years">3 - 5 Years</option>
                  <option value="5+ Years">5+ Years (Long-Term Returnee)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '6px' }}>
                  3. What is your preferred future work domain?
                </label>
                <select 
                  value={targetPreference}
                  onChange={(e) => setTargetPreference(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}
                >
                  <option value="Office Administration & Logistics">Corporate Office Admin & Supply Chain Logistics</option>
                  <option value="Digital Data & AI Operations">Digital Data Annotation & AI Operations</option>
                  <option value="Financial Accounting & Tally GST">Accounts Assistant & GST Filing</option>
                  <option value="Healthcare Patient Coordinator">Healthcare & Hospital Front Desk</option>
                  <option value="EV & Smart Assembly">EV Assembly & Quality Inspection</option>
                </select>
              </div>

              <button type="submit" class="btn btn-success btn-lg" style={{ width: '100%', marginTop: '6px' }}>
                <Sparkles size={18} />
                Generate My Restart Plan
              </button>
            </form>
          ) : (
            <div>
              {/* Generated Result */}
              <div style={{ background: '#ecfdf5', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid #a7f3d0', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--success-dark)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Target Career Pathway: {targetPreference}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
                  Your 6-Week Restart Roadmap is Ready
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Estimated salary upon placement: <strong>₹3.8L - ₹6.2L LPA</strong> (Full State Subsidy under MMKVY)
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--navy-deep)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success-green)' }} />
                  <strong>Week 1-2:</strong> Digital Office Productivity & Cloud Tools
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--navy-deep)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success-green)' }} />
                  <strong>Week 3-4:</strong> ERP Inventory & CRM Ticket Handling
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--navy-deep)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success-green)' }} />
                  <strong>Week 5:</strong> MSSDS Micro-Certification & DigiLocker Badge
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--navy-deep)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success-green)' }} />
                  <strong>Week 6:</strong> 3 Guaranteed Employer Interviews in Pune MIDC
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" class="btn btn-outline" onClick={() => setIsGenerated(false)} style={{ flex: 1 }}>
                  Change Preferences
                </button>
                <button 
                  type="button" 
                  class="btn btn-success" 
                  style={{ flex: 1.4 }}
                  onClick={() => {
                    onClose();
                    if (onGeneratedPlan) onGeneratedPlan();
                  }}
                >
                  <RotateCcw size={16} />
                  Adopt This Restart Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
