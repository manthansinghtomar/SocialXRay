import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiAlertOctagon, FiCpu, FiMessageSquare, FiThumbsUp, FiShare2, FiEye, FiActivity } from 'react-icons/fi';
import GlowCard from '../ui/GlowCard';

const DashboardPreview = () => {
  // Exact model schema content representation
  const mockAnalysis = {
    platform: 'X',
    category: 'Technology',
    sentiment: 'Positive',
    analysisSource: 'Gemini AI',
    postText: 'Exposing the hidden parameters of algorithmic recommendations! The new SocialXRay audit tool scans post structures to warn creators of shadowbans and reach optimization blocks. Check the link for details.',
    likes: 1240,
    comments: 320,
    shares: 480,
    views: 18500,
    viralityScore: 82,
    engagementScore: 75,
    recommendationScore: 91,
    riskScore: 12,
    aiSummary: 'This post performs exceptionally well due to high sentiment alignment and structured hashtag layouts. Engagement indicators are positive.',
    riskExplanation: 'Risk factors are minimal. The post content complies with core community safety guidelines, and no shadowban keywords were found.',
    recommendationReason: 'High recommendation likelihood. The post category matches high-interest tech trends, prompting seed visibility distribution.'
  };

  return (
    <section className="py-16 md:py-24 border-t border-slate-900 bg-slate-950/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Interface Preview
          </h2>
          <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Real-Time Algorithmic Audit
          </p>
          <p className="mx-auto max-w-lg text-xs text-slate-400">
            A high-fidelity layout preview of the SocialXRay dashboard. Track metrics extracted directly by our Gemini model.
          </p>
        </div>

        {/* Dashboard Shell Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-slate-900 bg-slate-950/40 p-4 md:p-6 backdrop-blur-md shadow-2xl shadow-indigo-950/20"
        >
          {/* Mock Window Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-900 pb-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
              </div>
              <div className="h-4 w-px bg-slate-900" />
              <div className="flex items-center gap-2">
                <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[9px] font-semibold text-indigo-400 border border-indigo-500/20">
                  {mockAnalysis.platform}
                </span>
                <span className="text-[10px] text-slate-500">/</span>
                <span className="text-[10px] text-slate-400 font-semibold">{mockAnalysis.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[9px] font-mono">
              <span className="text-slate-500">AUDITOR:</span>
              <span className="text-cyan-400 font-bold flex items-center gap-1">
                <FiCpu className="animate-spin" /> {mockAnalysis.analysisSource}
              </span>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Side: Post Text & Metadata */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Post Text Card */}
              <div className="rounded-lg border border-slate-900 bg-slate-950/80 p-4 space-y-3">
                <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Scanned Post Content</h4>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  "{mockAnalysis.postText}"
                </p>
                {/* Stats */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-900 text-center">
                  <div className="space-y-1">
                    <span className="text-[8px] text-slate-500 flex items-center justify-center gap-1">
                      <FiEye className="h-3 w-3" /> Views
                    </span>
                    <p className="text-xs font-mono font-bold text-slate-350">{mockAnalysis.views.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] text-slate-500 flex items-center justify-center gap-1">
                      <FiThumbsUp className="h-3 w-3" /> Likes
                    </span>
                    <p className="text-xs font-mono font-bold text-slate-350">{mockAnalysis.likes.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] text-slate-500 flex items-center justify-center gap-1">
                      <FiMessageSquare className="h-3 w-3" /> Comments
                    </span>
                    <p className="text-xs font-mono font-bold text-slate-350">{mockAnalysis.comments.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] text-slate-500 flex items-center justify-center gap-1">
                      <FiShare2 className="h-3 w-3" /> Shares
                    </span>
                    <p className="text-xs font-mono font-bold text-slate-350">{mockAnalysis.shares.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Explainer Insights */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-900 bg-slate-950/50 p-4 space-y-2">
                  <h5 className="text-[9px] font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                    <FiActivity className="h-3.5 w-3.5" /> AI Summary & Sentiment
                  </h5>
                  <div className="inline-flex rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[8px] font-bold text-emerald-400">
                    Sentiment: {mockAnalysis.sentiment}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {mockAnalysis.aiSummary}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-900 bg-slate-950/50 p-4 space-y-2">
                  <h5 className="text-[9px] font-semibold text-red-400 uppercase tracking-wider flex items-center gap-1">
                    <FiAlertOctagon className="h-3.5 w-3.5" /> Risk Explanation
                  </h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {mockAnalysis.riskExplanation}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Score Dials & Explanations */}
            <div className="space-y-6">
              
              {/* Score Lists */}
              <div className="rounded-lg border border-slate-900 bg-slate-950/80 p-4 space-y-4">
                <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Algorithmic Scorecard</h4>
                
                {/* Score Item 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Virality Index</span>
                    <span className="font-mono text-indigo-400 font-bold">{mockAnalysis.viralityScore}%</span>
                  </div>
                  <div className="h-2 w-full rounded bg-slate-900 overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${mockAnalysis.viralityScore}%` }} />
                  </div>
                </div>

                {/* Score Item 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Engagement Potential</span>
                    <span className="font-mono text-cyan-400 font-bold">{mockAnalysis.engagementScore}%</span>
                  </div>
                  <div className="h-2 w-full rounded bg-slate-900 overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: `${mockAnalysis.engagementScore}%` }} />
                  </div>
                </div>

                {/* Score Item 3 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Recommendation Score</span>
                    <span className="font-mono text-blue-400 font-bold">{mockAnalysis.recommendationScore}%</span>
                  </div>
                  <div className="h-2 w-full rounded bg-slate-900 overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${mockAnalysis.recommendationScore}%` }} />
                  </div>
                </div>

                {/* Score Item 4 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Moderation Risk Score</span>
                    <span className="font-mono text-red-500 font-bold">{mockAnalysis.riskScore}%</span>
                  </div>
                  <div className="h-2 w-full rounded bg-slate-900 overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${mockAnalysis.riskScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Recommendation Reason */}
              <div className="rounded-lg border border-slate-900 bg-slate-950/50 p-4 space-y-2">
                <h5 className="text-[9px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                  <FiTrendingUp className="h-3.5 w-3.5" /> Recommendation Logic
                </h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {mockAnalysis.recommendationReason}
                </p>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default DashboardPreview;
