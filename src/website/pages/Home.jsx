import React from "react";
import { motion } from "framer-motion";
import { Brain, Building2, ShieldCheck, Sparkles, Users } from "lucide-react";
import PageShell from "../components/PageShell";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import PremiumButton from "../components/PremiumButton";

const valueCards = [
  {
    icon: ShieldCheck,
    title: "AI Security",
    text: "24×7 AI-powered visitor verification, watchlist alerts and smarter gate operations.",
    page: "ai",
  },
  {
    icon: Users,
    title: "Resident Experience",
    text: "Everything residents need for visitors, bills, notices, polls, complaints and SOS.",
    page: "products",
  },
  {
    icon: Building2,
    title: "Society ERP",
    text: "Billing, complaints, reports, notices and operations managed from one command layer.",
    page: "products",
  },
  {
    icon: Sparkles,
    title: "Easy Deployment",
    text: "Go live quickly with a premium platform built for apartments, villas and townships.",
    page: "contact",
  },
];

export default function WebsiteHome({ onNavigate, onLaunchDemo, onBookDemo }) {
  return (
    <PageShell activePage="home" onNavigate={onNavigate} onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo}>
      <Hero onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo} />
      <Stats />

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Why SocioGate</p>
            <h2 className="mt-4 text-5xl font-black leading-tight text-white">
              Built for societies that want security, speed and premium resident experience.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              SocioGate brings visitor intelligence, resident convenience, billing automation and society operations into one AI-powered platform.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {valueCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.button
                  key={card.title}
                  onClick={() => onNavigate(card.page)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -6, scale: 1.012 }}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 text-left shadow-2xl shadow-slate-950/20 transition hover:border-cyan-300/30 hover:bg-white/[0.08]"
                >
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-300">
                    <Icon size={27} />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-white">{card.title}</h3>
                  <p className="mt-3 min-h-[112px] leading-7 text-slate-300">{card.text}</p>
                  <span className="mt-4 inline-block font-black text-cyan-300 transition group-hover:translate-x-1">
                    Explore →
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] border border-cyan-300/20 bg-gradient-to-br from-blue-600/20 to-cyan-400/10 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-white/10 text-cyan-300">
              <Brain size={34} />
            </div>
            <h2 className="mt-5 text-4xl font-black text-white">Ready to experience SocioGate?</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
              Explore the product, view pricing, or launch the live Experience Center for your next client meeting.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <PremiumButton onClick={() => onNavigate("products")}>Explore Products</PremiumButton>
              <PremiumButton onClick={onLaunchDemo} variant="glass">Launch Experience Center</PremiumButton>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
