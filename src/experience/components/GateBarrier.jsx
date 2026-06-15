import React from "react";
import { motion } from "framer-motion";
export default function GateBarrier({ mode="open" }) {
  const isBlocked = mode === "blocked";
  return <div className="absolute bottom-5 left-5 right-5 z-20 rounded-3xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur">
    <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-300">
      <span>Smart Gate</span><span className={isBlocked ? "text-red-300" : "text-emerald-300"}>{isBlocked ? "Blocked" : "Opening"}</span>
    </div>
    <div className="relative h-16 overflow-hidden rounded-2xl bg-slate-900">
      <div className="absolute bottom-4 left-4 right-4 h-2 rounded-full bg-slate-700"/>
      <div className="absolute bottom-3 left-7 h-10 w-3 rounded bg-slate-600"/>
      <motion.div className={isBlocked ? "absolute bottom-10 left-9 h-2 w-[78%] rounded bg-red-400" : "absolute bottom-10 left-9 h-2 w-[78%] origin-left rounded bg-emerald-400"} animate={isBlocked ? {opacity:[0.8,1,0.8]} : {rotate:[0,-62,-62]}} transition={isBlocked ? {repeat:Infinity,duration:0.8} : {duration:1.6,repeat:Infinity,repeatDelay:1.1}}/>
    </div>
  </div>;
}
