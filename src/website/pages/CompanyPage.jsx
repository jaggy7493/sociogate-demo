import React from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, Rocket, ShieldCheck, Users } from "lucide-react";
import PageShell from "../components/PageShell";
import PremiumButton from "../components/PremiumButton";

const values = [
  ["Built for India", "Designed for apartments, villas, townships and commercial communities."],
  ["Security first", "Guard, resident and ERP workflows are designed around operational safety."],
  ["AI without complexity", "Premium AI features presented in a way society teams can actually use."],
  ["Scalable platform", "Prepared for future mobile apps, admin portals and multi-site builders."],
];

export default function CompanyPage({ onNavigate, onLaunchDemo, onBookDemo }) {
  return (
    <PageShell activePage="company" onNavigate={onNavigate} onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo}>
      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Company</p>
            <h1 className="mt-4 text-6xl font-black leading-tight text-white">Built for modern Indian communities.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              SocioGate AI brings security, resident experience, billing, ERP and AI intelligence into one premium platform.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              [Building2, "Societies", "Apartments and gated communities"],
              [ShieldCheck, "Security", "Guard and gate operations"],
              [Users, "Residents", "Mobile-first resident experience"],
              [Rocket, "Deployment", "Go live in days, not months"],
            ].map(([Icon, title, text]) => (
              <motion.div key={title} whileHover={{ y: -5 }} className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 text-center">
                <Icon className="mx-auto text-cyan-300" size={30} />
                <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {values.map(([title, text]) => (
              <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6">
                <CheckCircle2 className="text-emerald-300" />
                <h3 className="mt-4 text-2xl font-black text-white">{title}</h3>
                <p className="mt-2 leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-cyan-300/20 bg-cyan-300/10 p-8 text-center">
            <h2 className="text-4xl font-black text-white">Ready to present SocioGate to your society?</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">Book a walkthrough and see the full Experience Center, AI workflows and pricing engine.</p>
            <div className="mt-7 flex justify-center">
              <PremiumButton onClick={onBookDemo}>Book Demo</PremiumButton>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
