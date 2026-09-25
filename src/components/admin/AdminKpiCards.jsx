import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Trash2, 
  Layers, 
  CheckCircle2, 
  Smile, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { adminKpisData } from '../../data/adminDashboardData';

export function AdminKpiCards({ lang, t }) {
  const kpis = [
    {
      id: "demand",
      type: "kpi-pos",
      title: t?.adminKpi1Title || (lang === 'mr' ? '१. उच्च मागणी असलेली कौशल्ये' : (lang === 'hi' ? '१. उच्च मांग वाले कौशल' : '1. High-Demand Skills')),
      value: t?.adminKpi1Val || (lang === 'mr' ? '४२ क्लस्टर्स' : (lang === 'hi' ? '४२ क्लस्टर' : adminKpisData.highDemandSkills.value)),
      sub: t?.adminKpi1Sub || (lang === 'mr' ? 'सर्व ३६ जिल्ह्यांमध्ये +४८% वार्षिक भरती वाढ' : (lang === 'hi' ? 'सभी ३६ जिलों में +४८% वार्षिक भर्ती वृद्धि' : adminKpisData.highDemandSkills.subtext)),
      trend: adminKpisData.highDemandSkills.trend,
      trendColor: "var(--success-green)",
      icon: TrendingUp
    },
    {
      id: "shortages",
      type: "kpi-warn",
      title: t?.adminKpi2Title || (lang === 'mr' ? '२. गंभीर कौशल्य कमतरता' : (lang === 'hi' ? '२. गंभीर कौशल कमी' : '2. Skill Shortages')),
      value: t?.adminKpi2Val || (lang === 'mr' ? '१८ गंभीर' : (lang === 'hi' ? '१८ गंभीर' : adminKpisData.skillShortages.value)),
      sub: t?.adminKpi2Sub || (lang === 'mr' ? 'BMS, SCADA आणि 5-Axis CNC मध्ये तीव्र तफावत' : (lang === 'hi' ? 'BMS, SCADA और 5-Axis CNC में तीव्र अंतर' : adminKpisData.skillShortages.subtext)),
      trend: lang === 'mr' ? '+४ नवीन कमतरता' : (lang === 'hi' ? '+४ नई कमियां' : adminKpisData.skillShortages.trend),
      trendColor: "var(--warning-amber)",
      icon: AlertTriangle
    },
    {
      id: "oversupplied",
      type: "kpi-dang",
      title: t?.adminKpi3Title || (lang === 'mr' ? '३. अतिरिक्त पुरवठा अभ्यासक्रम' : (lang === 'hi' ? '३. अतिरिक्त आपूर्ति पाठ्यक्रम' : '3. Oversupplied Courses')),
      value: t?.adminKpi3Val || (lang === 'mr' ? '६ ट्रेड्स' : (lang === 'hi' ? '६ ट्रेड्स' : adminKpisData.oversuppliedCourses.value)),
      sub: t?.adminKpi3Sub || (lang === 'mr' ? '३२% पेक्षा कमी प्लेसमेंट (DTP, मॅन्युअल ड्राफ्टिंग)' : (lang === 'hi' ? '३२% से कम प्लेसमेंट (DTP, मैनुअल ड्राफ्टिंग)' : adminKpisData.oversuppliedCourses.subtext)),
      trend: lang === 'mr' ? '-१४% वार्षिक प्लेसमेंट' : (lang === 'hi' ? '-१४% वार्षिक प्लेसमेंट' : adminKpisData.oversuppliedCourses.trend),
      trendColor: "var(--danger-red)",
      icon: Trash2
    },
    {
      id: "capacity-gap",
      type: "kpi-dang",
      title: t?.adminKpi4Title || (lang === 'mr' ? '४. प्रशिक्षण क्षमता तफावत' : (lang === 'hi' ? '४. प्रशिक्षण क्षमता अंतर' : '4. Capacity Gap')),
      value: t?.adminKpi4Val || (lang === 'mr' ? '-१४,८५० जागा' : (lang === 'hi' ? '-१४,८५० सीटें' : adminKpisData.trainingCapacityGap.value)),
      sub: t?.adminKpi4Sub || (lang === 'mr' ? 'मागणी: ४८,२०० वि. मंजूर: ३३,३५०' : (lang === 'hi' ? 'मांग: ४८,२०० बनाम स्वीकृत: ३३,३५०' : adminKpisData.trainingCapacityGap.subtext)),
      trend: lang === 'mr' ? '-३०.८% तूट' : (lang === 'hi' ? '-३०.८% घाटा' : adminKpisData.trainingCapacityGap.trend),
      trendColor: "var(--danger-red)",
      icon: Layers
    },
    {
      id: "placement",
      type: "kpi-pos",
      title: t?.adminKpi5Title || (lang === 'mr' ? '५. प्लेसमेंट प्रमाण' : (lang === 'hi' ? '५. प्लेसमेंट दर' : '5. Placement Rate')),
      value: t?.adminKpi5Val || adminKpisData.placementRate.value,
      sub: t?.adminKpi5Sub || (lang === 'mr' ? 'लक्ष्य: ८५.०% | +६.२% मागील वर्षाच्या तुलनेत' : (lang === 'hi' ? 'लक्ष्य: ८५.०% | +६.२% वित्त वर्ष २५ की तुलना में' : adminKpisData.placementRate.subtext)),
      trend: adminKpisData.placementRate.trend,
      trendColor: "var(--success-green)",
      icon: CheckCircle2
    },
    {
      id: "satisfaction",
      type: "kpi-pos",
      title: t?.adminKpi6Title || (lang === 'mr' ? '६. नियोक्ता समाधान निर्देशांक' : (lang === 'hi' ? '६. नियोक्ता संतुष्टि सूचकांक' : '6. Employer Satisfaction')),
      value: t?.adminKpi6Val || adminKpisData.employerSatisfaction.value,
      sub: t?.adminKpi6Sub || (lang === 'mr' ? '१,८४० महाराष्ट्र एमएसएमईचे सर्वेक्षण' : (lang === 'hi' ? '१,८४० महाराष्ट्र एमएसएमई का सर्वेक्षण' : adminKpisData.employerSatisfaction.subtext)),
      trend: adminKpisData.employerSatisfaction.trend,
      trendColor: "var(--success-green)",
      icon: Smile
    }
  ];

  return (
    <div className="admin-kpi-grid" id="admin-sec-overview" role="region" aria-label="Main GovTech KPIs">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.id} className={`admin-kpi-card ${kpi.type}`}>
            <div>
              <div className="kpi-title">{kpi.title}</div>
              <div className="kpi-val">{kpi.value}</div>
              <div className="kpi-sub">{kpi.sub}</div>
            </div>

            <div className="kpi-trend" style={{ color: kpi.trendColor }}>
              <Icon size={13} />
              <span>{kpi.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
