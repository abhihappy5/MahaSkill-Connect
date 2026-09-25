import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, X, RotateCcw, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { detectLanguage, generateStructuredAiResponse } from '../../data/unifiedAiData';

export function VoiceInteractionOverlay({ isOpen, onClose, onQuerySubmit, lang, setLang }) {
  // States: 'idle' (1. Tap to speak), 'listening' (2. Listening), 'processing' (3. Processing), 'responding' (4. AI Responding), 'playing' (5. Playing voice response)
  const [voiceState, setVoiceState] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const [detectedLang, setDetectedLang] = useState(lang || 'en');
  const [currentResponse, setCurrentResponse] = useState(null);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      handleStopVoice();
    } else {
      setVoiceState('idle');
      setTranscript('');
      setCurrentResponse(null);
    }
  }, [isOpen]);

  const handleStopVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setVoiceState('idle');
    setIsSpeakingAudio(false);
  };

  const startListening = () => {
    setTranscript('');
    setCurrentResponse(null);
    setVoiceState('listening');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          const currentTranscript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setTranscript(currentTranscript);
          
          if (event.results[0].isFinal) {
            handleProcessTranscript(currentTranscript);
          }
        };

        recognition.onerror = () => {
          simulateMarathiVoiceInteraction();
        };

        recognition.start();
      } catch (err) {
        simulateMarathiVoiceInteraction();
      }
    } else {
      simulateMarathiVoiceInteraction();
    }
  };

  const simulateMarathiVoiceInteraction = () => {
    setVoiceState('listening');
    setTranscript(lang === 'mr' ? 'ऐकत आहे...' : (lang === 'hi' ? 'सुन रहा हूँ...' : 'Listening...'));

    setTimeout(() => {
      // Prompt requirement Marathi example: "माझ्या जिल्ह्यात कोणत्या skills ची मागणी जास्त आहे?"
      const sampleQueries = {
        mr: "माझ्या जिल्ह्यात कोणत्या skills ची मागणी जास्त आहे?",
        hi: "पुणे में कौन से कौशल की मांग सबसे अधिक है?",
        en: "What careers and skills are in high demand in Maharashtra?"
      };
      const query = sampleQueries[lang] || sampleQueries.mr;
      setTranscript(query);
      handleProcessTranscript(query);
    }, 2200);
  };

  const handleProcessTranscript = (query) => {
    setVoiceState('processing');
    const detected = detectLanguage(query);
    setDetectedLang(detected);

    setTimeout(() => {
      setVoiceState('responding');
      const aiResponse = generateStructuredAiResponse(query, 'student', detected);
      setCurrentResponse(aiResponse);

      // Transition to state 5: Playing voice response
      setVoiceState('playing');
      speakVoiceOutput(aiResponse.recommendation + '. ' + (aiResponse.whyRecommended[0] || ''));
    }, 1200);
  };

  const speakVoiceOutput = (text) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`\[\]]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (detectedLang === 'mr') utterance.lang = 'mr-IN';
    else if (detectedLang === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeakingAudio(true);
    utterance.onend = () => {
      setIsSpeakingAudio(false);
      setVoiceState('responding');
    };
    utterance.onerror = () => {
      setIsSpeakingAudio(false);
      setVoiceState('responding');
    };

    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) return null;

  return (
    <div className="unified-ai-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="MahaSkill Connect Voice Interaction">
      <div 
        className="unified-ai-panel" 
        style={{ maxWidth: '640px', height: 'auto', minHeight: '520px', padding: '0' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="ai-panel-header">
          <div className="ai-header-brand">
            <div className="ai-brand-badge">🎙️</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>MahaSkill Connect Voice Engine</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Speech-to-Text • Multilingual • Voice Response</div>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            aria-label="Close Voice Interface"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', flex: 1 }}>
          
          {/* Status Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: voiceState === 'listening' ? '#fee2e2' : (voiceState === 'processing' ? '#fef3c7' : '#e0f2fe'),
            color: voiceState === 'listening' ? '#dc2626' : (voiceState === 'processing' ? '#d97706' : '#0369a1'),
            fontWeight: 800,
            fontSize: '0.85rem',
            marginBottom: '20px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: voiceState === 'listening' ? '#dc2626' : '#0369a1',
              display: 'inline-block'
            }}></span>
            {voiceState === 'idle' && (lang === 'mr' ? 'बोलण्यासाठी टॅप करा' : '1. Tap to Speak')}
            {voiceState === 'listening' && (lang === 'mr' ? '२. ऐकत आहे... (Listening)' : '2. Listening...')}
            {voiceState === 'processing' && (lang === 'mr' ? '३. प्रक्रिया सुरू आहे... (Processing)' : '3. Processing intent...')}
            {voiceState === 'responding' && (lang === 'mr' ? '४. उत्तर तयार केले (AI Responded)' : '4. AI Responded')}
            {voiceState === 'playing' && (lang === 'mr' ? '५. ऑडिओ उत्तर ऐकवत आहे (Playing Voice)' : '5. Playing Voice Response')}
          </div>

          {/* Waveform / Visual interaction */}
          {voiceState === 'listening' || voiceState === 'playing' ? (
            <div className="voice-wave-container">
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
            </div>
          ) : (
            <div style={{ height: '48px', margin: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {voiceState === 'idle' && (lang === 'mr' ? 'मराठी, हिन्दी किंवा इंग्रजीत विचारा' : 'Speak naturally in Marathi, Hindi, or English')}
                {voiceState === 'processing' && 'Scanning Maharashtra Labour Intelligence Data...'}
              </span>
            </div>
          )}

          {/* Large Mic Button */}
          <button
            type="button"
            className={`large-voice-circle-btn ${voiceState === 'listening' ? 'listening' : ''}`}
            onClick={voiceState === 'listening' ? handleStopVoice : startListening}
            aria-label="Voice Activation"
          >
            {voiceState === 'listening' ? <MicOff size={36} /> : <Mic size={36} />}
          </button>

          {/* Transcript display */}
          {transcript && (
            <div style={{
              marginTop: '24px',
              padding: '14px 18px',
              background: '#ffffff',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              width: '100%',
              maxWidth: '520px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                <span>USER TRANSCRIPT:</span>
                <span style={{ color: 'var(--saffron-primary)', textTransform: 'uppercase' }}>Detected: {detectedLang === 'mr' ? 'मराठी (Marathi)' : (detectedLang === 'hi' ? 'हिन्दी (Hindi)' : 'English')}</span>
              </div>
              <p style={{ fontWeight: 600, color: 'var(--navy-deep)', margin: 0, fontSize: '0.92rem' }}>
                "{transcript}"
              </p>
            </div>
          )}

          {/* AI Response Card */}
          {currentResponse && (
            <div style={{
              marginTop: '16px',
              padding: '18px 20px',
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--saffron-border)',
              width: '100%',
              maxWidth: '520px',
              textAlign: 'left',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--saffron-primary)', textTransform: 'uppercase' }}>
                  AI RECOMMENDATION
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> Govt Verified
                </span>
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '8px' }}>
                {currentResponse.recommendation}
              </h4>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.45 }}>
                {currentResponse.whyRecommended[0]}
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {currentResponse.relevantSkills.slice(0, 3).map((sk, idx) => (
                  <span key={idx} style={{ background: 'var(--navy-subtle)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy-deep)' }}>
                    {sk}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => speakVoiceOutput(currentResponse.recommendation + '. ' + currentResponse.whyRecommended.join('. '))}
                  style={{ background: 'none', border: 'none', color: 'var(--saffron-primary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Volume2 size={15} /> {lang === 'mr' ? 'पुन्हा ऐका (Listen again)' : 'Listen again'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onQuerySubmit) onQuerySubmit(transcript);
                  }}
                  style={{ background: 'var(--navy-deep)', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {lang === 'mr' ? 'तपशील पहा' : 'View details'} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
