import React, { useState } from 'react';
import { RestartHeader } from './RestartHeader';
import { RestartWelcome } from './RestartWelcome';
import { RestartScoreCard } from './RestartScoreCard';
import { TransferableSkillsMap } from './TransferableSkillsMap';
import { RestartSkillGap } from './RestartSkillGap';
import { PersonalizedLearningPath } from './PersonalizedLearningPath';
import { RestartJobsOpportunities } from './RestartJobsOpportunities';
import { AiCareerCoach } from './AiCareerCoach';
import { RestartAssessmentModal } from './RestartAssessmentModal';

export function CareerRestartDashboard({ 
  onBackToHome, 
  onOpenAssistant, 
  lang, 
  setLang, 
  t 
}) {
  const [activeTab, setActiveTab] = useState('restart-home');
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div class="restart-wrapper">
      {/* Header */}
      <RestartHeader 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBackToHome={onBackToHome}
        onOpenAssistant={onOpenAssistant}
        lang={lang}
        setLang={setLang}
      />

      <div class="container-wide" style={{ marginTop: '16px' }}>
        {/* Welcome & Profile Summary */}
        <RestartWelcome 
          onStartAssessment={() => setIsAssessmentModalOpen(true)}
          onStartRestartPlan={() => setIsAssessmentModalOpen(true)}
          onTalkToAI={() => handleScrollToSection('section-ai-assistant')}
          lang={lang}
        />

        {/* Career Readiness Score & 4 Metrics */}
        <RestartScoreCard 
          onExploreTransferable={() => handleScrollToSection('section-career-paths')}
        />

        {/* Transferable Skills & Transition Map Pipeline */}
        <TransferableSkillsMap 
          onSelectCareerPath={(title) => {
            alert(`Selected Pathway: ${title}. Your learning schedule has been updated.`);
            handleScrollToSection('section-training');
          }}
        />

        {/* Skill Gap Analysis (Already Have vs Need to Learn) */}
        <RestartSkillGap 
          onEnrollCourse={(course) => alert(`Enrolled in ${course.domain} bridge course!`)}
        />

        {/* Personalized 5-Step Learning Path */}
        <PersonalizedLearningPath 
          onExploreJobs={() => handleScrollToSection('section-jobs')}
        />

        {/* Job Opportunities: Apply Today vs Unlock After Training */}
        <RestartJobsOpportunities 
          onApplyJob={(job) => alert(`Application submitted for ${job.title} at ${job.company}!`)}
        />

        {/* Prominent Conversational AI Career Coach */}
        <AiCareerCoach 
          lang={lang}
          setLang={setLang}
        />
      </div>

      {/* Assessment Modal */}
      <RestartAssessmentModal 
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        onGeneratedPlan={() => {
          handleScrollToSection('section-training');
        }}
      />
    </div>
  );
}
