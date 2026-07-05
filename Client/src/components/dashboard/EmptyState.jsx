import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShield, FiPlus, FiCpu } from 'react-icons/fi';
import GlowCard from '../ui/GlowCard';

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <GlowCard className="flex flex-col items-center justify-center p-12 text-center max-w-2xl mx-auto my-8">
      {/* Dynamic Cyber Radar Scanning Visual */}
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-ping opacity-75" />
        <div className="absolute -inset-4 rounded-full border border-cyan-500/10 animate-pulse" />
        
        {/* Scanner line */}
        <div className="absolute inset-0 rounded-full border border-indigo-500/30 bg-indigo-500/5 flex items-center justify-center">
          <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-t from-cyan-400 to-transparent origin-bottom animate-[spin_3s_linear_infinite]" />
          <FiCpu className="h-10 w-10 text-indigo-400" />
        </div>
      </div>

      <h3 className="text-2xl font-extrabold tracking-tight text-slate-100 mb-3">
        Diagnostic System Inactive
      </h3>
      <p className="text-base text-slate-400 max-w-lg mb-10 leading-relaxed">
        No social media feeds or post algorithms have been decrypted yet. Run a diagnostic scan to analyze recommendation mechanics, virality statistics, and risk factors.
      </p>

      <button
        onClick={() => navigate('/analyze')}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-650 to-indigo-500 hover:from-indigo-600 hover:to-indigo-400 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
      >
        <FiPlus className="h-4.5 w-4.5" />
        Initialize Algorithm Scan
      </button>
    </GlowCard>
  );
};

export default EmptyState;
