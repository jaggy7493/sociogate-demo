import React from "react";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
export default function MovingVehicle({ danger=false }) {
  return <div className="absolute bottom-5 left-5 right-5 z-20 rounded-3xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur">
    <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-300">
      <span>Vehicle Lane</span><span className={danger ? "text-red-300" : "text-cyan-300"}>{danger ? "Watchlist" : "Moving"}</span>
    </div>
    <div className="relative h-16 overflow-hidden rounded-2xl bg-slate-900">
      <div className="absolute bottom-5 left-0 right-0 border-t border-dashed border-slate-600"/>
      <motion.div className={danger ? "absolute bottom-7 text-red-300" : "absolute bottom-7 text-cyan-300"} animate={danger ? {x:["0%","43%","43%"],scale:[1,1.1,1.1]} : {x:["-10%","105%"]}} transition={danger ? {duration:2.3,repeat:Infinity,repeatDelay:0.7} : {duration:3.2,repeat:Infinity,ease:"linear"}}>
        <Car size={36}/>
      </motion.div>
      {danger && <div className="absolute bottom-4 right-12 h-11 w-2 rounded bg-red-400 shadow-lg shadow-red-400/40"/>}
    </div>
  </div>;
}
