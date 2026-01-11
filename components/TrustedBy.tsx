import React from 'react';
import { motion } from 'framer-motion';

const Logos = {
  Google: () => (
    <svg viewBox="0 0 24 24" className="h-8 w-auto fill-current">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.147-1.133 8.213-3.293 2.067-2.173 2.627-5.387 2.627-7.227 0-.587-.067-1.48-.173-2.56h-10.667z" />
    </svg>
  ),
  Microsoft: () => (
    <svg viewBox="0 0 24 24" className="h-8 w-auto fill-current">
      <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
    </svg>
  ),
  Spotify: () => (
    <svg viewBox="0 0 24 24" className="h-8 w-auto fill-current">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
  Amazon: () => (
    <svg viewBox="0 0 24 24" className="h-8 w-auto fill-current">
      <path d="M13.606 10.95c.348 2.002.13 3.541-.83 4.413-.785.741-2.092.959-3.4.654-1.744-.436-2.615-1.918-2.31-3.791.261-1.612 1.394-2.701 3.181-2.919 1.526-.174 2.915.262 3.359 1.643zm.392-4.185c0-1.874-1.264-3.094-3.269-3.094-1.743 0-3.313.915-4.053 2.136l1.394.697c.392-.784 1.22-1.438 2.353-1.438.915 0 1.699.566 1.699 1.569 0 .131-.044.218-.087.392l-.784 3.792c-2.484.218-4.968.871-5.709 3.443-.305 1.046.087 2.135.915 2.789 1.002.828 2.528.828 3.705.174l.218.087.305 1.351h1.917l-.523-2.659c-.48-2.615 1.917-2.615 1.917-2.615l.262-1.394c-.174 0-2.353.48-3.049-1.22l-.174-.697-.131-.48c-.261-1.35.436-1.743 1.002-1.743.654 0 1.264.436 1.482 1.307l1.526-.392zM12.299 22.35c-3.792 0-7.017-1.394-8.891-2.483l1.177-1.438c1.394 1.046 4.706 2.746 8.368 2.092 2.659-.48 4.664-2.615 4.664-2.615l.872 1.526s-2.092 2.266-6.19 2.918zm8.542-4.968c-.349-.436-.436-.436-.087-.959.915-1.264 2.832-4.663.959-7.932l1.656-.697c2.31 3.574.654 7.627-.61 9.414-.131.174-.218.261-.261.349l-1.657-.175z" />
    </svg>
  ),
  Uber: () => (
    <svg viewBox="0 0 24 24" className="h-8 w-auto fill-current">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm7.2 16.2h-3v-6h-3v6h-3v6h-3v-6h-3v6h-3v-8.4h15v8.4z" />
    </svg>
  ),
  Netflix: () => (
    <svg viewBox="0 0 24 24" className="h-8 w-auto fill-current">
      <path d="M16.142 20.378l-5.658-12.71-5.07 12.016H2.176V3.623h3.694v8.834l5.244-12.456h3.402v16.73h-3.694V7.9l5.092 12.478h4.216V3.622h-3.988v16.756h0z" />
    </svg>
  ),
  Meta: () => (
    <svg viewBox="0 0 24 24" className="h-8 w-auto fill-current">
      <path d="M12 12c0 2.223 1.233 3.66 3.266 3.66 2.455 0 3.906-2.296 3.906-4.99 0-3.69-2.292-6.66-6.176-6.66C8.89 4 5.733 7.513 5.733 11.5c0 2.54 1.34 4.5 3.533 4.5 1.5 0 2.4-1.127 2.4-2.807 0-2.34-1.3-4.193-3.233-4.193-1.233 0-2.067.88-2.067 2.22 0 1.293.767 2.22 1.667 2.22.433 0 .767-.18 1.033-.48.2-.233.267-.5.267-.76 0-.6-.333-1.073-.867-1.073-.2 0-.367.06-.467.167-.166.16-.233.366-.233.6 0 .433.367.8.8.8.167 0 .3-.033.433-.127.1-.066.167-.166.167-.3 0-.166-.1-.293-.267-.293-.166 0-.3.127-.3.293 0 .1.067.193.167.26.066.04.133.06.2.06.233 0 .4-.227.4-.533 0-.587-.5-1.053-1.167-1.053-.9 0-1.6.76-1.6 1.76 0 1.48 1.033 2.58 2.567 2.58 2.266 0 3.733-1.993 3.733-4.593 0-3.6-2.6-6.9-5.367-6.9-3.233 0-5.166 2.46-5.166 5.593C6.033 14.593 8.3 17 11.367 17c3.366 0 5.466-2.587 5.466-5.593 0-1.893-.833-3.26-2.433-3.26-1.5 0-2.4 1.373-2.4 3.093z"/>
    </svg>
  )
};

const companies = [
  { name: "Google", Logo: Logos.Google, color: "hover:text-blue-500" },
  { name: "Microsoft", Logo: Logos.Microsoft, color: "hover:text-sky-500" },
  { name: "Spotify", Logo: Logos.Spotify, color: "hover:text-green-500" },
  { name: "Amazon", Logo: Logos.Amazon, color: "hover:text-yellow-500" },
  { name: "Uber", Logo: Logos.Uber, color: "hover:text-white" },
  { name: "Netflix", Logo: Logos.Netflix, color: "hover:text-red-600" },
  { name: "Meta", Logo: Logos.Meta, color: "hover:text-blue-600" },
];

const dashboardImages = [
  { title: "Sentiment Analysis", url: "https://placehold.co/800x500/0f172a/a855f7?text=Sentiment+Analysis&font=roboto" },
  { title: "Competitor Tracking", url: "https://placehold.co/800x500/0f172a/22d3ee?text=Competitor+Tracking&font=roboto" },
  { title: "AI Hallucination Alert", url: "https://placehold.co/800x500/0f172a/f43f5e?text=Hallucination+Alert&font=roboto" },
  { title: "Share of Voice", url: "https://placehold.co/800x500/0f172a/10b981?text=Share+of+Voice&font=roboto" },
  { title: "Keyword Cloud", url: "https://placehold.co/800x500/0f172a/f59e0b?text=Keyword+Cloud&font=roboto" },
  { title: "Traffic Risk ROI", url: "https://placehold.co/800x500/0f172a/6366f1?text=Traffic+Risk+ROI&font=roboto" },
  { title: "Geo-Distribution", url: "https://placehold.co/800x500/0f172a/ec4899?text=Geo-Distribution&font=roboto" },
  { title: "Integrations Hub", url: "https://placehold.co/800x500/0f172a/8b5cf6?text=Integrations+Hub&font=roboto" },
  { title: "Reporting Suite", url: "https://placehold.co/800x500/0f172a/06b6d4?text=Reporting+Suite&font=roboto" },
];

export const TrustedBy: React.FC = () => {
  const scrollItems = [...companies, ...companies, ...companies];
  const scrollImages = [...dashboardImages, ...dashboardImages];

  return (
    <section className="w-full py-12 border-y border-white/5 bg-slate-900/20 backdrop-blur-sm overflow-hidden relative flex flex-col gap-16">
      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <p className="text-sm text-slate-500 font-medium tracking-widest uppercase">
            Trusted by forward-thinking teams at
          </p>
        </div>

        <div className="relative flex overflow-hidden group w-full">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

          <motion.div 
            className="flex gap-16 items-center whitespace-nowrap pl-16 w-max"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {scrollItems.map((item, i) => (
              <div 
                key={i} 
                className={`transition-colors duration-300 cursor-default grayscale hover:grayscale-0 text-slate-700 ${item.color}`}
                title={item.name}
              >
                <item.Logo />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative w-full">
         <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-cyan-200">
               BrandVibe.ai Dashboard
            </h3>
            <p className="text-slate-400 text-sm">
               Monitor your brand's AI reputation in real-time.
            </p>
         </div>

         <div className="relative flex overflow-hidden group w-full">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

            <motion.div 
               className="flex gap-6 items-center whitespace-nowrap pl-4 w-max"
               animate={{ x: ["0%", "-50%"] }}
               transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 45,
               }}
            >
               {scrollImages.map((img, i) => {
                  const mobileUrl = img.url.replace('800x500', '400x250');
                  const tabletUrl = img.url.replace('800x500', '600x375');
                  
                  return (
                    <motion.div 
                       key={i}
                       whileTap={{ scale: 0.97 }}
                       className="w-[300px] md:w-[450px] aspect-[800/450] rounded-xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl relative group/card hover:border-purple-500/50 transition-all cursor-pointer"
                    >
                       <picture>
                          <source srcSet={`${mobileUrl} 400w, ${tabletUrl} 600w, ${img.url} 800w`} sizes="(max-width: 768px) 300px, 450px" />
                          <img 
                              src={img.url} 
                              alt={img.title}
                              width="450"
                              height="253"
                              className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity"
                              loading="lazy"
                              decoding="async"
                          />
                       </picture>
                       <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 to-transparent">
                          <span className="text-sm font-medium text-white shadow-black drop-shadow-md">{img.title}</span>
                       </div>
                    </motion.div>
                  )
               })}
            </motion.div>
         </div>
      </div>
    </section>
  );
};