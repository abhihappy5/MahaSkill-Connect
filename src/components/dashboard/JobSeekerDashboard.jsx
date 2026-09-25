import React, { useState } from 'react';
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
  lang, 
  setLang, 
  t 
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  
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
    </div>
  );
}
