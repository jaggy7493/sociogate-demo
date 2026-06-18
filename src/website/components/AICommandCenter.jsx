import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Camera,
  Car,
  CheckCircle2,
  CreditCard,
  Eye,
  Fingerprint,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import PremiumButton from "./PremiumButton";

const aiModules = [
  {
    id: "face",
    title: "Face Recognition",
    subtitle: "Detect, match and verify visitors at the gate.",
    icon: Fingerprint,
    confidence: "99.8%",
    status: "LIVE",
    tone: "from-blue-700 to-cyan-400",
    flow: ["Camera Scan", "Face Match", "Risk Score", "Resident Approval", "Gate Open"],
  },
  {
    id: "vehicle",
    title: "Vehicle AI",
    subtitle: "Scan vehicles and detect watchlist activity.",
    icon: Car,
    confidence: "98.7%",
    status: "LIVE",
    tone: "from-slate-800 to-blue-600",
    flow: ["Plate Scan", "ANPR", "Watchlist", "Guard Alert", "Entry Logged"],
  },
  {
    id: "watchlist",
    title: "Watchlist Detection",
    subtitle: "Identify suspicious visitors and vehicles before entry.",
    icon: AlertTriangle,
    confidence: "96.4%",
    status: "ACTIVE",
    tone: "from-red-700 to-rose-500",
    flow: ["Identity Check", "History Scan", "Risk Match", "Admin Alert", "Action"],
  },
  {
    id: "sos",
    title: "SOS Intelligence",
    subtitle: "Route emergency alerts to guards and ERP in seconds.",
    icon: RadioTower,
    confidence: "24×7",
    status: "READY",
    tone: "from-orange-600 to-red-500",
    flow: ["SOS Tap", "Guard Alert", "ERP Escalation", "Security Response", "Resolved"],
  },
  {
    id: "billing",
    title: "Billing Insights",
    subtitle: "Track payments, reminders and monthly collections.",
    icon: CreditCard,
    confidence: "₹2.4L",
    status: "SYNCED",
    tone: "from-emerald-700 to-cyan-500",
    flow: ["Invoice", "Reminder", "UPI Payment", "Receipt", "Ledger Sync"],
  },
  {
    id: "erp",
    title: "ERP Analytics",
    subtitle: "Turn society activity into admin intelligence.",
    icon: BarChart3,
    confidence: "AI",
    status: "ONLINE",
    tone: "from-violet-700 to-fuchsia-500",
    flow: ["Visitors", "Billing", "Complaints", "Reports", "Insights"],
  },
];

const timeline = [
  ["10:32", "Visitor detected at Main Gate", "Face AI"],
  ["10:33", "AI confidence matched at 99.8%", "Recognition"],
  ["10:34", "Resident notified for approval", "Resident App"],
  ["10:35", "Gate access approved and logged", "ERP Sync"],
  ["10:36", "Security dashboard updated", "Command Center"],
];

