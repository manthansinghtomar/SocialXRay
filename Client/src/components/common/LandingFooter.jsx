import React from 'react';
import { FiShield } from 'react-icons/fi';

const LandingFooter = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/80 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <FiShield className="h-5 w-5 text-indigo-500" />
              <span className="text-sm font-bold tracking-tight text-white">SocialXRay</span>
            </div>
            <p className="max-w-xs text-xs text-slate-500 leading-relaxed">
              AI Powered Social Media Algorithm Analysis & Transparency Platform. Quantify recommendation parameters and compliance safety ratings.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-350">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#why" className="text-slate-500 hover:text-slate-300 transition-colors">Why Us</a></li>
              <li><a href="#workflow" className="text-slate-500 hover:text-slate-300 transition-colors">Workflow</a></li>
              <li><a href="#features" className="text-slate-500 hover:text-slate-300 transition-colors">Features</a></li>
              <li><a href="#tech" className="text-slate-500 hover:text-slate-300 transition-colors">Tech Stack</a></li>
            </ul>
          </div>

          {/* Disclaimer Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-350">Transparency</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Disclaimer: Analyses are estimations computed via AI models. SocialXRay has no official affiliations with Meta, X Corp, TikTok, or LinkedIn.
            </p>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[10px] text-slate-650">
            &copy; {new Date().getFullYear()} SocialXRay. Built for transparency and safety.
          </span>
          <span className="text-[10px] text-slate-650">
            Hackathon Platform Prototype
          </span>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
