import React from 'react';
import { FiEyeOff, FiLock, FiAlertTriangle } from 'react-icons/fi';
import GlowCard from '../ui/GlowCard';

const WhySection = () => {
  const points = [
    {
      title: 'Algorithmic Opacity',
      description: 'Mainstream algorithms operate as a black box. Feed metrics and post rankings are driven by hidden parameters that dictate visibility without user control.',
      icon: FiEyeOff,
      color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5'
    },
    {
      title: 'Silent Shadowbans',
      description: 'Platforms penalize profiles silently without notifications, killing post reach. SocialXRay isolates flagging keywords and shadowban profiles instantly.',
      icon: FiLock,
      color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5'
    },
    {
      title: 'Distribution Biases',
      description: 'Feeds are skewed toward specific commercial categories, extreme sentiments, or political angles. SocialXRay audits and exposes these underlying bias trends.',
      icon: FiAlertTriangle,
      color: 'text-red-400 border-red-500/20 bg-red-500/5'
    }
  ];

  return (
    <section id="why" className="py-16 md:py-24 border-t border-slate-900 bg-slate-950/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Platform Mission
          </h2>
          <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Why Algorithmic Transparency Matters
          </p>
          <p className="mx-auto max-w-lg text-xs text-slate-400">
            Hidden filters and silent moderation guidelines dictate who hears your voice. Take control of your distribution.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <GlowCard key={point.title} delay={index * 0.1}>
                <div className="flex flex-col h-full space-y-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${point.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">{point.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    {point.description}
                  </p>
                </div>
              </GlowCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhySection;
