import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw,
  HeartHandshake,
  Globe
} from 'lucide-react';
import { aiCareerCoachQA } from '../../data/careerRestartData';

export function AiCareerCoach({ lang, setLang }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: lang === 'mr' 
        ? "नमस्कार पूजा! मी तुमचा महास्किल कनेक्ट करिअर कोच आहे. तुमचा ५ वर्षांचा रिटेलमधील अनुभव अत्यंत महत्त्वाचा आहे. तुम्ही ऑफिस, लॉजिस्टिक्स किंवा डिजिटल क्षेत्रात कसे संक्रमण करू शकता याबद्दल मला विचारा."
        : (lang === 'hi'
          ? "नमस्कार पूजा! मैं आपका महास्किल कनेक्ट करियर कोच हूँ। आपका ५ साल का रिटेल अनुभव बहुत मूल्यवान है। आप ऑफिस, लॉजिस्टिक्स या डिजिटल करियर में कैसे बदलाव कर सकते हैं, इस बारे में मुझसे पूछें।"
          : "Namaskar Pooja! I am your MahaSkill Connect Career Coach. Your 5 years in retail and customer operations are powerful transferable assets. Ask me anything about transitioning into stable office administration, logistics, or remote digital roles.")
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Generate respectful, encouraging AI advice
    setTimeout(() => {
      let botResponse = "";
      const qLower = query.toLowerCase();
      const currentQA = aiCareerCoachQA[lang] || aiCareerCoachQA.en;

      if (qLower.includes("retail") || qLower.includes("रिटेल") || qLower.includes("office") || qLower.includes("ऑफिस")) {
        botResponse = currentQA[0]?.a || aiCareerCoachQA.en[0].a;
      } else if (qLower.includes("gap") || qLower.includes("break") || qLower.includes("खंड") || qLower.includes("अंतराल")) {
        botResponse = aiCareerCoachQA.en[1].a;
      } else if (lang === 'mr') {
        botResponse = `तुमच्या "${query}" या प्रश्नासाठी:\n\nमहाराष्ट्र शासनाच्या **महास्किल महिला पुनर्कौशल्य मिशन** अंतर्गत तुम्हाला ३ महिन्यांचे मोफत प्रशिक्षण, डिजिटल प्रमाणपत्र आणि थेट नोकरीची संधी उपलब्ध आहे.\n\nअधिक मार्गदर्शनासाठी आम्ही शासकीय समुपदेशकाची अपॉइंटमेंट बुक करू शकतो.`;
      } else {
        botResponse = `Regarding "${query}":\n\nYour existing foundation in customer management and operations gives you immediate eligibility for several state upskilling cohorts. We recommend completing Step 2 (ERP & CRM tools) which will boost your salary potential to ₹4.8L - ₹6.5L LPA with full government fee waivers.`;
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse
      };

      setMessages(prev => [...prev, botMsg]);
      speakText(botResponse);
    }, 600);
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`\[\]]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');
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

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');
        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (e) => {
          const text = e.results[0][0].transcript;
          setIsListening(false);
          handleSendMessage(text);
        };
        recognition.onerror = () => {
          setIsListening(false);
          simulateVoice();
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
      } catch (err) {
        simulateVoice();
      }
    } else {
      simulateVoice();
    }
  };

  const simulateVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSendMessage("I worked in retail for 5 years but now I want an office job.");
    }, 1800);
  };

  const promptChips = {
    en: [
      "I worked in retail for 5 years but now I want an office job.",
      "How should I explain my 4-year career gap on my resume?",
      "What free government courses are available in Pune for women?",
      "Can I get a hybrid or work-from-home job?"
    ],
    mr: [
      "मी ५ वर्षे रिटेलमध्ये काम केले पण आता मला ऑफिस जॉब हवा आहे.",
      "माझ्या ४ वर्षांच्या करिअर खंडाचे रेझ्युमेवर कसे स्पष्टीकरण द्यावे?",
      "पुण्यात महिलांसाठी मोफत शासकीय कोर्सेस कोणते आहेत?",
      "मला वर्क-फ्रॉम-होम किंवा हायब्रिड नोकरी मिळू शकते का?"
    ],
    hi: [
      "मैंने ५ साल रिटेल में काम किया लेकिन अब मैं ऑफिस जॉब चाहता हूँ।",
      "अपने ४ साल के करियर गैप को रिज्यूमे में कैसे समझाऊं?",
      "पुणे में महिलाओं के लिए मुफ्त सरकारी कोर्स कौन से हैं?"
    ]
  };

  const currentChips = promptChips[lang] || promptChips.en;

  return (
    <div class="ai-career-coach-section" id="section-ai-assistant" role="region" aria-label="AI Career Coach">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'var(--saffron-primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                AI Career Coach & Reskilling Mentor
              </h2>
              <span class="live-pulse"></span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Empowering, practical advice for career changers and returnees (मराठी | हिन्दी | English)
            </p>
          </div>
        </div>

        {/* Language Selector Inside Coach */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '4px 8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <Globe size={14} style={{ color: 'var(--saffron-primary)' }} />
          {['mr', 'hi', 'en'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              style={{
                border: 'none',
                background: lang === code ? 'var(--saffron-primary)' : 'transparent',
                color: lang === code ? '#ffffff' : 'var(--text-secondary)',
                padding: '3px 8px',
                borderRadius: '4px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.78rem'
              }}
            >
              {code === 'mr' ? 'मराठी' : (code === 'hi' ? 'हिन्दी' : 'English')}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Window */}
      <div class="coach-chat-window">
        {messages.map((msg) => (
          <div key={msg.id} class={`chat-bubble ${msg.sender}`}>
            {msg.text}
            {msg.sender === 'bot' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => speakText(msg.text)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--saffron-primary)',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Listen to response"
                >
                  <Volume2 size={13} /> Listen to Advice
                </button>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions Chips */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
          Recommended Questions:
        </div>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {currentChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              class="quick-chip"
              onClick={() => handleSendMessage(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar with Voice */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
      >
        <button
          type="button"
          class={`voice-mic-btn ${isListening ? 'listening' : ''}`}
          onClick={handleVoiceInput}
          title="Click to speak in Marathi, Hindi, or English"
          aria-label="Voice input"
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        <input 
          type="text"
          class="dash-search-input"
          style={{ background: '#ffffff', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}
          placeholder="Type your question or career goal..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button 
          type="submit" 
          class="btn btn-primary"
          style={{ padding: '12px 20px', flexShrink: 0 }}
          disabled={!inputValue.trim()}
        >
          <Send size={16} />
          <span>Ask Coach</span>
        </button>
      </form>
    </div>
  );
}
