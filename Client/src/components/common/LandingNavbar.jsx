import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShield } from 'react-icons/fi';
import CyberButton from '../ui/CyberButton';
import Logo from './Logo';

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Why Us', href: '#why' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Features', href: '#features' },
    { label: 'Tech Stack', href: '#tech' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-900/60 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Branding */}
          <div className="flex items-center gap-3 select-none">
            <Logo className="h-9 w-9" />
            <span className="text-lg font-extrabold tracking-tight text-slate-100">
              Social<span className="text-indigo-400">XRay</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-semibold text-slate-400 hover:text-slate-200 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Sign In */}
          <div className="hidden md:flex items-center">
            <Link to="/login">
              <CyberButton variant="secondary" className="!px-5 !py-2.5 text-sm">
                Sign In
              </CyberButton>
            </Link>
          </div>

          {/* Mobile Menu Action */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-lg p-2.5 text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-900/80 bg-slate-950 px-5 py-5 space-y-3.5 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-semibold text-slate-400 hover:text-slate-250 py-2.5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-900">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <CyberButton variant="secondary" className="w-full text-center py-3.5 text-base">
                Sign In
              </CyberButton>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
