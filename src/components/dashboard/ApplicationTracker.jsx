import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  MapPin, 
  FileText,
  Video,
  Award,
  Sparkles
} from 'lucide-react';
import { mockApplications } from '../../data/jobSeekerData';

export function ApplicationTracker({ applications = mockApplications }) {
  const [selectedStage, setSelectedStage] = useState('all'); // 'all' | 'Applied' | 'Shortlisted' | 'Interview' | 'Selected'

  const stages = [
    { key: 'all', label: 'All Applications', count: applications.length },
    { key: 'Applied', label: 'Applied', count: applications.filter(a => a.status === 'Applied').length },
    { key: 'Shortlisted', label: 'Shortlisted', count: applications.filter(a => a.status === 'Shortlisted').length },
    { key: 'Interview', label: 'Interview', count: applications.filter(a => a.status === 'Interview').length },
    { key: 'Selected', label: 'Selected', count: applications.filter(a => a.status === 'Selected').length }
  ];

  const filteredApps = selectedStage === 'all' 
    ? applications 
    : applications.filter(a => a.status === selectedStage);

  return (
    <div class="app-tracker-section" id="section-applications" role="region" aria-label="Application Tracker">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span class="section-tag">
            <Briefcase size={14} />
            Live Candidate Pipeline
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
            Application Tracker
          </h2>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Automated State DigiLocker & Placement Tracking
        </div>
      </div>

      {/* 4-Stage Stepper / Filter Tabs */}
      <div class="pipeline-stepper-bar" role="tablist">
        {stages.map((stage) => {
          const isActive = selectedStage === stage.key;
          return (
            <button
              key={stage.key}
              type="button"
              class={`stepper-stage-tab ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedStage(stage.key)}
              role="tab"
              aria-selected={isActive}
            >
              <div class="stepper-badge" style={{ background: isActive ? 'var(--saffron-primary)' : 'var(--border-subtle)', color: isActive ? '#ffffff' : 'var(--navy-deep)' }}>
                {stage.count}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                {stage.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Pipeline Stepper Diagram */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-secondary)',
        padding: '14px 24px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '24px',
        fontSize: '0.82rem',
        fontWeight: 700,
        color: 'var(--navy-deep)',
        overflowX: 'auto',
        gap: '12px'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563eb' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></span>
          1. Applied
        </span>
        <ChevronRight size={16} style={{ color: 'var(--text-light)' }} />
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#d97706' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d97706' }}></span>
          2. Shortlisted
        </span>
        <ChevronRight size={16} style={{ color: 'var(--text-light)' }} />
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ea580c' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ea580c' }}></span>
          3. Interview Scheduled
        </span>
        <ChevronRight size={16} style={{ color: 'var(--text-light)' }} />
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success-green)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-green)' }}></span>
          4. Selected / Offer
        </span>
      </div>

      {/* Application Cards Table */}
      <div class="applications-list-table">
        {filteredApps.map((app) => {
          let badgeColor = 'badge-navy';
          if (app.status === 'Selected') badgeColor = 'badge-green';
          else if (app.status === 'Interview') badgeColor = 'badge-saffron';
          else if (app.status === 'Shortlisted') badgeColor = 'badge-amber';

          return (
            <div key={app.id} class="app-row-card">
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span class={`badge ${badgeColor}`} style={{ fontSize: '0.78rem' }}>
                    {app.status}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Applied on {app.appliedDate}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                  {app.jobTitle}
                </h3>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', flexWrap: 'wrap' }}>
                  <span><Building2 size={13} style={{ display: 'inline', marginRight: '3px' }} />{app.company}</span>
                  <span>•</span>
                  <span><MapPin size={13} style={{ display: 'inline', marginRight: '3px' }} />{app.location}</span>
                  <span>•</span>
                  <span style={{ fontWeight: 700, color: 'var(--success-dark)' }}>{app.salary}</span>
                </div>
              </div>

              {/* Status Details / Interview Details */}
              <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', padding: '10px 14px', borderRadius: 'var(--radius-md)', minWidth: '220px' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Next Step / Timeline
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--navy-deep)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {app.status === 'Interview' ? (
                    <>
                      <Video size={14} style={{ color: 'var(--saffron-primary)' }} />
                      {app.interviewDate}
                    </>
                  ) : (
                    app.interviewMode
                  )}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {app.recruiterNote}
                </div>
              </div>

              {/* Action */}
              <div>
                {app.status === 'Interview' ? (
                  <button 
                    type="button" 
                    class="btn btn-primary btn-sm"
                    onClick={() => alert(`Launching MahaSkill Secure Video Room for ${app.jobTitle} with ${app.company}.`)}
                  >
                    <Video size={15} /> Join Interview Room
                  </button>
                ) : app.status === 'Selected' ? (
                  <button 
                    type="button" 
                    class="btn btn-success btn-sm"
                    onClick={() => alert(`Official Offer Letter for ${app.company} downloaded to your verified profile!`)}
                  >
                    <Award size={15} /> Download Offer
                  </button>
                ) : (
                  <button 
                    type="button" 
                    class="btn btn-outline btn-sm"
                    onClick={() => alert(`Application details for ${app.jobTitle} are synchronized with MSSDS employment database.`)}
                  >
                    View Status
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filteredApps.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
            No applications currently in the "{selectedStage}" stage.
          </div>
        )}
      </div>
    </div>
  );
}
