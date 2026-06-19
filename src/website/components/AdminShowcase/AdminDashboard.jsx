import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  Building2,
  CheckCircle2,
  CreditCard,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";

const widgets = [
  { label: "Visitors Today", value: 128, suffix: "", icon: Users },
  { label: "Collections", value: 345000, prefix: "₹", icon: CreditCard },
  { label: "Active Complaints", value: 3, suffix: "", icon: FileText },
  { label: "AI Alerts", value: 0, suffix: "", icon: AlertTriangle },
];

function useCount(value, duration = 900) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = Number(value) || 0;
    const steps = 32;
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      setCount(Math.round((end * step) / steps));
      if (step >= steps) clearInterval(timer);
    }, Math.max(16, duration / steps));

    return () => clearInterval(timer);
  }, [value, duration]);

  return count;
}

function KpiCard({ item, index }) {
  const Icon = item.icon;
  const count = useCount(item.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="rounded-[1.35rem] border border-white/10 bg-white/[0.065] p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-300">
          <Icon size={20} />
        </div>
        <CheckCircle2 className="text-emerald-300" size={18} />
      </div>
      <p className="mt-4 text-2xl font-black text-white">
        {item.prefix || ""}
        {count.toLocaleString("en-IN")}
        {item.suffix || ""}
      </p>
      <p className="mt-1 text-xs font-bold text-slate-400">{item.label}</p>
    </motion.div>
  );
}

export default function AdminDashboard() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[660px]"
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
    >
      <div className="absolute -inset-8 rounded-[3rem] bg-blue-400/14 blur-3xl" />

      <div className="relative rounded-[2.4rem] border border-white/12 bg-slate-950 p-4 shadow-2xl shadow-blue-950/35">
        <div className="rounded-[1.9rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">SocioGate</p>
              <h3 className="mt-1 text-2xl font-black text-white">Admin ERP Command</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-black text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Live Sync
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {widgets.map((item, index) => (
              <KpiCard key={item.label} item={item} index={index} />
            ))}
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4">
              <div className="flex items-center justify-between">
                <p className="font-black text-white">Monthly Collection</p>
                <BarChart3 className="text-cyan-300" size={20} />
              </div>
              <div className="mt-5 flex h-36 items-end gap-2">
                {[42, 68, 54, 82, 76, 92, 88, 96].map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06, duration: 0.45 }}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-300"
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4">
              <div className="flex items-center justify-between">
                <p className="font-black text-white">Operations</p>
                <Building2 className="text-cyan-300" size={20} />
              </div>
              <div className="mt-4 grid gap-3">
                {[
                  ["Billing cycle", "Running"],
                  ["Complaint SLA", "On track"],
                  ["Gate devices", "Online"],
                  ["AI monitoring", "Active"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-950/50 px-4 py-3">
                    <span className="text-sm font-bold text-slate-400">{label}</span>
                    <span className="text-sm font-black text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-white/[0.065] p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-lg shadow-emerald-300/40" />
                <ShieldCheck />
              </div>
              <div>
                <p className="font-black text-white">Management Connected</p>
                <p className="text-xs text-slate-400">Billing • Complaints • Visitors • Reports synced</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
