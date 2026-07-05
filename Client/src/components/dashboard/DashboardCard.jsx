import React from 'react';
import GlowCard from '../ui/GlowCard';

const DashboardCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendType = 'info', 
  onClick, 
  delay = 0 
}) => {
  const isClickable = !!onClick;

  // Determine trend text color
  const getTrendColor = () => {
    switch (trendType) {
      case 'positive':
        return 'text-emerald-400';
      case 'negative':
        return 'text-rose-500';
      case 'neutral':
        return 'text-slate-400';
      default:
        return 'text-cyan-400';
    }
  };

  return (
    <GlowCard 
      delay={delay}
      className={`relative select-none ${
        isClickable 
          ? 'cursor-pointer hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:border-indigo-500/50 active:scale-[0.98]' 
          : ''
      }`}
    >
      <div onClick={onClick} className="flex flex-col h-full justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          {Icon && (
            <div className={`p-2 rounded-lg bg-slate-900/80 border border-slate-800 ${isClickable ? 'group-hover:text-indigo-400 group-hover:border-indigo-500/30' : ''} text-slate-400 transition-colors duration-300`}>
              <Icon className="h-4.5 w-4.5" />
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
            {value}
          </h3>
          {trend && (
            <div className="flex items-center gap-1 text-[11px] font-medium">
              <span className={getTrendColor()}>{trend}</span>
              <span className="text-slate-500">vs historical baseline</span>
            </div>
          )}
        </div>
      </div>
    </GlowCard>
  );
};

export default DashboardCard;
