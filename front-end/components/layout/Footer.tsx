import React from 'react';
import { Theme } from '../../types';
import { Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { STRINGS } from '../../utils/strings';

interface FooterProps {
  theme: Theme;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="col-span-1 md:col-span-3">
            <div className="flex items-center group mb-6">
              <Logo theme={theme} className="h-16 w-16 mr-4 transition-transform duration-500 group-hover:scale-110" />
              <span className={`font-black text-3xl tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {STRINGS.general.brandName}<span className="text-brand-primary transition-colors duration-500">{STRINGS.general.brandNameHighlight}</span>
              </span>
            </div>
            <p className={`mt-4 max-w-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {STRINGS.footer.description}
            </p>
          </div>

          <div>
            <h3 className={`text-sm font-semibold tracking-wider uppercase ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
              {STRINGS.footer.headers.contact}
            </h3>
            <ul className="mt-4 space-y-2">
              <li className={`flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <Mail className="h-4 w-4 mr-2" />
                <a href={`mailto:${STRINGS.general.email}`} className="hover:text-brand-primary transition-colors">{STRINGS.general.email}</a>
              </li>
              <li className={`flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <Phone className="h-4 w-4 mr-2" />
                <a href={`tel:${STRINGS.general.phoneValue}`} className="hover:text-brand-primary transition-colors">{STRINGS.general.phoneDisplay}</a>
              </li>
              <li className={`flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <MapPin className="h-4 w-4 mr-2" />
                {STRINGS.general.location}
              </li>
            </ul>
          </div>
          {/* Follow Social Media ***Start*** */}
          {/* <div>
            <h3 className={`text-sm font-semibold tracking-wider uppercase ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
              {STRINGS.footer.headers.social}
            </h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-brand-primary">
                <span className="sr-only">{STRINGS.footer.aria.github}</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-primary">
                <span className="sr-only">{STRINGS.footer.aria.linkedin}</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div> */}
          {/* Follow Social Media ***End*** */}
        </div>

        <div className={`mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            {STRINGS.footer.copyright}
          </p>
          <a href="/admin" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-opacity">Management Console</a>
        </div>
      </div>
    </footer>
  );
};