import React, { useState } from 'react';
import { Search, MapPin, Briefcase, IndianRupee, Building2, Sparkles, Filter, CheckCircle2, Bookmark, ShieldCheck, ArrowRight } from 'lucide-react';
import { mockJobsData } from '../../data/jobSeekerData';
import { allDistrictsList } from '../../data/districtsData';

export function PublicJobsView({ onAskAI, lang, setLang, t }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  const industries = ["All", "Automotive & EV", "Industrial Automation", "Renewable Energy", "IT & AI", "Electronics OSAT", "Logistics & Supply Chain"];

  const filteredJobs = mockJobsData.filter(job => {
    const matchesSearch = !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDistrict = !districtFilter || job.district.toLowerCase() === districtFilter.toLowerCase();
    const matchesIndustry = industryFilter === 'All' || job.industry.toLowerCase().includes(industryFilter.toLowerCase());

    return matchesSearch && matchesDistrict && matchesIndustry;
  });

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs(prev => [...prev, jobId]);
      alert("Application successfully submitted! Recruiter will contact you via MahaSkill portal.");
    }
  };

  const handleSave = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  return (
    <div className="container-wide" style={{ padding: '32px 16px' }}>
      {/* Top Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', padding: '36px 32px', borderRadius: 'var(--radius-xl)', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--saffron-primary)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '8px' }}>
          <ShieldCheck size={18} />
          <span>Maharashtra State Employment Exchange • 1,42,850+ Verified Openings</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 8px 0', color: '#ffffff' }}>
          Live Maharashtra Job Opportunities
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#cbd5e1', maxWidth: '720px', margin: '0 0 20px 0', lineHeight: 1.5 }}>
          Direct verified vacancies from Tier-1 OEMs, MIDC industrial enterprises, and tech hubs across 36 districts with automated skill eligibility diagnostics.
        </p>

        {/* Search Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '10px', background: '#ffffff', padding: '8px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px' }}>
            <Search size={18} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search job title, company (e.g. Tata Motors, Automation, PLC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: 'var(--navy-deep)' }}
            />
          </div>

          <select 
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '8px', fontSize: '0.85rem', color: 'var(--navy-deep)' }}
          >
            <option value="">All 36 Districts</option>
            {allDistrictsList.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '8px', fontSize: '0.85rem', color: 'var(--navy-deep)' }}
          >
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>

          <button 
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onAskAI("Find jobs matching my skills in Maharashtra")}
          >
            <Sparkles size={15} /> Match Me with AI
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {filteredJobs.map(job => {
          const isApplied = appliedJobs.includes(job.id);
          const isSaved = savedJobs.includes(job.id);
          return (
            <div 
              key={job.id}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                padding: '24px 28px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.75rem', background: 'var(--navy-subtle)', color: 'var(--navy-deep)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      {job.industry}
                    </span>
                    <span style={{ fontSize: '0.75rem', background: '#ecfdf5', color: 'var(--success-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      {job.matchScore}% Match
                    </span>
                    <span style={{ fontSize: '0.75rem', background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      {job.workType}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '0 0 4px 0' }}>
                    {job.title}
                  </h3>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    🏢 {job.company} • 📍 {job.location} ({job.district} District)
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--success-dark)' }}>
                    {job.salary}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Exp: {job.experience} • Verified Post
                  </div>
                </div>
              </div>

              {/* Skills breakdown */}
              <div style={{ margin: '16px 0', background: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                  Required Competencies:
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {job.requiredSkills.map((sk, idx) => {
                    const isMatched = job.matchingSkills.includes(sk);
                    return (
                      <span 
                        key={idx}
                        style={{
                          background: isMatched ? '#ecfdf5' : '#ffffff',
                          color: isMatched ? 'var(--success-dark)' : 'var(--navy-deep)',
                          border: `1px solid ${isMatched ? '#a7f3d0' : 'var(--border-subtle)'}`,
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {isMatched ? '✓' : '•'} {sk}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => onAskAI(`Why am I ${job.matchScore}% eligible for ${job.title} at ${job.company}?`)}
                  style={{ background: 'none', border: 'none', color: 'var(--saffron-primary)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Sparkles size={14} /> Diagnose Skill Gap with AI
                </button>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => handleSave(job.id)}
                    className="btn btn-outline btn-sm"
                  >
                    <Bookmark size={14} style={{ fill: isSaved ? 'currentColor' : 'none' }} />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApply(job.id)}
                    className={`btn btn-sm ${isApplied ? 'btn-success' : 'btn-primary'}`}
                    disabled={isApplied}
                  >
                    {isApplied ? '✓ Applied' : '1-Click Apply'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
