import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  FileText, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { curriculumGapAnalyses } from '../../data/adminDashboardData';

export function CurriculumGapDetector({ onRecommendUpdate, lang, t }) {
  const [selectedGapId, setSelectedGapId] = useState('gap-ev');

  const activeGap = curriculumGapAnalyses.find(g => g.id === selectedGapId) || curriculumGapAnalyses[0];

  const occupationLocalized = lang === 'mr' 
    ? (selectedGapId === 'gap-ev' ? 'इलेक्ट्रिक व्हेईकल (EV) सर्व्हिस व पॉवरट्रेन तंत्रज्ञ' : '५-अक्षीय प्रगत CNC व VMC मशीनिंग ऑपरेटर')
    : (lang === 'hi'
      ? (selectedGapId === 'gap-ev' ? 'इलेक्ट्रिक वाहन (EV) सेवा एवं पावरट्रेन तकनीशियन' : '५-अक्षीय उन्नत CNC एवं VMC मशीनिंग ऑपरेटर')
      : activeGap.occupation);

  return (
    <div className="admin-table-card" id="admin-sec-curriculum-alignment" role="region" aria-label="Curriculum Gap Detector">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="section-tag" style={{ background: '#fffbeb', color: '#b45309', borderColor: '#fde68a' }}>
            <BookOpen size={13} />
            {lang === 'mr' ? 'DVET / MSSDS अभ्यासक्रम आधुनिकीकरण' : (lang === 'hi' ? 'DVET / MSSDS पाठ्यक्रम आधुनिकीकरण' : 'DVET / MSSDS Curriculum Modernization')}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {lang === 'mr' ? 'अभ्यासक्रम तफावत शोधक व कौशल्य संरेखन' : (lang === 'hi' ? 'पाठ्यक्रम अंतर पहचानकर्ता एवं क्षमता संरेखण' : 'Curriculum Gap Detector & Competency Alignment')}
          </h2>
        </div>

        {/* Trade Selector */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            className={`btn btn-sm ${selectedGapId === 'gap-ev' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setSelectedGapId('gap-ev')}
          >
            {lang === 'mr' ? 'ईव्ही तंत्रज्ञ ट्रेड' : (lang === 'hi' ? 'ईवी तकनीशियन ट्रेड' : 'EV Technician Trade')}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${selectedGapId === 'gap-cnc' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setSelectedGapId('gap-cnc')}
          >
            {lang === 'mr' ? '५-अक्षीय CNC ट्रेड' : (lang === 'hi' ? '५-अक्षीय CNC ट्रेड' : '5-Axis CNC Trade')}
          </button>
        </div>
      </div>

      {/* Target Occupation Header */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '18px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {lang === 'mr' ? 'लक्ष्य व्यावसायिक ट्रेड' : (lang === 'hi' ? 'लक्षित व्यावसायिक ट्रेड' : 'Target Vocational Trade')}
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {occupationLocalized}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-saffron">
            {activeGap.urgency}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {lang === 'mr' ? 'प्रमाण पुरावा:' : (lang === 'hi' ? 'प्रमाण साक्ष्य:' : 'Evidence:')} {activeGap.evidenceCitation}
          </span>
        </div>
      </div>

      {/* Side-by-Side Comparison: Industry Requires vs Current Curriculum */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Left: What Maharashtra Industry Requires */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#166534', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={16} />
            {lang === 'mr' ? 'आधुनिक उद्योग गरजा (२०२६ मानके)' : (lang === 'hi' ? 'आधुनिक उद्योग आवश्यकताएं (२०२६ मानक)' : 'Modern Industry Requirements (2026 Standards)')}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeGap.industryRequired.map((req, idx) => (
              <div key={idx} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid #dcfce7', fontSize: '0.84rem', fontWeight: 600, color: '#14532d', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--success-green)', fontWeight: 800 }}>✓</span>
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Current State Curriculum */}
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#991b1b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} />
            {lang === 'mr' ? 'सध्याचा DVET अभ्यासक्रम (जुना अभ्यासक्रम)' : (lang === 'hi' ? 'वर्तमान मानक DVET पाठ्यक्रम (पुराना पाठ्यक्रम)' : 'Current Standard DVET Curriculum (Legacy Syllabus)')}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeGap.currentCurriculum.map((curr, idx) => (
              <div key={idx} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid #fee2e2', fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span>{curr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlighted Missing Competencies */}
      <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 'var(--radius-lg)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#9a3412', textTransform: 'uppercase', marginBottom: '4px' }}>
            {lang === 'mr' ? 'सध्याच्या आयटीआय विद्यार्थ्यांमधील गंभीर उणीवा:' : (lang === 'hi' ? 'वर्तमान आईटीआई स्नातकों में गंभीर कमियां:' : 'Critical Missing Competencies in Current ITI Graduates:')}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {activeGap.missingCompetencies.map((comp, idx) => (
              <span key={idx} className="badge badge-saffron" style={{ background: '#ffffff', color: '#c2410c' }}>
                ✕ {comp}
              </span>
            ))}
          </div>
        </div>

        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => onRecommendUpdate(activeGap)}
        >
          <FileText size={16} />
          {lang === 'mr' ? 'अभ्यासक्रम सुधारणा सुचवा' : (lang === 'hi' ? 'पाठ्यक्रम संशोधन अनुशंसित करें' : 'Recommend Curriculum Update')}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
