import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { navigationItems } from '../../constants/navigation';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Frame */}
      <aside
        className={`fixed bottom-0 top-0 left-0 z-50 flex w-64 flex-col border-r border-slate-900 bg-slate-950 transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-slate-900">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-gradient-to-tr from-indigo-500 to-cyan-400 shadow-md shadow-indigo-500/20" />
            <span className="text-lg font-extrabold tracking-tight text-white">
              SocialXRay
            </span>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-slate-200 lg:hidden transition-colors"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Navigation list */}
        <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500 pl-4.5'
                      : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                  }`
                }
              >
                <Icon className="h-4.5 w-4.5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout area */}
        <div className="p-4 border-t border-slate-900">
          <button
            onClick={() => {
              logout();
              onClose();
              navigate('/', { replace: true });
            }}
            className="flex w-full items-center gap-3.5 rounded-lg px-5 py-3 text-sm font-semibold text-slate-400 hover:bg-red-950/20 hover:text-red-400 transition-all duration-200 cursor-pointer"
          >
            <FiLogOut className="h-4.5 w-4.5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
