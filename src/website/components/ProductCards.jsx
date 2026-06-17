import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Car, CreditCard, ScanFace, ShieldCheck, Smartphone } from "lucide-react";

const products=[
 {title:"Visitor AI",desc:"AI-powered visitor entry, resident approval and digital passes.",icon:ScanFace,tone:"from-blue-700 to-cyan-400"},
 {title:"Vehicle Intelligence",desc:"Number plate intelligence, watchlist alerts and smart gate tracking.",icon:Car,tone:"from-slate-800 to-blue-600"},
 {title:"Resident Experience",desc:"Residents manage visitors, bills, notices, polls and SOS in one app.",icon:Smartphone,tone:"from-emerald-700 to-cyan-500"},
 {title:"Guard App",desc:"Fast entry workflows, camera capture and security alerts for guards.",icon:ShieldCheck,tone:"from-violet-700 to-blue-500"},
 {title:"ERP Dashboard",desc:"Central command center for society admin, reports and operations.",icon:BarChart3,tone:"from-indigo-800 to-violet-500"},
 {title:"Smart Billing",desc:"Maintenance billing, payment status, receipts and ledger intelligence.",icon:CreditCard,tone:"from-amber-500 to-orange-500"}
];

export default function ProductCards(){
 return <section id="products" className="relative scroll-mt-32 px-5 py-20"><div className="mx-auto max-w-7xl">
  <div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">Products</p><h2 className="mt-4 text-5xl font-black leading-tight text-white">Everything a modern society needs.</h2><p className="mt-4 text-lg leading-8 text-slate-300">SocioGate connects security, residents, ERP, billing and AI intelligence into one premium platform.</p></div>
  <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{products.map((p,i)=>{const Icon=p.icon;return <motion.div key={p.title} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.06}} whileHover={{y:-6,scale:1.015}} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6"><div className={`absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${p.tone} opacity-25 blur-xl transition group-hover:opacity-45`}/><div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.tone} text-white`}><Icon size={28}/></div><h3 className="relative mt-6 text-2xl font-black text-white">{p.title}</h3><p className="relative mt-3 leading-7 text-slate-300">{p.desc}</p></motion.div>})}</div>
 </div></section>;
}
