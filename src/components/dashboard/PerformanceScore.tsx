import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Trophy, Target, Zap } from 'lucide-react';

export const PerformanceScore = () => {
  return (
    <div className="bg-charcoal-800/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-3xl rounded-full" />
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Performance Score</h3>
        <div className="px-2 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-white/5">
          Top 5%
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white/5"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={351.86}
              strokeDashoffset={351.86 * (1 - 0.92)}
              className="text-neon-cyan"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-4xl font-bold text-white">92</span>
            <span className="block text-xs text-gray-500 uppercase tracking-wider">Score</span>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Win Rate
            </div>
            <span className="font-bold text-white">78.4%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 w-[78.4%]" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Target className="w-4 h-4 text-neon-purple" />
              Accuracy
            </div>
            <span className="font-bold text-white">84.2%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-neon-purple w-[84.2%]" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Zap className="w-4 h-4 text-neon-cyan" />
              Speed
            </div>
            <span className="font-bold text-white">45ms</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-neon-cyan w-[95%]" />
          </div>
        </div>
      </div>
    </div>
  );
};
