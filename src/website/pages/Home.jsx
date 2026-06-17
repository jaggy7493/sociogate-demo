import React from "react";
import AuroraBackground from "../components/AuroraBackground";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import ProductShowcase from "../components/ProductShowcase";
import PricingExperience from "../components/PricingExperience";
import Footer from "../components/Footer";

export default function WebsiteHome({ onLaunchDemo, onBookDemo }) {
  const launchDemo = onLaunchDemo || (() => {});
  const bookDemo = onBookDemo || (() => window.location.href = "mailto:hello@sociogate.in");

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <AuroraBackground />
      <Navbar onLaunchDemo={launchDemo} onBookDemo={bookDemo} />
      <main className="relative">
        <Hero onLaunchDemo={launchDemo} onBookDemo={bookDemo} />
        <Stats />
        <ProductShowcase onLaunchDemo={launchDemo} onBookDemo={bookDemo} />
        <section id="ai" className="relative scroll-mt-36 px-5 py-20">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-8">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">AI Engine</p>
            <h2 className="mt-4 max-w-3xl text-5xl font-black leading-tight text-white">Intelligence at every gate, every resident touchpoint, every decision.</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">Face intelligence, vehicle watchlists, SOS monitoring, billing insights and ERP command signals work together to make the society smarter.</p>
          </div>
        </section>
        <PricingExperience onBookDemo={bookDemo} onLaunchDemo={launchDemo} />
        <section id="about" className="relative scroll-mt-36 px-5 py-16">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Company</p>
            <h2 className="mt-4 text-5xl font-black text-white">Built for modern Indian communities.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">SocioGate AI is designed for apartments, villas, townships and commercial communities that want premium operations without operational complexity.</p>
          </div>
        </section>
      </main>
      <Footer onLaunchDemo={launchDemo} />
    </div>
  );
}
