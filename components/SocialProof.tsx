import React from 'react';
import { motion } from 'framer-motion';

const avatars = [
  "https://picsum.photos/100/100?random=1",
  "https://picsum.photos/100/100?random=2",
  "https://picsum.photos/100/100?random=3",
  "https://picsum.photos/100/100?random=4",
  "https://picsum.photos/100/100?random=5",
];

const groupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.7,
    },
  },
};

const avatarVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.5 },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
};

export const SocialProof: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <motion.div 
        className="flex -space-x-4 pl-4"
        variants={groupVariants}
        initial="hidden"
        animate="visible"
      >
        {avatars.map((src, i) => (
          <motion.div 
            key={i} 
            variants={avatarVariants}
            className="relative z-0"
            whileHover={{ 
              scale: 1.2, 
              zIndex: 20,
              boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.5)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.9 }}
            style={{ borderRadius: '9999px' }}
          >
            <picture>
              <source srcSet={src} type="image/avif" />
              <source srcSet={src} type="image/webp" />
              <img 
                src={src} 
                alt={`Founder ${i + 1}`} 
                width="40"
                height="40"
                fetchpriority={i === 0 ? "high" : "auto"}
                className="w-10 h-10 rounded-full border-2 border-slate-950 object-cover bg-slate-800"
                loading="eager"
                decoding="async"
              />
            </picture>
          </motion.div>
        ))}
        <motion.div 
          variants={avatarVariants}
          className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 text-xs font-medium text-white"
        >
          +2k
        </motion.div>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-sm text-slate-400 text-center sm:text-left"
      >
        Join <span className="text-white font-semibold">2,400+ founders</span> protecting their AI presence
      </motion.p>
    </div>
  );
};