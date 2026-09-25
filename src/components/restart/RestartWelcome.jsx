import React from 'react';
import { 
  Sparkles, 
  Bot, 
  RotateCcw, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { mockRestartProfile } from '../../data/careerRestartData';

export function RestartWelcome({ 
  onStartAssessment, 
  onTalkToAI, 
  onStartRestartPlan,
  lang 
}) {
  const profile = mockRestartProfile;
  const name = lang === 'mr' ? profile.nameMr : (lang === 'hi' ? profile.nameHi : profile.name);

  return (
    <div className="restart-welcome-card" id="section-restart-home" role="region" aria-label="Career Restart Welcome">
      {/* Supportive Dignified Badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', color: '#047857', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: 700, border: '1px solid #a7f3d0', marginBottom: '14px' }}>
        <UserCheck size={14} />
        {lang === 'mr' ? 'महाराष्ट्र पुनर्कौशल्य व महिला री-एन्ट्री उपक्रम' : 'Maharashtra Reskilling & Women Returnship Initiative'}
      </div>

      {/* Main Headline & Subheading */}
      <h1 className="restart-welcome-title">
        {lang === 'mr' ? 'चला, तुमचे करिअर पुन्हा सुरू करूया.' : (lang === 'hi' ? 'आइए आपका करियर दोबारा शुरू करें।' : "Let's restart your career.")}
      </h1>

      <p className="restart-welcome-sub">
        {lang === 'mr' 
          ? 'तुमचा भूतकाळातील अनुभव आणि उद्दिष्टे आम्हाला सांगा. महास्किल कनेक्ट तुम्हाला रोजगाराकडे नेणारा प्रत्यक्ष व सन्मानजनक मार्ग तयार करेल.'
          : (lang === 'hi'
            ? 'हमें अपने अनुभव और लक्ष्यों के बारे में बताएं। महास्किल कनेक्ट आपको रोजगार की ओर ले जाने वाला व्यावहारिक मार्ग बनाएगा।'
            : 'Tell us about your experience and goals. MahaSkill Connect will create a practical pathway back to employment.')}
      </p>

      {/* Profile Summary Box */}
      <div className="restart-profile-summary-box">
        <div className="restart-profile-item">
          <span className="restart-profile-lbl">{lang === 'mr' ? 'मागील कामाचा अनुभव' : (lang === 'hi' ? 'पिछला अनुभव' : 'Previous Experience')}</span>
          <span className="restart-profile-val">{profile.previousRole}</span>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{profile.currentSituation}</span>
        </div>

        <div className="restart-profile-item">
          <span className="restart-profile-lbl">{lang === 'mr' ? 'शिक्षण' : (lang === 'hi' ? 'शिक्षा' : 'Education')}</span>
          <span className="restart-profile-val">{profile.education}</span>
        </div>

        <div className="restart-profile-item">
          <span className="restart-profile-lbl">{lang === 'mr' ? 'उपलब्ध कौशल्ये' : (lang === 'hi' ? 'मौजूदा कौशल' : 'Existing Skills')}</span>
          <span className="restart-profile-val">{profile.existingSkills.slice(0, 3).join(', ')}...</span>
        </div>

        <div className="restart-profile-item">
          <span className="restart-profile-lbl">{lang === 'mr' ? 'पसंतीचे ठिकाण' : (lang === 'hi' ? 'पसंदीदा स्थान' : 'Preferred Location')}</span>
          <span className="restart-profile-val">{profile.preferredLocation}</span>
        </div>

        <div className="restart-profile-item">
          <span className="restart-profile-lbl">{lang === 'mr' ? 'पसंतीचा उद्योग' : (lang === 'hi' ? 'पसंदीदा उद्योग' : 'Preferred Industry')}</span>
          <span className="restart-profile-val">{profile.preferredIndustry}</span>
        </div>

        <div className="restart-profile-item">
          <span className="restart-profile-lbl">{lang === 'mr' ? 'करिअर ध्येय' : (lang === 'hi' ? 'करियर लक्ष्य' : 'Career Goal')}</span>
          <span className="restart-profile-val" style={{ color: 'var(--success-dark)' }}>{profile.careerGoal}</span>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button 
          type="button" 
          className="btn btn-success btn-lg" 
          onClick={onStartAssessment}
        >
          <Sparkles size={18} />
          {lang === 'mr' ? 'करिअर रीस्टार्ट मूल्यांकन सुरू करा' : (lang === 'hi' ? 'मूल्यांकन शुरू करें' : 'Start Career Restart Assessment')}
        </button>

        <button 
          type="button" 
          className="btn btn-primary btn-lg" 
          onClick={onStartRestartPlan}
        >
          <RotateCcw size={18} />
          {lang === 'mr' ? 'माझी पुनर्कौशल्य योजना पहा' : (lang === 'hi' ? 'मेरी योजना शुरू करें' : 'Start My Career Restart Plan')}
        </button>

        <button 
          type="button" 
          className="btn btn-outline btn-lg" 
          onClick={onTalkToAI}
        >
          <Bot size={18} style={{ color: 'var(--saffron-primary)' }} />
          {lang === 'mr' ? 'एआय करिअर मार्गदर्शकाशी बोला' : (lang === 'hi' ? 'एआई कोच से बात करें' : 'Talk to AI Coach')}
        </button>
      </div>
    </div>
  );
}
