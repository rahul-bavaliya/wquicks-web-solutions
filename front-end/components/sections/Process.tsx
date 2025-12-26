import React from 'react';
import { Theme } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { STRINGS } from '../../utils/strings';

interface ProcessProps {
  theme: Theme;
}

export const Process: React.FC<ProcessProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <section id="process" className={`py-20 lg:py-28 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black text-brand-primary tracking-[0.5em] uppercase mb-8">{STRINGS.process.badge}</h2>
            <p className={`text-5xl sm:text-7xl font-black tracking-tighter mb-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {STRINGS.process.title}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent -translate-y-1/2 z-0"></div>

          {STRINGS.process.steps.map((step, index) => (
            <ScrollReveal key={step.id} delay={index * 150} direction="up" className="relative z-10">
              <div className={`h-full p-10 rounded-[3rem] border transition-all duration-500 hover:-translate-y-4 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'
                }`}>
                <span className="text-6xl font-black text-brand-primary/10 block mb-8">{step.id}</span>
                <h4 className={`text-2xl font-black mb-6 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{step.title}</h4>
                <p className={`text-lg font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};