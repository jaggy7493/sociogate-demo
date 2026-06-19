import React from "react";
import PageShell from "../components/PageShell";
import PricingExperience from "../components/PricingExperience";
import PageHero from "../components/PageHero";

export default function PricingPage({ onNavigate, onLaunchDemo, onBookDemo }) {
  return (
    <PageShell activePage="pricing" onNavigate={onNavigate} onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo}>
      <PageHero
        eyebrow="Pricing"
        title="Transparent pricing with AI recommendations."
        subtitle="Estimate monthly costs, compare market benchmarks and see ROI for your society in seconds."
      />
      <PricingExperience onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo} />
    </PageShell>
  );
}
