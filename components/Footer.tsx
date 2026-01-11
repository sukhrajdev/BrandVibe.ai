import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 text-center mt-auto border-t border-white/5 px-4">
      <p className="text-slate-600 text-sm">
        &copy; {new Date().getFullYear()} BrandVibe.ai. All rights reserved.
      </p>
      <p className="text-slate-700 text-xs mt-2">
        Built by Senior Frontend Engineer
      </p>
      <p className="text-slate-700 text-[10px] mt-6 opacity-50 max-w-lg mx-auto leading-relaxed">
        AI-generated content may have inaccuracies. Please verify critical information.
      </p>
    </footer>
  );
};