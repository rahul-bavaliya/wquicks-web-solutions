import React from 'react';
import { Theme } from '../../types';

interface DeskIllustrationProps {
    theme: Theme;
}

export const DeskIllustration: React.FC<DeskIllustrationProps> = ({ theme }) => {
    const isDark = theme === 'dark';
    const primaryColor = '#3b82f6'; // Blue-500
    const secondaryColor = '#8b5cf6'; // Violet-500

    return (
        <div className="w-full relative">
            <svg
                viewBox="0 0 600 450"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-2xl"
            >
                {/* Desk Surface */}
                <rect x="50" y="320" width="500" height="15" rx="7.5" fill={isDark ? '#1e293b' : '#f1f5f9'} />
                <rect x="70" y="335" width="20" height="80" fill={isDark ? '#0f172a' : '#e2e8f0'} />
                <rect x="510" y="335" width="20" height="80" fill={isDark ? '#0f172a' : '#e2e8f0'} />

                {/* Monitor Stand */}
                <rect x="260" y="290" width="80" height="30" fill={isDark ? '#0f172a' : '#e2e8f0'} />
                <rect x="230" y="315" width="140" height="5" fill={isDark ? '#020617' : '#cbd5e1'} />

                {/* Monitor */}
                <rect x="150" y="100" width="300" height="200" rx="10" fill={isDark ? '#020617' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="4" />
                <rect x="160" y="110" width="280" height="160" rx="4" fill={isDark ? '#0f172a' : '#f8fafc'} />

                {/* Screen Content - Code Lines */}
                <rect x="180" y="130" width="100" height="8" rx="4" fill={primaryColor} opacity="0.6" />
                <rect x="180" y="150" width="150" height="8" rx="4" fill={isDark ? '#334155' : '#e2e8f0'} />
                <rect x="180" y="170" width="120" height="8" rx="4" fill={isDark ? '#334155' : '#e2e8f0'} />
                <rect x="200" y="190" width="130" height="8" rx="4" fill={secondaryColor} opacity="0.6" />
                <rect x="200" y="210" width="100" height="8" rx="4" fill={isDark ? '#334155' : '#e2e8f0'} />
                <rect x="180" y="230" width="180" height="8" rx="4" fill={primaryColor} opacity="0.4" />

                {/* Laptop */}
                <rect x="420" y="240" width="100" height="70" rx="4" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="2" />
                <rect x="420" y="305" width="120" height="4" rx="2" fill={isDark ? '#334155' : '#e2e8f0'} transform="rotate(-5, 420, 305)" />

                {/* Mug */}
                <path d="M100 280 H130 V315 Q130 320 125 320 H105 Q100 320 100 315 Z" fill={isDark ? '#1e293b' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="2" />
                <path d="M130 290 Q140 290 140 300 Q140 310 130 310" stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="3" fill="none" />

                {/* Steam */}
                <path d="M110 270 Q115 260 110 250" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" opacity="0.4" className="animate-steam" />
                <path d="M120 275 Q125 265 120 255" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" opacity="0.3" className="animate-steam" style={{ animationDelay: '0.8s' }} />

                {/* Keyboard */}
                <rect x="230" y="305" width="140" height="10" rx="2" fill={isDark ? '#334155' : '#e2e8f0'} />

                {/* Plant */}
                <rect x="480" y="270" width="30" height="40" rx="4" fill="#64748b" />
                <path d="M495 270 Q510 240 530 250" fill="#22c55e" opacity="0.6" />
                <path d="M495 270 Q480 240 460 250" fill="#22c55e" opacity="0.8" />
                <path d="M495 270 Q495 230 510 220" fill="#22c55e" />
            </svg>
        </div>
    );
};
