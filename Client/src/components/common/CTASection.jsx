import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import CyberButton from '../ui/CyberButton';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 border-t border-slate-900 bg-slate-950/20 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/20 via-transparent to-cyan-950/15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          Ready to Audit Your Algorithms?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto max-w-lg text-xs md:text-sm text-slate-450 leading-relaxed"
        >
          SocialXRay provides transparent audit logs, engagement estimators, and shadowban checks to protect your social distribution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center gap-4 pt-2"
        >
          <Link to="/register">
            <CyberButton variant="primary" className="gap-2 text-[10px] py-2">
              Create Account <FiArrowRight className="h-3.5 w-3.5" />
            </CyberButton>
          </Link>
          <a href="#why">
            <CyberButton variant="secondary" className="text-[10px] py-2">
              Learn More
            </CyberButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
