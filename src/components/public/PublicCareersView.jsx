import React from 'react';
import { TrendingCareers } from '../TrendingCareers';
import { EmergingSkills } from '../EmergingSkills';

// Dedicated "Careers" page (routed from the header's Careers nav item). Previously
// TrendingCareers + EmergingSkills rendered inline on the homepage; they're now composed
// here instead, following the same pattern as PublicCoursesView / PublicJobsView.
export function PublicCareersView({ t, lang, onAskAI, externalFilter }) {
  return (
    <div className="public-careers-view">
      <TrendingCareers
        t={t}
        lang={lang}
        onAskAI={onAskAI}
        externalFilter={externalFilter}
      />
      <EmergingSkills
        t={t}
        lang={lang}
        onAskAI={onAskAI}
      />
    </div>
  );
}