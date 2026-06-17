import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  IndianRupee,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import PremiumButton from "./PremiumButton";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 20,
    range: "Up to 100 flats",
    badge: "Small RWAs",
    ideal: "Digital visitor management",
    features: ["Visitor Management", "Guard App", "Resident App", "Notices", "Complaints"],
    count: "9 features",
    tone: "from-slate-700 to-slate-500",
  },
  {
    id: "growth",
    name: "Growth",
    price: 25,
    range: "101–300 flats",
    badge: "Growing Societies",
    ideal: "Security + billing automation",
    features: ["Everything in Starter", "Vehicle Intelligence", "QR Passes", "Smart Billing", "WhatsApp Alerts"],
    count: "18 features",
    tone: "from-emerald-700 to-cyan-500",
  },
  {
    id: "professional",
    name: "Professional AI",
    price: 30,
    range: "301–700 flats",
    badge: "Most Popular",
    ideal: "AI-powered society operations",
    features: ["Everything in Growth", "AI Face Recognition", "AI Watchlist", "SOS Command Center", "ERP Analytics"],
    count: "28 features",
    tone: "from-blue-700 to-cyan-400",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise AI",
    price: 40,
    range: "700+ flats",
    badge: "Builder Grade",
    ideal: "Townships and multi-site builders",
    features: ["Everything in Professional", "Unlimited Gates", "White Label", "API Access", "Dedicated Success Manager"],
    count: "40+ features",
    tone: "from-violet-700 to-fuchsia-500",
  },
];

const comparison = [
  ["Visitor Management", true, true, true, true],
  ["Guard App", true, true, true, true],
  ["Resident App", true, true, true, true],
  ["Notices & Complaints", true, true, true, true],
  ["Vehicle Intelligence", false, true, true, true],
  ["Smart Billing", false, true, true, true],
  ["QR Visitor Pass", false, true, true, true],
  ["AI Face Recognition", false, false, true, true],
  ["AI Watchlist Detection", false, false, true, true],
  ["SOS Command Center", false, false, true, true],
  ["ERP Analytics", false, false, true, true],
  ["White Label Branding", false, false, false, true],
  ["API Access", false, false, false, true],
  ["Dedicated Success Manager", false, false, false, true],
];

const MARKET_RATE = 80;

function inr(value) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function getRecommendedPlan(flats, aiSecurity, gates) {
  if (flats > 700 || gates >= 5) return plans[3];
  if (aiSecurity || flats > 300) return plans[2];
  if (flats > 100) return plans[1];
  return plans[0];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value || min)));
}

