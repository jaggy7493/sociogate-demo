import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Car,
  CheckCircle2,
  CreditCard,
  Eye,
  Fingerprint,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import PremiumButton from "./PremiumButton";

const modules = [
  {
    id: "visitor",
    label: "Visitor Intelligence",
    title: "Know who is entering before the gate opens.",
    description:
      "AI connects identity, visit history, resident approval and gate activity into one decision flow.",
    icon: Fingerprint,
    score: "99.8%",
    status: "LIVE",
    tone: "from-cyan-400 to-blue-600",
    events: [
      "Visitor detected at Main Gate",
      "Face match confidence: 99.8%",
      "Resident approval requested",
      "Entry approved and logged",
    ],
  },
  {
    id: "vehicle",
    label: "Vehicle Intelligence",
    title: "Turn every vehicle entry into a security signal.",
    description:
      "Plate recognition and watchlist intelligence help guards identify unusual vehicle activity faster.",
    icon: Car,
    score: "98.7%",
    status: "LIVE",
    tone: "from-blue-500 to-violet-600",
    events: [
      "Vehicle plate captured",
      "ANPR match completed",
      "Watchlist scan completed",
      "Gate activity synced",
    ],
  },
  {
    id: "risk",
    label: "Risk Detection",
    title: "Spot unusual activity before it becomes an incident.",
    description:
      "SocioGate correlates identity, history and gate events to surface security signals for human review.",
    icon: AlertTriangle,
    score: "96.4%",
    status: "ACTIVE",
    tone: "from-orange-400 to-red-600",
    events: [
      "Risk signal detected",
      "Historical activity checked",
      "Admin alert generated",
      "Security workflow initiated",
    ],
  },
  {
    id: "billing",
    label: "Billing Intelligence",
    title: "Turn collections into actionable intelligence.",
    description:
      "Billing activity, reminders and payment status become a single operational picture for administrators.",
    icon: CreditCard,
    score: "₹3.45L",
    status: "SYNCED",
    tone: "from-emerald-400 to-cyan-500",
    events: [
      "Monthly bill generated",
      "Payment reminder triggered",
      "UPI payment received",
      "Ledger updated",
    ],
  },
  {
    id: "erp",
    label: "ERP Intelligence",
    title: "One intelligence layer across society operations.",
    description:
      "Visitors, billing, complaints and operational activity are brought together for management decisions.",
    icon: BarChart3,
    score: "24×7",
    status: "ONLINE",
    tone: "from-violet-400 to-fuchsia-600",
    events: [
      "Visitor data synced",
      "Billing status refreshed",
      "Complaint SLA checked",
      "Management insight updated",
    ],
  },
  {
    id: "sos",
    label: "Emergency Intelligence",
    title: "Move critical alerts through the right people fast.",
    description:
      "Emergency signals can flow from resident actions to guard response and management visibility.",
    icon: RadioTower,
    score: "<2s",
    status: "READY",
    tone: "from-amber-400 to-red-500",
    events: [
      "SOS signal received",
      "Guard alert dispatched",
      "ERP escalation created",
      "Response state monitored",
    ],
  },
];

const metrics = [
  { icon: Users, value: "Resident", label: "Context aware" },
  { icon: Eye, value: "Live", label: "Signal processing" },
  { icon: Zap, value: "<2s", label: "Target response" },
];

function Pulse() {
  return (
    <span className="relative flex h-3 w-3">
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-300 opacity-60" />
      <span className="relative h-3 w-3 rounded-full bg-emerald-300" />
    </span>
  );
}

function MetricCard({ icon: Icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
      <Icon size={19} className="text-cyan-300" />
      <p className="mt-3 text-xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-400">{label}</p>
    </div>
  );
}

