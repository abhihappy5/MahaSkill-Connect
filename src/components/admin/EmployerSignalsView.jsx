import React, { useState } from 'react';
import { 
  MessageSquare, 
  Building2, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileCheck, 
  Briefcase, 
  Users, 
  Award, 
  PlusCircle, 
  Send, 
  ChevronRight,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { employerSignalsData, employerValidationData } from '../../data/adminDashboardData';

export function EmployerSignalsView({ lang, t, selectedDistrict }) {
  const [activeTab, setActiveTab] = useState('validations'); // 'validations' | 'telemetry' | 'submit-survey'
  const [validationsList, setValidationsList] = useState(employerValidationData);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCurriculumForEndorsement, setSelectedCurriculumForEndorsement] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState('');

  // Endorsement Modal Form State
  const [endorsementForm, setEndorsementForm] = useState({
    companyName: 'Tata Motors PV / Tata AutoComp',
    reviewerName: 'Rajesh Patil (VP Skill Development & HR)',
    hiringPledged: 150,
    practicalFitScore: 92,
    comments: 'Reviewed syllabus. Highly recommend increasing battery BMS diagnostic lab hours to 60%. Pledging 150 apprenticeships upon rollout.'
  });

  // New Skill Demand Submission State
  const [surveyForm, setSurveyForm] = useState({
    company: '',
    industry: 'Automotive & EV',
    district: 'Pune',
    skillDemand: '',
    urgency: 'Immediate (Next 6 Months)',
    vacancies: 50,
    willingToPartner: true
  });

  const showToast = (msg) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(''), 4500);
  };

  const handleEndorseSubmit = (e) => {
    e.preventDefault();
    if (!selectedCurriculumForEndorsement) return;

    setValidationsList((prev) =>
      prev.map((item) => {
        if (item.id === selectedCurriculumForEndorsement.id) {
          return {
            ...item,
            status: 'Fully Endorsed',
            statusKey: 'endorsed',
            hiringPledged: item.hiringPledged + parseInt(endorsementForm.hiringPledged || 0, 10),
            feedbackSummary: endorsementForm.comments || item.feedbackSummary,
            reviewer: `${endorsementForm.reviewerName} (${endorsementForm.companyName})`,
            endorsedDate: 'Today (Just Verified)'
          };
        }
        return item;
      })
    );

    showToast(lang === 'mr' 
      ? `अभ्यासक्रम संरेखन यशस्वीरित्या प्रमाणित झाले! +${endorsementForm.hiringPledged} भरती वचनबद्धता नोंदवली गेली.`
      : (lang === 'hi'
        ? `पाठ्यक्रम संरेखण सफलतापूर्वक प्रमाणित हुआ! +${endorsementForm.hiringPledged} भर्ती प्रतिबद्धता दर्ज की गई।`
        : `Curriculum successfully validated! +${endorsementForm.hiringPledged} Hiring Commitments logged.`));
    
    setSelectedCurriculumForEndorsement(null);
  };

  const handleSurveySubmit = (e) => {
    e.preventDefault();
    if (!surveyForm.company || !surveyForm.skillDemand) {
      alert(lang === 'mr' ? 'कृपया कंपनीचे नाव आणि कौशल्याची गरज प्रविष्ट करा' : 'Please enter company name and skill demand');
      return;
    }

    showToast(lang === 'mr'
      ? `उद्योग मागणी नोंदवली गेली: ${surveyForm.company} (${surveyForm.district}) - ${surveyForm.skillDemand}`
      : (lang === 'hi'
        ? `उद्योग मांग दर्ज की गई: ${surveyForm.company} (${surveyForm.district}) - ${surveyForm.skillDemand}`
        : `Industry Demand Registered: ${surveyForm.company} (${surveyForm.district}) for ${surveyForm.skillDemand}`));

    setSurveyForm({
      company: '',
      industry: 'Automotive & EV',
      district: 'Pune',
      skillDemand: '',
      urgency: 'Immediate (Next 6 Months)',
      vacancies: 50,
      willingToPartner: true
    });
    setActiveTab('validations');
  };

  const filteredValidations = validationsList.filter((item) => {
    if (statusFilter === 'all') return true;
    return item.statusKey === statusFilter;
  });

  const totalPledgedHiring = validationsList.reduce((acc, curr) => acc + (curr.hiringPledged || 0), 0);
  const fullyEndorsedCount = validationsList.filter(v => v.statusKey === 'endorsed').length;

  return (
    <div className="admin-table-card" id="admin-sec-employer-feedback" role="region" aria-label="Employer Signals and Curriculum Validation">
      {/* Feedback Toast */}
      {feedbackToast && (
        <div style={{
          position: 'sticky',
          top: '10px',
          zIndex: 99,
          background: '#065f46',
          color: '#ffffff',
          padding: '12px 18px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
          fontWeight: 700,
          fontSize: '0.88rem'
        }}>
          <CheckCircle2 size={18} style={{ color: '#6ee7b7', flexShrink: 0 }} />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Header & Subtitle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <span className="section-tag" style={{ background: 'var(--navy-subtle)', color: 'var(--navy-deep)', borderColor: 'var(--border-medium)' }}>
            <Building2 size={13} />
            {lang === 'mr' ? 'उद्योग प्रमाणीकरण व भरती फीडबॅक लूप' : (lang === 'hi' ? 'उद्योग सत्यापन एवं भर्ती फीडबैक लूप' : 'Industry Validation & Hiring Feedback Loop')}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
            {lang === 'mr' 
              ? 'उद्योग व नियोक्ता थेट टेलिमेट्री आणि अभ्यासक्रम प्रमाणीकरण' 
              : (lang === 'hi' 
                ? 'उद्योग एवं नियोक्ता प्रत्यक्ष टेलीमेट्री व पाठ्यक्रम सत्यापन' 
                : 'Employer Signals & Curriculum Validation Cockpit')}
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            {lang === 'mr'
              ? 'महाराष्ट्र उद्योग महामंडळे (MCCIA, CII, ASDC) व नामांकित OEM द्वारे अभ्यासक्रम पुनरावलोकन आणि भरती वचनबद्धता.'
              : (lang === 'hi'
                ? 'महाराष्ट्र उद्योग मंडलों (MCCIA, CII, ASDC) एवं प्रमुख OEM द्वारा पाठ्यक्रम समीक्षा व भर्ती प्रतिबद्धता।'
                : 'Direct industry endorsement of updated ITI/Polytechnic trade curricula paired with verified hiring commitments.')}
          </p>
        </div>

        {/* Global Summary Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck size={13} />
            {lang === 'mr' ? `${totalPledgedHiring}+ भरती वचनबद्धता` : `${totalPledgedHiring}+ Pledged Hires`}
          </span>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setActiveTab('submit-survey')}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', padding: '6px 12px' }}
          >
            <PlusCircle size={14} />
            {lang === 'mr' ? 'नवीन उद्योग मागणी नोंदवा' : (lang === 'hi' ? 'नई उद्योग मांग दर्ज करें' : 'Post Employer Demand')}
          </button>
        </div>
      </div>

      {/* 4 Executive KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
            <FileCheck size={14} style={{ color: 'var(--saffron-primary)' }} />
            {lang === 'mr' ? 'प्रस्तावित अभ्यासक्रम' : 'Proposed Curricula'}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
            {validationsList.length} Trades
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>
            {fullyEndorsedCount} Fully Industry Endorsed
          </div>
        </div>

        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#047857', fontWeight: 700, textTransform: 'uppercase' }}>
            <Briefcase size={14} style={{ color: '#059669' }} />
            {lang === 'mr' ? 'एकूण भरती वचनबद्धता' : 'Pledged Hiring Quota'}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#065f46', marginTop: '4px' }}>
            {totalPledgedHiring.toLocaleString()} Hires
          </div>
          <div style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 600 }}>
            Guaranteed apprenticeship & FTE
          </div>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
            <Building2 size={14} style={{ color: '#3b82f6' }} />
            {lang === 'mr' ? 'सहभागी कंपन्या' : 'Partner Enterprises'}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
            {employerSignalsData.totalSurveyed}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#3b82f6', fontWeight: 700 }}>
            Across 5 Key MIDC Corridors
          </div>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
            <Award size={14} style={{ color: '#8b5cf6' }} />
            {lang === 'mr' ? 'सरासरी उद्योग सज्जता' : 'Avg Industry Fit'}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
            88.0% Fit
          </div>
          <div style={{ fontSize: '0.72rem', color: '#8b5cf6', fontWeight: 700 }}>
            Practical Shopfloor Readiness
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setActiveTab('validations')}
          style={{
            background: activeTab === 'validations' ? 'var(--navy-deep)' : '#f1f5f9',
            color: activeTab === 'validations' ? '#ffffff' : 'var(--navy-deep)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontWeight: 700,
            fontSize: '0.84rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.15s'
          }}
        >
          <FileCheck size={15} />
          <span>{lang === 'mr' ? 'अभ्यासक्रम प्रमाणीकरण व एंडोर्समेंट' : (lang === 'hi' ? 'पाठ्यक्रम सत्यापन व एंडोर्समेंट' : 'Curriculum Validation & Endorsements')}</span>
          <span style={{ 
            background: activeTab === 'validations' ? 'rgba(255,255,255,0.2)' : '#e2e8f0',
            padding: '2px 6px',
            borderRadius: '10px',
            fontSize: '0.72rem'
          }}>
            {validationsList.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('telemetry')}
          style={{
            background: activeTab === 'telemetry' ? 'var(--navy-deep)' : '#f1f5f9',
            color: activeTab === 'telemetry' ? '#ffffff' : 'var(--navy-deep)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontWeight: 700,
            fontSize: '0.84rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.15s'
          }}
        >
          <TrendingUp size={15} />
          <span>{lang === 'mr' ? 'औद्योगिक कॉरिडॉर्स व नोकरी ट्रेंड्स' : (lang === 'hi' ? 'औद्योगिक गलियारे एवं नौकरी रुझान' : 'Hiring Corridors & Market Telemetry')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('submit-survey')}
          style={{
            background: activeTab === 'submit-survey' ? 'var(--saffron-primary)' : '#f1f5f9',
            color: activeTab === 'submit-survey' ? '#ffffff' : 'var(--navy-deep)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontWeight: 700,
            fontSize: '0.84rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.15s'
          }}
        >
          <Send size={15} />
          <span>{lang === 'mr' ? 'उद्योग कौशल्य मागणी फॉर्म' : (lang === 'hi' ? 'उद्योग कौशल मांग फॉर्म' : 'Employer Demand & Pledge Form')}</span>
        </button>
      </div>

      {/* ================= TAB 1: CURRICULUM VALIDATION & ENDORSEMENTS ================= */}
      {activeTab === 'validations' && (
        <div>
          {/* Status Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { key: 'all', label: lang === 'mr' ? 'सर्व अभ्यासक्रम' : 'All Statuses' },
                { key: 'endorsed', label: lang === 'mr' ? 'पूर्ण प्रमाणित (Fully Endorsed)' : 'Fully Endorsed' },
                { key: 'modified', label: lang === 'mr' ? 'सुधारणा आवश्यक (Modifications)' : 'Modifications Requested' },
                { key: 'review', label: lang === 'mr' ? 'पुनरावलोकनाधीन (Under Review)' : 'Under Review' }
              ].map((pill) => (
                <button
                  key={pill.key}
                  type="button"
                  onClick={() => setStatusFilter(pill.key)}
                  style={{
                    background: statusFilter === pill.key ? '#0f172a' : '#ffffff',
                    color: statusFilter === pill.key ? '#ffffff' : '#475569',
                    border: '1px solid #cbd5e1',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
              Showing {filteredValidations.length} of {validationsList.length} Industry Audits
            </div>
          </div>

          {/* Validation Cards Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredValidations.map((item) => {
              const isEndorsed = item.statusKey === 'endorsed';
              const isModified = item.statusKey === 'modified';
              const isReview = item.statusKey === 'review';

              const badgeStyle = isEndorsed
                ? { background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' }
                : isModified
                ? { background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }
                : { background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' };

              return (
                <div 
                  key={item.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '18px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                          {item.id}
                        </span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--saffron-primary)', background: '#fffbeb', padding: '2px 8px', borderRadius: '4px' }}>
                          NSQF {item.targetNSQF}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600 }}>
                          Hub: {item.districtHub}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '4px 0 2px 0' }}>
                        {item.curriculumTitle}
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                        Trade: <strong>{item.trade}</strong> | Body: <strong>{item.reviewingBody}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ ...badgeStyle, padding: '4px 10px', borderRadius: '20px', fontSize: '0.76rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {isEndorsed && <CheckCircle2 size={13} />}
                        {isModified && <AlertTriangle size={13} />}
                        {isReview && <Clock size={13} />}
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Modules Approved / Evaluated */}
                  <div>
                    <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--navy-deep)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Modules Vetted by Industry Council:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '6px' }}>
                      {item.modulesValidated.map((mod, mIdx) => (
                        <div 
                          key={mIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: mod.approved ? '#f8fafc' : '#fffbeb',
                            border: `1px solid ${mod.approved ? '#e2e8f0' : '#fde68a'}`,
                            borderRadius: '6px',
                            padding: '6px 10px',
                            fontSize: '0.78rem'
                          }}
                        >
                          {mod.approved ? (
                            <Check size={14} style={{ color: '#059669', flexShrink: 0 }} />
                          ) : (
                            <Clock size={14} style={{ color: '#d97706', flexShrink: 0 }} />
                          )}
                          <span style={{ color: mod.approved ? '#1e293b' : '#92400e', fontWeight: mod.approved ? 600 : 700 }}>
                            {mod.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Quote & Reviewer */}
                  <div style={{ background: '#f8fafc', borderLeft: '4px solid var(--saffron-primary)', padding: '10px 14px', borderRadius: '0 8px 8px 0' }}>
                    <div style={{ fontSize: '0.82rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.5 }}>
                      "{item.feedbackSummary}"
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, marginTop: '4px' }}>
                      — {item.reviewer} ({item.endorsedDate})
                    </div>
                  </div>

                  {/* Footer Stats & Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '10px', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ fontSize: '0.8rem', color: '#065f46', fontWeight: 800 }}>
                        🎯 {item.hiringPledged} Hiring Commitments Pledged
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 700 }}>
                        ⭐ {item.readinessScore}% Practical Fit Score
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        setSelectedCurriculumForEndorsement(item);
                        setEndorsementForm((prev) => ({
                          ...prev,
                          hiringPledged: 150,
                          comments: `Industry endorsement updated for ${item.curriculumTitle}. Approving practical syllabus.`
                        }));
                      }}
                      style={{ fontSize: '0.78rem', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
                    >
                      <FileCheck size={14} style={{ color: 'var(--saffron-primary)' }} />
                      {lang === 'mr' ? 'प्रमाणीकरण बदला / नवीन वचनबद्धता' : 'Endorse / Add Hiring Quota'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 2: HIRING CORRIDORS & MARKET TELEMETRY ================= */}
      {activeTab === 'telemetry' && (
        <div>
          {/* Survey Highlights 3-Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            {employerSignalsData.surveyHighlights.map((sh, idx) => {
              const localizedInsights = [
                lang === 'mr' ? 'महाराष्ट्र एमएसएमई कडून कुशल तंत्रज्ञांच्या कमतरतेचा अहवाल' : (lang === 'hi' ? 'महाराष्ट्र एमएसएमई द्वारा कुशल तकनीशियनों की कमी की रिपोर्ट' : sh.insight),
                lang === 'mr' ? 'प्रमाणित प्रशिक्षणार्थ्यांना सुरुवातीच्या वेतनात ५०% प्रीमियम देण्याची तयारी' : (lang === 'hi' ? 'प्रमाणित प्रशिक्षुओं को शुरुआती वेतन में ५०% प्रीमियम देने की तत्परता' : sh.insight),
                lang === 'mr' ? 'थेट उद्योग-केंद्रीत अभ्यासक्रमासाठी सहकार्य करण्याची तयारी' : (lang === 'hi' ? 'प्रत्यक्ष उद्योग-केंद्रित पाठ्यक्रम के लिए सहयोग की तत्परता' : sh.insight)
              ];

              return (
                <div key={idx} style={{ background: '#f8fafc', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--saffron-primary)', marginBottom: '4px' }}>
                    {sh.metric}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--navy-deep)', fontWeight: 600 }}>
                    {localizedInsights[idx] || sh.insight}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top Industrial Hiring Corridors Table */}
          <div style={{ marginTop: '10px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '10px' }}>
              {lang === 'mr' ? 'नोकरी ट्रेंड्स व भविष्यातील भरती गरजा' : (lang === 'hi' ? 'नौकरी रुझान एवं भविष्य की भर्ती आवश्यकताएं' : 'Job Posting Trends & Future Hiring Requirements')}
            </h3>

            <table className="gov-data-table">
              <thead>
                <tr>
                  <th>{lang === 'mr' ? 'औद्योगिक कॉरिडॉर व प्रदेश' : (lang === 'hi' ? 'औद्योगिक गलियारा एवं क्षेत्र' : 'Industrial Corridor & Region')}</th>
                  <th>{lang === 'mr' ? 'सक्रिय रिक्त पदे' : (lang === 'hi' ? 'सक्रिय रिक्तियां' : 'Active Vacancies')}</th>
                  <th>{lang === 'mr' ? 'वार्षिक भरती वाढ' : (lang === 'hi' ? 'वार्षिक भर्ती वृद्धि' : 'Hiring Growth YoY')}</th>
                  <th>{lang === 'mr' ? 'प्रमुख तांत्रिक कौशल्य मागणी' : (lang === 'hi' ? 'प्रमुख तकनीकी कौशल मांग' : 'Primary Technical Skill Demand')}</th>
                </tr>
              </thead>
              <tbody>
                {employerSignalsData.topHiringCorridors.map((c, idx) => {
                  const localizedCorridors = [
                    lang === 'mr' ? 'पुणे - चाकण - तळेगाव (ऑटो व ईव्ही हब)' : (lang === 'hi' ? 'पुणे - चाकण - तलेगांव (ऑटो एवं ईवी हब)' : c.corridor),
                    lang === 'mr' ? 'मुंबई - नवी मुंबई - ठाणे (आयटी व लॉजिस्टिक्स)' : (lang === 'hi' ? 'मुंबई - नवी मुंबई - ठाणे (आईटी एवं लॉजिस्टिक्स)' : c.corridor),
                    lang === 'mr' ? 'छत्रपती संभाजीनगर - शेंद्रा (AURIC हब)' : (lang === 'hi' ? 'छत्रपति संभाजीनगर - शेंद्रा (AURIC हब)' : c.corridor),
                    lang === 'mr' ? 'नागपूर - मिहान (एरोस्पेस व कार्गो)' : (lang === 'hi' ? 'नागपुर - मिहान (एयरोस्पेस एवं कार्गो)' : c.corridor)
                  ];

                  return (
                    <tr key={idx}>
                      <td>
                        <div style={{ fontWeight: 800, color: 'var(--navy-deep)' }}>{localizedCorridors[idx] || c.corridor}</div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 800, color: 'var(--success-dark)' }}>{c.vacancies}</span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: 'var(--navy-deep)' }}>{c.growth}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{c.topNeed}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: EMPLOYER DEMAND & PLEDGE FORM ================= */}
      {activeTab === 'submit-survey' && (
        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '24px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Building2 size={32} style={{ color: 'var(--saffron-primary)', margin: '0 auto 8px auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                {lang === 'mr' ? 'महाराष्ट्र उद्योग कौशल्य मागणी व भरती नोंदणी' : 'Submit Direct Industry Skill Demand & Hiring Pledge'}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                {lang === 'mr'
                  ? 'तुमच्या कारखान्यातील तांत्रिक रिक्त जागा थेट DVET व राज्य कौशल्य आराखड्यात समाविष्ट करा.'
                  : 'Register your industry skill shortages directly to DVET Maharashtra to trigger immediate ITI curriculum modernization.'}
              </p>
            </div>

            <form onSubmit={handleSurveySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                    Enterprise / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahindra Electric / Bharat Forge"
                    value={surveyForm.company}
                    onChange={(e) => setSurveyForm({ ...surveyForm, company: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                    Industry Sector *
                  </label>
                  <select
                    value={surveyForm.industry}
                    onChange={(e) => setSurveyForm({ ...surveyForm, industry: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="Automotive & EV">Automotive & EV</option>
                    <option value="Precision Machining & CNC">Precision Machining & CNC</option>
                    <option value="Renewable Energy & Solar">Renewable Energy & Solar</option>
                    <option value="Electronics & Semiconductor">Electronics & Semiconductor</option>
                    <option value="Pharma & Chemical">Pharma & Chemical</option>
                    <option value="Logistics & Warehousing">Logistics & Warehousing</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                    Primary Maharashtra District Cluster *
                  </label>
                  <select
                    value={surveyForm.district}
                    onChange={(e) => setSurveyForm({ ...surveyForm, district: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="Pune (Chakan/Bhosari)">Pune (Chakan / Bhosari)</option>
                    <option value="Chhatrapati Sambhaji Nagar (Waluj/AURIC)">Chhatrapati Sambhaji Nagar (AURIC / Waluj)</option>
                    <option value="Nashik (Satpur/Ambad)">Nashik (Satpur / Ambad)</option>
                    <option value="Nagpur (MIHAN/Butibori)">Nagpur (MIHAN / Butibori)</option>
                    <option value="Thane & Navi Mumbai">Thane & Navi Mumbai</option>
                    <option value="Kolhapur & Sangli">Kolhapur & Sangli</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                    Anticipated Hiring Vacancies (Next 12 Months)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="5000"
                    value={surveyForm.vacancies}
                    onChange={(e) => setSurveyForm({ ...surveyForm, vacancies: parseInt(e.target.value || 0, 10) })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                  Specific Missing Technical Skills / Emerging Competencies *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Technicians lacking CAN-bus diagnostic telemetry and high-voltage safety isolation (600V+). Need hands-on lab training on BMS firmware."
                  value={surveyForm.skillDemand}
                  onChange={(e) => setSurveyForm({ ...surveyForm, skillDemand: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="partner-check"
                  checked={surveyForm.willingToPartner}
                  onChange={(e) => setSurveyForm({ ...surveyForm, willingToPartner: e.target.checked })}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="partner-check" style={{ fontSize: '0.8rem', color: 'var(--navy-deep)', fontWeight: 600, cursor: 'pointer' }}>
                  Our company is willing to offer NAPS apprenticeship slots & join the DVET Curriculum Review Panel.
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setActiveTab('validations')}
                  style={{ padding: '8px 16px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '8px 24px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Send size={15} />
                  Submit Industry Telemetry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ENDORSE CURRICULUM & PLEDGE HIRING ================= */}
      {selectedCurriculumForEndorsement && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '560px',
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            border: '1px solid #cbd5e1'
          }}>
            {/* Modal Header */}
            <div style={{ background: 'var(--navy-deep)', color: '#ffffff', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} style={{ color: 'var(--saffron-primary)' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  Industry Curriculum Endorsement
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCurriculumForEndorsement(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleEndorseSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--saffron-primary)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Vetting Curriculum
                </span>
                <div style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                  {selectedCurriculumForEndorsement.curriculumTitle}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Trade: {selectedCurriculumForEndorsement.trade} (NSQF {selectedCurriculumForEndorsement.targetNSQF})
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                  Reviewing Organization / Enterprise
                </label>
                <input
                  type="text"
                  required
                  value={endorsementForm.companyName}
                  onChange={(e) => setEndorsementForm({ ...endorsementForm, companyName: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                    Pledged Apprenticeship / Job Slots
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    required
                    value={endorsementForm.hiringPledged}
                    onChange={(e) => setEndorsementForm({ ...endorsementForm, hiringPledged: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.84rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                    Practical Shopfloor Fit Score (%)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    required
                    value={endorsementForm.practicalFitScore}
                    onChange={(e) => setEndorsementForm({ ...endorsementForm, practicalFitScore: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                  Industry Validation Comments & Feedback
                </label>
                <textarea
                  rows={3}
                  required
                  value={endorsementForm.comments}
                  onChange={(e) => setEndorsementForm({ ...endorsementForm, comments: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.84rem', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setSelectedCurriculumForEndorsement(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}
                >
                  <CheckCircle2 size={15} />
                  Sign & Submit Official Endorsement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
