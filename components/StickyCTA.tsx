import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHero = () => {
    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
      const input = document.querySelector('input[type="email"]') as HTMLInputElement;
      if(input) input.focus();
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/10 shadow-2xl py-3"
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="relative bg-slate-900 border border-slate-800 p-1 rounded-md">
                    <Sparkles className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-tr from-purple-400 to-cyan-400 fill-cyan-400/20" />
                </div>
                <span className="font-bold text-sm tracking-tight text-white hidden sm:block">
                BrandVibe<span className="text-slate-400">.ai</span>
                </span>
            </div>

            <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={scrollToHero}
                className="group flex items-center gap-2 bg-white text-slate-950 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 transition-all shadow-lg active:shadow-inner"
            >
                Join Waitlist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};