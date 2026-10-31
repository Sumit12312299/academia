import React, { useState } from 'react';
import {
  Sparkles,
  GraduationCap,
  Building2,
  Briefcase,
  ShieldCheck,
  Layers,
  Award,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Target,
  TrendingUp,
  BarChart3,
  Users,
  BookOpen,
  Code2,
  Cpu,
  Cloud,
  Search,
  FileText,
  Star,
  Zap,
  ExternalLink,
  ChevronDown,
  HelpCircle,
  Clock,
  MapPin,
  Flame,
  ArrowUpRight,
} from 'lucide-react';
import {
  TARGET_ROLES,
  TPO_CAMPUS_METRICS,
  INDUSTRY_MOUS,
  INITIAL_JOB_POSTINGS,
  UPSKILLING_RESOURCES,
} from '../data/mockData';

export default function HomePage({ setActiveRole, jobs = INITIAL_JOB_POSTINGS, studentProfile }) {
  // Interactive Hero Preview state
  const [heroTab, setHeroTab] = useState('radar'); // 'radar' | 'stats' | 'recruiters'

  // Interactive Quick Skill-Gap Simulator state
  const [selectedSimRole, setSelectedSimRole] = useState(TARGET_ROLES[0].id);

  // FAQ Accordion state
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Active target role for simulator
  const simRoleData = TARGET_ROLES.find((r) => r.id === selectedSimRole) || TARGET_ROLES[0];

  // Calculate simulator match stats
  const simulatedBenchmarkSkills = simRoleData.benchmarkSkills || [];
  const studentSkills = studentProfile?.extractedSkills || [];

  const evaluatedSkills = simulatedBenchmarkSkills.map((bm) => {
    const found = studentSkills.find((s) => s.name.toLowerCase() === bm.name.toLowerCase());
    const studentScore = found ? found.mastery : 30; // demo fallback
    const deficit = Math.max(0, bm.benchmark - studentScore);
    return {
      name: bm.name,
      benchmark: bm.benchmark,
      studentScore,
      deficit,
      status: deficit === 0 ? 'Optimal' : deficit > 30 ? 'High Deficit' : 'Moderate Deficit',
    };
  });

  const avgStudentScore = Math.round(
    evaluatedSkills.reduce((acc, curr) => acc + curr.studentScore, 0) / evaluatedSkills.length
  );
  const avgBenchmark = Math.round(
    evaluatedSkills.reduce((acc, curr) => acc + curr.benchmark, 0) / evaluatedSkills.length
  );
  const matchPercentage = Math.min(100, Math.round((avgStudentScore / avgBenchmark) * 100));

  // Top deficit skill for recommendation
  const topDeficitSkill = evaluatedSkills
    .filter((s) => s.deficit > 0)
    .sort((a, b) => b.deficit - a.deficit)[0]?.name || 'Docker & Containerization';

  const recommendations = UPSKILLING_RESOURCES[topDeficitSkill] || [
    {
      title: 'Practical Industry Masterclass',
      platform: 'NPTEL / Coursera',
      duration: '4-6 Weeks',
      type: 'Accredited Course',
      rating: 4.8,
      url: 'https://nptel.ac.in',
    },
  ];

  // FAQ questions list
  const faqs = [
    {
      id: 1,
      q: 'How does SkillBridge AI calculate the Skill-Gap Radar score?',
      a: 'The platform ingests the student’s academic syllabus, project repositories, verified certifications, and resume entities. It benchmarks their real-time competencies against IEEE-aligned industry skill taxonomies across 8 dimensions. Gaps are mathematically mapped with weighted competency levels required by hiring companies.',
    },
    {
      id: 2,
      q: 'How does Institutional & TPO Verification eliminate fake resume credentials?',
      a: 'Through the TPO Portal, universities link with their official Examination ERP. Backlogs, CGPA, semester grade cards, and official internships are cross-verified and signed with an immutable digital timestamp, granting the student a Verified Academic Badge (Green Shield). Recruiters never encounter forged claims.',
    },
    {
      id: 3,
      q: 'Are NPTEL, Coursera, and micro-credential pathways aligned with NEP 2020?',
      a: 'Yes! National Education Policy (NEP 2020) encourages multidisciplinary learning and credit banks (ABC - Academic Bank of Credits). When students complete recommended NPTEL or Coursera modules to bridge their gaps, colleges can approve academic credits while recruiters view verified competency badges.',
    },
    {
      id: 4,
      q: 'How do Recruiters benefit compared to traditional college placement portals?',
      a: 'Traditional portals flood recruiters with unformatted PDF resumes that require manual shortlisting. SkillBridge AI provides algorithmic skill filtering: recruiters can set minimum CGPA, zero-backlog filters, and mandatory skill proficiencies, receiving an instant, pre-screened candidate pipeline with 90%+ match accuracy.',
    },
    {
      id: 5,
      q: 'Can institutions export data directly for NAAC and NIRF Criterion 5 reporting?',
      a: 'Yes. The TPO portal includes a 1-click export engine that compiles placement rates, median salary benchmarks, higher studies statistics, and corporate MoUs into standard formats ready for NIRF, NAAC (Criterion 5.2.1), and NBA accreditation compliance.',
    },
  ];

  return (
    <div className="homepage-wrapper">
      {/* 1. Live Placement Ticker Bar */}
      <div className="hero-ticker-bar">
        <div className="ticker-label">
          <span className="live-pulsing-dot" />
          <span>LIVE CAMPUS HIRING</span>
        </div>
        <div className="ticker-content">
          <span className="ticker-item">
            🎓 <strong>DTU 2025–26 Season:</strong> 1,049 Placements Confirmed (84.6% Rate) • Highest ₹52 LPA
          </span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">
            💼 <strong>Amazon SDE-1 Drive:</strong> Accepting applications (₹28 — 44 LPA)
          </span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">
            🚀 <strong>Zomato Shortlist:</strong> Aarav Sharma advanced to Technical Round (94% Match)
          </span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">
            🏛️ <strong>Industry CoE:</strong> Google Cloud & NVIDIA AI Labs Active
          </span>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-glow-bg" />
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge-pill">
              <Sparkles size={14} className="sparkle-icon" />
              <span>Next-Gen Academia–Industry Placement Engine • NEP 2020 Aligned</span>
            </div>

            <h1 className="hero-title">
              Bridging Higher Education & Industry with{' '}
              <span className="gradient-text-hero">Intelligent Skill Mapping</span>
            </h1>

            <p className="hero-subtitle">
              The unified digital ecosystem connecting ambitious <strong>Students</strong>, university{' '}
              <strong>Placement Cells (TPO)</strong>, and global <strong>Recruiters</strong>. Featuring
              real-time AI skill-radar intelligence, tamper-proof academic credentials, and automated
              internship-to-placement pathways.
            </p>

            {/* Quick CTAs */}
            <div className="hero-cta-group">
              <button
                id="hero-cta-student"
                className="btn-hero-primary"
                onClick={() => setActiveRole('student')}
              >
                <GraduationCap size={18} />
                <span>Launch Student Portal</span>
                <ArrowRight size={16} />
              </button>

              <button
                id="hero-cta-tpo"
                className="btn-hero-secondary"
                onClick={() => setActiveRole('tpo')}
              >
                <Building2 size={18} />
                <span>Institute & TPO Cell</span>
              </button>

              <button
                id="hero-cta-recruiter"
                className="btn-hero-secondary"
                onClick={() => setActiveRole('recruiter')}
              >
                <Briefcase size={18} />
                <span>Recruiter Portal</span>
              </button>

              <button
                id="hero-cta-ai"
                className="btn-hero-accent"
                onClick={() => setActiveRole('ai_mentor')}
              >
                <Sparkles size={16} />
                <span>Ask AI Mentor</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="hero-trust-row">
              <div className="trust-item">
                <CheckCircle2 size={16} color="#10b981" />
                <span>100% Verified CGPA & Backlogs</span>
              </div>
              <div className="trust-item">
                <ShieldCheck size={16} color="#06b6d4" />
                <span>IEEE Skill Taxonomy Aligned</span>
              </div>
              <div className="trust-item">
                <Award size={16} color="#f59e0b" />
                <span>NAAC & NIRF Criterion 5 Ready</span>
              </div>
            </div>
          </div>

          {/* Right: Live Interactive Hero Showcase Widget */}
          <div className="hero-showcase-panel">
            <div className="showcase-card">
              <div className="showcase-card-header">
                <div className="window-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="showcase-nav-tabs">
                  <button
                    className={`showcase-tab ${heroTab === 'radar' ? 'active' : ''}`}
                    onClick={() => setHeroTab('radar')}
                  >
                    Skill Radar
                  </button>
                  <button
                    className={`showcase-tab ${heroTab === 'stats' ? 'active' : ''}`}
                    onClick={() => setHeroTab('stats')}
                  >
                    Placement Velocity
                  </button>
                  <button
                    className={`showcase-tab ${heroTab === 'recruiters' ? 'active' : ''}`}
                    onClick={() => setHeroTab('recruiters')}
                  >
                    Recruiter View
                  </button>
                </div>
              </div>

              <div className="showcase-card-body">
                {heroTab === 'radar' && (
                  <div className="showcase-tab-content">
                    <div className="student-hero-profile">
                      <div className="student-hero-avatar">AS</div>
                      <div className="student-hero-meta">
                        <div className="student-hero-name">
                          Aarav Sharma <span className="verified-badge">✓ Verified DTU</span>
                        </div>
                        <div className="student-hero-sub">
                          B.Tech CSE • CGPA 8.74 • Target: Full-Stack SDE
                        </div>
                      </div>
                      <div className="match-pill-hero">
                        <Flame size={14} color="#f59e0b" />
                        <span>94% Match</span>
                      </div>
                    </div>

                    <div className="showcase-skills-preview">
                      <div className="preview-skill-row">
                        <div className="skill-name-label">
                          <span>JavaScript / TypeScript</span>
                          <span className="score-val">85% vs 90% benchmark</span>
                        </div>
                        <div className="skill-bar-track">
                          <div className="skill-bar-fill optimal" style={{ width: '85%' }} />
                        </div>
                      </div>

                      <div className="preview-skill-row">
                        <div className="skill-name-label">
                          <span>React / Next.js</span>
                          <span className="score-val">80% vs 85% benchmark</span>
                        </div>
                        <div className="skill-bar-track">
                          <div className="skill-bar-fill optimal" style={{ width: '80%' }} />
                        </div>
                      </div>

                      <div className="preview-skill-row">
                        <div className="skill-name-label">
                          <span>Docker & Containerization</span>
                          <span className="score-val gap">35% vs 70% benchmark (Gap: 35%)</span>
                        </div>
                        <div className="skill-bar-track">
                          <div className="skill-bar-fill gap" style={{ width: '35%' }} />
                        </div>
                      </div>
                    </div>

                    <div className="showcase-action-footer">
                      <div className="rec-box-mini">
                        <Zap size={14} color="#f59e0b" />
                        <span>AI Suggestion: Complete NPTEL 8-Week Docker Lab to gain +14% match</span>
                      </div>
                      <button
                        className="btn-showcase-jump"
                        onClick={() => setActiveRole('student')}
                      >
                        Open Full Radar →
                      </button>
                    </div>
                  </div>
                )}

                {heroTab === 'stats' && (
                  <div className="showcase-tab-content">
                    <div className="tpo-stats-hero-banner">
                      <div className="tpo-stat-unit">
                        <div className="stat-unit-label">Placement Rate</div>
                        <div className="stat-unit-val" style={{ color: '#10b981' }}>84.6%</div>
                        <div className="stat-unit-note">1,049 of 1,240 Placed</div>
                      </div>
                      <div className="tpo-stat-unit">
                        <div className="stat-unit-label">Highest Package</div>
                        <div className="stat-unit-val" style={{ color: '#6366f1' }}>₹52 LPA</div>
                        <div className="stat-unit-note">Global Tech Corp</div>
                      </div>
                      <div className="tpo-stat-unit">
                        <div className="stat-unit-label">Average CTC</div>
                        <div className="stat-unit-val" style={{ color: '#06b6d4' }}>₹11.4 LPA</div>
                        <div className="stat-unit-note">Tier-1 Institute Avg</div>
                      </div>
                    </div>

                    <div className="branch-mini-bars">
                      <div className="branch-row">
                        <span className="b-name">Computer Science (CSE)</span>
                        <div className="b-bar"><div className="b-fill" style={{ width: '94.2%' }} /></div>
                        <span className="b-pct">94.2%</span>
                      </div>
                      <div className="branch-row">
                        <span className="b-name">Information Tech (IT)</span>
                        <div className="b-bar"><div className="b-fill" style={{ width: '92.1%' }} /></div>
                        <span className="b-pct">92.1%</span>
                      </div>
                      <div className="branch-row">
                        <span className="b-name">Electronics (ECE)</span>
                        <div className="b-bar"><div className="b-fill" style={{ width: '84.3%' }} /></div>
                        <span className="b-pct">84.3%</span>
                      </div>
                    </div>

                    <div className="showcase-action-footer">
                      <button
                        className="btn-showcase-jump"
                        style={{ width: '100%', justifyContent: 'center' }}
                        onClick={() => setActiveRole('tpo')}
                      >
                        Explore TPO Placement Heatmap →
                      </button>
                    </div>
                  </div>
                )}

                {heroTab === 'recruiters' && (
                  <div className="showcase-tab-content">
                    <div className="recruiter-preview-header">
                      <span>Pre-Filtered Talent Pool (4 Candidates)</span>
                      <span className="active-filter-tag">CGPA ≥ 8.0 • 0 Backlogs</span>
                    </div>

                    <div className="recruiter-cand-list">
                      <div className="recruiter-cand-row">
                        <div className="cand-rank">#1</div>
                        <div className="cand-info">
                          <div className="cand-name">Sneha Chawla (CSE)</div>
                          <div className="cand-sub">CGPA 8.85 • React, Next.js, AWS</div>
                        </div>
                        <div className="cand-match-tag">96% Match</div>
                      </div>

                      <div className="recruiter-cand-row">
                        <div className="cand-rank">#2</div>
                        <div className="cand-info">
                          <div className="cand-name">Aarav Sharma (CSE)</div>
                          <div className="cand-sub">CGPA 8.74 • TypeScript, Node, SQL</div>
                        </div>
                        <div className="cand-match-tag">94% Match</div>
                      </div>

                      <div className="recruiter-cand-row">
                        <div className="cand-rank">#3</div>
                        <div className="cand-info">
                          <div className="cand-name">Tanvi Malik (IT)</div>
                          <div className="cand-sub">CGPA 9.05 • React, Docker, Tailwind</div>
                        </div>
                        <div className="cand-match-tag">91% Match</div>
                      </div>
                    </div>

                    <div className="showcase-action-footer">
                      <button
                        className="btn-showcase-jump"
                        style={{ width: '100%', justifyContent: 'center' }}
                        onClick={() => setActiveRole('recruiter')}
                      >
                        Launch Recruiter Hiring Dashboard →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. High-Impact Platform Metrics Banner */}
      <section className="metrics-section">
        <div className="metrics-grid">
          <div className="metric-box">
            <div className="metric-icon-wrap" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <Users size={22} />
            </div>
            <div className="metric-number">1,240+</div>
            <div className="metric-label">Active Monitored Students</div>
            <div className="metric-sub">DTU Cohort 2025–26</div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <TrendingUp size={22} />
            </div>
            <div className="metric-number">84.6%</div>
            <div className="metric-label">Campus Placement Velocity</div>
            <div className="metric-sub">1,049 Offers Secured</div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8' }}>
              <Award size={22} />
            </div>
            <div className="metric-number">₹52.0 LPA</div>
            <div className="metric-label">Highest Package Offered</div>
            <div className="metric-sub">Avg CTC ₹11.4 LPA</div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <Building2 size={22} />
            </div>
            <div className="metric-number">118+</div>
            <div className="metric-label">Tier-1 Corporate Partners</div>
            <div className="metric-sub">Razorpay, Amazon, Microsoft, NVIDIA</div>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>
              <ShieldCheck size={22} />
            </div>
            <div className="metric-number">100%</div>
            <div className="metric-label">Tamper-Proof Verification</div>
            <div className="metric-sub">Zero Discrepancy Record</div>
          </div>
        </div>
      </section>

      {/* 4. The 4 Stakeholder Portals (Ecosystem Architecture) */}
      <section className="portals-overview-section">
        <div className="section-header-centered">
          <div className="section-pill-tag">
            <Layers size={13} />
            <span>4-Pillar Unified Architecture</span>
          </div>
          <h2 className="section-title">
            Tailored Experiences for Every Campus Stakeholder
          </h2>
          <p className="section-desc">
            Unlike fragmented legacy systems, SkillBridge AI synchronizes student skills, academic
            administration, and industry recruiters onto one automated intelligence hub.
          </p>
        </div>

        <div className="portals-cards-grid">
          {/* Card 1: Students */}
          <div className="portal-feature-card student-card">
            <div className="card-top-indicator student-accent" />
            <div className="card-icon-circle student-glow">
              <GraduationCap size={26} />
            </div>
            <div className="card-category">For Undergraduates & Aspirants</div>
            <h3 className="card-title">Student Placement Portal</h3>
            <p className="card-description">
              Uncover invisible skill gaps before corporate assessments. Parse resumes with entity
              intelligence, compare against target industry benchmarks, and follow accredited NPTEL/Coursera
              remedies.
            </p>
            <ul className="card-feature-list">
              <li><CheckCircle2 size={14} color="#06b6d4" /> 8-Dimensional Skill-Gap Radar</li>
              <li><CheckCircle2 size={14} color="#06b6d4" /> AI Resume Tokenizer & ATS Matcher</li>
              <li><CheckCircle2 size={14} color="#06b6d4" /> Curated FreeCodeCamp, NPTEL & Coursera Tracks</li>
              <li><CheckCircle2 size={14} color="#06b6d4" /> Real-time Application Pipeline & Interview Tracker</li>
            </ul>
            <button
              className="card-action-btn student-btn"
              onClick={() => setActiveRole('student')}
            >
              <span>Explore Student Portal</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Card 2: Institute / TPO */}
          <div className="portal-feature-card tpo-card">
            <div className="card-top-indicator tpo-accent" />
            <div className="card-icon-circle tpo-glow">
              <Building2 size={26} />
            </div>
            <div className="card-category">For Institutes & Placement Cells</div>
            <h3 className="card-title">TPO & Institutional Hub</h3>
            <p className="card-description">
              Move beyond manual spreadsheets. Monitor campus-wide placement velocity, detect cohort
              skill deficits, verify student marksheets, and generate NIRF & NAAC Criterion-5 audit exports.
            </p>
            <ul className="card-feature-list">
              <li><CheckCircle2 size={14} color="#818cf8" /> Cohort Deficit Heatmap (1,240+ Students)</li>
              <li><CheckCircle2 size={14} color="#818cf8" /> Branch-wise CTC & Offer Distribution</li>
              <li><CheckCircle2 size={14} color="#818cf8" /> Automated Eligibility Filters (CGPA, Backlogs)</li>
              <li><CheckCircle2 size={14} color="#818cf8" /> Corporate MoUs & Industry CoE Tracker</li>
            </ul>
            <button
              className="card-action-btn tpo-btn"
              onClick={() => setActiveRole('tpo')}
            >
              <span>Explore TPO Cell</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Card 3: Recruiter */}
          <div className="portal-feature-card recruiter-card">
            <div className="card-top-indicator recruiter-accent" />
            <div className="card-icon-circle recruiter-glow">
              <Briefcase size={26} />
            </div>
            <div className="card-category">For Corporate & Enterprise Talent</div>
            <h3 className="card-title">Recruiter & Industry Gateway</h3>
            <p className="card-description">
              Hire pre-screened engineering talent with 100% verified academic records. Create placement
              drives, configure role-specific benchmark skill filters, and instantly shortlist top matches.
            </p>
            <ul className="card-feature-list">
              <li><CheckCircle2 size={14} color="#34d399" /> Algorithmic Skill-Verified Search</li>
              <li><CheckCircle2 size={14} color="#34d399" /> Zero Discrepancy Marksheet Guarantee</li>
              <li><CheckCircle2 size={14} color="#34d399" /> Post Campus Drives & Summer Internships</li>
              <li><CheckCircle2 size={14} color="#34d399" /> Real-time Pipeline Stage Progression</li>
            </ul>
            <button
              className="card-action-btn recruiter-btn"
              onClick={() => setActiveRole('recruiter')}
            >
              <span>Explore Recruiter Portal</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Card 4: AI Career Mentor */}
          <div className="portal-feature-card ai-card">
            <div className="card-top-indicator ai-accent" />
            <div className="card-icon-circle ai-glow">
              <Sparkles size={26} />
            </div>
            <div className="card-category">Generative Intelligence System</div>
            <h3 className="card-title">AI Career & Placement Mentor</h3>
            <p className="card-description">
              Trained on 2026 industry hiring patterns and Tier-1 engineering interview benchmarks.
              Get personalized 3-week acceleration plans, mock interview answers, and strategic career roadmaps.
            </p>
            <ul className="card-feature-list">
              <li><CheckCircle2 size={14} color="#f59e0b" /> Real-time Hiring Signals (2026 Trends)</li>
              <li><CheckCircle2 size={14} color="#f59e0b" /> Targeted 3-Week Skill Gap Closing Sprints</li>
              <li><CheckCircle2 size={14} color="#f59e0b" /> Tailored Feedback on Resume Project Impact</li>
              <li><CheckCircle2 size={14} color="#f59e0b" /> Interactive Career Q&A with Preloaded Prompts</li>
            </ul>
            <button
              className="card-action-btn ai-btn"
              onClick={() => setActiveRole('ai_mentor')}
            >
              <span>Launch AI Mentor</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Interactive Live Feature: "Quick Skill-Gap Simulator" */}
      <section className="simulator-section">
        <div className="simulator-inner-box">
          <div className="simulator-header">
            <div className="sim-badge">
              <Target size={14} />
              <span>Interactive Live Preview</span>
            </div>
            <h2 className="sim-title">Test Your Career Match Score Right Now</h2>
            <p className="sim-subtitle">
              Select an industry job profile to simulate how SkillBridge AI calculates competency
              match percentages, identifies critical deficits, and suggests accredited course solutions.
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="sim-role-tabs">
            {TARGET_ROLES.map((role) => (
              <button
                key={role.id}
                className={`sim-role-btn ${selectedSimRole === role.id ? 'active' : ''}`}
                onClick={() => setSelectedSimRole(role.id)}
              >
                <span className="role-btn-title">{role.title}</span>
                <span className="role-btn-pkg">{role.avgPackage}</span>
              </button>
            ))}
          </div>

          {/* Simulator Content Grid */}
          <div className="sim-content-grid">
            {/* Left: Evaluated Benchmark Skills */}
            <div className="sim-skills-col">
              <div className="sim-col-header">
                <span style={{ fontWeight: 600 }}>Skill Competency Evaluation</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Aarav Sharma vs {simRoleData.category}
                </span>
              </div>

              <div className="sim-skills-list">
                {evaluatedSkills.slice(0, 5).map((skill, idx) => (
                  <div key={idx} className="sim-skill-item">
                    <div className="sim-skill-top">
                      <span className="sim-skill-name">{skill.name}</span>
                      <span
                        className={`sim-status-tag ${
                          skill.deficit === 0
                            ? 'tag-good'
                            : skill.deficit > 30
                            ? 'tag-bad'
                            : 'tag-med'
                        }`}
                      >
                        {skill.deficit === 0 ? 'Optimal' : `-${skill.deficit}% Gap`}
                      </span>
                    </div>

                    <div className="sim-skill-bar-wrapper">
                      <div className="bar-track">
                        <div
                          className="bar-student"
                          style={{ width: `${skill.studentScore}%` }}
                          title={`Student: ${skill.studentScore}%`}
                        />
                        <div
                          className="bar-benchmark-marker"
                          style={{ left: `${skill.benchmark}%` }}
                          title={`Benchmark: ${skill.benchmark}%`}
                        />
                      </div>
                      <div className="bar-legend">
                        <span>Current: {skill.studentScore}%</span>
                        <span>Required: {skill.benchmark}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Score Card & Recommendations */}
            <div className="sim-result-col">
              <div className="sim-match-circle-card">
                <div className="match-circle-graphic">
                  <svg className="progress-ring" width="120" height="120">
                    <circle
                      className="progress-ring-circle-bg"
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="8"
                      fill="transparent"
                      r="50"
                      cx="60"
                      cy="60"
                    />
                    <circle
                      className="progress-ring-circle"
                      stroke={matchPercentage >= 80 ? '#10b981' : matchPercentage >= 65 ? '#6366f1' : '#f59e0b'}
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - matchPercentage / 100)}`}
                      strokeLinecap="round"
                      fill="transparent"
                      r="50"
                      cx="60"
                      cy="60"
                    />
                  </svg>
                  <div className="match-circle-text">
                    <span className="pct-num">{matchPercentage}%</span>
                    <span className="pct-sub">Fit Score</span>
                  </div>
                </div>

                <div className="sim-match-details">
                  <div className="sim-role-name">{simRoleData.title}</div>
                  <div className="sim-growth-tag">
                    <TrendingUp size={13} color="#10b981" />
                    <span>Demand: {simRoleData.demandGrowth} • Package: {simRoleData.avgPackage}</span>
                  </div>
                  <p className="sim-desc-text">{simRoleData.description}</p>
                </div>
              </div>

              {/* Instant Course Recommendation Box */}
              <div className="sim-rec-box">
                <div className="sim-rec-header">
                  <BookOpen size={16} color="#06b6d4" />
                  <span>Primary Gap Identified: <strong>{topDeficitSkill}</strong></span>
                </div>
                <div className="sim-courses-list">
                  {recommendations.slice(0, 2).map((rec, i) => (
                    <div key={i} className="sim-course-item">
                      <div className="course-main">
                        <div className="course-title">{rec.title}</div>
                        <div className="course-meta">
                          <span>{rec.platform}</span> • <span>{rec.duration}</span> • <span>⭐ {rec.rating}</span>
                        </div>
                      </div>
                      <a
                        href={rec.url}
                        target="_blank"
                        rel="noreferrer"
                        className="course-link-btn"
                        title="Visit Course"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  ))}
                </div>

                <button
                  className="btn-deep-dive"
                  onClick={() => setActiveRole('student')}
                >
                  <span>Launch Deep-Dive in Student Portal</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Comparison: Traditional Campus Hiring vs SkillBridge AI */}
      <section className="comparison-section">
        <div className="section-header-centered">
          <div className="section-pill-tag">
            <Zap size={13} />
            <span>The Paradigm Shift</span>
          </div>
          <h2 className="section-title">
            Why Traditional Campus Placement Systems Fail
          </h2>
          <p className="section-desc">
            Manual resumes, forged project claims, and unguided students result in missed placement
            cycles and recruiter fatigue. SkillBridge AI introduces radical efficiency.
          </p>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Dimension</th>
                <th className="th-legacy">❌ Traditional College Placement Cell</th>
                <th className="th-ai">✨ SkillBridge AI Intelligent Platform</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-dim">
                  <FileText size={16} color="var(--primary)" />
                  <strong>Resume Evaluation</strong>
                </td>
                <td className="col-legacy">
                  Static PDF resumes dumped into email folders. Students copy buzzwords without true competency.
                </td>
                <td className="col-ai">
                  <strong>Automated Entity Extraction:</strong> Skills, projects, and certifications are tokenized and scored against real benchmarks.
                </td>
              </tr>
              <tr>
                <td className="col-dim">
                  <Target size={16} color="#06b6d4" />
                  <strong>Skill-Gap Visibility</strong>
                </td>
                <td className="col-legacy">
                  Zero advance visibility. Students find out they lack cloud/DevOps skills only after getting rejected.
                </td>
                <td className="col-ai">
                  <strong>Real-Time Radar & Deficit Mapping:</strong> Proactive alerts point out missing competencies months before company visits.
                </td>
              </tr>
              <tr>
                <td className="col-dim">
                  <ShieldCheck size={16} color="#10b981" />
                  <strong>Credential Authenticity</strong>
                </td>
                <td className="col-legacy">
                  Frequent marksheet discrepancies and inflated CGPA claims; requires weeks of manual verification.
                </td>
                <td className="col-ai">
                  <strong>University ERP Integration:</strong> Immutable digital timestamps & TPO verification seals guarantee 100% authentic records.
                </td>
              </tr>
              <tr>
                <td className="col-dim">
                  <BarChart3 size={16} color="#818cf8" />
                  <strong>Institutional Reporting</strong>
                </td>
                <td className="col-legacy">
                  Scattered Excel files; TPOs spend 200+ hours manually aggregating stats for NIRF and NAAC visits.
                </td>
                <td className="col-ai">
                  <strong>1-Click NAAC & NIRF Criterion 5 Export:</strong> Instant cohort analytics, placement percentages, and median salary reports.
                </td>
              </tr>
              <tr>
                <td className="col-dim">
                  <Briefcase size={16} color="#f59e0b" />
                  <strong>Recruiter Shortlisting</strong>
                </td>
                <td className="col-legacy">
                  Recruiters sift through 500+ irrelevant applications or administer generic aptitude tests.
                </td>
                <td className="col-ai">
                  <strong>Algorithmic Talent Filtering:</strong> Instant shortlists of pre-qualified, zero-backlog candidates matching specific tech stacks.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Corporate Partners & Active Drives */}
      <section className="partners-section">
        <div className="section-header-centered">
          <div className="section-pill-tag">
            <Building2 size={13} />
            <span>Corporate Ecosystem</span>
          </div>
          <h2 className="section-title">
            118+ Global Technology Partners & Active Drives
          </h2>
          <p className="section-desc">
            Top engineering enterprises actively run on-campus placement drives and industry CoE
            collaborations through SkillBridge.
          </p>
        </div>

        {/* Live Job Cards Grid */}
        <div className="home-jobs-grid">
          {jobs.slice(0, 4).map((job) => (
            <div key={job.id} className="home-job-card">
              <div className="job-card-top">
                <span className="job-company-icon">{job.logo}</span>
                <div className="job-header-text">
                  <h4 className="job-title-text">{job.title}</h4>
                  <div className="job-company-name">{job.company}</div>
                </div>
              </div>

              <div className="job-badge-row">
                <span className="job-pill">{job.type}</span>
                <span className="job-pill" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                  💰 {job.packageRange}
                </span>
                <span className="job-pill">📍 {job.location}</span>
              </div>

              <p className="job-desc-snippet">{job.description}</p>

              <div className="job-skills-snippet">
                {job.requiredSkills.slice(0, 3).map((sk, idx) => (
                  <span key={idx} className="skill-tag-mini">{sk}</span>
                ))}
                {job.requiredSkills.length > 3 && (
                  <span className="skill-tag-mini more">+{job.requiredSkills.length - 3}</span>
                )}
              </div>

              <div className="job-card-bottom">
                <div className="job-applicants-count">
                  <Users size={13} />
                  <span>{job.applicantsCount} Applicants</span>
                </div>
                <button
                  className="btn-apply-mini"
                  onClick={() => setActiveRole('student')}
                >
                  <span>Apply Now</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Industry MoUs & CoEs */}
        <div className="mous-banner-strip">
          <div className="mous-header-strip">
            <Award size={18} color="#f59e0b" />
            <span>Active Institutional MoUs & Centers of Excellence (CoE)</span>
          </div>
          <div className="mous-items-row">
            {INDUSTRY_MOUS.map((mou) => (
              <div key={mou.id} className="mou-mini-card">
                <div className="mou-title">{mou.partner}</div>
                <div className="mou-domain">{mou.domain}</div>
                <div className="mou-funding">{mou.fundedAmount}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Success Stories & Testimonials */}
      <section className="testimonials-section">
        <div className="section-header-centered">
          <div className="section-pill-tag">
            <Star size={13} />
            <span>Success Stories</span>
          </div>
          <h2 className="section-title">
            Transforming Academic Futures at Scale
          </h2>
          <p className="section-desc">
            Hear from placed students, university leadership, and engineering recruitment partners.
          </p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-quote">
              "The Skill Radar pinpointed that I was 35% short in Docker and Containerization 2 months
              before campus drives started. I took the recommended NPTEL course, updated my profile,
              and scored an interview with Zomato at ₹22 LPA!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}>
                AS
              </div>
              <div className="author-meta">
                <div className="author-name">Aarav Sharma</div>
                <div className="author-role">B.Tech CSE '26 • Placed at Zomato</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-quote">
              "Managing 1,240 students across 5 branches used to mean thousands of unverified marksheets.
              With SkillBridge AI, our TPO cell has zero marksheet fraud, and our NAAC Criterion-5 audit
              reports take 5 minutes instead of 3 weeks."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
                SG
              </div>
              <div className="author-meta">
                <div className="author-name">Dr. S. K. Gupta</div>
                <div className="author-role">Head of Training & Placements (DTU)</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-quote">
              "Finding candidates with genuine full-stack experience was like searching for a needle in
              a haystack. SkillBridge’s verified radar score let our engineering team filter top talent in 10
              seconds. We hired 8 top engineers in one drive."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899)' }}>
                RS
              </div>
              <div className="author-meta">
                <div className="author-name">Ritu Sen</div>
                <div className="author-role">Lead Tech Recruiter • Razorpay</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Interactive FAQ Accordion */}
      <section className="faq-section">
        <div className="section-header-centered">
          <div className="section-pill-tag">
            <HelpCircle size={13} />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="section-title">Everything You Need to Know</h2>
          <p className="section-desc">
            Got questions about how the radar calculations, university verification, and AI counselor work?
          </p>
        </div>

        <div className="faq-accordion-container">
          {faqs.map((faq) => {
            const isOpen = expandedFaq === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-item ${isOpen ? 'open' : ''}`}
                onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
              >
                <div className="faq-question-row">
                  <span className="faq-question-text">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="faq-arrow-icon"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </div>
                {isOpen && (
                  <div className="faq-answer-row">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. High-Impact Call to Action Banner */}
      <section className="cta-banner-section">
        <div className="cta-banner-inner">
          <div className="cta-bg-glow" />
          <div className="cta-content">
            <div className="cta-pill">
              <Zap size={14} color="#f59e0b" />
              <span>Ready for the 2026 Placement Cycle?</span>
            </div>
            <h2 className="cta-title">
              Empower Your Students & Accelerate Campus Recruitments
            </h2>
            <p className="cta-subtitle">
              Join leading higher education institutions and corporate recruiters transforming
              engineering placements with transparent skill intelligence.
            </p>
            <div className="cta-buttons-group">
              <button
                className="btn-cta-white"
                onClick={() => setActiveRole('student')}
              >
                <GraduationCap size={18} />
                <span>Enter as Student (Aarav)</span>
              </button>
              <button
                className="btn-cta-outline"
                onClick={() => setActiveRole('tpo')}
              >
                <Building2 size={18} />
                <span>Enter as TPO Admin</span>
              </button>
              <button
                className="btn-cta-outline"
                onClick={() => setActiveRole('recruiter')}
              >
                <Briefcase size={18} />
                <span>Enter as Recruiter</span>
              </button>
              <button
                className="btn-cta-accent"
                onClick={() => setActiveRole('ai_mentor')}
              >
                <Sparkles size={16} />
                <span>Ask AI Placement Mentor</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
