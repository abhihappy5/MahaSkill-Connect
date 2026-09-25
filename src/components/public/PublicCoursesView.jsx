import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Award, ShieldCheck, ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { mahaCoursesData } from '../../data/coursesData';
import { allDistrictsList } from '../../data/districtsData';

export function PublicCoursesView({ onAskAI, lang, setLang, t }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [districtFilter, setDistrictFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('All');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const sectors = ["All", "Automotive & EV", "Precision Manufacturing", "Mechatronics & Robotics", "Renewable Energy", "IT, AI & Software", "Aerospace & Drones", "Semiconductor & Electronics"];

  const filteredCourses = mahaCoursesData.filter(c => {
    const matchesSearch = !searchQuery || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSector = sectorFilter === 'All' || c.sector === sectorFilter;
    const matchesDistrict = !districtFilter || c.district === districtFilter;
    const matchesDuration = durationFilter === 'All' || c.duration.toLowerCase().includes(durationFilter.toLowerCase());

    return matchesSearch && matchesSector && matchesDistrict && matchesDuration;
  });

  const handleEnrollCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
      alert("Application submitted! Your district ITI / training node will review your DigiLocker documents within 24 hours.");
    }
  };

  return (
    <div className="container-wide" style={{ padding: '32px 16px' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--navy-deep) 0%, #1e293b 100%)', color: '#ffffff', padding: '36px 32px', borderRadius: 'var(--radius-xl)', marginBottom: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--saffron-primary)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '8px' }}>
          <ShieldCheck size={18} />
          <span>Government of Maharashtra • Directorate of Vocational Education & Training (DVET)</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 8px 0', color: '#ffffff' }}>
          3,420+ State-Accredited Courses & ITI Trades
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#cbd5e1', maxWidth: '720px', margin: '0 0 20px 0', lineHeight: 1.5 }}>
          Subsidized industrial training programs, PMKVY 4.0 certifications, and NSQF-aligned diplomas across all 36 districts with Direct Benefit Transfer (DBT) monthly stipends.
        </p>

        {/* Search Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '10px', background: '#ffffff', padding: '8px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px' }}>
            <Search size={18} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search course title, skill (e.g. EV Battery, CNC, Robotics)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: 'var(--navy-deep)' }}
            />
          </div>

          <select 
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '8px', fontSize: '0.85rem', color: 'var(--navy-deep)' }}
          >
            <option value="">All 36 Districts</option>
            {allDistrictsList.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '8px', fontSize: '0.85rem', color: 'var(--navy-deep)' }}
          >
            <option value="All">All Durations</option>
            <option value="2 Months">Fast-Track (2-3 Months)</option>
            <option value="6 Months">6 Months</option>
            <option value="1 Year">1 Year Diploma</option>
          </select>

          <button 
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onAskAI("Which course has highest placement in Maharashtra?")}
          >
            <Sparkles size={15} /> Ask AI
          </button>
        </div>
      </div>

      {/* Sector Category Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px', scrollbarWidth: 'none' }}>
        {sectors.map(sec => (
          <button
            key={sec}
            type="button"
            onClick={() => setSectorFilter(sec)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid',
              borderColor: sectorFilter === sec ? 'var(--saffron-primary)' : 'var(--border-subtle)',
              background: sectorFilter === sec ? 'var(--navy-deep)' : '#ffffff',
              color: sectorFilter === sec ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
        {filteredCourses.map(course => {
          const isEnrolled = enrolledCourses.includes(course.id);
          return (
            <div 
              key={course.id}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.74rem', background: '#ecfdf5', color: 'var(--success-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    {course.fee}
                  </span>
                  <span style={{ fontSize: '0.74rem', background: 'var(--navy-subtle)', color: 'var(--navy-deep)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    {course.nsqfLevel}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-deep)', margin: '0 0 6px 0', lineHeight: 1.35 }}>
                  {course.title}
                </h3>

                <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  🏛️ {course.provider}
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '14px' }}>
                  {course.description}
                </p>

                <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Stipend (DBT):</span>
                    <span style={{ color: 'var(--success-dark)', fontWeight: 800 }}>{course.stipend}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Duration & District:</span>
                    <span style={{ color: 'var(--navy-deep)', fontWeight: 700 }}>{course.duration} • {course.district}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Placement Track:</span>
                    <span style={{ color: 'var(--navy-deep)', fontWeight: 800 }}>{course.placementRate}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {course.skills.map((sk, idx) => (
                    <span key={idx} style={{ background: 'var(--navy-subtle)', color: 'var(--navy-deep)', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.76rem', color: '#dc2626', fontWeight: 700 }}>
                  🔥 {course.seatsAvailable} Seats Left
                </span>

                <button
                  type="button"
                  onClick={() => handleEnrollCourse(course.id)}
                  className={`btn btn-sm ${isEnrolled ? 'btn-success' : 'btn-primary'}`}
                  disabled={isEnrolled}
                >
                  {isEnrolled ? '✓ Enrolled' : 'Apply with DigiLocker'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
