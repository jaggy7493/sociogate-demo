import React from "react";
import { motion } from "framer-motion";

export default function Spotlight({ danger = false, label }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <motion.div
        className={`absolute -inset-1 rounded-[2.6rem] ${danger ? "bg-red-500/25" : "bg-cyan-400/20"} blur-2xl`}
        animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.98, 1.025, 0.98] }}
        transition={{ repeat: Infinity, duration: danger ? 0.85 : 2.2 }}
      />
      <motion.div
        className={`absolute inset-0 rounded-[2.5rem] border ${danger ? "border-red-400/70" : "border-cyan-300/60"}`}
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ repeat: Infinity, duration: danger ? 0.8 : 2 }}
      />
      {label && (
        <div className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-black shadow-xl ${danger ? "bg-red-500 text-white" : "bg-cyan-300 text-slate-950"}`}>
          Spotlight: {label}
        </div>
      )}
    </div>
  );
}
