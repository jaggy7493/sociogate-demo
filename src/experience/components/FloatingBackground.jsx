import React from "react";
import { motion } from "framer-motion";

export default function FloatingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.30),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.20),_transparent_36%),linear-gradient(135deg,#020617,#0f172a_45%,#082f49)]" />

      <motion.div
        className="absolute inset-x-0 top-20 h-24 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent blur-3xl"
        animate={{ x: ["-20%", "20%", "-20%"] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-52 opacity-35">
        <svg viewBox="0 0 1200 250" className="h-full w-full" preserveAspectRatio="none">
          <path d="M0 210 L60 210 L60 145 L105 145 L105 210 L160 210 L160 92 L235 92 L235 210 L300 210 L300 130 L365 130 L365 210 L430 210 L430 70 L515 70 L515 210 L580 210 L580 115 L655 115 L655 210 L710 210 L710 85 L795 85 L795 210 L865 210 L865 130 L925 130 L925 210 L995 210 L995 98 L1070 98 L1070 210 L1200 210 L1200 250 L0 250 Z" fill="white" />
          <path d="M0 218 L1200 218" stroke="rgba(255,255,255,0.55)" strokeWidth="3" />
        </svg>
      </div>

      <motion.div className="absolute bottom-10 left-[-120px] h-3 w-24 rounded-full bg-cyan-300/50 blur-sm" animate={{ x: ["0vw", "115vw"] }} transition={{ repeat: Infinity, duration: 9, ease: "linear" }} />
      <motion.div className="absolute bottom-16 right-[-120px] h-2 w-20 rounded-full bg-blue-300/40 blur-sm" animate={{ x: ["0vw", "-115vw"] }} transition={{ repeat: Infinity, duration: 13, ease: "linear" }} />

      {[...Array(28)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/40"
          style={{ left: `${(i * 13) % 100}%`, top: `${(i * 19) % 100}%` }}
          animate={{ y: [0, -26, 0], opacity: [0.2, 0.9, 0.2], scale: [1, 1.9, 1] }}
          transition={{ repeat: Infinity, duration: 3 + (i % 5), delay: i * 0.16 }}
        />
      ))}
    </div>
  );
}
