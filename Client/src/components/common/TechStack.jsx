import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { FiZap, FiDatabase, FiKey, FiCpu, FiServer, FiGlobe, FiLayers, FiWind } from 'react-icons/fi';
import GlowCard from '../ui/GlowCard';

const TechStack = () => {
  const techStack = [
    { name: 'React', desc: 'Core Frontend Library', icon: FaReact, color: 'text-sky-400' },
    { name: 'Vite', desc: 'Next-Gen Build Tool', icon: FiZap, color: 'text-amber-400' },
    { name: 'Tailwind CSS', desc: 'Utility-First Styles', icon: FiWind, color: 'text-teal-400' },
    { name: 'Framer Motion', desc: 'Smooth Web Animations', icon: FiLayers, color: 'text-pink-400' },
    { name: 'Node.js', desc: 'Backend Runtime', icon: FaNodeJs, color: 'text-emerald-500' },
    { name: 'Express.js', desc: 'REST API Framework', icon: FiServer, color: 'text-slate-350' },
    { name: 'MongoDB Atlas', desc: 'Cloud Mongoose Database', icon: FiDatabase, color: 'text-emerald-400' },
    { name: 'JWT Auth', desc: 'Secure Token Verification', icon: FiKey, color: 'text-yellow-400' },
    { name: 'Gemini AI', desc: 'Advanced LLM Analysis', icon: FiCpu, color: 'text-indigo-400' },
    { name: 'Axios Client', desc: 'Clean HTTP Request Layer', icon: FiGlobe, color: 'text-indigo-300' }
  ];

  return (
    <section id="tech" className="py-16 md:py-24 border-t border-slate-900 bg-slate-950/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400">
            System Stack
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Powering SocialXRay
          </p>
          <p className="mx-auto max-w-xl text-base text-slate-400 leading-relaxed">
            A production-ready stack designed for rapid analysis, policy auditing, and secure MERN deployments.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {techStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex flex-col items-center text-center p-5 rounded-xl border border-slate-900/60 bg-slate-950/20 hover:border-slate-800 transition-all duration-300 hover:bg-slate-900/10 cursor-default"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 border border-slate-900 group-hover:border-slate-800 group-hover:scale-105 transition-all duration-300 mb-3.5 ${tech.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-200">{tech.name}</h3>
                <span className="text-xs text-slate-500 mt-1.5">{tech.desc}</span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TechStack;
