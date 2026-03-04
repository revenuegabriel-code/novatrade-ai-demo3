import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Brain } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useNavigate } from 'react-router-dom';

export const QuizSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (index: number) => {
    setAnswers([...answers, index]);
    setStep(step + 1);
  };

  return (
    <section className="py-24 bg-charcoal-800/50 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02]" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-neon-purple/10 mb-6">
            <Brain className="w-8 h-8 text-neon-purple" />
          </div>
          <h2 className="text-3xl font-bold mb-4">{t('quiz.title')}</h2>
          <p className="text-gray-400">{t('quiz.subtitle')}</p>
        </div>

        <div className="bg-charcoal-900 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="q1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-bold mb-8 text-center">{t('quiz.q1')}</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-neon-cyan/50 transition-all text-left flex items-center justify-between group"
                    >
                      <span className="text-gray-300 group-hover:text-white">{t(`quiz.a1.${i}`)}</span>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-neon-cyan opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="q2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-bold mb-8 text-center">{t('quiz.q2')}</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-neon-cyan/50 transition-all text-left flex items-center justify-between group"
                    >
                      <span className="text-gray-300 group-hover:text-white">{t(`quiz.a2.${i}`)}</span>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-neon-cyan opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('quiz.result.title')}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {t('quiz.result.desc')}
                </p>
                <button
                  onClick={() => navigate('/auth')}
                  className="px-8 py-4 bg-neon-cyan text-charcoal-900 font-bold rounded-xl hover:bg-neon-cyan/90 transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
                >
                  {t('quiz.cta')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {step < 2 && (
            <div className="mt-8 flex justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${step >= 0 ? 'bg-neon-cyan' : 'bg-white/10'}`} />
              <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-neon-cyan' : 'bg-white/10'}`} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
