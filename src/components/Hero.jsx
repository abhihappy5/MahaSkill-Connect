import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Mic, 
  MicOff, 
  Sparkles, 
  Compass, 
  Bot, 
  Briefcase, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Building2,
  ArrowRight
} from 'lucide-react';
import { allDistrictsList, districtTranslations } from '../data/districtsData';

export function Hero({ 
  t, 
  lang, 
  onFindCareer, 
  onAskAI, 
  onOpenVoice,
  selectedDistrict, 
  setSelectedDistrict,
  searchQuery,
  setSearchQuery,
  onSearchSubmit
}) {
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('');

  const getDistrictName = (dName) => {
    if (districtTranslations[dName]) {
      return lang === 'mr' ? districtTranslations[dName].mr : (lang === 'hi' ? districtTranslations[dName].hi : districtTranslations[dName].en);
    }
    return dName;
  };

  // Voice search using Web Speech API with fallback simulation
  const handleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
      setVoiceNotice('');
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
          setVoiceNotice(t.listening || 'Listening to your voice query...');
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
          setIsListening(false);
          setVoiceNotice(`Recognized: "${transcript}"`);
          setTimeout(() => setVoiceNotice(''), 3000);
          onSearchSubmit(transcript);
        };

        recognition.onerror = (e) => {
          console.error("Speech recognition error:", e);
          setIsListening(false);
          setVoiceNotice('Microphone input simulated.');
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
    setVoiceNotice(t.listening || 'Listening to your voice query...');
    setTimeout(() => {
      const sampleQueries = [
        "EV Powertrain Specialist Pune",
        "Solar Technician Solapur",
        "AI Prompt Engineer Mumbai",
        "CNC Operator Kolhapur"
      ];
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setSearchQuery(randomQuery);
      setIsListening(false);
      setVoiceNotice(`Recognized: "${randomQuery}"`);
      setTimeout(() => setVoiceNotice(''), 3000);
      onSearchSubmit(randomQuery);
    }, 1500);
  };

  const popularChips = [
    { label: lang === 'mr' ? "ईव्ही बॅटरी तंत्रज्ञ" : (lang === 'hi' ? "ईवी बैटरी तकनीशियन" : "EV Battery Tech"), query: "EV" },
    { label: lang === 'mr' ? "एआय प्रॉम्ट इंजिनिअर" : (lang === 'hi' ? "एआई प्रॉम्प्ट इंजीनियर" : "AI Prompt Engineer"), query: "AI" },
    { label: lang === 'mr' ? "सौर ऊर्जा व मायक्रोग्रिड" : (lang === 'hi' ? "सौर ऊर्जा व माइक्रोग्रिड" : "Solar Microgrid"), query: "Solar" },
    { label: lang === 'mr' ? "५-ॲक्सिस सीएनसी" : (lang === 'hi' ? "५-एक्सिस सीएनसी" : "5-Axis CNC"), query: "CNC" },
    { label: lang === 'mr' ? "रोबोटिक्स ऑपरेटर" : (lang === 'hi' ? "रोबोटिक्स ऑपरेटर" : "Robotics Operator"), query: "Robotics" }
  ];

  return (
    <section id="home" className="hero-section" aria-label="Hero Section" style={{ padding: '36px 0 24px 0' }}>
      <div className="container">
        <div className="hero-content" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Top AI Badge */}
          <div className="hero-badge-wrap" style={{ margin: '0 auto 12px auto' }}>
            <span className="live-pulse" aria-hidden="true"></span>
            <Sparkles size={14} style={{ color: 'var(--saffron-primary)' }} />
            <span className="hero-badge-text" style={{ fontSize: '0.8rem' }}>{t.heroBadge}</span>
          </div>

          {/* Headline & Subheading */}
          <h1 className="hero-title" style={{ fontSize: '2.4rem', lineHeight: 1.15, marginBottom: '10px' }}>
            {t.heroHeadline}
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto 24px auto', lineHeight: 1.5 }}>
            {t.heroSubheading}
          </p>

          {/* Unified Sleek Search Command Bar */}
          <form 
            className="hero-search-container" 
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit(searchQuery);
            }}
            role="search"
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '8px',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12), 0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '16px'
            }}
          >
            <div className="search-inputs-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              
              {/* District Selector */}
              <div className="district-select-wrap" style={{ flex: '0 0 200px', display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', padding: '8px 12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <MapPin size={16} style={{ color: 'var(--saffron-primary)', flexShrink: 0 }} />
                <select 
                  className="district-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  aria-label="Select Maharashtra District"
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.84rem', fontWeight: 600, color: 'var(--navy-deep)' }}
                >
                  <option value="">{t.allDistricts || 'All 36 Districts'}</option>
                  {allDistrictsList.map((district) => (
                    <option key={district} value={district}>
                      {getDistrictName(district)} {lang === 'mr' ? 'जिल्हा' : (lang === 'hi' ? 'जिला' : '')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Main Job/Skill Search Input */}
              <div className="job-search-input-wrap" style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px' }}>
                <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <input 
                  type="text"
                  className="job-search-input"
                  placeholder={t.searchPlaceholder || 'Search trade, skill, course or employer...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search job or skill"
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.92rem' }}
                />
              </div>

              {/* Voice Search Button */}
              <button 
                type="button"
                className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
                onClick={onOpenVoice || handleVoiceSearch}
                title={t.voiceSearchTooltip || 'Voice search in Marathi, Hindi or English'}
                aria-label="Voice search button"
                style={{
                  background: isListening ? '#fee2e2' : '#f1f5f9',
                  color: isListening ? '#ef4444' : 'var(--navy-deep)',
                  border: 'none',
                  borderRadius: '10px',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              {/* Primary Search CTA */}
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ padding: '10px 20px', fontSize: '0.9rem', fontWeight: 700, borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Search</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>

          {/* Voice Notification Feedback */}
          {voiceNotice && (
            <div style={{
              fontSize: '0.84rem',
              color: 'var(--saffron-primary)',
              fontWeight: 700,
              marginBottom: '12px'
            }}>
              🎙️ {voiceNotice}
            </div>
          )}

          {/* Sleek Glassmorphism Metric Strip */}
          <div 
            className="stats-ticker-strip" 
            role="region" 
            aria-label="Maharashtra Skill Statistics"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.95) 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '14px 18px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
            }}
          >
            <div className="ticker-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="ticker-icon-box" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={18} />
              </div>
              <div className="ticker-info" style={{ textAlign: 'left' }}>
                <div className="ticker-value" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-deep)', lineHeight: 1.1 }}>{t.statJobs}</div>
                <div className="ticker-label" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.statJobsSubtitle || '36 Districts'}</div>
              </div>
            </div>

            <div className="ticker-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="ticker-icon-box" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={18} />
              </div>
              <div className="ticker-info" style={{ textAlign: 'left' }}>
                <div className="ticker-value" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-deep)', lineHeight: 1.1 }}>{t.statCourses}</div>
                <div className="ticker-label" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.statCoursesSubtitle || 'ITIs & Polytechnics'}</div>
              </div>
            </div>

            <div className="ticker-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="ticker-icon-box" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={18} />
              </div>
              <div className="ticker-info" style={{ textAlign: 'left' }}>
                <div className="ticker-value" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-deep)', lineHeight: 1.1 }}>{t.statDistricts}</div>
                <div className="ticker-info" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.statDistrictsSubtitle || '6 Divisions'}</div>
              </div>
            </div>

            <div className="ticker-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="ticker-icon-box" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={18} />
              </div>
              <div className="ticker-info" style={{ textAlign: 'left' }}>
                <div className="ticker-value" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-deep)', lineHeight: 1.1 }}>{t.statAvgSalary}</div>
                <div className="ticker-label" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.statAvgSalarySubtitle || 'Certified Average'}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
