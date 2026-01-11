import React from 'react';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { TrustedBy } from './components/TrustedBy';
import { Teaser } from './components/Teaser';
import { DetailedFeatures } from './components/DetailedFeatures';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CookieConsent } from './components/CookieConsent';
import { StickyCTA } from './components/StickyCTA';
import { HallucinationSimulator } from './components/HallucinationSimulator';
import { ROICalculator } from './components/ROICalculator';

export default function App() {
  return (
    <div className="relative min-h-screen w-full selection:bg-purple-500/30">
      <ScrollProgress />
      <CookieConsent />
      <StickyCTA />
      <Background />
      
      <div className="relative z-10 flex flex-col min-h-screen overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <Header />
          <main className="flex flex-col items-center justify-center pt-20">
            <Hero />
            <div className="mt-16 w-full">
              <SocialProof />
            </div>
          </main>
        </div>

        {/* Hallucination Section */}
        <section className="w-full mt-12">
           <HallucinationSimulator />
        </section>

        {/* Trusted By Section */}
        <section className="w-full mt-10">
          <TrustedBy />
        </section>

        {/* Features Preview (Interactive) */}
        <section id="features" className="w-full mt-24">
          <Teaser />
        </section>

        {/* Detailed Features List */}
        <section className="w-full">
          <DetailedFeatures />
        </section>

        {/* ROI Section */}
        <section id="roi" className="w-full">
          <ROICalculator />
        </section>

        {/* Testimonials / Success Stories Section */}
        <section id="testimonials" className="w-full">
           <Testimonials />
        </section>

        {/* FAQ & Footer Section */}
        <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pb-12">
          <FAQ />
          <Footer />
        </section>
      </div>
    </div>
  );
}