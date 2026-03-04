import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Cpu, Activity, Check, Globe, Settings, Lock, BarChart3, Mic, Layers, Terminal } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useChat } from '../ChatContext';
import { LandingDashboardPreview } from './LandingDashboardPreview';
import { AIChatBot } from './ai/AIChatBot';
import { cn } from '../lib/utils';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const { openChat } = useChat();
  const [formState, setFormState] = useState({ name: '', email: '', budget: '' });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thanks for joining the waitlist!');
    setFormState({ name: '', email: '', budget: '' });
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-white overflow-x-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-charcoal-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-cyan rounded-lg flex items-center justify-center">
              <Activity className="text-charcoal-900 w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">NovaTrade</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">{t('nav.features')}</a>
            <a href="#howitworks" className="hover:text-white transition-colors">{t('nav.howitworks')}</a>
            <a href="#pricing" className="hover:text-white transition-colors">{t('nav.pricing')}</a>
            <button 
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              {language.toUpperCase()}
            </button>
            <button 
              onClick={() => alert('Settings clicked')}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/auth')}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {t('nav.signin')}
            </button>
            <button 
              onClick={() => navigate('/auth')}
              className="px-4 py-2 bg-white text-charcoal-900 text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t('nav.getstarted')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-neon-cyan/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neon-cyan mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
              </span>
              {t('hero.badge')}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              {t('hero.title.start')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                {t('hero.title.end')}
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/auth')}
                className="w-full sm:w-auto px-8 py-4 bg-neon-cyan text-charcoal-900 font-bold rounded-xl hover:bg-neon-cyan/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
              >
                {t('hero.cta.demo')}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => openChat('voice')}
                className="w-full sm:w-auto px-8 py-4 bg-charcoal-800 text-white font-bold rounded-xl border border-white/10 hover:bg-charcoal-700 transition-all flex items-center justify-center gap-2"
              >
                {t('hero.cta.ai')}
                <Activity className="w-5 h-5 text-neon-purple" />
              </button>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-2xl blur opacity-20" />
            <LandingDashboardPreview />
          </motion.div>
        </div>
      </section>

      {/* Why NovaTrade Section */}
      <section className="py-24 bg-charcoal-800/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('why.title')}</h2>
            <p className="text-gray-400">{t('why.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-white/5">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 text-neon-cyan">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('why.speed.title')}</h3>
              <p className="text-gray-400">{t('why.speed.desc')}</p>
            </div>
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-white/5">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 text-neon-purple">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('why.ai.title')}</h3>
              <p className="text-gray-400">{t('why.ai.desc')}</p>
            </div>
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-white/5">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 text-white">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('why.security.title')}</h3>
              <p className="text-gray-400">{t('why.security.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-charcoal-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('comparison.title')}</h2>
            <p className="text-gray-400">{t('comparison.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Them */}
            <div className="p-8 rounded-2xl bg-charcoal-800/20 border border-white/5 opacity-70">
              <h3 className="text-xl font-bold mb-8 text-gray-400">{t('comparison.them')}</h3>
              <ul className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-500">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                    {t(`comparison.${i}.them`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Us */}
            <div className="p-8 rounded-2xl bg-charcoal-800 border border-neon-cyan/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-neon-cyan/10 blur-2xl rounded-full" />
              <h3 className="text-xl font-bold mb-8 text-white">{t('comparison.us')}</h3>
              <ul className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <div className="w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-neon-cyan" />
                    </div>
                    {t(`comparison.${i}.us`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Backtesting Results */}
      <section className="py-24 bg-charcoal-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('backtest.title')}</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {t('backtest.subtitle')}
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-white mb-1">{t(`backtest.stat.${i}.value`)}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{t(`backtest.stat.${i}.label`)}</div>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-600 italic">
                {t('backtest.note')}
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 blur-xl rounded-3xl opacity-50" />
              <div className="relative bg-charcoal-900 border border-white/10 rounded-2xl p-6 h-64 flex items-end gap-2">
                {[40, 65, 55, 80, 70, 90, 85, 95, 100, 90, 110, 120].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-neon-cyan/20 to-neon-cyan rounded-t-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Global */}
      <section className="py-16 bg-charcoal-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-2">{t('trust.title')}</h2>
          <p className="text-gray-400 mb-12">{t('trust.subtitle')}</p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock Logos */}
            {['Binance', 'Coinbase', 'Kraken', 'NASDAQ', 'NYSE', 'Forex.com'].map((market) => (
              <span key={market} className="text-xl font-bold text-white">{market}</span>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                <Shield className="w-4 h-4 text-neon-cyan" />
                {t(`trust.badge.${i}`)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-charcoal-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('features.title')}</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-neon-cyan" />,
                title: t('features.execution'),
                desc: t('features.execution.desc')
              },
              {
                icon: <Shield className="w-6 h-6 text-neon-purple" />,
                title: t('features.signals'),
                desc: t('features.signals.desc')
              },
              {
                icon: <Cpu className="w-6 h-6 text-emerald-400" />,
                title: t('features.analysis'),
                desc: t('features.analysis.desc')
              },
              {
                icon: <Activity className="w-6 h-6 text-pink-500" />,
                title: t('features.voice'),
                desc: t('features.voice.desc')
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-charcoal-800/50 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="howitworks" className="py-24 bg-charcoal-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">{t('how.title')}</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-charcoal-900 rounded-full border border-white/10 flex items-center justify-center mb-6 relative z-10">
                <Layers className="w-10 h-10 text-neon-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('how.step1.title')}</h3>
              <p className="text-gray-400">{t('how.step1.desc')}</p>
            </div>
            
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-charcoal-900 rounded-full border border-white/10 flex items-center justify-center mb-6 relative z-10">
                <Terminal className="w-10 h-10 text-neon-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('how.step2.title')}</h3>
              <p className="text-gray-400">{t('how.step2.desc')}</p>
            </div>
            
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-charcoal-900 rounded-full border border-white/10 flex items-center justify-center mb-6 relative z-10">
                <Mic className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('how.step3.title')}</h3>
              <p className="text-gray-400">{t('how.step3.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-charcoal-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">{t('pricing.title')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: t('pricing.starter'),
                price: 29,
                desc: t('pricing.starter.desc'),
                features: [t('pricing.feature.realtime'), t('pricing.feature.alerts'), t('pricing.feature.charting'), t('pricing.feature.community')],
                icon: Shield,
                color: 'text-gray-400',
                btnStyle: 'border-white/20 hover:bg-white/5'
              },
              {
                name: t('pricing.pro'),
                price: 79,
                desc: t('pricing.pro.desc'),
                features: [t('pricing.feature.allstarter'), t('pricing.feature.ai'), t('pricing.feature.unlimited'), t('pricing.feature.advanced'), t('pricing.feature.priority')],
                icon: Zap,
                color: 'text-neon-cyan',
                btnStyle: 'bg-neon-cyan text-charcoal-900 hover:bg-neon-cyan/90 shadow-[0_0_20px_rgba(255,255,255,0.3)]',
                popular: true
              },
              {
                name: t('pricing.elite'),
                price: 199,
                desc: t('pricing.elite.desc'),
                features: [t('pricing.feature.allpro'), t('pricing.feature.api'), t('pricing.feature.manager'), t('pricing.feature.custom'), t('pricing.feature.whitelabel')],
                icon: Shield,
                color: 'text-neon-purple',
                btnStyle: 'bg-gradient-to-r from-neon-purple to-purple-600 text-white hover:opacity-90'
              }
            ].map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative rounded-2xl p-8 border backdrop-blur-sm flex flex-col",
                  tier.popular 
                    ? "bg-charcoal-800/80 border-neon-cyan/30 ring-1 ring-neon-cyan/20" 
                    : "bg-charcoal-800/40 border-white/5"
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-cyan text-charcoal-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-white/5", tier.color)}>
                    <tier.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{tier.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">${tier.price}</span>
                    <span className="text-gray-500">{t('pricing.month')}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={cn("w-full py-3 rounded-xl font-semibold transition-all duration-200", tier.btnStyle)}>
                  {t('nav.getstarted')}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-charcoal-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">{t('testimonials.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl bg-charcoal-900 border border-white/5">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-4 h-4 text-white fill-white">★</div>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">"{t(`testimonials.${i}.quote`)}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold">
                    {t(`testimonials.${i}.author`).charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t(`testimonials.${i}.author`)}</div>
                    <div className="text-xs text-gray-400">{t(`testimonials.${i}.role`)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="py-24 px-6 bg-gradient-to-b from-charcoal-900 to-charcoal-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">{t('lead.title')}</h2>
          <p className="text-gray-400 mb-10">{t('lead.subtitle')}</p>
          
          <form onSubmit={handleFormSubmit} className="bg-charcoal-800/50 p-8 rounded-2xl border border-white/10 text-left space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('lead.name')}</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-charcoal-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('lead.email')}</label>
                <input 
                  type="email" 
                  required
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-charcoal-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('lead.budget')}</label>
              <select 
                value={formState.budget}
                onChange={e => setFormState({...formState, budget: e.target.value})}
                className="w-full bg-charcoal-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-neon-cyan/50"
              >
                <option value="">Select range...</option>
                <option value="0-1k">$0 - $1,000</option>
                <option value="1k-10k">$1,000 - $10,000</option>
                <option value="10k+">$10,000+</option>
              </select>
            </div>
            <button type="submit" className="w-full py-4 bg-neon-cyan text-charcoal-900 font-bold rounded-xl hover:bg-neon-cyan/90 transition-all mt-4">
              {t('lead.cta')}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span className="font-bold text-white">NovaTrade</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <div>
            © 2026 NovaTrade Inc.
          </div>
        </div>
      </footer>

      <AIChatBot />
    </div>
  );
};
