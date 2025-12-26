import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../../types';

interface ThemeToggleProps {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className={`relative p-2 rounded-xl transition-all duration-300 group ${isDark
                    ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            aria-label="Toggle Theme"
        >
            <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
                {isDark ? (
                    <Sun className="h-5 w-5 animate-in zoom-in duration-300" />
                ) : (
                    <Moon className="h-5 w-5 animate-in zoom-in duration-300" />
                )}
            </div>

            {/* Tooltip */}
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
        </button>
    );
};
