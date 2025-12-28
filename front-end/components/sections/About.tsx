import React from 'react';
import { Theme } from '../../types';
import { STRINGS } from '../../utils/strings';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Logo } from '../ui/Logo';

interface AboutProps {
  theme: Theme;
}

export const About: React.FC<AboutProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <section id="about" className={`py-20 lg:py-28 overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal direction="right">
              <div className="relative">
                <div className={`absolute -inset-4 rounded-[4rem] blur-2xl opacity-20 bg-brand-primary`}></div>
                <div className={`relative rounded-[3rem] overflow-hidden border ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <img
                    src="/regina-hq.png"
                    alt="WQuicks Regina Headquarters overlooking the Saskatchewan Legislative Building skyline"
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="order-1 lg:order-2">
            <ScrollReveal direction="left">
              <div className="flex items-center gap-3 mb-8">
                <Logo theme={theme} className="h-6 w-6" />
                <h2 className="text-xs font-black text-brand-primary tracking-[0.5em] uppercase">{STRINGS.about.badge}</h2>
              </div>
              <h3 className={`text-4xl lg:text-6xl font-black tracking-tighter mb-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {STRINGS.about.title}
              </h3>
              <p className={`text-xl lg:text-2xl leading-relaxed font-medium mb-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {STRINGS.about.description1}
              </p>
              <p className={`text-lg lg:text-xl leading-relaxed font-medium mb-12 opacity-80 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {STRINGS.about.description2}
              </p>

              <div className="grid grid-cols-2 gap-8">
                {STRINGS.about.stats.map((stat, i) => (
                  <div key={i} className="group">
                    <p className="text-4xl lg:text-5xl font-black text-brand-primary mb-2 group-hover:scale-110 transition-transform origin-left">{stat.value}</p>
                    <p className={`text-sm font-black tracking-widest uppercase opacity-60 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};