import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Award, 
  BookOpen, 
  Building2, 
  MapPin, 
  ArrowRight,
  Filter,
  Download,
  Calendar,
  Sparkles
} from 'lucide-react';
import { trainerReadinessData } from '../../data/adminDashboardData';

export function TrainerReadinessView({ lang, t, selectedDistrict }) {
  const [tradeFilter, setTradeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [batchActionNotice, setBatchActionNotice] = useState('');

  const trades = [
    { key: 'all', label: lang === 'mr' ? 'सर्व ट्रेड्स' : (lang === 'hi' ? 'सभी ट्रेड्स' : 'All Trades') },
    { key: 'Automotive & EV', label: lang === 'mr' ? 'ऑटोमोटिव्ह व ईव्ही' : (lang === 'hi' ? 'ऑटोमोटिव एवं ईवी' : 'Automotive & EV') },
    { key: 'Industrial Automation', label: lang === 'mr' ? 'औद्योगिक ऑटोमेशन व सीएनसी' : (lang === 'hi' ? 'औद्योगिक स्वचालन एवं सीएनसी' : 'Industrial Automation & CNC') },
    { key: 'Renewable Energy', label: lang === 'mr' ? 'सौर व हरित ऊर्जा' : (lang === 'hi' ? 'सौर एवं हरित ऊर्जा' : 'Renewable Energy') },
    { key: 'IT & AI Data', label: lang === 'mr' ? 'आयटी व एआय डेटा' : (lang === 'hi' ? 'आईटी एवं एआई डेटा' : 'IT & AI Data') }
  ];

  const statuses = [
    { key: 'all', label: lang === 'mr' ? 'सर्व स्थिती' : (lang === 'hi' ? 'सभी स्थिति' : 'All Statuses') },
    { key: 'ready', label: lang === 'mr' ? 'सज्ज (Ready)' : (lang === 'hi' ? 'तैयार (Ready)' : 'Ready') },
    { key: 'tot', label: lang === 'mr' ? 'प्रगत ToT' : (lang === 'hi' ? 'उन्नत ToT' : 'Advanced ToT') },
    { key: 'upskilling', label: lang === 'mr' ? 'कौशल्यवर्धन (Upskilling)' : (lang === 'hi' ? 'अपस्किलिंग (Upskilling)' : 'EV Upskilling') },
    { key: 'retraining', label: lang === 'mr' ? 'पुनःप्रशिक्षण (Retraining)' : (lang === 'hi' ? 'पुनःप्रशिक्षण (Retraining)' : 'Retraining') }
  ];

  const filteredTrainers = trainerReadinessData.filter((tr) => {
    const matchesTrade = tradeFilter === 'all' || tr.trade === tradeFilter;
    const matchesStatus = statusFilter === 'all' || tr.status === statusFilter;
    const matchesDistrict = !selectedDistrict || selectedDistrict === 'all' || 
      tr.district.toLowerCase().includes(selectedDistrict.toLowerCase());
    return matchesTrade && matchesStatus && matchesDistrict;
  });

  const totalCount = trainerReadinessData.length;
  const readyCount = trainerReadinessData.filter(t => t.status === 'ready').length;
  const totCount = trainerReadinessData.filter(t => t.status === 'tot').length;
  const upskillCount = trainerReadinessData.filter(t => t.status === 'upskilling' || t.status === 'retraining').length;

  const handleActionClick = (trainer) => {
    setBatchActionNotice(`ToT Sanction initiated for ${trainer.trainerShort}: Assigned to ${trainer.totBatch}.`);
    setTimeout(() => setBatchActionNotice(''), 4000);
  };

  const getActionBadgeStyle = (action) => {
    if (action.toLowerCase().includes('ready')) {
      return { background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' };
    }
    if (action.toLowerCase().includes('tot')) {
      return { background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' };
    }
    if (action.toLowerCase().includes('upskilling')) {
      return { background: '#fffbeb', color: '#92400e', border: '1px solid #fde68a' };
    }
    return { background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' };
  };

  return (
    <div className="admin-view-container" id="admin-sec-trainer-readiness" role="region" aria-label="Trainer Readiness Analysis">
      
      {/* Header Section */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="section-tag" style={{ background: 'var(--navy-subtle)', color: 'var(--navy-deep)', borderColor: 'var(--border-medium)', marginBottom: '6px' }}>
            <Users size={13} />
            {t?.adminTrainerTag || (lang === 'mr' ? 'प्राध्यापक क्षमता व ToT विश्लेषण' : (lang === 'hi' ? 'संकाय क्षमता एवं ToT विश्लेषण' : 'Faculty Competency & ToT Analysis'))}
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '4px 0' }}>
            {lang === 'mr' ? 'प्रशिक्षक सज्जता विश्लेषण' : (lang === 'hi' ? 'प्रशिक्षक तत्परता विश्लेषण' : 'Trainer Readiness Analysis')}
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0 }}>
            {lang === 'mr' 
              ? 'शासकीय व खाजगी आयटीआयमधील प्राध्यापकांच्या सध्याच्या क्षमता, कौशल्य तफावत व ToT अपस्किलिंगचे थेट विश्लेषण.' 
              : (lang === 'hi' 
                ? 'सरकारी एवं निजी आईटीआई प्रशिक्षकों की वर्तमान क्षमता, कौशल अंतराल एवं ToT अपस्किलिंग का वास्तविक समय विश्लेषण।' 
                : 'Real-time diagnostic audit of ITI/Polytechnic trainers, competency deficits, and Training of Trainers (ToT) allocation.')}
          </p>
        </div>

        <button 
          type="button" 
          className="btn btn-outline btn-sm"
          onClick={() => alert("Faculty Readiness Memo (PDF) downloading...")}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
        >
          <Download size={14} />
          <span>{lang === 'mr' ? 'ToT अहवाल निर्यात करा' : (lang === 'hi' ? 'ToT रिपोर्ट डाउनलोड करें' : 'Export ToT Audit')}</span>
        </button>
      </div>

      {/* 4 Summary Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px',
        marginBottom: '20px'
      }}>
        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
            {lang === 'mr' ? 'एकूण मूल्यमापित प्राध्यापक' : (lang === 'hi' ? 'कुल मूल्यांकित प्रशिक्षक' : 'Total Evaluated Trainers')}
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '4px 0' }}>
            1,240 <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Faculty</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
            ✓ 100% Verified across 36 Districts
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #a7f3d0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.74rem', color: '#065f46', fontWeight: 700, textTransform: 'uppercase' }}>
            {lang === 'mr' ? 'अध्यापनास पूर्णपणे सज्ज' : (lang === 'hi' ? 'अध्यापन हेतु पूर्णतः तैयार' : 'Ready for New Curriculum')}
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', margin: '4px 0' }}>
            480 <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#065f46' }}>({Math.round((480/1240)*100)}%)</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 700 }}>
            • Master Trainer Certified
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #bfdbfe', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.74rem', color: '#1e40af', fontWeight: 700, textTransform: 'uppercase' }}>
            {lang === 'mr' ? 'प्रगत ToT प्रक्रियेत' : (lang === 'hi' ? 'उन्नत ToT प्रक्रियाधीन' : 'In Advanced ToT Pipeline')}
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563eb', margin: '4px 0' }}>
            520 <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e40af' }}>({Math.round((520/1240)*100)}%)</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#1d4ed8', fontWeight: 700 }}>
            • ARAI & NSTI Batches Active
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #fecaca', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.74rem', color: '#991b1b', fontWeight: 700, textTransform: 'uppercase' }}>
            {lang === 'mr' ? 'कौशल्यवर्धन / पुनःप्रशिक्षण आवश्यक' : (lang === 'hi' ? 'अपस्किलिंग / पुनःप्रशिक्षण आवश्यक' : 'Upskilling / Retraining Required')}
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dc2626', margin: '4px 0' }}>
            240 <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#991b1b' }}>({Math.round((240/1240)*100)}%)</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#b91c1c', fontWeight: 700 }}>
            ⚠ Legacy trade transition cohorts
          </div>
        </div>
      </div>

      {/* Action Notification Banner */}
      {batchActionNotice && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          borderRadius: '8px',
          padding: '10px 14px',
          marginBottom: '16px',
          color: '#065f46',
          fontSize: '0.84rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} />
          <span>{batchActionNotice}</span>
        </div>
      )}

      {/* Filters Toolbar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '12px 16px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-deep)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={14} /> Filter By:
          </span>

          {/* Trade Filter */}
          <select
            value={tradeFilter}
            onChange={(e) => setTradeFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--navy-deep)',
              background: '#f8fafc',
              outline: 'none'
            }}
          >
            {trades.map((t) => (
              <option key={t.key} value={t.key}>{t.label}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--navy-deep)',
              background: '#f8fafc',
              outline: 'none'
            }}
          >
            {statuses.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>

        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Showing <strong>{filteredTrainers.length}</strong> Faculty Cohorts
        </span>
      </div>

      {/* Main Trainer Readiness Analysis Table */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#0f172a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
              Trainer readiness analysis
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
              Verified DVET Faculty Database • State Skill Development Mission (MSSDS)
            </p>
          </div>

          <span style={{ fontSize: '0.72rem', background: '#1e293b', border: '1px solid #334155', padding: '3px 10px', borderRadius: '20px', color: '#38bdf8', fontWeight: 700 }}>
            Live Audit Stream
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: 'var(--navy-deep)', fontWeight: 800, fontSize: '0.82rem' }}>
                <th style={{ padding: '12px 18px' }}>Trainer</th>
                <th style={{ padding: '12px 18px' }}>Current capability</th>
                <th style={{ padding: '12px 18px' }}>Gap</th>
                <th style={{ padding: '12px 18px' }}>Action</th>
                <th style={{ padding: '12px 18px', textAlign: 'right' }}>Management</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainers.map((row, idx) => {
                const currentCap = lang === 'mr' ? row.currentCapabilityMr : (lang === 'hi' ? row.currentCapabilityHi : row.currentCapability);
                const currentGap = lang === 'mr' ? row.gapMr : (lang === 'hi' ? row.gapHi : row.gap);
                const currentAct = lang === 'mr' ? row.actionMr : (lang === 'hi' ? row.actionHi : row.action);

                return (
                  <tr 
                    key={row.id} 
                    style={{ 
                      borderBottom: '1px solid #f1f5f9',
                      background: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    {/* Trainer Column */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 800, color: 'var(--navy-deep)' }}>
                        {row.trainerShort}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {row.institute}
                      </div>
                    </td>

                    {/* Current Capability Column */}
                    <td style={{ padding: '14px 18px', color: '#334155', fontWeight: 600 }}>
                      {currentCap}
                    </td>

                    {/* Gap Column */}
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{
                        color: row.gap.toLowerCase() === 'current' ? '#059669' : '#dc2626',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {row.gap.toLowerCase() === 'current' ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
                        {currentGap}
                      </span>
                    </td>

                    {/* Action Column (Matching uploaded table) */}
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        ...getActionBadgeStyle(row.action)
                      }}>
                        {currentAct}
                      </span>
                    </td>

                    {/* Action CTA */}
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      {row.status === 'ready' ? (
                        <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 700 }}>
                          ✓ Certified
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleActionClick(row)}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: 'var(--navy-deep)',
                            cursor: 'pointer'
                          }}
                        >
                          Assign ToT
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTrainers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
            No faculty records match the selected filters.
          </div>
        )}
      </div>

    </div>
  );
}
