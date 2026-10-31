import React, { useState } from 'react';
import {
  GraduationCap,
  Building2,
  Briefcase,
  Lock,
  Mail,
  User,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Home,
  School,
  Building,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { INITIAL_STUDENT_PROFILE, SAMPLE_RESUMES } from '../data/mockData';

export default function RoleLoginPortal({
  targetRole, // 'student' | 'tpo' | 'recruiter'
  setActiveRole,
  onLoginSuccess,
}) {
  const [selectedRole, setSelectedRole] = useState(targetRole || 'student');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form states per role
  const [studentForm, setStudentForm] = useState({
    identifier: 'aarav.sharma@dtu.ac.in',
    password: '••••••••••••',
    institution: 'Delhi Technological University (DTU)',
  });

  const [tpoForm, setTpoForm] = useState({
    identifier: 'tpo@dtu.ac.in',
    password: '••••••••••••',
    cycleYear: '2025–2026 (Ongoing)',
    passcode: 'TPO-DTU-8461',
  });

  const [recruiterForm, setRecruiterForm] = useState({
    identifier: 'talent@razorpay.com',
    password: '••••••••••••',
    company: 'Razorpay',
    roleTitle: 'Engineering Talent Lead',
  });

  // Handle direct demo logins
  const handleQuickDemoLogin = (role, userPayload) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(role, userPayload);
    }, 450);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsSubmitting(false);
      if (selectedRole === 'student') {
        const studentPayload = {
          name: studentForm.identifier.includes('priya')
            ? 'Priya Verma'
            : studentForm.identifier.includes('rohan')
            ? 'Rohan Mehra'
            : 'Aarav Sharma',
          email: studentForm.identifier,
          institution: studentForm.institution,
          role: 'student',
          rollNo: '22CS084',
          cgpa: 8.74,
          verified: true,
        };
        onLoginSuccess('student', studentPayload);
      } else if (selectedRole === 'tpo') {
        const tpoPayload = {
          name: tpoForm.identifier.includes('rashmi')
            ? 'Prof. Rashmi Saxena'
            : 'Dr. S. K. Gupta',
          email: tpoForm.identifier,
          designation: 'Head of Training & Placements (DTU)',
          institution: 'Delhi Technological University',
          role: 'tpo',
          verified: true,
        };
        onLoginSuccess('tpo', tpoPayload);
      } else if (selectedRole === 'recruiter') {
        const recruiterPayload = {
          name: recruiterForm.identifier.includes('microsoft')
            ? 'Satya N. (Campus Lead)'
            : recruiterForm.identifier.includes('zomato')
            ? 'Karan Grover (Talent Partner)'
            : 'Ritu Sen',
          email: recruiterForm.identifier,
          company: recruiterForm.company,
          roleTitle: recruiterForm.roleTitle,
          role: 'recruiter',
          verified: true,
        };
        onLoginSuccess('recruiter', recruiterPayload);
      }
    }, 500);
  };

  // Role metadata configurations
  const roleMeta = {
    student: {
      title: 'Student Placement & Skill Portal',
      subtitle: 'Access your IEEE skill-gap radar, ATS resume scanner, and campus drives.',
      badge: 'Academic Student Login',
      icon: GraduationCap,
      accentColor: '#06b6d4',
      bgGlow: 'rgba(6, 182, 212, 0.15)',
      themeClass: 'theme-student',
    },
    tpo: {
      title: 'Institute & TPO Cell Authority',
      subtitle: 'Placement velocity metrics, cohort deficit heatmap, and NIRF/NAAC reporting.',
      badge: 'University Administrative Access',
      icon: Building2,
      accentColor: '#818cf8',
      bgGlow: 'rgba(99, 102, 241, 0.15)',
      themeClass: 'theme-tpo',
    },
    recruiter: {
      title: 'Corporate Talent & Recruiter Gateway',
      subtitle: 'Source pre-screened engineering talent with 100% verified academic credentials.',
      badge: 'Corporate Partner Access',
      icon: Briefcase,
      accentColor: '#10b981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      themeClass: 'theme-recruiter',
    },
  };

  const currentMeta = roleMeta[selectedRole];
  const IconComponent = currentMeta.icon;

  return (
    <div className={`login-page-container ${currentMeta.themeClass}`}>
      {/* Background glow auras */}
      <div
        className="login-bg-glow"
        style={{ background: `radial-gradient(circle, ${currentMeta.bgGlow} 0%, transparent 70%)` }}
      />

      <div className="login-card-wrapper">
        {/* Top Navigation Row: Back to Home + Role Switcher Tabs */}
        <div className="login-top-nav">
          <button
            className="btn-back-home"
            onClick={() => setActiveRole('home')}
            title="Return to SkillBridge Overview"
          >
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </button>

          {/* Three Separate Portal Switcher Tabs */}
          <div className="role-switch-pills" role="tablist">
            <button
              className={`pill-tab ${selectedRole === 'student' ? 'active student' : ''}`}
              onClick={() => setSelectedRole('student')}
            >
              <GraduationCap size={15} />
              <span>Student Portal</span>
            </button>

            <button
              className={`pill-tab ${selectedRole === 'tpo' ? 'active tpo' : ''}`}
              onClick={() => setSelectedRole('tpo')}
            >
              <Building2 size={15} />
              <span>TPO / Institute</span>
            </button>

            <button
              className={`pill-tab ${selectedRole === 'recruiter' ? 'active recruiter' : ''}`}
              onClick={() => setSelectedRole('recruiter')}
            >
              <Briefcase size={15} />
              <span>Recruiter Hub</span>
            </button>
          </div>
        </div>

        {/* Main Authentication Box */}
        <div className="login-main-card">
          {/* Card Left / Header: Identity & Information */}
          <div className="login-header-section">
            <div
              className="login-icon-avatar"
              style={{
                background: currentMeta.bgGlow,
                color: currentMeta.accentColor,
                borderColor: `${currentMeta.accentColor}44`,
              }}
            >
              <IconComponent size={32} />
            </div>

            <div className="login-role-badge" style={{ color: currentMeta.accentColor, borderColor: `${currentMeta.accentColor}33` }}>
              <ShieldCheck size={14} />
              <span>{currentMeta.badge}</span>
            </div>

            <h1 className="login-heading">{currentMeta.title}</h1>
            <p className="login-subheading">{currentMeta.subtitle}</p>
          </div>

          {/* Card Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="login-error-alert">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Role 1: Student Form */}
            {selectedRole === 'student' && (
              <>
                <div className="form-group">
                  <label className="form-label">Institutional Affiliation</label>
                  <div className="input-with-icon">
                    <School size={17} className="input-icon" />
                    <select
                      className="form-input select"
                      value={studentForm.institution}
                      onChange={(e) => setStudentForm({ ...studentForm, institution: e.target.value })}
                    >
                      <option value="Delhi Technological University (DTU)">Delhi Technological University (DTU)</option>
                      <option value="Netaji Subhas University of Tech (NSUT)">Netaji Subhas University of Tech (NSUT)</option>
                      <option value="Indian Institute of Technology (IIT Delhi)">Indian Institute of Technology (IIT Delhi)</option>
                      <option value="National Institute of Technology (NIT Trichy)">National Institute of Technology (NIT Trichy)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">University Email or Roll Number</label>
                  <div className="input-with-icon">
                    <Mail size={17} className="input-icon" />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 22CS084 or aarav.sharma@dtu.ac.in"
                      value={studentForm.identifier}
                      onChange={(e) => setStudentForm({ ...studentForm, identifier: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-label-row">
                    <label className="form-label">Academic Portal Password</label>
                    <a href="#forgot" className="forgot-link" onClick={(e) => { e.preventDefault(); alert('Demo password is pre-filled. You can also use 1-Click Demo Login below!'); }}>
                      Forgot password?
                    </a>
                  </div>
                  <div className="input-with-icon">
                    <KeyRound size={17} className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Enter your secret password"
                      value={studentForm.password}
                      onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="btn-toggle-pw"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Role 2: TPO Form */}
            {selectedRole === 'tpo' && (
              <>
                <div className="form-group">
                  <label className="form-label">University Placement Cell</label>
                  <div className="input-with-icon">
                    <Building2 size={17} className="input-icon" />
                    <input
                      type="text"
                      className="form-input"
                      value="Delhi Technological University (DTU) — TPO Cell"
                      readOnly
                      style={{ opacity: 0.85, cursor: 'default' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Authorized Faculty Email / Admin ID</label>
                  <div className="input-with-icon">
                    <Mail size={17} className="input-icon" />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. tpo@dtu.ac.in"
                      value={tpoForm.identifier}
                      onChange={(e) => setTpoForm({ ...tpoForm, identifier: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-grid">
                  <div className="form-group">
                    <div className="form-label-row">
                      <label className="form-label">TPO Master Password</label>
                    </div>
                    <div className="input-with-icon">
                      <Lock size={17} className="input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-input"
                        placeholder="••••••••••••"
                        value={tpoForm.password}
                        onChange={(e) => setTpoForm({ ...tpoForm, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Placement Passcode</label>
                    <div className="input-with-icon">
                      <ShieldCheck size={17} className="input-icon" />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="TPO-DTU-8461"
                        value={tpoForm.passcode}
                        onChange={(e) => setTpoForm({ ...tpoForm, passcode: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Role 3: Recruiter Form */}
            {selectedRole === 'recruiter' && (
              <>
                <div className="form-group">
                  <label className="form-label">Corporate Enterprise Partner</label>
                  <div className="input-with-icon">
                    <Building size={17} className="input-icon" />
                    <select
                      className="form-input select"
                      value={recruiterForm.company}
                      onChange={(e) => {
                        const comp = e.target.value;
                        const email =
                          comp === 'Microsoft'
                            ? 'campus@microsoft.com'
                            : comp === 'Zomato'
                            ? 'karan.grover@zomato.com'
                            : comp === 'Amazon'
                            ? 'sde-hiring@amazon.com'
                            : 'talent@razorpay.com';
                        setRecruiterForm({ ...recruiterForm, company: comp, identifier: email });
                      }}
                    >
                      <option value="Razorpay">Razorpay Software Pvt Ltd</option>
                      <option value="Microsoft">Microsoft India Development Center</option>
                      <option value="Zomato">Zomato Limited</option>
                      <option value="Amazon">Amazon Web Services (AWS)</option>
                      <option value="NVIDIA">NVIDIA Graphics</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Corporate Work Email</label>
                  <div className="input-with-icon">
                    <Mail size={17} className="input-icon" />
                    <input
                      type="email"
                      className="form-input"
                      placeholder="e.g. talent@razorpay.com"
                      value={recruiterForm.identifier}
                      onChange={(e) => setRecruiterForm({ ...recruiterForm, identifier: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-label-row">
                    <label className="form-label">Recruiter Portal Password</label>
                    <a href="#forgot" className="forgot-link" onClick={(e) => { e.preventDefault(); alert('Demo password is pre-filled. You can also use 1-Click Demo Login below!'); }}>
                      Forgot password?
                    </a>
                  </div>
                  <div className="input-with-icon">
                    <KeyRound size={17} className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Enter corporate password"
                      value={recruiterForm.password}
                      onChange={(e) => setRecruiterForm({ ...recruiterForm, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="btn-toggle-pw"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Checkbox Options */}
            <div className="login-options-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember this workstation for 30 days</span>
              </label>

              <span className="secure-encryption-badge">
                <ShieldCheck size={13} color="#10b981" />
                <span>256-Bit Encrypted</span>
              </span>
            </div>

            {/* Submit Primary Button */}
            <button
              type="submit"
              className="btn-login-submit"
              disabled={isSubmitting}
              style={{
                background:
                  selectedRole === 'student'
                    ? 'linear-gradient(135deg, #06b6d4, #2563eb)'
                    : selectedRole === 'tpo'
                    ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                    : 'linear-gradient(135deg, #10b981, #059669)',
              }}
            >
              {isSubmitting ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Sign In to {selectedRole === 'student' ? 'Student Portal' : selectedRole === 'tpo' ? 'TPO Admin' : 'Recruiter Gateway'}</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Instant Login Section */}
          <div className="quick-demo-section">
            <div className="quick-demo-header">
              <Sparkles size={14} color="#f59e0b" />
              <span>Instant 1-Click Demo Profiles</span>
            </div>

            {selectedRole === 'student' && (
              <div className="demo-accounts-grid">
                <button
                  type="button"
                  className="btn-demo-account"
                  onClick={() =>
                    handleQuickDemoLogin('student', {
                      name: 'Aarav Sharma',
                      email: 'aarav.sharma@dtu.ac.in',
                      rollNo: '22CS084',
                      cgpa: 8.74,
                      institution: 'Delhi Technological University (DTU)',
                      verified: true,
                    })
                  }
                >
                  <div className="demo-acc-avatar" style={{ background: '#06b6d4' }}>AS</div>
                  <div className="demo-acc-text">
                    <strong>Aarav Sharma (DTU)</strong>
                    <span>B.Tech CSE • CGPA 8.74 • Target: SDE-1</span>
                  </div>
                  <span className="demo-tag">Primary Demo</span>
                </button>

                <button
                  type="button"
                  className="btn-demo-account"
                  onClick={() =>
                    handleQuickDemoLogin('student', {
                      name: 'Priya Verma',
                      email: 'priya.verma@dtu.ac.in',
                      rollNo: '22AI012',
                      cgpa: 9.12,
                      institution: 'Delhi Technological University (DTU)',
                      verified: true,
                    })
                  }
                >
                  <div className="demo-acc-avatar" style={{ background: '#8b5cf6' }}>PV</div>
                  <div className="demo-acc-text">
                    <strong>Priya Verma (AI/ML)</strong>
                    <span>B.Tech AI&DS • CGPA 9.12 • Expert Python</span>
                  </div>
                  <span className="demo-tag">AI Focus</span>
                </button>
              </div>
            )}

            {selectedRole === 'tpo' && (
              <div className="demo-accounts-grid">
                <button
                  type="button"
                  className="btn-demo-account"
                  onClick={() =>
                    handleQuickDemoLogin('tpo', {
                      name: 'Dr. S. K. Gupta',
                      email: 'tpo@dtu.ac.in',
                      designation: 'Head of Training & Placements',
                      institution: 'Delhi Technological University',
                      verified: true,
                    })
                  }
                >
                  <div className="demo-acc-avatar" style={{ background: '#6366f1' }}>SG</div>
                  <div className="demo-acc-text">
                    <strong>Dr. S. K. Gupta</strong>
                    <span>Chief TPO Officer • Delhi Technological University</span>
                  </div>
                  <span className="demo-tag">Admin</span>
                </button>

                <button
                  type="button"
                  className="btn-demo-account"
                  onClick={() =>
                    handleQuickDemoLogin('tpo', {
                      name: 'Prof. Rashmi Saxena',
                      email: 'rashmi.saxena@dtu.ac.in',
                      designation: 'Industry CoE Coordinator',
                      institution: 'Delhi Technological University',
                      verified: true,
                    })
                  }
                >
                  <div className="demo-acc-avatar" style={{ background: '#ec4899' }}>RS</div>
                  <div className="demo-acc-text">
                    <strong>Prof. Rashmi Saxena</strong>
                    <span>Industry MoUs & NVIDIA CoE In-Charge</span>
                  </div>
                  <span className="demo-tag">CoE Lead</span>
                </button>
              </div>
            )}

            {selectedRole === 'recruiter' && (
              <div className="demo-accounts-grid">
                <button
                  type="button"
                  className="btn-demo-account"
                  onClick={() =>
                    handleQuickDemoLogin('recruiter', {
                      name: 'Ritu Sen',
                      email: 'talent@razorpay.com',
                      company: 'Razorpay',
                      roleTitle: 'Engineering Talent Lead',
                      verified: true,
                    })
                  }
                >
                  <div className="demo-acc-avatar" style={{ background: '#10b981' }}>💳</div>
                  <div className="demo-acc-text">
                    <strong>Ritu Sen (Razorpay)</strong>
                    <span>Engineering Talent Lead • Core Banking Drives</span>
                  </div>
                  <span className="demo-tag">Fintech</span>
                </button>

                <button
                  type="button"
                  className="btn-demo-account"
                  onClick={() =>
                    handleQuickDemoLogin('recruiter', {
                      name: 'Satya N.',
                      email: 'campus@microsoft.com',
                      company: 'Microsoft',
                      roleTitle: 'University Campus Recruiter',
                      verified: true,
                    })
                  }
                >
                  <div className="demo-acc-avatar" style={{ background: '#0284c7' }}>🪟</div>
                  <div className="demo-acc-text">
                    <strong>Satya N. (Microsoft)</strong>
                    <span>Azure Cloud Engineering Internships 2026</span>
                  </div>
                  <span className="demo-tag">Big Tech</span>
                </button>
              </div>
            )}
          </div>

          {/* Institutional Trust Notice at Card Bottom */}
          <div className="login-footer-trust">
            <div className="trust-seal-item">
              <ShieldCheck size={14} color="#10b981" />
              <span>DigiLocker / NAD Academic Bank of Credits Aligned</span>
            </div>
            <div className="trust-seal-item">
              <CheckCircle2 size={14} color="#06b6d4" />
              <span>Zero-Fraud ERP Verification Engine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
