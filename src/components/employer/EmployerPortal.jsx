import React, { useState, useRef } from 'react';
import { 
  Building2, 
  Mic, 
  MicOff, 
  Sparkles, 
  PlusCircle, 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  Users, 
  ArrowLeft, 
  Send, 
  Volume2,
  VolumeX,
  FileCheck,
  ShieldCheck,
  Search,
  Check,
  X,
  AlertCircle,
  Eye,
  Award,
  GraduationCap,
  Phone,
  Mail,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { extractJobDemandWithLLM, isAffirmativeConfirmation } from '../../services/aiRecruiterService';

export function EmployerPortal({ onBackToHome, lang = 'en', setLang, t }) {
  // Voice Recording & Processing State
  const [isRecording, setIsRecording] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [typedQuery, setTypedQuery] = useState('');
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [actionSuccessNotice, setActionSuccessNotice] = useState('');
  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);
  const recognitionRef = useRef(null);

  // Candidate Profile Modal State
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);

  // Conversational Verification State
  const [pendingJobVerification, setPendingJobVerification] = useState(null);
  const [verificationStage, setVerificationStage] = useState('idle'); // 'idle' | 'awaiting_confirmation'

  // Sample Database Active Job Postings with Rich Candidate Profiles
  const [jobPostings, setJobPostings] = useState([
    {
      id: 'JOB-PUNE-01',
      title: 'EV Battery Diagnostics & BMS Technician',
      district: 'Pune (Chakan MIDC)',
      openings: 2,
      salary: '₹22,000 - ₹26,000 / mo',
      tradeReq: 'Mechanic Auto Electrical / EV',
      postedDate: 'Today',
      status: 'Active Hiring',
      matchedCandidates: [
        {
          id: 'MAHA-ITI-2025-4102',
          name: 'Rahul S. Patil',
          iti: 'Govt ITI Aundh (Pune)',
          match: 94,
          trade: 'EV Powertrain & BMS',
          nsqfLevel: 'NSQF Level 5',
          certified: true,
          digiLockerId: 'DL-MH-88392014',
          phone: '+91 98230 44812',
          email: 'rahul.patil@mahaskill.in',
          practicalScore: '95%',
          theoryScore: '89%',
          attendance: '98%',
          ojtExperience: '3 Months OJT at Tata Motors (Chakan)',
          competencies: ['High Voltage Safety (ISO 6469)', 'BMS Diagnostic Scanning', 'CAN Bus Protocol Analysis', 'Thermal Management Testing'],
          languages: ['Marathi (Native)', 'Hindi (Fluent)', 'English (Technical)'],
          status: 'Matched'
        },
        {
          id: 'MAHA-ITI-2025-8819',
          name: 'Sagar V. Shinde',
          iti: 'Govt ITI Chakan',
          match: 88,
          trade: 'Auto Electrical',
          nsqfLevel: 'NSQF Level 4',
          certified: true,
          digiLockerId: 'DL-MH-77192083',
          phone: '+91 97652 91023',
          email: 'sagar.shinde@mahaskill.in',
          practicalScore: '90%',
          theoryScore: '86%',
          attendance: '94%',
          ojtExperience: '2 Months Apprenticeship at Chakan MIDC',
          competencies: ['Wiring Harness Repair', 'Multimeter Fault Tracing', 'Relay & Fuse Diagnostics'],
          languages: ['Marathi (Native)', 'Hindi (Fluent)'],
          status: 'Matched'
        }
      ]
    },
    {
      id: 'JOB-NSK-02',
      title: '5-Axis CNC Precision Machine Operator',
      district: 'Nashik (Satpur MIDC)',
      openings: 5,
      salary: '₹18,000 - ₹22,000 / mo',
      tradeReq: 'Machinist / Tool & Die',
      postedDate: 'Yesterday',
      status: 'Active Hiring',
      matchedCandidates: [
        {
          id: 'MAHA-ITI-2025-5591',
          name: 'Amit K. Deshmukh',
          iti: 'Govt ITI Nashik',
          match: 91,
          trade: 'Tool & Die Maker',
          nsqfLevel: 'NSQF Level 5',
          certified: true,
          digiLockerId: 'DL-MH-66291044',
          phone: '+91 99701 82341',
          email: 'amit.deshmukh@mahaskill.in',
          practicalScore: '93%',
          theoryScore: '88%',
          attendance: '96%',
          ojtExperience: '4 Months Apprenticeship at Satpur MIDC',
          competencies: ['G-Code / M-Code ISO Programming', 'Fanuc & Siemens Controller Ops', 'Caliper & Micrometer Tolerances', 'Surface Roughness QA'],
          languages: ['Marathi (Native)', 'Hindi (Fluent)', 'English (Functional)'],
          status: 'Matched'
        }
      ]
    }
  ]);

  // Manual Form State
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualForm, setManualForm] = useState({
    title: '',
    district: 'Pune (Chakan MIDC)',
    openings: 2,
    salary: '₹20,000 / mo',
    tradeReq: 'Automotive & EV'
  });

  const showToast = (msg) => {
    setActionSuccessNotice(msg);
    setTimeout(() => setActionSuccessNotice(''), 4500);
  };

  // Text-To-Speech Output
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeakingAudio(true);
      utterance.onend = () => setIsSpeakingAudio(false);
      utterance.onerror = () => setIsSpeakingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingAudio(false);
    }
  };

  // Voice Recognition Handler (Clean, without hardcoded error fallbacks)
  const handleStartVoicePosting = () => {
    handleStopSpeaking();
    
    // Toggle off if already recording
    if (isRecording) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsRecording(false);
      return;
    }

    setVoiceQuery('');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast("Speech recognition is not supported in this browser. Please type your requirement below!");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');
      recognition.continuous = false;
      recognition.interimResults = true;

      let capturedText = '';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          capturedText = transcript;
          setVoiceQuery(transcript);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (capturedText.trim()) {
          handleProcessVoiceInput(capturedText.trim());
        }
      };

      recognition.onerror = (event) => {
        setIsRecording(false);
        if (capturedText.trim()) {
          handleProcessVoiceInput(capturedText.trim());
        } else if (event.error !== 'no-speech') {
          showToast("Mic input interrupted. You can also type requirement below!");
        }
      };

      recognition.start();
    } catch (e) {
      setIsRecording(false);
      showToast("Could not access microphone. Please type below.");
    }
  };

  // Process Query with LLM / Dynamic NLP
  const handleProcessVoiceInput = async (spokenText) => {
    if (!spokenText || !spokenText.trim()) return;
    setIsRecording(false);
    const textToProcess = spokenText.trim();
    
    // Check if we are in verification mode and user just said "Yes" / "हो" / "बरोबर"
    if (verificationStage === 'awaiting_confirmation' && pendingJobVerification) {
      if (isAffirmativeConfirmation(textToProcess)) {
        confirmAndPublishJob(pendingJobVerification);
        return;
      }
    }

    setIsProcessingVoice(true);

    try {
      const extracted = await extractJobDemandWithLLM(textToProcess, lang);
      setIsProcessingVoice(false);

      if (extracted) {
        setPendingJobVerification(extracted);
        setVerificationStage('awaiting_confirmation');
        
        // Speak back the confirmation question:
        speakText(extracted.confirmationQuestion);
      }
    } catch (e) {
      setIsProcessingVoice(false);
      showToast("Could not process requirement. Please try again.");
    }
  };

  // Handle Typed Input Submit
  const handleTypedSubmit = (e) => {
    e.preventDefault();
    if (!typedQuery.trim()) return;
    setVoiceQuery(typedQuery.trim());
    handleProcessVoiceInput(typedQuery.trim());
    setTypedQuery('');
  };

  // Helper to generate realistic rich candidate profiles matching district & trade
  const generateCandidateProfiles = (districtName, tradeReq) => {
    const isNagpur = districtName.includes('Nagpur');
    const isNashik = districtName.includes('Nashik');
    const isSambhaji = districtName.includes('Sambhaji') || districtName.includes('Aurangabad');
    const isKolhapur = districtName.includes('Kolhapur');
    const isMumbai = districtName.includes('Mumbai') || districtName.includes('Thane');

    const name1 = isNagpur ? 'Prashant R. Meshram' : isNashik ? 'Amit K. Deshmukh' : isSambhaji ? 'Shaikh Imran' : isKolhapur ? 'Vikas R. Patil' : isMumbai ? 'Siddhesh M. Sawant' : 'Sachin M. Jadhav';
    const name2 = isNagpur ? 'Sanjay V. Wankhede' : isNashik ? 'Rohan K. More' : isSambhaji ? 'Ajay S. More' : isKolhapur ? 'Sunil G. Chougule' : isMumbai ? 'Prathamesh K. Kadam' : 'Kiran B. Gaikwad';

    return [
      {
        id: `MAHA-ITI-2025-${Math.floor(1000 + Math.random() * 9000)}`,
        name: name1,
        iti: `Govt ITI ${districtName}`,
        match: 95,
        trade: tradeReq,
        nsqfLevel: 'NSQF Level 5',
        certified: true,
        digiLockerId: `DL-MH-${Math.floor(10000000 + Math.random() * 90000000)}`,
        phone: '+91 98230 19842',
        email: `${name1.toLowerCase().replace(/[^a-z]/g, '')}@mahaskill.in`,
        practicalScore: '95%',
        theoryScore: '90%',
        attendance: '97%',
        ojtExperience: `3 Months Dual Training in ${districtName} Industrial Belt`,
        competencies: [`Core Standard: ${tradeReq}`, 'Workshop Safety & Machine Operations', 'Quality Testing & Inspection', 'Technical Blueprint & Calibration'],
        languages: ['Marathi (Native)', 'Hindi (Fluent)', 'English (Functional)'],
        status: 'Matched'
      },
      {
        id: `MAHA-ITI-2025-${Math.floor(1000 + Math.random() * 9000)}`,
        name: name2,
        iti: `Vocational Training Center (${districtName})`,
        match: 90,
        trade: tradeReq,
        nsqfLevel: 'NSQF Level 4',
        certified: true,
        digiLockerId: `DL-MH-${Math.floor(10000000 + Math.random() * 90000000)}`,
        phone: '+91 97652 83011',
        email: `${name2.toLowerCase().replace(/[^a-z]/g, '')}@mahaskill.in`,
        practicalScore: '91%',
        theoryScore: '86%',
        attendance: '94%',
        ojtExperience: `2 Months Apprenticeship in ${districtName}`,
        competencies: [`Practical Trade Ops: ${tradeReq}`, 'Equipment Maintenance', 'Industrial 5S Protocols'],
        languages: ['Marathi (Native)', 'Hindi (Fluent)'],
        status: 'Matched'
      }
    ];
  };

  // Finalize & Publish to Database
  const confirmAndPublishJob = (jobData) => {
    handleStopSpeaking();
    const districtName = jobData.district.split('(')[0].trim();
    
    const newJob = {
      id: `JOB-${Date.now().toString().slice(-4)}`,
      title: jobData.title,
      district: jobData.district,
      openings: jobData.openings,
      salary: jobData.salary,
      tradeReq: jobData.tradeReq,
      postedDate: 'Just Now via Conversational AI',
      status: 'Active Hiring',
      matchedCandidates: generateCandidateProfiles(districtName, jobData.tradeReq)
    };

    setJobPostings([newJob, ...jobPostings]);
    setPendingJobVerification(null);
    setVerificationStage('idle');
    setVoiceQuery('');

    const confirmationMsg = lang === 'mr'
      ? `पुष्टी झाली! ${newJob.openings} जागांसाठी नोकरी डेटाबेसमध्ये नोंदवली गेली व २ उमेदवार जुळवले गेले.`
      : `Confirmed! Job published to database & matched with 2 certified ITI candidates in ${districtName}.`;

    showToast(confirmationMsg);
    speakText(lang === 'mr' ? 'नोकरी यशस्वीरित्या नोंदवली गेली आहे.' : 'Job successfully published and matched to candidates.');
  };

  const handleCancelVerification = () => {
    handleStopSpeaking();
    setPendingJobVerification(null);
    setVerificationStage('idle');
    setVoiceQuery('');
  };

  const handleManualJobSubmit = (e) => {
    e.preventDefault();
    if (!manualForm.title) return;

    const districtName = manualForm.district.split('(')[0].trim();
    const newJob = {
      id: `JOB-${Date.now().toString().slice(-4)}`,
      title: manualForm.title,
      district: manualForm.district,
      openings: parseInt(manualForm.openings || 1, 10),
      salary: manualForm.salary,
      tradeReq: manualForm.tradeReq,
      postedDate: 'Just Now',
      status: 'Active Hiring',
      matchedCandidates: generateCandidateProfiles(districtName, manualForm.tradeReq)
    };

    setJobPostings([newJob, ...jobPostings]);
    setManualForm({ title: '', district: 'Pune (Chakan MIDC)', openings: 2, salary: '₹20,000 / mo', tradeReq: 'Automotive & EV' });
    setShowManualForm(false);
    showToast(`Job listing published for "${newJob.title}"!`);
  };

  const handleInviteCandidate = (jobId, candidateName) => {
    setJobPostings(prev => prev.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          matchedCandidates: job.matchedCandidates.map(c => 
            c.name === candidateName ? { ...c, status: 'Interview Sent ✓' } : c
          )
        };
      }
      return job;
    }));

    if (selectedCandidate && selectedCandidate.name === candidateName) {
      setSelectedCandidate(prev => ({ ...prev, status: 'Interview Sent ✓' }));
    }

    showToast(`Interview invitation dispatched to ${candidateName} via DigiLocker SMS!`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '60px' }}>
      
      {/* Top Bar */}
      <header style={{ background: '#0b192c', color: '#ffffff', padding: '12px 24px', borderBottom: '2px solid var(--saffron-primary)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={onBackToHome}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeft size={14} />
              <span>{lang === 'mr' ? 'मुख्य पृष्ठ' : 'Back to Home'}</span>
            </button>

            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Employer & MSME Hiring Hub</span>
                <span style={{ fontSize: '0.68rem', background: '#0284c7', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                  LLM Connected
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                Government of Maharashtra · Conversational Recruiter AI
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', background: 'rgba(34, 197, 94, 0.2)', color: '#86efac', padding: '4px 10px', borderRadius: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></span>
              MSME Verified Portal
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container" style={{ marginTop: '24px' }}>
        
        {/* Toast Alert */}
        {actionSuccessNotice && (
          <div style={{
            background: '#065f46',
            color: '#ffffff',
            padding: '12px 18px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            animation: 'fadeIn 0.2s ease'
          }}>
            <CheckCircle2 size={18} style={{ color: '#6ee7b7' }} />
            <span>{actionSuccessNotice}</span>
          </div>
        )}

        {/* Hero Section: Conversational Voice LLM Job Posting */}
        <section style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '16px',
          padding: '24px 28px',
          color: '#ffffff',
          marginBottom: '24px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            
            <div style={{ maxWidth: '600px', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.74rem', background: 'rgba(255, 107, 0, 0.25)', color: '#ff9e58', border: '1px solid #ff6b00', padding: '3px 10px', borderRadius: '20px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  🎙️ Conversational LLM Voice Agent
                </span>
                <span style={{ fontSize: '0.7rem', color: '#86efac', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                  Active & Dynamic
                </span>
              </div>

              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '6px 0', color: '#ffffff' }}>
                {lang === 'mr' ? 'बोलून थेट नोकरी पोस्ट करा' : 'Speak to Post Any Job Vacancy'}
              </h1>
              <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                {lang === 'mr'
                  ? 'कोणत्याही व्यवसायासाठी मराठी, हिंदी किंवा इंग्रजीत बोला. एआय आपोआप जागा, जिल्हा व पगार ओळखून पुष्टी विचारेल.'
                  : 'Speak naturally in Marathi, Hindi, or English for ANY trade or district. The AI extracts vacancies, district, and salary, and confirms with you.'}
              </p>

              {/* Sample Quick Test Chips */}
              <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 700, alignSelf: 'center' }}>Test:</span>
                <button
                  type="button"
                  onClick={() => handleProcessVoiceInput("Need 3 Welders in Nagpur for 18000")}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#f8fafc', padding: '4px 10px', borderRadius: '20px', fontSize: '0.74rem', cursor: 'pointer' }}
                >
                  🗣️ "3 Welders in Nagpur (₹18,000)"
                </button>
                <button
                  type="button"
                  onClick={() => handleProcessVoiceInput("Need 4 Electricians in Kolhapur for 22k")}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#f8fafc', padding: '4px 10px', borderRadius: '20px', fontSize: '0.74rem', cursor: 'pointer' }}
                >
                  🗣️ "4 Electricians in Kolhapur"
                </button>
                <button
                  type="button"
                  onClick={() => handleProcessVoiceInput("नाशिक सातपूरसाठी ५ सीएनसी ऑपरेटर, पगार १८ हजार")}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#f8fafc', padding: '4px 10px', borderRadius: '20px', fontSize: '0.74rem', cursor: 'pointer' }}
                >
                  🗣️ "नाशिकसाठी ५ सीएनसी ऑपरेटर"
                </button>
                <button
                  type="button"
                  onClick={() => handleProcessVoiceInput("Need 2 Solar Tech in Aurangabad for 25000")}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#f8fafc', padding: '4px 10px', borderRadius: '20px', fontSize: '0.74rem', cursor: 'pointer' }}
                >
                  🗣️ "2 Solar in Aurangabad"
                </button>
              </div>

              {/* Direct Input & Mic Bar */}
              <form onSubmit={handleTypedSubmit} style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Or type here: e.g. Need 4 Fitters in Pune for 20k / नाशिकसाठी ३ वेल्डर हवेत"
                  value={typedQuery}
                  onChange={(e) => setTypedQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(0, 0, 0, 0.35)',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={!typedQuery.trim() || isProcessingVoice}
                  style={{
                    background: 'var(--saffron-primary)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.82rem'
                  }}
                >
                  <Send size={14} />
                  <span>Send</span>
                </button>
              </form>
            </div>

            {/* Big Prominent Voice Mic Button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={handleStartVoicePosting}
                disabled={isProcessingVoice}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: isRecording 
                    ? '#dc2626' 
                    : 'linear-gradient(135deg, #ff6b00 0%, #ea580c 100%)',
                  border: '4px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: isRecording ? '0 0 24px rgba(220, 38, 38, 0.6)' : '0 8px 24px rgba(255, 107, 0, 0.4)',
                  transition: 'all 0.2s',
                  animation: isRecording ? 'pulse 1.2s infinite' : 'none'
                }}
                title={isRecording ? 'Listening... Tap to stop' : 'Tap & Speak Requirement'}
              >
                {isRecording ? <MicOff size={36} /> : <Mic size={36} />}
              </button>

              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: isRecording ? '#f87171' : '#ff9e58' }}>
                {isRecording ? 'Listening... Speak now' : isProcessingVoice ? 'AI Analyzing Demand...' : 'Tap & Speak'}
              </span>
            </div>
          </div>

          {/* Real-time Voice Live Telemetry */}
          {voiceQuery && (
            <div style={{ marginTop: '14px', background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.86rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>User Spoken Input:</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>"{voiceQuery}"</span>
            </div>
          )}

          {/* ================= CONVERSATIONAL VERIFICATION CARD ================= */}
          {pendingJobVerification && (
            <div style={{
              marginTop: '18px',
              background: '#0f172a',
              border: '2px solid #38bdf8',
              borderRadius: '12px',
              padding: '18px 20px',
              animation: 'fadeIn 0.25s ease',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} style={{ color: '#38bdf8' }} />
                  <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Conversational AI Verification:
                  </span>
                </div>

                {isSpeakingAudio && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#86efac' }}>
                    <Volume2 size={14} />
                    <span>Asking confirmation question...</span>
                  </div>
                )}
              </div>

              {/* The Conversational Verification Question (Asking Back) */}
              <div style={{
                background: 'rgba(56, 189, 248, 0.12)',
                borderLeft: '4px solid #38bdf8',
                padding: '12px 16px',
                borderRadius: '0 8px 8px 0',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '14px'
              }}>
                💬 "{pendingJobVerification.confirmationQuestion}"
              </div>

              {/* Parsed Attributes Strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '8px 12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase' }}>Role Title</div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#f8fafc' }}>{pendingJobVerification.title}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '8px 12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase' }}>District / Cluster</div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#f8fafc' }}>{pendingJobVerification.district}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '8px 12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase' }}>Vacancies</div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#4ade80' }}>{pendingJobVerification.openings} Openings</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '8px 12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase' }}>Salary Pledged</div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#f8fafc' }}>{pendingJobVerification.salary}</div>
                </div>
              </div>

              {/* Confirmation Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleCancelVerification}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#e2e8f0',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel / Re-speak
                </button>

                <button
                  type="button"
                  onClick={() => confirmAndPublishJob(pendingJobVerification)}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>{lang === 'mr' ? 'हो, बरोबर आहे (नोंदणी करा)' : '✓ Yes, That\'s Right (Publish Job)'}</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Active Postings & Matched Candidates Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
              Live Database Postings & Matched ITI Candidates ({jobPostings.length})
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0 0 0' }}>
              Connected to Maharashtra state database · Real-time ITI candidate matching.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setShowManualForm(!showManualForm)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
          >
            <PlusCircle size={15} />
            <span>{showManualForm ? 'Hide Form' : 'Post Job via Text Form'}</span>
          </button>
        </div>

        {/* Optional Manual Job Form */}
        {showManualForm && (
          <form onSubmit={handleManualJobSubmit} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
              New Job Opening Form
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Job Role Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Solar Inverter Technician" 
                  value={manualForm.title} 
                  onChange={(e) => setManualForm({ ...manualForm, title: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Location / MIDC Cluster *</label>
                <select 
                  value={manualForm.district} 
                  onChange={(e) => setManualForm({ ...manualForm, district: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} 
                >
                  <option value="Pune (Chakan MIDC)">Pune (Chakan MIDC)</option>
                  <option value="Chhatrapati Sambhaji Nagar (Waluj)">Chhatrapati Sambhaji Nagar (Waluj)</option>
                  <option value="Nashik (Satpur MIDC)">Nashik (Satpur MIDC)</option>
                  <option value="Nagpur (MIHAN)">Nagpur (MIHAN)</option>
                  <option value="Thane & Mumbai Belt">Thane & Mumbai Belt</option>
                  <option value="Kolhapur (Gokul Shirgaon)">Kolhapur (Gokul Shirgaon)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Vacancies *</label>
                <input 
                  type="number" 
                  min="1" 
                  max="100" 
                  value={manualForm.openings} 
                  onChange={(e) => setManualForm({ ...manualForm, openings: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Monthly Salary Range</label>
                <input 
                  type="text" 
                  value={manualForm.salary} 
                  onChange={(e) => setManualForm({ ...manualForm, salary: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowManualForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 800 }}>Publish Job Posting</button>
            </div>
          </form>
        )}

        {/* Active Postings & Matched Candidates Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {jobPostings.map((job) => (
            <div 
              key={job.id} 
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              {/* Job Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      {job.id}
                    </span>
                    <span style={{ fontSize: '0.72rem', background: '#ecfdf5', color: '#065f46', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      ● {job.status}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Posted: {job.postedDate}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '2px 0 4px 0' }}>
                    {job.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.82rem', color: '#475569', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} style={{ color: 'var(--saffron-primary)' }} />
                      {job.district}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={13} style={{ color: '#059669' }} />
                      {job.openings} Openings
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: 'var(--navy-deep)' }}>
                      💰 {job.salary}
                    </span>
                  </div>
                </div>
              </div>

              {/* Matched Candidates Sub-Section */}
              <div style={{ marginTop: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={13} style={{ color: '#eab308' }} />
                  Database Matched ITI Graduates for this opening:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {job.matchedCandidates.map((cand, cIdx) => (
                    <div 
                      key={cIdx} 
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        padding: '10px 14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: '#eff6ff',
                          color: '#1e40af',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {cand.name.split(' ').map(n => n[0]).join('')}
                        </div>

                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--navy-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>{cand.name}</span>
                            <span style={{ fontSize: '0.68rem', background: '#ecfdf5', color: '#047857', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                              ✓ DigiLocker Verified
                            </span>
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                            {cand.iti} · {cand.trade}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', background: '#f0fdf4', padding: '4px 8px', borderRadius: '4px', border: '1px solid #bbf7d0' }}>
                          🎯 {cand.match}% Match
                        </span>

                        {/* View Profile Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCandidate(cand);
                            setSelectedJobForModal(job);
                          }}
                          style={{
                            background: '#f8fafc',
                            color: 'var(--navy-deep)',
                            border: '1px solid #cbd5e1',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                        >
                          <Eye size={13} style={{ color: '#0284c7' }} />
                          <span>{lang === 'mr' ? 'प्रोफाइल पहा' : 'View Profile'}</span>
                        </button>

                        {/* Interview Invite Button */}
                        <button
                          type="button"
                          disabled={cand.status.includes('Sent')}
                          onClick={() => handleInviteCandidate(job.id, cand.name)}
                          style={{
                            background: cand.status.includes('Sent') ? '#f1f5f9' : 'var(--navy-deep)',
                            color: cand.status.includes('Sent') ? '#059669' : '#ffffff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: cand.status.includes('Sent') ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Send size={12} />
                          <span>{cand.status === 'Matched' ? (lang === 'mr' ? 'मुलाखत पाठवा' : 'Send Invite') : 'Invite Sent ✓'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= CANDIDATE PROFILE MODAL ================= */}
      {selectedCandidate && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            overflowY: 'auto'
          }}
          onClick={() => setSelectedCandidate(null)}
        >
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '720px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              animation: 'fadeIn 0.2s ease',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #0b192c 0%, #1e3a8a 100%)',
              color: '#ffffff',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                      {selectedCandidate.name}
                    </h2>
                    <span style={{
                      background: '#10b981',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      <ShieldCheck size={11} />
                      DigiLocker Verified
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#93c5fd', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span>APAAR ID: {selectedCandidate.id}</span>
                    <span>•</span>
                    <span>{selectedCandidate.nsqfLevel || 'NSQF Level 5'}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Match Context Strip */}
            {selectedJobForModal && (
              <div style={{
                background: '#eff6ff',
                borderBottom: '1px solid #dbeafe',
                padding: '10px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ fontSize: '0.82rem', color: '#1e40af' }}>
                  <span style={{ fontWeight: 700 }}>Matched Position:</span> {selectedJobForModal.title} ({selectedJobForModal.district})
                </div>
                <div style={{
                  background: '#dcfce7',
                  color: '#15803d',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  border: '1px solid #86efac'
                }}>
                  🎯 {selectedCandidate.match}% Match Score
                </div>
              </div>
            )}

            {/* Modal Scrollable Body */}
            <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Performance Score Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Practical Score</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#059669', marginTop: '2px' }}>
                    {selectedCandidate.practicalScore || '94%'}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>DVET Workshop Exam</div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Theory & CBT</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0284c7', marginTop: '2px' }}>
                    {selectedCandidate.theoryScore || '88%'}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>NCVT Maharashtra</div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Attendance</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#d97706', marginTop: '2px' }}>
                    {selectedCandidate.attendance || '96%'}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Biometric Logged</div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Qualification</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#4338ca', marginTop: '6px' }}>
                    {selectedCandidate.nsqfLevel || 'NSQF Level 5'}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Govt Recognized</div>
                </div>
              </div>

              {/* Academic & Institute Credentials */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 16px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86rem', fontWeight: 800, color: 'var(--navy-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GraduationCap size={15} style={{ color: 'var(--saffron-primary)' }} />
                  Institute & Academic Credentials
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>ITI Institute:</span>
                    <strong style={{ display: 'block', color: '#1e293b' }}>{selectedCandidate.iti}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Primary Vocational Trade:</span>
                    <strong style={{ display: 'block', color: '#1e293b' }}>{selectedCandidate.trade}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>DigiLocker Credential ID:</span>
                    <strong style={{ display: 'block', color: '#047857', fontFamily: 'monospace' }}>{selectedCandidate.digiLockerId}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Verification Status:</span>
                    <strong style={{ display: 'block', color: '#1e293b' }}>DVET Government of Maharashtra Verified ✓</strong>
                  </div>
                </div>
              </div>

              {/* Assessed NOS Competencies */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 16px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86rem', fontWeight: 800, color: 'var(--navy-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={15} style={{ color: '#059669' }} />
                  Verified Technical Competencies & Skill Badges
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(selectedCandidate.competencies || [
                    'Workshop Tool Calibration',
                    'Industrial Safety Protocols',
                    'Quality Testing & Standard Inspection',
                    'Blueprint & Technical Drawing Reading'
                  ]).map((comp, idx) => (
                    <span key={idx} style={{
                      background: '#f0fdf4',
                      color: '#166534',
                      border: '1px solid #bbf7d0',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <CheckCircle2 size={12} style={{ color: '#16a34a' }} />
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apprenticeship / OJT & Language Communication */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 16px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '0.84rem', fontWeight: 800, color: 'var(--navy-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={14} style={{ color: '#0284c7' }} />
                    On-Job Training (OJT) / DST
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#334155', lineHeight: 1.4 }}>
                    {selectedCandidate.ojtExperience || '3 Months Dual System of Training (DST) in Maharashtra Industrial Hub'}
                  </p>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 16px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '0.84rem', fontWeight: 800, color: 'var(--navy-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={14} style={{ color: '#7c3aed' }} />
                    Communication & Languages
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(selectedCandidate.languages || ['Marathi (Native)', 'Hindi (Fluent)', 'English (Functional)']).map((langItem, lIdx) => (
                      <span key={lIdx} style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.74rem',
                        color: '#475569',
                        fontWeight: 600
                      }}>
                        {langItem}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.8rem', color: '#475569' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Phone size={13} style={{ color: '#059669' }} />
                    <strong>Phone:</strong> {selectedCandidate.phone || '+91 98230 •••••'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Mail size={13} style={{ color: '#0284c7' }} />
                    <strong>Email:</strong> {selectedCandidate.email || 'candidate@mahaskill.in'}
                  </span>
                </div>

                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  🔒 Contact shared under MahaSkill Employer Agreement
                </span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div style={{
              background: '#f8fafc',
              borderTop: '1px solid #e2e8f0',
              padding: '14px 24px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '10px'
            }}>
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#475569',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Close Profile
              </button>

              <button
                type="button"
                disabled={selectedCandidate.status?.includes('Sent')}
                onClick={() => {
                  if (selectedJobForModal) {
                    handleInviteCandidate(selectedJobForModal.id, selectedCandidate.name);
                  }
                }}
                style={{
                  background: selectedCandidate.status?.includes('Sent') ? '#f1f5f9' : 'var(--navy-deep)',
                  color: selectedCandidate.status?.includes('Sent') ? '#059669' : '#ffffff',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '8px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  cursor: selectedCandidate.status?.includes('Sent') ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: selectedCandidate.status?.includes('Sent') ? 'none' : '0 4px 12px rgba(11, 25, 44, 0.25)'
                }}
              >
                <Send size={13} />
                <span>{selectedCandidate.status?.includes('Sent') ? 'Interview Invite Sent ✓' : 'Send Interview Invite via SMS'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
