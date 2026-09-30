import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import SpatialGlassCard from '../ui/SpatialGlassCard';
import SectionAsterisk from '../ui/SectionAsterisk';
import ItalicFlipWord from '../ui/ItalicFlipWord';

const EXPERIENCES = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Daleyork',
    period: 'Sep 2026 – Present',
    location: 'Remote',
    type: 'Current Role',
    active: true,
    bullets: [
      'Shipping full-stack features, frontend to backend, across 6+ live client products spanning AI, e-commerce, manufacturing, and ed-tech.',
      'Owning backend data models, APIs, and third-party integrations end-to-end; deploying features directly to production via Firebase and Hostinger.',
      'Collaborating directly with cross-functional stakeholders on feature scoping, UI performance optimization, and architectural decisions.',
    ],
    tags: ['Full Stack', 'Client Products', 'APIs', 'Firebase', 'Hostinger'],
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Code Resite',
    period: 'Jul 2025 – Aug 2025',
    location: 'Remote',
    type: 'Internship',
    active: false,
    bullets: [
      'Architected and deployed full-stack applications using the MERN stack; explored modern backend patterns through applied workshops.',
      'Implemented defensive Express middleware layers for authentication, input sanitization, and structured error propagation.',
    ],
    tags: ['MERN Stack', 'RESTful APIs', 'MongoDB', 'Vercel'],
  },
  {
    role: 'Content Writing Intern',
    company: 'InAmigos Foundation',
    period: 'Jul 2025',
    location: 'Remote',
    type: 'Internship',
    active: false,
    bullets: [
      'Authored outreach documentation and structured publications for non-profit community initiatives.',
      'Strengthened technical storytelling, developer advocacy, and cross-functional communication.',
    ],
    tags: ['Technical Writing', 'Communication'],
  },
  {
    role: 'Core Java & OOP Training',
    company: 'Growth Ninja',
    period: 'Jun 2024 – Aug 2024',
    location: 'Delhi, India',
    type: 'Professional Training',
    active: false,
    bullets: [
      'Completed rigorous training in object-oriented programming: encapsulation, polymorphism, inheritance, and abstraction in Core Java.',
      'Built a foundational software project demonstrating clean object-oriented architecture and algorithmic data structures.',
    ],
    tags: ['Java', 'OOP', 'Data Structures'],
  },
];

const COLLEGE_EDUCATION = {
  degree: 'B.Tech in Computer Science',
  specialization: 'Artificial Intelligence & Machine Learning',
  institution: 'United Institute of Technology, Prayagraj',
  period: '2023 – 2027',
  status: 'Currently in Final Year (4th Year) · Active',
  cgpa: '7.50 / 10',
  yearMilestones: [
    { year: '1st Year', label: 'Completed', active: true },
    { year: '2nd Year', label: 'Completed', active: true },
    { year: '3rd Year', label: 'Completed', active: true },
    { year: '4th Year', label: 'Final Year', active: true, highlight: true },
  ],
  keySubjects: [
    'Machine Learning',
    'Data Structures & Algorithms',
    'Python Programming',
    'Database Systems (DBMS)',
    'Web Development',
    'Computer Networks',
  ],
};

const SCHOOL_EDUCATION = [
  {
    level: '12th Grade (Senior Secondary)',
    school: 'Tagore Public School, Prayagraj',
    board: 'CBSE Board',
    period: '2020 – 2023',
    score: 'Score: 70%',
    stream: 'Physics, Chemistry & Maths (PCM)',
    badge: 'Senior Secondary',
  },
  {
    level: '10th Grade (High School)',
    school: 'Tagore Public School, Prayagraj',
    board: 'CBSE Board',
    period: '2020 – 2023',
    score: 'Score: 92%',
    stream: 'Distinction in Science & Maths',
    badge: 'High Distinction',
  },
];

