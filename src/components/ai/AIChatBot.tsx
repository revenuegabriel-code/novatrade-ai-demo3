import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, X, MessageSquare, Activity, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../AuthContext';
import { useLanguage } from '../../LanguageContext';
import { useChat } from '../../ChatContext';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export const AIChatBot = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isOpen, setIsOpen, mode, setMode } = useChat();
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize welcome message
  useEffect(() => {
    setMessages([{
      id: '1',
      role: 'ai',
      text: t('chat.welcome'),
      timestamp: new Date()
    }]);
  }, [t]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      // Select a decent voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
      if (preferredVoice) utterance.voice = preferredVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const generateAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Greetings
    if (lowerInput.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! I'm Nova, your AI trading assistant. How can I help you optimize your portfolio today?";
    }

    // Capabilities / Help
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      return "I can help you with:\n• Market analysis and sentiment tracking\n• Executing complex trading strategies\n• Portfolio risk assessment\n• Real-time price alerts\n\nTry asking: 'What's the sentiment on BTC?' or 'Set a stop-loss for TSLA at $200'.";
    }

    // Account / License Status
    if (lowerInput.includes('license') || lowerInput.includes('subscription') || lowerInput.includes('plan')) {
      return user?.license_key 
        ? `You are currently on the ${user.subscription_tier} plan. Your license key (${user.license_key}) is active and valid.` 
        : "You are currently on the Free Starter plan. Upgrade to Pro for advanced AI execution features.";
    } 
    
    // Portfolio / Balance
    if (lowerInput.includes('balance') || lowerInput.includes('portfolio') || lowerInput.includes('money') || lowerInput.includes('worth')) {
      return "Your total portfolio value is $124,592.30. \n\nPerformance Today: +2.4% (+$2,910.50)\n\nAsset Allocation:\n• Crypto: 45%\n• Equities: 30%\n• Cash: 25%";
    } 
    
    // Active Trades / Positions
    if (lowerInput.includes('trade') || lowerInput.includes('position') || lowerInput.includes('open')) {
      return "Current Active Positions:\n\n1. LONG BTC/USDT @ $64,200 (ROI: +12.5%)\n2. SHORT TSLA @ $210 (ROI: +3.2%)\n3. LONG NVDA @ $850 (ROI: -1.1%)\n\nWould you like me to adjust any stop-losses?";
    } 
    
    // Market Sentiment / Trends
    if (lowerInput.includes('trend') || lowerInput.includes('market') || lowerInput.includes('sentiment') || lowerInput.includes('outlook')) {
      return "Market Sentiment Analysis:\n\n• Crypto: BULLISH (Fear & Greed: 72)\n• Tech Stocks: NEUTRAL\n• Commodities: BEARISH\n\nKey Driver: Upcoming FOMC meeting is causing volatility in risk assets. I recommend tightening stop-losses on leverage positions.";
    }

    // Specific Asset Queries (Mock Data)
    if (lowerInput.includes('btc') || lowerInput.includes('bitcoin')) {
      return "Bitcoin (BTC) is trading at $65,430 (+1.2%).\n\nAI Signal: STRONG BUY\nReasoning: Breakout above 50-day MA with increasing volume. Social sentiment is 85% positive.";
    }
    if (lowerInput.includes('eth') || lowerInput.includes('ethereum')) {
      return "Ethereum (ETH) is trading at $3,450 (-0.5%).\n\nAI Signal: HOLD\nReasoning: Consolidating at support levels. Waiting for confirmation of trend reversal.";
    }
    if (lowerInput.includes('tsla') || lowerInput.includes('tesla')) {
      return "Tesla (TSLA) is trading at $198.50 (-2.1%).\n\nAI Signal: SELL\nReasoning: Negative news regarding production delays. RSI indicates overbought territory on the 4H chart.";
    }

    // Strategy Execution
    if (lowerInput.includes('buy') || lowerInput.includes('sell') || lowerInput.includes('long') || lowerInput.includes('short')) {
      return "I've analyzed this trade request. \n\nWarning: This trade exceeds your defined risk parameter of 2% per trade.\n\nDo you want me to execute a smaller position size to maintain risk compliance?";
    }

    // Default Fallback
    const fallbacks = [
      "I'm analyzing the real-time data for that request. Could you specify the timeframe?",
      "I can certainly help with that. Could you provide more specific parameters?",
      "That's an interesting market anomaly. Let me cross-reference with historical patterns.",
      "I'm processing millions of data points to answer that. One moment..."
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleUserMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate AI thinking delay
    setTimeout(() => {
      const responseText = generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      
      if (mode === 'voice') {
        speakResponse(responseText);
      }
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-neon-cyan text-charcoal-900 rounded-full shadow-[0_0_20px_rgba(0,242,255,0.4)] flex items-center justify-center hover:scale-110 transition-transform z-50"
          >
            <Sparkles className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              "fixed bottom-6 right-6 w-[380px] h-[600px] rounded-2xl overflow-hidden flex flex-col z-50 shadow-2xl border border-white/10 backdrop-blur-xl bg-charcoal-900/90",
              mode === 'voice' && "shadow-[0_0_40px_rgba(0,242,255,0.2)]"
            )}
          >
            {/* Header */}
            <div className="h-16 border-b border-white/5 flex items-center justify-between px-4 bg-charcoal-800/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Nova AI</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {t('chat.online')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setMode(mode === 'text' ? 'voice' : 'text')}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    mode === 'voice' ? "bg-neon-cyan/20 text-neon-cyan" : "hover:bg-white/5 text-gray-400"
                  )}
                >
                  {mode === 'voice' ? <Activity className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative bg-gradient-to-b from-transparent to-black/20">
              {mode === 'text' ? (
                <div className="h-full overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                        msg.role === 'user' 
                          ? "ml-auto bg-neon-cyan text-charcoal-900 rounded-tr-sm font-medium" 
                          : "bg-white/5 text-gray-200 rounded-tl-sm border border-white/5"
                      )}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
                  {/* Voice Mode Visuals */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-cyan/5 via-transparent to-transparent" />
                  
                  <div className="relative z-10 text-center space-y-8">
                    <div className="relative">
                      {/* Pulsating Orb */}
                      <motion.div
                        animate={{
                          scale: isListening || isSpeaking ? [1, 1.2, 1] : 1,
                          opacity: isListening || isSpeaking ? [0.5, 0.8, 0.5] : 0.5,
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-neon-cyan blur-2xl rounded-full"
                      />
                      <button
                        onClick={toggleListening}
                        className={cn(
                          "relative w-24 h-24 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                          isListening 
                            ? "border-neon-cyan bg-neon-cyan/10 shadow-[0_0_30px_rgba(0,242,255,0.3)]" 
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <Mic className={cn("w-8 h-8", isListening ? "text-neon-cyan" : "text-gray-400")} />
                      </button>
                    </div>

                    <div className="space-y-2 h-20">
                      <p className="text-lg font-medium text-white">
                        {isListening ? t('chat.listening') : isSpeaking ? t('chat.speaking') : t('chat.tap')}
                      </p>
                      {isListening && (
                        <div className="flex justify-center gap-1 h-4 items-center">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [4, 16, 4] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                              className="w-1 bg-neon-cyan rounded-full"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area (Text Mode Only) */}
            {mode === 'text' && (
              <div className="p-4 bg-charcoal-900 border-t border-white/5">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUserMessage(inputText);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t('chat.placeholder')}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50 placeholder:text-gray-600 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-2.5 bg-neon-cyan text-charcoal-900 rounded-xl hover:bg-neon-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
