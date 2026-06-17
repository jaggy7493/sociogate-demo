import React from "react";
import { motion } from "framer-motion";

export default function AuroraBackground() {
  return <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,194,255,0.22),transparent_32%),radial-gradient(circle_at_top_right,rgba(147,51,234,0.20),transparent_30%),radial-gradient(circle_at_bottom,rgba(37,99,235,0.18),transparent_38%),linear-gradient(135deg,#020617,#0f172a_45%,#082f49)]" />
    <motion.div className="absolute left-[-12%] top-[18%] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" animate={{x:[0,70,0],y:[0,-28,0],scale:[1,1.15,1]}} transition={{repeat:Infinity,duration:11}} />
    <motion.div className="absolute right-[-10%] top-[16%] h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" animate={{x:[0,-80,0],y:[0,44,0],scale:[1,1.12,1]}} transition={{repeat:Infinity,duration:13}} />
    <motion.div className="absolute bottom-[-12%] left-[35%] h-80 w-80 rounded-full bg-violet-500/16 blur-3xl" animate={{y:[0,-50,0],scale:[1,1.18,1]}} transition={{repeat:Infinity,duration:15}} />
    {[...Array(24)].map((_,i)=><motion.span key={i} className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/35" style={{left:`${(i*17)%100}%`,top:`${(i*23)%100}%`}} animate={{y:[0,-24,0],opacity:[0.2,0.8,0.2],scale:[1,1.8,1]}} transition={{repeat:Infinity,duration:3+(i%5),delay:i*0.14}} />)}
  </div>;
}
