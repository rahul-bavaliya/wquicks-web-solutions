import React from 'react';
import { Theme } from '../../types';

interface LogoProps {
    className?: string;
    theme?: Theme;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12 w-12", theme = 'light' }) => {
    const isDark = theme === 'dark';

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Smart Theme-Aware Background Glow */}
            <div className={`absolute inset-0 blur-2xl rounded-full scale-110 transition-all duration-700 opacity-30 ${isDark
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
                    {/* HD Gradient for Dark Mode */}
                    <linearGradient id="hdGradientDark" x1="10" y1="10" x2="110" y2="110">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>

                    {/* HD Gradient for Light Mode */}
                    <linearGradient id="hdGradientLight" x1="10" y1="10" x2="110" y2="110">
                        <stop offset="0%" stopColor="#1d4ed8" />
                        <stop offset="50%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#7c3aed" />
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

                {/* Outer Orbital Ring (Static) */}
                <circle
                    cx="60"
                    cy="60"
                    r="56"
                    stroke={isDark ? "url(#hdGradientDark)" : "url(#hdGradientLight)"}
                    strokeWidth="0.5"
                    strokeDasharray="12 8"
                    strokeOpacity={isDark ? "0.6" : "0.3"}
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
                />

                {/* Glossy Overlay */}
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

                {/* Central W Symbol */}
                <path
                    d="M38 52L48 72L60 56L72 72L82 52"
                    stroke={isDark ? "white" : "#0f172a"}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-sm"
                />
                <path
                    d="M38 52L48 72L60 56L72 72L82 52"
                    stroke={isDark ? "url(#hdGradientDark)" : "url(#hdGradientLight)"}
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mix-blend-soft-light"
                />

                {/* The Q's Power Tail */}
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

                {/* Ambient Data Points (Static) */}


            </svg>
        </div>
    );
};
