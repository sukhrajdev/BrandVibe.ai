import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "BrandVibe revealed a massive gap in our AI strategy. We were completely invisible to ChatGPT until now.",
    author: "Alex Rivera",
    role: "CMO at TechFlow",
    image: "https://picsum.photos/100/100?random=10"
  },
  {
    quote: "Finally, a way to control how LLMs talk about my startup. The reputation scan is frighteningly accurate.",
    author: "Sarah Lin",
    role: "Founder, Zenith",
    image: "https://picsum.photos/100/100?random=11"
  },
  {
    quote: "SEO is getting harder. AIO is the new frontier. This tool is the standard for the next decade.",
    author: "James Peterson",
    role: "Growth Lead",
    image: "https://picsum.photos/100/100?random=12"
  },
  {
    quote: "I didn't realize how much traffic we were losing to AI summaries. BrandVibe fixed that.",
    author: "Elena Wu",
    role: "Marketing Director",
    image: "https://picsum.photos/100/100?random=13"
  },
  {
    quote: "The insights on competitor positioning within Claude and Gemini are worth the subscription alone.",
    author: "David Koch",
    role: "Product Manager",
    image: "https://picsum.photos/100/100?random=14"
  }
];

export const Testimonials: React.FC = () => {
  const scrollItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="w-full py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-slate-400 mb-4">
          Don't just take our word for it
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          See how leading brands are securing their future in the age of AI.
        </p>
      </div>

      <div className="relative flex overflow-hidden mb-8">
         <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
         <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
         
         <motion.div 
            className="flex gap-6 whitespace-nowrap pl-4"
            animate={{ x: [0, -1500] }}
            transition={{
               repeat: Infinity,
               ease: "linear",
               duration: 40,
            }}
         >
            {scrollItems.map((item, i) => (
               <motion.div 
                  key={i}
                  whileTap={{ scale: 0.97 }}
                  className="w-[350px] md:w-[400px] shrink-0 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:border-purple-500/30 transition-all group cursor-pointer"
               >
                  <Quote className="w-8 h-8 text-purple-500/20 mb-4 group-hover:text-purple-500/40 transition-colors" />
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 whitespace-normal">
                     "{item.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                     <picture>
                        <source srcSet={item.image} type="image/avif" />
                        <source srcSet={item.image} type="image/webp" />
                        <img 
                            src={item.image} 
                            alt={item.author} 
                            width="40"
                            height="40"
                            className="w-10 h-10 rounded-full border border-slate-700 object-cover bg-slate-800"
                            loading="lazy"
                            decoding="async"
                        />
                     </picture>
                     <div>
                        <div className="text-white font-medium text-sm">{item.author}</div>
                        <div className="text-slate-500 text-xs">{item.role}</div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </motion.div>
      </div>

       <div className="relative flex overflow-hidden">
         <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
         <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
         
         <motion.div 
            className="flex gap-6 whitespace-nowrap pl-4"
            animate={{ x: [-1500, 0] }}
            transition={{
               repeat: Infinity,
               ease: "linear",
               duration: 45,
            }}
         >
            {[...scrollItems].reverse().map((item, i) => (
               <motion.div 
                  key={i}
                  whileTap={{ scale: 0.97 }}
                  className="w-[350px] md:w-[400px] shrink-0 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:border-cyan-500/30 transition-all group cursor-pointer"
               >
                  <Quote className="w-8 h-8 text-cyan-500/20 mb-4 group-hover:text-cyan-500/40 transition-colors" />
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 whitespace-normal">
                     "{item.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                     <picture>
                        <source srcSet={item.image} type="image/avif" />
                        <source srcSet={item.image} type="image/webp" />
                        <img 
                            src={item.image} 
                            alt={item.author} 
                            width="40"
                            height="40"
                            className="w-10 h-10 rounded-full border border-slate-700 object-cover bg-slate-800"
                            loading="lazy"
                            decoding="async"
                        />
                     </picture>
                     <div>
                        <div className="text-white font-medium text-sm">{item.author}</div>
                        <div className="text-slate-500 text-xs">{item.role}</div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </motion.div>
      </div>
    </section>
  );
};