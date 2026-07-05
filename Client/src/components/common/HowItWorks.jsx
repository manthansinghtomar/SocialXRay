import React from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiCpu, FiTrendingUp, FiFileText } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Input Post Content',
      description: 'Input your post draft, likes/shares targets, and network category details into our secure audit terminal.',
      icon: FiEdit2,
    },
    {
      number: '02',
      title: 'AI Algorithmic Scan',
      description: 'Our analyzer evaluates vocabulary, structural patterns, and moderation triggers using Gemini models.',
      icon: FiCpu,
    },
    {
      number: '03',
      title: 'Extract Score Metrics',
      description: 'Get ratings for virality prospects, engagement triggers, category matching, and platform moderation risks.',
      icon: FiTrendingUp,
    },
    {
      number: '04',
      title: 'Audit Recommendations',
      description: 'Receive explanations detailing flagged keywords, reach triggers, and explicit suggestions to edit for maximum reach.',
      icon: FiFileText,
    }
  ];

  return (
    <section id="workflow" className="py-16 md:py-24 border-t border-slate-900 bg-slate-950/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400">
            How It Works
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            The SocialXRay Audit Workflow
          </p>
          <p className="mx-auto max-w-xl text-base text-slate-400 leading-relaxed">
            Verify compliance and visibility ratings through 4 streamlined audit stages.
          </p>
        </div>

        {/* Workflow Line/Grid */}
        <div className="grid gap-8 md:grid-cols-4 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center p-6 border border-slate-900/40 bg-slate-950/15 rounded-xl hover:border-slate-800 transition-all duration-300 group"
              >
                {/* Visual Step Number */}
                <div className="absolute top-2 right-4 text-6xl font-extrabold text-slate-900/30 select-none font-mono group-hover:text-indigo-950/50 transition-colors duration-300">
                  {step.number}
                </div>

                {/* Icon Container */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 mb-6 relative z-10 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-200 mb-2 relative z-10">{step.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed max-w-[250px] relative z-10">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
