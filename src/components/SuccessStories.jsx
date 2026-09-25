import React from 'react';
import { 
  Award, 
  MapPin, 
  Building2, 
  Sparkles, 
  Quote, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-react';
import { successStoriesData } from '../data/successStoriesData';

export function SuccessStories({ t, lang }) {
  return (
    <section id="success-stories" className="success-stories-section" aria-label="Career Success Stories">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Award size={14} />
            {t.storiesTag}
          </span>
          <h2 className="section-title">{t.storiesTitle}</h2>
          <p className="section-subtitle">{t.storiesSubtitle}</p>
        </div>

        {/* Stories Grid */}
        <div className="stories-cards-grid">
          {successStoriesData.map((story) => {
            const currentName = lang === 'mr' ? story.nameMr : (lang === 'hi' ? story.nameHi : story.name);
            const currentDistrict = lang === 'mr' ? story.districtMr : (lang === 'hi' ? story.districtHi : story.district);
            const currentRole = lang === 'mr' ? story.roleMr : (lang === 'hi' ? story.roleHi : story.role);
            const currentCategory = lang === 'mr' ? story.categoryMr : (lang === 'hi' ? story.categoryHi : story.category);
            const currentQuote = lang === 'mr' ? story.quoteMr : (lang === 'hi' ? story.quoteHi : story.quote);

            return (
              <div key={story.id} className="story-card">
                <div>
                  {/* Header with Avatar & Name */}
                  <div className="story-header">
                    <div className="story-avatar">
                      {currentName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="story-name">
                        {currentName}
                      </h3>
                      <div className="story-district">
                        <MapPin size={12} style={{ display: 'inline', marginRight: '2px' }} />
                        {currentDistrict} {t.storyDistrictSuffix || 'District'}
                      </div>
                    </div>
                  </div>

                  {/* Role and Company */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--navy-deep)' }}>
                      {currentRole}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Building2 size={12} style={{ display: 'inline', marginRight: '3px' }} />
                      {story.company}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div style={{ marginBottom: '16px' }}>
                    <span className="badge badge-navy">
                      {currentCategory}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="story-quote">
                    "{currentQuote}"
                  </p>
                </div>

                {/* Footer with Salary Jump & Verified Gov Badge */}
                <div className="story-footer">
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {t.storyVerifiedPackage || 'Verified Package'}
                    </div>
                    <div className="salary-tag">{story.placedSalary}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 700 }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--success-green)' }} />
                    {t.storyGovtVerified || 'Govt Verified'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
