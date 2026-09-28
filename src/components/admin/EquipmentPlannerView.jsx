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
      
      {/* Toast Notice */}
      {actionSuccessToast && (
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
          <span>{actionSuccessToast}</span>
        </div>
      )}

      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <span className="section-tag" style={{ background: '#fef3c7', color: '#b45309', borderColor: '#fde68a' }}>
            <Wrench size={13} />
            {lang === 'mr' ? 'राज्य कार्यशाळा व यंत्रसामग्री आधुनिकीकरण' : (lang === 'hi' ? 'राज्य कार्यशाला एवं उपकरण आधुनिकीकरण' : 'State Workshop & Equipment Modernization')}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {lang === 'mr' ? 'आयटीआय यंत्रसामग्री तूट व प्रयोगशाळा भांडवली खर्च (CapEx) नियोजन' : (lang === 'hi' ? 'आईटीआई उपकरण कमी एवं प्रयोगशाला पूंजीगत व्यय (CapEx) योजना' : 'ITI Equipment Deficit & Workshop Lab CapEx Planner')}
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0 0' }}>
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

      {/* Executive 4 Metric Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #0b192c 0%, #1e293b 100%)', color: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Total CapEx Required</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f8fafc', marginTop: '2px' }}>₹40.60 Cr</div>
          <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '4px' }}>Across 36 Districts (8 Key Clusters)</div>
        </div>

        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: '#991b1b', textTransform: 'uppercase', fontWeight: 700 }}>Critical Lab Deficit</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#dc2626', marginTop: '2px' }}>37.5% Labs</div>
          <div style={{ fontSize: '0.72rem', color: '#b91c1c', marginTop: '4px' }}>Lacking EV, 5-Axis CNC & Solar Test Benches</div>
        </div>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: '#166534', textTransform: 'uppercase', fontWeight: 700 }}>CSR Pledged / STRIVE Fund</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#059669', marginTop: '2px' }}>₹22.80 Cr (56%)</div>
          <div style={{ fontSize: '0.72rem', color: '#15803d', marginTop: '4px' }}>Tata Motors, Bharat Forge, Bajaj CSR</div>
        </div>

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: '#1e40af', textTransform: 'uppercase', fontWeight: 700 }}>State Treasury Outlay Needed</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0284c7', marginTop: '2px' }}>₹17.80 Cr (44%)</div>
          <div style={{ fontSize: '0.72rem', color: '#1d4ed8', marginTop: '4px' }}>Budget Provision via DVET FY 26-27</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
            <Filter size={14} />
            <span>{lang === 'mr' ? 'जिल्हा निवडा:' : (lang === 'hi' ? 'जिला चुनें:' : 'Filter District:')}</span>
          </div>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', background: '#ffffff' }}
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
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Urgency:</span>
          {['all', 'Critical Deficit', 'Urgent Upgrade', 'Moderate Gap'].map((crit) => (
            <button
              key={crit}
              type="button"
              onClick={() => setCriticalityFilter(crit)}
              style={{
                background: criticalityFilter === crit ? 'var(--navy-deep)' : '#ffffff',
                color: criticalityFilter === crit ? '#ffffff' : '#475569',
                border: '1px solid #cbd5e1',
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
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td>
                    <div style={{ fontWeight: 800, color: 'var(--navy-deep)', fontSize: '0.88rem' }}>
                      {item.itiName}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                      {item.cluster} ({item.division})
                    </div>
                    <div style={{ marginTop: '3px' }}>
                      <span style={{
                        fontSize: '0.68rem',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        background: item.criticality === 'Critical Deficit' ? '#fef2f2' : item.criticality === 'Urgent Upgrade' ? '#fffbeb' : '#eff6ff',
                        color: item.criticality === 'Critical Deficit' ? '#dc2626' : item.criticality === 'Urgent Upgrade' ? '#d97706' : '#2563eb',
                        border: `1px solid ${item.criticality === 'Critical Deficit' ? '#fecaca' : item.criticality === 'Urgent Upgrade' ? '#fde68a' : '#bfdbfe'}`
                      }}>
                        ● {item.criticality}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#1e293b' }}>
                      {item.tradeLab}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                      👥 {item.studentsImpacted} Students/yr
                    </div>
                  </td>

                  <td>
                    <div style={{ fontSize: '0.78rem', color: '#dc2626', background: '#fff5f5', padding: '6px 10px', borderRadius: '6px', border: '1px dashed #fca5a5' }}>
                      ⚠️ {item.currentLegacyEquipment}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 600, background: '#f0fdf4', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                      ✨ {item.requiredModernEquipment}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#059669', marginTop: '2px' }}>
                      Expected Outcome: {item.placementImpact}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--navy-deep)' }}>
                      ₹{item.estimatedCapExLakhs.toFixed(1)} Lakhs
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '2px' }}>
                      🤝 {item.csrPartner}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', marginTop: '3px' }}>
                      <span style={{ color: '#059669', fontWeight: 700 }}>CSR: {item.csrFundedPct}%</span>
                      <span>·</span>
                      <span style={{ color: '#0284c7', fontWeight: 700 }}>State: {item.stateBudgetPct}%</span>
                    </div>
                  </td>

                  <td>
                    {isSanctioned ? (
                      <div>
                        <span style={{ fontSize: '0.74rem', background: '#ecfdf5', color: '#047857', padding: '4px 8px', borderRadius: '4px', fontWeight: 800, border: '1px solid #a7f3d0', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={12} />
                          GR Issued ✓
                        </span>
                        <div style={{ fontSize: '0.66rem', color: '#64748b', marginTop: '2px', fontFamily: 'monospace' }}>
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
                        <span style={{ fontSize: '0.68rem', color: '#64748b' }}>
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

      {/* ================= CAPEX & CSR GRANT ALLOCATION SIMULATOR ================= */}
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
              Interactive CapEx & CSR Grant Allocation Simulator
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#cbd5e1' }}>
              Simulate co-funding formulas across CSR Foundations, World Bank STRIVE grants, and State Budget for any Maharashtra ITI.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          
          {/* Controls Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#93c5fd', marginBottom: '4px' }}>
                Select Target ITI / Workshop Lab:
              </label>
              <select
                value={simTargetItiId}
                onChange={(e) => setSimTargetItiId(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.35)', color: '#ffffff', fontSize: '0.84rem' }}
              >
                {equipmentList.map(e => (
                  <option key={e.id} value={e.id} style={{ background: '#0f172a', color: '#ffffff' }}>
                    {e.itiName} ({e.district}) — {e.tradeLab}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#93c5fd', marginBottom: '4px' }}>
                Modernization Package Tier:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.keys(packageCosts).map(tierKey => (
                  <label key={tierKey} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    background: simPackageTier === tierKey ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${simPackageTier === tierKey ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="simPackageTier"
                      checked={simPackageTier === tierKey}
                      onChange={() => setSimPackageTier(tierKey)}
                    />
                    <span>{packageCosts[tierKey].name} — <strong>₹{packageCosts[tierKey].costLakhs}L</strong></span>
                  </label>
                ))}
              </div>
            </div>

            {/* Slider 1: CSR Contribution */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 700, marginBottom: '4px' }}>
                <span style={{ color: '#86efac' }}>Industry CSR Contribution:</span>
                <span style={{ color: '#86efac' }}>{simCsrPct}% (₹{csrAmount} L)</span>
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
                style={{ width: '100%', accentColor: '#22c55e', cursor: 'pointer' }}
              />
            </div>

            {/* Slider 2: World Bank STRIVE Contribution */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 700, marginBottom: '4px' }}>
                <span style={{ color: '#67e8f9' }}>Central / World Bank STRIVE Fund:</span>
                <span style={{ color: '#67e8f9' }}>{simStrivePct}% (₹{striveAmount} L)</span>
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
                style={{ width: '100%', accentColor: '#06b6d4', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Results & Outcomes Display */}
          <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.5px' }}>
                Simulated Financial Breakdown
              </div>
              <h4 style={{ margin: '4px 0 14px 0', fontSize: '1.25rem', color: '#ffffff', fontWeight: 800 }}>
                Total CapEx: ₹{totalCapEx.toFixed(2)} Lakhs
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(34, 197, 94, 0.15)', borderRadius: '6px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  <span>🤝 Industry CSR ({selectedItiForSim.csrPartner.split('&')[0]}):</span>
                  <strong style={{ color: '#86efac' }}>₹{csrAmount} Lakhs ({simCsrPct}%)</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(6, 182, 212, 0.15)', borderRadius: '6px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                  <span>🏛️ Central STRIVE / CoE Scheme:</span>
                  <strong style={{ color: '#67e8f9' }}>₹{striveAmount} Lakhs ({simStrivePct}%)</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(249, 115, 22, 0.15)', borderRadius: '6px', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
                  <span>🇮🇳 State Government Treasury Share:</span>
                  <strong style={{ color: '#fdba74' }}>₹{stateAmount} Lakhs ({stateBudgetPct}%)</strong>
                </div>
              </div>

              {/* Projected Outcome Metrics */}
              <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px' }}>
                <div style={{ fontSize: '0.74rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '6px' }}>
                  📈 Projected Outcome for {selectedItiForSim.itiName}:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.76rem' }}>
                  <div>
                    <span style={{ color: '#94a3b8' }}>Placement Surge:</span>
                    <strong style={{ display: 'block', color: '#4ade80' }}>{selectedItiForSim.placementImpact}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8' }}>Trainees Benefited:</span>
                    <strong style={{ display: 'block', color: '#ffffff' }}>{selectedItiForSim.studentsImpacted} Candidates/yr</strong>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerateGRMemo}
              style={{
                marginTop: '16px',
                background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
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
                boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)'
              }}
            >
              <FileText size={16} />
              <span>{lang === 'mr' ? 'शासकीय मंजुरी आदेश (GR) मसुदा तयार करा' : 'Generate Administrative Sanction Order (GR)'}</span>
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
              border: '1px solid #cbd5e1'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gov Header */}
            <div style={{ background: '#0b192c', color: '#ffffff', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
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
            <div style={{ padding: '24px', fontSize: '0.86rem', color: '#1e293b', lineHeight: 1.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px', fontSize: '0.78rem', color: '#64748b' }}>
                <div><strong>Order No:</strong> {activeSanctionMemo.orderNo}</div>
                <div><strong>Date:</strong> {activeSanctionMemo.date}</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                <div><strong>Subject:</strong> Administrative approval and co-financing release for Modern Workshop Lab Upgrade at <strong>{activeSanctionMemo.itiName} ({activeSanctionMemo.district} District)</strong> under Maharashtra State ITI Modernization Mission.</div>
              </div>

              <p style={{ margin: '0 0 12px 0' }}>
                Sanction is hereby accorded for the modernization of the <strong>{activeSanctionMemo.tradeLab}</strong> workshop at {activeSanctionMemo.itiName} under the following tripartite funding framework:
              </p>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', fontSize: '0.82rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '6px 8px', color: '#64748b' }}>Total Approved CapEx:</td>
                    <td style={{ padding: '6px 8px', fontWeight: 800 }}>{activeSanctionMemo.totalCapEx}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '6px 8px', color: '#64748b' }}>Industry CSR Contribution ({activeSanctionMemo.csrPartner}):</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700, color: '#059669' }}>{activeSanctionMemo.csrShare}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '6px 8px', color: '#64748b' }}>Central STRIVE / CoE Matching Grant:</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700, color: '#0284c7' }}>{activeSanctionMemo.striveShare}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '6px 8px', color: '#64748b' }}>State Government Treasury Outlay:</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700, color: '#ea580c' }}>{activeSanctionMemo.stateShare}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 8px', color: '#64748b' }}>Beneficiary Capacity & Target:</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700 }}>{activeSanctionMemo.students} Trainees / yr ({activeSanctionMemo.impact})</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
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
