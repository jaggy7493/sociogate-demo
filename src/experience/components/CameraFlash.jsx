import React from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
export default function CameraFlash({ active }) {
  if (!active) return null;
  return <div className="pointer-events-none absolute inset-0 z-30">
    <motion.div className="absolute inset-0 rounded-[2.5rem] bg-white" initial={{opacity:0}} animate={{opacity:[0,0.85,0]}} transition={{duration:0.55,repeat:Infinity,repeatDelay:2.2}} />
    <motion.div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-black text-slate-950 shadow-2xl" initial={{opacity:0,y:-8}} animate={{opacity:[0,1,1,0],y:[-8,0,0,-8]}} transition={{duration:2.5,repeat:Infinity}}>
      <Camera size={15}/> Camera Capture
    </motion.div>
  </div>;
}
