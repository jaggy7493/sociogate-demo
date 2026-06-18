import React from "react";
import PageShell from "../components/PageShell";
import AICommandCenter from "../components/AICommandCenter";

export default function AIPage({ onNavigate, onLaunchDemo, onBookDemo }) {
  return (
    <PageShell activePage="ai" onNavigate={onNavigate} onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo}>
      <AICommandCenter onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo} />
    </PageShell>
  );
}
