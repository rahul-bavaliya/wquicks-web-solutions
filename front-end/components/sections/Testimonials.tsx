import React from 'react';
import { Theme } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { STRINGS } from '../../utils/strings';
import { Quote } from 'lucide-react';

interface TestimonialsProps {
  theme: Theme;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <section className={`py-20 lg:py-28 relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Visual Decoration */}
      <div className={`absolute top-0 right-0 p-32 pointer-events-none opacity-[0.03] ${isDark ? 'invert' : ''}`}>
        <Quote className="w-96 h-96 text-black" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black text-brand-primary tracking-[0.5em] uppercase mb-8">{STRINGS.testimonials.badge}</h2>
            <p className={`text-5xl font-black tracking-tighter mb-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {STRINGS.testimonials.title}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {STRINGS.testimonials.items.map((item, index) => (
            <ScrollReveal key={index} delay={index * 150} direction="up">
              <div className={`h-full flex flex-col p-12 rounded-[3.5rem] border transition-all duration-500 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
                }`}>
                <Quote className="h-10 w-10 text-brand-primary mb-10 opacity-20" />
                <p className={`text-xl lg:text-2xl leading-relaxed italic font-medium mb-12 flex-grow ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{item.text}"
                </p>
                <div>
                  <p className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.author}</p>
                  <p className={`text-sm font-black tracking-widest uppercase opacity-60 ${isDark ? 'text-brand-primary' : 'text-brand-secondary'}`}>
                    {item.role}
                  </p>
                  <p className={`text-xs font-medium mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{item.location}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};