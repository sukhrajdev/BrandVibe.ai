import React from 'react';
import { Twitter, Linkedin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between py-6 w-full"
    >
      <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-400 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative bg-slate-900 border border-slate-800 p-1.5 rounded-lg">
            <Sparkles className="w-5 h-5 text-transparent bg-clip-text bg-gradient-to-tr from-purple-400 to-cyan-400 fill-cyan-400/20" />
          </div>
        </div>
        <span className="font-bold text-lg tracking-tight text-white">
          BrandVibe<span className="text-slate-400">.ai</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
          <Twitter className="w-5 h-5" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </motion.header>
  );
};