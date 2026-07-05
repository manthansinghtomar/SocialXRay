import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiInstagram, FiVideo, FiMessageSquare, FiExternalLink, FiClock } from 'react-icons/fi';
import { 
  FaInstagram, 
  FaFacebook, 
  FaYoutube, 
  FaLinkedin, 
  FaTiktok, 
  FaReddit,
  FaTwitter,
  FaGlobe
} from 'react-icons/fa';
import GlowCard from '../ui/GlowCard';

// Reusable Platform Icon component
const PlatformIcon = ({ platform }) => {
  const normalized = platform?.toLowerCase() || '';
  if (normalized.includes('twitter') || normalized.includes('x')) {
    return <FaTwitter className="text-slate-200 h-4 w-4" />;
  }
  if (normalized.includes('instagram')) {
    return <FaInstagram className="text-pink-500 h-4 w-4" />;
  }
  if (normalized.includes('facebook')) {
    return <FaFacebook className="text-blue-600 h-4 w-4" />;
  }
  if (normalized.includes('linkedin')) {
    return <FaLinkedin className="text-sky-500 h-4 w-4" />;
  }
  if (normalized.includes('youtube')) {
    return <FaYoutube className="text-red-600 h-4 w-4" />;
  }
  if (normalized.includes('tiktok')) {
    return <FaTiktok className="text-rose-500 h-4 w-4" />;
  }
  if (normalized.includes('reddit')) {
    return <FaReddit className="text-orange-500 h-4 w-4" />;
  }
  return <FaGlobe className="text-slate-400 h-4 w-4" />;
};

const RecentTable = React.memo(({ analyses = [] }) => {
  // Format dates
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  // Color-coded sentiment badges
  const getSentimentStyles = (sentiment) => {
    const term = sentiment?.toLowerCase() || '';
    if (term.includes('pos')) {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
    if (term.includes('neg')) {
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    }
    return 'bg-slate-800/60 text-slate-300 border-slate-700/50';
  };

  // Color-coded risk labels
  const getRiskColor = (score) => {
    if (score >= 70) return 'text-rose-500';
    if (score >= 30) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getRiskBg = (score) => {
    if (score >= 70) return 'bg-rose-500/10 border-rose-500/20';
    if (score >= 30) return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-emerald-500/10 border-emerald-500/20';
  };

  if (!analyses || analyses.length === 0) {
    return null;
  }

  return (
    <GlowCard className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-base font-bold tracking-wide text-slate-200">
          Recent Analyses Feed
        </h4>
        <Link 
          to="/history" 
          className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 hover:underline transition-all duration-150"
        >
          View Full History <FiExternalLink className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-900 text-xs font-bold uppercase tracking-wider text-slate-500">
              <th className="py-4 px-5">Platform</th>
              <th className="py-4 px-5">Category</th>
              <th className="py-4 px-5">Sentiment</th>
              <th className="py-4 px-5">Recom. Score</th>
              <th className="py-4 px-5">Risk Severity</th>
              <th className="py-4 px-5 text-right">Created Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60 text-sm">
            {analyses.map((item) => (
              <tr 
                key={item._id} 
                className="text-slate-300 hover:bg-slate-900/15 transition-colors duration-150"
              >
                {/* Platform */}
                <td className="py-4.5 px-5 font-semibold">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 border border-slate-900">
                      <PlatformIcon platform={item.platform} />
                    </div>
                    <span className="capitalize">{item.platform || 'General'}</span>
                  </div>
                </td>

                {/* Category */}
                <td className="py-4.5 px-5 text-slate-400">
                  {item.category || 'Uncategorized'}
                </td>

                {/* Sentiment */}
                <td className="py-4.5 px-5">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${getSentimentStyles(item.sentiment)}`}>
                    {item.sentiment || 'Neutral'}
                  </span>
                </td>

                {/* Recommendation Score */}
                <td className="py-4.5 px-5 font-bold">
                  <div className="flex items-center gap-2.5">
                    <span className="text-indigo-400 w-6 text-right">{item.recommendationScore ?? 0}</span>
                    <div className="w-16 bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-900 hidden sm:block">
                      <div 
                        className="bg-indigo-500 h-full rounded-full" 
                        style={{ width: `${item.recommendationScore ?? 0}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Risk Score */}
                <td className="py-4.5 px-5">
                  <span className={`px-2.5 py-0.5 rounded-[4px] font-bold border text-[10px] ${getRiskBg(item.riskScore ?? 0)} ${getRiskColor(item.riskScore ?? 0)}`}>
                    {item.riskScore ?? 0}% Risk
                  </span>
                </td>

                {/* Created Date */}
                <td className="py-4.5 px-5 text-right text-slate-500 font-semibold">
                  <div className="flex items-center justify-end gap-1.5">
                    <FiClock className="h-3.5 w-3.5 text-slate-650" />
                    {formatDate(item.createdAt)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlowCard>
  );
});

RecentTable.displayName = 'RecentTable';

export default RecentTable;
