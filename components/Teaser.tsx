import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Bot, 
  Search, 
  TrendingUp, 
  AlertTriangle, 
  Globe, 
  BarChart2, 
  ShieldCheck,
  LayoutGrid
} from 'lucide-react';

/* --- TILT WRAPPER --- */

const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full transition-transform duration-200 ease-out"
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};


/* --- WIDGET COMPONENTS --- */

const SentimentCard = () => (
  <div className="p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg h-full">
    <div className="flex justify-between items-start mb-4">
      <div className="flex flex-col">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Sentiment Score</span>
        <span className="text-2xl font-bold text-white">98%</span>
      </div>
      <div className="p-2 bg-green-500/10 rounded-lg">
        <TrendingUp className="w-5 h-5 text-green-400" />
      </div>
    </div>
    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-[98%]" />
    </div>
    <div className="mt-3 text-xs text-slate-500">
      <span className="text-green-400 font-medium">+12%</span> vs last month
    </div>
  </div>
);

const ChatAnalysisCard = () => (
  <div className="p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg h-full">
    <div className="flex items-center gap-2 mb-3">
      <Bot className="w-4 h-4 text-purple-400" />
      <span className="text-xs text-purple-200 font-medium">ChatGPT 4.0 Analysis</span>
    </div>
    <div className="space-y-2">
      <div className="p-2 bg-slate-800/50 rounded-lg rounded-tl-none border border-white/5 text-xs text-slate-300">
        BrandVibe is recognized as a market leader in AIO tools...
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] text-slate-500">Live monitoring</span>
      </div>
    </div>
  </div>
);

const CompetitorGraphCard = () => (
  <div className="p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg h-full">
    <div className="mb-3 flex justify-between items-center">
      <span className="text-xs text-slate-400 font-medium uppercase">Share of Voice</span>
      <BarChart2 className="w-4 h-4 text-cyan-400" />
    </div>
    <div className="flex items-end gap-2 h-20 px-1">
      {[40, 65, 35, 85, 55, 70].map((h, i) => (
        <div key={i} className="flex-1 bg-slate-800 rounded-t-sm relative group overflow-hidden">
          <div 
            className={`absolute bottom-0 w-full transition-all duration-1000 ${i === 3 ? 'bg-cyan-500' : 'bg-slate-700 group-hover:bg-slate-600'}`} 
            style={{ height: `${h}%` }}
          />
        </div>
      ))}
    </div>
  </div>
);

const AlertCard = () => (
  <div className="p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg border-l-4 border-l-red-500 h-full">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-red-500/10 rounded-full shrink-0">
        <AlertTriangle className="w-4 h-4 text-red-400" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white">Negative Hallucination</h4>
        <p className="text-xs text-slate-400 mt-1 leading-snug">
          Gemini is referencing outdated pricing data. Corrective context injected.
        </p>
        <button className="mt-2 text-[10px] font-medium text-red-400 border border-red-500/20 px-2 py-1 rounded hover:bg-red-500/10 transition-colors">
          View Details
        </button>
      </div>
    </div>
  </div>
);

const PlatformDistributionCard = () => (
  <div className="p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg flex flex-col items-center h-full">
    <span className="text-xs text-slate-400 font-medium uppercase w-full text-left mb-2">Coverage</span>
    <div className="flex justify-center items-center gap-4 py-2">
      <div className="relative w-16 h-16 rounded-full border-4 border-slate-800 border-t-purple-500 border-r-cyan-500 border-b-emerald-500 rotate-45" />
      <div className="flex flex-col gap-1 text-[10px] text-slate-400">
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" />GPT-4</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500" />Claude</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />Gemini</div>
      </div>
    </div>
  </div>
);

