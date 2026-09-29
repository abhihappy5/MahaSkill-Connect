import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Compass, 
  Layers, 
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { 
  studentProfile, 
  studentSkillMatrix, 
  studentEnrolledCourses,  
  studentCampusJobs 
} from '../../data/studentData';
import { trendingCareersData } from '../../data/careersData';
import { CareerPathwayModal } from '../CareerPathwayModal';

export function StudentDashboard({ onBackToHome, onOpenAssistant, onLogout, lang, setLang, t }) {
  // Navigation Tabs: 'dashboard' | 'explorer' | 'skills' | 'jobs'
  // ('assessment', 'courses', 'pathway' removed per request — see AdminDashboard-style removal notes)
  const [activeTab, setActiveTab] = useState('dashboard');

  // "Create Roadmap" launches the AI Career Pathway wizard modal
  const [isPathwayOpen, setIsPathwayOpen] = useState(false);

  // Minimal state to support the Jobs tab's apply action (was previously referencing undefined
  // appliedJobs/handleApplyCampusJob, which would have thrown at render time).
  const [appliedJobs, setAppliedJobs] = useState([]);
  const handleApplyCampusJob = (jobId) => {
    setAppliedJobs((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
  };

  const studentName = lang === 'mr' ? 'आदित्य पाटील' : (lang === 'hi' ? 'आदित्य पाटिल' : studentProfile.name);

  // Localized Profile Information
  const profileStream = lang === 'mr' 
    ? "इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स अभियांत्रिकी पदविका" 
    : (lang === 'hi' ? "इलेक्ट्रिकल और इलेक्ट्रॉनिक्स इंजीनियरिंग डिप्लोमा" : studentProfile.stream);

  const profileInstitution = lang === 'mr' 
    ? "शासकीय तंत्रनिकेतन, पुणे" 
    : (lang === 'hi' ? "शासकीय पॉलिटेक्निक, पुणे" : studentProfile.institution);

  const profileTargetCareer = lang === 'mr' 
    ? "औद्योगिक ऑटोमेशन व रोबोटिक्स विशेषज्ञ" 
    : (lang === 'hi' ? "औद्योगिक स्वचालन एवं रोबोटिक्स विशेषज्ञ" : studentProfile.targetCareer);

  const profileTargetDistrict = lang === 'mr' 
    ? "पुणे / चाकण एमआयडीसी" 
    : (lang === 'hi' ? "पुणे / चाकण औद्योगिक क्षेत्र" : studentProfile.targetDistrict);

  return (
    <div className="student-wrapper">
      {/* Student Top Sticky Subnavigation */}
      <div className="student-subnav">
        <div className="container-wide">
          <div className="student-subnav-inner">

            {/* Brand Logo - click to return to the public homepage */}
            <button
              type="button"
              className="student-logo-link"
              onClick={onBackToHome}
              aria-label={t.backToHome || 'Back to homepage'}
              title={t.backToHome || 'Back to homepage'}
            >
              <div className="student-logo-badge">M</div>
              <div className="student-logo-text">
                <div className="student-logo-brand">
                  MahaSkill <span>Connect</span>
                </div>
                <div className="student-logo-tagline">
                  {t.tagline || 'Skills for today. Careers for tomorrow.'}
                </div>
              </div>
            </button>

            <div className="student-subnav-divider" aria-hidden="true"></div>

            <div className="student-nav-tabs">
              {[
                { id: 'dashboard', label: t.stuTabDashboard || (lang === 'mr' ? 'डॅशबोर्ड' : (lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard')), icon: GraduationCap },
                { id: 'explorer', label: t.stuTabExplorer || (lang === 'mr' ? 'करिअर शोध' : (lang === 'hi' ? 'करियर एक्सप्लोरर' : 'Career Explorer')), icon: Compass },
                { id: 'skills', label: t.stuTabSkills || (lang === 'mr' ? 'माझी कौशल्ये' : (lang === 'hi' ? 'मेरे कौशल' : 'My Skills')), icon: Layers },
                { id: 'jobs', label: t.stuTabJobs || (lang === 'mr' ? 'कॅम्पस नोकऱ्या' : (lang === 'hi' ? 'कैंपस नौकरियां' : 'Jobs')), icon: Briefcase }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`student-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right side: profile avatar + Logout (same red treatment as the Admin Cockpit) */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                className="portal-user-avatar"
                title={studentName}
                aria-label="Profile"
              >
                {studentProfile.avatar}
              </button>

              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={onLogout}
                title={lang === 'mr' ? 'लॉगआउट' : (lang === 'hi' ? 'लॉगआउट' : 'Logout')}
                aria-label="Logout"
                style={{
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#dc2626',
                  borderColor: '#fca5a5',
                  background: '#fef2f2',
                  fontWeight: 700,
                  fontSize: '0.8rem'
                }}
              >
                <LogOut size={14} />
                <span>{lang === 'mr' ? 'लॉगआउट' : (lang === 'hi' ? 'लॉगआउट' : 'Logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide" style={{ marginTop: '16px' }}>
        
        {/* ================= 1. STUDENT DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Student Profile Hero Card */}
            <div className="student-hero-card">
              <div className="student-profile-flex">
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div className="student-avatar-box">
                    {studentProfile.avatar}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                        {studentName}
                      </h2>
                      <span style={{ background: '#ecfdf5', color: 'var(--success-dark)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.74rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ShieldCheck size={13} /> {t.digiLockerVerified || 'DigiLocker Verified'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '4px' }}>
                      {profileStream} • {profileInstitution}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--saffron-primary)', fontWeight: 700, marginTop: '2px' }}>
                      {t.targetLbl || 'Target'}: {profileTargetCareer} ({profileTargetDistrict})
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPathwayOpen(true)}
                  className="btn btn-primary"
                  style={{ flexShrink: 0 }}
                >
                  <Compass size={16} />
                  {t.createRoadmap || 'Create Roadmap'}
                </button>
              </div>

              {/* 4 Stat Badges */}
              <div className="student-quick-stats">
                <div className="student-stat-pill">
                  <span className="student-stat-pill-lbl">{t.careerMatchLbl || 'Career Match'}</span>
                  <span className="student-stat-pill-val" style={{ color: '#4ade80' }}>
                    {studentProfile.careerMatchScore}%
                  </span>
                </div>
                <div className="student-stat-pill">
                  <span className="student-stat-pill-lbl">{t.learningStreakLbl || 'Learning Streak'}</span>
                  <span className="student-stat-pill-val" style={{ color: '#fb923c' }}>
                    🔥 {studentProfile.learningStreak} {lang === 'mr' ? 'दिवस' : (lang === 'hi' ? 'दिन' : 'Days')}
                  </span>
                </div>
                <div className="student-stat-pill">
                  <span className="student-stat-pill-lbl">{t.activeCoursesLbl || 'Active Courses'}</span>
                  <span className="student-stat-pill-val">
                    {t.inProgressCount || '3 In Progress'}
                  </span>
                </div>
                <div className="student-stat-pill">
                  <span className="student-stat-pill-lbl">{t.skillCoinsLbl || 'Skill Coins'}</span>
                  <span className="student-stat-pill-val" style={{ color: '#facc15' }}>
                    🪙 {studentProfile.coinsEarned}
                  </span>
                </div>
              </div>
            </div>

            {/* In-Progress Course & NAPS Stipend Banner Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
              {/* Primary Active Course (read-only summary — the "Resume Lab" action pointed at the
                  now-removed Courses tab, so it's been dropped along with that link) */}
              <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', padding: '24px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={20} style={{ color: 'var(--saffron-primary)' }} />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--navy-deep)' }}>
                      {t.inProgressCourseLbl || 'Current In-Progress Course'}
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--saffron-primary)', fontWeight: 700, background: 'var(--saffron-light)', padding: '3px 10px', borderRadius: '12px' }}>
                    {studentEnrolledCourses[0].progress}% {t.completedLbl || 'Completed'}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                  {lang === 'mr' ? 'प्रगत औद्योगिक ऑटोमेशन व रोबोटिक्स (उद्योग ४.०)' : (lang === 'hi' ? 'उन्नत औद्योगिक स्वचालन एवं रोबोटिक्स (उद्योग ४.०)' : studentEnrolledCourses[0].title)}
                </h4>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  {lang === 'mr' ? 'इंडो-जर्मन टूल रूम (IGTR) व शासकीय आयटीआय पुणे' : (lang === 'hi' ? 'इंडो-जर्मन टूल रूम (IGTR) एवं सरकारी आईटीआई पुणे' : studentEnrolledCourses[0].provider)} • {lang === 'mr' ? 'प्रशिक्षक' : (lang === 'hi' ? 'प्रशिक्षक' : 'Instructor')}: {studentEnrolledCourses[0].instructor}
                </div>

                <div className="course-progress-bar-wrap">
                  <div className="course-progress-bar-fill" style={{ width: `${studentEnrolledCourses[0].progress}%` }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  <span>{t.completedModules || 'Completed'} {studentEnrolledCourses[0].completedModules} / {studentEnrolledCourses[0].totalModules} {t.modulesLbl || 'Modules'}</span>
                  <span>{studentEnrolledCourses[0].hoursCompleted} {t.hoursLbl || 'hrs'} / {studentEnrolledCourses[0].totalHours} {t.hoursLbl || 'hrs'}</span>
                </div>

                <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginTop: '16px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t.nextMilestoneLbl || 'Next Milestone'}</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-deep)' }}>
                    {lang === 'mr' ? 'मॉड्यूल १०: ६-अक्षीय रोबोटिक आर्म टीच पेंडंट प्रोग्रामिंग' : (lang === 'hi' ? 'मॉड्यूल १०: ६-अक्षीय रोबोटिक आर्म टीच पेंडेंट प्रोग्रामिंग' : studentEnrolledCourses[0].nextMilestone)}
                  </div>
                </div>
              </div>

              {/* Maharashtra Govt DBT & NAPS Stipend Alert */}
              <div style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)', borderRadius: 'var(--radius-xl)', padding: '24px', border: '1px solid #a7f3d0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success-dark)', fontWeight: 800, fontSize: '0.9rem', marginBottom: '8px' }}>
                    <ShieldCheck size={18} />
                    <span>{t.napsStipendActiveLbl || 'NAPS DBT Stipend Active'}</span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success-dark)', marginBottom: '6px' }}>
                    ₹12,000 {t.perMonth || '/ mo'}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    {t.napsStipendDesc || 'Under Maharashtra Kaushalya Setu & NAPS, you are verified for monthly Direct Benefit Transfer during industrial apprenticeship.'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('jobs')}
                  className="btn btn-success btn-sm"
                  style={{ marginTop: '16px' }}
                >
                  {t.viewApprenticeshipOpenings || 'View Apprenticeship Openings'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. CAREER EXPLORER ================= */}
        {activeTab === 'explorer' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                {t.highGrowthExplorerTitle || 'High-Growth Career Explorer'}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {t.highGrowthExplorerSubtitle || 'Explore live career paths with real-time employer demand, salary trajectories, and district clusters across Maharashtra.'}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
              {trendingCareersData.map((career) => (
                <div key={career.id} className="career-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.72rem', background: 'var(--navy-subtle)', color: 'var(--navy-deep)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      {lang === 'mr' ? career.sectorMr || career.sector : (lang === 'hi' ? career.sectorHi || career.sector : career.sector)}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--success-dark)', fontWeight: 800 }}>
                      {career.demandGrowth} {t.growthSuffix || 'Growth'}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '8px' }}>
                    {lang === 'mr' ? career.titleMr || career.title : (lang === 'hi' ? career.titleHi || career.title : career.title)}
                  </h4>

                  <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    {lang === 'mr' ? career.descriptionMr || career.description : (lang === 'hi' ? career.descriptionHi || career.description : career.description)}
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{t.salaryScaleLbl || 'Salary Scale'}</span>
                      <span style={{ color: 'var(--navy-deep)', fontWeight: 800 }}>{career.salaryRange}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{t.topHubsLbl || 'Top Hubs'}</span>
                      <span style={{ color: 'var(--saffron-primary)', fontWeight: 700 }}>{career.topDistricts.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 3. MY SKILLS MATRIX ================= */}
        {activeTab === 'skills' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                {t.verifiedSkillMatrixTitle || 'Verified Skill Matrix'}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {t.verifiedSkillMatrixSubtitle || 'State-accredited competency portfolio with cryptographic DVET & MSBTE verification.'}
              </div>
            </div>

            <div className="skill-matrix-grid">
              {studentSkillMatrix.map((item, idx) => {
                const localizedSkills = [
                  { 
                    skill: lang === 'mr' ? 'पीएलसी लॅडर लॉजिक (Siemens S7-1200)' : (lang === 'hi' ? 'पीएलसी लैडर लॉजिक (Siemens S7-1200)' : item.skill),
                    level: lang === 'mr' ? 'प्रगत' : (lang === 'hi' ? 'उन्नत' : item.level),
                    authority: lang === 'mr' ? 'इंडो-जर्मन टूल रूम (IGTR)' : (lang === 'hi' ? 'इंडो-जर्मन टूल रूम (IGTR)' : item.authority)
                  },
                  {
                    skill: lang === 'mr' ? 'SCADA आणि टेलिमेट्री (Wonderware/Delta)' : (lang === 'hi' ? 'SCADA एवं टेलीमेट्री (Wonderware/Delta)' : item.skill),
                    level: lang === 'mr' ? 'मध्यम' : (lang === 'hi' ? 'मध्यम' : item.level),
                    authority: lang === 'mr' ? 'MSBTE प्रमाणित' : (lang === 'hi' ? 'MSBTE प्रमाणित' : item.authority)
                  },
                  {
                    skill: lang === 'mr' ? 'औद्योगिक रोबोटिक्स (ABB/Fanuc आर्म)' : (lang === 'hi' ? 'औद्योगिक रोबोटिक्स (ABB/Fanuc आर्म)' : item.skill),
                    level: lang === 'mr' ? 'मध्यम' : (lang === 'hi' ? 'मध्यम' : item.level),
                    authority: lang === 'mr' ? 'सुरू आहे' : (lang === 'hi' ? 'प्रगति पर' : item.authority)
                  },
                  {
                    skill: lang === 'mr' ? 'इंडस्ट्रियल आयओटीसाठी पायथन' : (lang === 'hi' ? 'औद्योगिक आईओटी के लिए पायथन' : item.skill),
                    level: lang === 'mr' ? 'सुरुवातीचे' : (lang === 'hi' ? 'प्रारंभिक' : item.level),
                    authority: lang === 'mr' ? 'स्वयं-अध्ययन' : (lang === 'hi' ? 'स्वयं-अध्ययन' : item.authority)
                  },
                  {
                    skill: lang === 'mr' ? 'न्यूमॅटिक्स व इलेक्ट्रो-हायड्रोलिक्स' : (lang === 'hi' ? 'न्यूमेटिक्स एवं इलेक्ट्रो-हाइड्रोलिक्स' : item.skill),
                    level: lang === 'mr' ? 'प्रगत' : (lang === 'hi' ? 'उन्नत' : item.level),
                    authority: lang === 'mr' ? 'शासकीय आयटीआय औंध' : (lang === 'hi' ? 'सरकारी आईटीआई औंध' : item.authority)
                  },
                  {
                    skill: lang === 'mr' ? 'इलेक्ट्रिक व्हेईकल सुरक्षा व हाय व्होल्टेज' : (lang === 'hi' ? 'इलेक्ट्रिक वाहन सुरक्षा एवं हाई वोल्टेज' : item.skill),
                    level: lang === 'mr' ? 'मध्यम' : (lang === 'hi' ? 'मध्यम' : item.level),
                    authority: lang === 'mr' ? 'ARAI मान्यताप्राप्त' : (lang === 'hi' ? 'ARAI मान्यता प्राप्त' : item.authority)
                  }
                ];
                const curSkill = localizedSkills[idx] || item;

                return (
                  <div key={idx} className="skill-matrix-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                        {curSkill.skill}
                      </h4>
                      {item.verified ? (
                        <span style={{ color: 'var(--success-dark)', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem', fontWeight: 700 }}>
                          <ShieldCheck size={14} /> {t.verifiedBadge || 'Verified'}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700 }}>
                          {t.selfPacedBadge || 'Self-Paced'}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      <span>{t.levelLbl || 'Level'}: <strong>{curSkill.level}</strong></span>
                      <span><strong>{item.score}%</strong></span>
                    </div>

                    <div className="course-progress-bar-wrap">
                      <div 
                        className="course-progress-bar-fill" 
                        style={{ 
                          width: `${item.score}%`,
                          background: item.score >= 80 ? 'var(--success-dark)' : (item.score >= 60 ? 'var(--saffron-primary)' : '#3b82f6')
                        }}
                      ></div>
                    </div>

                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                      {t.authorityLbl || 'Authority'}: {curSkill.authority}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= 4. CAMPUS JOBS & APPRENTICESHIPS ================= */}
        {activeTab === 'jobs' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                {t.campusJobsTitle || 'Campus Placements & NAPS Apprenticeships'}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {t.campusJobsSubtitle || 'Direct enterprise openings matching your diploma stream with guaranteed government stipend backing.'}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {studentCampusJobs.map((job, idx) => {
                const isApplied = appliedJobs.includes(job.id);
                const localizedJobTitles = [
                  lang === 'mr' ? 'कनिष्ठ ऑटोमेशन व रोबोटिक्स शिकाऊ उमेदवार' : (lang === 'hi' ? 'कनिष्ठ स्वचालन एवं रोबोटिक्स शिक्षु' : job.title),
                  lang === 'mr' ? 'ईव्ही बॅटरी असेंब्ली व गुणवत्ता प्रशिक्षणार्थी' : (lang === 'hi' ? 'ईवी बैटरी असेंबली एवं गुणवत्ता प्रशिक्षु' : job.title),
                  lang === 'mr' ? 'मेकाट्रॉनिक्स देखभाल प्रशिक्षणार्थी' : (lang === 'hi' ? 'मेकाट्रॉनिक्स रखरखाव प्रशिक्षु' : job.title)
                ];

                const localizedLocations = [
                  lang === 'mr' ? 'पुणे (चाकण प्लांट २)' : (lang === 'hi' ? 'पुणे (चाकण प्लांट २)' : job.location),
                  lang === 'mr' ? 'छत्रपती संभाजीनगर (वाळूज)' : (lang === 'hi' ? 'छत्रपति संभाजीनगर (वालुज)' : job.location),
                  lang === 'mr' ? 'पुणे (मुंढवा फोर्ज विभाग)' : (lang === 'hi' ? 'पुणे (मुंढवा फोर्ज डिवीजन)' : job.location)
                ];
                const localizedStipends = [
                  lang === 'mr' ? '₹१८,५००/महिना + ₹४,५०० शासकीय DBT' : (lang === 'hi' ? '₹१८,५००/माह + ₹४,५०० सरकारी DBT' : job.stipend),
                  lang === 'mr' ? '₹२१,०००/महिना + मोफत वाहतूक' : (lang === 'hi' ? '₹२१,०००/माह + निःशुल्क परिवहन' : job.stipend),
                  lang === 'mr' ? '₹२४,०००/महिना (प्रशिक्षणानंतर ₹३.६ लाख CTC)' : (lang === 'hi' ? '₹२४,०००/माह (प्रशिक्षणोपरांत ₹३.६ लाख CTC)' : job.stipend)
                ];
                const localizedDeadlines = [
                  lang === 'mr' ? '४ दिवसांत' : (lang === 'hi' ? '४ दिनों में' : job.deadline),
                  lang === 'mr' ? '७ दिवसांत' : (lang === 'hi' ? '७ दिनों में' : job.deadline),
                  lang === 'mr' ? '१० दिवसांत' : (lang === 'hi' ? '१० दिनों में' : job.deadline)
                ];

                return (
                  <div key={job.id} className="job-card-premium" style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.75rem', background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                            {job.type}
                          </span>
                          <span style={{ fontSize: '0.75rem', background: '#ecfdf5', color: 'var(--success-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                            {job.matchScore}% {t.careerMatchLbl || 'Match'}
                          </span>
                        </div>

                        <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '0 0 4px 0' }}>
                          {localizedJobTitles[idx] || job.title}
                        </h4>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          {job.company} • 📍 {localizedLocations[idx] || job.location}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--success-dark)' }}>
                          {localizedStipends[idx] || job.stipend}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 700, marginTop: '2px' }}>
                          ⏳ {lang === 'mr' ? 'अंतिम मुदत:' : (lang === 'hi' ? 'अंतिम तिथि:' : 'Deadline:')} {localizedDeadlines[idx] || job.deadline}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', margin: '14px 0' }}>
                      {job.requiredSkills.map((sk, sIdx) => (
                        <span key={sIdx} style={{ background: 'var(--bg-secondary)', color: 'var(--navy-deep)', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          {sk}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        👥 {job.interviewsScheduled} {t.candidatesInBatch || 'Candidates in current batch'}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleApplyCampusJob(job.id)}
                        className={`btn btn-sm ${isApplied ? 'btn-success' : 'btn-primary'}`}
                        disabled={isApplied}
                      >
                        {isApplied ? (t.applicationDispatched || '✓ Application Dispatched') : (t.oneClickCampusApply || '1-Click Campus Apply')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* AI Career Pathway Wizard — launched via "Create Roadmap" in the hero card */}
      <CareerPathwayModal
        isOpen={isPathwayOpen}
        onClose={() => setIsPathwayOpen(false)}
        onAskAI={(prompt) => {
          if (onOpenAssistant) onOpenAssistant(prompt);
        }}
        lang={lang}
        t={t}
        rolePreset="student"
      />
    </div>
  );
}