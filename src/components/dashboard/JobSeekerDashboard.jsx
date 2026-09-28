import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { CandidateOverview } from './CandidateOverview';
import { JobSearchBar } from './JobSearchBar';
import { AiJobMatches } from './AiJobMatches';
import { SkillGapAnalysis } from './SkillGapAnalysis';
import { CourseRecommendations } from './CourseRecommendations';
import { ApplicationTracker } from './ApplicationTracker';
import { JobAiModal } from './JobAiModal';
import { mockJobsData, mockApplications } from '../../data/jobSeekerData';

export function JobSeekerDashboard({ 
  onBackToHome, 
  onOpenAssistant, 
  onLogout,
  lang, 
  setLang, 
  t 
}) {
  // 'dashboard' tab removed per request — Find Jobs is now the landing tab
  const [activeTab, setActiveTab] = useState('find-jobs');
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');
  const [expFilter, setExpFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('');

  // Applications & Saved jobs state
  const [appliedJobIds, setAppliedJobIds] = useState(['job-101', 'job-102']);
  const [savedJobIds, setSavedJobIds] = useState(['job-103']);
  const [applications, setApplications] = useState(mockApplications);

  // Contextual Job AI Modal State
  const [selectedJobForAI, setSelectedJobForAI] = useState(null);

  // "What job are you looking for?" is now asked once (first visit only, via
  // localStorage) instead of always showing as a headline in the search bar.
  // It can be revisited anytime via the Account Settings icon or the profile
  // avatar in DashboardHeader.jsx.
  const [isJobPrefModalOpen, setIsJobPrefModalOpen] = useState(false);
  const [isFirstVisitPrompt, setIsFirstVisitPrompt] = useState(false);
  const [jobPrefDraft, setJobPrefDraft] = useState('');

  useEffect(() => {
    const alreadyAsked = window.localStorage.getItem('msc_job_search_asked');
    const savedPref = window.localStorage.getItem('msc_job_search_pref');
    if (!alreadyAsked) {
      setIsFirstVisitPrompt(true);
      setIsJobPrefModalOpen(true);
    } else if (savedPref) {
      setSearchQuery(savedPref);
    }
    // Run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenSettings = () => {
    setJobPrefDraft(searchQuery);
    setIsFirstVisitPrompt(false);
    setIsJobPrefModalOpen(true);
  };

  const handleCloseJobPrefModal = () => {
    window.localStorage.setItem('msc_job_search_asked', 'true');
    setIsJobPrefModalOpen(false);
    setIsFirstVisitPrompt(false);
  };

  const handleSaveJobPref = () => {
    window.localStorage.setItem('msc_job_search_asked', 'true');
    window.localStorage.setItem('msc_job_search_pref', jobPrefDraft);
    setSearchQuery(jobPrefDraft);
    setIsJobPrefModalOpen(false);
    setIsFirstVisitPrompt(false);
    handleScrollToSection('section-ai-matches');
  };

  // Filter Jobs
  const filteredJobs = mockJobsData.filter((job) => {
    const matchesQuery = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation = !locationFilter || 
      job.location.toLowerCase().includes(locationFilter.toLowerCase()) ||
      job.district.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesIndustry = !industryFilter || industryFilter === 'All Industries' ||
      job.industry.toLowerCase().includes(industryFilter.toLowerCase());

    const matchesSkill = !skillFilter || skillFilter === 'All Skills' ||
      job.requiredSkills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()));

    const matchesWorkType = !workTypeFilter || workTypeFilter === 'All Work Types' ||
      job.workType.toLowerCase().includes(workTypeFilter.toLowerCase());

    return matchesQuery && matchesLocation && matchesIndustry && matchesSkill && matchesWorkType;
  });

  const handleApplyJob = (job) => {
    if (!appliedJobIds.includes(job.id)) {
      setAppliedJobIds(prev => [...prev, job.id]);
      
      const newApp = {
        id: `app-${Date.now()}`,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        appliedDate: "Just now",
        status: "Applied",
        stageIndex: 1,
        interviewDate: "Under Review",
        interviewMode: "Application Dispatched",
        recruiterNote: "Verified DigiLocker credentials attached. Match score 92%.",
        salary: job.salary
      };
      setApplications(prev => [newApp, ...prev]);
    }
  };

  const handleToggleSaveJob = (jobId) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setSalaryFilter('');
    setExpFilter('');
    setIndustryFilter('');
    setSkillFilter('');
    setWorkTypeFilter('');
  };

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div class="dashboard-wrapper">
      {/* Dashboard Sub-navigation */}
      <DashboardHeader 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBackToHome={onBackToHome}
        onOpenAssistant={onOpenAssistant}
        onOpenSettings={handleOpenSettings}
        onLogout={onLogout}
        lang={lang}
        setLang={setLang}
      />

      <div className="container-wide" style={{ marginTop: '16px' }}>
        {/* Candidate Welcome Overview */}
        <CandidateOverview 
          lang={lang}
          onOpenSkillGap={() => handleScrollToSection('section-skill-gap')}
          onFindJobs={() => handleScrollToSection('section-find-jobs')}
        />

        {/* Job Search Engine & 6 Filters */}
        <JobSearchBar 
          lang={lang}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          salaryFilter={salaryFilter}
          setSalaryFilter={setSalaryFilter}
          expFilter={expFilter}
          setExpFilter={setExpFilter}
          industryFilter={industryFilter}
          setIndustryFilter={setIndustryFilter}
          skillFilter={skillFilter}
          setSkillFilter={setSkillFilter}
          workTypeFilter={workTypeFilter}
          setWorkTypeFilter={setWorkTypeFilter}
          onSearchSubmit={() => handleScrollToSection('section-ai-matches')}
          onResetFilters={handleResetFilters}
        />

        {/* AI Job Match Cards (92%, 85%, 78%) */}
        <AiJobMatches 
          lang={lang}
          jobs={filteredJobs}
          onAskAIJob={(job) => setSelectedJobForAI(job)}
          onApplyJob={handleApplyJob}
          appliedJobIds={appliedJobIds}
          savedJobIds={savedJobIds}
          onToggleSaveJob={handleToggleSaveJob}
        />

        {/* Skill Gap Analysis ("Why aren't you matching 100%?") */}
        <SkillGapAnalysis 
          lang={lang}
          onCloseSkillGap={() => handleScrollToSection('section-courses')}
          onExploreCourses={() => handleScrollToSection('section-courses')}
        />

        {/* Course Recommendations */}
        <CourseRecommendations 
          lang={lang}
          onEnrollCourse={(course) => alert(`Enrolled in ${course.title} under Pramod Mahajan Kaushalya Yojana! Verification token dispatched to your SMS.`)}
        />

        {/* Application Tracker (4-Stage Pipeline) */}
        <ApplicationTracker 
          lang={lang}
          applications={applications}
        />
      </div>

      {/* Contextual Job AI Advisor Modal */}
      {selectedJobForAI && (
        <JobAiModal 
          job={selectedJobForAI}
          isOpen={Boolean(selectedJobForAI)}
          onClose={() => setSelectedJobForAI(null)}
          lang={lang}
        />
      )}

      {/* "What job are you looking for?" — asked once on first visit, and
          reopenable anytime via Account Settings / the profile avatar */}
      {isJobPrefModalOpen && (
        <div class="modal-overlay" onClick={handleCloseJobPrefModal} role="dialog" aria-modal="true">
          <div class="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div class="modal-header">
              <h3 class="modal-title">
                {lang === 'mr' ? 'तुम्ही कोणती नोकरी शोधत आहात?' : (lang === 'hi' ? 'आप कौन सी नौकरी खोज रहे हैं?' : 'What job are you looking for?')}
              </h3>
              <button class="modal-close-btn" onClick={handleCloseJobPrefModal} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            <div class="modal-body">
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                {isFirstVisitPrompt
                  ? (lang === 'mr' ? 'हे तुम्हाला लगेच सर्वोत्तम जुळण्या दाखवण्यास मदत करेल. तुम्ही हे नंतर कधीही प्रोफाइल सेटिंग्जमधून बदलू शकता.' : (lang === 'hi' ? 'इससे हमें आपको तुरंत सर्वश्रेष्ठ मैच दिखाने में मदद मिलेगी। आप इसे बाद में कभी भी प्रोफ़ाइल सेटिंग्स से बदल सकते हैं।' : "This helps us show you the best matches right away. You can change this anytime from your profile settings."))
                  : (lang === 'mr' ? 'तुमचे नोकरी शोध प्राधान्य अद्यतनित करा.' : (lang === 'hi' ? 'अपनी नौकरी खोज प्राथमिकता अपडेट करें।' : 'Update your job search preference.'))
                }
              </p>
              <input
                type="text"
                style={{
                  width: '100%',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
                placeholder={lang === 'mr' ? "उदा. ईव्ही तंत्रज्ञ, पीएलसी प्रोग्रामर..." : (lang === 'hi' ? "जैसे EV तकनीशियन, PLC प्रोग्रामर..." : "e.g. EV Technician, PLC Programmer...")}
                value={jobPrefDraft}
                onChange={(e) => setJobPrefDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveJobPref(); }}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                {isFirstVisitPrompt && (
                  <button type="button" class="btn btn-outline" style={{ flex: 1 }} onClick={handleCloseJobPrefModal}>
                    {lang === 'mr' ? 'नंतर' : (lang === 'hi' ? 'बाद में' : 'Skip for now')}
                  </button>
                )}
                <button type="button" class="btn btn-primary" style={{ flex: 1.4 }} onClick={handleSaveJobPref}>
                  {lang === 'mr' ? 'जतन करा व शोधा' : (lang === 'hi' ? 'सहेजें और खोजें' : 'Save & Search')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}