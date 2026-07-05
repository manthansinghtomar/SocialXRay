import React from 'react';
import { motion } from 'framer-motion';

const CyberButton = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
  const baseStyles = 'relative inline-flex items-center justify-center gap-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/35 border border-indigo-500/30',
    secondary: 'px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-850 hover:border-slate-700 shadow-inner',
    ghost: 'px-4 py-2 bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50',
    cyber: 'px-6 py-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 hover:text-indigo-300 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)]'
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default CyberButton;
