import React from 'react';
import { Sparkles, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import { emergingSkillsRadarData } from '../../data/adminDashboardData';

export function EmergingSkillsRadar({ lang, t }) {
  return (
    <div className="admin-table-card" id="admin-sec-emerging-skills" role="region" aria-label="Emerging Skills Radar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span className="section-tag" style={{ background: 'var(--navy-subtle)', color: 'var(--navy-deep)', borderColor: 'var(--border-medium)' }}>
            <Sparkles size={13} />
            {lang === 'mr' ? 'भविष्यातील औद्योगिक दिशा (२०२६-२०३०)' : (lang === 'hi' ? 'भविष्य के उद्योग परिदृश्य (२०२६-२०३०)' : 'Future Industry Horizons (2026-2030)')}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {lang === 'mr' ? 'उदयोन्मुख कौशल्य रडार व अवलंबन मॅट्रिक्स' : (lang === 'hi' ? 'उभरते कौशल रडार एवं अंगीकरण मैट्रिक्स' : 'Emerging Skills Radar & Adoption Matrix')}
          </h2>
        </div>

        <span className="badge badge-saffron">
          {lang === 'mr' ? 'राज्य विशेष आर्थिक क्षेत्र' : (lang === 'hi' ? 'राज्य विशेष आर्थिक क्षेत्र' : 'State Special Economic Zones')}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        {emergingSkillsRadarData.map((item, idx) => {
          const localizedSkills = [
            lang === 'mr' ? 'ईव्ही बॅटरी मॅनेजमेंट सिस्टीम्स (BMS)' : (lang === 'hi' ? 'ईवी बैटरी प्रबंधन प्रणाली (BMS)' : item.skill),
            lang === 'mr' ? '५-अक्षीय प्रगत CNC सिमुलेशन' : (lang === 'hi' ? '५-अक्षीय उन्नत CNC सिमुलेशन' : item.skill),
            lang === 'mr' ? 'इंडस्ट्रियल आयओटी व SCADA ऑटोमेशन' : (lang === 'hi' ? 'औद्योगिक आईओटी एवं SCADA स्वचालन' : item.skill),
            lang === 'mr' ? 'ग्रीन हायड्रोजन व सौर तंत्रज्ञान' : (lang === 'hi' ? 'ग्रीन हाइड्रोजन एवं सौर प्रौद्योगिकी' : item.skill)
          ];

          return (
            <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                  {localizedSkills[idx] || item.skill}
                </h3>
                <span className="badge badge-green">{item.growthYoY}</span>
              </div>

              {/* Demand Gauge Bar */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '2px' }}>
                  <span>{lang === 'mr' ? 'मागणी निर्देशांक' : (lang === 'hi' ? 'मांग सूचकांक' : 'DEMAND INDEX')}</span>
                  <span>{item.demandIndex} / 100</span>
                </div>
                <div className="proficiency-bar-bg" style={{ height: '6px' }}>
                  <div className="proficiency-bar-fill high" style={{ width: `${item.demandIndex}%` }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <span>{lang === 'mr' ? 'प्रशिक्षण उपलब्धता:' : (lang === 'hi' ? 'प्रशिक्षण उपलब्धता:' : 'Training Availability:')} <strong>{item.seatAvailability} {lang === 'mr' ? 'CoE हब्स' : (lang === 'hi' ? 'CoE हब' : 'CoE Hubs')}</strong></span>
                <span>{lang === 'mr' ? 'अवलंबन:' : (lang === 'hi' ? 'स्वीकृति:' : 'Adoption:')} <strong>{item.industryAdoption}</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
