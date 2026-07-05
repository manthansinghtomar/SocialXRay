import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiUser, FiMail, FiShield, FiCalendar, FiCpu, FiLogOut, 
  FiLock, FiBarChart2, FiClock, FiCheckCircle 
} from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

// UI components
import GlowCard from '../../components/ui/GlowCard';
import CyberButton from '../../components/ui/CyberButton';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [totalAnalyses, setTotalAnalyses] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(false);

  // Fetch total analyses count from dashboard overview API
  useEffect(() => {
    const fetchTotalScans = async () => {
      try {
        const response = await api.get('/dashboard/overview');
        if (response.data && response.data.success) {
          setTotalAnalyses(response.data.data.totalAnalyses);
        } else {
          setStatsError(true);
        }
      } catch (err) {
        console.error('Error fetching profile dashboard overview:', err);
        setStatsError(true);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchTotalScans();
  }, []);

  // Format account created date to e.g. "05 July 2026"
  const formatMemberSince = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const quickActions = [
    {
      title: 'Console Dashboard',
      desc: 'Check live feed charts and distribution analytics.',
      path: '/dashboard',
      icon: FiBarChart2,
      delay: 0.15
    },
    {
      title: 'Feed Scanner',
      desc: 'Initiate new AI diagnostic algorithm analysis.',
      path: '/analyze',
      icon: FiCpu,
      delay: 0.2
    },
    {
      title: 'Audit Log Feed',
      desc: 'Manage and purge historical diagnostic records.',
      path: '/history',
      icon: FiClock,
      delay: 0.25
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 select-none">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Security clearance Profile</h1>
        <p className="text-xs text-slate-500 mt-0.5">Audit identity parameters and session authorizations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card & Session Status Badges */}
        <GlowCard className="md:col-span-1 flex flex-col items-center justify-between text-center py-8">
          <div className="flex flex-col items-center">
            {/* High-tech user avatar icon container */}
            <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/25 shadow-lg shadow-indigo-500/5">
              <FiUser className="h-9 w-9 text-indigo-400" />
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
            </div>

            <h3 className="text-base font-bold text-slate-200">
              {user?.fullName || 'Agent XRay'}
            </h3>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5 capitalize">
              Role ID: {user?.role || 'user'}
            </p>
          </div>

          {/* Session Status badges */}
          <div className="w-full space-y-2.5 pt-6 mt-6 border-t border-slate-900/60">
            <div className="flex items-center justify-center gap-1.5 px-3 py-1 rounded bg-emerald-500/5 border border-emerald-500/15 text-[10px] font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              Active Session
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-1 rounded bg-cyan-500/5 border border-cyan-500/15 text-[10px] font-semibold text-cyan-400">
              <FiLock className="h-3 w-3" />
              Secure Auth (JWT)
            </div>
          </div>
        </GlowCard>

        {/* Credentials Grid */}
        <GlowCard className="md:col-span-2 space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <FiShield className="h-4 w-4 text-indigo-400" />
            Identity Credentials Audit
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Secure Email */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-4">
              <span className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
                <FiMail className="h-3 w-3" /> Secure Email
              </span>
              <p className="text-xs font-semibold text-slate-350 mt-1.5 break-all">
                {user?.email || 'Unavailable'}
              </p>
            </div>

            {/* Permission Role */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-4">
              <span className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
                <FiShield className="h-3 w-3" /> System Access
              </span>
              <p className="text-xs font-semibold text-slate-350 mt-1.5 capitalize">
                Security Level: {user?.role || 'user'}
              </p>
            </div>

            {/* Member Since Account Created Date */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-4">
              <span className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
                <FiCalendar className="h-3 w-3" /> Member Since
              </span>
              <p className="text-xs font-semibold text-slate-350 mt-1.5">
                {formatMemberSince(user?.createdAt)}
              </p>
            </div>

            {/* Total Analyses */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-4">
              <span className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
                <FiCpu className="h-3 w-3" /> Total Analyses
              </span>
              <p className="text-xs font-semibold text-slate-350 mt-1.5">
                {statsLoading ? 'Retrieving logs...' : statsError ? 'N/A' : totalAnalyses}
              </p>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="space-y-4 pt-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Quick Actions Console
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: action.delay }}
                onClick={() => navigate(action.path)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-900 bg-slate-950/30 p-5 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-850 group-hover:text-indigo-400 group-hover:border-indigo-500/20 text-slate-400 transition-colors duration-300">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-200 group-hover:text-slate-100">
                      {action.title}
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                      {action.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Logout Row */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-slate-950 border border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all duration-300 cursor-pointer"
        >
          <FiLogOut className="h-4 w-4" />
          Purge Session (Logout)
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
