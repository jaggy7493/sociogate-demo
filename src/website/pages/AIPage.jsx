import React from "react";
import PageShell from "../components/PageShell";
import AICommandCenter from "../components/AICommandCenter";
import PageHero from "../components/PageHero";

export default function AIPage({ onNavigate, onLaunchDemo, onBookDemo }) {
  return (
    <PageShell activePage="ai" onNavigate={onNavigate} onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo}>
      <PageHero
        eyebrow="AI Engine"
        title="The intelligence layer behind every gate."
        subtitle="See how SocioGate AI reads signals, detects risk and powers security, billing and ERP workflows."
      />
      <AICommandCenter onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo} />
    </PageShell>
  );
}
