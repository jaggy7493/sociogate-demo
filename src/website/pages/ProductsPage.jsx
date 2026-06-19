import React from "react";
import PageShell from "../components/PageShell";
import ProductShowcase from "../components/ProductShowcase";
import PageHero from "../components/PageHero";

export default function ProductsPage({ onNavigate, onLaunchDemo, onBookDemo }) {
  return (
    <PageShell activePage="products" onNavigate={onNavigate} onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo}>
      <PageHero
        eyebrow="Products"
        title="Explore the SocioGate platform modules."
        subtitle="Visitor intelligence, vehicles, billing, emergency workflows, ERP command and resident experience in one connected product."
      />
      <ProductShowcase onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo} />
    </PageShell>
  );
}
