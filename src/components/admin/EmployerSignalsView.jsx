import React from 'react';
import { MessageSquare, Building2, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { employerSignalsData } from '../../data/adminDashboardData';

export function EmployerSignalsView({ lang, t }) {
  return (
    <div className="admin-table-card" id="admin-sec-employer-feedback" role="region" aria-label="Employer Signals">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span className="section-tag" style={{ background: 'var(--navy-subtle)', color: 'var(--navy-deep)', borderColor: 'var(--border-medium)' }}>
            <MessageSquare size={13} />
            {lang === 'mr' ? 'उद्योग व कंपनी थेट टेलिमेट्री' : (lang === 'hi' ? 'उद्योग एवं कंपनी प्रत्यक्ष टेलीमेट्री' : 'Enterprise & Industry Telemetry')}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {lang === 'mr' 
              ? `नियोक्ता अभिप्राय व भरती कॉरिडॉर्स (${employerSignalsData.totalSurveyed})` 
              : (lang === 'hi' 
                ? `नियोक्ता संकेत एवं भर्ती गलियारे (${employerSignalsData.totalSurveyed})` 
                : `Employer Signals & Hiring Corridors (${employerSignalsData.totalSurveyed})`)}
          </h2>
        </div>

        <span className="badge badge-green">
          {lang === 'mr' ? 'सक्रिय महाराष्ट्र OEM निर्देशांक' : (lang === 'hi' ? 'सक्रिय महाराष्ट्र OEM सूचकांक' : 'Active Maharashtra OEM Index')}
        </span>
      </div>

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
  );
}
