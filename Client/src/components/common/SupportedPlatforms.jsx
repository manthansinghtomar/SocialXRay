import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaTiktok, FaReddit } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SupportedPlatforms = () => {
  const platforms = [
    { name: 'Instagram', icon: FaInstagram, color: 'hover:text-pink-400 hover:border-pink-500/20 hover:bg-pink-500/5' },
    { name: 'Facebook', icon: FaFacebook, color: 'hover:text-blue-500 hover:border-blue-500/20 hover:bg-blue-500/5' },
    { name: 'YouTube', icon: FaYoutube, color: 'hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/5' },
    { name: 'X / Twitter', icon: FaXTwitter, color: 'hover:text-slate-100 hover:border-slate-800 hover:bg-slate-900/10' },
    { name: 'LinkedIn', icon: FaLinkedin, color: 'hover:text-sky-400 hover:border-sky-500/20 hover:bg-sky-500/5' },
    { name: 'TikTok', icon: FaTiktok, color: 'hover:text-cyan-400 hover:border-cyan-500/20 hover:bg-cyan-500/5' },
    { name: 'Reddit', icon: FaReddit, color: 'hover:text-orange-500 hover:border-orange-500/20 hover:bg-orange-500/5' }
  ];

  return (
    <section className="py-12 border-t border-slate-900 bg-slate-950/40 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <p className="text-center text-sm font-bold uppercase tracking-widest text-slate-500 mb-10">
          SUPPORTED PLATFORM ALGORITHMS
        </p>

        {/* Badge Grid */}
        <div className="flex flex-wrap justify-center items-center gap-5">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center gap-3 rounded-lg border border-slate-900 bg-slate-950/30 px-6 py-3.5 text-base font-semibold text-slate-400 cursor-default transition-all duration-300 ${platform.color}`}
              >
                <Icon className="h-5 w-5" />
                {platform.name}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SupportedPlatforms;
