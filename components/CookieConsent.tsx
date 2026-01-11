import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent is already stored
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay for better UX on initial load so it doesn't pop up instantly
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto md:max-w-md w-full z-50 p-4 md:p-0"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl flex flex-col gap-4 relative overflow-hidden">
            
            {/* Top accent gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-50" />
            
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-slate-800 rounded-xl shrink-0 border border-slate-700">
                <Cookie className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-white font-medium text-sm">Cookie Preferences</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  We use cookies to enhance your browsing experience and analyze our traffic. 
                  By continuing, you consent to our use of cookies.
                </p>
              </div>
              <button 
                onClick={handleDecline}
                className="text-slate-500 hover:text-white transition-colors -mr-2 -mt-2 p-2"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-3 justify-end items-center pt-1">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-xs font-medium bg-white text-slate-950 rounded-lg hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};