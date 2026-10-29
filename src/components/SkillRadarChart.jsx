import React, { useState } from 'react';

/**
 * Interactive SVG Radar (Spider) Chart
 * Visualizes Student Skills vs Industry Benchmark for target roles.
 */
export default function SkillRadarChart({ studentSkills = [], benchmarkSkills = [], roleTitle = '' }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Combine benchmark skills with student's current mastery
  const skillData = benchmarkSkills.map((bm) => {
    const studentMatch = studentSkills.find(
      (s) => s.name.toLowerCase() === bm.name.toLowerCase()
    );
    return {
      name: bm.name,
      benchmark: bm.benchmark,
      student: studentMatch ? studentMatch.mastery : 20, // default minimal baseline if missing
      gap: studentMatch ? Math.max(0, bm.benchmark - studentMatch.mastery) : bm.benchmark - 20,
    };
  });

  const totalAxes = skillData.length;
  if (totalAxes < 3) return null;

  const size = 380;
  const center = size / 2;
  const radius = center - 55;
  const angleSlice = (Math.PI * 2) / totalAxes;

  // Helper to calculate coordinates from polar values
  const getCoordinates = (value, index) => {
    const r = (value / 100) * radius;
    const angle = index * angleSlice - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Generate polygon points
  const benchmarkPoints = skillData
    .map((d, i) => {
      const { x, y } = getCoordinates(d.benchmark, i);
      return `${x},${y}`;
    })
    .join(' ');

  const studentPoints = skillData
    .map((d, i) => {
      const { x, y } = getCoordinates(d.student, i);
      return `${x},${y}`;
    })
    .join(' ');

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="studentRadarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="benchmarkRadarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Circular / Polygonal Grid Lines */}
        {gridLevels.map((lvl) => {
          const points = skillData
            .map((_, i) => {
              const { x, y } = getCoordinates(lvl, i);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={`grid-${lvl}`}
              points={points}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              strokeDasharray={lvl === 100 ? 'none' : '3 3'}
            />
          );
        })}

        {/* Axes Lines */}
        {skillData.map((_, i) => {
          const { x, y } = getCoordinates(100, i);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* Benchmark Area (Required Industry Level) */}
        <polygon
          points={benchmarkPoints}
          fill="url(#benchmarkRadarGrad)"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Student Current Skill Area */}
        <polygon
          points={studentPoints}
          fill="url(#studentRadarGrad)"
          stroke="#06b6d4"
          strokeWidth="2.5"
          filter="drop-shadow(0px 0px 8px rgba(6, 182, 212, 0.5))"
        />

        {/* Interactive Data Points for Student */}
        {skillData.map((d, i) => {
          const { x, y } = getCoordinates(d.student, i);
          const isHovered = hoveredSkill?.name === d.name;
          return (
            <circle
              key={`pt-std-${i}`}
              cx={x}
              cy={y}
              r={isHovered ? 7 : 4.5}
              fill={d.student >= d.benchmark ? '#10b981' : '#06b6d4'}
              stroke="#fff"
              strokeWidth="2"
              style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={() => setHoveredSkill(d)}
              onMouseLeave={() => setHoveredSkill(null)}
            />
          );
        })}

        {/* Axis Labels */}
        {skillData.map((d, i) => {
          const { x, y } = getCoordinates(116, i);
          const angle = i * angleSlice - Math.PI / 2;
          const textAnchor = Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';

          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y + 4}
              textAnchor={textAnchor}
              fill={hoveredSkill?.name === d.name ? '#38bdf8' : '#94a3b8'}
              fontSize="10"
              fontWeight={hoveredSkill?.name === d.name ? '700' : '500'}
              fontFamily="var(--font-body)"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredSkill(d)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {d.name.length > 18 ? `${d.name.substring(0, 16)}...` : d.name}
            </text>
          );
        })}
      </svg>

      {/* Legend & Hover Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#06b6d4', display: 'inline-block' }}></span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Your Skills</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f59e0b', border: '1px dashed #f59e0b', display: 'inline-block' }}></span>
          <span style={{ color: 'var(--text-muted)' }}>Industry Benchmark ({roleTitle})</span>
        </div>
      </div>

      {hoveredSkill && (
        <div
          style={{
            marginTop: '0.75rem',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-hover)',
            fontSize: '0.82rem',
            color: 'var(--text-main)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <span style={{ fontWeight: 700, color: '#38bdf8' }}>{hoveredSkill.name}:</span>
          <span>Current: <strong>{hoveredSkill.student}%</strong></span>
          <span>•</span>
          <span>Benchmark: <strong>{hoveredSkill.benchmark}%</strong></span>
          <span>•</span>
          <span style={{ color: hoveredSkill.gap > 0 ? '#fb7185' : '#34d399', fontWeight: 600 }}>
            {hoveredSkill.gap > 0 ? `Gap: -${hoveredSkill.gap}%` : 'Benchmark Met! ✓'}
          </span>
        </div>
      )}
    </div>
  );
}
