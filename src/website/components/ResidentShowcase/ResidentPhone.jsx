import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  CreditCard,
  FileText,
  Megaphone,
  ShieldCheck,
  UserCheck,
  Vote,
} from "lucide-react";

const screens = [
  {
    title: "Visitor Approval",
    subtitle: "Rahul Sharma is waiting at Main Gate",
    status: "Approved",
    icon: UserCheck,
    tone: "from-blue-600 to-cyan-400",
  },
  {
    title: "Maintenance Bill",
    subtitle: "June bill paid successfully",
    status: "Receipt Ready",
    icon: CreditCard,
    tone: "from-emerald-600 to-cyan-500",
  },
  {
    title: "Society Notice",
    subtitle: "Water supply update published",
    status: "Read",
    icon: Megaphone,
    tone: "from-indigo-600 to-blue-400",
  },
  {
    title: "Community Poll",
    subtitle: "Vote for weekend security timing",
    status: "Voted",
    icon: Vote,
    tone: "from-violet-600 to-fuchsia-500",
  },
  {
    title: "Complaint Tracking",
    subtitle: "Lift maintenance ticket updated",
    status: "In Progress",
    icon: FileText,
    tone: "from-slate-700 to-blue-500",
  },
  {
    title: "SOS Protection",
    subtitle: "Emergency support active for family",
    status: "24×7 Ready",
    icon: AlertTriangle,
    tone: "from-red-600 to-orange-500",
  },
];

export default function ResidentPhone() {
  const [index, setIndex] = useState(0);
  const active = screens[index];
  const Icon = active.icon;

  useEffect(() => {
    const timer = setInterval(() => setIndex((value) => (value + 1) % screens.length), 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[390px]"
      animate={{ y: [0, -12, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      <div className="absolute -inset-8 rounded-[3.5rem] bg-cyan-400/18 blur-3xl" />

      <div className="relative rounded-[3rem] border border-white/15 bg-slate-950 p-3 shadow-2xl shadow-cyan-950/35">
        <div className="absolute left-1/2 top-2 z-10 h-7 w-28 -translate-x-1/2 rounded-full bg-black/75" />

        <div className="overflow-hidden rounded-[2.45rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6">
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">SocioGate</p>
              <p className="mt-1 text-2xl font-black text-white">Resident</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
              <Bell size={21} />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {[
              ["Today's Visitors", "4"],
              ["Pending Approval", "1"],
              ["Bills Due", "₹4,500"],
              ["Emergency", "Safe"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white/[0.075] p-4">
                <p className="text-[11px] font-bold text-slate-400">{label}</p>
                <p className="mt-2 text-lg font-black text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 min-h-[226px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className={`rounded-[2rem] bg-gradient-to-br ${active.tone} p-5 text-white`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/16">
                  <Icon size={28} />
                </div>
                <h3 className="mt-4 text-2xl font-black">{active.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/82">{active.subtitle}</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-black">
                  <CheckCircle2 size={16} />
                  {active.status}
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
                <p className="font-black text-white">Resident Connected</p>
                <p className="text-xs text-slate-400">Visitors • Bills • Notices • SOS synced</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