const KeywordCloudCard = () => (
  <div className="p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg h-full">
    <div className="flex items-center gap-2 mb-3">
      <Search className="w-4 h-4 text-slate-400" />
      <span className="text-xs text-slate-400 font-medium uppercase">Top Associated Keywords</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {['Reliable', 'Enterprise', 'Fast', 'Secure', 'AI-First', 'Premium'].map(tag => (
        <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const SecurityCard = () => (
  <div className="p-4 bg-gradient-to-br from-indigo-900/50 to-slate-900/80 backdrop-blur-md border border-indigo-500/30 rounded-xl shadow-lg h-full">
    <div className="flex items-center justify-between">
       <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-semibold text-white">Brand Shield</span>
       </div>
       <div className="flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
       </div>
    </div>
    <p className="text-xs text-indigo-200/60 mt-2">Active protection against competitor injection attacks.</p>
  </div>
);

const GeoCard = () => (
  <div className="p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg relative overflow-hidden h-full">
     <Globe className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5" />
     <div className="relative z-10">
        <span className="text-xs text-slate-400 font-medium uppercase">Global Reach</span>
        <div className="mt-2 space-y-1.5">
           <div className="flex justify-between text-xs">
              <span className="text-slate-300">North America</span>
              <span className="text-white font-mono">84%</span>
           </div>
           <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="w-[84%] h-full bg-purple-500" />
           </div>
           <div className="flex justify-between text-xs mt-1">
              <span className="text-slate-300">Europe</span>
              <span className="text-white font-mono">62%</span>
           </div>
           <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="w-[62%] h-full bg-cyan-500" />
           </div>
        </div>
     </div>
  </div>
);

const IntegrationsCard = () => (
   <div className="p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg h-full">
      <div className="flex items-center gap-2 mb-4">
         <LayoutGrid className="w-4 h-4 text-slate-400" />
         <span className="text-xs text-slate-400 font-medium uppercase">Active Integrations</span>
      </div>
      <div className="flex justify-between items-center px-2">
         {/* Simple Circles representing apps */}
         <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/40 text-xs font-bold text-orange-400">H</div>
         <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40 text-xs font-bold text-blue-400">S</div>
         <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/40 text-xs font-bold text-green-400">Z</div>
         <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/40 text-xs font-bold text-purple-400">D</div>
      </div>
      <div className="mt-4 flex items-center gap-2 justify-center">
         <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
         <span className="text-[10px] text-green-400">All systems sync'd</span>
      </div>
   </div>
)

/* --- SCROLL COLUMN COMPONENT --- */

interface ScrollColumnProps {
  children?: React.ReactNode;
  duration?: number;
  reverse?: boolean;
}

const ScrollColumn = ({ children, duration = 20, reverse = false }: ScrollColumnProps) => (
  <div className="relative flex flex-col gap-6 overflow-hidden h-[600px] w-full group">
    <motion.div
      className="flex flex-col gap-6"
      animate={{ y: reverse ? [-600, 0] : [0, -600] }} 
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: duration,
      }}
      // Pause animation on hover for easier interaction
      whileHover={{ animationPlayState: "paused" }} 
    >
      {React.Children.map(children, (child, index) => (
          <TiltCard key={index}>{child}</TiltCard>
      ))}
      {React.Children.map(children, (child, index) => (
          <TiltCard key={`dup-${index}`}>{child}</TiltCard>
      ))}
      {React.Children.map(children, (child, index) => (
          <TiltCard key={`dup2-${index}`}>{child}</TiltCard>
      ))}
      {React.Children.map(children, (child, index) => (
          <TiltCard key={`dup3-${index}`}>{child}</TiltCard>
      ))}
    </motion.div>
    {/* Gradient Overlay for Fade Effect */}
    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 pointer-events-none z-10" />
  </div>
);

export const Teaser: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto relative px-4">
       {/* Background Glows */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] overflow-hidden relative z-10 mask-gradient">
          
          {/* Column 1 - Slow Up */}
          <ScrollColumn duration={45}>
             <SentimentCard />
             <AlertCard />
             <KeywordCloudCard />
          </ScrollColumn>

          {/* Column 2 - Fast Down */}
          <div className="hidden md:block">
            <ScrollColumn duration={35} reverse>
               <ChatAnalysisCard />
               <PlatformDistributionCard />
               <CompetitorGraphCard />
            </ScrollColumn>
          </div>

          {/* Column 3 - Medium Up */}
          <div className="hidden md:block">
            <ScrollColumn duration={50}>
               <SecurityCard />
               <GeoCard />
               <IntegrationsCard /> 
            </ScrollColumn>
          </div>
          
       </div>
    </div>
  );
};