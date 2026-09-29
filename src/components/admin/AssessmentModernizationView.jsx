import React, { useRef, useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Sliders,
  Sparkles,
  FileText,
  Download,
  BadgeCheck
} from 'lucide-react';
import { assessmentModernizationData } from '../../data/adminDashboardData';

/* =====================================================================
   Optional fields this view will show if you add them to each trade in
   assessmentModernizationData (if missing, demo values below are used so the prototype is never empty):
     placementRate      e.g. '62%'      (placement outcome for the trade)
     demandGap          e.g. '+1,200'   (open demand minus trained supply)
     employersValidated e.g. 4          (employers who signed off the scheme)
   ===================================================================== */

/* Props (all optional): industry, district, metric = the values of the header dropdowns.
   Pass them from the parent, e.g.
   <AssessmentModernizationView lang={lang} industry={industryFilter} district={districtFilter} metric={metricFilter} />
   "All ..." values (or empty) mean no filtering. */

/* ---------- Palette: neutral base + orange / green accents ---------- */
const C = {
  ink: '#0f172a',
  text: '#334155',
  muted: '#64748b',
  border: '#e2e8f0',
  soft: '#f8fafc',
  orange: '#c2410c',
  orangeBg: '#fff7ed',
  orangeLine: '#fed7aa',
  green: '#15803d',
  greenBg: '#f0fdf4',
  greenLine: '#bbf7d0'
};

/* ---------- Simulator config ---------- */
const SLIDERS = [
  { key: 'theory',  label: '1. Computer-Based Theory Test (CBT)', hint: 'Objective fundamental concepts test',        min: 10, max: 50 },
  { key: 'sim',     label: '2. Practical & VR Task Simulation',   hint: 'Live fault diagnosis & machine execution',   min: 20, max: 50 },
  { key: 'logbook', label: '3. Continuous Digital E-Logbook',     hint: 'Semester-long practical job verification',   min: 15, max: 30 },
  { key: 'jury',    label: '4. Industry-Jury On-Job Evaluation',  hint: 'Plant manager review of safety, 5S & SOPs',  min: 10, max: 30 }
];
const DEFAULT_WEIGHTS = { theory: 20, sim: 35, logbook: 25, jury: 20 };

// Demo values (sample data) used per trade, by position, when the data file has none.
// Replace by adding placementRate / demandGap / employersValidated to your trade data.
const DEMO_METRICS = [
  { placementRate: '78%', demandGap: '+1,240', employersValidated: 6 },
  { placementRate: '71%', demandGap: '+860',   employersValidated: 4 },
  { placementRate: '66%', demandGap: '+720',   employersValidated: 5 },
  { placementRate: '58%', demandGap: '+430',   employersValidated: 0 },
  { placementRate: '69%', demandGap: '+590',   employersValidated: 3 }
];

// Illustrative model only: coefficients are assumptions, not measured data.
function computeImpact(w) {
  return {
    confidence: Math.min(99, Math.round(50 + w.sim * 0.6 + w.jury * 0.8 + w.logbook * 0.4 - w.theory * 0.3)),
    roteReduction: Math.max(10, Math.round(100 - w.theory * 1.15)),
    productivity: Math.round(15 + w.sim * 0.45 + w.jury * 0.5)
  };
}

/* ---------- Helpers ---------- */
const text = (lang, en, mr, hi) => (lang === 'mr' ? mr : lang === 'hi' ? hi : en);
const num = (v) => Number(String(v ?? '').replace(/[^0-9.]/g, '')) || 0;

const buildCircularRows = (c) => [
  ['Continuous Digital E-Logbook', `${c.weights.logbook}%`, 'Biometrically verified practical job completions'],
  ['VR / Digital Fault Simulation', `${c.weights.sim}%`, 'Timed diagnostic error tracing under dynamic load'],
  ['Industry-Jury On-Job Assessment', `${c.weights.jury}%`, `Evaluation by OEM plant managers (${c.endorsement.split('&')[0].trim()})`],
  ['CBT Core Theory', `${c.weights.theory}%`, 'Objective computer-based fundamental test']
];

