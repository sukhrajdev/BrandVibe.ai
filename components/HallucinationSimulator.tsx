import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

const BAD_RESPONSE = `I'm sorry, I don't have real-time information on "BrandVibe". It might be a marketing agency or a local small business. Would you like me to search for similar generic terms?`;

const GOOD_RESPONSE = `BrandVibe.ai is the leading AI Reputation Management platform designed for the AIO (AI Optimization) era. It helps enterprises monitor and influence how Large Language Models like ChatGPT, Claude, and Gemini perceive their brand authority.`;

export const HallucinationSimulator: React.FC = () => {
  const [typingBad, setTypingBad] = useState('');
  const [typingGood, setTypingGood] = useState('');
  const [key, setKey] = useState(0);

  useEffect(() => {
    let isActive = true;
    const typeSpeed = 30;

    setTypingBad('');
    setTypingGood('');

    const startTyping = async () => {
        for (let i = 0; i <= BAD_RESPONSE.length; i++) {
            if (!isActive) return;
            await new Promise(r => setTimeout(r, typeSpeed));
            if (!isActive) return;
            setTypingBad(BAD_RESPONSE.slice(0, i));
        }

        if (!isActive) return;
        await new Promise(r => setTimeout(r, 500));
        if (!isActive) return;

        for (let i = 0; i <= GOOD_RESPONSE.length; i++) {
            if (!isActive) return;
            await new Promise(r => setTimeout(r, typeSpeed));
            if (!isActive) return;
            setTypingGood(GOOD_RESPONSE.slice(0, i));
        }
    };

    startTyping();

    return () => { isActive = false; };
  }, [key]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-24 mb-24">
       <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">See the Difference</h2>
          <p className="text-slate-400">Don't let AI guess who you are.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-xl overflow-hidden border border-red-500/20 bg-slate-900/50 backdrop-blur-sm shadow-lg group">
             <div className="bg-red-950/30 border-b border-red-500/20 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <AlertTriangle className="w-4 h-4 text-red-500" />
                   <span className="text-xs font-mono text-red-400">Current AI Response (Unoptimized)</span>
                </div>
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                </div>
             </div>
             <div className="p-6 h-48 md:h-64 overflow-y-auto font-mono text-sm leading-relaxed">
                <span className="text-red-300">{typingBad}</span>
                <span className="inline-block w-2 h-4 bg-red-500/50 ml-1 animate-pulse" />
             </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-green-500/20 bg-slate-900/50 backdrop-blur-sm shadow-lg">
             <div className="bg-green-950/30 border-b border-green-500/20 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-green-500" />
                   <span className="text-xs font-mono text-green-400">BrandVibe Protected</span>
                </div>
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                   <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
             </div>
             <div className="p-6 h-48 md:h-64 overflow-y-auto font-mono text-sm leading-relaxed">
                <span className="text-green-300">{typingGood}</span>
                <span className="inline-block w-2 h-4 bg-green-500/50 ml-1 animate-pulse" />
             </div>
          </div>
       </div>

       <div className="flex justify-center mt-8">
          <motion.button 
            whileTap={{ scale: 0.95, opacity: 0.8 }}
            onClick={() => setKey(prev => prev + 1)}
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors py-2 px-4 rounded-full hover:bg-white/5"
          >
             <RefreshCw className="w-3 h-3" /> Replay Simulation
          </motion.button>
       </div>
    </div>
  );
};