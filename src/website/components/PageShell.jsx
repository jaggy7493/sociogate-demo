import React from "react";
import AuroraBackground from "./AuroraBackground";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

export default function PageShell({ activePage, onNavigate, onLaunchDemo, onBookDemo, children, showFooter = true }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <AuroraBackground />
      <Navbar activePage={activePage} onNavigate={onNavigate} onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo} />
      <main className="relative pt-28">
        <PageTransition>{children}</PageTransition>
      </main>
      {showFooter && <Footer onLaunchDemo={onLaunchDemo} onNavigate={onNavigate} />}
    </div>
  );
}
