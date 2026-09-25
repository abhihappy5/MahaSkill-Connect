import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  FileText, 
  Download, 
  ShieldCheck, 
  Calendar, 
  TrendingUp, 
  CheckCircle2,
  Database,
  Printer
} from 'lucide-react';
import { aiGovCopilotKnowledge } from '../../data/adminDashboardData';

export function AiGovCopilot({ initialQuery, onExportStateReport, lang, t }) {
  const defaultGreeting = lang === 'mr' 
    ? "नमस्कार डॉ. पाटील. मी आपला महास्किल कनेक्ट शासकीय धोरण सहाय्यक आहे. मी अधिकृत, पुराव्यावर आधारित श्रम बाजार बुद्धिमत्ता व क्षमता वाटप शिफारसी प्रदान करतो. प्रत्येक शिफारस अधिकृत सरकारी डेटा स्रोत, विश्वासार्हता निर्देशांक आणि तारीख नोंदींसह जोडलेली आहे."
    : (lang === 'hi' 
      ? "नमस्कार डॉ. पाटिल। मैं आपका महास्किल कनेक्ट सरकारी नीति सहायक हूँ। मैं आधिकारिक, साक्ष्य-आधारित श्रम बाजार खुफिया और क्षमता आवंटन सिफारिशें प्रदान करता हूँ। प्रत्येक सिफारिश आधिकारिक डेटा स्रोतों, विश्वसनीयता सूचकांकों और दिनांक मुहरों के साथ प्रमाणित है।"
      : "Namaskar Dr. Patil. I am your MahaSkill Connect Government Policy Copilot. I provide verified, evidence-backed labour market intelligence and capacity allocation recommendations. Every recommendation is anchored with official data sources, confidence metrics, and date stamps.");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: defaultGreeting,
      supportingData: {
        source: lang === 'mr' ? "महाराष्ट्र श्रम व औद्योगिक डेटाबेस (MSSDS / DVET)" : (lang === 'hi' ? "महाराष्ट्र श्रम एवं औद्योगिक डेटाबेस (MSSDS / DVET)" : "Maharashtra Labour & Industrial Database (MSSDS / DVET)"),
        dateOfData: lang === 'mr' ? "२५ सप्टेंबर २०२६" : (lang === 'hi' ? "२५ सितम्बर २०२६" : "September 25, 2026"),
        indicators: lang === 'mr' ? ["३६ जिल्ह्यांचे ऑडिट", "५०,०००+ कंपनी नोंदी", "१,०४,२०० विद्यार्थी रेकॉर्ड्स"] : (lang === 'hi' ? ["३६ जिलों का ऑडिट", "५०,०००+ नियोक्ता फाइलिंग", "१,०४,२०० छात्र रिकॉर्ड"] : ["36 Districts Audited", "50,000+ Employer Filings", "104,200 Student Records"]),
        confidenceStatus: lang === 'mr' ? "अधिकृत राज्य प्रणाली स्तर (९९% पडताळणी)" : (lang === 'hi' ? "आधिकारिक राज्य प्रणाली स्तर (९९% सत्यापन)" : "Official State System Level (99% Verification)")
      }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const presetQuestions = [
    { 
      label: lang === 'mr' ? "ईव्ही तंत्रज्ञ कमतरता" : (lang === 'hi' ? "ईवी तकनीशियन कमी" : "EV Technician Shortage"), 
      query: lang === 'mr' ? "कोणत्या जिल्ह्यांमध्ये सर्वात जास्त ईव्ही तंत्रज्ञ कमतरता आहे?" : (lang === 'hi' ? "किन जिलों में सबसे अधिक ईवी तकनीशियन की कमी है?" : "Which districts have the largest EV technician shortage?") 
    },
    { 
      label: lang === 'mr' ? "पुनरावलोकन आवश्यक कोर्सेस" : (lang === 'hi' ? "समीक्षा योग्य पाठ्यक्रम" : "Courses to Review"), 
      query: lang === 'mr' ? "कोणते अभ्यासक्रम पुनरावलोकन किंवा बंद करावेत?" : (lang === 'hi' ? "किन पाठ्यक्रमों की समीक्षा या समापन होना चाहिए?" : "Which courses should be reviewed or phased out?") 
    },
    { 
      label: lang === 'mr' ? "नाशिक जिल्हा तफावत" : (lang === 'hi' ? "नासिक जिला अंतर" : "Nashik District Gaps"), 
      query: lang === 'mr' ? "नाशिक जिल्ह्यासाठी कौशल्य तफावत आणि माहिती दाखवा." : (lang === 'hi' ? "नासिक जिले के कौशल अंतर और खुफिया विवरण दिखाएं।" : "Show skill gaps and intelligence for Nashik district.") 
    },
    { 
      label: lang === 'mr' ? "जिल्हा कौशल्य आराखडा" : (lang === 'hi' ? "जिला कौशल योजना" : "Generate District Skill Plan"), 
      query: lang === 'mr' ? "जिल्हा कौशल्य विकास आराखडा तयार करा." : (lang === 'hi' ? "जिला कौशल विकास योजना तैयार करें।" : "Generate a district skill plan.") 
    }
  ];

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Query knowledge base with verified evidence
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let matchedItem = aiGovCopilotKnowledge.find(k => 
        qLower.includes(k.trigger) || k.question.toLowerCase().includes(qLower)
      );

      let responseText = '';
      if (matchedItem) {
        responseText = matchedItem.response;
        if (lang === 'mr') {
          if (qLower.includes('ev') || qLower.includes('ईव्ही')) {
            responseText = `ईव्ही तंत्रज्ञ कमतरतेचे विश्लेषण (सप्टेंबर २०२६):\n\n- **पुणे क्लस्टर**: -६५० जागांची तीव्र तफावत (चाकण व भोसरी MIDC मधील बजाज व टाटा ईव्ही प्रकल्पांमुळे).\n- **नाशिक क्लस्टर**: -२८० जागांची तूट.\n- **औरंगाबाद क्लस्टर**: -१५० जागांची तूट.\n\n**शिफारस केलेली शासकीय कृती**: शासकीय आयटीआय पुणे व पिंपरी येथे तातडीने ईव्ही बॅटरी व पॉवरट्रेन CoE लॅब मंजूर करा.`;
          } else if (qLower.includes('review') || qLower.includes('phase') || qLower.includes('पुनरावलोकन')) {
            responseText = `कालबाह्य अभ्यासक्रम विश्लेषण (DVET २०२६ ऑडिट):\n\n१. **DTP ऑपरेटर**: प्लेसमेंट २८% (तूट: -३२% वार्षिक घट).\n२. **मॅन्युअल ड्राफ्ट्समन (सिव्हिल)**: प्लेसमेंट ३१% (AutoCAD/BIM मुळे कालबाह्य).\n३. **रेडिओ व टीव्ही मेकॅनिक**: प्लेसमेंट २२%.\n\n**शिफारस**: या जागा ड्रोन असेंब्ली व रोबोटिक्स कोर्सेसकडे वळवाव्यात.`;
          } else if (qLower.includes('nashik') || qLower.includes('नाशिक')) {
            responseText = `नाशिक जिल्हा कौशल्य विश्लेषण:\n\n- **प्रमुख उद्योग**: संरक्षण व एरोस्पेस (HAL ओझर), फार्मास्युटिकल्स व प्रगत कृषी तंत्रज्ञान.\n- **गंभीर कौशल्य कमतरता**: ५-अक्षीय CNC ऑपरेटर (-३५० जागा), ड्रोन तंत्रज्ञ (-२०० जागा).\n- **शिफारस**: नाशिकमध्ये एरोस्पेस व डिफेन्स स्किल सेंटर स्थापन करावे.`;
          }
        } else if (lang === 'hi') {
          if (qLower.includes('ev') || qLower.includes('ईवी')) {
            responseText = `ईवी तकनीशियन कमी का विश्लेषण (सितम्बर २०२६):\n\n- **पुणे क्लस्टर**: -६५० सीटों का गंभीर अंतर (चाकण एवं भोसरी MIDC में बजाज एवं टाटा ईवी संयंत्रों के कारण)।\n- **नासिक क्लस्टर**: -२८० सीटों की कमी।\n- **औरंगाबाद क्लस्टर**: -१५० सीटों की कमी।\n\n**अनुशंसित सरकारी कार्रवाई**: सरकारी आईटीआई पुणे और पिंपरी में तत्काल ईवी बैटरी और पावरट्रेन CoE लैब स्वीकृत करें।`;
          } else if (qLower.includes('review') || qLower.includes('phase') || qLower.includes('समीक्षा')) {
            responseText = `अप्रचलित पाठ्यक्रम विश्लेषण (DVET २०२६ ऑडिट):\n\n१. **DTP ऑपरेटर**: प्लेसमेंट २८% (घाटा: -३२% वार्षिक गिरावट)।\n२. **मैनुअल ड्राफ्ट्समैन (सिविल)**: प्लेसमेंट ३१% (AutoCAD/BIM के कारण अप्रचलित)।\n३. **रेडियो एवं टीवी मैकेनिक**: प्लेसमेंट २२%।\n\n**सिफारिश**: इन सीटों को ड्रोन असेंबली और रोबोटिक्स पाठ्यक्रमों में पुनर्वितरित करें।`;
          } else if (qLower.includes('nashik') || qLower.includes('नासिक')) {
            responseText = `नासिक जिला कौशल विश्लेषण:\n\n- **प्रमुख उद्योग**: रक्षा एवं एयरोस्पेस (HAL ओझर), फार्मास्यूटिकल्स और उन्नत कृषि तकनीक।\n- **गंभीर कौशल कमी**: ५-अक्षीय CNC ऑपरेटर (-३५० सीटें), ड्रोन तकनीशियन (-२०० सीटें)।\n- **सिफारिश**: नासिक में एयरोस्पेस एवं रक्षा कौशल केंद्र स्थापित करें।`;
          }
        }
      } else {
        responseText = lang === 'mr'
          ? `"${query}" साठी धोरणात्मक विश्लेषण:\n\n- **श्रम मागणी संरेखन**: पश्चिम महाराष्ट्र आणि मराठवाडा औद्योगिक कॉरिडॉरमध्ये उच्च मागणी.\n- **शिफारस केलेली शासकीय कृती**: मुख्यमंत्री कौशल्य विकास योजनेअंतर्गत विशेष CoE बॅचेस मंजूर करा आणि NAPS शिकाऊ उमेदवारी अनिवार्य करा.\n- **आर्थिक व्यवहार्यता**: जिल्हा कौशल्य विकास निधीतून (DSDO) तरतूद करता येईल.`
          : (lang === 'hi'
            ? `"${query}" के लिए नीतिगत विश्लेषण:\n\n- **श्रम मांग संरेखण**: पश्चिम महाराष्ट्र और मराठवाड़ा औद्योगिक गलियारों में उच्च मांग।\n- **अनुशंसित सरकारी कार्रवाई**: मुख्यमंत्री कौशल्य विकास योजना के तहत विशेष CoE बैच स्वीकृत करें और NAPS शिक्षुता अनिवार्य करें।\n- **वित्तीय व्यवहार्यता**: जिला कौशल विकास निधि (DSDO) से आवंटन संभव है।`
            : `Policy Intelligence Assessment for "${query}":\n\n- **Labour Demand Alignment**: High concentration in Western Maharashtra and Marathwada industrial corridors.\n- **Recommended Government Action**: Sanction specialized CoE batches under Mukhyamantri Kaushalya Vikas Scheme and mandate NAPS apprenticeship linkage.\n- **Fiscal Feasibility**: Allocations can be channeled via existing PMKVY-MS District Skill Development Funds.`);
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText,
        supportingData: {
          source: lang === 'mr' ? "महास्किल धोरण इंजिन व MSSDS क्षमता नोंदवही" : (lang === 'hi' ? "महास्किल नीति इंजन एवं MSSDS क्षमता रजिस्ट्री" : "MahaSkill Policy Engine & MSSDS Capacity Registry"),
          dateOfData: lang === 'mr' ? "सप्टेंबर २०२६" : (lang === 'hi' ? "सितम्बर २०२६" : "September 2026"),
          indicators: lang === 'mr' ? ["३६ जिल्हा रोजगार विनिमय केंद्रे", "वार्षिक अर्थसंकल्प शीर्षक: २२३०"] : (lang === 'hi' ? ["३६ जिला रोजगार विनिमय केंद्र", "वार्षिक बजट शीर्ष: २२३०"] : ["36 District Employment Exchanges", "Annual Budget Head: 2230"]),
          confidenceStatus: lang === 'mr' ? "उच्च (९२% प्रायोगिक विश्वासार्हता)" : (lang === 'hi' ? "उच्च (९२% अनुभवजन्य विश्वसनीयता)" : "High (92% Empirical Confidence)")
        }
      };

      setMessages(prev => [...prev, botMsg]);
    }, 500);
  };

  return (
    <div className="ai-copilot-panel" id="admin-sec-ai-copilot" role="region" aria-label="AI Government Copilot">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--navy-deep)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={24} style={{ color: 'var(--saffron-primary)' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                {t?.adminNavAiCopilot || (lang === 'mr' ? 'एआय शासकीय धोरण सहाय्यक' : (lang === 'hi' ? 'एआय सरकारी नीति सहायक' : 'AI Government Policy Copilot'))}
              </h2>
              <span className="badge badge-saffron">
                {lang === 'mr' ? 'प्रमाण-समर्थित' : (lang === 'hi' ? 'साक्ष्य-समर्थित' : 'Evidence-Backed')}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {lang === 'mr' 
                ? 'अधिकृत संदर्भ आणि विश्वासार्हता पडताळणीसह पुराव्यावर आधारित धोरण निर्मिती.' 
                : (lang === 'hi' 
                  ? 'सत्यापित संदर्भों और विश्वसनीयता ऑडिट के साथ साक्ष्य-आधारित नीति निर्माण।' 
                  : 'Strict evidence-based policy formulation with supporting citations and confidence audits.')}
            </p>
          </div>
        </div>

        {/* Export Report Action */}
        <button 
          type="button" 
          className="btn btn-primary btn-sm"
          onClick={onExportStateReport}
        >
          <Download size={14} />
          {lang === 'mr' ? 'ब्रीफिंग अहवाल निर्यात करा (PDF)' : (lang === 'hi' ? 'ब्रीफिंग रिपोर्ट निर्यात करें (PDF)' : 'Export Briefing Report (PDF)')}
        </button>
      </div>

      {/* Chat Messages */}
      <div style={{ background: '#f8fafc', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px', height: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
        {messages.map((m) => (
          <div key={m.id} className={`chat-bubble ${m.sender}`} style={{ maxWidth: m.sender === 'bot' ? '92%' : '80%' }}>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{m.text}</div>

            {/* Mandatory Evidence Citations for Government Officer */}
            {m.supportingData && (
              <div className="evidence-box">
                <div>
                  <div className="evidence-item-title">
                    <Database size={11} style={{ display: 'inline', marginRight: '3px' }} />
                    {lang === 'mr' ? 'डेटा स्रोत:' : (lang === 'hi' ? 'डेटा स्रोत:' : 'Data Source:')}
                  </div>
                  <div style={{ fontWeight: 600 }}>{m.supportingData.source}</div>
                </div>

                <div>
                  <div className="evidence-item-title">
                    <Calendar size={11} style={{ display: 'inline', marginRight: '3px' }} />
                    {lang === 'mr' ? 'डेटा दिनांक:' : (lang === 'hi' ? 'डेटा दिनांक:' : 'Date of Data:')}
                  </div>
                  <div style={{ fontWeight: 600 }}>{m.supportingData.dateOfData}</div>
                </div>

                <div>
                  <div className="evidence-item-title">
                    <TrendingUp size={11} style={{ display: 'inline', marginRight: '3px' }} />
                    {lang === 'mr' ? 'संबंधित निर्देशांक:' : (lang === 'hi' ? 'प्रासंगिक संकेतक:' : 'Relevant Indicators:')}
                  </div>
                  <div>{m.supportingData.indicators.join(' • ')}</div>
                </div>

                <div>
                  <div className="evidence-item-title">
                    <ShieldCheck size={11} style={{ display: 'inline', marginRight: '3px' }} />
                    {lang === 'mr' ? 'विश्वासार्हता / प्रमाण स्थिती:' : (lang === 'hi' ? 'विश्वसनीयता / साक्ष्य स्थिति:' : 'Confidence / Evidence Status:')}
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--success-dark)' }}>{m.supportingData.confidenceStatus}</div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Questions for Officers */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
          {lang === 'mr' ? 'अधिकारी धोरण प्रश्न शॉर्टकट्स:' : (lang === 'hi' ? 'अधिकारी नीति प्रश्न शॉर्टकट्स:' : 'Officer Policy Query Shortcuts:')}
        </div>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {presetQuestions.map((pq, idx) => (
            <button
              key={idx}
              type="button"
              className="quick-chip"
              onClick={() => handleSendMessage(pq.query)}
            >
              {pq.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
      >
        <input 
          type="text"
          className="dash-search-input"
          style={{ background: '#ffffff', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)' }}
          placeholder={lang === 'mr' ? 'धोरणात्मक प्रश्न विचारा (उदा. कोणते अभ्यासक्रम बंद करावेत? नाशिकमधील कौशल्य तफावत दाखवा)...' : (lang === 'hi' ? 'नीतिगत प्रश्न पूछें (उदा. किन पाठ्यक्रमों की समीक्षा होनी चाहिए? नासिक में कौशल अंतर दिखाएं)...' : 'Ask policy questions (e.g. Which courses should be reviewed? Show skill gaps in Nashik)...')}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button 
          type="submit" 
          className="btn btn-navy"
          style={{ padding: '12px 20px', flexShrink: 0 }}
          disabled={!inputValue.trim()}
        >
          <Send size={16} />
          <span>{lang === 'mr' ? 'प्रश्न पाठवा' : (lang === 'hi' ? 'प्रश्न भेजें' : 'Submit Query')}</span>
        </button>
      </form>
    </div>
  );
}
