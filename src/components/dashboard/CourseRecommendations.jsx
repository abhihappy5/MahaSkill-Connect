import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Clock, 
  Award, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { recommendedGapCourses } from '../../data/jobSeekerData';
import confetti from 'canvas-confetti';

export function CourseRecommendations({ onEnrollCourse }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleEnroll = (course) => {
    if (enrolledCourses.includes(course.id)) return;
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.8 }
    });
    setEnrolledCourses(prev => [...prev, course.id]);
    if (onEnrollCourse) onEnrollCourse(course);
  };

  return (
    <div style={{ marginBottom: '40px' }} id="section-courses" role="region" aria-label="Course Recommendations">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span class="section-tag">
            <GraduationCap size={14} />
            Direct Job Eligibility Enhancers
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
            Course recommendations to close your gaps
          </h2>
        </div>

        <span class="badge badge-navy" style={{ fontSize: '0.85rem' }}>
          3 Targeted Upskilling Batches
        </span>
      </div>

      {/* Courses Cards Grid */}
      <div class="courses-gap-grid">
        {recommendedGapCourses.map((course) => {
          const isEnrolled = enrolledCourses.includes(course.id);

          return (
            <div key={course.id} class="gap-course-card">
              <div>
                {/* Eligibility Boost Badge */}
                <div class="boost-badge">
                  <TrendingUp size={13} />
                  {course.eligibilityBoost}
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '8px', lineHeight: 1.3 }}>
                  {course.title}
                </h3>

                <div style={{ fontSize: '0.85rem', color: 'var(--navy-accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '12px' }}>
                  <Building2 size={14} />
                  {course.provider}
                </div>

                {/* Duration & Subsidy Details */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.82rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                    <Clock size={13} style={{ color: 'var(--saffron-primary)' }} />
                    Duration: <strong>{course.duration}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success-dark)', fontWeight: 600 }}>
                    <Award size={13} style={{ color: 'var(--success-green)' }} />
                    {course.subsidy}
                  </div>
                </div>

                {/* Skills Taught */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Skills Covered:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {course.skillsTaught.map((sk, idx) => (
                      <span key={idx} class="badge badge-navy" style={{ fontSize: '0.72rem' }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  class={`btn btn-sm ${isEnrolled ? 'btn-success' : 'btn-primary'}`}
                  style={{ width: '100%' }}
                  onClick={() => handleEnroll(course)}
                  disabled={isEnrolled}
                >
                  {isEnrolled ? (
                    <>
                      <CheckCircle2 size={15} />
                      Enrolled (Batch Confirmed)
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      Enroll via MahaSkill (Free)
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
