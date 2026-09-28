import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  MapPin,
  Sparkles,
  KeyRound
} from 'lucide-react';

export const DUMMY_USERS = {
  candidate: {
    name: "Rahul Patil",
    email: "rahul.patil@jobseeker.in",
    phone: "9876543210",
    role: "candidate",
    roleLabel: "Job Seeker",
    district: "Pune",
    password: "password123",
    avatar: "RP",
    digilockerVerified: true,
    qualification: "Diploma in Mechanical Engg (MSBTE)",
    matchingJobs: 14
  },
  student: {
    name: "Rohit Shinde",
    email: "rohit.shinde@student.gov.in",
    phone: "9822012345",
    role: "student",
    roleLabel: "Student",
    district: "Kolhapur",
    password: "password123",
    avatar: "RS",
    digilockerVerified: true,
    targetTrade: "EV Powertrain & Battery Diagnostics",
    enrolledCourses: 2
  },
  employer: {
    name: "Tata Motors MSME Supply Hub",
    email: "contact@tata-auto.com",
    phone: "9819001122",
    role: "employer",
    roleLabel: "Employer / MSME",
    district: "Pune",
    password: "password123",
    avatar: "TM",
    digilockerVerified: true,
    activeVacancies: 38
  },
  admin: {
    name: "Dr. Vijay Patil, IAS",
    email: "admin@mahaskill.gov.in",
    phone: "9820011223",
    role: "admin",
    roleLabel: "Govt Admin",
    district: "Mumbai",
    password: "password123",
    avatar: "VP",
    digilockerVerified: true,
    department: "DVET / State Skill Mission"
  }
};

const MAHARASHTRA_DISTRICTS = [
  'Ahmednagar', 'Akola', 'Amravati', 'Beed', 'Bhandara', 'Buldhana',
  'Chandrapur', 'Chhatrapati Sambhajinagar', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli',
  'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban',
  'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Dharashiv (Osmanabad)', 'Palghar',
  'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
  'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
];

