import React from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle2 } from "lucide-react";
export default function ResidentNotification({ active, approved }) {
  if (!active) return null;
  return <motion.div className="absolute left-6 right-6 top-24 z-30 rounded-3xl border border-white/20 bg-white/95 p-4 text-slate-950 shadow-2xl" initial={{opacity:0,y:-28,scale:0.96}} animate={{opacity:[0,1,1],y:[-28,0,0],scale:[0.96,1,1]}} transition={{duration:0.7}}>
    <div className="flex items-start gap-3">
      <div className={approved ? "rounded-2xl bg-emerald-100 p-3 text-emerald-700" : "rounded-2xl bg-blue-100 p-3 text-blue-700"}>
        {approved ? <CheckCircle2 size={22}/> : <Bell size={22}/>}
      </div>
      <div><p className="font-black">{approved ? "Visitor Approved" : "Visitor Waiting"}</p>
      <p className="mt-1 text-xs text-slate-600">{approved ? "Gate pass activated successfully." : "Amit Sharma is waiting at Main Gate."}</p>
      {!approved && <motion.div className="mt-3 inline-flex rounded-full bg-emerald-500 px-4 py-2 text-xs font-black text-white" animate={{scale:[1,1.05,1]}} transition={{repeat:Infinity,duration:1.1}}>Auto Approve</motion.div>}</div>
    </div>
  </motion.div>;
}
