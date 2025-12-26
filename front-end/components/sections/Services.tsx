import React from 'react';
import { Theme } from '../../types';
import { Code, Smartphone, BarChart, Server, Layout, Shield } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { STRINGS } from '../../utils/strings';
import { Logo } from '../ui/Logo';

interface ServicesProps {
  theme: Theme;
}

const IconMap: Record<string, React.FC<any>> = { Code, Smartphone, BarChart, Server, Layout, Shield };

export const Services: React.FC<ServicesProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="services" className={`relative py-20 sm:py-28 scroll-mt-20 overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Background Refinements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 opacity-[0.04] ${isDark ? 'invert' : ''}`}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotGridLarge" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotGridLarge)" className={isDark ? 'text-white' : 'text-black'} />
          </svg>
        </div>
        <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] bg-brand-primary/5 blur-[140px] rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Logo theme={theme} className="h-6 w-6" />
              <h2 className="text-xs font-black text-brand-primary tracking-[0.5em] uppercase">{STRINGS.services.badge}</h2>
            </div>
            <p className={`text-5xl sm:text-7xl font-black tracking-tighter mb-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {STRINGS.services.title}
            </p>
            <p className={`text-xl lg:text-2xl leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {STRINGS.services.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {STRINGS.services.items.map((service, index) => {
            const Icon = IconMap[service.icon];
            return (
              <ScrollReveal key={service.title} delay={index * 100} direction="up" className="h-full">
                <div className={`group relative h-full p-12 rounded-[3rem] border transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_45px_80px_-20px_rgba(0,0,0,0.12)] ${isDark
                  ? 'bg-slate-950/40 backdrop-blur-2xl border-slate-800 hover:border-brand-primary/40 hover:shadow-brand-primary/10'
                  : 'bg-white border-slate-100 hover:border-brand-primary/30 hover:shadow-slate-300/60'
                  }`}>
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center p-6 bg-brand-primary/10 rounded-[1.5rem] mb-12 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 text-brand-primary`}>
                      <Icon className="h-10 w-10" aria-hidden="true" />
                    </div>
                    <h3 className={`text-3xl font-black mb-6 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {service.title}
                    </h3>
                    <p className={`text-lg lg:text-xl leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {service.description}
                    </p>
                  </div>

                  {/* Subtle hover accent decoration */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-brand-primary/10 to-transparent rounded-tr-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};