import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Sparkles, 
  Filter, 
  ArrowUpDown 
} from 'lucide-react';
import { courseHealthTableData } from '../../data/adminDashboardData';

export function CourseHealthTable({ onSelectCourseForAudit, lang, t }) {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCourses = statusFilter === 'all' 
    ? courseHealthTableData 
    : courseHealthTableData.filter(c => c.statusKey === statusFilter);

  const getStatusBadge = (statusKey, statusLabel) => {
    let localizedLabel = statusLabel;
    if (lang === 'mr') {
      if (statusKey === 'aligned') localizedLabel = 'उद्योग सुसंगत';
      else if (statusKey === 'emerging') localizedLabel = 'उदयोन्मुख';
      else if (statusKey === 'review') localizedLabel = 'पुनरावलोकन आवश्यक';
      else if (statusKey === 'oversupplied') localizedLabel = 'अतिरिक्त पुरवठा';
    } else if (lang === 'hi') {
      if (statusKey === 'aligned') localizedLabel = 'उद्योग संरेखित';
      else if (statusKey === 'emerging') localizedLabel = 'उभरती मांग';
      else if (statusKey === 'review') localizedLabel = 'समीक्षा आवश्यक';
      else if (statusKey === 'oversupplied') localizedLabel = 'अतिरिक्त आपूर्ति';
    }

    if (statusKey === 'aligned') return <span className="badge badge-green"><CheckCircle2 size={12} /> {localizedLabel}</span>;
    if (statusKey === 'emerging') return <span className="badge badge-navy" style={{ background: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' }}><Sparkles size={12} /> {localizedLabel}</span>;
    if (statusKey === 'review') return <span className="badge badge-amber"><AlertTriangle size={12} /> {localizedLabel}</span>;
    return <span className="badge" style={{ background: '#fef2f2', color: '#b91c1c', borderColor: '#fecaca' }}><Trash2 size={12} /> {localizedLabel}</span>;
  };

  return (
    <div className="admin-table-card" id="admin-sec-course-health" role="region" aria-label="Course Health Monitor">
      {/* Table Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="section-tag" style={{ background: 'var(--navy-subtle)', color: 'var(--navy-deep)', borderColor: 'var(--border-medium)' }}>
            <Activity size={13} />
            {lang === 'mr' ? 'राज्य व्यावसायिक व आयटीआय अभ्यासक्रम ऑडिट' : (lang === 'hi' ? 'राज्य व्यावसायिक एवं आईटीआई पाठ्यक्रम ऑडिट' : 'State Vocational & ITI Course Audit')}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {lang === 'mr' ? 'अभ्यासक्रम आरोग्य मॉनिटर व कालबाह्यता ट्रॅकर' : (lang === 'hi' ? 'पाठ्यक्रम स्वास्थ्य मॉनिटर एवं अप्रचलन ट्रैकर' : 'Course Health Monitor & Obsolescence Tracker')}
          </h2>
        </div>

        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            className={`btn btn-sm ${statusFilter === 'all' ? 'btn-navy' : 'btn-outline'}`}
            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
            onClick={() => setStatusFilter('all')}
          >
            {lang === 'mr' ? `सर्व अभ्यासक्रम (${courseHealthTableData.length})` : (lang === 'hi' ? `सभी पाठ्यक्रम (${courseHealthTableData.length})` : `All Courses (${courseHealthTableData.length})`)}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${statusFilter === 'emerging' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
            onClick={() => setStatusFilter('emerging')}
          >
            {lang === 'mr' ? 'उदयोन्मुख मागणी' : (lang === 'hi' ? 'उभरती मांग' : 'Emerging Demand')}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${statusFilter === 'aligned' ? 'btn-success' : 'btn-outline'}`}
            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
            onClick={() => setStatusFilter('aligned')}
          >
            {lang === 'mr' ? 'उद्योग सुसंगत' : (lang === 'hi' ? 'उद्योग संरेखित' : 'Aligned')}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${statusFilter === 'oversupplied' ? 'btn-navy' : 'btn-outline'}`}
            style={{ padding: '4px 10px', fontSize: '0.78rem', color: statusFilter === 'oversupplied' ? '#ffffff' : '#b91c1c' }}
            onClick={() => setStatusFilter('oversupplied')}
          >
            {lang === 'mr' ? 'अतिरिक्त पुरवठा (बंद करा)' : (lang === 'hi' ? 'अतिरिक्त आपूर्ति (समापन)' : 'Oversupplied (Phase Out)')}
          </button>
        </div>
      </div>

      {/* Main GovTech Data Table */}
      <table className="gov-data-table">
        <thead>
          <tr>
            <th>{lang === 'mr' ? 'अभ्यासक्रम / ट्रेड नाव' : (lang === 'hi' ? 'पाठ्यक्रम / ट्रेड नाम' : 'Course / Trade Name')}</th>
            <th>{lang === 'mr' ? 'औद्योगिक मागणी' : (lang === 'hi' ? 'उद्योग मांग' : 'Industry Demand')}</th>
            <th>{lang === 'mr' ? 'प्लेसमेंट प्रमाण' : (lang === 'hi' ? 'प्लेसमेंट दर' : 'Placement Rate')}</th>
            <th>{lang === 'mr' ? 'अभ्यासक्रम अद्यतनता' : (lang === 'hi' ? 'पाठ्यक्रम नवीनता' : 'Curriculum Freshness')}</th>
            <th>{lang === 'mr' ? 'प्रशिक्षक सज्जता' : (lang === 'hi' ? 'प्रशिक्षक तत्परता' : 'Trainer Readiness')}</th>
            <th>{lang === 'mr' ? 'उपकरण सज्जता' : (lang === 'hi' ? 'उपकरण तत्परता' : 'Equipment Readiness')}</th>
            <th>{lang === 'mr' ? 'ऑडिट स्थिती' : (lang === 'hi' ? 'ऑडिट स्थिति' : 'Audit Status')}</th>
            <th>{lang === 'mr' ? 'कृती' : (lang === 'hi' ? 'कार्रवाई' : 'Action')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((c) => {
            const courseNameLocalized = lang === 'mr'
              ? (c.nameMr || c.name)
              : (lang === 'hi' ? (c.nameHi || c.name) : c.name);

            return (
              <tr key={c.id}>
                <td>
                  <div style={{ fontWeight: 800, color: 'var(--navy-deep)' }}>{courseNameLocalized}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {c.sector} • {lang === 'mr' ? 'वार्षिक प्रवेश:' : (lang === 'hi' ? 'वार्षिक नामांकन:' : 'Annual Enrollment:')} {c.annualEnrollment.toLocaleString()}
                  </div>
                </td>
                <td>
                  <span style={{ fontWeight: 700, color: c.demandLevel.includes('Surging') ? 'var(--success-dark)' : (c.demandLevel.includes('Decline') ? '#b91c1c' : 'var(--navy-deep)') }}>
                    {c.demandLevel}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 800, color: parseInt(c.placementRate) > 75 ? 'var(--success-dark)' : (parseInt(c.placementRate) < 35 ? '#b91c1c' : 'var(--warning-amber)') }}>
                    {c.placementRate}
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '0.82rem', color: c.curriculumFreshness.includes('Updated') ? 'var(--navy-deep)' : '#b91c1c', fontWeight: 600 }}>
                    {c.curriculumFreshness}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{c.trainerReadiness}</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{c.equipmentReadiness}</span>
                </td>
                <td>
                  {getStatusBadge(c.statusKey, c.status)}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{ padding: '4px 8px', fontSize: '0.74rem' }}
                    onClick={() => onSelectCourseForAudit(c)}
                  >
                    {lang === 'mr' ? 'ऑडिट तपासा' : (lang === 'hi' ? 'ऑडिट जांचें' : 'Inspect Audit')}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
