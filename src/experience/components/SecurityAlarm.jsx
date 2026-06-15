import React from "react";
import { motion } from "framer-motion";
import { Siren } from "lucide-react";
export default function SecurityAlarm({ active, label="SECURITY ALERT" }) {
  if (!active) return null;
  return <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[2.5rem]">
    <motion.div className="absolute inset-0 bg-red-600/18" animate={{opacity:[0,0.65,0]}} transition={{repeat:Infinity,duration:0.75}} />
    <motion.div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full border border-red-300/40 bg-red-600/95 px-5 py-2 text-sm font-black text-white shadow-2xl shadow-red-950/40" animate={{scale:[1,1.06,1],opacity:[0.85,1,0.85]}} transition={{repeat:Infinity,duration:0.7}}>
      <span className="inline-flex items-center gap-2"><Siren size={17}/> {label}</span>
    </motion.div>
  </div>;
}
