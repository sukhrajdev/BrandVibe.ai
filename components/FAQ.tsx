import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const questions = [
  {
    question: "What exactly is AIO (AI Optimization)?",
    answer: "AIO is the process of optimizing your brand's presence within Large Language Models (LLMs) like ChatGPT, Claude, and Gemini. Unlike SEO which targets search engines, AIO ensures AI answers questions about your brand accurately and positively."
  },
  {
    question: "How does BrandVibe scan my reputation?",
    answer: "We simulate thousands of user queries across major AI models to understand how they perceive and describe your brand. We analyze sentiment, factual accuracy, and competitive positioning in real-time."
  },
  {
    question: "Is BrandVibe compatible with my existing SEO tools?",
    answer: "Absolutely. BrandVibe works alongside your SEO strategy. While SEO captures traditional search traffic, BrandVibe ensures you capture the growing number of users who rely on AI chat for discovery and research."
  },
  {
    question: "When will I get access to the platform?",
    answer: "We are currently rolling out access in batches to ensure platform stability. By joining the waitlist, you secure your spot in line and will be notified immediately when your cohort is activated."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-32 relative z-10 mb-20">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-slate-900 border border-slate-800 text-purple-400"
        >
          <MessageCircleQuestion className="w-5 h-5" />
        </motion.div>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400"
        >
          Frequently Asked Questions
        </motion.h2>
      </div>

      <div className="flex flex-col gap-4">
        {questions.map((q, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-slate-900/40 border border-slate-800 overflow-hidden backdrop-blur-sm hover:border-purple-500/20 transition-colors duration-300"
              >
                <motion.button
                  whileTap={{ backgroundColor: "rgba(168, 85, 247, 0.05)" }}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left group"
                >
                  <span className={`font-medium transition-colors ${isOpen ? 'text-purple-400' : 'text-slate-200 group-hover:text-white'}`}>
                    {q.question}
                  </span>
                  <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  </div>
                </motion.button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-4">
                        {q.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
        })}
      </div>
    </div>
  );
};