import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    "nav.features": "Features",
    "nav.howitworks": "How it Works",
    "nav.pricing": "Pricing",
    "nav.signin": "Sign In",
    "nav.getstarted": "Get Started",
    
    "hero.badge": "v2.0 Now Live",
    "hero.title.start": "Trade smarter with AI.",
    "hero.title.end": "Automate your edge.",
    "hero.subtitle": "The first institutional-grade AI trading assistant available to retail traders. Execute complex strategies with voice commands.",
    "hero.cta.demo": "Start Free Demo",
    "hero.cta.ai": "Talk to Nova AI",

    "why.title": "Why Top Traders Choose NovaTrade",
    "why.subtitle": "Stop trading with emotions. Start trading with data.",
    "why.speed.title": "Microsecond Execution",
    "why.speed.desc": "Direct market access (DMA) ensures your orders hit the book before the crowd.",
    "why.ai.title": "Adaptive Algorithms",
    "why.ai.desc": "Our models learn from your trading style and market conditions in real-time.",
    "why.security.title": "Bank-Grade Security",
    "why.security.desc": "Non-custodial architecture. Your keys never leave your device.",

    "how.title": "Automate in 3 Steps",
    "how.step1.title": "Connect Exchange",
    "how.step1.desc": "Securely link Binance, Coinbase, or Kraken via API keys.",
    "how.step2.title": "Define Strategy",
    "how.step2.desc": "Choose a pre-built AI model or describe your strategy in plain English.",
    "how.step3.title": "Activate Agent",
    "how.step3.desc": "Nova monitors the market 24/7 and executes trades based on your rules.",

    "features.title": "Institutional Tools for Everyone",
    "features.signals": "Predictive Signals",
    "features.signals.desc": "Proprietary ML models forecast price movements with 87% historical accuracy.",
    "features.execution": "Smart Execution",
    "features.execution.desc": "TWAP, VWAP, and Iceberg orders to minimize slippage on large entries.",
    "features.analysis": "Sentiment Analysis",
    "features.analysis.desc": "Real-time scanning of Twitter, Reddit, and News to detect market-moving events.",
    "features.voice": "Voice Command",
    "features.voice.desc": "Example: 'Nova, buy 1 BTC if it breaks $95k with volume.'",

    "pricing.title": "Transparent Pricing",
    "pricing.subtitle": "No hidden fees. Cancel anytime. 14-day free trial.",
    "pricing.starter": "Starter",
    "pricing.pro": "Professional",
    "pricing.elite": "Institutional",
    "pricing.month": "/month",
    "pricing.starter.desc": "Perfect for learning AI trading",
    "pricing.pro.desc": "For active traders needing speed",
    "pricing.elite.desc": "For funds and high-volume traders",
    
    "pricing.feature.realtime": "Real-time market data (1s delay)",
    "pricing.feature.alerts": "5 Smart Alerts / day",
    "pricing.feature.charting": "Standard Charting",
    "pricing.feature.community": "Discord Community Access",
    "pricing.feature.allstarter": "Everything in Starter",
    "pricing.feature.ai": "Unlimited AI Assistant",
    "pricing.feature.unlimited": "Unlimited Smart Alerts",
    "pricing.feature.advanced": "Tick-level Data (No delay)",
    "pricing.feature.priority": "Priority Email Support",
    "pricing.feature.allpro": "Everything in Professional",
    "pricing.feature.api": "Raw API Access",
    "pricing.feature.manager": "Private Slack Channel",
    "pricing.feature.custom": "Custom Algo Development",
    "pricing.feature.whitelabel": "White-label Reporting",

    "testimonials.title": "Trusted by 10,000+ Traders",
    "testimonials.1.quote": "NovaTrade completely changed my workflow. The voice execution allows me to react to news faster than I ever could with a mouse.",
    "testimonials.1.author": "Sarah Jenkins",
    "testimonials.1.role": "Crypto Analyst",
    "testimonials.2.quote": "I was skeptical about AI trading, but the risk management features alone saved me from a 20% drawdown last month.",
    "testimonials.2.author": "Marcus Chen",
    "testimonials.2.role": "Day Trader",
    "testimonials.3.quote": "Finally, a platform that gives retail traders the same tools as hedge funds. The sentiment analysis is spot on.",
    "testimonials.3.author": "David Kowalski",
    "testimonials.3.role": "Ex-Quant",

    "lead.title": "Ready to upgrade your trading?",
    "lead.subtitle": "Join the waitlist for early access to v2.0 and get 50% off your first year.",
    "lead.name": "Full Name",
    "lead.email": "Work Email",
    "lead.budget": "Portfolio Size",
    "lead.cta": "Request Early Access",

    "chat.placeholder": "Ask about market trends...",
    "chat.listening": "Listening...",
    "chat.speaking": "Nova is speaking...",
    "chat.tap": "Tap to speak",
    "chat.welcome": "Hello. I'm Nova. I can analyze charts, execute trades, or explain market concepts. What do you need?",
    "chat.online": "System Online",

    "comparison.title": "The NovaTrade Advantage",
    "comparison.subtitle": "See why professional traders are switching to AI-driven execution.",
    "comparison.us": "With NovaTrade",
    "comparison.them": "Traditional Trading",
    "comparison.1.us": "Microsecond AI Execution",
    "comparison.1.them": "Manual Order Entry (Avg 2s)",
    "comparison.2.us": "24/7 Market Monitoring",
    "comparison.2.them": "Limited Screen Time",
    "comparison.3.us": "Emotionless Strategy",
    "comparison.3.them": "Emotional Bias & FOMO",
    "comparison.4.us": "Multi-Exchange Arbitrage",
    "comparison.4.them": "Single Exchange View",

    "backtest.title": "Proven Performance",
    "backtest.subtitle": "Our models are rigorously backtested across 5 years of market data.",
    "backtest.stat.1.label": "Win Rate",
    "backtest.stat.1.value": "78.4%",
    "backtest.stat.2.label": "Profit Factor",
    "backtest.stat.2.value": "3.21",
    "backtest.stat.3.label": "Max Drawdown",
    "backtest.stat.3.value": "-4.2%",
    "backtest.note": "*Past performance is not indicative of future results. Data based on BTC/USDT pair (2020-2025).",

    "trust.title": "Built for Global Markets",
    "trust.subtitle": "Trusted by traders in over 40 countries.",
    "trust.badge.1": "SOC 2 Type II Certified",
    "trust.badge.2": "256-bit Encryption",
    "trust.badge.3": "Non-Custodial",

    "dashboard.score": "Performance Score",
    "dashboard.alerts": "Smart Alerts",
    "dashboard.timeline": "Decision Timeline",
    "dashboard.history": "Trade History",
    "dashboard.pnl": "Cumulative PnL",
    "dashboard.explain": "AI Reasoning",
    "dashboard.coach": "Trading Coach",
  },
  fr: {
    "nav.features": "Fonctionnalités",
    "nav.howitworks": "Comment ça marche",
    "nav.pricing": "Tarifs",
    "nav.signin": "Connexion",
    "nav.getstarted": "Commencer",

    "hero.badge": "v2.0 Disponible",
    "hero.title.start": "Tradez avec l'IA.",
    "hero.title.end": "Automatisez votre succès.",
    "hero.subtitle": "Le premier assistant de trading IA de niveau institutionnel pour les particuliers. Exécutez des stratégies complexes par la voix.",
    "hero.cta.demo": "Démo Gratuite",
    "hero.cta.ai": "Parler à Nova",

    "why.title": "Pourquoi choisir NovaTrade",
    "why.subtitle": "Arrêtez de trader avec vos émotions. Tradez avec des données.",
    "why.speed.title": "Exécution Microseconde",
    "why.speed.desc": "Accès direct au marché (DMA) pour passer avant la foule.",
    "why.ai.title": "Algorithmes Adaptatifs",
    "why.ai.desc": "Nos modèles apprennent de votre style et du marché en temps réel.",
    "why.security.title": "Sécurité Bancaire",
    "why.security.desc": "Architecture non-custodial. Vos clés ne quittent jamais votre appareil.",

    "how.title": "Automatisez en 3 étapes",
    "how.step1.title": "Connectez l'Échange",
    "how.step1.desc": "Liez Binance, Coinbase ou Kraken via clés API sécurisées.",
    "how.step2.title": "Définissez la Stratégie",
    "how.step2.desc": "Choisissez un modèle ou décrivez votre stratégie en français.",
    "how.step3.title": "Activez l'Agent",
    "how.step3.desc": "Nova surveille le marché 24/7 et exécute selon vos règles.",

    "features.title": "Outils Institutionnels",
    "features.signals": "Signaux Prédictifs",
    "features.signals.desc": "Modèles ML propriétaires avec 87% de précision historique.",
    "features.execution": "Exécution Intelligente",
    "features.execution.desc": "Ordres TWAP, VWAP et Iceberg pour minimiser le slippage.",
    "features.analysis": "Analyse de Sentiment",
    "features.analysis.desc": "Scan en temps réel de Twitter et Reddit pour détecter les événements.",
    "features.voice": "Commande Vocale",
    "features.voice.desc": "Exemple: 'Nova, achète 1 BTC s'il casse 95k$ avec du volume.'",

    "pricing.title": "Tarification Transparente",
    "pricing.subtitle": "Pas de frais cachés. Annulez à tout moment. Essai 14 jours.",
    "pricing.starter": "Starter",
    "pricing.pro": "Professionnel",
    "pricing.elite": "Institutionnel",
    "pricing.month": "/mois",
    "pricing.starter.desc": "Parfait pour débuter le trading IA",
    "pricing.pro.desc": "Pour les traders actifs cherchant la vitesse",
    "pricing.elite.desc": "Pour les fonds et gros volumes",

    "pricing.feature.realtime": "Données temps réel (délai 1s)",
    "pricing.feature.alerts": "5 Alertes Intelligentes / jour",
    "pricing.feature.charting": "Graphiques Standard",
    "pricing.feature.community": "Accès Discord Communautaire",
    "pricing.feature.allstarter": "Tout dans Starter",
    "pricing.feature.ai": "Assistant IA Illimité",
    "pricing.feature.unlimited": "Alertes Illimitées",
    "pricing.feature.advanced": "Données Tick-par-Tick (Sans délai)",
    "pricing.feature.priority": "Support Email Prioritaire",
    "pricing.feature.allpro": "Tout dans Professionnel",
    "pricing.feature.api": "Accès API Brut",
    "pricing.feature.manager": "Canal Slack Privé",
    "pricing.feature.custom": "Dév. Algo Personnalisé",
    "pricing.feature.whitelabel": "Rapports Marque Blanche",

    "testimonials.title": "Approuvé par +10 000 Traders",
    "testimonials.1.quote": "NovaTrade a changé mon workflow. L'exécution vocale me permet de réagir aux news plus vite que jamais.",
    "testimonials.1.author": "Sarah Jenkins",
    "testimonials.1.role": "Analyste Crypto",
    "testimonials.2.quote": "J'étais sceptique, mais la gestion des risques m'a sauvé d'une perte de 20% le mois dernier.",
    "testimonials.2.author": "Marcus Chen",
    "testimonials.2.role": "Day Trader",
    "testimonials.3.quote": "Enfin une plateforme qui donne aux particuliers les outils des hedge funds.",
    "testimonials.3.author": "David Kowalski",
    "testimonials.3.role": "Ex-Quant",

    "lead.title": "Prêt à passer au niveau supérieur ?",
    "lead.subtitle": "Rejoignez la liste d'attente pour la v2.0 et obtenez -50% la première année.",
    "lead.name": "Nom complet",
    "lead.email": "Email professionnel",
    "lead.budget": "Taille du portefeuille",
    "lead.cta": "Demander l'accès",

    "chat.placeholder": "Posez une question sur le marché...",
    "chat.listening": "J'écoute...",
    "chat.speaking": "Nova parle...",
    "chat.tap": "Appuyez pour parler",
    "chat.welcome": "Bonjour. Je suis Nova. Je peux analyser des graphiques ou exécuter des trades. Que voulez-vous faire ?",
    "chat.online": "Système En Ligne",

    "comparison.title": "L'Avantage NovaTrade",
    "comparison.subtitle": "Voyez pourquoi les pros passent à l'exécution IA.",
    "comparison.us": "Avec NovaTrade",
    "comparison.them": "Trading Traditionnel",
    "comparison.1.us": "Exécution IA Microseconde",
    "comparison.1.them": "Saisie Manuelle (Moy. 2s)",
    "comparison.2.us": "Surveillance Marché 24/7",
    "comparison.2.them": "Temps d'Écran Limité",
    "comparison.3.us": "Stratégie Sans Émotion",
    "comparison.3.them": "Biais Émotionnel & FOMO",
    "comparison.4.us": "Arbitrage Multi-Exchange",
    "comparison.4.them": "Vue Unique",

    "backtest.title": "Performance Prouvée",
    "backtest.subtitle": "Nos modèles sont testés rigoureusement sur 5 ans de données.",
    "backtest.stat.1.label": "Taux de Réussite",
    "backtest.stat.1.value": "78.4%",
    "backtest.stat.2.label": "Facteur de Profit",
    "backtest.stat.2.value": "3.21",
    "backtest.stat.3.label": "Drawdown Max",
    "backtest.stat.3.value": "-4.2%",
    "backtest.note": "*Les performances passées ne préjugent pas des résultats futurs. Données BTC/USDT (2020-2025).",

    "trust.title": "Conçu pour les Marchés Mondiaux",
    "trust.subtitle": "Utilisé par des traders dans +40 pays.",
    "trust.badge.1": "Certifié SOC 2 Type II",
    "trust.badge.2": "Chiffrement 256-bit",
    "trust.badge.3": "Non-Custodial",

    "dashboard.score": "Score de Performance",
    "dashboard.alerts": "Alertes Intelligentes",
    "dashboard.timeline": "Chronologie Décisionnelle",
    "dashboard.history": "Historique des Trades",
    "dashboard.pnl": "PnL Cumulé",
    "dashboard.explain": "Raisonnement IA",
    "dashboard.coach": "Coach Trading",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
