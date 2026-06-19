import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { productModules, trustPoints } from "../data/products";
import WorkflowPreview from "./WorkflowPreview";
import PremiumButton from "./PremiumButton";
import ResidentShowcase from "./ResidentShowcase/ResidentShowcase";
import GuardShowcase from "./GuardShowcase/GuardShowcase";
import AdminShowcase from "./AdminShowcase/AdminShowcase";

export default function ProductShowcase({ onLaunchDemo, onBookDemo }) {
  const [activeId, setActiveId] = useState(productModules[0].id);
  const active = productModules.find((item) => item.id === activeId) || productModules[0];
  const ActiveIcon = active.icon;

  return (
    <section id="products" className="relative scroll-mt-36 px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <ResidentShowcase onLaunchDemo={onLaunchDemo} />
        <GuardShowcase onLaunchDemo={onLaunchDemo} />
        <AdminShowcase onLaunchDemo={onLaunchDemo} />
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Product Showcase</p>
            <h2 className="mt-4 text-5xl font-black leading-tight text-white">
              Every society operation in one AI-powered platform.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              SocioGate brings visitor entry, vehicles, billing, emergency alerts, ERP intelligence and resident experience into one premium ecosystem.
            </p>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 shrink-0 text-cyan-300" />
              <div>
                <p className="font-black text-white">Built for real society workflows</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Not just a visitor app. SocioGate is a full operating layer for security, residents and admin teams.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[420px_1fr]">
          <div className="grid gap-3">
            {productModules.map((module, index) => {
              const Icon = module.icon;
              const selected = activeId === module.id;
              return (
                <motion.button
                  key={module.id}
                  onClick={() => setActiveId(module.id)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className={`group rounded-[1.6rem] border p-4 text-left transition ${
                    selected
                      ? "border-cyan-300/50 bg-cyan-300/10 shadow-xl shadow-cyan-950/20"
                      : "border-white/10 bg-white/[0.055] hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${module.tone}`}>
                      <Icon size={24} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-white">{module.title}</p>
                      <p className="mt-1 line-clamp-1 text-sm text-slate-400">{module.subtitle}</p>
                    </div>
                    <ArrowRight className={`ml-auto shrink-0 transition ${selected ? "text-cyan-300" : "text-slate-500 group-hover:text-cyan-300"}`} size={18} />
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-7"
          >
            <div className={`absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br ${active.tone} opacity-25 blur-3xl`} />

            <div className="relative grid gap-7 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <div className={`flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-gradient-to-br ${active.tone}`}>
                  <ActiveIcon size={34} />
                </div>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.32em] text-cyan-300">Active Module</p>
                <h3 className="mt-3 text-5xl font-black leading-tight text-white">{active.title}</h3>
                <p className="mt-4 text-lg leading-8 text-slate-300">{active.subtitle}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {active.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-2 rounded-2xl bg-slate-950/40 p-3 text-sm font-bold text-slate-200">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={16} />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <PremiumButton onClick={onLaunchDemo} variant="glass">Explore Module</PremiumButton>
                  <PremiumButton onClick={onBookDemo}>Book Demo</PremiumButton>
                </div>
              </div>

              <div>
                <div className="rounded-[2rem] border border-white/10 bg-slate-950/50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Live Workflow</p>
                  <WorkflowPreview steps={active.workflow} />
                </div>

                <div className="mt-5 rounded-[2rem] border border-white/10 bg-slate-950/50 p-5">
                  <p className="font-black text-white">Why it matters</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    This module reduces manual coordination, improves security visibility and gives residents a smoother society experience.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5"
            >
              <CheckCircle2 className="text-emerald-300" />
              <p className="mt-4 font-bold leading-7 text-slate-200">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
