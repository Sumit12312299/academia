import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import RoleLoginPortal from './components/RoleLoginPortal';
import StudentPortal from './components/StudentPortal';
import TpoPortal from './components/TpoPortal';
import RecruiterPortal from './components/RecruiterPortal';
import AiMentorView from './components/AiMentorView';
import {
  INITIAL_STUDENT_PROFILE,
  SAMPLE_RESUMES,
  INITIAL_JOB_POSTINGS,
  INITIAL_APPLICATIONS,
} from './data/mockData';
import {
  Sparkles,
  GraduationCap,
  Building2,
  Briefcase,
  ShieldCheck,
  Layers,
  Award,
  ChevronRight,
} from 'lucide-react';

export default function App() {
  const [activeRole, setActiveRole] = useState('home');
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Authentication states for the 3 distinct roles:
  // student, tpo, recruiter. (AI Career Mentor has NO login requirement as requested).
  const [authUsers, setAuthUsers] = useState({
    student: null, // null = requires student login
    tpo: null,     // null = requires TPO/institutional login
    recruiter: null, // null = requires corporate recruiter login
  });

  // Core state shared across portals
  const [studentProfile, setStudentProfile] = useState(INITIAL_STUDENT_PROFILE);
  const [jobs, setJobs] = useState(INITIAL_JOB_POSTINGS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);

  // Handle successful login for a specific role
  const handleLoginSuccess = (role, userPayload) => {
    setAuthUsers((prev) => ({
      ...prev,
      [role]: userPayload,
    }));

    // If student logged in with another profile (e.g. Priya or Rohan), adapt studentProfile
    if (role === 'student' && userPayload.name) {
      if (userPayload.name.includes('Priya')) {
        setStudentProfile((prev) => ({
          ...prev,
          name: 'Priya Verma',
          rollNo: '22AI012',
          department: 'Artificial Intelligence & Data Science',
          cgpa: 9.12,
          extractedSkills: SAMPLE_RESUMES[1].skills,
        }));
      } else if (userPayload.name.includes('Rohan')) {
        setStudentProfile((prev) => ({
          ...prev,
          name: 'Rohan Mehra',
          rollNo: '22IT045',
          department: 'Information Technology',
          cgpa: 7.95,
          extractedSkills: SAMPLE_RESUMES[2].skills,
        }));
      } else {
        setStudentProfile(INITIAL_STUDENT_PROFILE);
      }
    }
  };

  // Handle logout for a role
  const handleLogout = (role) => {
    setAuthUsers((prev) => ({
      ...prev,
      [role]: null,
    }));
  };

  // Toggle dark/light theme
  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
      }
      return next;
    });
  };

  // Reset to initial demo state
  const resetDemoData = () => {
    setStudentProfile(INITIAL_STUDENT_PROFILE);
    setJobs(INITIAL_JOB_POSTINGS);
    setApplications(INITIAL_APPLICATIONS);
    setAuthUsers({
      student: null,
      tpo: null,
      recruiter: null,
    });
    alert('Demo data and login sessions have been reset.');
  };

  return (
    <div className="app-layout">
      {/* Universal Header with Role Switcher & Auth status */}
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
        resetDemoData={resetDemoData}
        authUsers={authUsers}
        onLogout={handleLogout}
        notificationsCount={3}
      />

      {/* Main Workspace */}
      <main className="app-main">
        {/* Home / Overview - Always Public */}
        {activeRole === 'home' && (
          <HomePage
            setActiveRole={setActiveRole}
            jobs={jobs}
            studentProfile={studentProfile}
          />
        )}

        {/* Student Portal - Requires Student Login */}
        {activeRole === 'student' && (
          !authUsers.student ? (
            <RoleLoginPortal
              targetRole="student"
              setActiveRole={setActiveRole}
              onLoginSuccess={handleLoginSuccess}
            />
          ) : (
            <StudentPortal
              studentProfile={studentProfile}
              setStudentProfile={setStudentProfile}
              jobs={jobs}
              applications={applications}
              setApplications={setApplications}
              setActiveRole={setActiveRole}
            />
          )
        )}

        {/* TPO / Institute Portal - Requires TPO Cell Login */}
        {activeRole === 'tpo' && (
          !authUsers.tpo ? (
            <RoleLoginPortal
              targetRole="tpo"
              setActiveRole={setActiveRole}
              onLoginSuccess={handleLoginSuccess}
            />
          ) : (
            <TpoPortal
              jobs={jobs}
              setJobs={setJobs}
            />
          )
        )}

        {/* Recruiter Portal - Requires Recruiter Login */}
        {activeRole === 'recruiter' && (
          !authUsers.recruiter ? (
            <RoleLoginPortal
              targetRole="recruiter"
              setActiveRole={setActiveRole}
              onLoginSuccess={handleLoginSuccess}
            />
          ) : (
            <RecruiterPortal
              jobs={jobs}
              setJobs={setJobs}
            />
          )
        )}

        {/* AI Career Mentor - NO LOGIN REQUIRED (Free / open for all) */}
        {activeRole === 'ai_mentor' && (
          <AiMentorView
            studentProfile={studentProfile}
          />
        )}
      </main>

      {/* Modern Enterprise & Academic Multi-Column Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-top-grid">
            {/* Column 1: Brand & Core Mission */}
            <div className="footer-brand-col">
              <div
                className="footer-brand-title"
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveRole('home')}
                title="Go to Homepage"
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, var(--primary), var(--cyan))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <span>SkillBridge AI</span>
              </div>
              <p className="footer-brand-desc">
                An intelligent centralized ecosystem connecting students, higher education institutions, and industry recruiters for automated skill-gap analysis, verified credentialing, and personalized placement pathways.
              </p>
              <div className="footer-badges">
                <span className="footer-pill-badge">
                  <ShieldCheck size={12} color="#10b981" /> Verified TPO Registry
                </span>
                <span className="footer-pill-badge">
                  <Layers size={12} color="#06b6d4" /> IEEE Skill Taxonomy
                </span>
                <span className="footer-pill-badge">
                  <Award size={12} color="#f59e0b" /> NEP 2020 Aligned
                </span>
              </div>
            </div>

            {/* Column 2: Student Modules */}
            <div className="footer-col">
              <h4>
                <GraduationCap size={15} color="#06b6d4" /> Student Portal
              </h4>
              <ul className="footer-links">
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('student')}>
                    <ChevronRight size={12} /> Skill-Gap Radar Analysis
                  </button>
                </li>
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('student')}>
                    <ChevronRight size={12} /> AI Resume Entity Parser
                  </button>
                </li>
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('student')}>
                    <ChevronRight size={12} /> NPTEL & Coursera Pathways
                  </button>
                </li>
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('student')}>
                    <ChevronRight size={12} /> Smart Internship Recommendations
                  </button>
                </li>
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('student')}>
                    <ChevronRight size={12} /> Real-Time ATS Tracker
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Institute & TPO Cell */}
            <div className="footer-col">
              <h4>
                <Building2 size={15} color="#818cf8" /> Institute & TPO
              </h4>
              <ul className="footer-links">
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('tpo')}>
                    <ChevronRight size={12} /> Placement Trends & CTC Stats
                  </button>
                </li>
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('tpo')}>
                    <ChevronRight size={12} /> Cohort Skill Deficit Heatmap
                  </button>
                </li>
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('tpo')}>
                    <ChevronRight size={12} /> Automated Eligibility Filter
                  </button>
                </li>
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('tpo')}>
                    <ChevronRight size={12} /> Corporate MoUs & CoE Hub
                  </button>
                </li>
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('tpo')}>
                    <ChevronRight size={12} /> NAAC & NIRF Data Export
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Industry & AI Intelligence */}
            <div className="footer-col">
              <h4>
                <Briefcase size={15} color="#34d399" /> Industry & AI
              </h4>
              <ul className="footer-links">
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('recruiter')}>
                    <ChevronRight size={12} /> Algorithmic Talent Screening
                  </button>
                </li>
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('recruiter')}>
                    <ChevronRight size={12} /> Post Job & Internship Drives
                  </button>
                </li>
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('recruiter')}>
                    <ChevronRight size={12} /> Candidate Pipeline Management
                  </button>
                </li>
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('ai_mentor')}>
                    <ChevronRight size={12} /> AI Placement & Career Mentor
                  </button>
                </li>
                <li>
                  <button className="footer-link-btn" onClick={() => setActiveRole('ai_mentor')}>
                    <ChevronRight size={12} /> Real-Time Hiring Signals (2026)
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                SkillBridge AI — Centralized Academia–Industry Collaboration Platform
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                Multi-Semester Capstone Project & Dissertation Platform • Continuing into Next Semester
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <div className="footer-status-indicator">
                <span className="status-dot-pulse"></span>
                <span>System Operational • AI Matching & ATS Active</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                © 2026 SkillBridge AI. All Academic & Institutional Rights Reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
