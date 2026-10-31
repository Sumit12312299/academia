import React, { useState } from 'react';
import {
  Home,
  GraduationCap,
  Building2,
  Briefcase,
  Sparkles,
  Sun,
  Moon,
  RotateCcw,
  CheckCircle2,
  LogOut,
  LogIn,
  ShieldCheck,
  User,
  ChevronDown,
} from 'lucide-react';

export default function Header({
  activeRole,
  setActiveRole,
  isDarkTheme,
  toggleTheme,
  resetDemoData,
  authUsers = {},
  onLogout,
}) {
  const [showPortalMenu, setShowPortalMenu] = useState(false);

  const isStudentLoggedIn = !!authUsers.student;
  const isTpoLoggedIn = !!authUsers.tpo;
  const isRecruiterLoggedIn = !!authUsers.recruiter;

  const roles = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      badge: null,
    },
    {
      id: 'student',
      label: 'Student',
      icon: GraduationCap,
      badge: isStudentLoggedIn ? (authUsers.student.name ? authUsers.student.name.split(' ')[0] : 'Aarav') : 'Sign In',
      isLoggedIn: isStudentLoggedIn,
    },
    {
      id: 'tpo',
      label: 'TPO Cell',
      icon: Building2,
      badge: isTpoLoggedIn ? 'Admin' : 'Sign In',
      isLoggedIn: isTpoLoggedIn,
    },
    {
      id: 'recruiter',
      label: 'Recruiters',
      icon: Briefcase,
      badge: isRecruiterLoggedIn ? (authUsers.recruiter.company || 'Partner') : 'Sign In',
      isLoggedIn: isRecruiterLoggedIn,
    },
    {
      id: 'ai_mentor',
      label: 'AI Mentor',
      icon: Sparkles,
      badge: 'Free',
    },
  ];

  const currentRoleAuth =
    activeRole === 'student'
      ? authUsers.student
      : activeRole === 'tpo'
      ? authUsers.tpo
      : activeRole === 'recruiter'
      ? authUsers.recruiter
      : null;

  const isCurrentRoleProtected = ['student', 'tpo', 'recruiter'].includes(activeRole);

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand */}
        <div className="brand-wrapper" onClick={() => setActiveRole('home')}>
          <div className="brand-logo-icon">
            <Sparkles size={22} />
          </div>
          <div className="brand-text-block">
            <div className="brand-title">
              SkillBridge AI
            </div>
            <div className="brand-subtitle">
              Academia–Industry Collaboration
            </div>
          </div>
        </div>

        {/* Role Selector Tabs with Balanced Typography & Prominent Icons */}
        <nav className="role-nav" aria-label="Role Portals">
          {roles.map((r) => {
            const IconComponent = r.icon;
            const isActive = activeRole === r.id;
            return (
              <button
                key={r.id}
                id={`role-btn-${r.id}`}
                className={`role-pill-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveRole(r.id)}
              >
                <IconComponent size={19} className="nav-role-icon" />
                <span className="nav-role-label">{r.label}</span>
                {r.badge && (
                  <span
                    className={`nav-role-badge ${isActive ? 'active' : ''} ${r.badge === 'Sign In' ? 'signin-badge' : ''}`}
                  >
                    {r.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Actions & Revamped Right-Side Login Widget */}
        <div className="header-actions">
          {/* Theme Switcher */}
          <button
            className="icon-btn"
            title={isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Reset Demo Data */}
          <button
            className="icon-btn"
            title="Reset to Initial State"
            onClick={resetDemoData}
            aria-label="Reset Demo Data"
          >
            <RotateCcw size={17} />
          </button>

          {/* Beautiful Right-Side Login / Auth Profile Widget */}
          {isCurrentRoleProtected && !currentRoleAuth ? (
            /* State 1: On a protected role but not logged in -> High-Affordance Login Button */
            <button
              className="btn-header-login-cta"
              onClick={() => setActiveRole(activeRole)}
              title={`Sign in to ${activeRole === 'student' ? 'Student' : activeRole === 'tpo' ? 'TPO' : 'Recruiter'} Portal`}
            >
              <div className="login-btn-icon-bubble">
                <LogIn size={15} />
              </div>
              <div className="login-btn-text">
                <span className="login-btn-title">
                  {activeRole === 'student' ? 'Student Login' : activeRole === 'tpo' ? 'TPO Login' : 'Recruiter Login'}
                </span>
                <span className="login-btn-sub">Sign in with credentials</span>
              </div>
            </button>
          ) : currentRoleAuth ? (
            /* State 2: Authenticated Session -> Verified Profile Card with Logout */
            <div className="user-badge-header verified-card">
              <div className="avatar-circle-ring">
                <div className="avatar-circle">
                  {activeRole === 'student'
                    ? currentRoleAuth.name.slice(0, 2).toUpperCase()
                    : activeRole === 'tpo'
                    ? 'SG'
                    : 'HR'}
                </div>
                <span className="online-status-dot" />
              </div>

              <div className="user-badge-meta">
                <span className="user-badge-name">
                  {currentRoleAuth.name}
                  <CheckCircle2 size={13} color="#10b981" />
                </span>
                <span className="user-badge-sub">
                  {activeRole === 'student' && `${currentRoleAuth.rollNo || '22CS084'} • CGPA ${currentRoleAuth.cgpa || 8.74}`}
                  {activeRole === 'tpo' && 'DTU Placement Head'}
                  {activeRole === 'recruiter' && (currentRoleAuth.company || 'Corporate Partner')}
                </span>
              </div>

              <button
                className="btn-header-logout"
                title={`Log out from ${activeRole}`}
                onClick={() => onLogout(activeRole)}
                aria-label="Log out"
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            /* State 3: On Home / AI Mentor -> Universal Portal Gateway Widget */
            <div className="portal-access-header-widget">
              <button
                className="btn-portal-gateway"
                onClick={() => setShowPortalMenu(!showPortalMenu)}
                title="Quick Portal Sign In"
              >
                <div className="gateway-icon-box">
                  <ShieldCheck size={16} />
                </div>
                <div className="gateway-text-block">
                  <span className="gateway-title">DTU Campus Hub</span>
                  <span className="gateway-sub">All Portals Ready</span>
                </div>
                <ChevronDown size={14} className="gateway-chevron" />
              </button>

              {/* Quick Dropdown Menu for Direct Portal Access */}
              {showPortalMenu && (
                <div className="portal-dropdown-menu">
                  <div className="menu-header">Quick Portal Access</div>
                  <button
                    className="menu-item-btn"
                    onClick={() => {
                      setActiveRole('student');
                      setShowPortalMenu(false);
                    }}
                  >
                    <GraduationCap size={16} color="#06b6d4" />
                    <div className="item-text">
                      <strong>Student Portal</strong>
                      <span>{isStudentLoggedIn ? 'Session Active (Aarav)' : 'Requires Student Login'}</span>
                    </div>
                  </button>
                  <button
                    className="menu-item-btn"
                    onClick={() => {
                      setActiveRole('tpo');
                      setShowPortalMenu(false);
                    }}
                  >
                    <Building2 size={16} color="#818cf8" />
                    <div className="item-text">
                      <strong>Institute & TPO Cell</strong>
                      <span>{isTpoLoggedIn ? 'Session Active (Admin)' : 'Requires Faculty Passcode'}</span>
                    </div>
                  </button>
                  <button
                    className="menu-item-btn"
                    onClick={() => {
                      setActiveRole('recruiter');
                      setShowPortalMenu(false);
                    }}
                  >
                    <Briefcase size={16} color="#10b981" />
                    <div className="item-text">
                      <strong>Recruiter Gateway</strong>
                      <span>{isRecruiterLoggedIn ? 'Session Active (Partner)' : 'Corporate Work Email'}</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
