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
import PremiumButton from "../PremiumButton";

const residentScreens = [
  { title: "Visitor Approval", subtitle: "Rahul Sharma is waiting at Main Gate", status: "Approved", icon: UserCheck, tone: "from-blue-600 to-cyan-400" },
  { title: "Maintenance Bill", subtitle: "June bill paid successfully", status: "Receipt Ready", icon: CreditCard, tone: "from-emerald-600 to-cyan-500" },
  { title: "Society Notice", subtitle: "Water supply update published", status: "Read", icon: Megaphone, tone: "from-indigo-600 to-blue-400" },
  { title: "Community Poll", subtitle: "Vote for weekend security timing", status: "Voted", icon: Vote, tone: "from-violet-600 to-fuchsia-500" },
  { title: "Complaint Tracking", subtitle: "Lift maintenance ticket updated", status: "In Progress", icon: FileText, tone: "from-slate-700 to-blue-500" },
  { title: "SOS Protection", subtitle: "Emergency support active for family", status: "24×7 Ready", icon: AlertTriangle, tone: "from-red-600 to-orange-500" },
];

const benefits = [
  "Visitor Approval",
  "Maintenance Bills",
  "Society Notices",
  "Community Polls",
  "Complaints",
  "SOS Protection",
  "Digital Passes",
  "Visitor History",
];

function ResidentPhone() {
  const [index, setIndex] = useState(0);
  const active = residentScreens[index];
  const Icon = active.icon;

  useEffect(() => {
    const timer = setInterval(() => setIndex((v) => (v + 1) % residentScreens.length), 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[380px]"
      animate={{ y: [0, -12, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      <div className="absolute -inset-8 rounded-[3.5rem] bg-cyan-400/18 blur-3xl" />
      <div className="relative rounded-[3rem] border border-white/15 bg-slate-950 p-3 shadow-2xl shadow-cyan-950/35">
        <div className="absolute left-1/2 top-2 h-7 w-28 -translate-x-1/2 rounded-full bg-black/70" />
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
              <ShieldCheck className="text-emerald-300" />
              <div>
                <p className="font-black text-white">Resident-first experience</p>
                <p className="text-xs text-slate-400">Only resident actions inside this app</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResidentShowcase({ onLaunchDemo }) {
  return (
    <section className="relative px-0 pb-20 pt-4">
      <div className="rounded-[2.75rem] border border-cyan-300/15 bg-gradient-to-br from-blue-600/12 to-cyan-400/8 p-6 md:p-9">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Resident Experience</p>
            <h2 className="mt-4 text-5xl font-black leading-tight text-white sm:text-6xl">
              Everything your residents need in one beautiful app.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Residents can approve visitors, pay bills, read notices, vote in polls, raise complaints, generate passes and trigger SOS from a premium mobile experience.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.035 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4"
                >
                  <CheckCircle2 className="shrink-0 text-emerald-300" size={18} />
                  <span className="font-bold text-slate-200">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PremiumButton onClick={onLaunchDemo}>Launch Resident Experience</PremiumButton>
              <button className="rounded-full border border-white/10 bg-white/[0.07] px-6 py-4 font-black text-white transition hover:bg-white/[0.12]">
                View Resident Features
              </button>
            </div>
          </div>

          <div>
            <ResidentPhone />

            <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                ["2 sec", "Approval time"],
                ["85%", "Less calls"],
                ["24×7", "SOS ready"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 text-center">
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="mt-1 text-xs font-bold text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
