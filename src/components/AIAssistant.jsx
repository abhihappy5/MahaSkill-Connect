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
  User
} from 'lucide-react';
import { assistantKnowledgeBase, defaultGreetings } from '../data/faqAssistantData';

export function AIAssistant({ isOpen, onClose, lang, setLang, t, initialPrompt }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: defaultGreetings[lang] || defaultGreetings.en
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState('');
  const messagesEndRef = useRef(null);

  // Update initial greeting when language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].sender === 'bot') {
        return [{ id: 1, sender: 'bot', text: defaultGreetings[lang] || defaultGreetings.en }];
      }
      return prev;
    });
  }, [lang]);

  // Handle external initial prompt if provided
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Clean up any speech synthesis when closed
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

    // Generate intelligent GovTech AI response
    setTimeout(() => {
      const botResponseText = generateBotResponse(query, lang);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponseText
      };
      setMessages(prev => [...prev, botMessage]);

      // Automatically speak response if speech synthesis is available
      speakText(botResponseText);
    }, 600);
  };

  const generateBotResponse = (query, currentLang) => {
    const qLower = query.toLowerCase();
    const currentLangKB = assistantKnowledgeBase[currentLang] || assistantKnowledgeBase.en;

    for (const item of currentLangKB) {
      if (item.keywords.some(k => qLower.includes(k.toLowerCase()))) {
        return item.response;
      }
    }

    // Fallback response based on language
    if (currentLang === 'mr') {
      return `आपल्या "${query}" या प्रश्नासाठी मी महाराष्ट्र शासनाच्या कौशल्य डेटाबेसमध्ये शोध घेत आहे. \n\n१. आपण महास्किल पोर्टलवर थेट नोंदणी करून ३,४२०+ मान्यताप्राप्त अभ्यासक्रम शोधू शकता.\n२. जवळच्या शासकीय आयटीआय किंवा जिल्हा कौशल्य विकास रोजगार मार्गदर्शन केंद्राशी संपर्क साधू शकता.\n३. अधिक माहितीसाठी आमचा १८००-१२०-८०४० हा टोल-फ्री क्रमांक उपलब्ध आहे.`;
    } else if (currentLang === 'hi') {
      return `आपके प्रश्न "${query}" के लिए महाराष्ट्र कौशल डेटाबेस में जानकारी:\n\n१. आप महास्किल पोर्टल पर सीधे ३,४२०+ पाठ्यक्रमों और रिक्तियों की खोज कर सकते हैं।\n२. अपने निकटतम शासकीय आईटीआई से संपर्क कर सकते हैं।\n३. टोल-फ्री हेल्पलाइन १८००-१२०-८०४० पर संपर्क करें।`;
    } else {
      return `Regarding your query "${query}", MahaSkill Connect has queried the Maharashtra Labour Intelligence database:\n\n1. **Accredited Pathways**: You can enroll in over 3,420+ government-subsidized courses at local ITIs and Polytechnics.\n2. **Financial Support**: Eligible for DBT stipends under Pramod Mahajan Kaushalya Vikas and NAPS schemes.\n3. **Direct Vacancies**: Over 1,42,850+ verified jobs are open across Maharashtra.\n\nCall our 24/7 Helpline at 1800-120-8040 for personalized counseling.`;
    }
  };

  // Text to Speech Voice Response
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    // Clean markdown characters for clearer speech
    const cleanText = text.replace(/[*_#`\[\]]/g, '');
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

  // Voice Input Recognition
  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      setVoiceFeedback('');
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
          setVoiceFeedback(t.listening);
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          setVoiceFeedback('');
          handleSendMessage(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
          simulateAssistantVoice();
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err) {
        simulateAssistantVoice();
      }
    } else {
      simulateAssistantVoice();
    }
  };

  const simulateAssistantVoice = () => {
    setIsListening(true);
    setVoiceFeedback(t.listening);
    setTimeout(() => {
      const sampleVoiceQueries = {
        mr: "पुण्यामध्ये ईव्ही बॅटरीचे कोणते आयटीआय कोर्सेस आहेत?",
        hi: "महिलांसाठी सरकारी कौशल योजना और वजीफा क्या है?",
        en: "What are the high paying AI and robotics jobs in Maharashtra?"
      };
      const simulatedText = sampleVoiceQueries[lang] || sampleVoiceQueries.en;
      setIsListening(false);
      setVoiceFeedback('');
      handleSendMessage(simulatedText);
    }, 2000);
  };

  const clearChat = () => {
    stopSpeaking();
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: defaultGreetings[lang] || defaultGreetings.en
      }
    ]);
  };

  const quickPrompts = {
    en: [
      "EV technician courses in Pune",
      "AI & Data jobs in Mumbai",
      "Stipend schemes for women in tech",
      "How to apply for Pramod Mahajan scheme"
    ],
    mr: [
      "पुण्यात ईव्ही अभ्यासक्रम",
      "मुंबईत एआय व डेटा नोकऱ्या",
      "महिलांसाठी कौशल्य योजना",
      "प्रमोद महाजन योजनेचे विद्यावेतन"
    ],
    hi: [
      "पुणे में ईवी कोर्स",
      "मुंबई में एआई नौकरियां",
      "महिलाओं के लिए वजीफा योजना",
      "प्रमोद महाजन कौशल योजना"
    ]
  };

  const currentPrompts = quickPrompts[lang] || quickPrompts.en;

  if (!isOpen) return null;

  return (
    <div class="ai-drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="MahaSkill Connect Assistant">
      <div class="ai-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div class="ai-drawer-header">
          <div class="ai-header-info">
            <div class="ai-avatar">
              <Bot size={22} />
            </div>
            <div>
              <div class="ai-header-title">{t.assistantTitle}</div>
              <div class="ai-header-sub">{t.assistantSubtitle}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Clear Chat */}
            <button 
              class="ai-close-btn" 
              onClick={clearChat} 
              title="Reset conversation"
              aria-label="Reset conversation"
            >
              <RotateCcw size={17} />
            </button>

            {/* Stop Voice Readout */}
            {isSpeaking && (
              <button 
                class="ai-close-btn" 
                onClick={stopSpeaking} 
                title="Mute voice"
                aria-label="Mute voice"
                style={{ color: 'var(--saffron-primary)' }}
              >
                <VolumeX size={18} />
              </button>
            )}

            {/* Close Drawer */}
            <button class="ai-close-btn" onClick={onClose} aria-label="Close AI Assistant">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Language Switcher inside Assistant */}
        <div style={{
          padding: '8px 16px',
          background: 'var(--navy-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8rem'
        }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Language / भाषा:</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['mr', 'hi', 'en'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                style={{
                  border: 'none',
                  background: lang === code ? 'var(--saffron-primary)' : 'transparent',
                  color: lang === code ? '#ffffff' : 'var(--text-secondary)',
                  padding: '2px 8px',
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

        {/* Chat History */}
        <div class="ai-chat-body">
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
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                    title="Listen to response"
                  >
                    <Volume2 size={13} /> Listen
                  </button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Voice Feedback Status */}
        {voiceFeedback && (
          <div style={{
            padding: '6px 16px',
            background: '#fee2e2',
            color: '#dc2626',
            fontSize: '0.8rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span class="live-pulse" style={{ background: '#dc2626' }}></span>
            {voiceFeedback}
          </div>
        )}

        {/* Quick Prompts Chips */}
        <div class="ai-quick-prompts">
          <div class="quick-prompts-title">{t.quickPromptsLabel}</div>
          <div class="quick-chips-wrap">
            {currentPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                class="quick-chip"
                onClick={() => handleSendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input & Voice Controls */}
        <form 
          class="ai-input-area"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <button
            type="button"
            class={`voice-mic-btn ${isListening ? 'listening' : ''}`}
            style={{ width: '38px', height: '38px' }}
            onClick={handleVoiceInput}
            title="Speak into microphone"
            aria-label="Voice input button"
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          <input 
            type="text"
            class="ai-chat-input"
            placeholder={t.assistantPlaceholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="AI message input"
          />

          <button 
            type="submit" 
            class="ai-send-btn"
            aria-label="Send message"
            disabled={!inputValue.trim()}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
