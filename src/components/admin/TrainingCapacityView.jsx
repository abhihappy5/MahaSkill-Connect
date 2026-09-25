import React from 'react';
import { Layers, AlertTriangle, CheckCircle2, TrendingDown, Building2 } from 'lucide-react';
import { trainingCapacityData } from '../../data/adminDashboardData';

export function TrainingCapacityView({ onReallocateSeats, lang, t }) {
  return (
    <div className="admin-table-card" id="admin-sec-training-capacity" role="region" aria-label="Training Capacity Gap">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span className="section-tag" style={{ background: 'var(--navy-subtle)', color: 'var(--navy-deep)', borderColor: 'var(--border-medium)' }}>
            <Layers size={13} />
            {lang === 'mr' ? 'राज्य पायाभूत सुविधा व जागा वाटप' : (lang === 'hi' ? 'राज्य अवसंरचना एवं सीट आवंटन' : 'State Infrastructure & Seat Allocations')}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {lang === 'mr' ? 'जिल्ह्यानुसार प्रशिक्षण क्षमता वि. औद्योगिक मागणी' : (lang === 'hi' ? 'जिलेवार प्रशिक्षण क्षमता बनाम उद्योग मांग' : 'Training Capacity vs Industry Demand by District')}
          </h2>
        </div>

        <span className="badge" style={{ background: '#fef2f2', color: '#b91c1c', borderColor: '#fecaca', fontSize: '0.84rem' }}>
          {lang === 'mr' ? 'राज्यव्यापी एकूण तूट: -१४,८५० जागा' : (lang === 'hi' ? 'राज्यव्यापी शुद्ध कमी: -१४,८५० सीटें' : 'Statewide Net Deficit: -14,850 Seats')}
        </span>
      </div>

      {/* District Seat Comparison Table */}
      <table className="gov-data-table">
        <thead>
          <tr>
            <th>{lang === 'mr' ? 'जिल्हा' : (lang === 'hi' ? 'जिला' : 'District')}</th>
            <th>{lang === 'mr' ? 'आवश्यक जागा (औद्योगिक मागणी)' : (lang === 'hi' ? 'आवश्यक सीटें (उद्योग मांग)' : 'Required Seats (Industry Demand)')}</th>
            <th>{lang === 'mr' ? 'उपलब्ध जागा (मंजूर आयटीआय)' : (lang === 'hi' ? 'उपलब्ध सीटें (स्वीकृत आईटीआई)' : 'Available Seats (Sanctioned ITI)')}</th>
            <th>{lang === 'mr' ? 'जागांची तूट / तफावत' : (lang === 'hi' ? 'सीट अंतर / कमी' : 'Seat Deficit / Gap')}</th>
            <th>{lang === 'mr' ? 'मंजूर निधी' : (lang === 'hi' ? 'स्वीकृत बजट' : 'Sanctioned Budget')}</th>
            <th>{lang === 'mr' ? 'जागा वापर प्रमाण' : (lang === 'hi' ? 'सीट उपयोग' : 'Seat Utilization')}</th>
            <th>{lang === 'mr' ? 'धोरणात्मक कृती' : (lang === 'hi' ? 'नीतिगत कार्रवाई' : 'Policy Action')}</th>
          </tr>
        </thead>
        <tbody>
          {trainingCapacityData.map((d, idx) => {
            const districtLocalized = lang === 'mr'
              ? (d.district === 'Pune' ? 'पुणे' : (d.district === 'Mumbai & MMR' ? 'मुंबई व एमएमआर' : (d.district === 'Chh. Sambhajinagar' ? 'छत्रपती संभाजीनगर' : (d.district === 'Nagpur' ? 'नागपूर' : (d.district === 'Nashik' ? 'नाशिक' : (d.district === 'Solapur' ? 'सोलापूर' : d.district))))))
              : (lang === 'hi'
                ? (d.district === 'Pune' ? 'पुणे' : (d.district === 'Mumbai & MMR' ? 'मुंबई एवं एमएमआर' : (d.district === 'Chh. Sambhajinagar' ? 'छत्रपति संभाजीनगर' : (d.district === 'Nagpur' ? 'नागपुर' : (d.district === 'Nashik' ? 'नासिक' : (d.district === 'Solapur' ? 'सोलापुर' : d.district))))))
                : d.district);

            return (
              <tr key={idx}>
                <td>
                  <div style={{ fontWeight: 800, color: 'var(--navy-deep)' }}>{districtLocalized}</div>
                </td>
                <td>
                  <span style={{ fontWeight: 700 }}>{d.requiredSeats.toLocaleString()} {lang === 'mr' ? 'जागा' : (lang === 'hi' ? 'सीटें' : 'seats')}</span>
                </td>
                <td>
                  <span>{d.availableSeats.toLocaleString()} {lang === 'mr' ? 'जागा' : (lang === 'hi' ? 'सीटें' : 'seats')}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 800, color: d.gap < -500 ? '#dc2626' : '#d97706' }}>
                    {d.gap} {lang === 'mr' ? 'जागा' : (lang === 'hi' ? 'सीटें' : 'seats')}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--navy-accent)' }}>{d.budgetAllocated}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 700, color: 'var(--success-dark)' }}>{d.utilization}</span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{ padding: '3px 8px', fontSize: '0.74rem' }}
                    onClick={() => onReallocateSeats(districtLocalized)}
                  >
                    {lang === 'mr' ? 'जागा मंजूर करा' : (lang === 'hi' ? 'सीटें स्वीकृत करें' : 'Sanction Seats')}
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
