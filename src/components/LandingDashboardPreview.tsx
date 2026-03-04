import React from 'react';
import { TradingChart } from './dashboard/TradingChart';
import { ArrowUpRight, ArrowDownRight, DollarSign, Activity, TrendingUp } from 'lucide-react';

export const LandingDashboardPreview = () => {
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-charcoal-800 shadow-2xl">
      {/* Fake Header */}
      <div className="h-12 border-b border-white/5 bg-charcoal-900/50 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="text-neon-cyan">BTC/USD</span>
            <span>$64,231.40</span>
            <span className="text-green-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              2.4%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400 font-mono">LIVE</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-4 h-[500px]">
        {/* Sidebar */}
        <div className="col-span-1 border-r border-white/5 bg-charcoal-900/30 p-4 space-y-4">
          <div className="space-y-2">
            <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Watchlist</div>
            {[
              { sym: 'BTC', price: '64,231', change: '+2.4%', up: true },
              { sym: 'ETH', price: '3,452', change: '+1.8%', up: true },
              { sym: 'SOL', price: '148.20', change: '-0.5%', up: false },
              { sym: 'NVDA', price: '892.10', change: '+4.2%', up: true },
            ].map((coin) => (
              <div key={coin.sym} className="flex items-center justify-between p-2 rounded hover:bg-white/5 cursor-pointer transition-colors">
                <div>
                  <div className="font-bold text-sm">{coin.sym}</div>
                  <div className="text-xs text-gray-400">${coin.price}</div>
                </div>
                <div className={`text-xs font-medium ${coin.up ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.change}
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-white/5">
             <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Active Positions</div>
             <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-sm text-green-400">LONG BTC</span>
                  <span className="text-xs text-green-400">+12.5%</span>
                </div>
                <div className="text-xs text-gray-400">Entry: $62,100</div>
             </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="col-span-3 flex flex-col">
          <div className="flex-1 relative">
            <div className="absolute inset-0 p-4">
               <TradingChart />
            </div>
            
            {/* Floating PnL */}
            <div className="absolute top-4 right-4 bg-charcoal-900/90 backdrop-blur border border-white/10 p-4 rounded-xl shadow-xl">
              <div className="text-xs text-gray-400 mb-1">Total PnL</div>
              <div className="text-2xl font-bold text-green-400 flex items-center gap-1">
                +$1,240.50
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="h-16 border-t border-white/5 bg-charcoal-900/50 flex items-center justify-between px-6">
            <div className="flex gap-4">
              <div className="text-sm text-gray-400">
                Balance: <span className="text-white font-mono">$124,592.30</span>
              </div>
              <div className="text-sm text-gray-400">
                Margin: <span className="text-white font-mono">12%</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg font-bold transition-all text-sm">
                SELL
              </button>
              <button className="px-6 py-2 bg-green-500 text-charcoal-900 hover:bg-green-400 rounded-lg font-bold transition-all text-sm shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                BUY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
