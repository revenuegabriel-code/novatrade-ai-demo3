import React from 'react';
import { DashboardLayout } from './DashboardLayout';
import { TrendingUp, Activity, BarChart2 } from 'lucide-react';

export const TradingPage = () => {
  return (
    <DashboardLayout>
      <div className="p-8 h-full flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-charcoal-800 rounded-full flex items-center justify-center mb-6 border border-white/5 relative">
          <TrendingUp className="w-10 h-10 text-neon-cyan" />
          <div className="absolute inset-0 border-2 border-neon-cyan/20 rounded-full animate-ping" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-3">Live Trading Terminal</h2>
        <p className="text-gray-400 max-w-md mb-8">
          Advanced charting, real-time order book, and AI-assisted execution are currently being initialized.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
          {[
            { label: 'Market Data', status: 'Connected', color: 'text-green-400' },
            { label: 'Execution Engine', status: 'Standby', color: 'text-yellow-400' },
            { label: 'AI Analysis', status: 'Active', color: 'text-neon-cyan' },
          ].map((item, i) => (
            <div key={i} className="bg-charcoal-800/50 border border-white/5 p-4 rounded-xl">
              <div className="text-xs text-gray-500 uppercase mb-1">{item.label}</div>
              <div className={`font-mono font-bold ${item.color} flex items-center gap-2`}>
                <div className={`w-2 h-2 rounded-full bg-current animate-pulse`} />
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
