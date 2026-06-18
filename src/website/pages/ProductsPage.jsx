import React from "react";
import PageShell from "../components/PageShell";
import ProductShowcase from "../components/ProductShowcase";

export default function ProductsPage({ onNavigate, onLaunchDemo, onBookDemo }) {
  return (
    <PageShell activePage="products" onNavigate={onNavigate} onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo}>
      <ProductShowcase onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo} />
    </PageShell>
  );
}
