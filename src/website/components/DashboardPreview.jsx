import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, Bell, Car, CreditCard, RadioTower, ScanFace, ShieldCheck } from "lucide-react";

const events=[
 {title:"Visitor Approved",subtitle:"Amit Sharma · Flat A-1204",icon:BadgeCheck,tone:"from-emerald-500 to-cyan-400"},
 {title:"AI Face Match 99.8%",subtitle:"Identity verified at Main Gate",icon:ScanFace,tone:"from-blue-600 to-cyan-400"},
 {title:"Vehicle Recognized",subtitle:"DL8CAF0001 · Watchlist scanned",icon:Car,tone:"from-slate-700 to-blue-500"},
 {title:"SOS Triggered",subtitle:"Emergency alert from Tower B",icon:RadioTower,tone:"from-red-600 to-rose-500"},
 {title:"Billing Completed",subtitle:"₹4,500 maintenance received",icon:CreditCard,tone:"from-emerald-600 to-lime-400"},
];

export default function DashboardPreview(){
 const [index,setIndex]=useState(0);
 const event=events[index]; const Icon=event.icon;
 useEffect(()=>{const t=setInterval(()=>setIndex(v=>(v+1)%events.length),2300);return()=>clearInterval(t)},[]);
 return <motion.div initial={{opacity:0,y:34,rotateX:8}} animate={{opacity:1,y:0,rotateX:0}} transition={{duration:.8}} className="relative mx-auto w-full max-w-[560px]">
  <div className="absolute -inset-6 rounded-[3rem] bg-cyan-400/15 blur-3xl"/>
  <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl">
   <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">AI Command Center</p><h3 className="mt-2 text-2xl font-black text-white">Live Society Intelligence</h3></div><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-300"><Bell/></div></div>
   <div className="mt-6 grid gap-4 sm:grid-cols-3">{[["Visitors","128"],["Alerts","03"],["Payments","₹2.4L"]].map(([l,v])=><div key={l} className="rounded-3xl bg-slate-950/60 p-4"><p className="text-xs text-slate-400">{l}</p><p className="mt-2 text-2xl font-black text-white">{v}</p></div>)}</div>
   <div className="mt-5 rounded-[2rem] bg-slate-950/60 p-4"><AnimatePresence mode="wait"><motion.div key={event.title} initial={{opacity:0,y:24,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-22,scale:.96}} transition={{duration:.35}} className={`rounded-[1.6rem] bg-gradient-to-br ${event.tone} p-5 text-white`}><div className="flex items-start gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/16"><Icon size={28}/></div><div><p className="text-xl font-black">{event.title}</p><p className="mt-1 text-sm text-white/78">{event.subtitle}</p></div></div></motion.div></AnimatePresence></div>
   <div className="mt-5 grid gap-3">{["AI Visitor Recognition","Vehicle Intelligence","ERP Sync"].map((item,i)=><div key={item} className="flex items-center justify-between rounded-2xl bg-white/[0.05] px-4 py-3"><div className="flex items-center gap-3"><motion.span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" animate={{opacity:[.35,1,.35],scale:[.9,1.2,.9]}} transition={{repeat:Infinity,duration:1.2,delay:i*.18}}/><span className="text-sm font-bold text-slate-200">{item}</span></div><ShieldCheck className="text-cyan-300" size={17}/></div>)}</div>
  </div>
 </motion.div>;
}
