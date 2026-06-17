import React from "react";
import { motion } from "framer-motion";

const stats=[{value:"99.9%",label:"Platform Uptime"},{value:"7 Days",label:"Deployment"},{value:"24×7",label:"Support"},{value:"AI",label:"Powered Operations"}];

export default function Stats(){
 return <section className="relative px-5 py-10"><div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">{stats.map((s,i)=><motion.div key={s.label} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur"><p className="text-4xl font-black text-white">{s.value}</p><p className="mt-2 text-sm font-bold text-slate-400">{s.label}</p></motion.div>)}</div></section>;
}
