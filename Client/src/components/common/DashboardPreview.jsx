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
    <section className="py-20 md:py-28 border-t border-slate-900 bg-slate-950/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400">
            Interface Preview
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Real-Time Algorithmic Audit
          </p>
          <p className="mx-auto max-w-xl text-base text-slate-400 leading-relaxed">
            A high-fidelity layout preview of the SocialXRay dashboard. Track metrics extracted directly by our Gemini model.
          </p>
        </div>

        {/* Dashboard Shell Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-slate-900 bg-slate-950/40 p-6 md:p-8 backdrop-blur-md shadow-2xl shadow-indigo-950/20"
        >
          {/* Mock Window Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-800" />
                <span className="h-3 w-3 rounded-full bg-slate-800" />
                <span className="h-3 w-3 rounded-full bg-slate-800" />
              </div>
              <div className="h-5 w-px bg-slate-900" />
              <div className="flex items-center gap-2.5">
                <span className="rounded bg-indigo-500/10 px-2.5 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/20">
                  {mockAnalysis.platform}
                </span>
                <span className="text-xs text-slate-500">/</span>
                <span className="text-xs text-slate-400 font-bold">{mockAnalysis.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500">AUDITOR:</span>
              <span className="text-cyan-400 font-extrabold flex items-center gap-1.5">
                <FiCpu className="animate-spin" /> {mockAnalysis.analysisSource}
              </span>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Side: Post Text & Metadata */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Post Text Card */}
              <div className="rounded-lg border border-slate-900 bg-slate-950/80 p-5 space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scanned Post Content</h4>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans italic">
                  "{mockAnalysis.postText}"
                </p>
                {/* Stats */}
                <div className="grid grid-cols-4 gap-3 pt-3.5 border-t border-slate-900 text-center">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                      <FiEye className="h-4 w-4" /> Views
                    </span>
                    <p className="text-sm font-mono font-extrabold text-slate-350">{mockAnalysis.views.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                      <FiThumbsUp className="h-4 w-4" /> Likes
                    </span>
                    <p className="text-sm font-mono font-extrabold text-slate-350">{mockAnalysis.likes.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                      <FiMessageSquare className="h-4 w-4" /> Comments
                    </span>
                    <p className="text-sm font-mono font-extrabold text-slate-350">{mockAnalysis.comments.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                      <FiShare2 className="h-4 w-4" /> Shares
                    </span>
                    <p className="text-sm font-mono font-extrabold text-slate-350">{mockAnalysis.shares.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Explainer Insights */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-900 bg-slate-950/50 p-5 space-y-3.5">
                  <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FiActivity className="h-4 w-4" /> AI Summary & Sentiment
                  </h5>
                  <div className="inline-flex rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                    Sentiment: {mockAnalysis.sentiment}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {mockAnalysis.aiSummary}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-900 bg-slate-950/50 p-5 space-y-3.5">
                  <h5 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FiAlertOctagon className="h-4 w-4" /> Risk Explanation
                  </h5>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {mockAnalysis.riskExplanation}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Score Dials & Explanations */}
            <div className="space-y-6">
              
              {/* Score Lists */}
              <div className="rounded-lg border border-slate-900 bg-slate-950/80 p-5 space-y-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Algorithmic Scorecard</h4>
                
                {/* Score Item 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-semibold">Virality Index</span>
                    <span className="font-mono text-indigo-400 font-extrabold">{mockAnalysis.viralityScore}%</span>
                  </div>
                  <div className="h-3.5 w-full rounded bg-slate-900 overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${mockAnalysis.viralityScore}%` }} />
                  </div>
                </div>

                {/* Score Item 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-semibold">Engagement Potential</span>
                    <span className="font-mono text-cyan-400 font-extrabold">{mockAnalysis.engagementScore}%</span>
                  </div>
                  <div className="h-3.5 w-full rounded bg-slate-900 overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: `${mockAnalysis.engagementScore}%` }} />
                  </div>
                </div>

                {/* Score Item 3 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-semibold">Recommendation Score</span>
                    <span className="font-mono text-blue-400 font-extrabold">{mockAnalysis.recommendationScore}%</span>
                  </div>
                  <div className="h-3.5 w-full rounded bg-slate-900 overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${mockAnalysis.recommendationScore}%` }} />
                  </div>
                </div>

                {/* Score Item 4 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-semibold">Moderation Risk Score</span>
                    <span className="font-mono text-red-500 font-extrabold">{mockAnalysis.riskScore}%</span>
                  </div>
                  <div className="h-3.5 w-full rounded bg-slate-900 overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${mockAnalysis.riskScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Recommendation Reason */}
              <div className="rounded-lg border border-slate-900 bg-slate-950/50 p-5 space-y-3.5">
                <h5 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FiTrendingUp className="h-4.5 w-4.5" /> Recommendation Logic
                </h5>
                <p className="text-sm text-slate-400 leading-relaxed">
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