export default function ExperienceTimeline({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  // Master Theme Palette Contract:
  // Headings & Primary Titles (Obsidian Plum in Light Mode, White in Dark Mode):
  const textColorPrimary = isDark ? '#ffffff' : '#150811';
  // Subtitles, Board name, Highlights:
  const textColorSecondary = isDark ? '#caa6a6' : '#692437';
  // Body text for bullets:
  const textColorBody = isDark ? '#e4d0d5' : '#2b1020';
  // Primary Wine Accent:
  const textAccent = isDark ? '#ffe7e7' : 'var(--wine)';

  // Card Surfaces (Restored to Original Signature Deep Velvet Obsidian):
  const cardBgNormal = isDark
    ? 'linear-gradient(145deg, #1f101c 0%, #130811 100%)'
    : 'linear-gradient(150deg, #ffffff 0%, #fdf5f6 100%)';
  const cardBgActive = isDark
    ? 'linear-gradient(145deg, #271323 0%, #170915 100%)'
    : 'linear-gradient(150deg, #ffffff 0%, #faedf1 100%)';

  // Overall Signature Borders (Matching Flagship Project & Skills Cards):
  const cardBorderNormal = isDark
    ? '1px solid rgba(212, 160, 175, 0.38)'
    : '1.5px solid rgba(148, 78, 99, 0.38)';
  const cardBorderActive = isDark
    ? '1px solid rgba(255, 225, 235, 0.55)'
    : '1.5px solid rgba(148, 78, 99, 0.55)';

  // Layered Specular Shadows & Glows:
  const cardShadowNormal = isDark
    ? '0 25px 65px -12px rgba(0, 0, 0, 0.82), 0 0 30px rgba(148, 78, 99, 0.22), inset 0 1px 0 rgba(255, 231, 231, 0.16)'
    : '0 20px 50px -10px rgba(148, 78, 99, 0.16), 0 0 25px rgba(180, 123, 132, 0.1), inset 0 1px 0 #ffffff';
  const cardShadowActive = isDark
    ? '0 30px 75px -12px rgba(148, 78, 99, 0.45), 0 0 40px rgba(180, 123, 132, 0.25), inset 0 1px 0 rgba(255, 231, 231, 0.28)'
    : '0 25px 60px -10px rgba(148, 78, 99, 0.24), 0 0 30px rgba(148, 78, 99, 0.14), inset 0 1px 0 #ffffff';

  return (
    <section id="experience" style={{ overflow: 'hidden' }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.9rem' }}>
            <SectionAsterisk size={42} theme={theme} />
            <div className="section-tag" style={{ margin: 0 }}>
              Career &amp; Academia
            </div>
          </div>
          <h2 className="section-title">
            JOURNEY &amp; <ItalicFlipWord text="Milestones" />
          </h2>
          <p className="section-desc">
            Production engineering internships, live client deployments, and academic foundations.
          </p>
        </div>

        <div className="experience-grid-layout">
          {/* Work Experience Column (Cards slide in sweeping noticeably from LEFT) */}
          <div>
            {/* Perfectly Aligned Boxed Header (Sweeps in from Left) */}
            <motion.div
              initial={{ opacity: 0, x: -120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                marginBottom: '2.4rem',
                minHeight: '52px',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: isDark ? 'rgba(148, 78, 99, 0.28)' : 'rgba(148, 78, 99, 0.12)',
                  border: isDark ? '1px solid rgba(220, 168, 182, 0.5)' : '1.5px solid rgba(148, 78, 99, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDark ? '#ffe7e7' : 'var(--wine)',
                  flexShrink: 0,
                }}
              >
                <Briefcase size={20} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: textColorPrimary,
                    fontFamily: 'var(--font-d)',
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  Engineering Experience
                </h3>
                <div
                  style={{
                    fontSize: '0.76rem',
                    color: textColorSecondary,
                    fontFamily: 'var(--font-m)',
                    marginTop: '0.25rem',
                  }}
                >
                  Client Products &amp; Applied Roles
                </div>
              </div>
            </motion.div>

            {/* Experience Cards Sweeping in visibly from LEFT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {EXPERIENCES.map((exp, idx) => (
                <motion.div
                  key={exp.role + exp.company}
                  initial={{ opacity: 0, x: -160, scale: 0.94, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    type: 'spring',
                    stiffness: 45,
                    damping: 13,
                    mass: 1,
                    delay: idx * 0.1,
                  }}
                >
                  <SpatialGlassCard
                    style={{
                      padding: 'clamp(1.2rem, 3.5vw, 2rem)',
                      background: exp.active ? cardBgActive : cardBgNormal,
                      border: exp.active ? cardBorderActive : cardBorderNormal,
                      boxShadow: exp.active ? cardShadowActive : cardShadowNormal,
                      borderRadius: '24px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: textColorPrimary, lineHeight: 1.3 }}>
                          {exp.role}
                        </h4>
                        <div style={{ fontSize: '0.92rem', color: isDark ? 'var(--rose-taupe)' : 'var(--wine)', fontWeight: 600, fontFamily: 'var(--font-m)', marginTop: '0.2rem' }}>
                          {exp.company}
                        </div>
                      </div>
                      <span
                        className="badge-pill"
                        style={{
                          fontSize: '0.7rem',
                          background: isDark ? 'rgba(255, 231, 231, 0.1)' : 'rgba(148, 78, 99, 0.12)',
                          color: isDark ? '#ffe7e7' : 'var(--wine)',
                          border: isDark ? '1px solid rgba(180, 123, 132, 0.38)' : '1.5px solid rgba(148, 78, 99, 0.3)',
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>

                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: '1.2rem 0 1.4rem', paddingLeft: '1.2rem' }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} style={{ fontSize: '0.88rem', color: textColorBody, lineHeight: 1.68 }}>
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {exp.tags.map((t) => (
                        <span
                          key={t}
                          className="badge-pill hex-chamfer-pill"
                          style={{
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-m)',
                            fontWeight: 600,
                            padding: '0.22rem 0.65rem',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </SpatialGlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Academic Background Column (Cards slide in sweeping noticeably from RIGHT) */}
          <div>
            {/* Perfectly Aligned Boxed Header (Sweeps in from Right) */}
            <motion.div
              initial={{ opacity: 0, x: 120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                marginBottom: '2.4rem',
                minHeight: '52px',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: isDark ? 'rgba(148, 78, 99, 0.28)' : 'rgba(148, 78, 99, 0.12)',
                  border: isDark ? '1px solid rgba(220, 168, 182, 0.5)' : '1.5px solid rgba(148, 78, 99, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDark ? '#ffe7e7' : 'var(--wine)',
                  flexShrink: 0,
                }}
              >
                <GraduationCap size={20} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: textColorPrimary,
                    fontFamily: 'var(--font-d)',
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  Academic Background
                </h3>
                <div
                  style={{
                    fontSize: '0.76rem',
                    color: textColorSecondary,
                    fontFamily: 'var(--font-m)',
                    marginTop: '0.25rem',
                  }}
                >
                  College Degree &amp; Schooling
                </div>
              </div>
            </motion.div>

            {/* B.Tech Flagship Hero Dossier (Sweeps in visibly from RIGHT) */}
            <motion.div
              initial={{ opacity: 0, x: 160, scale: 0.94, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                type: 'spring',
                stiffness: 45,
                damping: 13,
                mass: 1,
              }}
              style={{
                background: cardBgActive,
                border: cardBorderActive,
                boxShadow: cardShadowActive,
                borderRadius: '24px',
                padding: 'clamp(1.2rem, 3.5vw, 2.2rem)',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (isDark) {
                  e.currentTarget.style.borderColor = 'rgba(255, 235, 240, 0.9)';
                  e.currentTarget.style.boxShadow = '0 35px 85px -15px rgba(148, 78, 99, 0.65), 0 0 45px rgba(180, 123, 132, 0.4)';
                } else {
                  e.currentTarget.style.borderColor = 'rgba(148, 78, 99, 0.7)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = cardBorderActive;
                e.currentTarget.style.boxShadow = cardShadowActive;
              }}
            >
              {/* Status Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1.4rem' }}>
                <div
                  className="badge-pill hex-chamfer-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.72rem',
                  }}
                >
                  <span className="live-status-dot-green" />
                  <span
                    style={{
                      fontFamily: 'var(--font-m)',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {COLLEGE_EDUCATION.status.toUpperCase()}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-m)',
                    color: textColorSecondary,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                  }}
                >
                  UNDERGRADUATE DEGREE
                </span>
              </div>

              {/* Degree Title, Specialization & College Info */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: textColorPrimary,
                    fontFamily: 'var(--font-d)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                    marginBottom: '0.4rem',
                  }}
                >
                  {COLLEGE_EDUCATION.degree}
                </h4>
                <div
                  style={{
                    fontSize: '0.96rem',
                    fontWeight: 600,
                    color: isDark ? 'var(--rose-taupe)' : 'var(--wine)',
                    marginBottom: '0.65rem',
                  }}
                >
                  Specialization: {COLLEGE_EDUCATION.specialization}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    flexWrap: 'wrap',
                    fontSize: '0.86rem',
                    color: textColorSecondary,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={14} color="var(--rose-taupe)" />
                    <span>{COLLEGE_EDUCATION.institution}</span>
                  </div>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span
                    className="badge-pill hex-chamfer-pill"
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-m)',
                      fontWeight: 600,
                      padding: '0.15rem 0.55rem',
                    }}
                  >
                    CGPA: {COLLEGE_EDUCATION.cgpa}
                  </span>
                </div>
              </div>

              {/* 4-Year Progress Stepper (4th Year Active / Final Year) */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-m)', color: textColorSecondary, fontWeight: 600 }}>
                    DEGREE PROGRESS · FINAL YEAR (YEAR 4 OF 4)
                  </span>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-m)', color: isDark ? '#ffe7e7' : 'var(--wine)', fontWeight: 700 }}>
                    NEARING COMPLETION
                  </span>
                </div>

                {/* Stepper Blocks */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(0.25rem, 1.5vw, 0.55rem)' }}>
                  {COLLEGE_EDUCATION.yearMilestones.map((ms) => (
                    <div
                      key={ms.year}
                      style={{
                        padding: '0.55rem clamp(0.2rem, 1vw, 0.5rem)',
                        borderRadius: '12px',
                        textAlign: 'center',
                        background: ms.highlight
                          ? (isDark ? 'rgba(148, 78, 99, 0.55)' : 'var(--wine)')
                          : (isDark ? 'rgba(255, 231, 231, 0.07)' : 'rgba(148, 78, 99, 0.07)'),
                        border: ms.highlight
                          ? (isDark ? '1.5px solid rgba(255, 235, 240, 0.8)' : '1.5px solid var(--wine)')
                          : (isDark ? '1px solid rgba(180, 123, 132, 0.3)' : '1.5px solid rgba(148, 78, 99, 0.25)'),
                      }}
                    >
                      <div
                        style={{
                          fontSize: 'clamp(0.68rem, 2vw, 0.75rem)',
                          fontWeight: 700,
                          color: ms.highlight
                            ? '#ffffff'
                            : textColorPrimary,
                        }}
                      >
                        {ms.year}
                      </div>
                      <div
                        style={{
                          fontSize: 'clamp(0.56rem, 1.8vw, 0.64rem)',
                          fontFamily: 'var(--font-m)',
                          color: ms.highlight
                            ? '#ffffff'
                            : textColorSecondary,
                          marginTop: '0.15rem',
                          fontWeight: ms.highlight ? 700 : 500,
                        }}
                      >
                        {ms.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Subjects */}
              <div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-m)', color: textColorSecondary, fontWeight: 600, letterSpacing: '0.06em', marginBottom: '0.65rem' }}>
                  KEY SUBJECTS
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {COLLEGE_EDUCATION.keySubjects.map((subject) => (
                    <span
                      key={subject}
                      className="badge-pill hex-chamfer-pill"
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-m)',
                        fontWeight: 600,
                        padding: '0.25rem 0.65rem',
                      }}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Foundational School Cards: Twin Companion Cards (Sweeps in visibly from RIGHT) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.2rem' }}>
              {SCHOOL_EDUCATION.map((school, idx) => (
                <motion.div
                  key={school.level}
                  initial={{ opacity: 0, x: 160, scale: 0.94, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    type: 'spring',
                    stiffness: 45,
                    damping: 13,
                    mass: 1,
                    delay: idx * 0.12,
                  }}
                  style={{
                    background: cardBgNormal,
                    border: cardBorderNormal,
                    boxShadow: cardShadowNormal,
                    borderRadius: '20px',
                    padding: 'clamp(1.1rem, 3vw, 1.5rem)',
                    position: 'relative',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    if (isDark) {
                      e.currentTarget.style.borderColor = 'rgba(255, 235, 240, 0.8)';
                    } else {
                      e.currentTarget.style.borderColor = 'rgba(148, 78, 99, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = cardBorderNormal;
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span
                      className="badge-pill hex-chamfer-pill"
                      style={{
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-m)',
                        fontWeight: 700,
                        padding: '0.22rem 0.6rem',
                      }}
                    >
                      {school.badge}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-m)', color: textColorSecondary }}>
                      {school.period}
                    </span>
                  </div>

                  <h5
                    style={{
                      fontSize: '1.02rem',
                      fontWeight: 700,
                      color: textColorPrimary,
                      marginBottom: '0.28rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {school.level}
                  </h5>

                  <div style={{ fontSize: '0.8rem', color: textColorSecondary, marginBottom: '0.95rem', lineHeight: 1.4 }}>
                    {school.board} · {school.school}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0.9rem',
                      borderRadius: '12px',
                      background: isDark ? 'rgba(255, 231, 231, 0.05)' : 'rgba(148, 78, 99, 0.07)',
                      border: isDark ? '1px solid rgba(180, 123, 132, 0.26)' : '1.5px solid rgba(148, 78, 99, 0.28)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: isDark ? '#ffe7e7' : 'var(--wine)',
                        fontFamily: 'var(--font-m)',
                      }}
                    >
                      {school.score}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: textColorSecondary, textAlign: 'right' }}>
                      {school.stream}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
