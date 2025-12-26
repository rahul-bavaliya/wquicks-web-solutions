import React from 'react';
import { Theme } from '../../types';

interface LogoProps {
    className?: string;
    theme?: Theme;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12 w-12", theme = 'light' }) => {
    const isDark = theme === 'dark';

    return (
        <div className={`relative flex items-center justify-center group ${className}`}>
            {/* Smart Theme-Aware Background Glow */}
            <div className={`absolute inset-0 blur-2xl rounded-full scale-110 transition-all duration-700 opacity-30 group-hover:opacity-60 ${isDark
                    ? 'bg-gradient-to-tr from-brand-primary via-blue-500 to-brand-secondary'
                    : 'bg-gradient-to-tr from-brand-primary/40 via-blue-400/30 to-brand-secondary/40'
                }`}></div>

            <svg
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full relative z-10 filter drop-shadow-2xl"
            >
                <defs>
                    {/* HD Gradient for Dark Mode (Brighter, more vibrant) */}
                    <linearGradient id="hdGradientDark" x1="10" y1="10" x2="110" y2="110">
                        <stop offset="0%" stopColor="#60a5fa" /> {/* Sky 400 */}
                        <stop offset="50%" stopColor="#3b82f6" /> {/* Blue 500 */}
                        <stop offset="100%" stopColor="#a855f7" /> {/* Purple 500 */}
                    </linearGradient>

                    {/* HD Gradient for Light Mode (Deeper, more contrast) */}
                    <linearGradient id="hdGradientLight" x1="10" y1="10" x2="110" y2="110">
                        <stop offset="0%" stopColor="#1d4ed8" /> {/* Blue 700 */}
                        <stop offset="50%" stopColor="#2563eb" /> {/* Blue 600 */}
                        <stop offset="100%" stopColor="#7c3aed" /> {/* Violet 600 */}
                    </linearGradient>

                    {/* Dynamic Inner Glass Refraction */}
                    <linearGradient id="glassRefraction" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity={isDark ? "0.3" : "0.6"} />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>

                    <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation={isDark ? "3" : "1.5"} result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Outer Orbital Ring - Adaptive opacity */}
                <circle
                    cx="60"
                    cy="60"
                    r="56"
                    stroke={isDark ? "url(#hdGradientDark)" : "url(#hdGradientLight)"}
                    strokeWidth="0.5"
                    strokeDasharray="12 8"
                    strokeOpacity={isDark ? "0.6" : "0.3"}
                    className="animate-[spin_15s_linear_infinite]"
                />

                {/* Main 3D Cylinder / Ring Base (The Q) */}
                <circle
                    cx="60"
                    cy="60"
                    r="48"
                    stroke={isDark ? "url(#hdGradientDark)" : "url(#hdGradientLight)"}
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#logoGlow)"
                    className="transition-all duration-500"
                />

                {/* Glossy Overlay for that "Premium Polish" */}
                <circle
                    cx="60"
                    cy="60"
                    r="48"
                    stroke="url(#glassRefraction)"
                    strokeWidth="8"
                    strokeDasharray="180 360"
                    strokeLinecap="round"
                    className="mix-blend-overlay rotate-[45deg]"
                />

                {/* Central W Symbol - Stronger contrast in light mode */}
                <path
                    d="M38 52L48 72L60 56L72 72L82 52"
                    stroke={isDark ? "white" : "#0f172a"}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-sm transition-colors duration-500"
                />
                <path
                    d="M38 52L48 72L60 56L72 72L82 52"
                    stroke={isDark ? "url(#hdGradientDark)" : "url(#hdGradientLight)"}
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mix-blend-soft-light transition-all duration-500"
                />

                {/* The Q's Power Tail / Acceleration Spike */}
                <path
                    d="M82 82L102 102"
                    stroke={isDark ? "url(#hdGradientDark)" : "url(#hdGradientLight)"}
                    strokeWidth="12"
                    strokeLinecap="round"
                    filter="url(#logoGlow)"
                />

                {/* Core Lighting Highlight */}
                <path
                    d="M84 84L96 96"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeOpacity={isDark ? "0.5" : "0.8"}
                />

                {/* Ambient Data Points (Tech details) */}
                <circle
                    cx="60" cy="12" r="2.5"
                    fill={isDark ? "#60a5fa" : "#3b82f6"}
                    className="animate-pulse shadow-blue-500"
                />
                <circle
                    cx="108" cy="60" r="2.5"
                    fill={isDark ? "#a855f7" : "#7c3aed"}
                    style={{ animationDelay: '1s' }}
                    className="animate-pulse"
                />
            </svg>
        </div>
    );
};