function Stepper({ label, value, setValue, min, max }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-300">{label}</p>
        <b className="text-cyan-300">{value}</b>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button onClick={() => setValue(clamp(value - 1, min, max))} className="rounded-full bg-white/10 p-2 hover:bg-white/15">
          <Minus size={16} />
        </button>
        <input
          type="range"
          min={min}
          max={max}
          step="1"
          value={value}
          onChange={(e) => setValue(clamp(e.target.value, min, max))}
          className="w-full accent-cyan-300"
        />
        <button onClick={() => setValue(clamp(value + 1, min, max))} className="rounded-full bg-white/10 p-2 hover:bg-white/15">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

function PlanCard({ plan, selected, recommended, onSelect }) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: -6, scale: 1.012 }}
      whileTap={{ scale: 0.98 }}
      className={`relative min-h-[360px] overflow-hidden rounded-[2rem] border p-6 text-left transition ${
        selected
          ? "border-cyan-300/60 bg-cyan-300/10 shadow-2xl shadow-cyan-950/30"
          : "border-white/10 bg-white/[0.055] hover:bg-white/[0.08]"
      }`}
    >
      <div className={`absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${plan.tone} opacity-25 blur-2xl`} />
      {(recommended || plan.featured) && (
        <div className="absolute right-5 top-5 rounded-full bg-cyan-300 px-3 py-1 text-[10px] font-black uppercase text-slate-950">
          {recommended ? "AI Pick" : "Popular"}
        </div>
      )}

      <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.tone}`}>
        <Sparkles />
      </div>

      <p className="relative mt-5 text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{plan.badge}</p>
      <h3 className="relative mt-2 text-3xl font-black text-white">{plan.name}</h3>
      <p className="relative mt-2 text-sm leading-6 text-slate-400">{plan.ideal}</p>

      <p className="relative mt-6 text-5xl font-black text-white">
        ₹{plan.price}
        <span className="text-sm text-slate-400">/flat</span>
      </p>
      <p className="relative mt-2 text-sm font-bold text-slate-400">{plan.range}</p>
      <p className="relative mt-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-black text-cyan-200">
        Includes {plan.count}
      </p>

      <div className="relative mt-5 space-y-2">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2 text-sm text-slate-300">
            <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={16} />
            {feature}
          </div>
        ))}
      </div>
    </motion.button>
  );
}

function RoiBar({ label, value, max, tone, note }) {
  const width = Math.max(8, Math.min(100, (value / max) * 100));
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="font-black text-white">{label}</p>
          <p className="text-xs text-slate-400">{note}</p>
        </div>
        <b className="text-xl text-white">{inr(value)}</b>
      </div>
      <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`h-4 rounded-full ${tone}`}
        />
      </div>
    </div>
  );
}

export default function PricingExperience({ onBookDemo, onLaunchDemo }) {
  const [flats, setFlats] = useState(248);
  const [gates, setGates] = useState(2);
  const [guards, setGuards] = useState(4);
  const [aiSecurity, setAiSecurity] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState("professional");
  const [showMatrix, setShowMatrix] = useState(false);

  const recommended = useMemo(() => getRecommendedPlan(flats, aiSecurity, gates), [flats, aiSecurity, gates]);
  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || recommended;

  const monthly = flats * selectedPlan.price;
  const yearly = monthly * 12;
  const marketMonthly = flats * MARKET_RATE;
  const marketYearly = marketMonthly * 12;
  const annualSaving = Math.max(0, marketYearly - yearly);
  const savingPercent = Math.round(((MARKET_RATE - selectedPlan.price) / MARKET_RATE) * 100);
  const setupCost = selectedPlan.id === "starter" ? 4999 : selectedPlan.id === "growth" ? 9999 : selectedPlan.id === "professional" ? 14999 : 24999;
  const roiMonths = Math.max(1, Math.ceil(setupCost / Math.max(1, annualSaving / 12)));

  const applyRecommendation = () => {
    setSelectedPlanId(recommended.id);
  };

  return (
    <section id="pricing" className="relative scroll-mt-36 px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Premium Pricing Experience</p>
          <h2 className="mt-4 text-5xl font-black leading-tight text-white">Find the right plan for your society.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Enter your society size and let SocioGate recommend the best package with pricing, savings and ROI.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[420px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-300/12 p-3 text-cyan-300">
                <Building2 />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Society Profile</h3>
                <p className="text-sm text-slate-400">Live AI recommendation</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
                <div className="flex justify-between">
                  <p className="text-sm font-bold text-slate-300">Number of flats</p>
                  <b className="text-cyan-300">{flats}</b>
                </div>
                <input
                  type="range"
                  min="25"
                  max="1500"
                  step="25"
                  value={flats}
                  onChange={(e) => setFlats(clamp(e.target.value, 25, 1500))}
                  className="mt-4 w-full accent-cyan-300"
                />
                <input
                  type="number"
                  value={flats}
                  onChange={(e) => setFlats(clamp(e.target.value, 25, 5000))}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-xl font-black text-white outline-none focus:border-cyan-400"
                />
              </div>

              <Stepper label="Entry gates" value={gates} setValue={setGates} min={1} max={10} />
              <Stepper label="Guards on duty" value={guards} setValue={setGuards} min={2} max={50} />

              <button
                onClick={() => setAiSecurity((v) => !v)}
                className={`flex w-full items-center justify-between rounded-[1.5rem] border p-4 transition ${
                  aiSecurity ? "border-cyan-300/50 bg-cyan-300/10" : "border-white/10 bg-slate-950/45"
                }`}
              >
                <span className="font-black text-white">Need AI Security?</span>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${aiSecurity ? "bg-cyan-300 text-slate-950" : "bg-white/10 text-white"}`}>
                  {aiSecurity ? "YES" : "NO"}
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] border border-cyan-300/20 bg-gradient-to-br from-blue-600/20 to-cyan-400/10 p-7"
          >
            <div className="flex flex-col justify-between gap-6 xl:flex-row">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">Selected Plan</p>
                <h3 className="mt-4 text-5xl font-black text-white">{selectedPlan.name}</h3>
                <p className="mt-3 max-w-xl text-lg leading-8 text-slate-300">
                  Current selection for a {flats}-flat society with {gates} gates and {guards} guards.
                </p>

                <div className="mt-5 rounded-[1.5rem] border border-cyan-300/20 bg-slate-950/40 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">AI Recommendation</p>
                      <p className="mt-1 text-lg font-black text-white">{recommended.name}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        Based on {flats} flats, {gates} gates and {aiSecurity ? "AI security requirement" : "standard operations"}.
                      </p>
                    </div>
                    <button
                      onClick={applyRecommendation}
                      className={`rounded-full px-5 py-3 text-sm font-black transition ${
                        selectedPlan.id === recommended.id
                          ? "bg-emerald-300 text-slate-950"
                          : "bg-cyan-300 text-slate-950 hover:bg-cyan-200"
                      }`}
                    >
                      {selectedPlan.id === recommended.id ? "Applied" : "Apply AI Pick"}
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    `${flats} flats`,
                    `${gates} gates`,
                    `${guards} guards`,
                    aiSecurity ? "AI enabled" : "Standard security",
                    `₹${selectedPlan.price}/flat`,
                  ].map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-4 py-2 text-xs font-black text-cyan-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid min-w-[260px] gap-3">
                <div className="rounded-[1.5rem] bg-slate-950/50 p-5">
                  <IndianRupee className="text-emerald-300" />
                  <p className="mt-3 text-sm text-slate-400">Selected Monthly</p>
                  <h4 className="text-3xl font-black text-white">{inr(monthly)}</h4>
                  <p className="mt-1 text-xs text-slate-500">{selectedPlan.name} · ₹{selectedPlan.price}/flat</p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-950/50 p-5">
                  <TrendingUp className="text-amber-300" />
                  <p className="mt-3 text-sm text-slate-400">Annual Saving</p>
                  <h4 className="text-3xl font-black text-white">{inr(annualSaving)}</h4>
                  <p className="mt-1 text-xs text-slate-500">Compared with ₹80/flat benchmark</p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PremiumButton onClick={onBookDemo}>Book Pricing Demo</PremiumButton>
              <PremiumButton onClick={onLaunchDemo} variant="glass">Watch Product Tour</PremiumButton>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={selectedPlan.id === plan.id}
              recommended={recommended.id === plan.id}
              onSelect={() => setSelectedPlanId(plan.id)}
            />
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-cyan-300" />
              <h3 className="text-2xl font-black text-white">ROI Visualization</h3>
            </div>
            <p className="mt-2 text-sm text-slate-400">Benchmark uses estimated market pricing of ₹{MARKET_RATE}/flat/month.</p>

            <div className="mt-7 space-y-7">
              <RoiBar label="Market Annual Cost" value={marketYearly} max={marketYearly} tone="bg-red-400" note={`₹${MARKET_RATE}/flat/month`} />
              <RoiBar label="SocioGate Annual Cost" value={yearly} max={marketYearly} tone="bg-emerald-400" note={`₹${selectedPlan.price}/flat/month`} />
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-emerald-400/10 p-5">
                <p className="text-sm text-emerald-200">Annual Saving</p>
                <h4 className="mt-1 text-2xl font-black text-emerald-300">{inr(annualSaving)}</h4>
              </div>
              <div className="rounded-[1.5rem] bg-cyan-300/10 p-5">
                <p className="text-sm text-cyan-200">Saving</p>
                <h4 className="mt-1 text-2xl font-black text-cyan-300">{savingPercent}%</h4>
              </div>
              <div className="rounded-[1.5rem] bg-violet-300/10 p-5">
                <p className="text-sm text-violet-200">ROI</p>
                <h4 className="mt-1 text-2xl font-black text-violet-300">{roiMonths} mo</h4>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-cyan-300" />
              <h3 className="text-2xl font-black text-white">Why the price increases</h3>
            </div>
            <p className="mt-3 leading-7 text-slate-300">
              Higher plans are not just more features. They support larger societies, more security complexity, AI workflows, management reporting, branding and enterprise support.
            </p>
            <div className="mt-6 space-y-3">
              {[
                ["Starter", "Digitize gate and resident operations"],
                ["Growth", "Add billing, vehicles and engagement"],
                ["Professional AI", "Add AI recognition, SOS and analytics"],
                ["Enterprise AI", "Add multi-site, white label, API and dedicated success"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl bg-slate-950/45 p-4">
                  <p className="font-black text-white">{title}</p>
                  <p className="mt-1 text-sm text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button onClick={() => setShowMatrix((v) => !v)} className="rounded-full border border-white/10 bg-white/[0.07] px-6 py-4 font-black text-white hover:bg-white/[0.12]">
            {showMatrix ? "Hide Feature Comparison" : "View Complete Feature Comparison"}
          </button>
        </div>

        {showMatrix && (
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-950/70">
                  <tr>
                    <th className="p-4 text-sm font-black text-white">Feature</th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="p-4 text-center text-sm font-black text-white">{plan.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row[0]} className="border-t border-white/10">
                      <td className="p-4 text-sm font-bold text-slate-300">{row[0]}</td>
                      {row.slice(1).map((ok, i) => (
                        <td key={`${row[0]}-${i}`} className="p-4 text-center">
                          {ok ? <CheckCircle2 className="mx-auto text-emerald-300" size={18} /> : <X className="mx-auto text-slate-600" size={18} />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        <div className="mt-12 rounded-[2.5rem] border border-cyan-300/20 bg-gradient-to-br from-blue-600/20 to-cyan-400/10 p-8 text-center">
          <Zap className="mx-auto text-cyan-300" size={34} />
          <h3 className="mt-4 text-4xl font-black text-white">Ready to modernize your society?</h3>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Book a live walkthrough and see how SocioGate can fit your society, builder project or township.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <PremiumButton onClick={onBookDemo}>Book Live Demo</PremiumButton>
            <PremiumButton onClick={onLaunchDemo} variant="glass">Watch Product Tour</PremiumButton>
          </div>
        </div>
      </div>
    </section>
  );
}
