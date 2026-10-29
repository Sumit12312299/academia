import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Users,
  Award,
  Calendar,
  FileCheck,
  PlusCircle,
  Filter,
  Download,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  DollarSign,
  Briefcase,
  Layers,
} from 'lucide-react';
import {
  TPO_CAMPUS_METRICS,
  INDUSTRY_MOUS,
  TARGET_ROLES,
} from '../data/mockData';

export default function TpoPortal({ jobs, setJobs }) {
  const [activeSubTab, setActiveSubTab] = useState('analytics');
  const [showNewDriveModal, setShowNewDriveModal] = useState(false);
  const [newDriveForm, setNewDriveForm] = useState({
    company: '',
    title: '',
    packageRange: '',
    minCGPA: 7.5,
    roleCategory: 'fullstack',
    allowedBranches: ['CSE', 'IT'],
    deadline: '',
  });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateDrive = (e) => {
    e.preventDefault();
    if (!newDriveForm.company || !newDriveForm.title) {
      alert('Please fill company name and drive title');
      return;
    }

    const createdJob = {
      id: `drive_${Date.now()}`,
      company: newDriveForm.company,
      logo: '🏢',
      title: newDriveForm.title,
      roleCategory: newDriveForm.roleCategory,
      type: 'On-Campus Placement Drive',
      location: 'Campus Auditorium / Virtual',
      packageRange: newDriveForm.packageRange || '12 — 18 LPA',
      ctcNum: 15,
      minCGPA: Number(newDriveForm.minCGPA),
      allowedBranches: newDriveForm.allowedBranches,
      maxBacklogs: 0,
      requiredSkills: ['JavaScript / TypeScript', 'React / Next.js', 'SQL & PostgreSQL'],
      recommendedSkills: ['Docker & Containerization'],
      deadline: newDriveForm.deadline || '2026-11-28',
      applicantsCount: 0,
      description: `Official campus placement drive coordinated via DTU Training & Placement Cell. Eligible candidates with CGPA >= ${newDriveForm.minCGPA} can apply directly.`,
      matchScore: 85,
    };

    setJobs([createdJob, ...jobs]);
    setShowNewDriveModal(false);
    showToast(`Placement drive for ${createdJob.company} scheduled & broadcasted to students!`);
  };

  return (
    <div className="tpo-portal-container">
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
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="sub-tabs">
        <button
          className={`sub-tab-btn ${activeSubTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('analytics')}
        >
          <TrendingUp size={16} />
          <span>Placement Analytics & Trends</span>
        </button>
        <button
          className={`sub-tab-btn ${activeSubTab === 'skill_heatmap' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('skill_heatmap')}
        >
          <Layers size={16} />
          <span>Institutional Skill Deficit Heatmap</span>
        </button>
        <button
          className={`sub-tab-btn ${activeSubTab === 'drives' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('drives')}
        >
          <Briefcase size={16} />
          <span>Campus Drives & Eligibility ({jobs.length})</span>
        </button>
        <button
          className={`sub-tab-btn ${activeSubTab === 'mous' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('mous')}
        >
          <Building2 size={16} />
          <span>Industry MoUs & CoE Hub ({INDUSTRY_MOUS.length})</span>
        </button>
      </div>

      {/* =========================================================================
          VIEW 1: PLACEMENT ANALYTICS
         ========================================================================= */}
      {activeSubTab === 'analytics' && (
        <div>
          {/* Header Banner */}
          <div
            className="glass-panel"
            style={{
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span className="badge badge-primary">Academic Year 2025–2026</span>
                <span className="badge badge-success">Live TPO Registry</span>
              </div>
              <h2>Institutional Placement Intelligence & Reporting</h2>
              <p>Real-time analytics across graduating cohorts, salary percentiles, and recruiting partners.</p>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => showToast('Placement Summary Report (PDF) exported successfully!')}
              >
                <Download size={14} /> Export NAAC / NIRF Data
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowNewDriveModal(true)}
              >
                <PlusCircle size={14} /> Schedule Drive
              </button>
            </div>
          </div>

          {/* Stat KPIs */}
          <div className="stat-grid">
            <div className="stat-card emerald">
              <div className="stat-icon">
                <Users size={22} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Total Placed Rate</div>
                <div className="stat-value">{TPO_CAMPUS_METRICS.placementRate}%</div>
                <div className="stat-sub">
                  {TPO_CAMPUS_METRICS.studentsPlaced} / {TPO_CAMPUS_METRICS.totalEligibleStudents} Students
                </div>
              </div>
            </div>

            <div className="stat-card cyan">
              <div className="stat-icon">
                <DollarSign size={22} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Average Package</div>
                <div className="stat-value">{TPO_CAMPUS_METRICS.averagePackage} LPA</div>
                <div className="stat-sub">
                  Median: {TPO_CAMPUS_METRICS.medianPackage} LPA
                </div>
              </div>
            </div>

            <div className="stat-card purple">
              <div className="stat-icon">
                <Award size={22} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Highest Package</div>
                <div className="stat-value">{TPO_CAMPUS_METRICS.highestPackage} LPA</div>
                <div className="stat-sub">
                  International / Tech SDE
                </div>
              </div>
            </div>

            <div className="stat-card amber">
              <div className="stat-icon">
                <Briefcase size={22} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Recruiting Companies</div>
                <div className="stat-value">{TPO_CAMPUS_METRICS.participatingCompanies}</div>
                <div className="stat-sub" style={{ color: '#fbbf24' }}>
                  {TPO_CAMPUS_METRICS.activeDrives} Drives in Progress
                </div>
              </div>
            </div>
          </div>

          {/* 2-Column Analytics Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '1.5rem' }}>
            {/* Branch-wise Placement Rates */}
            <div className="glass-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h3>Branch-Wise Placement Performance</h3>
                  <p style={{ fontSize: '0.82rem' }}>Placement percentage and average CTC by discipline</p>
                </div>
                <span className="badge badge-primary">B.Tech 2026 Batch</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {TPO_CAMPUS_METRICS.branchStatistics.map((b) => (
                  <div key={b.branch} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: 600 }}>{b.branch}</span>
                      <span>
                        Placed: <strong>{b.placed}</strong>/{b.total} (<strong>{b.rate}%</strong>) • Avg: <strong>{b.avgLPA} LPA</strong>
                      </span>
                    </div>

                    <div style={{ width: '100%', height: '8px', background: 'var(--bg-glass-active)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${b.rate}%`,
                          background: b.rate >= 90 ? 'linear-gradient(90deg, #10b981, #059669)' : b.rate >= 80 ? 'linear-gradient(90deg, #06b6d4, #0284c7)' : 'linear-gradient(90deg, #f59e0b, #d97706)',
                          borderRadius: '4px',
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary Distribution Tiers */}
            <div className="glass-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h3>Salary Distribution Breakdown</h3>
                  <p style={{ fontSize: '0.82rem' }}>Offers segmented by compensation brackets</p>
                </div>
                <span className="badge badge-success">1,049 Total Offers</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {TPO_CAMPUS_METRICS.salaryDistribution.map((tier) => {
                  const percentage = Math.round((tier.count / TPO_CAMPUS_METRICS.studentsPlaced) * 100);
                  return (
                    <div key={tier.range} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span style={{ fontWeight: 600 }}>{tier.range}</span>
                        <span>
                          <strong>{tier.count} Students</strong> ({percentage}%)
                        </span>
                      </div>

                      <div style={{ width: '100%', height: '8px', background: 'var(--bg-glass-active)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${percentage * 2}%`, // scaled for visual prominence
                            background: tier.color,
                            borderRadius: '4px',
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card-hover)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.82rem',
                }}
              >
                💡 <strong>TPO Insight:</strong> Offers above 10 LPA have grown by <strong>+22%</strong> this academic season, heavily driven by Cloud, GenAI, and Full-Stack capability benchmarks.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: SKILL DEFICIT HEATMAP
         ========================================================================= */}
      {activeSubTab === 'skill_heatmap' && (
        <div>
          <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span className="badge badge-danger">Curriculum Alignment Alert</span>
              <span className="badge badge-primary">Industry Feedback Engine</span>
            </div>
            <h2>Institutional Skill Deficit Heatmap</h2>
            <p style={{ maxWidth: '850px' }}>
              Identifies technology domains where the student cohort's verified mastery lags behind hiring partner requirements. Used by Dean of Academics and HODs for updating elective curricula and organizing bootcamps.
            </p>
          </div>

          <div className="glass-panel">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {TPO_CAMPUS_METRICS.cohortSkillGaps.map((item) => (
                <div
                  key={item.skill}
                  style={{
                    padding: '1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card-hover)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                          {item.skill}
                        </span>
                        <span
                          className={`badge ${
                            item.priority === 'Critical'
                              ? 'badge-danger'
                              : item.priority === 'High'
                              ? 'badge-warning'
                              : item.priority === 'Medium'
                              ? 'badge-primary'
                              : 'badge-success'
                          }`}
                        >
                          {item.priority} Gap
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        Cohort Mastery: <strong>{item.studentMasteryRate}%</strong> vs Industry Demand: <strong>{item.industryDemand}%</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => showToast(`Organized 2-Week Bootcamp for "${item.skill}" with NPTEL/Partner trainers!`)}
                      >
                        <PlusCircle size={13} /> Sponsor Bootcamp
                      </button>
                    </div>
                  </div>

                  {/* Dual comparison bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div style={{ width: '100%', height: '10px', background: 'var(--bg-glass-active)', borderRadius: '5px', position: 'relative', overflow: 'hidden' }}>
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          width: `${item.studentMasteryRate}%`,
                          background: '#06b6d4',
                          borderRadius: '5px',
                        }}
                        title={`Student Mastery: ${item.studentMasteryRate}%`}
                      ></div>
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: `${item.industryDemand}%`,
                          height: '100%',
                          width: '3px',
                          background: '#f43f5e',
                        }}
                        title={`Industry Demand: ${item.industryDemand}%`}
                      ></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                      <span>Student Readiness: {item.studentMasteryRate}%</span>
                      <span style={{ color: '#fb7185' }}>Recruiter Demand Threshold: {item.industryDemand}% (Gap: -{item.gapMagnitude}%)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: DRIVES MANAGEMENT
         ========================================================================= */}
      {activeSubTab === 'drives' && (
        <div>
          <div className="glass-panel" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2>Placement Drives & Automated Eligibility Engine</h2>
              <p>Active hiring drives with verified student cutoff criteria.</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setShowNewDriveModal(true)}>
              <PlusCircle size={14} /> Schedule New Drive
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {jobs.map((drive) => (
              <div key={drive.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.75rem' }}>{drive.logo}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                        {drive.company} — {drive.title}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        Deadline: {drive.deadline} • Min CGPA Cutoff: <strong>{drive.minCGPA}</strong>
                      </div>
                    </div>
                  </div>

                  <span className="badge badge-success">
                    {drive.applicantsCount || 142} Registered Applicants
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                  <div style={{ fontSize: '0.85rem' }}>
                    Eligible Branches: <strong>{drive.allowedBranches.join(', ')}</strong> • Max Backlogs: <strong>0</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => showToast(`Exported verified eligible student roster for ${drive.company} (${drive.applicantsCount || 142} students)`)}
                    >
                      <Download size={13} /> Export Eligible List
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: INDUSTRY MOUS
         ========================================================================= */}
      {activeSubTab === 'mous' && (
        <div>
          <div className="glass-panel" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2>Industry MoUs & Center of Excellence (CoE) Hub</h2>
              <p>Formal corporate partnerships, research lab funding, and joint curriculum certifications.</p>
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => showToast('New Industry MoU Draft initialized with University Legal & TPO Cell')}
            >
              <PlusCircle size={14} /> Draft New MoU
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {INDUSTRY_MOUS.map((mou) => (
              <div key={mou.id} className="glass-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 style={{ margin: 0 }}>{mou.partner}</h3>
                      <span className="badge badge-success">{mou.status}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Domain: <strong>{mou.domain}</strong> • Signed: {mou.signedDate}
                    </div>
                  </div>

                  <span className="badge badge-primary">{mou.fundedAmount}</span>
                </div>

                <p style={{ fontSize: '0.88rem', margin: '0.5rem 0' }}>{mou.benefits}</p>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem' }}>
                  Institutional Faculty Coordinator: <strong>{mou.coordinator}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Schedule New Campus Drive */}
      {showNewDriveModal && (
        <div className="modal-overlay" onClick={() => setShowNewDriveModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '0.25rem' }}>Schedule New Campus Placement Drive</h2>
            <p style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Broadcast a new campus drive with strict eligibility filters across student dashboards.
            </p>

            <form onSubmit={handleCreateDrive}>
              <div className="form-group">
                <label className="form-label">Recruiting Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Goldman Sachs, Atlassian, Adobe"
                  className="form-input"
                  value={newDriveForm.company}
                  onChange={(e) => setNewDriveForm({ ...newDriveForm, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job / Internship Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Development Engineer - I"
                  className="form-input"
                  value={newDriveForm.title}
                  onChange={(e) => setNewDriveForm({ ...newDriveForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Package (CTC / Stipend)</label>
                  <input
                    type="text"
                    placeholder="e.g. 18 — 22 LPA"
                    className="form-input"
                    value={newDriveForm.packageRange}
                    onChange={(e) => setNewDriveForm({ ...newDriveForm, packageRange: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Minimum CGPA Cutoff</label>
                  <input
                    type="number"
                    step="0.1"
                    min="5"
                    max="10"
                    className="form-input"
                    value={newDriveForm.minCGPA}
                    onChange={(e) => setNewDriveForm({ ...newDriveForm, minCGPA: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Role Category</label>
                <select
                  className="form-select"
                  value={newDriveForm.roleCategory}
                  onChange={(e) => setNewDriveForm({ ...newDriveForm, roleCategory: e.target.value })}
                >
                  <option value="fullstack">Full-Stack Development</option>
                  <option value="aiml">AI / Machine Learning</option>
                  <option value="devops">Cloud & DevOps</option>
                  <option value="cybersec">Cybersecurity</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Application Deadline</label>
                <input
                  type="date"
                  className="form-input"
                  value={newDriveForm.deadline}
                  onChange={(e) => setNewDriveForm({ ...newDriveForm, deadline: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowNewDriveModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Campus Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
