import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FiMenu, FiUser, FiBell, FiCpu, FiCheck, FiAlertTriangle, FiTrash2, FiClock, FiTrash } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

const Navbar = ({ onToggleSidebar }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotifications();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getRelativeTime = (isoString) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch (e) {
      return 'Recently';
    }
  };

  const getNotificationIcon = (iconName, type) => {
    const baseClass = "h-4 w-4";
    let colorClass = "text-indigo-400";
    if (type === 'success') colorClass = "text-emerald-400";
    if (type === 'warning') colorClass = "text-amber-400";
    if (type === 'error') colorClass = "text-rose-450";

    switch (iconName) {
      case 'cpu':
        return <FiCpu className={`${baseClass} ${colorClass}`} />;
      case 'check':
        return <FiCheck className={`${baseClass} ${colorClass}`} />;
      case 'alert':
        return <FiAlertTriangle className={`${baseClass} ${colorClass}`} />;
      case 'trash':
        return <FiTrash2 className={`${baseClass} ${colorClass}`} />;
      case 'user':
        return <FiUser className={`${baseClass} ${colorClass}`} />;
      default:
        return <FiBell className={`${baseClass} ${colorClass}`} />;
    }
  };

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
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-all duration-200"
            aria-label="Notifications Panel"
          >
            <FiBell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-extrabold text-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-80 sm:w-96 rounded-xl border border-slate-800 bg-slate-950/95 shadow-[0_0_30px_rgba(99,102,241,0.15)] backdrop-blur-md z-50 overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-900 px-4 py-3 bg-slate-900/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Notifications {unreadCount > 0 && `(${unreadCount} new)`}
                  </span>
                  <div className="flex gap-2.5">
                    {notifications.length > 0 && (
                      <>
                        <button 
                          onClick={markAllAsRead}
                          className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 hover:underline transition-all cursor-pointer"
                        >
                          Mark read
                        </button>
                        <span className="text-slate-700 text-[10px] select-none">|</span>
                        <button 
                          onClick={clearAll}
                          className="text-[10px] font-bold text-slate-500 hover:text-rose-450 hover:underline transition-all cursor-pointer"
                        >
                          Clear
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* List Content */}
                <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-900/60 custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-500 mb-3 animate-pulse">
                        <FiBell className="h-5.5 w-5.5" />
                      </div>
                      <span className="text-sm font-bold text-slate-400 animate-pulse">No new notifications</span>
                      <span className="text-[11px] text-slate-600 mt-1 max-w-[200px]">System notifications and scanning updates will appear here.</span>
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => markAsRead(item.id)}
                        className={`flex items-start gap-3.5 px-4 py-3.5 hover:bg-slate-900/30 transition-all duration-150 cursor-pointer ${
                          !item.read ? 'bg-indigo-950/10 border-l-[3px] border-indigo-500 pl-3' : 'pl-4'
                        }`}
                      >
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-slate-800">
                          {getNotificationIcon(item.iconName, item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-xs font-bold leading-tight ${!item.read ? 'text-slate-100' : 'text-slate-400'}`}>
                              {item.title}
                            </p>
                            <span className="text-[9px] text-slate-500 font-semibold flex-shrink-0 flex items-center gap-1">
                              <FiClock className="h-2.5 w-2.5 text-slate-650" />
                              {getRelativeTime(item.createdAt)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 leading-snug break-words">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User avatar indicator */}
        <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
          <div className="hidden flex-col text-right md:flex">
            <span className="text-sm font-semibold text-slate-300">
              {user?.email || 'XRay Researcher'}
            </span>
            <span className="text-xs text-slate-550">Developer Role</span>
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
