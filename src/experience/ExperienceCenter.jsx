import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Compass, IndianRupee, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import FloatingBackground from "./components/FloatingBackground";
import MenuCard from "./components/MenuCard";
import Pill from "./components/Pill";
import ExperiencePlayer from "./ExperiencePlayer";
import SalesToolkit from "../sales/SalesToolkit";

export default function ExperienceCenter({ onEnterProduct, onLiveDemo }) {
  const [screen, setScreen] = useState("home");

  if (screen === "player") {
    return <ExperiencePlayer onExit={onEnterProduct} />;
  }

  if (screen === "sales") {
    return (
      <SalesToolkit
        onBack={() => setScreen("home")}
        onLaunchProduct={onEnterProduct}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <FloatingBackground />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-950">
              <ShieldCheck />
            </div>
            <div>
              <h1 className="text-2xl font-black">SocioGate</h1>
              <p className="text-xs text-cyan-200">AI Powered Society Management</p>
            </div>
          </div>

          <button onClick={onEnterProduct} className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/15">
            Launch Live Platform
          </button>
        </header>

        <main className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">Experience Center 4.2A</p>
            <h2 className="mt-5 text-5xl font-black leading-tight sm:text-7xl">
              Visual Foundation for a premium product story.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Spotlight effects, cinematic transitions, animated counters and live platform status indicators.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <Pill>Spotlight Engine</Pill>
              <Pill>Cinematic Motion</Pill>
              <Pill>Animated Counters</Pill>
              <Pill>Live Status</Pill>
              <Pill>Premium Background</Pill>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="grid gap-4">
            <MenuCard Icon={Sparkles} title="Start Experience" subtitle="Auto-playing cinematic tour for client meetings." onClick={() => setScreen("player")} tone="from-blue-600 to-cyan-400" />
            <MenuCard Icon={Camera} title="Live Camera Demo" subtitle="Launch the live platform and test the real camera flow." onClick={onLiveDemo || onEnterProduct} tone="from-emerald-600 to-cyan-500" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MenuCard Icon={Compass} title="Feature Explorer" subtitle="Browse SocioGate modules." onClick={() => setScreen("player")} tone="from-violet-600 to-fuchsia-500" />
              <MenuCard Icon={IndianRupee} title="Pricing & ROI" subtitle="Show plans, savings and recommended package." onClick={() => setScreen("sales")} tone="from-amber-500 to-orange-500" />
            </div>
            <MenuCard Icon={PhoneCall} title="Book Live Demo" subtitle="Use this in your sales pitch." onClick={onEnterProduct} tone="from-slate-800 to-slate-600" />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
