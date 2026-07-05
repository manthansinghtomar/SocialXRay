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
    <div className="space-y-8 max-w-4xl mx-auto pb-12 select-none">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Security clearance Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Audit identity parameters and session authorizations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card & Session Status Badges */}
        <GlowCard className="md:col-span-1 flex flex-col items-center justify-between text-center py-10">
          <div className="flex flex-col items-center">
            {/* High-tech user avatar icon container */}
            <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/25 shadow-lg shadow-indigo-500/5">
              <FiUser className="h-11 w-11 text-indigo-400" />
              <span className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
            </div>

            <h3 className="text-lg font-bold text-slate-200">
              {user?.fullName || 'Agent XRay'}
            </h3>
            <p className="text-xs text-slate-550 font-mono mt-1 capitalize">
              Role ID: {user?.role || 'user'}
            </p>
          </div>

          {/* Session Status badges */}
          <div className="w-full space-y-3 pt-6 mt-6 border-t border-slate-900/60">
            <div className="flex items-center justify-center gap-2 px-4 py-1.5 rounded bg-emerald-500/5 border border-emerald-500/15 text-xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              Active Session
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-1.5 rounded bg-cyan-500/5 border border-cyan-500/15 text-xs font-semibold text-cyan-400">
              <FiLock className="h-4 w-4" />
              Secure Auth (JWT)
            </div>
          </div>
        </GlowCard>

        {/* Credentials Grid */}
        <GlowCard className="md:col-span-2 space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-450 flex items-center gap-2">
            <FiShield className="h-5 w-5 text-indigo-400" />
            Identity Credentials Audit
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Secure Email */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-5">
              <span className="text-[11px] uppercase font-bold text-slate-500 flex items-center gap-2">
                <FiMail className="h-4 w-4" /> Secure Email
              </span>
              <p className="text-sm font-bold text-slate-300 mt-2 break-all">
                {user?.email || 'Unavailable'}
              </p>
            </div>

            {/* Permission Role */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-5">
              <span className="text-[11px] uppercase font-bold text-slate-500 flex items-center gap-2">
                <FiShield className="h-4 w-4" /> System Access
              </span>
              <p className="text-sm font-bold text-slate-300 mt-2 capitalize">
                Security Level: {user?.role || 'user'}
              </p>
            </div>

            {/* Member Since Account Created Date */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-5">
              <span className="text-[11px] uppercase font-bold text-slate-500 flex items-center gap-2">
                <FiCalendar className="h-4 w-4" /> Member Since
              </span>
              <p className="text-sm font-bold text-slate-300 mt-2">
                {formatMemberSince(user?.createdAt)}
              </p>
            </div>

            {/* Total Analyses */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-5">
              <span className="text-[11px] uppercase font-bold text-slate-500 flex items-center gap-2">
                <FiCpu className="h-4 w-4" /> Total Analyses
              </span>
              <p className="text-sm font-bold text-slate-300 mt-2">
                {statsLoading ? 'Retrieving logs...' : statsError ? 'N/A' : totalAnalyses}
              </p>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="space-y-4 pt-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-450">
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
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-900 bg-slate-950/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850 group-hover:text-indigo-400 group-hover:border-indigo-500/20 text-slate-400 transition-colors duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-200 group-hover:text-slate-100">
                      {action.title}
                    </h5>
                    <p className="text-xs text-slate-550 mt-1 line-clamp-1">
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
          className="flex items-center gap-2.5 rounded-lg px-6 py-3.5 text-xs font-bold uppercase tracking-wider bg-slate-950 border border-red-500/25 text-red-550 hover:bg-red-500/10 hover:border-red-500/45 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all duration-300 cursor-pointer"
        >
          <FiLogOut className="h-4.5 w-4.5" />
          Purge Session (Logout)
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
