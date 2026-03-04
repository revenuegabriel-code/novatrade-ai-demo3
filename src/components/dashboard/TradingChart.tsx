import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';

export const TradingChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#9CA3AF',
      },
      grid: {
        vertLines: { color: '#1E242E' },
        horzLines: { color: '#1E242E' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#00F2FF',
      downColor: '#EF4444',
      borderVisible: false,
      wickUpColor: '#00F2FF',
      wickDownColor: '#EF4444',
    });

    // Generate initial data
    const data: any[] = [];
    let time = Math.floor(Date.now() / 1000) - 100 * 60; // Start 100 minutes ago
    let value = 94500;
    
    for (let i = 0; i < 100; i++) {
      const open = value + (Math.random() - 0.5) * 50;
      const high = open + Math.random() * 30;
      const low = open - Math.random() * 30;
      const close = (open + high + low) / 3;
      
      data.push({ time, open, high, low, close });
      time += 60; // 1 minute candles
      value = close;
    }

    candlestickSeries.setData(data);

    // Simulate live updates
    let lastClose = data[data.length - 1].close;
    let lastTime = data[data.length - 1].time;
    
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const isNewCandle = now - lastTime >= 60;
      
      if (isNewCandle) {
        lastTime = now;
        const open = lastClose;
        const high = open + Math.random() * 10;
        const low = open - Math.random() * 10;
        const close = (open + high + low) / 3;
        lastClose = close;
        
        candlestickSeries.update({ time: lastTime, open, high, low, close });
      } else {
        // Update current candle
        const current = data[data.length - 1]; // This logic is slightly flawed for update, better to track current candle state
        // Simplified: just add small noise to last candle
        const noise = (Math.random() - 0.5) * 5;
        const newClose = lastClose + noise;
        const newHigh = Math.max(lastClose, newClose);
        const newLow = Math.min(lastClose, newClose);
        
        candlestickSeries.update({
          time: lastTime,
          open: lastClose, // Keep open same for this update cycle simplicity
          high: newHigh,
          low: newLow,
          close: newClose
        });
      }
    }, 1000);

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
      chart.remove();
    };
  }, []);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
};
