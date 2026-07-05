import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay, FiTrendingUp, FiLock, FiCpu } from 'react-icons/fi';
import CyberButton from '../ui/CyberButton';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-36">
      {/* Background cyberglow shapes */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] md:h-[700px] md:w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -z-10 h-[350px] w-[350px] rounded-full bg-cyan-600/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Left Content */}
          <div className="space-y-8 text-center lg:text-left lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-indigo-500/25 bg-indigo-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
              Live Audit Suite Active
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-none"
            >
              Expose the{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Algorithmic Black Box
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mx-auto lg:mx-0 max-w-xl text-base md:text-lg text-slate-400 leading-relaxed"
            >
              SocialXRay scans your social posts, auditing distribution metrics, analyzing reach profiles, detecting moderation risks, and warning you of opaque filters using Gemini AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
            >
              <Link to="/register">
                <CyberButton variant="primary" className="gap-2.5 text-base py-4 px-7">
                  Get Started <FiArrowRight className="h-4.5 w-4.5" />
                </CyberButton>
              </Link>
              <a href="#workflow">
                <CyberButton variant="secondary" className="gap-2.5 text-base py-4 px-7">
                  <FiPlay className="h-4.5 w-4.5 fill-slate-300" /> Watch Demo
                </CyberButton>
              </a>
            </motion.div>
          </div>

          {/* Hero Right: Animated Dashboard Mockup */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full max-w-[540px] rounded-xl border border-slate-900 bg-slate-950/60 p-6 backdrop-blur-md shadow-2xl shadow-indigo-950/40 overflow-hidden"
            >
              {/* Header Tab Bar */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                  <span className="ml-2.5 text-xs font-mono text-slate-550 tracking-wider">xray-scanner_v1.0</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-xs font-mono text-indigo-400">ONLINE</span>
                </div>
              </div>

              <div className="space-y-5">
                {/* Scan Simulator Card */}
                <div className="relative rounded-lg border border-slate-900 bg-slate-950 p-4 overflow-hidden">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mb-3.5 font-bold">
                    <span>ALGORITHMIC RADAR</span>
                    <span className="text-cyan-400 animate-pulse flex items-center gap-1">
                      <FiCpu className="animate-spin" /> SCANNING ACTIVE
                    </span>
                  </div>
                  {/* Glowing Radar Scanning Line */}
                  <motion.div
                    animate={{ y: [0, 64, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent shadow-[0_0_12px_#22d3ee] pointer-events-none"
                  />
                  <div className="space-y-2">
                    <div className="h-2.5 w-3/4 rounded bg-slate-900" />
                    <div className="h-2.5 w-5/6 rounded bg-slate-900/60" />
                    <div className="h-2.5 w-1/2 rounded bg-indigo-950/20" />
                  </div>
                </div>

                {/* Score Panels */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Virality score panel */}
                  <div className="rounded-lg border border-slate-900 bg-slate-950/45 p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                      <span>VIRALITY PROSPECT</span>
                      <FiTrendingUp className="text-indigo-400 h-4.5 w-4.5" />
                    </div>
                    <div className="mt-2.5 flex items-baseline gap-1.5">
                      <span className="text-lg sm:text-xl font-extrabold text-white font-mono">82.6%</span>
                      <span className="text-[10px] text-indigo-400 font-mono font-semibold">+8.4%</span>
                    </div>
                    <div className="mt-3.5 h-2.5 w-full rounded bg-slate-900 overflow-hidden">
                      <motion.div
                        animate={{ width: ['0%', '82.6%'] }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                        className="h-full bg-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Safety risk score panel */}
                  <div className="rounded-lg border border-slate-900 bg-slate-950/45 p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                      <span>MODERATION RISK</span>
                      <FiLock className="text-emerald-450 h-4.5 w-4.5" />
                    </div>
                    <div className="mt-2.5 flex items-baseline gap-1.5">
                      <span className="text-lg sm:text-xl font-extrabold text-white font-mono">14.2%</span>
                      <span className="text-[10px] text-emerald-400 font-mono font-semibold">LOW</span>
                    </div>
                    <div className="mt-3.5 h-2.5 w-full rounded bg-slate-900 overflow-hidden">
                      <motion.div
                        animate={{ width: ['0%', '14.2%'] }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                        className="h-full bg-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Mini Logging shell */}
                <div className="rounded-lg border border-slate-900 bg-slate-950 p-3.5">
                  <div className="text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-wider font-semibold">Audit Console Logs</div>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="flex justify-between text-slate-400">
                      <span>[OK] Keyword toxicity evaluation completed.</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>[OK] Reach index profile computed.</span>
                    </div>
                    <div className="flex justify-between text-slate-350">
                      <span>[AI] Gemini Transparency Rating:</span>
                      <span className="text-cyan-400 font-extrabold">96/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
