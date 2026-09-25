import React from 'react';
import { CheckCircle2, ChevronRight, AlertTriangle, Sparkles, TrendingUp, Users } from 'lucide-react';
import { placementFunnelData } from '../../data/adminDashboardData';

export function PlacementFunnelView({ lang, t }) {
  const f = placementFunnelData;

  return (
    <div className="admin-table-card" id="admin-sec-placement-analytics" role="region" aria-label="Placement Analytics and Funnel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span className="section-tag" style={{ background: 'var(--navy-subtle)', color: 'var(--navy-deep)', borderColor: 'var(--border-medium)' }}>
            <CheckCircle2 size={13} />
            {lang === 'mr' ? 'राज्य पाइपलाइन व गळती विश्लेषण' : (lang === 'hi' ? 'राज्य पाइपलाइन एवं ड्रॉप-ऑफ एनालिटिक्स' : 'State Pipeline & Drop-Off Analytics')}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {lang === 'mr' 
              ? 'प्लेसमेंट फनेल: अभ्यासक्रम → प्रशिक्षण → प्रमाणन → रोजगार' 
              : (lang === 'hi' 
                ? 'प्लेसमेंट फ़नल: पाठ्यक्रम → प्रशिक्षण → प्रमाणन → रोजगार' 
                : 'Placement Funnel: Course → Training → Certification → Employment')}
          </h2>
        </div>

        <span className="badge badge-green">
          {lang === 'mr' ? '७८.४% अंतिम प्लेसमेंट प्रमाण' : (lang === 'hi' ? '७८.४% अंतिम प्लेसमेंट अनुपात' : '78.4% Final Placement Ratio')}
        </span>
      </div>

      {/* 4-Stage Visual Funnel Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {/* Stage 1 */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.74rem', color: '#1e40af', fontWeight: 700, textTransform: 'uppercase' }}>
            {lang === 'mr' ? '१. नोंदणी केलेले' : (lang === 'hi' ? '१. नामांकित' : '1. Enrolled')}
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e3a8a', marginTop: '2px' }}>
            {f.enrolled.count.split(' ')[0]}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#3b82f6', fontWeight: 600 }}>
            {lang === 'mr' ? '१००% एकूण प्रवेश' : (lang === 'hi' ? '१००% कुल प्रवेश' : '100% Cohort Intake')}
          </div>
        </div>

        {/* Stage 2 */}
        <div style={{ background: '#f8fafc', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
            {lang === 'mr' ? '२. प्रशिक्षण पूर्ण' : (lang === 'hi' ? '२. प्रशिक्षण पूर्ण' : '2. Training Completed')}
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {f.trainingCompleted.count.split(' ')[0]}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--warning-amber)', fontWeight: 600 }}>
            {f.trainingCompleted.pct} ({f.trainingCompleted.dropOff})
          </div>
        </div>

        {/* Stage 3 */}
        <div style={{ background: '#f8fafc', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
            {lang === 'mr' ? '३. प्रमाणित (उत्तीर्ण)' : (lang === 'hi' ? '३. प्रमाणित (उत्तीर्ण)' : '3. Certified (Passed)')}
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {f.certificationPassed.count.split(' ')[0]}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--navy-accent)', fontWeight: 600 }}>
            {f.certificationPassed.pct} {lang === 'mr' ? 'प्रमाणित' : (lang === 'hi' ? 'प्रमाणित' : 'Certified')}
          </div>
        </div>

        {/* Stage 4 */}
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.74rem', color: '#047857', fontWeight: 700, textTransform: 'uppercase' }}>
            {lang === 'mr' ? '४. रोजगार प्राप्त' : (lang === 'hi' ? '४. रोजगार प्राप्त' : '4. Employment Placed')}
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#065f46', marginTop: '2px' }}>
            {f.employmentPlaced.count.split(' ')[0]}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--success-dark)', fontWeight: 700 }}>
            {f.employmentPlaced.pct}
          </div>
        </div>
      </div>

      {/* Identified Bottlenecks & Policy Solutions */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertTriangle size={16} style={{ color: '#d97706' }} />
          {lang === 'mr' ? 'ओळखलेल्या अडचणी व उपाययोजना' : (lang === 'hi' ? 'पहचानी गई बाधाएं एवं उपचारात्मक नीतिगत कार्रवाई' : 'Identified Bottlenecks & Remedial Policy Actions')}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
          {f.bottlenecks.map((b, idx) => {
            const localizedCauses = [
              lang === 'mr' ? 'ग्रामीण भागातील विद्यार्थ्यांसाठी प्रवासाचा खर्च व अंतर' : (lang === 'hi' ? 'ग्रामीण छात्रों के लिए यात्रा लागत एवं दूरी' : b.cause),
              lang === 'mr' ? 'प्रॅक्टिकल लॅब उपकरणांची कमतरता व जुने सिम्युलेटर' : (lang === 'hi' ? 'प्रैक्टिकल लैब उपकरण की कमी एवं पुराने सिमुलेटर' : b.cause),
              lang === 'mr' ? 'उद्योगांशी थेट शिकाऊ उमेदवारी (NAPS) करारांचा अभाव' : (lang === 'hi' ? 'उद्योगों के साथ सीधे शिक्षुता (NAPS) टाई-अप का अभाव' : b.cause)
            ];
            const localizedSolutions = [
              lang === 'mr' ? 'डीबीटी द्वारे थेट मासिक प्रवास अनुदान' : (lang === 'hi' ? 'डीबीटी के माध्यम से प्रत्यक्ष यात्रा भत्ता' : b.solution),
              lang === 'mr' ? '₹२२.५ कोटी लॅब आधुनिकीकरण निधी त्वरित वाटप' : (lang === 'hi' ? '₹२२.५ करोड़ लैब आधुनिकीकरण अनुदान का त्वरित आवंटन' : b.solution),
              lang === 'mr' ? 'सर्व आयटीआयसाठी NAPS अनिवार्य प्लेसमेंट पोर्टल लिंकेज' : (lang === 'hi' ? 'सभी आईटीआई के लिए NAPS अनिवार्य पोर्टल लिंकेज' : b.solution)
            ];

            return (
              <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px 18px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '2px' }}>
                  {lang === 'mr' ? 'टप्पा:' : (lang === 'hi' ? 'चरण:' : 'Stage:')} {b.stage}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#b91c1c', marginBottom: '6px' }}>
                  <strong>{lang === 'mr' ? 'अडचण:' : (lang === 'hi' ? 'बाधा:' : 'Bottleneck:')}</strong> {localizedCauses[idx] || b.cause}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--success-dark)', fontWeight: 600 }}>
                  <strong>{lang === 'mr' ? 'शासकीय कृती:' : (lang === 'hi' ? 'सरकारी कार्रवाई:' : 'Gov Action:')}</strong> {localizedSolutions[idx] || b.solution}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
