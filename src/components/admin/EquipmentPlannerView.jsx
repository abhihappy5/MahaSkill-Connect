import React, { useState } from 'react';
import { 
  Wrench, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  DollarSign, 
  Sparkles, 
  FileText, 
  Download, 
  Sliders, 
  Filter, 
  Send, 
  TrendingUp, 
  ShieldCheck, 
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';
import { equipmentModernizationData } from '../../data/adminDashboardData';

// Recolor pass: this used to mix in red/amber/blue/cyan alongside the brand's orange/green —
// stripped down so the palette is neutral (navy/gray/white) everywhere, with orange reserved for
// urgency + call-to-action, and green reserved for money/success. Nothing else carries color.
export function EquipmentPlannerView({ lang = 'en', t, selectedDistrict = 'all' }) {
  const [districtFilter, setDistrictFilter] = useState(selectedDistrict || 'all');
  const [criticalityFilter, setCriticalityFilter] = useState('all');
  const [equipmentList, setEquipmentList] = useState(equipmentModernizationData);
  
  // Simulator State
  const [simTargetItiId, setSimTargetItiId] = useState('EQ-PUNE-01');
  const [simPackageTier, setSimPackageTier] = useState('tier1'); // 'tier1' (75L) | 'tier2' (45L) | 'tier3' (25L)
  const [simCsrPct, setSimCsrPct] = useState(60);
  const [simStrivePct, setSimStrivePct] = useState(20);
  const [sanctionedOrders, setSanctionedOrders] = useState({});
  const [activeSanctionMemo, setActiveSanctionMemo] = useState(null);
  const [actionSuccessToast, setActionSuccessToast] = useState('');

  const selectedItiForSim = equipmentList.find(e => e.id === simTargetItiId) || equipmentList[0];

  // CapEx Base Cost
  const packageCosts = {
    tier1: { costLakhs: 75.0, name: 'Tier 1: Comprehensive CoE Lab Upgrade (Full Machinery + Diagnostics)' },
    tier2: { costLakhs: 45.0, name: 'Tier 2: Modular Machinery & Simulator Bench Upgrade' },
    tier3: { costLakhs: 25.0, name: 'Tier 3: Digital Simulation Rig & Calibration Station' }
  };

  const totalCapEx = packageCosts[simPackageTier].costLakhs;
  const csrAmount = (totalCapEx * (simCsrPct / 100)).toFixed(1);
  const striveAmount = (totalCapEx * (simStrivePct / 100)).toFixed(1);
  const stateBudgetPct = Math.max(0, 100 - simCsrPct - simStrivePct);
  const stateAmount = (totalCapEx * (stateBudgetPct / 100)).toFixed(1);

  // Filtered Equipment List
  const filteredList = equipmentList.filter(item => {
    const matchDistrict = districtFilter === 'all' || item.district.toLowerCase().includes(districtFilter.toLowerCase());
    const matchCrit = criticalityFilter === 'all' || item.criticality === criticalityFilter;
    return matchDistrict && matchCrit;
  });

  const showToast = (msg) => {
    setActionSuccessToast(msg);
    setTimeout(() => setActionSuccessToast(''), 4500);
  };

  const handleQuickSanction = (item) => {
    setSanctionedOrders(prev => ({
      ...prev,
      [item.id]: {
        orderNo: `GR-DVET-2026-EQ-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-IN'),
        amountLakhs: item.estimatedCapExLakhs,
        status: 'Sanction Order Issued'
      }
    }));
    
    showToast(lang === 'mr' 
      ? `${item.itiName} साठी ₹${item.estimatedCapExLakhs} लाखांचा शासन निर्णय (GR) निर्गमित करण्यात आला!` 
      : (lang === 'hi' 
        ? `${item.itiName} के लिए ₹${item.estimatedCapExLakhs} लाख का प्रशासनिक स्वीकृति आदेश (GR) जारी किया गया!` 
        : `Administrative Sanction Order of ₹${item.estimatedCapExLakhs} Lakhs dispatched for ${item.itiName}!`));
  };

  const handleGenerateGRMemo = () => {
    const memo = {
      orderNo: `GR-DVET/PLAN-2026/${simTargetItiId}-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      itiName: selectedItiForSim.itiName,
      district: selectedItiForSim.district,
      cluster: selectedItiForSim.cluster,
      tradeLab: selectedItiForSim.tradeLab,
      packageName: packageCosts[simPackageTier].name,
      totalCapEx: `₹${totalCapEx.toFixed(2)} Lakhs`,
      csrPartner: selectedItiForSim.csrPartner,
      csrShare: `₹${csrAmount} Lakhs (${simCsrPct}%)`,
      striveShare: `₹${striveAmount} Lakhs (${simStrivePct}%)`,
      stateShare: `₹${stateAmount} Lakhs (${stateBudgetPct}%)`,
      impact: selectedItiForSim.placementImpact,
      students: selectedItiForSim.studentsImpacted
    };
    setActiveSanctionMemo(memo);
  };

  return (
    <div className="admin-table-card" id="admin-sec-equipment-modernization" role="region" aria-label="Equipment and Workshop Lab Modernization Planner">
      
      {/* Toast Notice — green kept: this is a success confirmation */}
      {actionSuccessToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: 'linear-gradient(135deg, var(--success-green) 0%, var(--success-dark) 100%)',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(5, 150, 105, 0.3)',
          fontSize: '0.86rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <CheckCircle2 size={18} />
          <span>{actionSuccessToast}</span>
        </div>
      )}

      {/* Header Section — neutral tag, no amber */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <span className="section-tag" style={{ background: 'var(--navy-subtle)', color: 'var(--navy-deep)', borderColor: 'var(--border-subtle)' }}>
            <Wrench size={13} />
            {lang === 'mr' ? 'राज्य कार्यशाळा व यंत्रसामग्री आधुनिकीकरण' : (lang === 'hi' ? 'राज्य कार्यशाला एवं उपकरण आधुनिकीकरण' : 'State Workshop & Equipment Modernization')}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {lang === 'mr' ? 'आयटीआय यंत्रसामग्री तूट व प्रयोगशाळा भांडवली खर्च (CapEx) नियोजन' : (lang === 'hi' ? 'आईटीआई उपकरण कमी एवं प्रयोगशाला पूंजीगत व्यय (CapEx) योजना' : 'ITI Equipment Deficit & Workshop Lab CapEx Planner')}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            {lang === 'mr'
              ? 'महाराष्ट्र आयटीआय मधील कालबाह्य यंत्रसामग्री ओळखणे व उद्योग CSR + राज्य अनुदानाद्वारे आधुनिक प्रयोगशाळा उभारणे.'
              : 'Tracking legacy machine obsolescence across Maharashtra ITIs and co-financing modern simulator labs with Industry CSR.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleGenerateGRMemo}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}
          >
            <Sliders size={14} />
            <span>{lang === 'mr' ? 'CapEx सिम्युलेटर चालवा' : (lang === 'hi' ? 'CapEx सिम्युलेटर चलाएं' : 'Launch CapEx Simulator')}</span>
          </button>
        </div>
      </div>

      {/* Executive 4 Metric Highlights — only #2 (urgency) gets orange, #3 (money) stays green,
          #1 and #4 are neutral navy/gray since they're just informational totals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--navy-deep)', color: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid var(--navy-light)' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Total CapEx Required</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f8fafc', marginTop: '2px' }}>₹40.60 Cr</div>
          <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '4px' }}>Across 36 Districts (8 Key Clusters)</div>
        </div>

        <div style={{ background: 'var(--saffron-light)', border: '1px solid var(--saffron-border)', padding: '16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: '#9a3412', textTransform: 'uppercase', fontWeight: 700 }}>Critical Lab Deficit</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--saffron-hover)', marginTop: '2px' }}>37.5% Labs</div>
          <div style={{ fontSize: '0.72rem', color: '#9a3412', marginTop: '4px' }}>Lacking EV, 5-Axis CNC & Solar Test Benches</div>
        </div>

        <div style={{ background: 'var(--success-light)', border: '1px solid var(--success-border)', padding: '16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--success-dark)', textTransform: 'uppercase', fontWeight: 700 }}>CSR Pledged / STRIVE Fund</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--success-green)', marginTop: '2px' }}>₹22.80 Cr (56%)</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--success-dark)', marginTop: '4px' }}>Tata Motors, Bharat Forge, Bajaj CSR</div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', padding: '16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>State Treasury Outlay Needed</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--navy-deep)', marginTop: '2px' }}>₹17.80 Cr (44%)</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Budget Provision via DVET FY 26-27</div>
        </div>
      </div>

      {/* Filters Bar — neutral, using design tokens */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 16px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            <Filter size={14} />
            <span>{lang === 'mr' ? 'जिल्हा निवडा:' : (lang === 'hi' ? 'जिला चुनें:' : 'Filter District:')}</span>
          </div>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border-medium)', fontSize: '0.82rem', background: '#ffffff' }}
          >
            <option value="all">{lang === 'mr' ? 'सर्व जिल्हे (All Maharashtra)' : 'All Districts (Maharashtra)'}</option>
            <option value="Pune">Pune (Chakan / MIDC)</option>
            <option value="Nashik">Nashik (Satpur / Ambad)</option>
            <option value="Chhatrapati Sambhaji Nagar">Chhatrapati Sambhaji Nagar (Waluj / AURIC)</option>
            <option value="Nagpur">Nagpur (MIHAN / Hingna)</option>
            <option value="Kolhapur">Kolhapur (Gokul Shirgaon)</option>
            <option value="Mumbai & MMR">Mumbai & Thane (Belapur)</option>
            <option value="Amravati">Amravati (Textile Park)</option>
            <option value="Solapur">Solapur (Solar & Garment)</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Urgency:</span>
          {['all', 'Critical Deficit', 'Urgent Upgrade', 'Moderate Gap'].map((crit) => (
            <button
              key={crit}
              type="button"
              onClick={() => setCriticalityFilter(crit)}
              style={{
                background: criticalityFilter === crit ? 'var(--navy-deep)' : '#ffffff',
                color: criticalityFilter === crit ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid var(--border-medium)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {crit === 'all' ? 'All Gaps' : crit}
            </button>
          ))}
        </div>
      </div>

      {/* Main Deficit Table */}
      <div style={{ overflowX: 'auto', marginBottom: '28px' }}>
        <table className="gov-data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>{lang === 'mr' ? 'संस्था व औद्योगिक क्लस्टर' : (lang === 'hi' ? 'संस्थान एवं क्लस्टर' : 'Institute & Industrial Cluster')}</th>
              <th>{lang === 'mr' ? 'ट्रेड कार्यशाळा' : (lang === 'hi' ? 'ट्रेड प्रयोगशाला' : 'Trade Lab')}</th>
              <th>{lang === 'mr' ? 'सध्याची कालबाह्य यंत्रसामग्री' : (lang === 'hi' ? 'वर्तमान अप्रचलित उपकरण' : 'Current Legacy Equipment')}</th>
              <th>{lang === 'mr' ? 'आवश्यक आधुनिक यंत्रसामग्री' : (lang === 'hi' ? 'आवश्यक आधुनिक उपकरण' : 'Required Modern Equipment')}</th>
              <th>{lang === 'mr' ? 'अंदाजित खर्च व CSR' : (lang === 'hi' ? 'अनुमानित लागत एवं CSR' : 'CapEx & CSR Partner')}</th>
              <th>{lang === 'mr' ? 'स्थिती व कृती' : (lang === 'hi' ? 'स्थिति एवं कार्रवाई' : 'Status & Policy Action')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((item) => {
              const isSanctioned = sanctionedOrders[item.id];
              // Only "Critical Deficit" gets a color call-out (orange); the other two urgency
              // tiers are neutral gray so orange stays meaningful rather than everywhere.
              const critStyle = item.criticality === 'Critical Deficit'
                ? { background: 'var(--saffron-light)', color: 'var(--saffron-hover)', border: '1px solid var(--saffron-border)' }
                : { background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-medium)' };
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td>
                    <div style={{ fontWeight: 800, color: 'var(--navy-deep)', fontSize: '0.88rem' }}>
                      {item.itiName}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {item.cluster} ({item.division})
                    </div>
                    <div style={{ marginTop: '3px' }}>
                      <span style={{
                        fontSize: '0.68rem',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        ...critStyle
                      }}>
                        ● {item.criticality}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                      {item.tradeLab}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--success-dark)', fontWeight: 600 }}>
                      👥 {item.studentsImpacted} Students/yr
                    </div>
                  </td>

                  <td>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '6px 10px', borderRadius: '6px', border: '1px dashed var(--border-medium)' }}>
                      ⚠️ {item.currentLegacyEquipment}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600, background: 'var(--success-light)', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--success-border)' }}>
                      ✨ {item.requiredModernEquipment}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--success-dark)', marginTop: '2px' }}>
                      Expected Outcome: {item.placementImpact}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--navy-deep)' }}>
                      ₹{item.estimatedCapExLakhs.toFixed(1)} Lakhs
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      🤝 {item.csrPartner}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', marginTop: '3px' }}>
                      <span style={{ color: 'var(--success-dark)', fontWeight: 700 }}>CSR: {item.csrFundedPct}%</span>
                      <span style={{ color: 'var(--text-muted)' }}>·</span>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>State: {item.stateBudgetPct}%</span>
                    </div>
                  </td>

                  <td>
                    {isSanctioned ? (
                      <div>
                        <span style={{ fontSize: '0.74rem', background: 'var(--success-light)', color: 'var(--success-dark)', padding: '4px 8px', borderRadius: '4px', fontWeight: 800, border: '1px solid var(--success-border)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={12} />
                          GR Issued ✓
                        </span>
                        <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', marginTop: '2px', fontFamily: 'monospace' }}>
                          {isSanctioned.orderNo}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleQuickSanction(item)}
                          style={{ fontSize: '0.76rem', padding: '5px 10px', fontWeight: 800 }}
                        >
                          Sanction CapEx Order
                        </button>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          Stage: {item.procurementStage}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= CAPEX & CSR GRANT ALLOCATION SIMULATOR =================
          Calmer version: no emojis, no tinted boxes, one accent (orange CTA), green only on the
          CSR dot. The split is shown as one thin bar + plain rows instead of three colored cards. */}
      <div style={{
        background: 'var(--navy-deep)',
        color: '#ffffff',
        borderRadius: '14px',
        padding: '22px 24px',
        border: '1px solid var(--navy-light)'
      }}>
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
            CapEx & CSR Grant Allocation Simulator
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>
            Adjust the funding split for any Maharashtra ITI lab.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>

          {/* Controls Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                Target ITI / Lab
              </label>
              <select
                value={simTargetItiId}
                onChange={(e) => setSimTargetItiId(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: '#ffffff', fontSize: '0.84rem' }}
              >
                {equipmentList.map(e => (
                  <option key={e.id} value={e.id} style={{ background: '#0f172a', color: '#ffffff' }}>
                    {e.itiName} ({e.district}) — {e.tradeLab}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                Package
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.keys(packageCosts).map(tierKey => {
                  const active = simPackageTier === tierKey;
                  return (
                    <label key={tierKey} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.8rem',
                      color: active ? '#ffffff' : '#cbd5e1',
                      background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                      border: `1px solid ${active ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)'}`,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="radio"
                        name="simPackageTier"
                        checked={active}
                        onChange={() => setSimPackageTier(tierKey)}
                        style={{ accentColor: '#e2e8f0' }}
                      />
                      <span style={{ flex: 1 }}>{packageCosts[tierKey].name.replace(/\s*\(.*\)/, '')}</span>
                      <strong>₹{packageCosts[tierKey].costLakhs}L</strong>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                <span style={{ color: '#cbd5e1' }}>Industry CSR</span>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>{simCsrPct}% · ₹{csrAmount} L</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={simCsrPct}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setSimCsrPct(val);
                  if (val + simStrivePct > 90) setSimStrivePct(90 - val);
                }}
                style={{ width: '100%', accentColor: '#94a3b8', cursor: 'pointer' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                <span style={{ color: '#cbd5e1' }}>Central / STRIVE Fund</span>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>{simStrivePct}% · ₹{striveAmount} L</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="5"
                value={simStrivePct}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setSimStrivePct(val);
                  if (simCsrPct + val > 90) setSimCsrPct(90 - val);
                }}
                style={{ width: '100%', accentColor: '#94a3b8', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Results Column */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.5px' }}>
                Total CapEx
              </div>
              <div style={{ fontSize: '1.9rem', color: '#ffffff', fontWeight: 800, margin: '2px 0 14px 0' }}>
                ₹{totalCapEx.toFixed(2)} Lakhs
              </div>

              {/* One thin split bar instead of three colored cards */}
              <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden', background: 'rgba(255,255,255,0.08)', marginBottom: '6px' }}>
                <div style={{ width: `${simCsrPct}%`, background: 'var(--success-green)' }} />
                <div style={{ width: `${simStrivePct}%`, background: '#94a3b8' }} />
                <div style={{ width: `${stateBudgetPct}%`, background: '#475569' }} />
              </div>

              {[
                { label: `Industry CSR (${selectedItiForSim.csrPartner.split('&')[0].trim()})`, amt: csrAmount, pct: simCsrPct, dot: 'var(--success-green)' },
                { label: 'Central STRIVE / CoE Scheme', amt: striveAmount, pct: simStrivePct, dot: '#94a3b8' },
                { label: 'State Treasury Share', amt: stateAmount, pct: stateBudgetPct, dot: '#475569' }
              ].map((row, i, arr) => (
                <div key={row.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  fontSize: '0.84rem',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.dot, flexShrink: 0 }} />
                    {row.label}
                  </span>
                  <strong style={{ color: '#ffffff' }}>₹{row.amt} L <span style={{ color: '#94a3b8', fontWeight: 600 }}>({row.pct}%)</span></strong>
                </div>
              ))}

              <div style={{ display: 'flex', gap: '32px', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.78rem' }}>
                <div>
                  <span style={{ color: '#94a3b8' }}>Placement impact</span>
                  <strong style={{ display: 'block', color: '#ffffff', marginTop: '2px' }}>{selectedItiForSim.placementImpact}</strong>
                </div>
                <div>
                  <span style={{ color: '#94a3b8' }}>Trainees / yr</span>
                  <strong style={{ display: 'block', color: '#ffffff', marginTop: '2px' }}>{selectedItiForSim.studentsImpacted}</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerateGRMemo}
              style={{
                background: 'var(--saffron-primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '11px 16px',
                fontWeight: 700,
                fontSize: '0.86rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <FileText size={16} />
              <span>{lang === 'mr' ? 'शासकीय मंजुरी आदेश (GR) मसुदा तयार करा' : 'Generate Sanction Order (GR)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= OFFICIAL GR SANCTION MEMO MODAL ================= */}
      {activeSanctionMemo && (
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
          onClick={() => setActiveSanctionMemo(null)}
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
              border: '1px solid var(--border-medium)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gov Header — neutral navy, no amber label */}
            <div style={{ background: 'var(--navy-deep)', color: '#ffffff', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Government of Maharashtra · Skill Development, Employment & Entrepreneurship Department
                </div>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                  Administrative Sanction Order (Government Resolution)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSanctionMemo(null)}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#ffffff', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>

            {/* Memo Content */}
            <div style={{ padding: '24px', fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '16px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <div><strong>Order No:</strong> {activeSanctionMemo.orderNo}</div>
                <div><strong>Date:</strong> {activeSanctionMemo.date}</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '16px' }}>
                <div><strong>Subject:</strong> Administrative approval and co-financing release for Modern Workshop Lab Upgrade at <strong>{activeSanctionMemo.itiName} ({activeSanctionMemo.district} District)</strong> under Maharashtra State ITI Modernization Mission.</div>
              </div>

              <p style={{ margin: '0 0 12px 0' }}>
                Sanction is hereby accorded for the modernization of the <strong>{activeSanctionMemo.tradeLab}</strong> workshop at {activeSanctionMemo.itiName} under the following tripartite funding framework:
              </p>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', fontSize: '0.82rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '6px 8px', color: 'var(--text-muted)' }}>Total Approved CapEx:</td>
                    <td style={{ padding: '6px 8px', fontWeight: 800 }}>{activeSanctionMemo.totalCapEx}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '6px 8px', color: 'var(--text-muted)' }}>Industry CSR Contribution ({activeSanctionMemo.csrPartner}):</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700, color: 'var(--success-dark)' }}>{activeSanctionMemo.csrShare}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '6px 8px', color: 'var(--text-muted)' }}>Central STRIVE / CoE Matching Grant:</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700, color: 'var(--text-primary)' }}>{activeSanctionMemo.striveShare}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '6px 8px', color: 'var(--text-muted)' }}>State Government Treasury Outlay:</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700, color: 'var(--text-primary)' }}>{activeSanctionMemo.stateShare}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 8px', color: 'var(--text-muted)' }}>Beneficiary Capacity & Target:</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700 }}>{activeSanctionMemo.students} Trainees / yr ({activeSanctionMemo.impact})</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  By order and in the name of the Governor of Maharashtra,<br />
                  <strong>Principal Secretary, DVET Maharashtra</strong>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => setActiveSanctionMemo(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      showToast(`Official Sanction Order ${activeSanctionMemo.orderNo} downloaded as PDF!`);
                      setActiveSanctionMemo(null);
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