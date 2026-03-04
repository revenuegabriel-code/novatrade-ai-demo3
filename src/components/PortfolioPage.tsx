import React from 'react';
import { DashboardLayout } from './DashboardLayout';
import { PieChart, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const PortfolioPage = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Portfolio Overview</h1>
            <p className="text-gray-400 text-sm">Real-time asset allocation and performance tracking.</p>
          </div>
          <button className="bg-neon-cyan text-charcoal-900 font-bold px-4 py-2 rounded-lg hover:bg-neon-cyan/90 transition-colors">
            Deposit Funds
          </button>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-charcoal-800/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="relative">
              <div className="text-gray-400 text-sm mb-2">Total Balance</div>
              <div className="text-3xl font-bold text-white mb-1">$124,592.45</div>
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4" />
                +12.5% (+$13,842.20)
              </div>
            </div>
          </div>
          
          <div className="bg-charcoal-800/40 border border-white/5 rounded-2xl p-6">
            <div className="text-gray-400 text-sm mb-2">24h Profit/Loss</div>
            <div className="text-3xl font-bold text-white mb-1">+$1,234.20</div>
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" />
              +5.2%
            </div>
          </div>

          <div className="bg-charcoal-800/40 border border-white/5 rounded-2xl p-6">
            <div className="text-gray-400 text-sm mb-2">Available Margin</div>
            <div className="text-3xl font-bold text-white mb-1">$45,200.00</div>
            <div className="text-gray-500 text-sm">
              36% of total equity
            </div>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-charcoal-800/40 border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Holdings</h3>
            <div className="space-y-4">
              {[
                { asset: 'Bitcoin', symbol: 'BTC', amount: '1.245', value: '$78,450.20', change: '+2.4%', allocation: '63%' },
                { asset: 'Ethereum', symbol: 'ETH', amount: '12.50', value: '$32,140.50', change: '-0.8%', allocation: '26%' },
                { asset: 'Solana', symbol: 'SOL', amount: '145.00', value: '$14,001.75', change: '+5.6%', allocation: '11%' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center font-bold text-white text-xs border border-white/10">
                      {item.symbol}
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.asset}</div>
                      <div className="text-xs text-gray-400">{item.amount} {item.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">{item.value}</div>
                    <div className={`text-xs font-medium ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-charcoal-800/40 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <div className="w-48 h-48 rounded-full border-8 border-charcoal-900 relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full border-8 border-neon-cyan/20" />
              <div className="absolute inset-0 rounded-full border-8 border-neon-cyan border-t-transparent border-l-transparent rotate-45" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">63%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Crypto</div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Asset Allocation</h3>
            <p className="text-sm text-gray-400 max-w-[200px]">
              Your portfolio is heavily weighted towards crypto assets. Consider diversifying into equities.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
