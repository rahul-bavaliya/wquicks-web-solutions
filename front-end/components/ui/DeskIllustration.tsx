import React from 'react';
import { Theme } from '../../types';

export const DeskIllustration: React.FC<{ theme: Theme }> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <div className="relative w-full max-w-lg aspect-[4/3]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-primary/5 rounded-full blur-2xl transition-all duration-700"></div>
      <svg 
        viewBox="0 0 800 600" 
        className="w-full h-full drop-shadow-xl" 
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration of a modern digital workspace featuring a monitor with code, a smartphone, and a coffee cup, representing web development services."
      >
        <defs>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <clipPath id="screenContentClip">
            <rect x="425" y="165" width="230" height="140" rx="4" />
          </clipPath>
          <clipPath id="phoneScreenClip">
            <rect x="682" y="252" width="36" height="66" rx="2" />
          </clipPath>
        </defs>

        <ellipse cx="550" cy="540" rx="280" ry="25" fill={isDark ? "#000" : "#cbd5e0"} opacity="0.4" filter="blur(8px)"/>

        <rect x="380" y="320" width="12" height="200" rx="2" fill={isDark ? "#2d3748" : "#cbd5e0"} />
        <rect x="700" y="320" width="12" height="200" rx="2" fill={isDark ? "#2d3748" : "#cbd5e0"} />
        <rect x="330" y="345" width="12" height="200" rx="2" fill={isDark ? "#1a202c" : "#a0aec0"} />
        <rect x="760" y="345" width="12" height="200" rx="2" fill={isDark ? "#1a202c" : "#a0aec0"} />

        <path d="M350,320 L750,320 L780,345 L320,345 Z" fill={isDark ? "#4a5568" : "#e2e8f0"} />
        <rect x="320" y="345" width="460" height="15" fill={isDark ? "#2d3748" : "#cbd5e0"} />

        <path d="M520,320 L520,290 L530,290 L530,320" fill="#2d3748" />
        <rect x="500" y="320" width="60" height="4" rx="1" fill="#4a5568" />

        <rect x="415" y="155" width="250" height="160" rx="6" fill="#1a202c" />
        <rect x="425" y="165" width="230" height="140" rx="2" fill="url(#screenGrad)" />
        
        <g clipPath="url(#screenContentClip)">
          <g className="animate-scroll-up">
              <rect x="435" y="175" width="60" height="6" rx="2" fill="var(--brand-primary)" opacity="0.9" />
              <rect x="500" y="175" width="80" height="6" rx="2" fill="#3b82f6" opacity="0.9" />
              <rect x="435" y="190" width="140" height="6" rx="2" fill="#10b981" opacity="0.9" />
              <rect x="455" y="205" width="40" height="6" rx="2" fill="#f59e0b" opacity="0.9" />
              <rect x="500" y="205" width="100" height="6" rx="2" fill="#8b5cf6" opacity="0.9" />
              <rect x="435" y="225" width="70" height="6" rx="2" fill="var(--brand-secondary)" opacity="0.9" />
              <rect x="435" y="315" width="60" height="6" rx="2" fill="var(--brand-primary)" opacity="0.9" />
              <rect x="500" y="315" width="80" height="6" rx="2" fill="#3b82f6" opacity="0.9" />
          </g>
          <path d="M425,165 L500,165 L460,305 L425,305 Z" fill="white" opacity="0.05" />
        </g>

        <g>
          <rect x="680" y="250" width="40" height="70" rx="6" fill="#1a202c" stroke={isDark ? "#4a5568" : "#cbd5e0"} strokeWidth="1.5" />
          <rect x="682" y="252" width="36" height="66" rx="4" fill="#0f172a" />
          <g clipPath="url(#phoneScreenClip)">
              <rect x="682" y="252" width="36" height="10" fill="#3b82f6" />
              <circle cx="700" cy="280" r="8" fill="var(--brand-primary)" opacity="0.9" className="animate-pulse" />
              <rect x="688" y="300" width="24" height="4" rx="2" fill="#94a3b8" />
              <rect x="688" y="310" width="16" height="4" rx="2" fill="#94a3b8" />
              <circle cx="715" cy="255" r="3" fill="var(--brand-secondary)" />
          </g>
        </g>

        <g transform="translate(620, 310)">
          <path d="M5,0 L5,20 Q5,25 10,25 L20,25 Q25,25 25,20 L25,0 Z" fill="#ea580c" />
          <path d="M25,8 Q30,8 30,12 Q30,16 25,16" stroke="#ea580c" strokeWidth="3" fill="none" />
          <g className="animate-steam" opacity="0.6">
              <path d="M10,-5 Q15,-10 10,-15" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M20,-8 Q25,-13 20,-18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
};