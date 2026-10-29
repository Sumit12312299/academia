import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  TrendingUp,
  Award,
  Zap,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { AI_MENTOR_PRESETS } from '../data/mockData';

export default function AiMentorView({ studentProfile }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${studentProfile.name}! I am your **AI Placement & Career Intelligence Mentor**. I analyze current hiring rubrics from over 110 corporate partners, identify specific gaps in your resume, and recommend high-impact upskilling pathways. How can I help you today?`,
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Check presets or generate contextual AI response
    setTimeout(() => {
      let aiResponse = '';
      const lower = query.toLowerCase();

      const matchedPreset = AI_MENTOR_PRESETS.find(
        (p) => lower.includes(p.query.toLowerCase()) || p.query.toLowerCase().includes(lower)
      );

      if (matchedPreset) {
        aiResponse = matchedPreset.answer;
      } else if (lower.includes('interview') || lower.includes('prepare')) {
        aiResponse = `Here are 3 key technical interview preparation steps for your target roles:
1. **Core Problem Solving (DSA):** Focus on Array/String two-pointer patterns, Trees/Graphs (BFS/DFS), and Dynamic Programming basics.
2. **System Design & API Contracts:** Be prepared to explain how your project "EduSphere" handles WebSocket connection scaling and RESTful caching.
3. **Database Performance:** Practice writing complex SQL queries with GROUP BY, indexing strategies, and normalization (3NF) in PostgreSQL.`;
      } else if (lower.includes('resume') || lower.includes('project')) {
        aiResponse = `Your resume currently highlights **EduSphere** and **CryptoTracker**. To make it stand out to tier-1 recruiters:
- Add quantifiable production metrics: e.g., *"Engineered real-time collaboration with <80ms latency for 1,000+ users."*
- Highlight your containerization workflow: Include Docker multi-stage build instructions.
- Ensure your GitHub repositories have clean READMEs with architecture diagrams and live deployment URLs.`;
      } else {
        aiResponse = `Based on current campus placement hiring criteria for your department (${studentProfile.department}) and CGPA (${studentProfile.cgpa}):
- Your academic profile is strong with zero active backlogs.
- To maximize placement probability in 15+ LPA drives, prioritize completing hands-on projects with **Docker & Kubernetes** and **AWS Cloud Services**.
- Connect with your faculty coordinator for the Google Cloud CoE to claim your complimentary certification vouchers.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="ai-mentor-view-container">
      {/* Top Banner */}
      <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span className="badge badge-primary">
                <Sparkles size={12} /> GenAI Career Guidance
              </span>
              <span className="badge badge-success">Live Neural Model Hub</span>
            </div>
            <h2>AI Placement Mentor & Career Intelligence</h2>
            <p>Real-time conversational mentor powered by campus placement intelligence and recruiter feedback.</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Model Pipeline</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8' }}>Semantic RAG + LLM</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        {/* Chat Interface */}
        <div
          className="glass-panel"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '620px',
            padding: 0,
            overflow: 'hidden',
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'var(--bg-glass-active)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--cyan))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  SkillBridge AI Career Assistant
                </div>
                <div style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                  Online • Knowledge base synced with 118 hiring partners
                </div>
              </div>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {messages.map((m, idx) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: isAi ? 'row' : 'row-reverse',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isAi ? 'linear-gradient(135deg, var(--primary), var(--cyan))' : 'var(--bg-glass-active)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isAi ? '#fff' : 'var(--text-main)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {isAi ? <Bot size={16} /> : <User size={16} />}
                  </div>

                  <div
                    style={{
                      maxWidth: '82%',
                      padding: '0.85rem 1.15rem',
                      borderRadius: 'var(--radius-lg)',
                      background: isAi ? 'var(--bg-card-hover)' : 'linear-gradient(135deg, var(--primary), #4f46e5)',
                      color: isAi ? 'var(--text-main)' : '#fff',
                      border: isAi ? '1px solid var(--border-subtle)' : 'none',
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {m.text}
                    <div
                      style={{
                        fontSize: '0.7rem',
                        color: isAi ? 'var(--text-faint)' : 'rgba(255, 255, 255, 0.7)',
                        marginTop: '0.4rem',
                        textAlign: isAi ? 'left' : 'right',
                      }}
                    >
                      {m.time}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--bg-glass-active)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bot size={16} color="#06b6d4" />
                </div>
                <div
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Analyzing skill ontology and drafting career recommendation...
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div
            style={{
              padding: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-glass-active)',
              display: 'flex',
              gap: '0.75rem',
            }}
          >
            <input
              type="text"
              placeholder="Ask about interview prep, skill gaps, resume critique, or salary benchmarks..."
              className="form-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="btn btn-primary"
              onClick={() => handleSend()}
              disabled={isTyping || !inputText.trim()}
            >
              <Send size={15} />
            </button>
          </div>
        </div>

        {/* Right: Suggested Prompts & Live Intelligence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-panel">
            <h3 style={{ marginBottom: '0.5rem' }}>Frequently Asked Placement Questions</h3>
            <p style={{ fontSize: '0.82rem', marginBottom: '1rem' }}>
              Click any prompt to get instant verified guidance:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {AI_MENTOR_PRESETS.map((item, idx) => (
                <button
                  key={idx}
                  className="btn btn-outline"
                  style={{
                    textAlign: 'left',
                    justifyContent: 'space-between',
                    padding: '0.8rem 1rem',
                    fontSize: '0.84rem',
                  }}
                  onClick={() => handleSend(item.query)}
                >
                  <span>{item.query}</span>
                  <ArrowRight size={14} color="#06b6d4" />
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel">
            <h3 style={{ marginBottom: '0.75rem' }}>Live Placement Market Signals (2026)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem' }}>
              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-card-hover)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  gap: '0.6rem',
                }}
              >
                <TrendingUp size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <div>
                  <strong>GenAI & Vector Search:</strong> Mentioning RAG or pgvector in candidate projects led to a <strong>+43% higher shortlisting rate</strong> in product-firm coding tests.
                </div>
              </div>

              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-card-hover)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  gap: '0.6rem',
                }}
              >
                <Zap size={18} color="#f59e0b" style={{ flexShrink: 0 }} />
                <div>
                  <strong>DevOps Baseline:</strong> 72% of full-stack technical rounds now include at least one Dockerfile containerization question.
                </div>
              </div>

              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-card-hover)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  gap: '0.6rem',
                }}
              >
                <ShieldCheck size={18} color="#06b6d4" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Institutional Verification:</strong> Candidates with verified TPO profiles experience zero document delay in offer letter issuance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
