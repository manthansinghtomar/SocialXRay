import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiRefreshCw, FiAlertTriangle, FiCpu, FiTrendingUp, FiActivity, 
  FiCheckCircle, FiShield, FiExternalLink, FiPieChart, FiGlobe 
} from 'react-icons/fi';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';

import api from '../../services/api';

// Custom subcomponents
import DashboardCard from '../../components/dashboard/DashboardCard';
import ChartCard from '../../components/dashboard/ChartCard';
import RecentTable from '../../components/dashboard/RecentTable';
import EmptyState from '../../components/dashboard/EmptyState';
import LoadingSkeleton from '../../components/dashboard/LoadingSkeleton';

// Theme colors for charting
const CHART_COLORS = {
  indigo: '#6366f1',
  cyan: '#06b6d4',
  rose: '#f43f5e',
  amber: '#f59e0b',
  emerald: '#10b981',
  slate: '#64748b'
};

const PLATFORM_COLORS = [
  CHART_COLORS.cyan,
  CHART_COLORS.indigo,
  CHART_COLORS.rose,
  CHART_COLORS.amber,
  CHART_COLORS.slate
];

const SENTIMENT_COLORS = {
  positive: CHART_COLORS.emerald,
  negative: CHART_COLORS.rose,
  neutral: CHART_COLORS.slate,
  mixed: CHART_COLORS.amber
};

