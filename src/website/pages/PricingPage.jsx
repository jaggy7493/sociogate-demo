import React from "react";
import PageShell from "../components/PageShell";
import PricingExperience from "../components/PricingExperience";

export default function PricingPage({ onNavigate, onLaunchDemo, onBookDemo }) {
  return (
    <PageShell activePage="pricing" onNavigate={onNavigate} onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo}>
      <PricingExperience onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo} />
    </PageShell>
  );
}
