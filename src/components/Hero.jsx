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
  Building2 
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
          setVoiceNotice(t.listening);
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
    setVoiceNotice(t.listening);
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
    }, 2000);
  };

  const popularChips = [
    { label: lang === 'mr' ? "ईव्ही बॅटरी तंत्रज्ञ" : (lang === 'hi' ? "ईवी बैटरी तकनीशियन" : "EV Battery Tech"), query: "EV" },
    { label: lang === 'mr' ? "एआय प्रॉम्ट इंजिनिअर" : (lang === 'hi' ? "एआई प्रॉम्प्ट इंजीनियर" : "AI Prompt Engineer"), query: "AI" },
    { label: lang === 'mr' ? "सौर ऊर्जा व मायक्रोग्रिड" : (lang === 'hi' ? "सौर ऊर्जा व माइक्रोग्रिड" : "Solar Microgrid"), query: "Solar" },
    { label: lang === 'mr' ? "५-ॲक्सिस सीएनसी" : (lang === 'hi' ? "५-एक्सिस सीएनसी" : "5-Axis CNC"), query: "CNC" },
    { label: lang === 'mr' ? "रोबोटिक्स ऑपरेटर" : (lang === 'hi' ? "रोबोटिक्स ऑपरेटर" : "Robotics Operator"), query: "Robotics" }
  ];

  return (
    <section id="home" class="hero-section" aria-label="Hero Section">
      <div class="container">
        <div class="hero-content">
          {/* AI Badge */}
          <div class="hero-badge-wrap">
            <span class="live-pulse" aria-hidden="true"></span>
            <Sparkles size={16} style={{ color: 'var(--saffron-primary)' }} />
            <span class="hero-badge-text">{t.heroBadge}</span>
          </div>

          {/* Headline & Subheading */}
          <h1 class="hero-title">
            {t.heroHeadline}
          </h1>
          <p class="hero-subtitle">
            {t.heroSubheading}
          </p>

          {/* Search Box */}
          <form 
            class="hero-search-container" 
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit(searchQuery);
            }}
            role="search"
          >
            <div class="search-inputs-row">
              {/* District Selector */}
              <div class="district-select-wrap">
                <MapPin size={18} style={{ color: 'var(--saffron-primary)', flexShrink: 0 }} />
                <select 
                  class="district-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  aria-label="Select Maharashtra District"
                >
                  <option value="">{t.allDistricts}</option>
                  {allDistrictsList.map((district) => (
                    <option key={district} value={district}>
                      {getDistrictName(district)} {lang === 'mr' ? 'जिल्हा' : (lang === 'hi' ? 'जिला' : 'District')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Main Job/Skill Search Input */}
              <div class="job-search-input-wrap">
                <Search size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <input 
                  type="text"
                  class="job-search-input"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search job or skill"
                />
              </div>

              {/* Voice Search Button */}
              <button 
                type="button"
                className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
                onClick={onOpenVoice || handleVoiceSearch}
                title={t.voiceSearchTooltip}
                aria-label="Voice search button"
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            </div>

            {/* Action Buttons Row */}
            <div class="hero-action-buttons">
              <button 
                type="button" 
                class="btn btn-primary btn-lg" 
                onClick={onFindCareer}
              >
                <Compass size={18} />
                {t.findMyCareer}
              </button>
              <button 
                type="button" 
                class="btn btn-navy btn-lg" 
                onClick={onAskAI}
              >
                <Bot size={18} style={{ color: 'var(--saffron-primary)' }} />
                {t.askMahaSkillAI}
              </button>
            </div>
          </form>

          {/* Voice Notification Feedback */}
          {voiceNotice && (
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--saffron-primary)',
              fontWeight: 600,
              marginBottom: '10px'
            }}>
              {voiceNotice}
            </div>
          )}

          {/* Popular Search Tags */}
          <div class="search-tags-row">
            <span>{t.popularSearches}</span>
            {popularChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                class="search-tag-chip"
                onClick={() => {
                  setSearchQuery(chip.query);
                  onSearchSubmit(chip.query);
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Stats Ticker Strip */}
          <div class="stats-ticker-strip" role="region" aria-label="Maharashtra Skill Statistics">
            <div class="ticker-item">
              <div class="ticker-icon-box">
                <Briefcase size={20} />
              </div>
              <div class="ticker-info">
                <span class="ticker-value">{t.statJobs}</span>
                <span class="ticker-label">{t.statJobsSubtitle || 'Across 36 Districts'}</span>
              </div>
            </div>

            <div class="ticker-item">
              <div class="ticker-icon-box" style={{ background: '#ecfdf5', color: 'var(--success-green)' }}>
                <GraduationCap size={20} />
              </div>
              <div class="ticker-info">
                <span class="ticker-value">{t.statCourses}</span>
                <span class="ticker-label">{t.statCoursesSubtitle || 'ITIs & Polytechnics'}</span>
              </div>
            </div>

            <div class="ticker-item">
              <div class="ticker-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <Building2 size={20} />
              </div>
              <div class="ticker-info">
                <span class="ticker-value">{t.statDistricts}</span>
                <span class="ticker-label">{t.statDistrictsSubtitle || 'Statewide Coverage'}</span>
              </div>
            </div>

            <div class="ticker-item">
              <div class="ticker-icon-box" style={{ background: '#fef3c7', color: 'var(--gov-gold)' }}>
                <Award size={20} />
              </div>
              <div class="ticker-info">
                <span class="ticker-value">{t.statAvgSalary}</span>
                <span class="ticker-label">{t.statAvgSalarySubtitle || 'Certified Graduates'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
