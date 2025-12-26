import React from 'react';
import { Theme } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { STRINGS } from '../../utils/strings';

interface PortfolioProps {
  theme: Theme;
}

export const Portfolio: React.FC<PortfolioProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <section id="portfolio" className={`py-20 lg:py-28 scroll-mt-20 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <ScrollReveal direction="up">
          <div className="text-center mb-24">
            <h2 className={`text-5xl lg:text-7xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {STRINGS.portfolio.titlePrefix} <span className="text-brand-primary">{STRINGS.portfolio.titleHighlight}</span>
            </h2>
            <p className={`mt-8 max-w-2xl mx-auto text-xl lg:text-2xl font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {STRINGS.portfolio.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STRINGS.portfolio.items.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100} direction="up" className="h-full">
              <div className="group relative h-full">
                <div className={`w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden relative border transition-all duration-500 transform hover:-translate-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'
                  }`}>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className={`w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110 ${project.isLogo ? 'object-contain p-12 bg-white' : 'object-cover'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="w-fit px-4 py-1.5 mb-3 text-[10px] font-black text-white bg-brand-primary rounded-full uppercase tracking-[0.2em] shadow-lg">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-black text-white leading-tight">{project.title}</h3>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};