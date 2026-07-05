import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FiSearch, FiTrash2, FiFileText, FiAlertTriangle, FiCpu, 
  FiGlobe, FiClock, FiExternalLink, FiBarChart2, FiCheckCircle, 
  FiEye, FiTrendingUp, FiActivity, FiTag, FiKey, FiCornerDownRight 
} from 'react-icons/fi';

import api from '../../services/api';

// UI components
import GlowCard from '../../components/ui/GlowCard';
import CyberButton from '../../components/ui/CyberButton';

const PLATFORMS = ['Instagram', 'Facebook', 'YouTube', 'X', 'LinkedIn', 'TikTok', 'Reddit', 'Other'];
const SENTIMENTS = ['Positive', 'Neutral', 'Negative', 'Pending'];

const HistoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyses, setAnalyses] = useState([]);

  // Filter/Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Modal States
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch full analysis history
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/analysis/history');
      if (response.data && response.data.success) {
        setAnalyses(response.data.data || []);
      } else {
        setError('Failed to load audit history.');
      }
    } catch (err) {
      console.error('Fetch history error:', err);
      if (!err.response) {
        setError('Unable to connect to the server. Please try again.');
      } else {
        setError(err.response.data?.error || 'Failed to retrieve analysis log files.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Handle individual record deletion
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/analysis/${id}`);
      if (response.data && response.data.success) {
        toast.success('Analysis record purged successfully.');
        setAnalyses((prev) => prev.filter((item) => item._id !== id));
        setDeletingId(null);
      } else {
        toast.error('Failed to delete analysis.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err.response?.data?.error || 'Failed to purge record.');
    }
  };

  // Color boundaries for risk scores (as requested)
  // Green: 0–30, Yellow: 31–60, Red: 61–100
  const getRiskColor = (score) => {
    if (score >= 61) return 'text-rose-500';
    if (score >= 31) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getRiskBg = (score) => {
    if (score >= 61) return 'bg-rose-500/10 border-rose-500/20';
    if (score >= 31) return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-emerald-500/10 border-emerald-500/20';
  };

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

  // Format dates
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Client-side search, filtering, and sorting pipeline
  const processedAnalyses = useMemo(() => {
    let result = [...analyses];

    // 1. Search Query Match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.postText?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.platform?.toLowerCase().includes(q)
      );
    }

    // 2. Platform Filter
    if (platformFilter) {
      result = result.filter(item => item.platform === platformFilter);
    }

    // 3. Sentiment Filter
    if (sentimentFilter) {
      result = result.filter(item => item.sentiment === sentimentFilter);
    }

    // 4. Sort Ordering
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === 'oldest' ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [analyses, searchQuery, platformFilter, sentimentFilter, sortBy]);

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Audit Log History</h1>
        <p className="text-xs text-slate-500 mt-0.5">Audit, filter, and decrypt historical algorithm scan logs</p>
      </div>

      {/* Connection / API Error state */}
      {error && !loading && (
        <div className="border border-rose-500/20 bg-rose-500/5 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <FiAlertTriangle className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-rose-400">Diagnostic Failure</h4>
              <p className="text-xs text-slate-400 mt-1">{error}</p>
            </div>
          </div>
          <CyberButton 
            variant="secondary" 
            onClick={fetchHistory}
            className="flex-shrink-0"
          >
            Retry Connection
          </CyberButton>
        </div>
      )}

      {/* Search and Filters Toolbar */}
      {!error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 bg-slate-900/10 border border-slate-900 rounded-xl p-4">
          {/* Search Query */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <FiSearch className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-650 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
              placeholder="Search logs post content..."
            />
          </div>

          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-350 outline-none transition-all duration-200 focus:border-indigo-500"
          >
            <option value="">All Platforms</option>
            {PLATFORMS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          {/* Sentiment Filter */}
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-350 outline-none transition-all duration-200 focus:border-indigo-500"
          >
            <option value="">All Sentiments</option>
            {SENTIMENTS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Sort Select */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-350 outline-none transition-all duration-200 focus:border-indigo-500"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
          </select>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[210px] rounded-xl border border-slate-900 bg-slate-950/40 p-6 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-4.5 w-24 rounded bg-slate-850" />
                  <div className="h-3 w-16 rounded bg-slate-900" />
                </div>
                <div className="h-3 w-full rounded bg-slate-900 mt-2" />
                <div className="h-3 w-4/5 rounded bg-slate-900" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                <div className="h-5 w-28 rounded bg-slate-900" />
                <div className="flex gap-2">
                  <div className="h-8 w-16 rounded bg-slate-850" />
                  <div className="h-8 w-8 rounded bg-slate-900" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && processedAnalyses.length === 0 && (
        <GlowCard className="flex flex-col items-center justify-center p-12 text-center max-w-2xl mx-auto my-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-500 mb-4">
            <FiSearch className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 mb-2">No Diagnostic Logs Matched</h3>
          <p className="text-sm text-slate-400 max-w-sm mb-4">
            {analyses.length === 0 
              ? "You haven't run any AI feed scans yet. Go to the Algorithm Analyzer page to begin diagnostics." 
              : "No diagnostic files match your active filters or search terms. Try clearing the parameters."}
          </p>
          {analyses.length > 0 && (
            <CyberButton 
              variant="secondary" 
              onClick={() => {
                setSearchQuery('');
                setPlatformFilter('');
                setSentimentFilter('');
              }}
            >
              Reset Filters
            </CyberButton>
          )}
        </GlowCard>
      )}

      {/* Audit Logs Grid */}
      {!loading && !error && processedAnalyses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {processedAnalyses.map((item) => (
            <GlowCard key={item._id} className="flex flex-col justify-between h-full hover:border-slate-800 transition-all duration-300">
              <div className="space-y-4">
                {/* Card Top Row */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200 uppercase">{item.platform}</span>
                    <span className="text-[10px] text-slate-550">•</span>
                    <span className="text-[10px] text-slate-500 font-mono">{item.category}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-semibold border ${getSentimentStyles(item.sentiment)}`}>
                    {item.sentiment}
                  </span>
                </div>

                {/* Post snippet */}
                <div className="space-y-1.5">
                  <p className="text-xs text-slate-350 line-clamp-2 leading-relaxed italic pr-2">
                    "{item.postText}"
                  </p>
                  <div className="flex items-center gap-1.5 pt-1.5">
                    <span className="text-[10px] text-slate-500 font-mono">Engine:</span>
                    <span className="text-[10px] text-indigo-400 font-semibold">{item.analysisSource}</span>
                  </div>
                </div>

                {/* Score Indicators */}
                <div className="grid grid-cols-2 gap-3 bg-slate-950/30 border border-slate-900/60 rounded-lg p-3">
                  {/* Recommendation score */}
                  <div className="flex flex-col justify-between">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Recom. Score</span>
                    <span className="text-sm font-bold text-cyan-400 mt-1">{item.recommendationScore}%</span>
                  </div>

                  {/* Risk Score (Green: 0-30, Yellow: 31-60, Red: 61-100) */}
                  <div className="flex flex-col justify-between">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Risk Index</span>
                    <span className={`text-sm font-bold mt-1 ${getRiskColor(item.riskScore)}`}>
                      {item.riskScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-slate-900/80">
                <span className="text-[10px] text-slate-550 flex items-center gap-1">
                  <FiClock className="h-3 w-3" />
                  {formatDate(item.createdAt)}
                </span>
                
                <div className="flex items-center gap-2">
                  <CyberButton
                    variant="cyber"
                    onClick={() => setSelectedAnalysis(item)}
                    className="!px-3.5 !py-1.5"
                  >
                    View Details
                  </CyberButton>
                  <button
                    onClick={() => setDeletingId(item._id)}
                    className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg border border-transparent hover:border-rose-500/20 transition-all duration-200 cursor-pointer"
                    title="Purge Analysis"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      )}

      {/* Details Modal Overlay */}
      <AnimatePresence>
        {selectedAnalysis && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAnalysis(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-3xl rounded-xl border border-slate-800 bg-slate-950/90 shadow-2xl p-6 backdrop-blur-md max-h-[85vh] overflow-y-auto custom-scrollbar"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <FiCpu className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">Decrypted Diagnostic Record</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">Logs audit timestamp: {formatDate(selectedAnalysis.createdAt)}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAnalysis(null)}
                  className="p-1 rounded-lg border border-slate-900 text-slate-450 hover:bg-slate-900 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="space-y-6">
                {/* 1. Original Input values block */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FiCornerDownRight className="h-3 w-3 text-indigo-400" />
                    Original Diagnostic Parameters
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Platform */}
                    <div className="bg-slate-900/20 border border-slate-900 rounded-lg p-3">
                      <span className="text-[9px] uppercase text-slate-500 font-semibold">Feed Platform</span>
                      <p className="text-xs font-bold text-slate-300 mt-1 capitalize">{selectedAnalysis.platform}</p>
                    </div>

                    {/* Category & Sentiment */}
                    <div className="bg-slate-900/20 border border-slate-900 rounded-lg p-3">
                      <span className="text-[9px] uppercase text-slate-500 font-semibold">AI Class / Sentiment</span>
                      <p className="text-xs font-bold text-slate-300 mt-1 flex items-center gap-1.5">
                        <span className="capitalize">{selectedAnalysis.category}</span>
                        <span className="text-slate-650">|</span>
                        <span className="capitalize">{selectedAnalysis.sentiment}</span>
                      </p>
                    </div>

                    {/* Counts metrics split */}
                    <div className="bg-slate-900/20 border border-slate-900 rounded-lg p-3 flex flex-wrap gap-x-3 gap-y-1">
                      <div className="min-w-[60px]">
                        <span className="text-[8px] uppercase text-slate-500 font-semibold">Likes:</span>
                        <span className="text-[11px] font-bold text-slate-350 ml-1">{selectedAnalysis.likes ?? 0}</span>
                      </div>
                      <div className="min-w-[60px]">
                        <span className="text-[8px] uppercase text-slate-500 font-semibold">Comments:</span>
                        <span className="text-[11px] font-bold text-slate-350 ml-1">{selectedAnalysis.comments ?? 0}</span>
                      </div>
                      <div className="min-w-[60px]">
                        <span className="text-[8px] uppercase text-slate-500 font-semibold">Shares:</span>
                        <span className="text-[11px] font-bold text-slate-350 ml-1">{selectedAnalysis.shares ?? 0}</span>
                      </div>
                      <div className="min-w-[60px]">
                        <span className="text-[8px] uppercase text-slate-500 font-semibold">Views:</span>
                        <span className="text-[11px] font-bold text-slate-350 ml-1">{selectedAnalysis.views ?? 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Content box */}
                  <div className="mt-2.5">
                    <span className="text-[9px] uppercase text-slate-500 font-semibold">Raw Text Content</span>
                    <div className="mt-1 rounded-lg bg-slate-950 p-4 border border-slate-900 font-mono text-xs text-indigo-300 max-h-[140px] overflow-y-auto leading-relaxed">
                      {selectedAnalysis.postText}
                    </div>
                  </div>
                </div>

                {/* 2. Algorithmic Scores */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FiBarChart2 className="h-3.5 w-3.5 text-indigo-400" />
                    Calculated Metrics
                  </span>
                  
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {/* Engagement */}
                    <div className="bg-slate-900/10 border border-slate-900 rounded-lg p-3">
                      <span className="text-[8px] uppercase text-slate-500 font-semibold">Engagement</span>
                      <div className="text-lg font-bold text-slate-200 mt-1">{selectedAnalysis.engagementScore}/100</div>
                      <div className="w-full bg-slate-950 h-1 rounded-full mt-2 overflow-hidden border border-slate-900">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${selectedAnalysis.engagementScore}%` }} />
                      </div>
                    </div>

                    {/* Virality */}
                    <div className="bg-slate-900/10 border border-slate-900 rounded-lg p-3">
                      <span className="text-[8px] uppercase text-slate-500 font-semibold">Virality</span>
                      <div className="text-lg font-bold text-slate-200 mt-1">{selectedAnalysis.viralityScore}/100</div>
                      <div className="w-full bg-slate-950 h-1 rounded-full mt-2 overflow-hidden border border-slate-900">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${selectedAnalysis.viralityScore}%` }} />
                      </div>
                    </div>

                    {/* Recommendation Index */}
                    <div className="bg-slate-900/10 border border-slate-900 rounded-lg p-3">
                      <span className="text-[8px] uppercase text-slate-500 font-semibold">Recom. Index</span>
                      <div className="text-lg font-bold text-cyan-400 mt-1">{selectedAnalysis.recommendationScore}/100</div>
                      <div className="w-full bg-slate-950 h-1 rounded-full mt-2 overflow-hidden border border-slate-900">
                        <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${selectedAnalysis.recommendationScore}%` }} />
                      </div>
                    </div>

                    {/* Risk Index (Green: 0-30, Yellow: 31-60, Red: 61-100) */}
                    <div className="bg-slate-900/10 border border-slate-900 rounded-lg p-3">
                      <span className="text-[8px] uppercase text-slate-500 font-semibold">Risk Index</span>
                      <div className={`text-lg font-bold mt-1 ${getRiskColor(selectedAnalysis.riskScore)}`}>
                        {selectedAnalysis.riskScore}%
                      </div>
                      <div className="w-full bg-slate-950 h-1 rounded-full mt-2 overflow-hidden border border-slate-900">
                        <div className={`h-full rounded-full ${selectedAnalysis.riskScore >= 61 ? 'bg-rose-500' : selectedAnalysis.riskScore >= 31 ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${selectedAnalysis.riskScore}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. AI summaries and reasonings */}
                <div className="space-y-4 pt-1">
                  {/* Summary */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <FiFileText className="h-3.5 w-3.5 text-indigo-400" />
                      AI Summary Description
                    </span>
                    <div className="rounded-lg bg-slate-900/10 border border-slate-900 p-4 text-slate-350 text-xs leading-relaxed">
                      {selectedAnalysis.aiSummary || 'Summary unavailable.'}
                    </div>
                  </div>

                  {/* Recommendation reasoning & Risk factors */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <FiCheckCircle className="h-3.5 w-3.5 text-cyan-400" />
                        Recommendation Reason
                      </span>
                      <div className="rounded-lg bg-slate-900/10 border border-slate-900 p-4 text-slate-400 text-[11px] leading-relaxed">
                        {selectedAnalysis.recommendationReason || 'Reasoning details not populated.'}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <FiAlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                        Risk Explanation
                      </span>
                      <div className="rounded-lg bg-slate-900/10 border border-slate-900 p-4 text-slate-400 text-[11px] leading-relaxed">
                        {selectedAnalysis.riskExplanation || 'Risk calculations not populated.'}
                      </div>
                    </div>
                  </div>

                  {/* Detected Keywords */}
                  <div className="space-y-1.5 pt-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <FiKey className="h-3.5 w-3.5 text-indigo-400" />
                      Detected Keywords
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnalysis.detectedKeywords && selectedAnalysis.detectedKeywords.length > 0 ? (
                        selectedAnalysis.detectedKeywords.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-400 capitalize"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-650">None detected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                <span>Engine Source: {selectedAnalysis.analysisSource}</span>
                <CyberButton 
                  variant="secondary" 
                  onClick={() => setSelectedAnalysis(null)}
                >
                  Close Decryptor
                </CyberButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal Overlay */}
      <AnimatePresence>
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletingId(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-md rounded-xl border border-rose-500/20 bg-slate-950/90 shadow-2xl p-6 backdrop-blur-md"
            >
              <div className="flex items-center gap-3 text-rose-500 mb-4">
                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <FiAlertTriangle className="h-5 w-5 animate-pulse" />
                </div>
                <h3 className="text-base font-bold text-slate-200">Purging Audit Log File</h3>
              </div>

              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                You are performing a destructive purge action. This will permanently remove the analysis scan details from the server database, including AI metrics and records. This action cannot be undone.
              </p>

              <div className="flex items-center gap-3 justify-end">
                <CyberButton 
                  variant="ghost" 
                  onClick={() => setDeletingId(null)}
                >
                  Abort Action
                </CyberButton>
                <button
                  onClick={() => handleDelete(deletingId)}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white shadow-lg shadow-rose-900/30 border border-rose-500/30 cursor-pointer"
                >
                  Confirm Purge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryPage;
