import React from 'react';

const Logo = ({ className = 'h-6 w-6' }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="cyberShieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" /> {/* Indigo-500 */}
          <stop offset="100%" stopColor="#22d3ee" /> {/* Cyan-400 */}
        </linearGradient>
      </defs>
      
      {/* Outer Shield pulse border */}
      <path 
        d="M50 8 L87 23 L82 65 L50 92 L18 65 L13 23 Z" 
        stroke="url(#cyberShieldGradient)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="opacity-40 animate-pulse"
      />

      {/* Main Cyber Shield path */}
      <path 
        d="M50 14 L81 27 L77 62 L50 85 L23 62 L19 27 Z" 
        stroke="url(#cyberShieldGradient)" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* AI Circuit Lines */}
      <path 
        d="M 28 35 L 38 35 L 42 42" 
        stroke="url(#cyberShieldGradient)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.75"
      />
      <circle cx="28" cy="35" r="2" fill="url(#cyberShieldGradient)" />

      <path 
        d="M 72 35 L 62 35 L 58 42" 
        stroke="url(#cyberShieldGradient)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.75"
      />
      <circle cx="72" cy="35" r="2" fill="url(#cyberShieldGradient)" />

      <path 
        d="M 32 60 L 40 60 L 44 54" 
        stroke="url(#cyberShieldGradient)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.75"
      />
      <circle cx="32" cy="60" r="2" fill="url(#cyberShieldGradient)" />

      <path 
        d="M 68 60 L 60 60 L 56 54" 
        stroke="url(#cyberShieldGradient)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.75"
      />
      <circle cx="68" cy="60" r="2" fill="url(#cyberShieldGradient)" />

      <path 
        d="M 50 80 L 50 70" 
        stroke="url(#cyberShieldGradient)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.75"
      />
      <circle cx="50" cy="80" r="2" fill="url(#cyberShieldGradient)" />

      {/* Cyber X in the Center */}
      <path 
        d="M38 36 H45 L50 43.5 L55 36 H62 L54.5 48 L62 60 H55 L50 52.5 L45 60 H38 L45.5 48 Z" 
        fill="url(#cyberShieldGradient)" 
      />
    </svg>
  );
};

export default Logo;
