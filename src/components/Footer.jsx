import React from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink, 
  ShieldCheck, 
  Globe, 
  Heart,
  Clock
} from 'lucide-react';

export function Footer({ t, lang }) {
  return (
    <footer class="main-footer" role="contentinfo" aria-label="Official Maharashtra Government Footer">
      <div class="container">
        <div class="footer-grid">
          {/* Col 1: Government & Department Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4))'
              }}>
                <img 
                  src="/maharashtra_seal.svg" 
                  alt="Government of Maharashtra Official Seal" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#ffffff' }}>MahaSkill Connect</div>
                <div style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>Government of Maharashtra</div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px' }}>
              {t.footerDept}
              <br />
              {t.footerMSSDS}
            </p>

            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <MapPin size={16} style={{ color: 'var(--saffron-primary)', flexShrink: 0, marginTop: '2px' }} />
              <span>
                3rd Floor, Annex Building, Mantralaya, Madam Cama Road, Nariman Point, Mumbai - 400032
              </span>
            </div>
          </div>

          {/* Col 2: Important Portals */}
          <div>
            <h4 class="footer-col-title">
              <Globe size={16} style={{ color: 'var(--saffron-primary)' }} />
              {t.importantLinks}
            </h4>
            <ul class="footer-links-list">
              <li class="footer-link-item">
                <a href="https://mahaswayam.gov.in" target="_blank" rel="noopener noreferrer">
                  MahaSwayam Portal <ExternalLink size={12} />
                </a>
              </li>
              <li class="footer-link-item">
                <a href="https://mahadbt.maharashtra.gov.in" target="_blank" rel="noopener noreferrer">
                  MahaDBT Direct Benefit <ExternalLink size={12} />
                </a>
              </li>
              <li class="footer-link-item">
                <a href="https://www.apprenticeshipindia.gov.in" target="_blank" rel="noopener noreferrer">
                  NAPS Apprenticeship Portal <ExternalLink size={12} />
                </a>
              </li>
              <li class="footer-link-item">
                <a href="https://dvet.gov.in" target="_blank" rel="noopener noreferrer">
                  DVET Maharashtra (ITIs) <ExternalLink size={12} />
                </a>
              </li>
              <li class="footer-link-item">
                <a href="https://msde.gov.in" target="_blank" rel="noopener noreferrer">
                  Ministry of Skill Development <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Initiatives */}
          <div>
            <h4 class="footer-col-title">
              <ShieldCheck size={16} style={{ color: 'var(--saffron-primary)' }} />
              {t.schemesInitiatives}
            </h4>
            <ul class="footer-links-list">
              <li class="footer-link-item">
                <a href="#schemes">Pramod Mahajan Kaushalya Yojana</a>
              </li>
              <li class="footer-link-item">
                <a href="#schemes">Mukhyamantri Kaushalya Vikas</a>
              </li>
              <li class="footer-link-item">
                <a href="#schemes">Surya Mitra Green Skill Scheme</a>
              </li>
              <li class="footer-link-item">
                <a href="#schemes">MahaSkill Women Returnship</a>
              </li>
              <li class="footer-link-item">
                <a href="#schemes">AURIC & MIHAN Industry CoE</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Toll-Free Helpline & Support */}
          <div>
            <h4 class="footer-col-title">
              <Phone size={16} style={{ color: 'var(--saffron-primary)' }} />
              {t.helpline}
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
              Statewide Citizen & Student Assistance
            </p>

            <div class="helpline-card">
              <div style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> {t.helplineNumber.split('(')[1]?.replace(')', '') || '9 AM - 6 PM'}
              </div>
              <div class="helpline-number">1800-120-8040</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Toll-Free Across Maharashtra</div>
            </div>

            <div style={{ marginTop: '12px', fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} style={{ color: 'var(--saffron-primary)' }} />
              <span>helpdesk@mahaskill.gov.in</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Disclaimer & Policies */}
        <div class="footer-bottom-bar">
          <div>
            {t.copyright} | {t.disclaimer}
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t.privacy}</a>
            <span>•</span>
            <a href="#terms" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t.terms}</a>
            <span>•</span>
            <a href="#accessibility" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t.accessibility}</a>
            <span>•</span>
            <a href="#grievance" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t.grievance}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
