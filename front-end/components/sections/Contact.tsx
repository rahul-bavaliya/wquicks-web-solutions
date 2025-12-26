import React, { useState, useRef } from 'react';
import { Theme } from '../../types';
import { Mail, Phone, MapPin, Loader2, CheckCircle, ArrowLeft, ExternalLink, AlertCircle } from 'lucide-react';
import { STRINGS } from '../../utils/strings';
import { API_ENDPOINTS } from '../../utils/api';
import { ScrollReveal } from '../ui/ScrollReveal';

interface ContactProps {
  theme: Theme;
}

export const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState('');
  const form = useRef<HTMLFormElement>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    let digits = raw;

    // If input starts with '1', strip it since we force +1
    if (digits.startsWith('1')) {
      digits = digits.substring(1);
    }

    // Limit to 10 digits max
    digits = digits.slice(0, 10);

    if (digits.length === 0) {
      setPhone('');
      return;
    }

    // Format: +1 (XXX) XXX-XXXX
    let formatted = '+1';
    if (digits.length > 0) {
      formatted += ` (${digits.slice(0, 3)}`;
    }
    if (digits.length >= 4) {
      formatted += `) ${digits.slice(3, 6)}`;
    }
    if (digits.length >= 7) {
      formatted += `-${digits.slice(6)}`;
    }

    setPhone(formatted);
  };

  const validate = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    const name = formData.get('user_name') as string;
    const email = formData.get('user_email') as string;
    const phone = formData.get('user_phone') as string;
    const message = formData.get('message') as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = STRINGS.contact.validation.nameTooShort;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = STRINGS.contact.validation.emailInvalid;
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = STRINGS.contact.validation.phoneInvalid;
    }
    if (!message || message.trim().length < 10) {
      newErrors.message = STRINGS.contact.validation.messageTooShort;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const formData = new FormData(form.current);

    if (!validate(formData)) {
      return;
    }

    setStatus('loading');

    // Extract form data
    const name = formData.get('user_name') as string;
    const email = formData.get('user_email') as string;
    const phone = formData.get('user_phone') as string;
    const message = formData.get('message') as string;

    // Construct the email body
    const subject = `${STRINGS.contact.emailTemplate.subjectPrefix} ${name}`;
    const body = `${STRINGS.contact.emailTemplate.bodyPrefix} ${name}\n${STRINGS.contact.emailTemplate.bodyEmail} ${email}\n${STRINGS.contact.emailTemplate.bodyPhone} ${phone}\n\n${STRINGS.contact.emailTemplate.bodyMessage}\n${message}`;

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus('success');
      form.current?.reset();
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('idle');
      setErrors({ form: "Something went wrong. Please try again later." });
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrors({});
    setPhone('');
  };

  const isDark = theme === 'dark';

  return (
    <section id="contact" className={`py-16 sm:py-24 scroll-mt-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">{STRINGS.contact.badge}</h2>
            <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'
              }`}>
              {STRINGS.contact.title}
            </p>
            <p className={`mt-4 max-w-2xl text-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'
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
              <div className={`rounded-2xl p-8 min-h-[480px] flex flex-col justify-center ${isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-lg'
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
                  <form ref={form} onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {Object.keys(errors).length > 0 && errors.form && (
                      <div className="rounded-md bg-red-50 p-4 mb-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Submission Error</h3>
                            <div className="mt-2 text-sm text-red-700">
                              <p>{errors.form}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label htmlFor="user_name" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {STRINGS.contact.labels.nameField} <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type="text"
                          name="user_name"
                          id="user_name"
                          disabled={status === 'loading'}
                          className={`block w-full rounded-md shadow-sm py-3 px-4 focus:ring-brand-primary focus:border-brand-primary sm:text-sm ${errors.name
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : isDark
                              ? 'bg-gray-800 border-gray-600 focus:ring-brand-primary focus:border-brand-primary'
                              : 'border-gray-300 focus:ring-brand-primary focus:border-brand-primary'
                            } ${isDark ? 'text-white placeholder-gray-500 disabled:bg-gray-800/50' : 'text-gray-900 placeholder-gray-400 disabled:bg-gray-50'}`}
                          placeholder={STRINGS.contact.placeholders.name}
                        />
                        {errors.name && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600" id="name-error">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="user_email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {STRINGS.contact.labels.emailField} <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type="email"
                          name="user_email"
                          id="user_email"
                          disabled={status === 'loading'}
                          className={`block w-full rounded-md shadow-sm py-3 px-4 sm:text-sm ${errors.email
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : isDark
                              ? 'bg-gray-800 border-gray-600 focus:ring-brand-primary focus:border-brand-primary'
                              : 'border-gray-300 focus:ring-brand-primary focus:border-brand-primary'
                            } ${isDark ? 'text-white placeholder-gray-500 disabled:bg-gray-800/50' : 'text-gray-900 placeholder-gray-400 disabled:bg-gray-50'}`}
                          placeholder={STRINGS.contact.placeholders.email}
                        />
                        {errors.email && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="user_phone" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {STRINGS.contact.labels.phoneField} <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type="tel"
                          name="user_phone"
                          id="user_phone"
                          value={phone}
                          onChange={handlePhoneChange}
                          disabled={status === 'loading'}
                          className={`block w-full rounded-md shadow-sm py-3 px-4 sm:text-sm ${errors.phone
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : isDark
                              ? 'bg-gray-800 border-gray-600 focus:ring-brand-primary focus:border-brand-primary'
                              : 'border-gray-300 focus:ring-brand-primary focus:border-brand-primary'
                            } ${isDark ? 'text-white placeholder-gray-500 disabled:bg-gray-800/50' : 'text-gray-900 placeholder-gray-400 disabled:bg-gray-50'}`}
                          placeholder={STRINGS.contact.placeholders.phone}
                        />
                        {errors.phone && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600" id="phone-error">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {STRINGS.contact.labels.messageField} <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          disabled={status === 'loading'}
                          className={`block w-full rounded-md shadow-sm py-3 px-4 sm:text-sm ${errors.message
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : isDark
                              ? 'bg-gray-800 border-gray-600 focus:ring-brand-primary focus:border-brand-primary'
                              : 'border-gray-300 focus:ring-brand-primary focus:border-brand-primary'
                            } ${isDark ? 'text-white placeholder-gray-500 disabled:bg-gray-800/50' : 'text-gray-900 placeholder-gray-400 disabled:bg-gray-50'}`}
                          placeholder={STRINGS.contact.placeholders.message}
                        />
                        {errors.message && (
                          <div className="absolute top-3 right-0 pr-3 flex items-center pointer-events-none">
                            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      {errors.message && (
                        <p className="mt-2 text-sm text-red-600" id="message-error">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all duration-200 ${status === 'loading' ? 'opacity-80 cursor-wait' : ''
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