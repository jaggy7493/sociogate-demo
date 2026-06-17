import React from "react";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import DashboardPreview from "./DashboardPreview";
import PremiumButton from "./PremiumButton";

export default function Hero({ onLaunchDemo, onBookDemo }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-200">
            SocioGate AI · Society OS
          </div>
          <h1 className="mt-7 text-6xl font-black leading-[0.92] tracking-tight text-white sm:text-7xl xl:text-8xl">
            Smarter societies.
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">Safer gates.</span>
            AI at work.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            A premium AI-powered society platform for visitor intelligence, resident engagement, guard operations, billing, ERP and security command.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PremiumButton onClick={onBookDemo}>Book Live Demo</PremiumButton>
            <PremiumButton onClick={onLaunchDemo} variant="glass" icon={PlayCircle}>Watch Cinematic Demo</PremiumButton>
          </div>

          <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["7 Days", "Deployment"],
              ["₹20+", "Per flat"],
              ["AI", "Command center"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="mt-1 text-xs font-bold text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <DashboardPreview />
      </div>
    </section>
  );
}
