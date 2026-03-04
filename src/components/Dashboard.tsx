import React from 'react';
import { Link } from 'react-router-dom';
import { TradingChart } from './dashboard/TradingChart';
import { AIChatBot } from './ai/AIChatBot';
import { ExplainAI } from './dashboard/ExplainAI';
import { TradeHistory } from './dashboard/TradeHistory';
import { PerformanceScore } from './dashboard/PerformanceScore';
import { LiveSignalToast } from './dashboard/LiveSignalToast';
import { cn } from '../lib/utils';
import { TrendingUp, Users, DollarSign, Activity, Shield, Settings, CreditCard } from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard 
            title="Total Balance" 
            value="$124,592.45" 
            change="+12.5%" 
            icon={DollarSign} 
            trend="up"
          />
          <StatCard 
            title="24h PnL" 
            value="+$1,234.20" 
            change="+5.2%" 
            icon={TrendingUp} 
            trend="up"
          />
          <StatCard 
            title="Active Trades" 
            value="8" 
            change="3 Pending" 
            icon={Activity} 
            trend="neutral"
          />
          <StatCard 
            title="Win Rate (24h)" 
            value="82%" 
            change="+2.4%" 
            icon={Users} 
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-charcoal-800/40 border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-medium text-white">BTC/USDT</h3>
                  <span className="text-2xl font-bold text-white">$94,520.00</span>
                  <span className="text-sm text-green-400">+2.45%</span>
                </div>
                <div className="flex gap-2">
                  {['1H', '4H', '1D', '1W'].map((tf) => (
                    <button 
                      key={tf}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        tf === '1H' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
              <TradingChart />
            </div>
            
            <ExplainAI />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <PerformanceScore />
            <TradeHistory />
            
            {/* Quick Settings / Account Status */}
            <div className="bg-charcoal-800/40 border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Account Status</h3>
                <Link to="/settings" className="text-xs text-neon-cyan hover:text-neon-cyan/80">Manage Settings</Link>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Security Level</div>
                      <div className="text-xs text-green-400">High (2FA Enabled)</div>
                    </div>
                  </div>
                  <Link to="/settings?tab=security" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Settings className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-neon-purple" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Subscription</div>
                      <div className="text-xs text-neon-purple">Pro Plan (Active)</div>
                    </div>
                  </div>
                  <Link to="/settings?tab=billing" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LiveSignalToast />
      <AIChatBot />
    </DashboardLayout>
  );
};

const StatCard = ({ title, value, change, icon: Icon, trend }: { title: string, value: string, change: string, icon: any, trend: 'up' | 'down' | 'neutral' }) => (
  <div className="bg-charcoal-800/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 rounded-lg bg-white/5">
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <span className={cn(
        "text-xs font-medium px-2 py-1 rounded-full",
        trend === 'up' ? "text-green-400 bg-green-400/10" : 
        trend === 'down' ? "text-red-400 bg-red-400/10" : "text-gray-400 bg-gray-400/10"
      )}>
        {change}
      </span>
    </div>
    <p className="text-gray-400 text-sm mb-1">{title}</p>
    <h4 className="text-2xl font-bold text-white">{value}</h4>
  </div>
);

