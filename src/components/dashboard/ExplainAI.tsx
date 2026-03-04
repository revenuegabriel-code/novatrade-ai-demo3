import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

export const ExplainAI = () => {
  return (
    <div className="bg-charcoal-800/40 border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-neon-purple/10">
          <Brain className="w-5 h-5 text-neon-purple" />
        </div>
        <h3 className="text-lg font-medium text-white">AI Reasoning Engine</h3>
      </div>

      <div className="space-y-6">
        {[
          {
            time: '10:42:15',
            action: 'BUY SIGNAL',
            asset: 'BTC/USDT',
            confidence: 94,
            reason: 'RSI divergence + Volume spike detected on 5m timeframe.',
            type: 'success'
          },
          {
            time: '10:45:30',
            action: 'HOLD',
            asset: 'ETH/USDT',
            confidence: 88,
            reason: 'Approaching resistance at $3,450. Waiting for breakout confirmation.',
            type: 'warning'
          },
          {
            time: '10:50:12',
            action: 'ALERT',
            asset: 'SOL/USDT',
            confidence: 91,
            reason: 'Whale movement detected: 50,000 SOL transferred to exchange.',
            type: 'alert'
          }
        ].map((event, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="relative pl-6 border-l border-white/10"
          >
            <div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-charcoal-900 ${
              event.type === 'success' ? 'bg-neon-cyan' : 
              event.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono text-gray-500">{event.time}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                event.type === 'success' ? 'bg-neon-cyan/10 text-neon-cyan' : 
                event.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {event.action}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">{event.asset}</span>
              <span className="text-xs text-gray-400">Conf: {event.confidence}%</span>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              {event.reason}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
