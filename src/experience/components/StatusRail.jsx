import React from "react";
import { motion } from "framer-motion";

const items = ["AI Connected", "ERP Connected", "Camera Ready", "Cloud Synced"];

export default function StatusRail() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map((item, i) => (
        <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200">
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40"
            animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.2, 0.85] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
          />
          {item}
        </div>
      ))}
    </div>
  );
}
