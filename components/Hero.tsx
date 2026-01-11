import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Check, Zap, Cpu, AlertCircle, Info, Users } from 'lucide-react';
import { submitToWaitlist, isTempMail, checkEmailExists } from '../services/waitlistService';
import { Confetti } from './Confetti';

const WORDS = ["ChatGPT", "Gemini", "Claude"];

export const Hero: React.FC = () => {
  const [email, setEmail] = useState(() => localStorage.getItem('bv_draft_email') || '');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [regId, setRegId] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  
  // Real-time counter state
  const [userCount, setUserCount] = useState(4528);

  useEffect(() => {
    localStorage.setItem('bv_draft_email', email);
  }, [email]);

  // Simulate real-time users joining
  useEffect(() => {
    const interval = setInterval(() => {
      // Add 1-2 users randomly every 15-30 seconds
      const increment = Math.random() > 0.7 ? 2 : 1;
      setUserCount(prev => prev + increment);
    }, 15000 + Math.random() * 15000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (email.includes('@') && email.length > 5) {
        setIsChecking(true);
        const exists = await checkEmailExists(email);
        setIsRegistered(exists);
        setIsChecking(false);
      } else {
        setIsRegistered(false);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [email]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    if (isTempMail(email)) {
      setStatus('error');
      setMessage("Temporary emails are not allowed.");
      return;
    }

    setStatus('loading');
    const response = await submitToWaitlist(email);
    
    if (response.success) {
      setStatus('success');
      setMessage(response.message);
      if (response.registrationId) setRegId(response.registrationId);
      // Increment counter immediately on success
      setUserCount(prev => prev + 1);
      localStorage.removeItem('bv_draft_email');
    } else {
      setStatus('error');
      setMessage(response.message);
    }
  };

  return (
    <div className="flex flex-col items-center text-center max-w-5xl mx-auto relative z-10" id="hero">
      {status === 'success' && <Confetti />}
      
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-xs font-medium text-slate-300 mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:border-purple-500/30 transition-colors cursor-default"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>
        🚀 Coming Soon to Product Hunt
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight"
      >
        Do you know what <br className="hidden sm:block" />
        <span className="relative inline-block overflow-hidden h-[1.1em] align-bottom">
          <AnimatePresence mode="wait">
            <motion.span
              key={WORDS[wordIndex]}
              initial={{ y: "70%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-70%", opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400"
            >
              {WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
        <br />
        tells people about you?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
      >
        The internet has changed. SEO is dead. <span className="text-white font-medium">AIO (AI Optimization)</span> is here. 
        Scan your brand's AI reputation before your competitors do.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="w-full max-w-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 mb-12 text-left relative overflow-hidden group hover:border-purple-500/20 transition-all duration-500 shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500 opacity-75" />
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          Why AIO matters more than SEO
        </h3>
        <ul className="space-y-5">
          <li className="flex items-start gap-4">
            <div className="mt-1 p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-1">The Zero-Click Future</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Traditional SEO fights for clicks on a list of links. AIO optimizes for <span className="text-purple-300 font-medium">the single answer</span> generated by AI.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="mt-1 p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-1">Reputation is the Algorithm</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Keywords don't convince LLMs; context does. BrandVibe ensures AI models perceive your brand with <span className="text-cyan-300 font-medium">high trust</span>.
              </p>
            </div>
          </li>
        </ul>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="w-full max-w-md relative group mb-12"
      >
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500 ${status === 'error' ? 'from-red-500 to-pink-600 opacity-40' : ''}`}></div>
        <form onSubmit={handleSubmit} className="relative flex items-center mb-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            disabled={status === 'success'}
            placeholder="Enter your work email"
            className={`w-full h-14 bg-slate-900/80 backdrop-blur-xl border text-white placeholder-slate-500 text-base sm:text-lg pl-6 pr-24 sm:pr-28 rounded-full focus:outline-none focus:ring-2 transition-all disabled:opacity-50
              ${status === 'error' 
                ? 'border-rose-500 focus:ring-rose-500/50' 
                : isRegistered
                  ? 'border-cyan-500 focus:ring-cyan-500/50'
                  : 'border-slate-700/50 focus:ring-purple-500/50'
              }
            `}
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.96 }}
            disabled={status === 'loading' || status === 'success' || (isRegistered && !status)}
            className={`absolute right-1.5 top-1.5 bottom-1.5 rounded-full px-5 sm:px-8 flex items-center gap-2 font-bold transition-all duration-200 shadow-lg
              ${status === 'success' || isRegistered
                ? 'bg-cyan-500 text-white cursor-default shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                : 'bg-white text-slate-950 hover:bg-slate-200 active:shadow-inner'
              }`}
          >
            {status === 'loading' || isChecking ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (status === 'success' || isRegistered) ? (
              <Check className="w-5 h-5" />
            ) : (
              <>
                <span className="tracking-widest">GET</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Real-time User Counter */}
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400/80">LIVE</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <motion.span
              key={userCount}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-bold text-slate-300 tabular-nums"
            >
              {userCount.toLocaleString()}
            </motion.span>
            <span>professionals waiting</span>
          </div>
        </div>
        
        <AnimatePresence>
          {isRegistered && !status && !isChecking && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               className="absolute -bottom-12 left-0 right-0 mx-auto w-max flex items-center gap-2 text-cyan-400 text-xs font-medium bg-cyan-950/30 px-3 py-1 rounded-lg border border-cyan-500/20 backdrop-blur-sm shadow-xl"
             >
               <Info className="w-3.5 h-3.5" />
               Already registered. We'll be in touch!
             </motion.div>
          )}
          {message && status === 'error' && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               className="absolute -bottom-12 left-0 right-0 mx-auto w-max flex items-center gap-2 text-rose-400 text-sm font-medium bg-rose-950/30 px-3 py-1 rounded-lg border border-rose-500/20 backdrop-blur-sm shadow-xl"
             >
               <AlertCircle className="w-4 h-4" />
               {message}
             </motion.div>
          )}
          {message && status === 'success' && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="absolute -bottom-16 left-0 right-0 mx-auto w-max text-center"
             >
                <p className="text-green-400 text-sm font-medium">{message}</p>
                {regId && (
                  <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2 justify-center">
                    Reg ID: <span className="text-purple-400/80 font-mono">{regId}</span>
                  </p>
                )}
             </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};