function downloadCircularDraft(c) {
  const rows = buildCircularRows(c)
    .map(([a, b, d]) => `<tr><td>${a}</td><td><b>${b}</b></td><td>${d}</td></tr>`)
    .join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${c.no}</title>
<style>body{font-family:Arial,sans-serif;max-width:720px;margin:32px auto;color:#0f172a;line-height:1.5}
table{width:100%;border-collapse:collapse;margin:16px 0}td,th{border:1px solid #cbd5e1;padding:8px;text-align:left}
.draft{color:#c2410c;font-weight:bold}</style></head><body>
<p class="draft">DRAFT - PENDING APPROVAL</p>
<h2>State Vocational Examination Reform Circular (Draft)</h2>
<p>Government of Maharashtra - Directorate of Vocational Education &amp; Training (DVET)</p>
<p><b>Ref:</b> ${c.no} &nbsp; <b>Date:</b> ${c.date}</p>
<p><b>Subject:</b> Proposed transition from written examination to 4-Tier Practical Task Simulation and Industry-Jury Evaluation for ${c.trade} (${c.level}).</p>
<table><tr><th>Component</th><th>Weightage</th><th>Methodology</th></tr>${rows}</table>
<p>Illustrative estimate: employer confidence ${c.impact.confidence}/100, productivity +${c.impact.productivity}%.</p>
<p>Employer validation: ${c.validated ? 'Recorded' : 'Pending'}.</p>
<p>Pending approval by the State Board of Vocational Examination / Director, DVET, Maharashtra.</p>
</body></html>`;
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${c.no.replace(/[\/\\]/g, '-')}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ---------- Small presentational pieces ---------- */
function Kpi({ label, value, note, color = C.ink }) {
  return (
    <div style={{ background: C.soft, border: `1px solid ${C.border}`, padding: 16, borderRadius: 12 }}>
      <div style={{ fontSize: '0.72rem', color: C.muted, textTransform: 'uppercase', fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: '1.55rem', fontWeight: 900, color, marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: '0.74rem', color: C.text, marginTop: 4 }}>{note}</div>
    </div>
  );
}

function Metric({ label, value, note, color = C.ink }) {
  return (
    <div style={{ background: C.soft, border: `1px solid ${C.border}`, padding: '10px 14px', borderRadius: 8 }}>
      <div style={{ fontSize: '0.76rem', color: C.text, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: '1.4rem', fontWeight: 900, color }}>{value}</div>
      <div style={{ fontSize: '0.72rem', color: C.muted }}>{note}</div>
    </div>
  );
}

const flexRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 };

export function AssessmentModernizationView({ lang = 'en', industry = 'all', district = 'all', metric = 'all' }) {
  const [selectedTradeId, setSelectedTradeId] = useState(assessmentModernizationData[0].id);
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [proposed, setProposed] = useState({});
  const [validated, setValidated] = useState({});
  const [circular, setCircular] = useState(null);
  const [toast, setToast] = useState('');
  const simRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4500);
  };

  /* ---- Simulator (independent sliders, must total 100) ---- */
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const isValidTotal = totalWeight === 100;
  const impact = computeImpact(weights);

  /* ---- Data, demo fallbacks ---- */
  const trades = assessmentModernizationData;
  const metricOf = (a, key) => {
    if (a[key] !== undefined && a[key] !== null) return a[key];
    const idx = Math.max(0, trades.findIndex(x => x.id === a.id));
    return DEMO_METRICS[idx % DEMO_METRICS.length][key];
  };
  const isValidated = (a) => validated[a.id] ?? num(metricOf(a, 'employersValidated')) > 0;

  /* ---- Follow the header dropdowns (industry, district, metric) ---- */
  const isAll = (v) => !v || /^all/i.test(String(v));
  const matchesIndustry = (a) =>
    isAll(industry) || `${a.sector} ${a.trade}`.toLowerCase().includes(String(industry).toLowerCase());
  const matchesDistrict = (a) =>
    isAll(district) || String(a.pilotCenters).toLowerCase().includes(String(district).toLowerCase());

  const getSort = () => {
    if (isAll(metric)) return null;
    const m = String(metric).toLowerCase();
    if (m.includes('placement'))
      return { fn: (a) => num(metricOf(a, 'placementRate')), note: 'lowest placement rate first' };
    if (m.includes('capacity') || m.includes('deficit') || m.includes('employment') || m.includes('vacancy'))
      return { fn: (a) => -num(metricOf(a, 'demandGap')), note: 'largest demand-supply gap first' };
    if (m.includes('curriculum') || m.includes('course'))
      return { fn: (a) => -num(a.legacyScheme?.writtenTheoryPct), note: 'most written-heavy scheme first' };
    return null;
  };
  const sort = getSort();
  const scopeTrades = trades.filter(a => matchesIndustry(a) && matchesDistrict(a));
  if (sort) scopeTrades.sort((a, b) => sort.fn(a) - sort.fn(b));

  const trade = scopeTrades.find(a => a.id === selectedTradeId) || scopeTrades[0];

  /* ---- KPIs derived from the filtered trades (not hard-coded) ---- */
  const avgLegacyWritten = Math.round(
    scopeTrades.reduce((sum, a) => sum + num(a.legacyScheme?.writtenTheoryPct), 0) / (scopeTrades.length || 1)
  );
  const proposedPractical = 100 - weights.theory;
  const totalCandidates = scopeTrades.reduce((sum, a) => sum + num(a.studentsEnrolled), 0);
  const validatedCount = scopeTrades.filter(isValidated).length;

  /* ---- Actions ---- */
  const proposeAdoption = () => {
    setProposed(prev => ({ ...prev, [trade.id]: true }));
    showToast(text(lang,
      `Adoption proposal submitted for ${trade.trade}. Awaiting approval.`,
      `${trade.trade} साठी अवलंब प्रस्ताव सादर केला. मंजुरीची प्रतीक्षा.`,
      `${trade.trade} के लिए अंगीकरण प्रस्ताव प्रस्तुत किया गया। स्वीकृति की प्रतीक्षा।`));
  };

  const toggleValidation = () => {
    const next = !isValidated(trade);
    setValidated(prev => ({ ...prev, [trade.id]: next }));
    showToast(next
      ? `Employer validation recorded for ${trade.trade}.`
      : `Employer validation removed for ${trade.trade}.`);
  };

  const generateCircular = () => {
    if (!isValidTotal) return;
    setCircular({
      no: `DVET-MSDE/EXAM-MODERN/2026/DRAFT-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      trade: trade.trade,
      level: trade.nsqfLevel,
      endorsement: trade.industryEndorsement,
      weights: { ...weights },
      impact,
      validated: isValidated(trade)
    });
  };

  const scrollToSimulator = () => simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (!trade) {
    return (
      <div className="admin-table-card" id="admin-sec-assessment-modernization" role="region" aria-label="Assessment Methods Modernization">
        <p style={{ color: C.muted, fontSize: '0.9rem' }}>
          No pilot trades match the selected industry or district. Choose "All Industries" or "All 36 Districts" to see all trades.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-table-card" id="admin-sec-assessment-modernization" role="region" aria-label="Assessment Methods Modernization">

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 9999,
          background: C.green, color: '#fff', padding: '12px 20px', borderRadius: 8,
          boxShadow: '0 10px 25px rgba(15,23,42,0.25)', fontSize: '0.86rem', fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <CheckCircle2 size={18} />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ ...flexRow, marginBottom: 22, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <span className="section-tag" style={{ background: C.orangeBg, color: C.orange, borderColor: C.orangeLine }}>
            <ClipboardCheck size={13} />
            {text(lang,
              'DVET Examination & Assessment Methods Reform',
              'DVET परीक्षा व मूल्यांकन पद्धती सुधारणा',
              'DVET परीक्षा एवं मूल्यांकन पद्धति सुधार')}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: 2 }}>
            {text(lang,
              'Assessment Modernization Matrix: Rote-Learning to Task Simulations & Jury',
              'मूल्यांकन आधुनिकीकरण मॅट्रिक्स: घोकंपट्टी परीक्षा ते प्रत्यक्ष कार्य सिम्युलेशन',
              'मूल्यांकन आधुनिकीकरण मैट्रिक्स: रट्टा परीक्षा से व्यावहारिक कार्य सिमुलेशन')}
          </h2>
          <p style={{ fontSize: '0.82rem', color: C.muted, margin: '4px 0 0 0' }}>
            {text(lang,
              `Moving from ~${avgLegacyWritten}% written rote-learning exams to practical task simulations, continuous digital logbooks and industry-jury on-job evaluations.`,
              'लेखी घोकंपट्टी परीक्षेऐवजी प्रत्यक्ष टास्क सिम्युलेशन, डिजिटल ई-लॉगबुक आणि उद्योग प्रतिनिधी मूल्यांकनाचा अवलंब.',
              'लिखित रट्टा परीक्षा की जगह व्यावहारिक सिमुलेशन, डिजिटल ई-लॉगबुक और उद्योग जूरी मूल्यांकन।')}
          </p>
        </div>

        <button type="button" className="btn btn-primary btn-sm" onClick={scrollToSimulator}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800 }}>
          <Sliders size={14} />
          <span>{text(lang, 'Assessment Reform Simulator', 'मूल्यांकन नियमक सिम्युलेटर', 'मूल्यांकन नियामक सिम्युलेटर')}</span>
        </button>
      </div>

      {/* KPI cards (derived from data) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, marginBottom: 24 }}>
        <Kpi label="Legacy Written Share (avg)" value={`${avgLegacyWritten}% Written`} color={C.orange}
             note={`Average across ${scopeTrades.length} pilot trade${scopeTrades.length === 1 ? '' : 's'}`} />
        <Kpi label="Proposed Practical Share" value={`${proposedPractical}% Practical / Sim`} color={C.green}
             note="Simulation, e-logbook & industry jury (from simulator)" />
        <Kpi label="Candidates Covered" value={totalCandidates.toLocaleString('en-IN')}
             note="Candidates per year across pilot trades" />
        <Kpi label="Employer-Validated Trades" value={`${validatedCount} of ${scopeTrades.length}`}
             note="Trades where employers signed off the new scheme" />
      </div>

      {/* Trade tabs (follow the header dropdowns) */}
      <div style={{ fontSize: '0.78rem', color: C.muted, marginBottom: 8 }}>
        Showing {scopeTrades.length} of {trades.length} pilot trades{sort ? ` · sorted by ${sort.note}` : ''}
      </div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 10, marginBottom: 18 }}>
        {scopeTrades.map((item) => {
          const active = trade.id === item.id;
          return (
            <button key={item.id} type="button" onClick={() => setSelectedTradeId(item.id)}
              style={{
                padding: '8px 14px', borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap',
                fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6,
                border: active ? `2px solid ${C.green}` : '1px solid #cbd5e1',
                background: active ? C.greenBg : '#fff',
                color: active ? '#166534' : '#475569'
              }}>
              <span>{item.trade}</span>
              <span style={{ fontSize: '0.68rem', padding: '1px 5px', borderRadius: 4, background: active ? C.greenLine : '#f1f5f9', color: '#1e293b' }}>
                {item.nsqfLevel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active trade: legacy vs modern */}
      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.74rem', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                {trade.id}
              </span>
              <span style={{ fontSize: '0.74rem', background: '#f1f5f9', color: C.text, padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                ● {trade.status}
              </span>
              {isValidated(trade) && (
                <span style={{ fontSize: '0.74rem', background: C.greenBg, color: C.green, border: `1px solid ${C.greenLine}`, padding: '2px 8px', borderRadius: 4, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <BadgeCheck size={12} /> Employer validated
                </span>
              )}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '4px 0 2px 0' }}>
              {trade.trade} ({trade.nsqfLevel})
            </h3>
            <div style={{ fontSize: '0.78rem', color: C.muted }}>
              Sector: <strong>{trade.sector}</strong> · Pilot Centers: <strong>{trade.pilotCenters}</strong> ({trade.studentsEnrolled} candidates/yr)
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: C.green, background: C.greenBg, padding: '4px 10px', borderRadius: 6, border: `1px solid ${C.greenLine}` }}>
              {trade.employerSatisfactionScore} Industry Rating
            </span>
            <button type="button" className="btn btn-outline btn-sm" onClick={toggleValidation} style={{ fontWeight: 800, fontSize: '0.78rem' }}>
              {isValidated(trade) ? 'Undo Employer Validation' : 'Record Employer Validation'}
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={proposeAdoption}
              disabled={proposed[trade.id]} style={{ fontWeight: 800, fontSize: '0.78rem' }}>
              {proposed[trade.id] ? 'Proposal Submitted ✓' : 'Propose Statewide Adoption'}
            </button>
          </div>
        </div>

        {/* Mismatch indicators: ties assessment reform to demand/placement */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginBottom: 16 }}>
          {[
            ['Placement rate', metricOf(trade, 'placementRate'), C.green, 'Last 12 months'],
            ['Demand-supply gap', metricOf(trade, 'demandGap'), C.orange, 'Open jobs minus trained supply'],
            ['Employers validated', isValidated(trade) ? Math.max(1, num(metricOf(trade, 'employersValidated'))) : 0, C.green, 'Signed off this scheme']
          ].map(([label, value, color, note]) => (
            <div key={label} style={{ background: C.soft, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px' }}>
              <div style={{ fontSize: '0.7rem', color: C.muted, textTransform: 'uppercase', fontWeight: 700 }}>{label}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color }}>{value}</div>
              <div style={{ fontSize: '0.7rem', color: C.muted }}>{note}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          {/* Legacy */}
          <div style={{ background: C.soft, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
            <div style={{ ...flexRow, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.orange, fontWeight: 800, fontSize: '0.86rem' }}>
                <XCircle size={16} />
                <span>Legacy Evaluation Scheme (Obsolescent)</span>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#ffedd5', color: C.orange, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                {trade.legacyScheme.writtenTheoryPct}% Written / {trade.legacyScheme.fixedPracticalPct}% Practical
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: C.text, margin: '0 0 10px 0', lineHeight: 1.45 }}>
              {trade.legacyScheme.description}
            </p>
            <div style={{ background: C.orangeBg, borderLeft: '3px solid #ea580c', padding: '8px 12px', borderRadius: '0 6px 6px 0', fontSize: '0.76rem', color: '#7c2d12' }}>
              <strong>Critical Deficiency:</strong> {trade.legacyScheme.shortcomings}
            </div>
          </div>

          {/* Modern */}
          <div style={{ background: C.soft, border: '1px solid #cbd5e1', borderRadius: 10, padding: 16 }}>
            <div style={{ ...flexRow, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.green, fontWeight: 800, fontSize: '0.86rem' }}>
                <CheckCircle2 size={16} />
                <span>Reformed 4-Tier Practical Assessment Framework</span>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                Hands-On & Simulation
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
              {trade.modernScheme.components.map((comp, i) => (
                <div key={i} style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 6, padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, fontSize: '0.78rem' }}>
                  <div>
                    <strong style={{ color: 'var(--navy-deep)' }}>{comp.name}:</strong>
                    <span style={{ color: '#475569', marginLeft: 4 }}>{comp.method}</span>
                  </div>
                  <span style={{ fontWeight: 800, color: C.green, background: C.greenBg, padding: '1px 6px', borderRadius: 4, border: `1px solid ${C.greenLine}`, flexShrink: 0 }}>
                    {comp.weight}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 10, fontSize: '0.74rem', color: '#475569', ...flexRow }}>
              <span>Endorsement: <strong>{trade.industryEndorsement}</strong></span>
              <span><strong>{trade.workplaceReadinessGain}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= WEIGHTAGE SIMULATOR ================= */}
      <div ref={simRef} style={{ background: C.soft, color: C.ink, borderRadius: 16, padding: 24, border: `1px solid ${C.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Sparkles size={22} style={{ color: '#ea580c' }} />
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: C.ink }}>
              Statewide Assessment Weightage Policy Simulator
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: C.muted }}>
              Adjust weightages to see the estimated effect on employer confidence and job-readiness. Total must equal 100%.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {/* Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {SLIDERS.map((s) => (
              <div key={s.key}>
                <div style={{ ...flexRow, fontSize: '0.78rem', fontWeight: 700, marginBottom: 4, color: C.text }}>
                  <label htmlFor={`w-${s.key}`}>{s.label}</label>
                  <span>{weights[s.key]}%</span>
                </div>
                <input
                  id={`w-${s.key}`}
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={5}
                  value={weights[s.key]}
                  onChange={(e) => setWeights(w => ({ ...w, [s.key]: parseInt(e.target.value, 10) }))}
                  style={{ width: '100%', accentColor: C.green, cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.7rem', color: C.muted }}>{s.hint}</span>
              </div>
            ))}
          </div>

          {/* Outcomes */}
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: C.muted, fontWeight: 700 }}>
                Simulated Policy Impact (illustrative estimate)
              </div>
              <h4 style={{ margin: '4px 0 14px 0', fontSize: '1.2rem', fontWeight: 800, color: isValidTotal ? C.ink : C.orange }}>
                Total Evaluation: {totalWeight}% {isValidTotal ? '✓' : '(adjust to reach 100%)'}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Metric label="Employer Confidence Index" value={`${impact.confidence} / 100`} color={C.green}
                        note="Reflects weight given to practical job-readiness" />
                <Metric label="Rote-Memorization Reduction" value={`${impact.roteReduction}%`}
                        note="Less paper memorization and cheating risk" />
                <Metric label="First-Month Productivity Gain" value={`+${impact.productivity}%`} color={C.orange}
                        note="Shorter apprentice ramp-up at OEM factories" />
              </div>
              <p style={{ fontSize: '0.7rem', color: C.muted, margin: '10px 0 0 0' }}>
                Model uses assumed coefficients. Calibrate with placement and employer-survey data before policy use.
              </p>
            </div>

            <button
              type="button"
              onClick={generateCircular}
              disabled={!isValidTotal}
              style={{
                marginTop: 16, background: isValidTotal ? C.green : '#94a3b8', color: '#fff', border: 'none',
                borderRadius: 8, padding: '10px 16px', fontWeight: 800, fontSize: '0.86rem',
                cursor: isValidTotal ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              <FileText size={16} />
              <span>{text(lang, 'Generate Draft Reform Circular', 'मूल्यांकन सुधारणा मसुदा परिपत्रक तयार करा', 'मूल्यांकन सुधार मसौदा परिपत्र तैयार करें')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= DRAFT CIRCULAR MODAL ================= */}
      {circular && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}
          onClick={() => setCircular(null)}
        >
          <div
            style={{ background: '#fff', borderRadius: 14, maxWidth: 680, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)', border: '1px solid #cbd5e1' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ background: '#1e293b', color: '#fff', padding: '18px 24px', ...flexRow }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#fdba74', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Government of Maharashtra · DVET · Draft for Approval
                </div>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                  State Vocational Examination Reform Circular (Draft)
                </h3>
              </div>
              <button type="button" onClick={() => setCircular(null)} aria-label="Close"
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <div style={{ padding: 24, fontSize: '0.86rem', color: '#1e293b', lineHeight: 1.6 }}>
              <div style={{ ...flexRow, borderBottom: `1px solid ${C.border}`, paddingBottom: 12, marginBottom: 16, fontSize: '0.78rem', color: C.muted }}>
                <div><strong>Draft Ref:</strong> {circular.no}</div>
                <div><strong>Date:</strong> {circular.date}</div>
              </div>

              <div style={{ background: C.soft, padding: '12px 16px', borderRadius: 8, border: `1px solid ${C.border}`, marginBottom: 16 }}>
                <strong>Subject:</strong> Proposed transition from written pen-paper examination to 4-Tier Practical Task Simulation and Industry-Jury Evaluation for <strong>{circular.trade} ({circular.level})</strong> across Maharashtra ITIs.
              </div>

              <p style={{ margin: '0 0 12px 0' }}>
                In line with NSQF reforms, the evaluation rubric is proposed to be restructured into the following four-tier breakdown:
              </p>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16, fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                    <th style={{ padding: 8 }}>Evaluation Component</th>
                    <th style={{ padding: 8 }}>Weightage</th>
                    <th style={{ padding: 8 }}>Assessment Methodology</th>
                  </tr>
                </thead>
                <tbody>
                  {buildCircularRows(circular).map(([name, pct, method]) => (
                    <tr key={name} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: 8, fontWeight: 700 }}>{name}</td>
                      <td style={{ padding: 8, fontWeight: 800, color: C.ink }}>{pct}</td>
                      <td style={{ padding: 8, color: C.muted }}>{method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ background: C.greenBg, padding: '10px 14px', borderRadius: 8, border: `1px solid ${C.greenLine}`, fontSize: '0.78rem', color: '#166534', marginBottom: 8 }}>
                Illustrative estimate: <strong>{circular.impact.confidence}/100 Employer Confidence</strong> · <strong>+{circular.impact.productivity}% Productivity</strong>
              </div>
              <div style={{ fontSize: '0.78rem', color: circular.validated ? C.green : C.orange, fontWeight: 700 }}>
                Employer validation: {circular.validated ? 'Recorded' : 'Pending'}
              </div>

              <div style={{ ...flexRow, marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}`, flexWrap: 'wrap' }}>
                <div style={{ fontSize: '0.74rem', color: C.muted }}>
                  Pending approval by State Board of Vocational Examination,<br />
                  <strong>Director, Vocational Education & Training, Maharashtra</strong>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setCircular(null)}>Close</button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      downloadCircularDraft(circular);
                      showToast(`Draft ${circular.no} downloaded.`);
                      setCircular(null);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 800 }}
                  >
                    <Download size={14} />
                    <span>Download Draft</span>
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