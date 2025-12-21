import React, { useState } from 'react';
import { Theme } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { STRINGS } from '../../utils/strings';
import { Plus, Minus } from 'lucide-react';

interface FAQProps { theme: Theme; }

export const FAQ: React.FC<FAQProps> = ({ theme }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isDark = theme === 'dark';

  return (
    <section id="faq" className={`py-32 lg:py-48 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
        <ScrollReveal direction="up">
          <div className="text-center mb-24">
            <h2 className="text-xs font-black text-brand-primary tracking-[0.5em] uppercase mb-8">{STRINGS.faq.badge}</h2>
            <p className={`text-5xl lg:text-6xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {STRINGS.faq.title}
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {STRINGS.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 50} direction="up">
                <div className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                  isDark 
                    ? `border-slate-800 ${isOpen ? 'bg-slate-900/40' : 'bg-transparent'}` 
                    : `border-slate-100 ${isOpen ? 'bg-slate-50' : 'bg-transparent'}`
                }`}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-10 py-10 flex justify-between items-center text-left"
                  >
                    <span className={`text-xl lg:text-2xl font-black tracking-tight pr-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.question}
                    </span>
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-brand-primary text-white rotate-180' : 'bg-brand-primary/10 text-brand-primary'
                    }`}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-10' : 'max-h-0 opacity-0'}`}>
                    <div className={`px-10 text-lg lg:text-xl leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {item.answer}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};