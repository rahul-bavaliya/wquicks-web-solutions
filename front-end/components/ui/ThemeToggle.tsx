import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../../types';
import { STRINGS } from '../../utils/strings';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
      theme === 'dark' ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-brand-primary hover:bg-gray-200'
    }`}
    aria-label={STRINGS.accessibility.toggleTheme}
  >
    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);