export default function AICommandCenter({ onLaunchDemo, onBookDemo }) {
  const [activeId, setActiveId] = useState("visitor");
  const [eventIndex, setEventIndex] = useState(0);

  const active = useMemo(
    () => modules.find((item) => item.id === activeId) || modules[0],
    [activeId]
  );

  const ActiveIcon = active.icon;

  useEffect(() => {
    setEventIndex(0);
    const timer = setInterval(() => {
      setEventIndex((value) => (value + 1) % active.events.length);
    }, 1900);

    return () => clearInterval(timer);
  }, [activeId, active.events.length]);

  return (
    <section id="ai" className="relative scroll-mt-32 px-5 pb-24 pt-8">
      <div className="mx-auto max-w-7xl">
                {/* Main intelligence console */}
        <div className="mt-10 overflow-hidden rounded-[2.8rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-slate-950/40 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            {/* Module selector */}
            <div className="rounded-[2.2rem] border border-white/10 bg-slate-950/55 p-4">
              <div className="flex items-center justify-between px-2 pb-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
                    Intelligence modules
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Select a live AI workflow.
                  </p>
                </div>
                <Sparkles size={20} className="text-cyan-300" />
              </div>

              <div className="grid gap-2">
                {modules.map((item) => {
                  const Icon = item.icon;
                  const selected = item.id === activeId;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                        selected
                          ? "border-cyan-300/35 bg-cyan-300/10"
                          : "border-white/5 bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          selected
                            ? "bg-cyan-300/15 text-cyan-200"
                            : "bg-white/[0.06] text-slate-400"
                        }`}
                      >
                        <Icon size={19} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-black text-white">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-xs font-bold text-slate-500">
                          {item.status}
                        </span>
                      </span>
                      {selected && <Pulse />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active AI visualization */}
            <div className="relative overflow-hidden rounded-[2.2rem] border border-cyan-300/15 bg-slate-950/70 p-6 sm:p-7">
              <div
                className={`pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full bg-gradient-to-br ${active.tone} opacity-20 blur-3xl`}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <Pulse />
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-300">
                          {active.status}
                        </p>
                      </div>
                      <h3 className="mt-4 max-w-2xl text-3xl font-black text-white sm:text-4xl">
                        {active.title}
                      </h3>
                      <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                        {active.description}
                      </p>
                    </div>

                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] bg-gradient-to-br ${active.tone} text-white shadow-lg`}
                    >
                      <ActiveIcon size={31} />
                    </div>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                      <p className="text-xs font-bold text-slate-500">AI confidence</p>
                      <p className="mt-2 text-2xl font-black text-white">
                        {active.score}
                      </p>
                    </div>
                    {metrics.map((metric) => (
                      <MetricCard key={metric.label} {...metric} />
                    ))}
                  </div>

                  <div className="mt-5 rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Activity size={18} className="text-cyan-300" />
                        <p className="font-black text-white">Live signal stream</p>
                      </div>
                      <span className="text-xs font-bold text-slate-500">
                        EVENT {String(eventIndex + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="mt-4 min-h-[62px] rounded-2xl bg-slate-950/70 px-4 py-4">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${active.id}-${eventIndex}`}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle2
                            size={19}
                            className="shrink-0 text-emerald-300"
                          />
                          <p className="font-bold text-slate-200">
                            {active.events[eventIndex]}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="mt-4 flex gap-1.5">
                      {active.events.map((event, index) => (
                        <div
                          key={event}
                          className={`h-1.5 flex-1 rounded-full transition ${
                            index === eventIndex
                              ? "bg-cyan-300"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <PremiumButton onClick={onLaunchDemo}>
                      Experience AI Engine
                    </PremiumButton>
                    <button
                      type="button"
                      onClick={onBookDemo}
                      className="min-h-[54px] rounded-full border border-white/10 bg-white/[0.06] px-6 py-4 font-black text-white transition hover:border-cyan-300/35 hover:bg-white/[0.1] active:scale-[0.98]"
                    >
                      Talk to SocioGate
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom intelligence strip */}
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {[
            ["Detect", "Signals become visible."],
            ["Decide", "AI adds context for people."],
            ["Act", "Workflows move instantly."],
          ].map(([title, text], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                  <ShieldCheck size={18} />
                </span>
                <p className="font-black text-white">{title}</p>
              </div>
              <p className="mt-3 text-sm font-bold text-slate-400">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
