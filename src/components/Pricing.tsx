import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../LanguageContext';

export const Pricing = () => {
  const { t } = useLanguage();

  const tiers = [
    {
      name: t('pricing.starter'),
      price: 29,
      description: t('pricing.starter.desc'),
      features: [t('pricing.feature.realtime'), t('pricing.feature.alerts'), t('pricing.feature.charting'), t('pricing.feature.community')],
      icon: Shield,
      color: 'text-gray-400',
      buttonStyle: 'border-white/20 hover:bg-white/5'
    },
    {
      name: t('pricing.pro'),
      price: 79,
      description: t('pricing.pro.desc'),
      features: [t('pricing.feature.allstarter'), t('pricing.feature.ai'), t('pricing.feature.unlimited'), t('pricing.feature.advanced'), t('pricing.feature.priority')],
      icon: Zap,
      color: 'text-neon-cyan',
      buttonStyle: 'bg-neon-cyan text-charcoal-900 hover:bg-neon-cyan/90 shadow-[0_0_20px_rgba(0,242,255,0.3)]',
      popular: true
    },
    {
      name: t('pricing.elite'),
      price: 199,
      description: t('pricing.elite.desc'),
      features: [t('pricing.feature.allpro'), t('pricing.feature.api'), t('pricing.feature.manager'), t('pricing.feature.custom'), t('pricing.feature.whitelabel')],
      icon: Shield,
      color: 'text-neon-purple',
      buttonStyle: 'bg-gradient-to-r from-neon-purple to-purple-600 text-white hover:opacity-90'
    }
  ];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">{t('pricing.title')}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {t('pricing.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
              <p className="text-gray-400 text-sm mb-6">{tier.description}</p>
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

            <button className={cn("w-full py-3 rounded-xl font-semibold transition-all duration-200", tier.buttonStyle)}>
              {t('nav.getstarted')}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