export function AuthModal({ isOpen, mode = 'login', onClose, onLoginSuccess, t = {} }) {
  const [activeTab, setActiveTab] = useState('candidate'); // 'candidate' | 'student' | 'employer' | 'admin'
  const [authMode, setAuthMode] = useState(mode); // 'login' | 'register'
  
  // Login Form States
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regDistrict, setRegDistrict] = useState('Pune');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Status & Feedback States
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedRole, setCopiedRole] = useState(null);

  // Sync mode when modal opens or mode prop changes
  useEffect(() => {
    if (isOpen) {
      setAuthMode(mode || 'login');
      setErrorMessage('');
      setSuccessNotice('');
      setIsLoading(false);
      setOtpSent(false);
      // Auto-fill default dummy user for current tab
      const dummy = DUMMY_USERS[activeTab] || DUMMY_USERS.candidate;
      setIdentifier(dummy.email);
      setPassword(dummy.password);
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const roles = [
    { key: 'candidate', label: 'Job Seeker', icon: User, badge: 'Job Match' },
    { key: 'student', label: 'Student', icon: GraduationCap, badge: 'ITI / Skills' },
    { key: 'employer', label: 'Employer / MSME', icon: Building2, badge: 'Hire Talent' },
    { key: 'admin', label: 'Govt Admin', icon: ShieldCheck, badge: 'DVET Cockpit' }
  ];

  const handleTabChange = (roleKey) => {
    setActiveTab(roleKey);
    setErrorMessage('');
    const dummy = DUMMY_USERS[roleKey];
    if (dummy && authMode === 'login') {
      setIdentifier(dummy.email);
      setPassword(dummy.password);
    }
  };

  const handleAutoFillDummy = (roleKey) => {
    setActiveTab(roleKey);
    const dummy = DUMMY_USERS[roleKey];
    if (dummy) {
      setIdentifier(dummy.email);
      setPassword(dummy.password);
      setCopiedRole(roleKey);
      setTimeout(() => setCopiedRole(null), 2000);
    }
  };

  const handleSendOtp = () => {
    if (!identifier.trim()) {
      setErrorMessage('Please enter your Mobile Number or Aadhaar ID first.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setOtpCode('4285'); // Pre-fill mock OTP for smooth testing
    }, 400);
  };

  const handleQuickDemoLogin = (roleKey) => {
    setActiveTab(roleKey);
    setErrorMessage('');
    setIsLoading(true);
    const dummyUser = DUMMY_USERS[roleKey] || {
      name: `${roleKey.toUpperCase()} User`,
      email: `${roleKey}@mahaskill.gov.in`,
      role: roleKey,
      roleLabel: roleKey.charAt(0).toUpperCase() + roleKey.slice(1),
      district: 'Pune',
      avatar: roleKey.slice(0, 2).toUpperCase(),
      digilockerVerified: true
    };

    setTimeout(() => {
      setIsLoading(false);
      setSuccessNotice(`Authenticated as ${dummyUser.name} (${dummyUser.roleLabel}). Launching portal...`);
      localStorage.setItem('mahaskill_user', JSON.stringify(dummyUser));
      setTimeout(() => {
        setSuccessNotice('');
        onClose();
        if (onLoginSuccess) onLoginSuccess(roleKey, dummyUser);
      }, 700);
    }, 400);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Please enter your Email, Mobile, or Official ID.');
      return;
    }

    if (loginMethod === 'password' && !password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    if (loginMethod === 'otp' && (!otpSent || !otpCode)) {
      setErrorMessage('Please generate and enter the 4-digit verification OTP.');
      return;
    }

    setIsLoading(true);
    const matchedDummy = Object.values(DUMMY_USERS).find(u => 
      u.email.toLowerCase() === identifier.trim().toLowerCase() || 
      u.phone === identifier.trim()
    );

    const loggedInUser = matchedDummy || {
      name: identifier.includes('@') ? identifier.split('@')[0].replace('.', ' ').toUpperCase() : `User (${identifier})`,
      email: identifier,
      role: activeTab,
      roleLabel: roles.find(r => r.key === activeTab)?.label || activeTab,
      district: 'Pune',
      avatar: identifier.slice(0, 2).toUpperCase(),
      digilockerVerified: true
    };

    setTimeout(() => {
      setIsLoading(false);
      setSuccessNotice(`Welcome back, ${loggedInUser.name}! Logging in as ${loggedInUser.roleLabel}...`);
      localStorage.setItem('mahaskill_user', JSON.stringify(loggedInUser));
      setTimeout(() => {
        setSuccessNotice('');
        onClose();
        if (onLoginSuccess) onLoginSuccess(loggedInUser.role, loggedInUser);
      }, 700);
    }, 500);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }
    if (!termsAccepted) {
      setErrorMessage('Please accept the Terms of Service and Data Consent.');
      return;
    }

    setIsLoading(true);
    const newUser = {
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim() || '9876543210',
      role: activeTab,
      roleLabel: roles.find(r => r.key === activeTab)?.label || activeTab,
      district: regDistrict,
      avatar: regName.trim().split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      digilockerVerified: true,
      registeredAt: new Date().toISOString()
    };

    setTimeout(() => {
      setIsLoading(false);
      setSuccessNotice(`Account created successfully for ${newUser.name}! Redirecting to ${newUser.roleLabel} Portal...`);
      localStorage.setItem('mahaskill_user', JSON.stringify(newUser));
      setTimeout(() => {
        setSuccessNotice('');
        onClose();
        if (onLoginSuccess) onLoginSuccess(newUser.role, newUser);
      }, 800);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-box" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '520px', 
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px', 
          overflow: 'hidden', 
          padding: 0,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
        }}
      >
        {/* Top Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0b192c 0%, #1e3e62 100%)',
          color: '#ffffff',
          padding: '16px 20px',
          position: 'relative',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{
              background: 'rgba(255, 107, 0, 0.25)',
              border: '1px solid #ff6b00',
              color: '#ff9e58',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Government of Maharashtra
            </span>
            <button 
              onClick={onClose} 
              aria-label="Close modal"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#ffffff',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 2px 0', color: '#ffffff' }}>
            {authMode === 'login' ? 'MahaSkill Portal Login' : 'Register on MahaSkill Connect'}
          </h3>
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8' }}>
            {authMode === 'login' 
              ? 'Access candidate matching, training admissions & labour intelligence' 
              : 'Create your verified account with DigiLocker-linked credentials'}
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${roles.length}, 1fr)`,
          gap: '2px',
          background: '#0f172a',
          padding: '4px',
          borderBottom: '1px solid #334155',
          flexShrink: 0
        }}>
          {roles.map((r) => {
            const Icon = r.icon;
            const isSelected = activeTab === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => handleTabChange(r.key)}
                style={{
                  border: 'none',
                  background: isSelected ? '#1e293b' : 'transparent',
                  color: isSelected ? '#38bdf8' : '#94a3b8',
                  padding: '6px 2px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  borderBottom: isSelected ? '2px solid #38bdf8' : '2px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={14} style={{ color: isSelected ? '#38bdf8' : '#64748b' }} />
                <span style={{ textAlign: 'center', lineHeight: 1.1 }}>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body with flex scroll and generous bottom padding */}
        <div style={{ 
          padding: '16px 22px 28px 22px', 
          flex: 1, 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          
          {/* Success Banner */}
          {successNotice ? (
            <div style={{
              textAlign: 'center',
              padding: '24px 16px',
              background: '#ecfdf5',
              borderRadius: '12px',
              border: '1px solid #a7f3d0',
              animation: 'fadeIn 0.3s ease'
            }}>
              <CheckCircle2 size={40} style={{ color: '#059669', margin: '0 auto 10px auto' }} />
              <div style={{ fontWeight: 800, color: '#065f46', fontSize: '1.05rem', marginBottom: '4px' }}>
                {successNotice}
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#047857' }}>
                Redirecting you to your authenticated workspace...
              </p>
            </div>
          ) : (
            <>
              {/* Error Message Alert */}
              {errorMessage && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  color: '#b91c1c',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  marginBottom: '14px'
                }}>
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1-Click Quick Walkthrough Test Credentials Bar */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '10px 12px',
                marginBottom: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.78rem', color: '#334155', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Sparkles size={14} style={{ color: '#eab308' }} />
                    Walkthrough Test Accounts (1-Click Fill):
                  </span>
                  {copiedRole && (
                    <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>
                      ✓ Auto-filled {DUMMY_USERS[copiedRole]?.name}!
                    </span>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {roles.map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => handleAutoFillDummy(r.key)}
                      style={{
                        background: activeTab === r.key ? '#e0f2fe' : '#ffffff',
                        border: activeTab === r.key ? '1px solid #38bdf8' : '1px solid #e2e8f0',
                        color: activeTab === r.key ? '#0369a1' : '#1e293b',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '4px 8px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>{r.label.split('/')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ================= LOGIN MODE ================= */}
              {authMode === 'login' ? (
                <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  
                  {/* Method toggle: Password vs OTP */}
                  <div style={{
                    display: 'flex',
                    background: '#f1f5f9',
                    padding: '3px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    <button
                      type="button"
                      onClick={() => { setLoginMethod('password'); setErrorMessage(''); }}
                      style={{
                        flex: 1,
                        padding: '6px',
                        border: 'none',
                        background: loginMethod === 'password' ? '#ffffff' : 'transparent',
                        color: loginMethod === 'password' ? '#0f172a' : '#64748b',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        boxShadow: loginMethod === 'password' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >
                      Password Login
                    </button>
                    <button
                      type="button"
                      onClick={() => { setLoginMethod('otp'); setErrorMessage(''); }}
                      style={{
                        flex: 1,
                        padding: '6px',
                        border: 'none',
                        background: loginMethod === 'otp' ? '#ffffff' : 'transparent',
                        color: loginMethod === 'otp' ? '#0f172a' : '#64748b',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        boxShadow: loginMethod === 'otp' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >
                      Mobile / Aadhaar OTP
                    </button>
                  </div>

                  {/* Identifier Input */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', marginBottom: '5px' }}>
                      {activeTab === 'candidate' ? 'Mobile No. / Aadhaar / Email' :
                       activeTab === 'student' ? 'Student PRN / Mobile / Email' :
                       activeTab === 'employer' ? 'Company CIN / GSTIN / Work Email' :
                       'Officer Email / Government Employee ID'}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text"
                        required
                        placeholder={DUMMY_USERS[activeTab]?.email || 'user@mahaskill.gov.in'}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.9rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    </div>
                  </div>

                  {/* Password Login Fields */}
                  {loginMethod === 'password' ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e293b' }}>
                          Password / PIN (Default: <code>password123</code>)
                        </label>
                        <a 
                          href="#forgot" 
                          onClick={(e) => { 
                            e.preventDefault(); 
                            alert("A password reset link & OTP has been dispatched to your registered credentials."); 
                          }} 
                          style={{ color: '#d97706', textDecoration: 'none', fontWeight: 700, fontSize: '0.78rem' }}
                        >
                          Forgot?
                        </a>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 36px 10px 36px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.9rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                        <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer'
                          }}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* OTP Login Fields */
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', marginBottom: '5px' }}>
                        Verification Code (OTP)
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type="text"
                          maxLength={6}
                          placeholder="4-digit OTP"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          disabled={!otpSent}
                          style={{
                            flex: 1,
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.95rem',
                            letterSpacing: '2px',
                            fontWeight: 700,
                            textAlign: 'center',
                            background: otpSent ? '#ffffff' : '#f1f5f9',
                            outline: 'none'
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={isLoading}
                          style={{
                            background: otpSent ? '#f1f5f9' : '#e0f2fe',
                            color: otpSent ? '#475569' : '#0369a1',
                            border: '1px solid #bae6fd',
                            borderRadius: '8px',
                            padding: '0 14px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {otpSent ? 'Resend OTP' : 'Send OTP'}
                        </button>
                      </div>
                      {otpSent && (
                        <span style={{ fontSize: '0.74rem', color: '#059669', display: 'block', marginTop: '4px' }}>
                          ✓ OTP sent! Auto-filled demo OTP <strong>4285</strong>.
                        </span>
                      )}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#475569' }}>
                      <input type="checkbox" defaultChecked /> Remember login on this device
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'linear-gradient(135deg, #ff6b00 0%, #ea580c 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: isLoading ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(255, 107, 0, 0.25)'
                    }}
                  >
                    <span>{isLoading ? 'Verifying Credentials...' : `Sign in as ${roles.find(r => r.key === activeTab)?.label}`}</span>
                    <ArrowRight size={16} />
                  </button>

                  <div style={{ textAlign: 'center', fontSize: '0.84rem', color: '#64748b', marginTop: '4px' }}>
                    Don't have an account?{' '}
                    <button 
                      type="button" 
                      onClick={() => { setAuthMode('register'); setErrorMessage(''); }}
                      style={{ border: 'none', background: 'none', color: '#d97706', fontWeight: 800, cursor: 'pointer' }}
                    >
                      Register now
                    </button>
                  </div>
                </form>
              ) : (
                
                /* ================= REGISTER MODE ================= */
                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                      Full Name (as per Aadhaar / Official ID) *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Ramesh Sakharam Patil"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px 9px 34px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.88rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <User size={15} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    </div>
                  </div>

                  {/* Email & Phone in 2 columns */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                        Email Address *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="email"
                          required
                          placeholder="name@email.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 10px 9px 32px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.85rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                        <Mail size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                        Mobile Number *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="9876543210"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 10px 9px 32px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.85rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                        <Phone size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      </div>
                    </div>
                  </div>

                  {/* District & Persona Role */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                        Maharashtra District *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <select
                          value={regDistrict}
                          onChange={(e) => setRegDistrict(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 10px 9px 32px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.85rem',
                            outline: 'none',
                            background: '#ffffff',
                            boxSizing: 'border-box'
                          }}
                        >
                          {MAHARASHTRA_DISTRICTS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        <MapPin size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                        Registering As *
                      </label>
                      <select
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 10px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          outline: 'none',
                          background: '#ffffff',
                          boxSizing: 'border-box',
                          fontWeight: 600
                        }}
                      >
                        <option value="candidate">Job Seeker / Trainee</option>
                        <option value="student">Student / Youth</option>
                        <option value="employer">Employer / MSME</option>
                      </select>
                    </div>
                  </div>

                  {/* Password & Confirm Password */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                        Create Password *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          placeholder="Min 6 chars"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 30px 9px 30px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.85rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                        <Lock size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer'
                          }}
                        >
                          {showRegPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                        Confirm Password *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          placeholder="Repeat password"
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 10px 9px 30px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.85rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                        <KeyRound size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      </div>
                    </div>
                  </div>

                  {/* DigiLocker & Consent Checkbox */}
                  <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={termsAccepted} 
                        onChange={(e) => setTermsAccepted(e.target.checked)} 
                        style={{ marginTop: '2px' }}
                      />
                      <span>
                        I consent to share verified credentials under the <strong>Government of Maharashtra DVET & MSSDS</strong> digital initiatives.
                      </span>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'linear-gradient(135deg, #ff6b00 0%, #ea580c 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: isLoading ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginTop: '4px',
                      boxShadow: '0 4px 12px rgba(255, 107, 0, 0.25)'
                    }}
                  >
                    <span>{isLoading ? 'Creating Your Profile...' : 'Complete Free Registration'}</span>
                    <ArrowRight size={16} />
                  </button>

                  <div style={{ textAlign: 'center', fontSize: '0.84rem', color: '#64748b' }}>
                    Already have an account?{' '}
                    <button 
                      type="button" 
                      onClick={() => { setAuthMode('login'); setErrorMessage(''); }}
                      style={{ border: 'none', background: 'none', color: '#d97706', fontWeight: 800, cursor: 'pointer' }}
                    >
                      Login here
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}