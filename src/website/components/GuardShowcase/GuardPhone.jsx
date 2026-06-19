import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Camera, Car, CheckCircle2, PackageCheck, QrCode, RadioTower, ShieldCheck, UserCheck } from "lucide-react";

const screens = [
  { title: "Visitor Check-In", subtitle: "Rahul Sharma · Flat A-702", status: "Resident Approved", icon: UserCheck, tone: "from-blue-600 to-cyan-400" },
  { title: "QR Verification", subtitle: "Visitor pass scanned at Main Gate", status: "Verified", icon: QrCode, tone: "from-indigo-600 to-blue-400" },
  { title: "Vehicle Entry", subtitle: "DL01AB1234 · Known vehicle", status: "Gate Open", icon: Car, tone: "from-slate-700 to-blue-500" },
  { title: "Delivery Entry", subtitle: "Amazon package · OTP verified", status: "Allowed", icon: PackageCheck, tone: "from-emerald-600 to-cyan-500" },
  { title: "Blacklist Alert", subtitle: "Watchlist vehicle detected", status: "Do Not Allow", icon: AlertTriangle, tone: "from-red-700 to-rose-500" },
  { title: "Emergency Response", subtitle: "Resident SOS triggered from Tower B", status: "Security Notified", icon: RadioTower, tone: "from-orange-600 to-red-500" },
];

export default function GuardPhone() {
  const [index, setIndex] = useState(0);
  const active = screens[index];
  const Icon = active.icon;

  useEffect(() => {
    const timer = setInterval(() => setIndex((value) => (value + 1) % screens.length), 3600);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div className="relative mx-auto w-full max-w-[390px]" animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
      <div className="absolute -inset-8 rounded-[3.5rem] bg-blue-400/18 blur-3xl" />
      <div className="relative rounded-[3rem] border border-white/15 bg-slate-950 p-3 shadow-2xl shadow-blue-950/35">
        <div className="absolute left-1/2 top-2 z-10 h-7 w-28 -translate-x-1/2 rounded-full bg-black/75" />
        <div className="overflow-hidden rounded-[2.45rem] bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-6">
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">SocioGate</p>
              <p className="mt-1 text-2xl font-black text-white">Guard</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
              <Camera size={21} />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {[["Today's Entries", "128"], ["Pending", "3"], ["Deliveries", "14"], ["Watchlist", "1"]].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white/[0.075] p-4">
                <p className="text-[11px] font-bold text-slate-400">{label}</p>
                <p className="mt-2 text-lg font-black text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 min-h-[226px]">
            <AnimatePresence mode="wait">
              <motion.div key={active.title} initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -18, scale: 0.96 }} transition={{ duration: 0.35 }} className={`rounded-[2rem] bg-gradient-to-br ${active.tone} p-5 text-white`}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/16">
                  <Icon size={28} />
                </div>
                <h3 className="mt-4 text-2xl font-black">{active.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/82">{active.subtitle}</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-black">
                  <CheckCircle2 size={16} />{active.status}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 rounded-2xl bg-white/[0.065] p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-lg shadow-emerald-300/40" />
                <ShieldCheck />
              </div>
              <div>
                <p className="font-black text-white">Security Control</p>
                <p className="text-xs text-slate-400">Gate online · AI monitoring active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
