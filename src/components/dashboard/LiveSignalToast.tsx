import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X } from 'lucide-react';

export const LiveSignalToast = () => {
  const [signals, setSignals] = useState<any[]>([]);

  useEffect(() => {
    // Simulate incoming signals
    const timeouts = [
      setTimeout(() => addSignal({ pair: 'BTC/USDT', type: 'LONG', price: '$94,650', confidence: '92%' }), 5000),
      setTimeout(() => addSignal({ pair: 'ETH/USDT', type: 'SHORT', price: '$3,410', confidence: '88%' }), 15000),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const addSignal = (signal: any) => {
    const id = Date.now();
    setSignals(prev => [...prev, { ...signal, id }]);
    setTimeout(() => removeSignal(id), 8000); // Auto dismiss
  };

  const removeSignal = (id: number) => {
    setSignals(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {signals.map((signal) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="pointer-events-auto bg-charcoal-800/90 backdrop-blur-md border border-neon-cyan/30 p-4 rounded-xl shadow-2xl w-80 flex items-start gap-4 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan" />
            <div className="p-2 rounded-lg bg-neon-cyan/10 shrink-0">
              <Zap className="w-5 h-5 text-neon-cyan animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-white text-sm">New Signal Detected</h4>
                <span className="text-[10px] text-gray-400">Just now</span>
              </div>
              <div className="text-sm text-gray-300">
                <span className="font-bold text-white">{signal.pair}</span> • <span className={signal.type === 'LONG' ? 'text-green-400' : 'text-red-400'}>{signal.type}</span> @ {signal.price}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="text-xs text-gray-400">Confidence: <span className="text-neon-cyan">{signal.confidence}</span></div>
                <button className="ml-auto px-3 py-1 rounded-lg bg-neon-cyan text-charcoal-900 text-xs font-bold hover:bg-neon-cyan/90 transition-colors">
                  Execute
                </button>
              </div>
            </div>
            <button 
              onClick={() => removeSignal(signal.id)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
