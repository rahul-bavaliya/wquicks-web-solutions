import React from 'react';
import { STRINGS } from '../../utils/strings';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={STRINGS.accessibility.logo}>
    <circle cx="45" cy="45" r="28" stroke="var(--brand-primary)" strokeWidth="16" />
    <path d="M62 62 L78 78" stroke="var(--brand-primary)" strokeWidth="16" strokeLinecap="round" />
  </svg>
);