import React, { useState } from 'react';
import { 
  X, 
  Compass, 
  Sparkles, 
  GraduationCap, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  Award
} from 'lucide-react';
import { allDistrictsList } from '../data/districtsData';

export function CareerPathwayModal({ isOpen, onClose, onAskAI, lang, t, rolePreset }) {
  const [education, setEducation] = useState('12th / ITI');
  const [interest, setInterest] = useState('EV & Automotive Tech');
  const [district, setDistrict] = useState('Pune');
  const [step, setStep] = useState(1); // 1 = Quiz, 2 = AI Result

  if (!isOpen) return null;

  const handleGeneratePathway = (e) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div class="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div class="modal-box" onClick={(e) => e.stopPropagation()}>
        <div class="modal-header">
          <div>
            <span class="badge badge-saffron" style={{ marginBottom: '4px' }}>
              MahaSkill Connect Pathway Engine
            </span>
            <h3 class="modal-title">
              {step === 1 ? 'Find Your Maharashtra Career Pathway' : 'Your Personalized AI Career Roadmap'}
            </h3>
          </div>
          <button class="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div class="modal-body">
          {step === 1 ? (
            <form onSubmit={handleGeneratePathway} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '8px' }}>
                  1. What is your highest qualification / current status?
                </label>
                <select 
                  value={education} 
                  onChange={(e) => setEducation(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.92rem' }}
                >
                  <option value="10th Pass / Secondary">10th Pass (Secondary School)</option>
                  <option value="12th / ITI">12th Standard / ITI Certificate</option>
                  <option value="Polytechnic Diploma">Polytechnic Diploma (Mech / Elec / CS / Civil)</option>
                  <option value="Graduate (BA / BCom / BSc / BCA)">Graduate (BA / BCom / BSc / BCA)</option>
                  <option value="B.E. / B.Tech Engineering">B.E. / B.Tech Engineering</option>
                  <option value="Career Break / Returning to Work">Career Break / Returning to Work (1+ Years)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '8px' }}>
                  2. What sector or technology interests you most?
                </label>
                <select 
                  value={interest} 
                  onChange={(e) => setInterest(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.92rem' }}
                >
                  <option value="EV & Automotive Tech">Electric Vehicles (EV) & Battery Diagnostics</option>
                  <option value="AI & Data Science">Artificial Intelligence, Prompting & Data</option>
                  <option value="Robotics & Smart Automation">Industrial Robotics & Smart Factory Automation</option>
                  <option value="Solar & Renewable Green Energy">Solar PV, Micro-Grids & Clean Energy</option>
                  <option value="Cybersecurity & Cloud">Cyber Defense & Cloud Infrastructure</option>
                  <option value="5-Axis Precision CNC">Advanced CNC Tooling & Precision Aerospace</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '8px' }}>
                  3. Preferred Maharashtra District for training / work:
                </label>
                <select 
                  value={district} 
                  onChange={(e) => setDistrict(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.92rem' }}
                >
                  {allDistrictsList.map((d) => (
                    <option key={d} value={d}>{d} District</option>
                  ))}
                </select>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
                <Sparkles size={18} />
                Generate AI Career Roadmap
              </button>
            </form>
          ) : (
            <div>
              {/* Result Summary */}
              <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid #a7f3d0', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--success-dark)', fontWeight: 700, textTransform: 'uppercase' }}>
                  AI Recommendation for {education} in {district}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
                  {interest.includes('EV') ? 'Certified EV Battery & Diagnostic Specialist' : (interest.includes('AI') ? 'Applied AI & Indic Data Annotation Specialist' : 'Smart Factory Automation & Robotics Technician')}
                </div>
              </div>

              {/* 3 Step Roadmap */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--saffron-light)', color: 'var(--saffron-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--navy-deep)' }}>Enroll in 12-Week Fast-Track CoE Program</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Available at Govt ITI / CoE in {district} with 100% state subsidy under PMKVY.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--saffron-light)', color: 'var(--saffron-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--navy-deep)' }}>6-Month Paid Apprenticeship (NAPS)</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Work with partnered Tier-1 manufacturing units with ₹12,500/mo DBT stipend.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--saffron-light)', color: 'var(--saffron-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--navy-deep)' }}>Full-Time Placement (₹4.8L - ₹7.5L CTC)</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Verified placement through direct MahaSkill recruitment drives.</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  class="btn btn-outline" 
                  onClick={() => setStep(1)}
                  style={{ flex: 1 }}
                >
                  Modify Choices
                </button>
                <button 
                  class="btn btn-primary"
                  onClick={() => {
                    onClose();
                    onAskAI(`How can I enroll in the recommended ${interest} pathway in ${district}?`);
                  }}
                  style={{ flex: 1.4 }}
                >
                  <Sparkles size={16} />
                  Start Enrollment via AI
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
