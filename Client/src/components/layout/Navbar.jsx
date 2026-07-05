import React from 'react';
import { useLocation } from 'react-router-dom';
import { FiMenu, FiUser, FiBell } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onToggleSidebar }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Dynamic route name mapping
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/analyze':
        return 'Algorithm Analyzer';
      case '/history':
        return 'Analysis History';
      case '/profile':
        return 'Profile Settings';
      default:
        return 'SocialXRay';
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-slate-850 bg-slate-950/70 px-4 shadow-sm backdrop-blur-md md:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Hamburger Button */}
        <button
          onClick={onToggleSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200 lg:hidden transition-all duration-200"
          aria-label="Toggle Sidebar"
        >
          <FiMenu className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold text-slate-100 md:text-xl tracking-tight">
          {getPageTitle(location.pathname)}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification indicator */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-all duration-200">
          <FiBell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
        </button>

        {/* User avatar indicator */}
        <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
          <div className="hidden flex-col text-right md:flex">
            <span className="text-sm font-semibold text-slate-300">
              {user?.email || 'XRay Researcher'}
            </span>
            <span className="text-xs text-slate-500">Developer Role</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-650/10 border border-indigo-500/20 text-indigo-400">
            <FiUser className="h-4.5 w-4.5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
