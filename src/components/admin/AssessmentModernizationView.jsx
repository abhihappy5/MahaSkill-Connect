import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Sparkles, 
  FileText, 
  Download, 
  Users, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Cpu, 
  Award,
  ArrowRight,
  Zap,
  Check,
  XCircle
} from 'lucide-react';
import { assessmentModernizationData } from '../../data/adminDashboardData';

export function AssessmentModernizationView({ lang = 'en', t }) {
  const [selectedTradeId, setSelectedTradeId] = useState('ASM-EV-01');
  const [sectorFilter, setSectorFilter] = useState('all');
  
  // Interactive Weightage Simulator State
  const [simTheoryPct, setSimTheoryPct] = useState(20);
  const [simSimTaskPct, setSimSimTaskPct] = useState(35);
  const [simLogbookPct, setSimLogbookPct] = useState(25);
  const [simJuryPct, setSimJuryPct] = useState(20);
  
  const [sanctionedCirculars, setSanctionedCirculars] = useState({});
  const [activeCircularModal, setActiveCircularModal] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const activeTrade = assessmentModernizationData.find(a => a.id === selectedTradeId) || assessmentModernizationData[0];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Calculated Metrics from Simulator
  const totalWeight = simTheoryPct + simSimTaskPct + simLogbookPct + simJuryPct;
  const employerConfidence = Math.min(99, Math.round(50 + (simSimTaskPct * 0.6) + (simJuryPct * 0.8) + (simLogbookPct * 0.4) - (simTheoryPct * 0.3)));
  const roteReductionPct = Math.max(10, Math.round(100 - simTheoryPct * 1.15));
  const productivityGain = Math.round(15 + (simSimTaskPct * 0.45) + (simJuryPct * 0.5));

  const handleQuickAdoptReform = (tradeItem) => {
    setSanctionedCirculars(prev => ({
      ...prev,
      [tradeItem.id]: {
        circularNo: `DVET/EXAM-REFORM/2026/${tradeItem.id.replace('ASM-', '')}-88`,
        date: new Date().toLocaleDateString('en-IN'),
        status: 'Reform Adopted for State Examination'
      }
    }));

    showToast(lang === 'mr'
      ? `${tradeItem.trade} साठी नवीन बहुस्तरीय मूल्यांकन पद्धती लागू करण्यात आली!`
      : (lang === 'hi'
        ? `${tradeItem.trade} के लिए नया बहुस्तरीय मूल्यांकन ढांचा लागू किया गया!`
        : `Modernized 4-Tier Assessment framework adopted for ${tradeItem.trade}!`));
  };

  const handleGenerateCircular = () => {
    setActiveCircularModal({
      circularNo: `DVET-MSDE/EXAM-MODERN/2026/CIR-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      trade: activeTrade.trade,
      nsqfLevel: activeTrade.nsqfLevel,
      sector: activeTrade.sector,
      pilotCenters: activeTrade.pilotCenters,
      theoryPct: `${simTheoryPct}%`,
      simulationPct: `${simSimTaskPct}%`,
      logbookPct: `${simLogbookPct}%`,
      juryPct: `${simJuryPct}%`,
      confidence: `${employerConfidence}/100`,
      productivity: `+${productivityGain}%`,
      endorsement: activeTrade.industryEndorsement
    });
  };

  return (
    <div className="admin-table-card" id="admin-sec-assessment-modernization" role="region" aria-label="Assessment Methods Modernization">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(5, 150, 105, 0.35)',
          fontSize: '0.86rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <span className="section-tag" style={{ background: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' }}>
            <ClipboardCheck size={13} />
            {lang === 'mr' ? 'DVET परीक्षा व मूल्यांकन पद्धती सुधारणा' : (lang === 'hi' ? 'DVET परीक्षा एवं मूल्यांकन पद्धति सुधार' : 'DVET Examination & Assessment Methods Reform')}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {lang === 'mr' ? 'मूल्यांकन आधुनिकीकरण मॅट्रिक्स: घोकंपट्टी परीक्षा ते प्रत्यक्ष कार्य सिम्युलेशन' : (lang === 'hi' ? 'मूल्यांकन आधुनिकीकरण मैट्रिक्स: रट्टा परीक्षा से व्यावहारिक कार्य सिमुलेशन' : 'Assessment Modernization Matrix: Rote-Learning to Task Simulations & Jury')}
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0 0' }}>
            {lang === 'mr'
              ? '८०% लेखी पेन-पेपर घोकंपट्टी परीक्षा बंद करून प्रत्यक्ष टास्क सिम्युलेशन, डिजिटल ई-लॉगबुक आणि उद्योग प्रतिनिधी मूल्यांकनाचा अवलंब.'
              : 'Transitioning from 80% written rote-learning exams to Practical Task Simulations, Continuous Digital Logbooks, and Industry-Jury On-Job Evaluations.'}
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleGenerateCircular}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}
        >
          <Sliders size={14} />
          <span>{lang === 'mr' ? 'मूल्यांकन नियमक सिम्युलेटर' : (lang === 'hi' ? 'मूल्यांकन नियामक सिम्युलेटर' : 'Assessment Reform Simulator')}</span>
        </button>
      </div>

      {/* 4 Reform KPI Diagnostic Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: '#991b1b', textTransform: 'uppercase', fontWeight: 700 }}>Legacy Assessment Defect</div>
          <div style={{ fontSize: '1.55rem', fontWeight: 900, color: '#dc2626', marginTop: '2px' }}>70% Written Exam</div>
          <div style={{ fontSize: '0.72rem', color: '#b91c1c', marginTop: '4px' }}>Pen-paper memory tests fail practical factory readiness</div>
        </div>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: '#166534', textTransform: 'uppercase', fontWeight: 700 }}>Modern Hands-On Standard</div>
          <div style={{ fontSize: '1.55rem', fontWeight: 900, color: '#059669', marginTop: '2px' }}>80% Practical / Sim</div>
          <div style={{ fontSize: '0.72rem', color: '#15803d', marginTop: '4px' }}>Simulations, E-Logbook & Industry Jury Evaluation</div>
        </div>

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: '#1e40af', textTransform: 'uppercase', fontWeight: 700 }}>Employer Endorsement</div>
          <div style={{ fontSize: '1.55rem', fontWeight: 900, color: '#0284c7', marginTop: '2px' }}>97.2% Industry Fit</div>
          <div style={{ fontSize: '0.72rem', color: '#1d4ed8', marginTop: '4px' }}>Tata Motors, Bharat Forge, Bajaj Auto, Schneider</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0b192c 0%, #1e293b 100%)', color: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Candidate Onboarding Speed</div>
          <div style={{ fontSize: '1.55rem', fontWeight: 900, color: '#f8fafc', marginTop: '2px' }}>+41% Faster</div>
          <div style={{ fontSize: '0.72rem', color: '#4ade80', marginTop: '4px' }}>Graduates job-ready from Day 1 without retraining</div>
        </div>
      </div>

      {/* Trade Selector Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '18px' }}>
        {assessmentModernizationData.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedTradeId(item.id)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: selectedTradeId === item.id ? '2px solid #0284c7' : '1px solid #cbd5e1',
              background: selectedTradeId === item.id ? '#eff6ff' : '#ffffff',
              color: selectedTradeId === item.id ? '#1e40af' : '#475569',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{item.trade}</span>
            <span style={{ fontSize: '0.68rem', padding: '1px 5px', borderRadius: '4px', background: selectedTradeId === item.id ? '#bfdbfe' : '#f1f5f9', color: '#1e293b' }}>
              {item.nsqfLevel}
            </span>
          </button>
        ))}
      </div>

      {/* Active Trade Assessment Detail Card: Legacy vs Modern Comparison */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.74rem', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                {activeTrade.id}
              </span>
              <span style={{ fontSize: '0.74rem', background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                ● {activeTrade.status}
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '4px 0 2px 0' }}>
              {activeTrade.trade} ({activeTrade.nsqfLevel})
            </h3>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Sector: <strong>{activeTrade.sector}</strong> · Pilot Centers: <strong>{activeTrade.pilotCenters}</strong> (👥 {activeTrade.studentsEnrolled} candidates/yr)
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', background: '#f0fdf4', padding: '4px 10px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
              🏆 {activeTrade.employerSatisfactionScore} Industry Rating
            </span>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => handleQuickAdoptReform(activeTrade)}
              style={{ fontWeight: 800, fontSize: '0.78rem' }}
            >
              {sanctionedCirculars[activeTrade.id] ? 'Reform Circular Active ✓' : 'Adopt Reformed Assessment (Statewide)'}
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
          
          {/* Legacy Scheme Box */}
          <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991b1b', fontWeight: 800, fontSize: '0.86rem' }}>
                <XCircle size={16} />
                <span>Legacy Evaluation Scheme (Obsolescent)</span>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#fee2e2', color: '#dc2626', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                {activeTrade.legacyScheme.writtenTheoryPct}% Written / {activeTrade.legacyScheme.fixedPracticalPct}% Practical
              </span>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#334155', margin: '0 0 10px 0', lineHeight: 1.45 }}>
              {activeTrade.legacyScheme.description}
            </p>

            <div style={{ background: 'rgba(220, 38, 38, 0.08)', borderLeft: '3px solid #dc2626', padding: '8px 12px', borderRadius: '0 6px 6px 0', fontSize: '0.76rem', color: '#991b1b' }}>
              <strong>Critical Deficiency:</strong> {activeTrade.legacyScheme.shortcomings}
            </div>
          </div>

          {/* Modern 4-Tier Scheme Box */}
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 800, fontSize: '0.86rem' }}>
                <CheckCircle2 size={16} />
                <span>Reformed 4-Tier Practical Assessment Framework</span>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                80% Hands-On & Simulation
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
              {activeTrade.modernScheme.components.map((comp, cIdx) => (
                <div key={cIdx} style={{ background: '#ffffff', border: '1px solid #dcfce7', borderRadius: '6px', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', fontSize: '0.78rem' }}>
                  <div>
                    <strong style={{ color: 'var(--navy-deep)' }}>{comp.name}:</strong>
                    <span style={{ color: '#475569', marginLeft: '4px' }}>{comp.method}</span>
                  </div>
                  <span style={{ fontWeight: 800, color: '#059669', background: '#f0fdf4', padding: '1px 6px', borderRadius: '4px', border: '1px solid #bbf7d0', flexShrink: 0 }}>
                    {comp.weight}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '10px', fontSize: '0.74rem', color: '#15803d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>🤝 Endorsement: <strong>{activeTrade.industryEndorsement}</strong></span>
              <span>⚡ <strong>{activeTrade.workplaceReadinessGain}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= POLICY REFORM WEIGHTAGE SIMULATOR ================= */}
      <div style={{
        background: 'linear-gradient(135deg, #0b192c 0%, #1e3a8a 100%)',
        color: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 10px 30px rgba(11, 25, 44, 0.25)',
        border: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Sparkles size={22} style={{ color: '#fbbf24' }} />
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Statewide Assessment Weightage Policy Simulator
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#cbd5e1' }}>
              Adjust evaluation weightages to observe the direct impact on employer confidence, rote-learning elimination, and candidate job-readiness.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          
          {/* Sliders Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Slider 1: Theory CBT */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 700, marginBottom: '4px' }}>
                <span style={{ color: '#93c5fd' }}>1. Computer-Based Theory Test (CBT):</span>
                <span style={{ color: '#93c5fd' }}>{simTheoryPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={simTheoryPct}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setSimTheoryPct(val);
                  setSimSimTaskPct(100 - val - simLogbookPct - simJuryPct);
                }}
                style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Objective fundamental concepts test</span>
            </div>

            {/* Slider 2: Fault Simulation */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 700, marginBottom: '4px' }}>
                <span style={{ color: '#86efac' }}>2. Practical & VR Task Simulation:</span>
                <span style={{ color: '#86efac' }}>{simSimTaskPct}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="50"
                step="5"
                value={simSimTaskPct}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setSimSimTaskPct(val);
                  setSimTheoryPct(100 - val - simLogbookPct - simJuryPct);
                }}
                style={{ width: '100%', accentColor: '#22c55e', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Live fault diagnosis & machine toolpath execution</span>
            </div>

            {/* Slider 3: Digital Logbook */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 700, marginBottom: '4px' }}>
                <span style={{ color: '#fdba74' }}>3. Continuous Digital E-Logbook:</span>
                <span style={{ color: '#fdba74' }}>{simLogbookPct}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="30"
                step="5"
                value={simLogbookPct}
                onChange={(e) => setSimLogbookPct(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: '#f97316', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Continuous semester-long practical job verification</span>
            </div>

            {/* Slider 4: Industry Jury */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 700, marginBottom: '4px' }}>
                <span style={{ color: '#f472b6' }}>4. Industry-Jury On-Job Evaluation:</span>
                <span style={{ color: '#f472b6' }}>{simJuryPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                step="5"
                value={simJuryPct}
                onChange={(e) => setSimJuryPct(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: '#ec4899', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Plant manager evaluation of safety, 5S & SOPs</span>
            </div>
          </div>

          {/* Real-time Outcomes Display */}
          <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>
                Simulated Policy Impact
              </div>
              <h4 style={{ margin: '4px 0 14px 0', fontSize: '1.2rem', color: '#ffffff', fontWeight: 800 }}>
                Total Evaluation: {totalWeight}% (Normalized)
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#86efac', fontWeight: 700 }}>Employer Confidence Index</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#4ade80' }}>{employerConfidence} / 100</div>
                  <div style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>Direct reflection of practical job-readiness</div>
                </div>

                <div style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#93c5fd', fontWeight: 700 }}>Rote-Memorization Elimination</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38bdf8' }}>{roteReductionPct}% Reduction</div>
                  <div style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>Drastic reduction in cheating & paper memorization</div>
                </div>

                <div style={{ background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#fdba74', fontWeight: 700 }}>First-Month Productivity Gain</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fb923c' }}>+{productivityGain}%</div>
                  <div style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>Shorter apprentice ramp-up period at OEM factories</div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerateCircular}
              style={{
                marginTop: '16px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 16px',
                fontWeight: 800,
                fontSize: '0.86rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
              }}
            >
              <FileText size={16} />
              <span>{lang === 'mr' ? 'मूल्यांकन सुधारणा शासन परिपत्रक तयार करा' : 'Generate State Assessment Reform Circular'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= OFFICIAL CIRCULAR MODAL ================= */}
      {activeCircularModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
          onClick={() => setActiveCircularModal(null)}
        >
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
              border: '1px solid #cbd5e1'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ background: '#0b192c', color: '#ffffff', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Government of Maharashtra · Directorate of Vocational Education & Training (DVET)
                </div>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                  State Vocational Examination Reform Circular
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCircularModal(null)}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#ffffff', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>

            {/* Circular Body */}
            <div style={{ padding: '24px', fontSize: '0.86rem', color: '#1e293b', lineHeight: 1.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px', fontSize: '0.78rem', color: '#64748b' }}>
                <div><strong>Circular No:</strong> {activeCircularModal.circularNo}</div>
                <div><strong>Date of Issue:</strong> {activeCircularModal.date}</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                <div><strong>Subject:</strong> Mandatory transition from written pen-paper examination to 4-Tier Practical Task Simulation and Industry-Jury Evaluation for <strong>{activeCircularModal.trade} ({activeCircularModal.nsqfLevel})</strong> across Maharashtra ITIs.</div>
              </div>

              <p style={{ margin: '0 0 12px 0' }}>
                In alignment with National Skills Qualification Framework (NSQF) reforms and Maharashtra Industry 4.0 mandates, the evaluation rubric is hereby restructured into the following mandatory four-tier breakdown:
              </p>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                    <th style={{ padding: '8px' }}>Evaluation Component</th>
                    <th style={{ padding: '8px' }}>Weightage</th>
                    <th style={{ padding: '8px' }}>Assessment Methodology</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px', fontWeight: 700 }}>Continuous Digital E-Logbook</td>
                    <td style={{ padding: '8px', color: '#ea580c', fontWeight: 800 }}>{activeCircularModal.logbookPct}</td>
                    <td style={{ padding: '8px', color: '#64748b' }}>Biometrically verified practical job completions</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px', fontWeight: 700 }}>VR / Digital Fault Simulation</td>
                    <td style={{ padding: '8px', color: '#059669', fontWeight: 800 }}>{activeCircularModal.simulationPct}</td>
                    <td style={{ padding: '8px', color: '#64748b' }}>Timed diagnostic error tracing under dynamic load</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px', fontWeight: 700 }}>Industry-Jury On-Job Assessment</td>
                    <td style={{ padding: '8px', color: '#0284c7', fontWeight: 800 }}>{activeCircularModal.juryPct}</td>
                    <td style={{ padding: '8px', color: '#64748b' }}>Evaluation by OEM plant managers ({activeCircularModal.endorsement.split('&')[0]})</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', fontWeight: 700 }}>CBT Core Theory</td>
                    <td style={{ padding: '8px', color: '#64748b', fontWeight: 800 }}>{activeCircularModal.theoryPct}</td>
                    <td style={{ padding: '8px', color: '#64748b' }}>Objective computer-based fundamental test</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ background: '#ecfdf5', padding: '10px 14px', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '0.78rem', color: '#065f46', marginBottom: '16px' }}>
                ✓ Expected Impact: <strong>{activeCircularModal.confidence} Employer Confidence</strong> · <strong>{activeCircularModal.productivity} Productivity Acceleration</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  Approved by State Board of Vocational Examination,<br />
                  <strong>Director, Vocational Education & Training, Maharashtra</strong>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => setActiveCircularModal(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      showToast(`Official State Circular ${activeCircularModal.circularNo} downloaded as PDF!`);
                      setActiveCircularModal(null);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800 }}
                  >
                    <Download size={14} />
                    <span>Download Official PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
