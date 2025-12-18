import React, { useState, useRef } from 'react';
import { Theme } from '../../types';
import { Mail, Phone, MapPin, Loader2, CheckCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { STRINGS } from '../../utils/strings';

interface ContactProps {
  theme: Theme;
}

export const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus('loading');

    // Extract form data
    const formData = new FormData(form.current);
    const name = formData.get('user_name') as string;
    const email = formData.get('user_email') as string;
    const message = formData.get('message') as string;

    // Construct the email body
    const subject = `${STRINGS.contact.emailTemplate.subjectPrefix} ${name}`;
    const body = `${STRINGS.contact.emailTemplate.bodyPrefix} ${name}\n${STRINGS.contact.emailTemplate.bodyEmail} ${email}\n\n${STRINGS.contact.emailTemplate.bodyMessage}\n${message}`;

    // Simulate a brief processing delay for better UX, then open email client
    setTimeout(() => {
      window.location.href = `mailto:${STRINGS.general.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('success');
      form.current?.reset();
    }, 800);
  };

  const handleReset = () => {
    setStatus('idle');
  };

  const isDark = theme === 'dark';

  return (
    <section id="contact" className={`py-16 sm:py-24 scroll-mt-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">{STRINGS.contact.badge}</h2>
            <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {STRINGS.contact.title}
            </p>
            <p className={`mt-4 max-w-2xl text-xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {STRINGS.contact.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <ScrollReveal delay={100} direction="left">
              <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-lg'}`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {STRINGS.contact.infoBoxTitle}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-primary text-white">
                        <Mail className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {STRINGS.contact.labels.email}
                      </p>
                      <a href={`mailto:${STRINGS.general.email}`} className={`mt-1 block ${isDark ? 'text-gray-400 hover:text-brand-primary' : 'text-gray-500 hover:text-brand-secondary'}`}>
                        {STRINGS.general.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-primary text-white">
                        <Phone className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {STRINGS.contact.labels.phone}
                      </p>
                      <a href={`tel:${STRINGS.general.phoneValue}`} className={`mt-1 block ${isDark ? 'text-gray-400 hover:text-brand-primary' : 'text-gray-500 hover:text-brand-secondary'}`}>
                        {STRINGS.general.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-primary text-white">
                        <MapPin className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {STRINGS.contact.labels.office}
                      </p>
                      <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {STRINGS.contact.labels.officeAddressLines[0]}<br />
                        {STRINGS.contact.labels.officeAddressLines[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="w-full">
            <ScrollReveal delay={200} direction="right">
              <div className={`rounded-2xl p-8 min-h-[480px] flex flex-col justify-center ${
                isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-lg'
              }`}>
                {status === 'success' ? (
                  <div className="text-center animate-fade-in-up">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {STRINGS.contact.success.title}
                    </h3>
                    <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {STRINGS.contact.success.message}
                    </p>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 transition-colors"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      {STRINGS.contact.buttons.back}
                    </button>
                  </div>
                ) : (
                  <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                    
                    <div>
                      <label htmlFor="user_name" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {STRINGS.contact.labels.nameField}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="user_name"
                          id="user_name"
                          required
                          disabled={status === 'loading'}
                          className={`block w-full rounded-md shadow-sm py-3 px-4 focus:ring-brand-primary focus:border-brand-primary sm:text-sm ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-500 disabled:bg-gray-800/50' 
                              : 'border-gray-300 text-gray-900 placeholder-gray-400 disabled:bg-gray-50'
                          }`}
                          placeholder={STRINGS.contact.placeholders.name}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="user_email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {STRINGS.contact.labels.emailField}
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="user_email"
                          id="user_email"
                          required
                          disabled={status === 'loading'}
                          className={`block w-full rounded-md shadow-sm py-3 px-4 focus:ring-brand-primary focus:border-brand-primary sm:text-sm ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-500 disabled:bg-gray-800/50' 
                              : 'border-gray-300 text-gray-900 placeholder-gray-400 disabled:bg-gray-50'
                          }`}
                          placeholder={STRINGS.contact.placeholders.email}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {STRINGS.contact.labels.messageField}
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          required
                          disabled={status === 'loading'}
                          className={`block w-full rounded-md shadow-sm py-3 px-4 focus:ring-brand-primary focus:border-brand-primary sm:text-sm ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-500 disabled:bg-gray-800/50' 
                              : 'border-gray-300 text-gray-900 placeholder-gray-400 disabled:bg-gray-50'
                          }`}
                          placeholder={STRINGS.contact.placeholders.message}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all duration-200 ${
                        status === 'loading' ? 'opacity-80 cursor-wait' : ''
                      }`}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          {STRINGS.contact.buttons.loading}
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-5 h-5 mr-2" />
                          {STRINGS.contact.buttons.submit}
                        </>
                      )}
                    </button>
                    <p className={`text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {STRINGS.contact.helper}
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};