function PulseDot({ color = "bg-emerald-400" }) {
  return (
    <span className="relative flex h-3 w-3">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-60`} />
      <span className={`relative inline-flex h-3 w-3 rounded-full ${color}`} />
    </span>
  );
}

function Metric({ icon: Icon, label, value, tone = "text-cyan-300" }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5">
      <Icon className={tone} />
      <p className="mt-3 text-sm text-slate-400">{label}</p>
      <h4 className="mt-1 text-3xl font-black text-white">{value}</h4>
    </div>
  );
}

function FlowSteps({ steps }) {
  return (
    <div className="mt-5 grid gap-3">
      {steps.map((step, index) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.08 }}
          className="flex items-center gap-3 rounded-2xl bg-white/[0.055] p-3"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300/12 text-cyan-300">
            {index + 1}
          </div>
          <p className="text-sm font-bold text-slate-200">{step}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function AICommandCenter({ onLaunchDemo, onBookDemo }) {
  const [activeId, setActiveId] = useState("face");
  const [tick, setTick] = useState(0);

  const active = useMemo(() => aiModules.find((module) => module.id === activeId) || aiModules[0], [activeId]);
  const ActiveIcon = active.icon;

  useEffect(() => {
    const timer = setInterval(() => setTick((v) => (v + 1) % timeline.length), 2300);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="ai" className="relative scroll-mt-36 px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">AI Engine</p>
            <h2 className="mt-4 text-5xl font-black leading-tight text-white">
              The AI Command Center for modern communities.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              SocioGate reads signals, detects risk, triggers workflows and turns daily society operations into live intelligence.
            </p>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="flex items-start gap-3">
              <PulseDot />
              <div>
                <p className="font-black text-white">AI Status: Live</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Face recognition, vehicle intelligence, billing insights and ERP analytics are monitored from one command layer.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2.7rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-slate-950/30">
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden rounded-[2.2rem] border border-cyan-300/20 bg-slate-950/55 p-6">
              <div className={`absolute -right-28 -top-28 h-80 w-80 rounded-full bg-gradient-to-br ${active.tone} opacity-25 blur-3xl`} />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">Active AI Module</p>
                  <h3 className="mt-3 text-4xl font-black text-white">{active.title}</h3>
                </div>
                <div className={`flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-gradient-to-br ${active.tone}`}>
                  <ActiveIcon size={34} />
                </div>
              </div>

              <p className="relative mt-4 text-lg leading-8 text-slate-300">{active.subtitle}</p>

              <div className="relative mt-6 grid gap-4 sm:grid-cols-3">
                <Metric icon={Eye} label="Confidence" value={active.confidence} />
                <Metric icon={Activity} label="Status" value={active.status} tone="text-emerald-300" />
                <Metric icon={Zap} label="Response" value="<2s" tone="text-amber-300" />
              </div>

              <div className="relative mt-6 rounded-[1.8rem] border border-white/10 bg-white/[0.045] p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-cyan-300" />
                  <p className="font-black text-white">Live AI Workflow</p>
                </div>
                <FlowSteps steps={active.flow} />
              </div>
            </div>

            <div className="grid gap-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {aiModules.map((module) => {
                  const Icon = module.icon;
                  const selected = module.id === activeId;
                  return (
                    <button
                      key={module.id}
                      onClick={() => setActiveId(module.id)}
                      className={`group rounded-[1.5rem] border p-4 text-left transition ${
                        selected
                          ? "border-cyan-300/50 bg-cyan-300/10"
                          : "border-white/10 bg-slate-950/45 hover:bg-white/[0.07]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${module.tone}`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="font-black text-white">{module.title}</p>
                          <p className="text-xs text-slate-400">{module.status}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">Live Timeline</p>
                    <h4 className="mt-2 text-2xl font-black text-white">Society AI events</h4>
                  </div>
                  <PulseDot color="bg-cyan-300" />
                </div>

                <div className="mt-5 grid gap-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tick}
                      initial={{ opacity: 0, y: 18, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -18, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      className="rounded-[1.5rem] bg-gradient-to-br from-blue-600/25 to-cyan-400/15 p-4"
                    >
                      <p className="text-sm font-black text-cyan-300">{timeline[tick][0]} · {timeline[tick][2]}</p>
                      <p className="mt-1 text-lg font-black text-white">{timeline[tick][1]}</p>
                    </motion.div>
                  </AnimatePresence>

                  {timeline.map((item, index) => (
                    <div key={item[0]} className={`flex items-center gap-3 rounded-2xl px-3 py-2 ${index === tick ? "bg-cyan-300/10" : "bg-white/[0.035]"}`}>
                      <CheckCircle2 className={index <= tick ? "text-emerald-300" : "text-slate-600"} size={16} />
                      <p className="text-xs font-bold text-slate-300">{item[0]} · {item[1]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Metric icon={Camera} label="AI Cameras" value="46" />
            <Metric icon={Car} label="Vehicles / day" value="187" tone="text-blue-300" />
            <Metric icon={ShieldCheck} label="Risk checks" value="2,318" tone="text-emerald-300" />
            <Metric icon={BarChart3} label="ERP sync" value="Live" tone="text-violet-300" />
          </div>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <PremiumButton onClick={onBookDemo}>Book AI Demo</PremiumButton>
            <PremiumButton onClick={onLaunchDemo} variant="glass">Watch AI in Product Tour</PremiumButton>
          </div>
        </div>
      </div>
    </section>
  );
}
