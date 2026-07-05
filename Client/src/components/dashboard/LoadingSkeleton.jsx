import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse select-none">
      {/* Overview Metric Cards Skeleton Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(9)].map((_, i) => (
          <div 
            key={i} 
            className="h-[135px] rounded-xl border border-slate-900 bg-slate-950/40 p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 rounded bg-slate-800" />
              <div className="h-8 w-8 rounded-lg bg-slate-900" />
            </div>
            <div className="space-y-2.5">
              <div className="h-7 w-20 rounded bg-slate-800" />
              <div className="h-2 w-32 rounded bg-slate-900" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton Section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="h-[350px] rounded-xl border border-slate-900 bg-slate-950/40 p-6 flex flex-col"
          >
            <div className="space-y-2 mb-4">
              <div className="h-4.5 w-32 rounded bg-slate-800" />
              <div className="h-3 w-48 rounded bg-slate-900" />
            </div>
            <div className="flex-1 w-full flex items-center justify-center">
              <div className="h-44 w-44 rounded-full border-[14px] border-slate-900 flex items-center justify-center">
                <div className="h-16 w-16 rounded bg-slate-800/40" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Feed Skeleton Section */}
      <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4.5 w-40 rounded bg-slate-800" />
          <div className="h-3.5 w-24 rounded bg-slate-900" />
        </div>
        <div className="space-y-3.5 pt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-900/45 last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded bg-slate-900" />
                <div className="h-3 w-20 rounded bg-slate-800" />
              </div>
              <div className="h-3 w-28 rounded bg-slate-900" />
              <div className="h-4.5 w-16 rounded bg-slate-800" />
              <div className="h-3 w-16 rounded bg-slate-900" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
