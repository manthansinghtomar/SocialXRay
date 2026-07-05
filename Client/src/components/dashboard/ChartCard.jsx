import React from 'react';
import GlowCard from '../ui/GlowCard';

const ChartCard = ({ title, description, children, delay = 0 }) => {
  return (
    <GlowCard delay={delay} className="flex flex-col h-[350px]" innerClassName="h-full flex flex-col">
      <div className="mb-4">
        <h4 className="text-base font-semibold tracking-wide text-slate-200">
          {title}
        </h4>
        {description && (
          <p className="text-sm text-slate-500 mt-0.5">
            {description}
          </p>
        )}
      </div>
      <div className="flex-1 w-full min-h-0 relative">
        {children}
      </div>
    </GlowCard>
  );
};

export default ChartCard;
