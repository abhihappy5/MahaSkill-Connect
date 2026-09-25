import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  RefreshCw, 
  Building2, 
  Languages, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  MapPin,
  Flame,
  Award
} from 'lucide-react';
import { personaPrompts, detectLanguage, generateStructuredAiResponse } from '../../data/unifiedAiData';

export function UnifiedAiModal({ isOpen, onClose, lang, setLang, t, initialPrompt, initialPersona = 'student' }) {
  const [activePersona, setActivePersona] = useState(initialPersona); // 'student' | 'seeker' | 'restart' | 'admin'
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceStatusText, setVoiceStatusText] = useState('');
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState(1); // 0 = Small, 1 = Normal, 2 = Large
  const messagesEndRef = useRef(null);

  // Initialize welcome message when modal opens or language changes
  useEffect(() => {
    if (messages.length === 0) {
      initWelcomeMessage(lang, activePersona);
    }
  }, [lang, activePersona]);

  // Handle external initial prompt
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const initWelcomeMessage = (currentLang, persona) => {
    const greetings = {
      student: {
        en: "Hello! I am your MahaSkill Career & Course Advisor. What career or course would you like to explore today?",
        mr: "नमस्कार! मी तुमचा महास्किल करिअर व अभ्यासक्रम मार्गदर्शक आहे. तुम्हाला कोणत्या करिअरबद्दल जाणून घ्यायचे आहे?",
        hi: "नमस्ते! मैं आपका महास्किल करियर व कोर्स सलाहकार हूँ। आज आप किस करियर के बारे में जानना चाहते हैं?"
      },
      seeker: {
        en: "Welcome Job Seeker! I can analyze your resume, diagnose skill gaps, and match you with 1,42,850+ active jobs.",
        mr: "स्वागत आहे! मी तुमच्या कौशल्यांचे विश्लेषण करून तुम्हाला योग्य शासकीय व खाजगी नोकऱ्या शोधून देऊ शकतो.",
        hi: "स्वागत है! मैं आपके कौशल का विश्लेषण कर महाराष्ट्र की १,४२,८५०+ नौकरियों से आपका मिलान कर सकता हूँ।"
      },
      restart: {
        en: "Welcome to Career Restart AI. Tell me about your background; let's build a supportive path back into the workforce.",
        mr: "करिअर रीस्टार्ट सहाय्यकामध्ये आपले स्वागत. तुमच्या मागील अनुभवाचा वापर करून नवा रोजगार मार्ग तयार करूया.",
        hi: "करियर रीस्टार्ट में स्वागत है। आपके पिछले अनुभव के आधार पर हम एक नया रोजगार मार्ग तैयार करेंगे।"
      },
      admin: {
        en: "MahaSkill Policy & Labour Intelligence Copilot active. Query real-time district shortages, curriculum gaps, or capacity plans.",
        mr: "महाराष्ट्र शासन कामगार बुद्धिमत्ता कक्ष सक्रिय. जिल्हा कौशल्य तुटवडा, अभ्यासक्रम बदल किंवा धोरणात्मक डेटा विचारा.",
        hi: "महाराष्ट्र श्रम खुफिया सहायक सक्रिय। जिलावार कौशल की कमी, पाठ्यक्रम अपडेट या क्षमता योजना के बारे में पूछें।"
      }
    };

    const text = greetings[persona]?.[currentLang] || greetings[persona]?.en || "Welcome to MahaSkill Connect!";
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'bot',
        persona: persona,
        text: text,
        structured: null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    // Automatic Language Detection
    const detectedLang = detectLanguage(query);
    if (detectedLang !== lang) {
      setLang(detectedLang);
    }

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Generate intelligent structured GovTech AI response
    setTimeout(() => {
      const responseData = generateStructuredAiResponse(query, activePersona, detectedLang, isSimpleMode);
      
      const botMsg = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        persona: activePersona,
        text: responseData.text,
        structured: responseData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);

      // Automatically speak the key recommendation
      speakText(responseData.recommendation + '. ' + (responseData.whyRecommended ? responseData.whyRecommended[0] : ''));
    }, 500);
  };

  // Text-to-Speech Output
  const speakText = (textToSpeak) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const cleanText = textToSpeak.replace(/[*_#`\[\]]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (lang === 'mr') utterance.lang = 'mr-IN';
    else if (lang === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Voice Input (Speech-to-Text)
  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      setVoiceStatusText('');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
          setVoiceStatusText(lang === 'mr' ? 'ऐकत आहे...' : (lang === 'hi' ? 'सुन रहा हूँ...' : 'Listening...'));
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          setVoiceStatusText('');
          handleSendMessage(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
          simulateVoiceInput();
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err) {
        simulateVoiceInput();
      }
    } else {
      simulateVoiceInput();
    }
  };

  const simulateVoiceInput = () => {
    setIsListening(true);
    setVoiceStatusText(lang === 'mr' ? 'ऐकत आहे... (Listening)' : (lang === 'hi' ? 'सुन रहा हूँ...' : 'Listening...'));
    setTimeout(() => {
      // Direct sample prompt from Phase 5 requirements:
      const sampleQueries = {
        mr: "माझ्या जिल्ह्यात कोणत्या skills ची मागणी जास्त आहे?",
        hi: "पुणे में कौन से कौशल की सबसे अधिक मांग है?",
        en: "What careers and courses are recommended for Industrial Automation?"
      };
      const query = sampleQueries[lang] || sampleQueries.en;
      setIsListening(false);
      setVoiceStatusText('');
      handleSendMessage(query);
    }, 2000);
  };

  // Translate specific message
  const handleTranslateMessage = (msgId) => {
    const targetLang = lang === 'en' ? 'mr' : (lang === 'mr' ? 'hi' : 'en');
    setLang(targetLang);
  };

  const clearConversation = () => {
    stopSpeaking();
    initWelcomeMessage(lang, activePersona);
  };

  const currentPersonaData = personaPrompts[activePersona] || personaPrompts.student;
  const currentPrompts = currentPersonaData.prompts[lang] || currentPersonaData.prompts.en;

  const fontSizes = ['0.86rem', '1rem', '1.14rem'];

  if (!isOpen) return null;

  return (
    <div 
      className="unified-ai-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="MahaSkill Connect Conversational Panel"
    >
      <div 
        className="unified-ai-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{ fontSize: fontSizes[fontSizeLevel] }}
      >
        {/* ================= HEADER (Slim & Pinned Top-Right Close) ================= */}
        <div className="ai-panel-header">
          <div className="ai-header-left">
            <div className="ai-brand-badge" aria-hidden="true">🤖</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                MahaSkill Connect
                <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.18)', padding: '1px 8px', borderRadius: '10px', fontWeight: 600 }}>
                  GovTech Intelligence
                </span>
              </div>
            </div>
          </div>

          {/* Header Controls Center: Language, Voice Indicators, Accessibility */}
          <div className="ai-header-controls-center">
            
            {/* Language Switcher: मराठी | हिन्दी | English */}
            <div style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 'var(--radius-full)',
              padding: '2px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {[
                { code: 'mr', label: 'मराठी' },
                { code: 'hi', label: 'हिन्दी' },
                { code: 'en', label: 'English' }
              ].map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  style={{
                    border: 'none',
                    background: lang === l.code ? 'var(--saffron-primary)' : 'transparent',
                    color: '#ffffff',
                    padding: '2px 9px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Voice Status Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span 
                style={{ 
                  fontSize: '0.72rem', 
                  background: isListening ? '#dc2626' : 'rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Mic size={12} /> {isListening ? 'Listening' : 'Listening'}
              </span>

              <span 
                style={{ 
                  fontSize: '0.72rem', 
                  background: isSpeaking ? 'var(--success-primary)' : 'rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Volume2 size={12} /> {isSpeaking ? 'Speaking' : 'Speaker'}
              </span>
            </div>

            {/* Accessibility: Font Size Adjuster */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.12)', borderRadius: '4px', padding: '1px' }}>
              <button 
                type="button" 
                onClick={() => setFontSizeLevel(Math.max(0, fontSizeLevel - 1))}
                title="Decrease Font Size"
                style={{ background: 'none', border: 'none', color: '#fff', padding: '2px 5px', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}
              >
                A-
              </button>
              <button 
                type="button" 
                onClick={() => setFontSizeLevel(Math.min(2, fontSizeLevel + 1))}
                title="Increase Font Size"
                style={{ background: 'none', border: 'none', color: '#fff', padding: '2px 5px', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}
              >
                A+
              </button>
            </div>


            {/* Reset Conversation */}
            <button
              type="button"
              onClick={clearConversation}
              title="Reset conversation"
              style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#ffffff', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              aria-label="Reset Conversation"
            >
              <RotateCcw size={13} />
            </button>
          </div>

          {/* Close Button Pinned at Top Right */}
          <button
            type="button"
            className="ai-header-close-btn"
            onClick={onClose}
            title="Close MahaSkill Connect Panel"
            aria-label="Close MahaSkill Connect Panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* ================= PERSONA SWITCHER BAR ================= */}
        <div className="ai-persona-bar">
          <div className="persona-pills-wrap">
            {[
              { id: 'student', icon: GraduationCap, label: lang === 'mr' ? 'विद्यार्थी AI' : (lang === 'hi' ? 'विद्यार्थी AI' : 'Student AI') },
              { id: 'seeker', icon: Briefcase, label: lang === 'mr' ? 'नोकरी शोधणारे AI' : (lang === 'hi' ? 'रोजगार AI' : 'Job Seeker AI') },
              { id: 'restart', icon: RefreshCw, label: lang === 'mr' ? 'करिअर रीस्टार्ट AI' : (lang === 'hi' ? 'रीस्टार्ट AI' : 'Career Restart AI') },
              { id: 'admin', icon: Building2, label: lang === 'mr' ? 'प्रशासक AI' : (lang === 'hi' ? 'प्रशासक AI' : 'Admin AI') }
            ].map(p => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`persona-pill-btn ${activePersona === p.id ? 'active' : ''}`}
                  onClick={() => {
                    setActivePersona(p.id);
                    initWelcomeMessage(lang, p.id);
                  }}
                >
                  <Icon size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Simple Language Mode Toggle */}
          <button
            type="button"
            className={`simple-mode-btn ${isSimpleMode ? 'active' : ''}`}
            onClick={() => setIsSimpleMode(!isSimpleMode)}
            title="Toggle simple plain language"
          >
            <span>💡</span>
            {lang === 'mr' ? 'सोपी भाषा (Simple Mode)' : (lang === 'hi' ? 'सरल भाषा' : 'Simple Language Mode')}
          </button>
        </div>

        {/* ================= CHAT BODY ================= */}
        <div className="ai-panel-chat-body">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                width: '100%'
              }}
            >
              {/* Message Bubble (Bot answers are full-width and spacious) */}
              <div 
                style={{
                  maxWidth: msg.sender === 'user' ? '75%' : '100%',
                  width: msg.sender === 'user' ? 'auto' : '100%',
                  background: msg.sender === 'user' ? 'var(--navy-deep)' : '#ffffff',
                  color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                  padding: msg.sender === 'user' ? '12px 18px' : '18px 22px',
                  borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '16px',
                  boxShadow: 'var(--shadow-sm)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                  lineHeight: 1.55,
                  boxSizing: 'border-box'
                }}
              >
                {/* Sender badge */}
                {msg.sender === 'bot' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--saffron-primary)' }}>
                    <Bot size={14} />
                    <span>MahaSkill Connect • {personaPrompts[msg.persona || 'student']?.badge}</span>
                  </div>
                )}

                <div style={{ whiteSpace: 'pre-line' }}>
                  {msg.text}
                </div>

                {/* Structured GovTech Recommendation Card (Phase 5 Required Design) */}
                {msg.structured && (
                  <div className="ai-rec-card">
                    {/* Header / Title */}
                    <div className="ai-rec-title">
                      <Award size={20} style={{ color: 'var(--saffron-primary)' }} />
                      <span>{msg.structured.recommendation}</span>
                    </div>

                    {/* Why this was recommended */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--navy-deep)', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {lang === 'mr' ? 'ही शिफारस का करण्यात आली:' : (lang === 'hi' ? 'यह सिफारिश क्यों की गई:' : 'Why this was recommended:')}
                      </div>
                      <ul className="ai-why-list">
                        {msg.structured.whyRecommended?.map((why, idx) => (
                          <li key={idx} className="ai-why-item">
                            <CheckCircle2 size={15} style={{ color: 'var(--success-dark)', flexShrink: 0, marginTop: '2px' }} />
                            <span>{why}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Supporting data */}
                    {msg.structured.supportingData && (
                      <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--navy-deep)', textTransform: 'uppercase', marginBottom: '6px' }}>
                          {lang === 'mr' ? 'समर्थन देणारा डेटा:' : (lang === 'hi' ? 'सहायक डेटा:' : 'Supporting Data & Market Stats:')}
                        </div>
                        <div className="ai-supporting-grid">
                          <div className="ai-support-item">
                            <span className="ai-support-lbl">{lang === 'mr' ? 'रिक्त पदे' : 'Open Vacancies'}</span>
                            <span className="ai-support-val">{msg.structured.supportingData.vacancies}</span>
                          </div>
                          <div className="ai-support-item">
                            <span className="ai-support-lbl">{lang === 'mr' ? 'सरासरी वेतन' : 'Avg Package'}</span>
                            <span className="ai-support-val">{msg.structured.supportingData.avgPackage}</span>
                          </div>
                          <div className="ai-support-item">
                            <span className="ai-support-lbl">{lang === 'mr' ? 'प्रमुख जिल्हे' : 'Key Districts'}</span>
                            <span className="ai-support-val" style={{ fontSize: '0.78rem' }}>{msg.structured.supportingData.topDistricts}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Relevant skills */}
                    {msg.structured.relevantSkills && (
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--navy-deep)', textTransform: 'uppercase', marginBottom: '6px' }}>
                          {lang === 'mr' ? 'संबंधित कौशल्ये:' : (lang === 'hi' ? 'संबंधित कौशल:' : 'Relevant Skills:')}
                        </div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {msg.structured.relevantSkills.map((sk, idx) => (
                            <span 
                              key={idx}
                              style={{
                                background: 'var(--navy-subtle)',
                                color: 'var(--navy-deep)',
                                padding: '4px 10px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                border: '1px solid var(--border-subtle)'
                              }}
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Next Action Button */}
                    {msg.structured.nextAction && (
                      <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            const target = document.getElementById('trending-careers');
                            if (target) target.scrollIntoView({ behavior: 'smooth' });
                          }}
                          style={{
                            background: 'var(--saffron-primary)',
                            color: '#ffffff',
                            border: 'none',
                            padding: '8px 18px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 12px rgba(234, 88, 12, 0.35)'
                          }}
                        >
                          {msg.structured.nextAction}
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Message Actions: Listen again, Translate, View details */}
                {msg.sender === 'bot' && (
                  <div className="message-actions-bar">
                    <button
                      type="button"
                      className="msg-action-btn"
                      onClick={() => speakText(msg.structured ? (msg.structured.recommendation + '. ' + msg.structured.whyRecommended.join('. ')) : msg.text)}
                    >
                      <Volume2 size={13} /> {lang === 'mr' ? 'पुन्हा ऐका (Listen again)' : 'Listen again'}
                    </button>

                    <button
                      type="button"
                      className="msg-action-btn"
                      onClick={() => handleTranslateMessage(msg.id)}
                    >
                      <Languages size={13} /> {lang === 'mr' ? 'भाषांतर (Translate)' : 'Translate'}
                    </button>

                    <button
                      type="button"
                      className="msg-action-btn"
                      onClick={() => {
                        onClose();
                        const el = document.getElementById('trending-careers');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <Sparkles size={13} /> {lang === 'mr' ? 'तपशील पहा (View details)' : 'View details'}
                    </button>
                  </div>
                )}
              </div>

              {/* Timestamp */}
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', marginInline: '8px' }}>
                {msg.timestamp}
              </span>
            </div>
          ))}

          {/* Voice status live indicator */}
          {voiceStatusText && (
            <div style={{
              alignSelf: 'center',
              background: '#fee2e2',
              color: '#dc2626',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span className="live-pulse" style={{ background: '#dc2626' }}></span>
              {voiceStatusText}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ================= SUGGESTED PROMPTS STRIP (Slim) ================= */}
        <div className="ai-suggested-strip">
          <div className="suggested-prompts-lbl">
            {lang === 'mr' ? 'सुचवलेले प्रश्न:' : (lang === 'hi' ? 'सुझाए गए प्रश्न:' : 'Suggested Prompts for You:')}
          </div>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px', scrollbarWidth: 'none' }}>
            {currentPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: 'var(--navy-deep)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--saffron-primary)';
                  e.currentTarget.style.background = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.background = 'var(--bg-secondary)';
                }}
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>

        {/* ================= INPUT & VOICE CONTROLS (Slim) ================= */}
        <form 
          className="ai-input-area"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          {/* Voice Microphone Trigger */}
          <button
            type="button"
            className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
            style={{ width: '38px', height: '38px', flexShrink: 0 }}
            onClick={handleVoiceInput}
            title="Voice input in Marathi, Hindi, or English"
            aria-label="Voice input button"
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <input 
            type="text"
            className="ai-chat-input"
            placeholder={
              lang === 'mr' 
                ? "येथे प्रश्न विचारा किंवा बोला (उदा. 'माझ्या जिल्ह्यात कोणत्या skills ची मागणी जास्त आहे?')..." 
                : (lang === 'hi' 
                  ? "यहाँ प्रश्न पूछें या बोलें (उदा. 'पुणे में कौन सा कोर्स अच्छा है?')..." 
                  : "Ask or speak anything (e.g. 'What career suits me?', 'Show skill shortages')...")
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Unified AI message input"
            style={{ flex: 1, padding: '9px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}
          />

          <button 
            type="submit" 
            className="ai-send-btn"
            aria-label="Send message"
            disabled={!inputValue.trim()}
            style={{ width: '38px', height: '38px', flexShrink: 0, borderRadius: '50%', background: inputValue.trim() ? 'var(--saffron-primary)' : 'var(--bg-secondary)', color: inputValue.trim() ? '#ffffff' : 'var(--text-muted)', border: 'none', cursor: inputValue.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Send size={16} />
          </button>
        </form>

      </div>
    </div>
  );
}
