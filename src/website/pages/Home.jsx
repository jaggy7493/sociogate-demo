import React from "react";
import { motion } from "framer-motion";
import { Brain, Building2, CreditCard, ShieldCheck } from "lucide-react";
import PageShell from "../components/PageShell";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import PremiumButton from "../components/PremiumButton";

export default function WebsiteHome({ onNavigate, onLaunchDemo, onBookDemo }) {
  return (
    <PageShell activePage="home" onNavigate={onNavigate} onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo}>
      <Hero onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo} />
      <Stats />

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] border border-cyan-300/20 bg-gradient-to-br from-blue-600/20 to-cyan-400/10 p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Explore SocioGate</p>
                <h2 className="mt-4 text-5xl font-black leading-tight text-white">One website. Clear pages. No endless scrolling.</h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Explore Products, AI Engine, Pricing, Company and Contact as dedicated premium pages.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <PremiumButton onClick={() => onNavigate("products")}>Explore Products</PremiumButton>
                  <PremiumButton onClick={() => onNavigate("ai")} variant="glass">View AI Engine</PremiumButton>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [ShieldCheck, "Products", "Visitor, vehicle, billing, SOS and ERP modules", "products"],
                  [Brain, "AI Engine", "Face recognition, watchlists and command intelligence", "ai"],
                  [CreditCard, "Pricing", "AI calculator, ROI and feature comparison", "pricing"],
                  [Building2, "Company", "Built for Indian societies and builders", "company"],
                ].map(([Icon, title, text, page], index) => (
                  <motion.button
                    key={title}
                    onClick={() => onNavigate(page)}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="rounded-[1.8rem] border border-white/10 bg-slate-950/45 p-5 text-left"
                  >
                    <Icon className="text-cyan-300" />
                    <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
