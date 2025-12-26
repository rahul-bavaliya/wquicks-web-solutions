import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Theme } from '../../types';
import { Logo } from '../ui/Logo';
import { STRINGS } from '../../utils/strings';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: STRINGS.nav.about, href: '#about' },
    { name: STRINGS.nav.services, href: '#services' },
    { name: STRINGS.nav.process, href: '#process' },
    { name: STRINGS.nav.portfolio, href: '#portfolio' },
    { name: STRINGS.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
      ? (isDark ? 'bg-slate-950/80 border-b border-slate-800' : 'bg-white/80 border-b border-slate-100') + ' py-4 backdrop-blur-xl shadow-sm'
      : 'bg-transparent py-8'
      }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-2 bg-brand-primary/5 rounded-2xl group-hover:bg-brand-primary/10 transition-colors duration-300">
              <Logo theme={theme} className="h-14 w-14 transition-all duration-300" />
            </div>
            <span className={`ml-4 font-black text-2xl tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {STRINGS.general.brandName}<span className="text-brand-primary">{STRINGS.general.brandNameHighlight}</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[11px] font-black tracking-[0.25em] uppercase transition-all duration-300 hover:text-brand-primary cursor-pointer ${isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center space-x-6 border-l pl-10 border-slate-200 dark:border-slate-800">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="px-6 py-3 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/20 hover:-translate-y-0.5"
              >
                Inquiry
              </a>
            </div>
          </div>

          <div className="flex items-center md:hidden gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-xl transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-slate-950/90 backdrop-blur-md`} onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm shadow-2xl p-10 flex flex-col transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center">
              <Logo theme={theme} className="h-12 w-12 mr-4" />
              <span className={`font-black text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{STRINGS.general.fullBrandName}</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              <X size={32} />
            </button>
          </div>
          <nav className="flex flex-col space-y-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="mt-12 px-10 py-5 bg-brand-primary text-white text-center text-lg font-black rounded-2xl shadow-2xl shadow-brand-primary/20"
            >
              Get Started
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};