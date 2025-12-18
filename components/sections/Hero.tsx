import React from 'react';
import { Theme } from '../../types';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { DeskIllustration } from '../ui/DeskIllustration';
import { STRINGS } from '../../utils/strings';

interface HeroProps {
  theme: Theme;
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  return (
    <section className={`relative overflow-hidden pt-28 pb-32 lg:pt-48 lg:pb-56 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Decorative Background - Calm & Atmospheric */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[60%] bg-brand-secondary/5 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] bg-brand-primary/5 blur-[100px] rounded-full animate-blob" style={{ animationDelay: '2s' }}></div>
        
        {/* Subtle Floating Accents */}
        <div className="absolute top-1/4 left-12 opacity-[0.03] animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-24 h-24 rounded-3xl border-2 border-brand-primary transform rotate-12"></div>
        </div>
        <div className="absolute bottom-1/4 right-24 opacity-[0.03] animate-float-delayed">
           <div className={`w-40 h-40 border-2 border-brand-secondary rounded-full`}></div>
        </div>
        
        {/* Grid Overlay */}
        <div className={`absolute inset-0 opacity-[0.03] ${isDark ? 'invert' : ''}`} style={{ backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div className="text-left">
            <ScrollReveal delay={100} direction="up">
              <div className="inline-flex items-center px-5 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-[10px] font-black tracking-[0.3em] uppercase mb-12">
                <span className="flex h-1.5 w-1.5 rounded-full bg-brand-secondary mr-3 animate-pulse"></span>
                {STRINGS.hero.badge}
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200} direction="up">
              <h1 className={`text-6xl lg:text-9xl tracking-tighter font-black leading-[0.85] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className="block opacity-90 mb-2">{STRINGS.hero.titleLine1}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                  {STRINGS.hero.titleLine2}
                </span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={300} direction="up">
              <p className={`mt-12 text-xl lg:text-2xl max-w-lg leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {STRINGS.hero.description}
              </p>
            </ScrollReveal>

            <div className="mt-16 flex flex-col sm:flex-row gap-8">
              <ScrollReveal delay={400} direction="up" className="w-full sm:w-auto">
                <a 
                  href="#contact" 
                  onClick={(e) => handleScroll(e, 'contact')} 
                  className="group relative inline-flex items-center justify-center px-12 py-5 font-black text-white transition-all duration-300 bg-brand-primary rounded-2xl hover:bg-brand-secondary focus:ring-4 focus:ring-brand-primary/20 shadow-2xl shadow-brand-primary/30 hover:-translate-y-1.5"
                >
                  {STRINGS.hero.ctaPrimary}
                  <ArrowRight className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </a>
              </ScrollReveal>
              
              <ScrollReveal delay={500} direction="up" className="w-full sm:w-auto">
                <a 
                  href="#portfolio" 
                  onClick={(e) => handleScroll(e, 'portfolio')} 
                  className={`inline-flex items-center justify-center px-12 py-5 font-black rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1.5 ${
                    isDark 
                      ? 'border-slate-800 text-slate-300 hover:bg-slate-800' 
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {STRINGS.hero.ctaSecondary}
                </a>
              </ScrollReveal>
            </div>
          </div>

          <div className="hidden lg:flex justify-center md:justify-end relative">
             <ScrollReveal delay={600} direction="left" className="w-full max-w-2xl">
               <div className="relative group">
                 {/* Decorative Glow */}
                 <div className="absolute -inset-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full opacity-[0.07] blur-[100px] group-hover:opacity-10 transition-opacity duration-1000"></div>
                 <DeskIllustration theme={theme} />
               </div>
             </ScrollReveal>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scroll-up { 0% { transform: translateY(0); } 100% { transform: translateY(-120px); } }
        @keyframes steam { 0% { opacity: 0; transform: translateY(0); } 50% { opacity: 0.6; } 100% { opacity: 0; transform: translateY(-10px); } }
        .animate-scroll-up { animation: scroll-up 3s linear infinite; }
        .animate-steam { animation: steam 2.5s ease-out infinite; }
      `}</style>
    </section>
  );
};