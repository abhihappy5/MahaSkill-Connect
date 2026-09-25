import React, { useState } from 'react';
import { 
  X, 
  User, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  Phone, 
  Mail, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export function AuthModal({ isOpen, mode, onClose, onLoginSuccess, t }) {
  const [activeTab, setActiveTab] = useState('candidate'); // 'candidate' | 'employer' | 'partner' | 'admin'
  const [authMode, setAuthMode] = useState(mode || 'login'); // 'login' | 'register'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  if (!isOpen) return null;

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setSuccessNotice(`Authenticated successfully as ${activeTab.toUpperCase()}! Welcome to MahaSkill Connect.`);
    setTimeout(() => {
      setSuccessNotice('');
      onClose();
      if (onLoginSuccess) onLoginSuccess(activeTab);
    }, 1500);
  };

  const roles = [
    { key: 'candidate', label: 'Candidate / Student', icon: User },
    { key: 'employer', label: 'Employer / MSME', icon: Building2 },
    { key: 'partner', label: 'Training / ITI', icon: GraduationCap },
    { key: 'admin', label: 'Govt / MSSDS Admin', icon: ShieldCheck }
  ];

  return (
    <div class="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div class="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        {/* Header */}
        <div class="modal-header">
          <div>
            <span class="badge badge-saffron" style={{ marginBottom: '4px' }}>
              Government of Maharashtra
            </span>
            <h3 class="modal-title">
              {authMode === 'login' ? 'MahaSkill Portal Login' : 'Register on MahaSkill Connect'}
            </h3>
          </div>
          <button class="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Role Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4px',
          background: 'var(--bg-secondary)',
          padding: '6px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          {roles.map((r) => {
            const Icon = r.icon;
            const isSelected = activeTab === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setActiveTab(r.key)}
                style={{
                  border: 'none',
                  background: isSelected ? '#ffffff' : 'transparent',
                  color: isSelected ? 'var(--navy-deep)' : 'var(--text-muted)',
                  padding: '8px 4px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: isSelected ? 'var(--shadow-xs)' : 'none',
                  borderBottom: isSelected ? '2px solid var(--saffron-primary)' : '2px solid transparent'
                }}
              >
                <Icon size={16} style={{ color: isSelected ? 'var(--saffron-primary)' : 'inherit' }} />
                <span style={{ textAlign: 'center', lineHeight: 1.1 }}>{r.label.split('/')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <div class="modal-body">
          {successNotice ? (
            <div style={{
              textAlign: 'center',
              padding: '24px',
              background: '#ecfdf5',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #a7f3d0'
            }}>
              <CheckCircle2 size={36} style={{ color: 'var(--success-green)', margin: '0 auto 12px auto' }} />
              <div style={{ fontWeight: 800, color: 'var(--success-dark)', fontSize: '1.1rem' }}>
                {successNotice}
              </div>
            </div>
          ) : (
            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-deep)', marginBottom: '6px' }}>
                  {activeTab === 'candidate' ? 'Mobile Number or Aadhaar / MahaDBT ID' : (activeTab === 'employer' ? 'Company CIN / GSTIN / Email' : (activeTab === 'partner' ? 'ITI / Institute Code or Email' : 'Government Officer Email / Employee ID'))}
                </label>
                <input 
                  type="text"
                  required
                  placeholder={activeTab === 'candidate' ? 'e.g. 9876543210' : 'e.g. admin@mahaskill.gov.in'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-deep)', marginBottom: '6px' }}>
                  {isOtpSent ? 'Enter 6-Digit OTP' : 'Password / Pin'}
                </label>
                <input 
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <input type="checkbox" defaultChecked /> Remember login on this device
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("OTP reset link dispatched to your registered Aadhaar/mobile."); }} style={{ color: 'var(--saffron-primary)', textDecoration: 'none', fontWeight: 600 }}>
                  Forgot?
                </a>
              </div>

              <button type="submit" class="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                {authMode === 'login' ? `Login as ${activeTab.toUpperCase()}` : 'Create Free Account'}
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                {authMode === 'login' ? (
                  <span>Don't have an account? <button type="button" onClick={() => setAuthMode('register')} style={{ border: 'none', background: 'none', color: 'var(--saffron-primary)', fontWeight: 700, cursor: 'pointer' }}>Register now</button></span>
                ) : (
                  <span>Already registered? <button type="button" onClick={() => setAuthMode('login')} style={{ border: 'none', background: 'none', color: 'var(--saffron-primary)', fontWeight: 700, cursor: 'pointer' }}>Login here</button></span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
