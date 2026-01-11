import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown } from 'lucide-react';

export const ROICalculator: React.FC = () => {
  const [traffic, setTraffic] = useState(10000);
  const riskPercentage = 0.4; // 40% loss
  const trafficRisk = Math.floor(traffic * riskPercentage);
  const potentialLoss = (trafficRisk * 0.05 * 100).toLocaleString(); // Assuming 5% conversion & $100 LTV for rough $$$ math

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-24 mb-12">
      <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left: Inputs */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">The Cost of Invisibility</h2>
            <p className="text-slate-400 text-sm mb-8">
              Gartner predicts search engine volume will drop 25% by 2026. See how much of your traffic is at risk.
            </p>

            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-sm font-medium text-slate-300 mb-4">
                  <span>Monthly Website Visitors</span>
                  <span className="text-white font-mono">{traffic.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={traffic}
                  onChange={(e) => setTraffic(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                  <span>1k</span>
                  <span>100k+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-6">
               <div className="p-2 bg-rose-500/10 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-rose-500" />
               </div>
               <div>
                  <div className="text-sm font-medium text-slate-300">Traffic at Risk</div>
                  <div className="text-3xl font-bold text-rose-400">{trafficRisk.toLocaleString()} <span className="text-lg text-slate-500 font-normal">/mo</span></div>
               </div>
            </div>
            
            <div className="space-y-3">
               <div className="flex items-center gap-2 text-xs text-rose-300/80 bg-rose-950/20 p-3 rounded-lg border border-rose-500/10">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                     You could lose <strong>${potentialLoss}</strong> in potential revenue monthly if AI models don't cite you.
                  </span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};