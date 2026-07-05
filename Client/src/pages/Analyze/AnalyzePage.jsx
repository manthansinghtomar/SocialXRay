import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useNotifications } from '../../context/NotificationContext';
import { 
  FiCpu, FiSend, FiLoader, FiCheckCircle, FiAlertTriangle, FiArrowLeft, 
  FiBarChart2, FiMessageSquare, FiClock, FiFileText, FiTag, FiKey 
} from 'react-icons/fi';
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

import api from '../../services/api';

// UI components
import GlowCard from '../../components/ui/GlowCard';
import CyberButton from '../../components/ui/CyberButton';

const PLATFORMS = [
  'Instagram',
  'Facebook',
  'YouTube',
  'X',
  'LinkedIn',
  'TikTok',
  'Reddit',
  'Other'
];

const getPlatformIcon = (platform) => {
  const name = platform?.toLowerCase() || '';
  if (name.includes('instagram')) return <FaInstagram className="h-6 w-6 text-pink-500" />;
  if (name.includes('facebook')) return <FaFacebook className="h-6 w-6 text-blue-600" />;
  if (name.includes('youtube')) return <FaYoutube className="h-6 w-6 text-red-600" />;
  if (name.includes('linkedin')) return <FaLinkedin className="h-6 w-6 text-sky-500" />;
  if (name.includes('tiktok')) return <FaTiktok className="h-6 w-6 text-rose-500" />;
  if (name.includes('reddit')) return <FaReddit className="h-6 w-6 text-orange-500" />;
  if (name === 'x') return <FaTwitter className="h-6 w-6 text-slate-200" />;
  return <FaGlobe className="h-6 w-6 text-indigo-400" />;
};

const AnalyzePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const { addNotification } = useNotifications();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      platform: '',
      postText: '',
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/analysis/analyze', {
        platform: data.platform,
        postText: data.postText,
        likes: Number(data.likes) || 0,
        comments: Number(data.comments) || 0,
        shares: Number(data.shares) || 0,
        views: Number(data.views) || 0
      });

      if (response.data && response.data.success) {
        const resultData = response.data.data;
        setResult(resultData);
        toast.success('AI algorithm analysis completed successfully!');
        
        // Trigger real notifications
        addNotification(
          'Analysis Complete',
          `Successfully scanned post for platform: ${resultData.platform || 'General'}.`,
          'success',
          'check'
        );

        if (resultData.riskScore > 60) {
          addNotification(
            'High Risk Detected',
            `Content risk score is ${resultData.riskScore}% which exceeds safety threshold.`,
            'error',
            'alert'
          );
        }

        if (resultData.analysisSource === 'Gemini AI') {
          addNotification(
            'Gemini AI Engine Active',
            'Audit scanned successfully using Google Gemini Flash model.',
            'success',
            'cpu'
          );
        } else {
          addNotification(
            'Rule-Based Fallback Active',
            'Gemini API offline. Local rule mapping evaluated safety parameters.',
            'warning',
            'cpu'
          );
        }
      } else {
        setError('Analysis returned an unexpected response status.');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      if (!err.response) {
        setError('Unable to connect to the server. Please try again.');
      } else {
        setError(err.response.data?.error || 'Failed to complete algorithm analysis.');
      }
      toast.error('Diagnostic scan failed.');
      
      // Log warning fallback notification on total failure
      addNotification(
        'Rule-Based Fallback Active',
        'Gemini API offline. Local rule mapping evaluated safety parameters.',
        'warning',
        'cpu'
      );
    } finally {
      setLoading(false);
    }
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

  // Reset page to initial state for a new analysis
  const handleAnalyzeAnother = () => {
    setResult(null);
    setError(null);
    reset();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12 select-none">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Algorithm Analyzer</h1>
          <p className="text-sm text-slate-500 mt-1">Social feed decryptor & safety validator</p>
        </div>
      </div>

      {/* Connection / API Error state */}
      {error && !loading && (
        <div className="border border-rose-500/20 bg-rose-500/5 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <FiAlertTriangle className="h-6 w-6 text-rose-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-rose-400">Diagnostic Failure</h4>
              <p className="text-xs text-slate-400 mt-1">{error}</p>
            </div>
          </div>
          <CyberButton 
            variant="secondary" 
            onClick={handleSubmit(onSubmit)}
            className="flex-shrink-0"
          >
            Retry Decryption
          </CyberButton>
        </div>
      )}

      {/* Loading Scanning State */}
      {loading && (
        <GlowCard className="flex flex-col items-center justify-center py-20 text-center">
          <div className="relative flex h-24 w-24 items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/25 animate-ping" />
            <div className="absolute -inset-4 rounded-full border border-cyan-500/10 animate-pulse" />
            
            {/* Spinning scanner graphic */}
            <div className="h-16 w-16 rounded-full border-[3px] border-slate-900 border-t-indigo-500 border-r-cyan-400 animate-spin" />
            <FiCpu className="absolute h-6 w-6 text-indigo-400 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white mb-3.5">
            Interrogating Platform Algorithm
          </h3>
          <p className="text-sm text-slate-400 max-w-md mb-2 leading-relaxed">
            Running model aggregation workflows, calculating virality metrics, and validating safety parameters.
          </p>
          <div className="h-2.5 w-52 bg-slate-950 rounded-full overflow-hidden border border-slate-900 mt-6">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full animate-[shimmer_1.5s_infinite]" />
          </div>
        </GlowCard>
      )}

      {/* Results Panel */}
      {!loading && result && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Main Results card */}
          <GlowCard>
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900 pb-5 gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-slate-850 shadow-inner">
                  {getPlatformIcon(result.platform)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-200">Algorithmic Scan Complete</h3>
                  <p className="text-xs text-slate-500 mt-1">Source: {result.analysisSource || 'Engine'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1 rounded text-xs font-bold border ${getSentimentStyles(result.sentiment)}`}>
                  {result.sentiment || 'Pending'}
                </span>
                <span className="px-3 py-1 rounded text-xs font-bold border border-slate-800 bg-slate-900/60 text-slate-350">
                  {result.category || 'General'}
                </span>
              </div>
            </div>

            {/* Averages Score Grid */}
            <div className="grid grid-cols-2 mt-4 gap-5 sm:grid-cols-4">
              {/* Engagement Score */}
              <div className="bg-slate-950/40 border border-slate-900/80 rounded-lg p-5 flex flex-col justify-between">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Engagement</span>
                <div className="mt-2.5 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-indigo-400">{result.engagementScore ?? 0}</span>
                  <span className="text-xs text-slate-650">/100</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full mt-4 overflow-hidden border border-slate-900">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${result.engagementScore ?? 0}%` }} />
                </div>
              </div>

              {/* Virality Score */}
              <div className="bg-slate-950/40 border border-slate-900/80 rounded-lg p-5 flex flex-col justify-between">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Virality</span>
                <div className="mt-2.5 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-indigo-400">{result.viralityScore ?? 0}</span>
                  <span className="text-xs text-slate-650">/100</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full mt-4 overflow-hidden border border-slate-900">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${result.viralityScore ?? 0}%` }} />
                </div>
              </div>

              {/* Recommendation Score */}
              <div className="bg-slate-950/40 border border-slate-900/80 rounded-lg p-5 flex flex-col justify-between">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Recom. Index</span>
                <div className="mt-2.5 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-cyan-400">{result.recommendationScore ?? 0}</span>
                  <span className="text-xs text-slate-650">/100</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full mt-4 overflow-hidden border border-slate-900">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${result.recommendationScore ?? 0}%` }} />
                </div>
              </div>

              {/* Risk Score */}
              <div className="bg-slate-950/40 border border-slate-900/80 rounded-lg p-5 flex flex-col justify-between">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Risk Level</span>
                <div className="mt-2.5 flex items-baseline gap-1.5">
                  <span className={`text-3xl font-extrabold ${getRiskColor(result.riskScore ?? 0)}`}>{result.riskScore ?? 0}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full mt-4 overflow-hidden border border-slate-900">
                  <div className={`h-full rounded-full ${result.riskScore >= 70 ? 'bg-rose-500' : result.riskScore >= 30 ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${result.riskScore ?? 0}%` }} />
                </div>
              </div>
            </div>

            {/* AI Summary Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mt-4 text-sm font-bold text-slate-350 uppercase tracking-wider">
                <FiFileText className="h-5 w-5 text-indigo-400" />
                AI Summary
              </div>
              <div className="rounded-lg bg-slate-950/70 border border-slate-900 p-5 text-slate-300 text-base leading-relaxed font-mono">
                {result.aiSummary || 'No summary returned by the analyzer.'}
              </div>
            </div>

            {/* Score Explanation Split Columns */}
            <div className="grid grid-cols- mb-4 md:grid-cols-2 gap-6 pt-1">
              {/* Recommendation Reason */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mt-4 text-sm font-bold text-slate-350 uppercase tracking-wider">
                  <FiCheckCircle className="h-5 w-5 text-cyan-400" />
                  Recommendation Reason
                </div>
                <div className="rounded-lg bg-slate-950/40 border border-slate-900 p-5 text-slate-400 text-sm leading-relaxed">
                  {result.recommendationReason || 'No reasoning details calculated.'}
                </div>
              </div>

              {/* Risk Explanation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mt-4 text-sm font-bold text-slate-350 uppercase tracking-wider">
                  <FiAlertTriangle className="h-5 w-5 text-rose-500" />
                  Risk Explanation
                </div>
                <div className="rounded-lg bg-slate-950/40 border border-slate-900 p-5 text-slate-400 text-sm leading-relaxed">
                  {result.riskExplanation || 'No risk indicators detected.'}
                </div>
              </div>
            </div>

            {/* Detected Keywords and Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-900 pt-6 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <FiKey className="h-4.5 w-4.5 text-indigo-400" />
                  Detected Keywords
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {result.detectedKeywords && result.detectedKeywords.length > 0 ? (
                    result.detectedKeywords.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-950 border border-slate-900 text-slate-450 capitalize"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-600">None detected</span>
                  )}
                </div>
              </div>
              <div className="text-right text-xs text-slate-500">
                Created: {new Date(result.createdAt).toLocaleString()}
              </div>
            </div>
          </GlowCard>

          {/* Success actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-end">
            <CyberButton 
              variant="cyber" 
              onClick={handleAnalyzeAnother}
              className="w-full sm:w-auto"
            >
              Analyze Another Post
            </CyberButton>
            <CyberButton 
              variant="secondary" 
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto"
            >
              Go to Dashboard
            </CyberButton>
            <CyberButton 
              variant="ghost" 
              onClick={() => navigate('/history')}
              className="w-full sm:w-auto"
            >
              View Analysis History
            </CyberButton>
          </div>
        </motion.div>
      )}

      {/* Form Card */}
      {!loading && !result && (
        <GlowCard className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5 mb-6.5">
            <FiCpu className="h-5.5 w-5.5 text-indigo-400" />
            <h3 className="text-xl font-extrabold text-slate-200">
              Diagnostic Input Parameters
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Platform selection */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Platform Architecture
              </label>
              <select
                className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-5 py-3 text-sm text-slate-200 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                {...register('platform', { required: 'Platform is required' })}
              >
                <option value="" className="bg-slate-950 text-slate-500">Select feed platform...</option>
                {PLATFORMS.map((plat) => (
                  <option key={plat} value={plat} className="bg-slate-950 text-slate-200">{plat}</option>
                ))}
              </select>
              {errors.platform && (
                <p className="mt-2 text-xs text-rose-500 flex items-center gap-1">
                  <span>●</span> {errors.platform.message}
                </p>
              )}
            </div>

            {/* Post Content */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Post Content/Text Data
              </label>
              <textarea
                rows={5}
                className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-5 py-3 text-sm text-slate-200 placeholder-slate-650 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 resize-y min-h-[120px] leading-relaxed"
                placeholder="Enter the full text, hashtags, and links of the post to parse recommendation score risk index..."
                {...register('postText', { required: 'Post content is required' })}
              />
              {errors.postText && (
                <p className="mt-2 text-xs text-rose-500 flex items-center gap-1">
                  <span>●</span> {errors.postText.message}
                </p>
              )}
            </div>

            {/* Metrics 2x2 Grid */}
            <div className="grid grid-cols-2 gap-5">
              {/* Likes */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Likes Count
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-5 py-3 text-sm text-slate-200 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                  placeholder="0"
                  {...register('likes', { 
                    required: 'Likes count is required',
                    min: { value: 0, message: 'Value cannot be negative' }
                  })}
                />
                {errors.likes && (
                  <p className="mt-2 text-xs text-rose-500 flex items-center gap-1">
                    <span>●</span> {errors.likes.message}
                  </p>
                )}
              </div>

              {/* Comments */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Comments Count
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-5 py-3 text-sm text-slate-200 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                  placeholder="0"
                  {...register('comments', { 
                    required: 'Comments count is required',
                    min: { value: 0, message: 'Value cannot be negative' }
                  })}
                />
                {errors.comments && (
                  <p className="mt-2 text-xs text-rose-500 flex items-center gap-1">
                    <span>●</span> {errors.comments.message}
                  </p>
                )}
              </div>

              {/* Shares */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Shares Count
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-5 py-3 text-sm text-slate-200 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                  placeholder="0"
                  {...register('shares', { 
                    required: 'Shares count is required',
                    min: { value: 0, message: 'Value cannot be negative' }
                  })}
                />
                {errors.shares && (
                  <p className="mt-2 text-xs text-rose-500 flex items-center gap-1">
                    <span>●</span> {errors.shares.message}
                  </p>
                )}
              </div>

              {/* Views */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Views Count
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-5 py-3 text-sm text-slate-200 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                  placeholder="0"
                  {...register('views', { 
                    required: 'Views count is required',
                    min: { value: 0, message: 'Value cannot be negative' }
                  })}
                />
                {errors.views && (
                  <p className="mt-2 text-xs text-rose-500 flex items-center gap-1">
                    <span>●</span> {errors.views.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <CyberButton
                type="submit"
                variant="primary"
                className="w-full flex items-center justify-center gap-2.5 py-4"
              >
                <FiSend className="h-4.5 w-4.5" />
                Initialize AI Decryption
              </CyberButton>
            </div>
          </form>
        </GlowCard>
      )}
    </div>
  );
};

export default AnalyzePage;
