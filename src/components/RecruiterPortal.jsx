import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Sparkles,
  CheckCircle2,
  XCircle,
  Filter,
  PlusCircle,
  Search,
  Award,
  ChevronRight,
  ShieldCheck,
  Send,
  Calendar,
  Layers,
} from 'lucide-react';
import { MOCK_APPLICANTS_POOL } from '../data/mockData';

export default function RecruiterPortal({ jobs, setJobs }) {
  const [applicants, setApplicants] = useState(MOCK_APPLICANTS_POOL);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [newJobForm, setNewJobForm] = useState({
    title: '',
    company: 'Zomato Engineering',
    packageRange: '18 — 24 LPA',
    minCGPA: 8.0,
    requiredSkills: 'React, Node.js, TypeScript, PostgreSQL',
    description: '',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAdvanceStatus = (applicantId, newStatus) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === applicantId ? { ...app, status: newStatus } : app))
    );
    showToast(`Candidate status updated to: ${newStatus}`);
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    if (!newJobForm.title) return;

    const skillsArray = newJobForm.requiredSkills.split(',').map((s) => s.trim());

    const created = {
      id: `rec_job_${Date.now()}`,
      company: newJobForm.company,
      logo: '💼',
      title: newJobForm.title,
      roleCategory: 'fullstack',
      type: 'Direct Corporate Placement',
      location: 'Bengaluru / Hybrid',
      packageRange: newJobForm.packageRange,
      ctcNum: 20,
      minCGPA: Number(newJobForm.minCGPA),
      allowedBranches: ['CSE', 'IT', 'ECE'],
      maxBacklogs: 0,
      requiredSkills: skillsArray,
      recommendedSkills: ['Docker & Containerization', 'Cloud (AWS / GCP)'],
      deadline: '2026-12-15',
      applicantsCount: 0,
      description: newJobForm.description || 'Full-stack engineering role focusing on high-concurrency microservices.',
      matchScore: 88,
    };

    setJobs([created, ...jobs]);
    setShowPostJobModal(false);
    showToast(`New position "${created.title}" published to student portal!`);
  };

  const filteredApplicants = applicants.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.appliedRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole =
      selectedRoleFilter === 'all' || app.appliedRole.toLowerCase().includes(selectedRoleFilter.toLowerCase());

    return matchesSearch && matchesRole;
  });

  return (
    <div className="recruiter-portal-container">
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
          }}
        >
          <Sparkles size={18} color="#06b6d4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div
        className="glass-panel"
        style={{
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <span className="badge badge-success">
              <ShieldCheck size={12} /> Verified Corporate Partner
            </span>
            <span className="badge badge-primary">AI Applicant Ranking Active</span>
          </div>
          <h2>Industry Talent Acquisition & ATS Portal</h2>
          <p>
            Screen university candidates ranked algorithmically by verified academic credentials and semantic skill matches.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowPostJobModal(true)}
          >
            <PlusCircle size={14} /> Post Opening
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="stat-grid">
        <div className="stat-card cyan">
          <div className="stat-icon">
            <Users size={22} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Applicants</div>
            <div className="stat-value">{applicants.length}</div>
            <div className="stat-sub">Across 3 Active Openings</div>
          </div>
        </div>

        <div className="stat-card emerald">
          <div className="stat-icon">
            <Sparkles size={22} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Average Match Score</div>
            <div className="stat-value">89.8%</div>
            <div className="stat-sub">High Profile-Relevance</div>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon">
            <Calendar size={22} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Interviews Scheduled</div>
            <div className="stat-value">4</div>
            <div className="stat-sub">This Academic Week</div>
          </div>
        </div>

        <div className="stat-card amber">
          <div className="stat-icon">
            <Award size={22} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Verified CGPA Average</div>
            <div className="stat-value">8.71</div>
            <div className="stat-sub">TPO Verified Registry</div>
          </div>
        </div>
      </div>

      {/* Filter and Candidate Pool */}
      <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ position: 'relative', flex: '1 1 280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search candidate name, branch, or skill..."
              className="form-input"
              style={{ paddingLeft: '2.4rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <select
              className="form-select"
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
            >
              <option value="all">All Applied Positions</option>
              <option value="Product">Associate Product Engineer</option>
              <option value="Full Stack">SDE-1 (Full Stack)</option>
            </select>
          </div>
        </div>

        {/* Applicant Cards Ranked by AI Match Score */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredApplicants.map((cand, idx) => (
            <div
              key={cand.id}
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card-hover)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--primary), var(--cyan))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: '#fff',
                      fontSize: '1rem',
                    }}
                  >
                    #{idx + 1}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{cand.name}</h3>
                      <span className="badge badge-success">
                        <ShieldCheck size={12} /> TPO Verified
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {cand.department} • CGPA: <strong>{cand.cgpa}</strong> • Applying for: <strong>{cand.appliedRole}</strong>
                    </div>
                  </div>
                </div>

                {/* AI Match Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      background: cand.matchScore >= 90 ? 'var(--emerald-glow)' : 'var(--primary-glow)',
                      border: `1px solid ${cand.matchScore >= 90 ? '#10b981' : '#6366f1'}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <Sparkles size={13} color={cand.matchScore >= 90 ? '#34d399' : '#818cf8'} />
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: cand.matchScore >= 90 ? '#34d399' : '#818cf8' }}>
                      {cand.matchScore}% AI Match
                    </span>
                  </div>

                  <span className="badge badge-cyan" style={{ padding: '0.35rem 0.75rem' }}>
                    {cand.status}
                  </span>
                </div>
              </div>

              {/* Skills tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {cand.skills.map((sk) => (
                  <span
                    key={sk}
                    style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.78rem',
                      color: 'var(--text-main)',
                    }}
                  >
                    {sk}
                  </span>
                ))}
              </div>

              {/* Recruiter Action Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.75rem',
                }}
              >
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Current Stage: <strong>{cand.status}</strong>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {cand.status === 'Screening' && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAdvanceStatus(cand.id, 'Technical Interview')}
                    >
                      Invite to Tech Interview
                    </button>
                  )}
                  {cand.status === 'Technical Interview' && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAdvanceStatus(cand.id, 'Offer Extended')}
                    >
                      Extend Offer Letter 🎉
                    </button>
                  )}
                  {cand.status === 'Offer Extended' && (
                    <span className="badge badge-success">
                      <CheckCircle2 size={13} /> Official Offer Sent
                    </span>
                  )}
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => showToast(`Sent direct message to ${cand.name}`)}
                  >
                    <Send size={12} /> Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Post Job Opening */}
      {showPostJobModal && (
        <div className="modal-overlay" onClick={() => setShowPostJobModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '0.25rem' }}>Post Direct Job / Internship Opening</h2>
            <p style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Specify your skill requirements to let the AI matching engine rank and recommend candidates.
            </p>

            <form onSubmit={handlePostJob}>
              <div className="form-group">
                <label className="form-label">Company / Division Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={newJobForm.company}
                  onChange={(e) => setNewJobForm({ ...newJobForm, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Position Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Frontend Engineer (Next.js / TypeScript)"
                  className="form-input"
                  value={newJobForm.title}
                  onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Package Range (LPA / Stipend)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newJobForm.packageRange}
                    onChange={(e) => setNewJobForm({ ...newJobForm, packageRange: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Minimum Verified CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    min="5"
                    max="10"
                    className="form-input"
                    value={newJobForm.minCGPA}
                    onChange={(e) => setNewJobForm({ ...newJobForm, minCGPA: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={newJobForm.requiredSkills}
                  onChange={(e) => setNewJobForm({ ...newJobForm, requiredSkills: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role Description & Responsibilities</label>
                <textarea
                  rows="3"
                  className="form-textarea"
                  value={newJobForm.description}
                  onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowPostJobModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