// Custom tooltip styling for Recharts
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-950/90 px-3 py-2 text-sm text-slate-200 shadow-xl backdrop-blur-md">
        <span className="font-semibold text-slate-400 capitalize">
          {payload[0].name}:
        </span>{' '}
        <span className="font-bold text-white ml-1">
          {payload[0].value}
        </span>
      </div>
    );
  }
  return null;
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  // Dashboard states
  const [overview, setOverview] = useState(null);
  const [platformStats, setPlatformStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [sentimentStats, setSentimentStats] = useState([]);
  const [recentAnalyses, setRecentAnalyses] = useState([]);

  // Fetch all dashboard data parallelly
  const fetchDashboardData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const [
        overviewRes,
        platformRes,
        categoryRes,
        sentimentRes,
        recentRes
      ] = await Promise.all([
        api.get('/dashboard/overview'),
        api.get('/dashboard/platform-stats'),
        api.get('/dashboard/category-stats'),
        api.get('/dashboard/sentiment-stats'),
        api.get('/dashboard/recent')
      ]);

      if (overviewRes.data?.success) setOverview(overviewRes.data.data);
      if (platformRes.data?.success) setPlatformStats(platformRes.data.data);
      if (categoryRes.data?.success) setCategoryStats(categoryRes.data.data);
      if (sentimentRes.data?.success) setSentimentStats(sentimentRes.data.data);
      if (recentRes.data?.success) setRecentAnalyses(recentRes.data.data);
      
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      if (!err.response) {
        setError('Unable to connect to the server. Please try again.');
      } else {
        setError(err.response.data?.error || 'Failed to sync with analytics database.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Memoized Chart Data Formatter for Platform Stats
  const platformChartData = useMemo(() => {
    return platformStats.map(item => ({
      name: item.platform || 'General',
      value: item.count || 0
    }));
  }, [platformStats]);

  // Memoized Chart Data Formatter for Category Stats
  const categoryChartData = useMemo(() => {
    return categoryStats.map(item => ({
      name: item.category || 'Uncategorized',
      value: item.count || 0
    }));
  }, [categoryStats]);

  // Memoized Chart Data Formatter for Sentiment Stats
  const sentimentChartData = useMemo(() => {
    return sentimentStats.map(item => ({
      name: item.sentiment || 'Neutral',
      value: item.count || 0
    }));
  }, [sentimentStats]);

  // Handle Retry button click
  const handleRetry = () => {
    fetchDashboardData();
  };

  // Render Loader
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Dashboard Overview</h1>
          <div className="h-10 w-32 rounded bg-slate-900 animate-pulse" />
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  // Render Error State
  if (error) {
    return (
      <div className="flex min-h-[480px] flex-col items-center justify-center text-center p-8 bg-slate-950/20 border border-slate-900 rounded-xl max-w-2xl mx-auto my-8 space-y-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 animate-bounce">
          <FiAlertTriangle className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-200 mb-2">
            Diagnostic System Offline
          </h3>
          <p className="text-base text-slate-400 max-w-md">
            {error}
          </p>
        </div>
        <button
          onClick={handleRetry}
          className="flex items-center gap-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer"
        >
          <FiRefreshCw className="h-4.5 w-4.5" />
          Retry Connection
        </button>
      </div>
    );
  }

  // Render Empty Dashboard State (if analyses counts is 0)
  if (!overview || overview.totalAnalyses === 0) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Dashboard Overview</h1>
          <button
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700/80 px-5 py-3 text-sm font-semibold text-slate-300 transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            <FiRefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin text-indigo-400' : ''}`} />
            Sync Feeds
          </button>
        </div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Diagnostics sync: Active session
          </p>
        </div>

        <button
          onClick={() => fetchDashboardData(true)}
          disabled={refreshing}
          className="flex items-center gap-2.5 rounded-lg bg-slate-950 border border-slate-900 hover:border-indigo-500/30 px-5 py-3 text-sm font-bold text-slate-300 hover:text-indigo-400 transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-md select-none"
        >
          <FiRefreshCw className={`h-4.5 w-4.5 ${refreshing ? 'animate-spin text-indigo-400' : ''}`} />
          {refreshing ? 'Syncing...' : 'Sync Database'}
        </button>
      </div>

      {/* 9 Cards Overview Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Interactive: Navigate to History */}
        <DashboardCard 
          title="Total Analyses"
          value={overview.totalAnalyses}
          trend="+12% scans run"
          trendType="positive"
          icon={FiCpu}
          delay={0.05}
          onClick={() => navigate('/history')}
        />

        <DashboardCard 
          title="Avg Engagement"
          value={`${overview.averageEngagement}%`}
          trend="+4% vs baseline"
          trendType="positive"
          icon={FiTrendingUp}
          delay={0.1}
        />

        <DashboardCard 
          title="Avg Virality"
          value={`${overview.averageVirality}%`}
          trend="+8.5% scale factor"
          trendType="positive"
          icon={FiActivity}
          delay={0.15}
        />

        <DashboardCard 
          title="Avg Recommendation"
          value={`${overview.averageRecommendation}%`}
          trend="+3.2% feed push"
          trendType="positive"
          icon={FiCheckCircle}
          delay={0.2}
        />

        <DashboardCard 
          title="Avg Risk Factor"
          value={`${overview.averageRisk}%`}
          trend="-2.1% safer output"
          trendType="positive"
          icon={FiAlertTriangle}
          delay={0.25}
        />

        {/* Interactive: Navigate to History */}
        <DashboardCard 
          title="High Risk Posts"
          value={overview.highRiskPosts}
          trend="-15% severe reports"
          trendType="positive"
          icon={FiShield}
          delay={0.3}
          onClick={() => navigate('/history')}
        />

        <DashboardCard 
          title="Safe Posts"
          value={overview.safePosts}
          trend="+22.8% positive ratio"
          trendType="positive"
          icon={FiShield}
          delay={0.35}
        />

        {/* Interactive: Navigate to History */}
        <DashboardCard 
          title="Most Used Platform"
          value={overview.mostUsedPlatform}
          trend="Primary target source"
          trendType="info"
          icon={FiExternalLink}
          delay={0.4}
          onClick={() => navigate('/history')}
        />

        <DashboardCard 
          title="Most Analyzed Category"
          value={overview.mostAnalyzedCategory}
          trend="Highest volume sector"
          trendType="info"
          icon={FiPieChart}
          delay={0.45}
        />
      </div>

      {/* 3 Charts Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Platform stats Pie chart */}
        <ChartCard 
          title="Platform Distribution"
          description="Volume analysis count across social architectures"
          delay={0.5}
        >
          {platformChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformChartData}
                  cx="50%"
                  cy="45%"
                  innerRadius={0}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                  label={{ fontSize: 11, fill: '#cbd5e1' }}
                >
                  {platformChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={PLATFORM_COLORS[index % PLATFORM_COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '13px', color: '#cbd5e1', paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-slate-500">
              No platform statistics available
            </div>
          )}
        </ChartCard>

        {/* Category Stats Bar chart */}
        <ChartCard 
          title="Category Analysis"
          description="Classification volume matching decrypted feeds"
          delay={0.55}
        >
          {categoryChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryChartData}
                margin={{ top: 10, right: 10, left: -25, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  fontSize={11} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={11} 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill={CHART_COLORS.indigo} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-slate-500">
              No category statistics available
            </div>
          )}
        </ChartCard>

        {/* Sentiment Stats Donut Chart */}
        <ChartCard 
          title="Sentiment Aggregation"
          description="AI sentiment index breakdown across scanned profiles"
          delay={0.6}
        >
          {sentimentChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentChartData}
                  cx="50%"
                  cy="45%"
                  innerRadius={52}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                  label={{ fontSize: 11, fill: '#cbd5e1' }}
                >
                  {sentimentChartData.map((entry, index) => {
                    const nameLower = entry.name?.toLowerCase() || '';
                    let color = CHART_COLORS.slate;
                    if (nameLower.includes('pos')) color = SENTIMENT_COLORS.positive;
                    else if (nameLower.includes('neg')) color = SENTIMENT_COLORS.negative;
                    else if (nameLower.includes('mix')) color = SENTIMENT_COLORS.mixed;
                    
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '13px', color: '#cbd5e1', paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-slate-500">
              No sentiment statistics available
            </div>
          )}
        </ChartCard>
      </div>

      {/* Recent Feed Table Component */}
      <RecentTable analyses={recentAnalyses} />
    </div>
  );
};

export default DashboardPage;
