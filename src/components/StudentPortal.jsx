import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  FileText,
  Sparkles,
  Target,
  Briefcase,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  ExternalLink,
  BookOpen,
  Filter,
  Search,
  UploadCloud,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Building,
} from 'lucide-react';
import SkillRadarChart from './SkillRadarChart';
import {
  TARGET_ROLES,
  SAMPLE_RESUMES,
  UPSKILLING_RESOURCES,
} from '../data/mockData';

export default function StudentPortal({
  studentProfile,
  setStudentProfile,
  jobs,
  applications,
  setApplications,
  setActiveRole,
}) {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [selectedRole, setSelectedRole] = useState(TARGET_ROLES[0]);
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [resumeUploadedSuccess, setResumeUploadedSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [minCtcFilter, setMinCtcFilter] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Calculate Match Score between Student's skills and a Job's required skills
  const calculateJobMatch = (job) => {
    const studentSkillNames = new Set(
      studentProfile.extractedSkills.map((s) => s.name.toLowerCase())
    );
    let matchedCount = 0;
    job.requiredSkills.forEach((req) => {
      if (studentSkillNames.has(req.toLowerCase())) {
        matchedCount += 1;
      }
    });
    const percentage = Math.round((matchedCount / job.requiredSkills.length) * 100);
    return Math.max(45, Math.min(percentage, 98)); // realistic bounded range
  };

  // Handle 1-click Application
  const handleApply = (job) => {
    // Check if already applied
    const alreadyApplied = applications.some((app) => app.jobId === job.id);
    if (alreadyApplied) {
      showToast(`You have already applied for ${job.title} at ${job.company}`);
      return;
    }

    // Trigger celebration
    confetti({
      particleCount: 90,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'],
    });

    const newApp = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      company: job.company,
      logo: job.logo,
      role: job.title,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Shortlisted for Online Assessment',
      stageIndex: 1,
      nextEvent: 'Online Coding Test scheduled within 3 working days',
      matchScore: calculateJobMatch(job),
      notes: 'Profile automatically verified via TPO Institutional Registry.',
    };

    setApplications([newApp, ...applications]);
    showToast(`Successfully Applied to ${job.company}! Application tracked in your ATS pipeline.`);
  };

  // Handle Resume Simulator Selection
  const handleLoadSampleResume = (sample) => {
    setIsAnalyzingResume(true);
    setResumeUploadedSuccess(false);

    setTimeout(() => {
      setStudentProfile((prev) => ({
        ...prev,
        extractedSkills: sample.skills,
        cgpa: sample.cgpa,
      }));
      setIsAnalyzingResume(false);
      setResumeUploadedSuccess(true);
      showToast(`AI successfully extracted ${sample.skills.length} skills from ${sample.label}!`);
    }, 1200);
  };

  // Handle file drop/upload simulation
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsAnalyzingResume(true);
    setResumeUploadedSuccess(false);

    setTimeout(() => {
      // Simulate intelligent extraction
      const additionalSkills = [
        { name: 'JavaScript / TypeScript', mastery: 88, verified: true, level: 'Advanced' },
        { name: 'React / Next.js', mastery: 84, verified: true, level: 'Advanced' },
        { name: 'Node.js & Express', mastery: 78, verified: true, level: 'Intermediate' },
        { name: 'SQL & PostgreSQL', mastery: 70, verified: true, level: 'Intermediate' },
        { name: 'Docker & Containerization', mastery: 55, verified: false, level: 'Intermediate' },
        { name: 'Cloud (AWS / GCP)', mastery: 50, verified: false, level: 'Intermediate' },
        { name: 'System Design & APIs', mastery: 60, verified: false, level: 'Intermediate' },
        { name: 'Git & CI/CD Pipelines', mastery: 85, verified: true, level: 'Advanced' },
      ];

      setStudentProfile((prev) => ({
        ...prev,
        extractedSkills: additionalSkills,
      }));
      setIsAnalyzingResume(false);
      setResumeUploadedSuccess(true);
      showToast(`Uploaded "${file.name}" analyzed: Skill proficiency map updated!`);
    }, 1500);
  };

  // Compute Skill Gap for selected role
  const missingSkills = selectedRole.benchmarkSkills.filter((bm) => {
    const found = studentProfile.extractedSkills.find(
      (s) => s.name.toLowerCase() === bm.name.toLowerCase()
    );
    return !found || found.mastery < bm.benchmark;
  }).map((bm) => {
    const found = studentProfile.extractedSkills.find(
      (s) => s.name.toLowerCase() === bm.name.toLowerCase()
    );
    const current = found ? found.mastery : 20;
    return {
      name: bm.name,
      benchmark: bm.benchmark,
      current,
      gap: bm.benchmark - current,
      priority: bm.benchmark - current > 35 ? 'Critical' : 'Moderate',
    };
  });

  // Calculate Overall Role Readiness Match
  const roleMatchScore = Math.round(
    (selectedRole.benchmarkSkills.reduce((acc, bm) => {
      const found = studentProfile.extractedSkills.find(
        (s) => s.name.toLowerCase() === bm.name.toLowerCase()
      );
      const studentVal = found ? Math.min(found.mastery, bm.benchmark) : 20;
      return acc + (studentVal / bm.benchmark);
    }, 0) / selectedRole.benchmarkSkills.length) * 100
  );

  // Filter Jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = roleFilter === 'all' || job.roleCategory === roleFilter;
    const matchesCtc = job.ctcNum >= minCtcFilter;

    return matchesSearch && matchesRole && matchesCtc;
  });

  return (
    <div className="student-portal-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999,
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            border: '1px solid var(--border-hover)',
            boxShadow: 'var(--shadow-lg)',
            padding: '0.85rem 1.4rem',
            borderRadius: 'var(--radius-lg)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.88rem',
            fontWeight: 500,
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <Sparkles size={18} color="#06b6d4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="sub-tabs">
        <button
          className={`sub-tab-btn ${activeSubTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('overview')}
        >
          <Target size={16} />
          <span>Dashboard Overview</span>
        </button>
        <button
          className={`sub-tab-btn ${activeSubTab === 'skill_gap' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('skill_gap')}
        >
          <TrendingUp size={16} />
          <span>AI Skill-Gap & Learning Pathway</span>
        </button>
        <button
          className={`sub-tab-btn ${activeSubTab === 'resume_ai' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('resume_ai')}
        >
          <FileText size={16} />
          <span>AI Resume Skill Extractor</span>
        </button>
        <button
          className={`sub-tab-btn ${activeSubTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('jobs')}
        >
          <Briefcase size={16} />
          <span>Placement & Internship Feed ({jobs.length})</span>
        </button>
        <button
          className={`sub-tab-btn ${activeSubTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('applications')}
        >
          <Clock size={16} />
          <span>Application Tracker ATS ({applications.length})</span>
        </button>
      </div>

      {/* =========================================================================
          VIEW 1: OVERVIEW DASHBOARD
         ========================================================================= */}
      {activeSubTab === 'overview' && (
        <div>
          {/* Top Welcome Banner */}
          <div
            className="glass-panel"
            style={{
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(6, 182, 212, 0.08))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span className="badge badge-success">
                  <ShieldCheck size={13} /> Verified by DTU TPO Cell
                </span>
                <span className="badge badge-primary">
                  {studentProfile.semester} • {studentProfile.department}
                </span>
              </div>
              <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>
                Welcome back, {studentProfile.name}! 👋
              </h1>
              <p style={{ maxWidth: '650px' }}>
                Your academic credentials and verified skill map qualify you for <strong>18 active campus placement drives</strong>. Target role alignment is at <strong>{roleMatchScore}%</strong> for {selectedRole.title}.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setActiveSubTab('resume_ai')}
              >
                <UploadCloud size={14} /> Update Resume
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setActiveSubTab('jobs')}
              >
                <Briefcase size={14} /> Explore Matches
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="stat-grid">
            <div className="stat-card cyan">
              <div className="stat-icon">
                <Target size={22} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Target Role Readiness</div>
                <div className="stat-value">{roleMatchScore}%</div>
                <div className="stat-sub">
                  <TrendingUp size={12} /> for {selectedRole.title.split(' ')[0]}
                </div>
              </div>
            </div>

            <div className="stat-card emerald">
              <div className="stat-icon">
                <Award size={22} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Verified CGPA</div>
                <div className="stat-value">{studentProfile.cgpa}</div>
                <div className="stat-sub">
                  <CheckCircle2 size={12} /> 0 Active Backlogs (Eligible)
                </div>
              </div>
            </div>

            <div className="stat-card amber">
              <div className="stat-icon">
                <Clock size={22} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Active Applications</div>
                <div className="stat-value">{applications.length}</div>
                <div className="stat-sub" style={{ color: '#fbbf24' }}>
                  Next: Zomato Tech Interview (28th Oct)
                </div>
              </div>
            </div>

            <div className="stat-card purple">
              <div className="stat-icon">
                <Sparkles size={22} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Extracted Skills</div>
                <div className="stat-value">{studentProfile.extractedSkills.length}</div>
                <div className="stat-sub">
                  {studentProfile.extractedSkills.filter((s) => s.verified).length} Verified by TPO
                </div>
              </div>
            </div>
          </div>

          {/* 2 Column Layout: Radar Chart + Recommended Job Matches */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '1.5rem' }}>
            {/* Left: Skill Radar Preview */}
            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3>Skill Gap Radar Benchmark</h3>
                  <p style={{ fontSize: '0.82rem' }}>Role: <strong>{selectedRole.title}</strong></p>
                </div>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setActiveSubTab('skill_gap')}
                >
                  Deep Analysis <ArrowRight size={13} />
                </button>
              </div>

              <SkillRadarChart
                studentSkills={studentProfile.extractedSkills}
                benchmarkSkills={selectedRole.benchmarkSkills}
                roleTitle={selectedRole.title.split('(')[0]}
              />

              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Top Skills to Acquire for {selectedRole.title.split(' ')[0]}:
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {missingSkills.slice(0, 3).map((item) => (
                    <span
                      key={item.name}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(244, 63, 94, 0.1)',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        color: '#fb7185',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                      }}
                    >
                      {item.name} (-{item.gap}%)
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Top Recommended Placements */}
            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3>AI-Recommended Opportunities</h3>
                  <p style={{ fontSize: '0.82rem' }}>Matched dynamically to your verified profile</p>
                </div>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setActiveSubTab('jobs')}
                >
                  View All ({jobs.length}) <ChevronRight size={13} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {jobs.slice(0, 3).map((job) => {
                  const match = calculateJobMatch(job);
                  const isApplied = applications.some((app) => app.jobId === job.id);
                  return (
                    <div
                      key={job.id}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-card-hover)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.6rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '1.75rem' }}>{job.logo}</span>
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.98rem' }}>
                              {job.title}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              {job.company} • {job.location}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`badge ${match >= 85 ? 'badge-success' : match >= 70 ? 'badge-primary' : 'badge-warning'}`}
                        >
                          <Sparkles size={11} /> {match}% Match
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--emerald)' }}>
                          {job.packageRange}
                        </span>

                        {isApplied ? (
                          <span className="badge badge-primary">
                            <CheckCircle2 size={12} /> Applied
                          </span>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleApply(job)}
                          >
                            1-Click Apply
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: SKILL-GAP RADAR & ACTIONABLE PATHWAYS
         ========================================================================= */}
      {activeSubTab === 'skill_gap' && (
        <div>
          <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h2>AI Skill-Gap Engine & Benchmark Radar</h2>
                <p>Select an industry job profile to evaluate your competency radar and discover targeted courses to bridge deficiencies.</p>
              </div>

              {/* Role Picker */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {TARGET_ROLES.map((role) => (
                  <button
                    key={role.id}
                    className={`btn btn-sm ${selectedRole.id === role.id ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setSelectedRole(role)}
                  >
                    {role.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Header Banner */}
            <div
              style={{
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-glass-active)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '0.35rem' }}>
                  {selectedRole.category}
                </span>
                <h3 style={{ margin: 0 }}>{selectedRole.title}</h3>
                <p style={{ fontSize: '0.82rem', marginTop: '0.2rem' }}>{selectedRole.description}</p>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Package</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--emerald)' }}>{selectedRole.avgPackage}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Market Demand</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>{selectedRole.demandGrowth}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current Readiness</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: roleMatchScore >= 80 ? '#34d399' : '#fbbf24' }}>
                    {roleMatchScore}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
            {/* Left: Radar Visualizer */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ alignSelf: 'flex-start', marginBottom: '0.5rem' }}>Competency Radar</h3>
              <p style={{ alignSelf: 'flex-start', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                Comparing Aarav's verified skills against standard hiring rubrics.
              </p>

              <SkillRadarChart
                studentSkills={studentProfile.extractedSkills}
                benchmarkSkills={selectedRole.benchmarkSkills}
                roleTitle={selectedRole.title.split('(')[0]}
              />

              {/* Skill Proficiency Breakdown */}
              <div style={{ width: '100%', marginTop: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>Detailed Skills Analysis:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {selectedRole.benchmarkSkills.map((bm) => {
                    const studentSkill = studentProfile.extractedSkills.find(
                      (s) => s.name.toLowerCase() === bm.name.toLowerCase()
                    );
                    const mastery = studentSkill ? studentSkill.mastery : 20;
                    const gap = bm.benchmark - mastery;
                    const isMet = gap <= 0;

                    return (
                      <div key={bm.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                          <span style={{ fontWeight: 600 }}>{bm.name}</span>
                          <span>
                            Current: <strong>{mastery}%</strong> / Target: <strong>{bm.benchmark}%</strong>
                            {' '}
                            {isMet ? (
                              <span style={{ color: '#34d399', fontWeight: 700 }}>✓ Met</span>
                            ) : (
                              <span style={{ color: '#fb7185', fontWeight: 700 }}>(-{gap}%)</span>
                            )}
                          </span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: 'var(--bg-glass-active)', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              height: '100%',
                              width: `${mastery}%`,
                              background: isMet ? '#10b981' : '#06b6d4',
                              borderRadius: '3px',
                            }}
                          ></div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: `${bm.benchmark}%`,
                              height: '100%',
                              width: '2px',
                              background: '#f59e0b',
                            }}
                            title={`Benchmark: ${bm.benchmark}%`}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Curated Upskilling Pathway */}
            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3>Curated Learning Pathway</h3>
                  <p style={{ fontSize: '0.82rem' }}>Accredited NPTEL & industry courses to close identified gaps</p>
                </div>
                <span className="badge badge-primary">AI Pathway Generator</span>
              </div>

              {missingSkills.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <CheckCircle2 size={42} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                  <h3>Congratulations!</h3>
                  <p>You have met all the benchmark requirements for {selectedRole.title}.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {missingSkills.map((gapItem) => {
                    const resources = UPSKILLING_RESOURCES[gapItem.name] || [
                      {
                        title: `Mastering ${gapItem.name} for Production`,
                        platform: 'NPTEL / Coursera Specialization',
                        duration: '4 Weeks',
                        type: 'Accredited Coursework',
                        rating: 4.8,
                        url: 'https://nptel.ac.in',
                        tags: ['Certification', 'Practice Labs'],
                      },
                    ];

                    return (
                      <div
                        key={gapItem.name}
                        style={{
                          padding: '1.1rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-card-hover)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-main)' }}>
                              {gapItem.name}
                            </span>
                            <span
                              className={`badge ${gapItem.priority === 'Critical' ? 'badge-danger' : 'badge-warning'}`}
                            >
                              {gapItem.priority} Gap (-{gapItem.gap}%)
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {resources.map((res, idx) => (
                            <div
                              key={idx}
                              style={{
                                padding: '0.8rem',
                                borderRadius: 'var(--radius-sm)',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-subtle)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '0.75rem',
                              }}
                            >
                              <div>
                                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                                  {res.title}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '0.6rem', marginTop: '0.2rem' }}>
                                  <span>🏛️ {res.platform}</span>
                                  <span>⏱️ {res.duration}</span>
                                  <span>⭐ {res.rating}</span>
                                </div>
                              </div>

                              <a
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline btn-sm"
                                style={{ flexShrink: 0 }}
                              >
                                Enroll <ExternalLink size={12} />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: RESUME SKILL EXTRACTOR
         ========================================================================= */}
      {activeSubTab === 'resume_ai' && (
        <div>
          <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-primary">NLP / LLM Parser v2.4</span>
              <span className="badge badge-success">NER Taxonomy Enabled</span>
            </div>
            <h2>AI-Powered Resume Skill Extractor & Verification</h2>
            <p style={{ maxWidth: '800px' }}>
              Our multimodal parser extracts hard technical skills, projects, certifications, and academic history from uploaded resumes (PDF/DOCX). Standardizes synonyms into normalized taxonomy and syncs directly with the TPO verification ledger.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
            {/* Upload Box */}
            <div className="glass-panel">
              <h3>Upload Student Resume</h3>
              <p style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                Drop your PDF/Word document to simulate real-time AI skill extraction.
              </p>

              <div
                style={{
                  border: '2px dashed var(--border-hover)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  background: 'var(--bg-glass)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%',
                  }}
                />
                <UploadCloud size={44} color="#6366f1" style={{ margin: '0 auto 0.75rem' }} />
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                  Drag & Drop Resume PDF here, or Browse
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Supports PDF, DOCX, TXT (Maximum file size: 10MB)
                </div>
              </div>

              {/* Sample Profile Selector */}
              <div style={{ marginTop: '1.75rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                  Or Test with Sample Student Profiles:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {SAMPLE_RESUMES.map((sample, idx) => (
                    <button
                      key={idx}
                      className="btn btn-outline"
                      style={{ justifyContent: 'space-between', fontSize: '0.85rem' }}
                      onClick={() => handleLoadSampleResume(sample)}
                      disabled={isAnalyzingResume}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={14} color="#06b6d4" /> {sample.label}
                      </span>
                      <span className="badge badge-primary">{sample.skills.length} Skills</span>
                    </button>
                  ))}
                </div>
              </div>

              {isAnalyzingResume && (
                <div
                  style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <Sparkles size={20} color="#06b6d4" className="spin-slow" />
                  <div style={{ fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 700, color: '#38bdf8' }}>Analyzing with NLP Entity Extractor...</div>
                    <div style={{ color: 'var(--text-muted)' }}>Tokenizing text, mapping to IEEE skill taxonomy</div>
                  </div>
                </div>
              )}
            </div>

            {/* Extracted Profile Preview */}
            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3>Extracted Skills & Verified Taxonomy</h3>
                  <p style={{ fontSize: '0.82rem' }}>{studentProfile.extractedSkills.length} Verified Attributes Found</p>
                </div>
                <span className="badge badge-success">
                  <ShieldCheck size={12} /> TPO Ledger Synced
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginBottom: '1.5rem' }}>
                {studentProfile.extractedSkills.map((sk) => (
                  <div
                    key={sk.name}
                    style={{
                      padding: '0.45rem 0.8rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-card-hover)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.82rem',
                    }}
                  >
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{sk.name}</span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.1rem 0.4rem',
                        borderRadius: 'var(--radius-full)',
                        background: sk.mastery >= 75 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(6, 182, 212, 0.15)',
                        color: sk.mastery >= 75 ? '#34d399' : '#38bdf8',
                        fontWeight: 700,
                      }}
                    >
                      {sk.mastery}%
                    </span>
                    {sk.verified && (
                      <CheckCircle2 size={13} color="#10b981" title="Institutional Verified" />
                    )}
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.6rem' }}>Academic & Certification Badges</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
                  {studentProfile.certifications.map((c, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-glass-active)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Award size={15} color="#f59e0b" />
                        <span style={{ fontWeight: 600 }}>{c.title}</span>
                      </div>
                      <span style={{ color: 'var(--text-muted)' }}>{c.issuer}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: JOBS & INTERNSHIPS FEED
         ========================================================================= */}
      {activeSubTab === 'jobs' && (
        <div>
          {/* Filter Bar */}
          <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ position: 'relative', flex: '1 1 280px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search by role, company, or skill (e.g. React, Docker, Zomato)..."
                  className="form-input"
                  style={{ paddingLeft: '2.4rem' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <select
                  className="form-select"
                  style={{ width: 'auto' }}
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Role Categories</option>
                  <option value="fullstack">Full-Stack Development</option>
                  <option value="aiml">AI / Machine Learning</option>
                  <option value="devops">Cloud & DevOps</option>
                </select>

                <select
                  className="form-select"
                  style={{ width: 'auto' }}
                  value={minCtcFilter}
                  onChange={(e) => setMinCtcFilter(Number(e.target.value))}
                >
                  <option value={0}>All Package Ranges</option>
                  <option value={15}>15+ LPA or Equivalents</option>
                  <option value={20}>20+ LPA Tier-1</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredJobs.length === 0 ? (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
                <AlertTriangle size={36} color="#f59e0b" style={{ margin: '0 auto 0.75rem' }} />
                <h3>No Placement Drives Found</h3>
                <p>Try broadening your search keyword or resetting the filter options.</p>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const matchScore = calculateJobMatch(job);
                const isApplied = applications.some((app) => app.jobId === job.id);

                return (
                  <div
                    key={job.id}
                    className="glass-panel"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div
                          style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--bg-glass-active)',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                          }}
                        >
                          {job.logo}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{job.title}</h3>
                            <span className="badge badge-primary">{job.type}</span>
                          </div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <strong>{job.company}</strong> • 📍 {job.location} • 📅 Apply by {job.deadline}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-full)',
                            background: matchScore >= 85 ? 'var(--emerald-glow)' : 'var(--primary-glow)',
                            border: `1px solid ${matchScore >= 85 ? '#10b981' : '#6366f1'}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                          }}
                        >
                          <Sparkles size={14} color={matchScore >= 85 ? '#34d399' : '#818cf8'} />
                          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: matchScore >= 85 ? '#34d399' : '#818cf8' }}>
                            {matchScore}% Skill Match
                          </span>
                        </div>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.88rem' }}>{job.description}</p>

                    {/* Skill Tags */}
                    <div>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 700, marginBottom: '0.4rem' }}>
                        Required Skill Alignment:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {job.requiredSkills.map((sk) => {
                          const hasSkill = studentProfile.extractedSkills.some(
                            (s) => s.name.toLowerCase() === sk.toLowerCase()
                          );
                          return (
                            <span
                              key={sk}
                              style={{
                                fontSize: '0.76rem',
                                padding: '0.2rem 0.55rem',
                                borderRadius: 'var(--radius-sm)',
                                background: hasSkill ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                                color: hasSkill ? '#34d399' : 'var(--text-muted)',
                                border: `1px solid ${hasSkill ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)'}`,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                              }}
                            >
                              {hasSkill && <CheckCircle2 size={11} />}
                              {sk}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer & Apply Action */}
                    <div
                      style={{
                        paddingTop: '0.85rem',
                        borderTop: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Package / CTC</div>
                          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--emerald)' }}>{job.packageRange}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Eligibility</div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                            Min CGPA {job.minCGPA} • {job.allowedBranches.join(', ')}
                          </div>
                        </div>
                      </div>

                      {isApplied ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className="badge badge-success">
                            <CheckCircle2 size={14} /> Applied & Tracked in ATS
                          </span>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => setActiveSubTab('applications')}
                          >
                            View Status
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleApply(job)}
                        >
                          <Sparkles size={16} /> 1-Click Apply with AI Profile
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 5: ATS APPLICATION TRACKER
         ========================================================================= */}
      {activeSubTab === 'applications' && (
        <div>
          <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2>Application Tracking System (ATS Pipeline)</h2>
                <p>Track your active applications, interview timelines, and recruiter remarks in real-time.</p>
              </div>
              <span className="badge badge-primary">{applications.length} Active Pipelines</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {applications.map((app) => {
              const stages = ['Applied', 'Shortlisted', 'Assessment', 'Tech Interview', 'Offer Extended'];

              return (
                <div key={app.id} className="glass-panel">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '2rem' }}>{app.logo}</span>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                          {app.role}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          {app.company} • Applied on {app.appliedDate}
                        </div>
                      </div>
                    </div>

                    <span className="badge badge-cyan" style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}>
                      <Clock size={12} /> {app.status}
                    </span>
                  </div>

                  {/* Multi-step progress bar */}
                  <div style={{ margin: '1.5rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                      {/* Connecting Line */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '14px',
                          left: '5%',
                          right: '5%',
                          height: '3px',
                          background: 'var(--border-subtle)',
                          zIndex: 1,
                        }}
                      ></div>
                      <div
                        style={{
                          position: 'absolute',
                          top: '14px',
                          left: '5%',
                          width: `${(app.stageIndex / (stages.length - 1)) * 90}%`,
                          height: '3px',
                          background: '#10b981',
                          zIndex: 2,
                          transition: 'width 0.4s ease',
                        }}
                      ></div>

                      {stages.map((stageName, idx) => {
                        const isCompleted = idx <= app.stageIndex;
                        const isCurrent = idx === app.stageIndex;

                        return (
                          <div
                            key={stageName}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              position: 'relative',
                              zIndex: 3,
                            }}
                          >
                            <div
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: isCurrent
                                  ? '#6366f1'
                                  : isCompleted
                                  ? '#10b981'
                                  : 'var(--bg-secondary)',
                                border: `2px solid ${isCompleted ? '#10b981' : 'var(--border-subtle)'}`,
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                              }}
                            >
                              {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                            </div>
                            <span
                              style={{
                                marginTop: '0.4rem',
                                fontSize: '0.75rem',
                                color: isCurrent ? 'var(--text-main)' : isCompleted ? '#34d399' : 'var(--text-muted)',
                                fontWeight: isCurrent ? 700 : 500,
                              }}
                            >
                              {stageName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Next Step Banner */}
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-card-hover)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                        Next Action Item:
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '0.15rem' }}>
                        {app.nextEvent}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)', marginTop: '0.15rem' }}>
                        {app.notes}
                      </div>
                    </div>

                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setActiveRole('ai_mentor')}
                    >
                      <Sparkles size={14} color="#06b6d4" /> Prepare with AI Placement Mentor
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
