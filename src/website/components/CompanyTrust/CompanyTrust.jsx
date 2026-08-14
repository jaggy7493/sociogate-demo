import React from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Cloud,
  Headphones,
  Lock,
  Network,
  Rocket,
  ShieldCheck,
  Zap,
} from "lucide-react";
import PremiumButton from "../PremiumButton";

const trustCards = [
  {
    icon: Lock,
    title: "Enterprise Security",
    text: "Role-based access, secure workflows, audit-ready logs and cloud-first architecture.",
    points: ["Role based access", "Secure activity logs", "Admin controls"],
  },
  {
    icon: Cloud,
    title: "Cloud Ready",
    text: "Built for modern deployment with scalable hosting, backups and production reliability.",
    points: ["Cloud deployment", "Backup ready", "Scalable platform"],
  },
  {
    icon: Network,
    title: "Integrated Platform",
    text: "Prepared for WhatsApp, SMS, email, UPI, payment gateway and API-first integrations.",
    points: ["WhatsApp ready", "UPI ready", "API first"],
  },
  {
    icon: Headphones,
    title: "Success Support",
    text: "Designed for onboarding societies, guards, residents and administrators with clarity.",
    points: ["Fast onboarding", "Training support", "Demo ready"],
  },
];

const metrics = [
  ["7 days", "Go-live target"],
  ["24×7", "Security workflows"],
  ["99.9%", "Uptime target"],
  ["AI", "Powered operations"],
];

const badges = [
  "Built for India",
  "Apartment Ready",
  "Villa Ready",
  "Township Ready",
  "RWA Ready",
  "Builder Ready",
  "API First",
  "Cloud Ready",
];

function TrustCard({ card, index }) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-slate-950/20"
    >
      <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-300">
        <Icon size={27} />
      </div>
      <h3 className="mt-6 text-2xl font-black text-white">{card.title}</h3>
      <p className="mt-3 leading-7 text-slate-300">{card.text}</p>

      <div className="mt-5 grid gap-2">
        {card.points.map((point) => (
          <div key={point} className="flex items-center gap-2 text-sm font-bold text-slate-300">
            <CheckCircle2 className="text-emerald-300" size={16} />
            {point}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function CompanyTrust({ onNavigate, onLaunchDemo, onBookDemo }) {
  return (
    <>
      <section className="px-5 pb-8 pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.8rem] border border-cyan-300/15 bg-gradient-to-br from-blue-600/14 via-slate-950/55 to-cyan-400/8 p-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Enterprise Trust</p>
                <h2 className="mt-4 text-5xl font-black leading-tight text-white">
                  Built to earn trust before the first demo.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  SocioGate is designed for RWAs, builders and modern societies that need secure operations, reliable workflows and a platform that can scale from one gate to large townships.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PremiumButton onClick={onBookDemo}>Contact Sales</PremiumButton>
                  <PremiumButton onClick={onLaunchDemo} variant="glass">Launch Experience</PremiumButton>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {metrics.map(([value, label], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-[1.6rem] border border-white/10 bg-slate-950/45 p-5"
                  >
                    <p className="text-3xl font-black text-white">{value}</p>
                    <p className="mt-1 text-sm font-bold text-slate-400">{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {trustCards.map((card, index) => (
              <TrustCard key={card.title} card={card} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-7">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-300">
                  <BadgeCheck size={28} />
                </div>
                <h3 className="mt-5 text-3xl font-black text-white">Platform readiness</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  Position SocioGate as a serious product for real societies, not just a demo website.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {badges.map((badge, index) => (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.035 }}
                    className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.8rem] border border-cyan-300/20 bg-gradient-to-br from-blue-600/22 to-cyan-400/10 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-white/10 text-cyan-300">
              <Rocket size={34} />
            </div>
            <h2 className="mt-5 text-4xl font-black text-white">Ready to transform your society?</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
              Show SocioGate to your committee, builder team or RWA with a premium live demo.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <PremiumButton onClick={onBookDemo}>Book Live Demo</PremiumButton>
              <button
                onClick={() => onNavigate?.("pricing")}
                className="min-h-[56px] rounded-full border border-white/10 bg-white/[0.07] px-6 py-4 font-black text-white transition hover:border-cyan-300/40 hover:bg-white/[0.12] active:scale-[0.98]"
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
