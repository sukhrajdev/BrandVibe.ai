import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, BarChart3, Globe, Cpu, Layers } from 'lucide-react';

const features = [
  {
    title: "AIO Latent Monitoring",
    description: "Track how your brand is perceived in the latent space of GPT-4, Claude 3.5, and Gemini Pro in real-time.",
    icon: <Cpu className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-500"
  },
  {
    title: "Hallucination Firewall",
    description: "Detect when AI models generate false information about your pricing or features and trigger corrective context injection.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Share of Voice Analytics",
    description: "Measure what percentage of AI-generated answers recommend your product versus your top 5 competitors.",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Global AI Sentiment",
    description: "Analyze brand sentiment across different languages and regions as interpreted by multi-lingual LLMs.",
    icon: <Globe className="w-6 h-6" />,
    color: "from-rose-500 to-orange-500"
  },
  {
    title: "Rapid Context Injection",
    description: "Our proprietary 'vibe-check' API pushes updated brand facts directly into the most popular AI training pipelines.",
    icon: <Zap className="w-6 h-6" />,
    color: "from-amber-500 to-yellow-500"
  },
  {
    title: "Semantic GAP Analysis",
    description: "Identify exactly which keywords are causing LLMs to ignore your site and get actionable 'AIO' fix-lists.",
    icon: <Layers className="w-6 h-6" />,
    color: "from-fuchsia-500 to-pink-500"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
  }
};

export const DetailedFeatures: React.FC = () => {
  return (
    <section id="features-detailed" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Engineered for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">AIO Era</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Stop guessing what AI says about you. Use the first platform built specifically to manage your reputation in a zero-click world.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              className="group relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 text-white mb-6 shadow-lg`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-purple-400/80 uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                Learn more <Zap className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};