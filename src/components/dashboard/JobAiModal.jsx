import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Briefcase, 
  Building2, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { mockCandidateProfile } from '../../data/jobSeekerData';

export function JobAiModal({ job, isOpen, onClose, lang }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (job && isOpen) {
      setMessages([
        {
          id: 1,
          sender: 'bot',
          text: `Namaskar Rahul! I am your AI Job Advisor. You are reviewing "${job.title}" at ${job.company} (${job.location}).\n\nYour profile has a **${job.matchScore}% skill compatibility match** for this vacancy. Ask me anything about eligibility, preparation, missing skills, or interview tips!`
        }
      ]);
    }
  }, [job, isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen || !job) return null;

  const quickQuestions = [
    { label: "Am I eligible?", prompt: "Am I eligible for this role based on my diploma and skills?" },
    { label: "What skills am I missing?", prompt: "What skills am I missing for this job and how can I close the gap?" },
    { label: "How should I prepare?", prompt: "How should I prepare for the technical interview at " + job.company + "?" },
    { label: "Explain this job description", prompt: "Explain this job description in simple terms." }
  ];

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

    // Generate contextual AI response based on the question & job details
    setTimeout(() => {
      let botResponse = "";
      const qLower = query.toLowerCase();

      if (qLower.includes("eligible") || qLower.includes("eligibility")) {
        botResponse = `**Eligibility Assessment for ${job.title}:**\n\n- **Overall Match:** ${job.matchScore}%\n- **Strengths:** Your Diploma in Electrical Engineering and verified competencies in ${job.matchingSkills.join(', ')} exceed the mandatory minimum criteria.\n- **Verdict:** **HIGHLY ELIGIBLE.** You have a strong likelihood of reaching the interview round.\n\nWould you like me to submit your 1-click application with your DigiLocker verified credential?`;
      } else if (qLower.includes("missing") || qLower.includes("gap")) {
        botResponse = `**Skill Gap Breakdown for this Role:**\n\n- **Missing Skill:** ${job.missingSkills.join(', ')}\n- **Recommended Fix:** Enrolling in the subsidized 4-week specialized course will boost your match from ${job.matchScore}% to **98%**.\n- **Government Scheme:** 100% covered under the Pramod Mahajan Kaushalya Vikas scheme.`;
      } else if (qLower.includes("prepare") || qLower.includes("interview")) {
        botResponse = `**Interview Preparation Strategy for ${job.company}:**\n\n1. **Technical Topics:** ${job.interviewPreparationTips}\n2. **Practical Questions:** Expect scenario questions on emergency safety shutdown, wiring schematics, and sensor diagnostic tools.\n3. **MahaSkill Mock Interview:** You can practice with the AI video mock interview tool before your scheduled date.`;
      } else if (qLower.includes("explain") || qLower.includes("description") || qLower.includes("jd")) {
        botResponse = `**Job Overview in Simple Terms:**\n\nIn this role at ${job.company}, you will be part of the technical team responsible for ${job.jobDescription.toLowerCase()}\n\n- **Salary:** ${job.salary}\n- **Work Location:** ${job.location}\n- **Experience required:** ${job.experience}`;
      } else {
        botResponse = `Based on your profile and ${job.company}'s requirements:\n\n${job.eligibilityAnalysis}\n\nYour ${job.matchScore}% match puts you in the top 10% of applicants across Maharashtra.`;
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse
      };

      setMessages(prev => [...prev, botMsg]);
      speakText(botResponse);
    }, 500);
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
      handleSendMessage("Am I eligible for this role?");
    }, 1800);
  };

  return (
    <div class="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Job AI Assistant">
      <div class="job-ai-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div class="modal-header" style={{ background: 'var(--navy-deep)', color: '#ffffff', borderBottom: '2px solid var(--saffron-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--saffron-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
              <Bot size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Ask AI About This Job</div>
              <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                {job.title} • {job.company} ({job.matchScore}% Match)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isSpeaking && (
              <button 
                type="button"
                onClick={stopSpeaking}
                style={{ background: 'none', border: 'none', color: 'var(--saffron-primary)', cursor: 'pointer' }}
                title="Stop audio"
              >
                <VolumeX size={18} />
              </button>
            )}
            <button 
              type="button" 
              onClick={onClose} 
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Chat History */}
        <div style={{ height: '320px', overflowY: 'auto', padding: '16px', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((m) => (
            <div key={m.id} class={`chat-bubble ${m.sender}`}>
              {m.text}
              {m.sender === 'bot' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => speakText(m.text)}
                    style={{ background: 'none', border: 'none', color: 'var(--saffron-primary)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}
                  >
                    <Volume2 size={13} /> Listen
                  </button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions Chips */}
        <div style={{ padding: '10px 16px', background: '#ffffff', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
            Quick Job Questions:
          </div>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                class="quick-chip"
                onClick={() => handleSendMessage(q.prompt)}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar with Voice */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          style={{ padding: '12px 16px', background: '#ffffff', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '8px', alignItems: 'center' }}
        >
          <button
            type="button"
            class={`voice-mic-btn ${isListening ? 'listening' : ''}`}
            style={{ width: '38px', height: '38px' }}
            onClick={handleVoiceInput}
            title="Speak into microphone"
            aria-label="Voice input"
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          <input 
            type="text"
            class="ai-chat-input"
            placeholder="Ask about salary, skills, test questions, or company..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button 
            type="submit" 
            class="ai-send-btn"
            disabled={!inputValue.trim()}
            aria-label="Send query"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
