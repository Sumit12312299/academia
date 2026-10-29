import React from 'react';
import {
  GraduationCap,
  Building2,
  Briefcase,
  Sparkles,
  Sun,
  Moon,
  RotateCcw,
  Bell,
  CheckCircle2,
} from 'lucide-react';

export default function Header({
  activeRole,
  setActiveRole,
  isDarkTheme,
  toggleTheme,
  resetDemoData,
  notificationsCount = 3,
}) {
  const roles = [
    { id: 'student', label: 'Student Portal', icon: GraduationCap, badge: 'Aarav' },
    { id: 'tpo', label: 'Institute / TPO Cell', icon: Building2, badge: 'DTU' },
    { id: 'recruiter', label: 'Industry & Recruiters', icon: Briefcase, badge: 'Hiring' },
    { id: 'ai_mentor', label: 'AI Career Mentor', icon: Sparkles, badge: 'GenAI' },
  ];

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand */}
        <div className="brand-wrapper" onClick={() => setActiveRole('student')}>
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
                      background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-glass-active)',
                      color: isActive ? '#fff' : 'var(--text-muted)',
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

          <div
            className="user-badge-header"
            title="Authenticated Session: Verified Institutional Profile"
          >
            <div className="avatar-circle">DTU</div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {activeRole === 'student' && 'Aarav Sharma'}
                {activeRole === 'tpo' && 'TPO Admin (DTU)'}
                {activeRole === 'recruiter' && 'Talent Partner'}
                {activeRole === 'ai_mentor' && 'AI Counselor'}
                <CheckCircle2 size={13} color="#10b981" />
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {activeRole === 'student' && 'B.Tech CSE • CGPA 8.74'}
                {activeRole === 'tpo' && 'Training & Placement'}
                {activeRole === 'recruiter' && 'Verified Corporate'}
                {activeRole === 'ai_mentor' && 'Model v4.5 Active'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
