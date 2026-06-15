import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import FloatingBackground from "./FloatingBackground";

export default function HeroFinish({ onExit, onRestart }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 p-6 text-white">
      <FloatingBackground />
      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex h-28 w-28 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-cyan-400 shadow-2xl"
        >
          <CheckCircle2 size={62} />
        </motion.div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">Thank You</p>
        <h1 className="mt-3 text-6xl font-black">Welcome to SocioGate</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          India’s next generation AI society platform for security, residents, ERP and payments.
        </p>

        <div className="mt-8 grid w-full grid-cols-2 gap-3 text-left sm:grid-cols-3">
          {["AI Recognition", "Visitor Flow", "Security Alerts", "Vehicle Intelligence", "SOS", "Billing", "Notices", "Polls", "ERP"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <CheckCircle2 className="text-emerald-300" size={20} />
              <p className="mt-2 font-bold">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button onClick={onRestart} className="rounded-2xl bg-white/10 px-6 py-3 font-bold hover:bg-white/15">
            Replay Tour
          </button>
          <button onClick={onExit} className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-black">
            Launch Live Platform
          </button>
        </div>
      </div>
    </div>
  );
}
