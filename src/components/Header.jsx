import React from 'react';
import {
  Home,
  GraduationCap,
  Building2,
  Briefcase,
  Sparkles,
  Sun,
  Moon,
  RotateCcw,
  Bell,
  CheckCircle2,
  LogOut,
  Lock,
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
  const isStudentLoggedIn = !!authUsers.student;
  const isTpoLoggedIn = !!authUsers.tpo;
  const isRecruiterLoggedIn = !!authUsers.recruiter;

  const roles = [
    { id: 'home', label: 'Home / Overview', icon: Home, badge: 'Hub' },
    {
      id: 'student',
      label: 'Student Portal',
      icon: GraduationCap,
      badge: isStudentLoggedIn ? (authUsers.student.name ? authUsers.student.name.split(' ')[0] : 'Aarav') : 'Sign In',
      isLoggedIn: isStudentLoggedIn,
    },
    {
      id: 'tpo',
      label: 'Institute / TPO Cell',
      icon: Building2,
      badge: isTpoLoggedIn ? 'DTU Admin' : 'Sign In',
      isLoggedIn: isTpoLoggedIn,
    },
    {
      id: 'recruiter',
      label: 'Industry & Recruiters',
      icon: Briefcase,
      badge: isRecruiterLoggedIn ? authUsers.recruiter.company : 'Sign In',
      isLoggedIn: isRecruiterLoggedIn,
    },
    {
      id: 'ai_mentor',
      label: 'AI Career Mentor',
      icon: Sparkles,
      badge: 'Free / Open',
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

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand */}
        <div className="brand-wrapper" onClick={() => setActiveRole('home')}>
          <div className="brand-logo-icon">
            <Sparkles size={22} />
          </div>
          <div>
            <div className="brand-title">
              SkillBridge AI
            </div>
            <div className="brand-subtitle">
              Academia–Industry Collaboration & Placement Portal
            </div>
          </div>
        </div>

        {/* Role Selector Tabs */}
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
                <IconComponent size={16} />
                <span>{r.label}</span>
                {r.badge && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      padding: '0.1rem 0.4rem',
                      borderRadius: 'var(--radius-full)',
                      background: isActive
                        ? 'rgba(255, 255, 255, 0.2)'
                        : r.badge === 'Sign In'
                        ? 'rgba(244, 63, 94, 0.15)'
                        : 'var(--bg-glass-active)',
                      color: isActive
                        ? '#fff'
                        : r.badge === 'Sign In'
                        ? '#f43f5e'
                        : 'var(--text-muted)',
                      border: r.badge === 'Sign In' ? '1px solid rgba(244, 63, 94, 0.3)' : 'none',
                    }}
                  >
                    {r.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <button
            className="icon-btn"
            title="Reset to Initial Demo State"
            onClick={resetDemoData}
            aria-label="Reset Demo Data"
          >
            <RotateCcw size={16} />
          </button>

          <button
            className="icon-btn"
            title={isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {isDarkTheme ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* User Status / Badge */}
          <div
            className="user-badge-header"
            title="Authenticated Session Status"
          >
            <div className="avatar-circle">
              {activeRole === 'student' && (currentRoleAuth ? currentRoleAuth.name.slice(0, 2).toUpperCase() : 'ST')}
              {activeRole === 'tpo' && (currentRoleAuth ? 'SG' : 'TP')}
              {activeRole === 'recruiter' && (currentRoleAuth ? 'HR' : 'RC')}
              {activeRole === 'ai_mentor' && 'AI'}
              {activeRole === 'home' && 'HUB'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {activeRole === 'home' && 'DTU Central Hub'}
                {activeRole === 'ai_mentor' && 'AI Career Counselor (Open)'}
                {activeRole === 'student' && (currentRoleAuth ? currentRoleAuth.name : 'Student Login')}
                {activeRole === 'tpo' && (currentRoleAuth ? currentRoleAuth.name : 'TPO Admin Login')}
                {activeRole === 'recruiter' && (currentRoleAuth ? `${currentRoleAuth.name} (${currentRoleAuth.company})` : 'Recruiter Login')}
                {currentRoleAuth && <CheckCircle2 size={13} color="#10b981" />}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {activeRole === 'home' && 'All 4 Portals Synchronized'}
                {activeRole === 'ai_mentor' && 'Model v4.5 • No Login Required'}
                {activeRole === 'student' && (currentRoleAuth ? `${currentRoleAuth.rollNo} • CGPA ${currentRoleAuth.cgpa}` : 'Authentication Required')}
                {activeRole === 'tpo' && (currentRoleAuth ? 'DTU Placement Head' : 'Faculty Passcode Required')}
                {activeRole === 'recruiter' && (currentRoleAuth ? currentRoleAuth.roleTitle : 'Corporate Work Email Required')}
              </span>
            </div>

            {/* Logout button if logged into active role */}
            {currentRoleAuth && (
              <button
                className="btn-header-logout"
                title={`Log out from ${activeRole} portal`}
                onClick={() => onLogout(activeRole)}
                aria-label="Log out"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
