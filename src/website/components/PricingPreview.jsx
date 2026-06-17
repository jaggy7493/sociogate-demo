import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import PremiumButton from "./PremiumButton";

const plans = [
  { name: "Starter", price: "₹20", tag: "Small RWAs", features: ["Visitor Management", "Guard App", "Resident App"] },
  { name: "Growth", price: "₹25", tag: "Growing Societies", features: ["Vehicle Intelligence", "Billing Dashboard", "Community Polls"] },
  { name: "Professional AI", price: "₹30", tag: "Recommended", featured: true, features: ["AI Face Recognition", "Smart Billing", "AI Command Center"] },
  { name: "Enterprise AI", price: "₹40", tag: "Premium", features: ["Multi-Gate", "Custom Branding", "Priority Support"] },
];

export default function PricingPreview({ onBookDemo, onLaunchDemo }) {
  return (
    <section id="pricing" className="relative px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Pricing</p>
          <h2 className="mt-4 text-5xl font-black leading-tight text-white">Simple plans. Premium value.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Start lean, upgrade to AI, and scale across gates, towers and communities.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6, scale: 1.012 }}
              className={`relative overflow-hidden rounded-[2rem] border p-6 ${
                plan.featured
                  ? "border-cyan-300/50 bg-cyan-300/10 shadow-2xl shadow-cyan-950/30"
                  : "border-white/10 bg-white/[0.055]"
              }`}
            >
              {plan.featured && (
                <div className="absolute right-5 top-5 rounded-full bg-cyan-300 px-3 py-1 text-[10px] font-black uppercase text-slate-950">
                  Best Value
                </div>
              )}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
                <Sparkles />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">{plan.tag}</p>
              <h3 className="mt-2 text-2xl font-black text-white">{plan.name}</h3>
              <p className="mt-5 text-5xl font-black text-white">{plan.price}<span className="text-sm text-slate-400">/flat</span></p>
              <div className="mt-5 space-y-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={16} />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <PremiumButton onClick={onBookDemo}>Book Pricing Demo</PremiumButton>
          <PremiumButton onClick={onLaunchDemo} variant="glass">Watch Product Tour</PremiumButton>
        </div>
      </div>
    </section>
  );
}
