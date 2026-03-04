import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, ArrowUpRight } from 'lucide-react';

export const TradeHistory = () => {
  return (
    <div className="bg-charcoal-800/40 border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Recent Trades</h3>
        <button className="text-xs text-neon-cyan hover:text-white transition-colors">View All</button>
      </div>

      <div className="space-y-4">
        {[
          { pair: 'BTC/USDT', type: 'Long', entry: '94,250', exit: '95,100', pnl: '+$850', pnlPercent: '+0.9%', time: '2m ago', status: 'Closed' },
          { pair: 'ETH/USDT', type: 'Short', entry: '3,420', exit: '3,380', pnl: '+$400', pnlPercent: '+1.2%', time: '15m ago', status: 'Closed' },
          { pair: 'SOL/USDT', type: 'Long', entry: '142.50', exit: '-', pnl: '+$12.50', pnlPercent: '+0.4%', time: '1h ago', status: 'Open' },
        ].map((trade, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${trade.type === 'Long' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {trade.type === 'Long' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{trade.pair}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                    trade.status === 'Open' ? 'border-neon-cyan/30 text-neon-cyan' : 'border-gray-600 text-gray-500'
                  }`}>
                    {trade.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span>{trade.type}</span>
                  <span>•</span>
                  <span>Entry: {trade.entry}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`font-bold text-sm ${trade.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {trade.pnl}
              </div>
              <div className="text-xs text-gray-500 flex items-center justify-end gap-1">
                {trade.pnlPercent}
                <Clock className="w-3 h-3" />
                {trade.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
