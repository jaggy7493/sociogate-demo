import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Download,
  FileText,
  IndianRupee,
  Printer,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 20,
    label: "Digital society operations",
    badge: "Small RWA",
    tone: "from-slate-700 to-slate-500",
    features: ["Visitor Management", "Guard App", "Resident App", "Notice Board", "Basic ERP"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 25,
    label: "Smart security + resident engagement",
    badge: "Growth",
    tone: "from-emerald-700 to-cyan-500",
    features: ["Everything in Starter", "Vehicle Intelligence", "Community Polls", "SOS Alerts", "Billing Dashboard"],
  },
  {
    id: "professional",
    name: "Professional AI",
    price: 30,
    label: "Premium AI society management",
    badge: "Recommended",
    tone: "from-blue-700 to-cyan-400",
    featured: true,
    features: ["Everything in Growth", "AI Face Recognition", "Security Intelligence", "Smart Billing", "AI Command Center"],
  },
  {
    id: "enterprise",
    name: "Enterprise AI",
    price: 40,
    label: "Luxury apartments + gated townships",
    badge: "Premium",
    tone: "from-violet-700 to-fuchsia-500",
    features: ["Everything in Professional", "Multi-Gate Support", "Advanced ERP", "Priority Support", "Custom Branding"],
  },
];

const cycles = {
  monthly: { label: "Monthly", months: 1, discount: 0 },
  quarterly: { label: "Quarterly", months: 3, discount: 5 },
  halfyearly: { label: "Half-Yearly", months: 6, discount: 10 },
  yearly: { label: "Yearly", months: 12, discount: 18 },
};

const features = [
  "AI Visitor",
  "Face Recognition",
  "Vehicle Intelligence",
  "Smart Billing",
  "ERP Command",
  "Emergency SOS",
  "QR Pass",
  "Analytics",
];

const MARKET_RATE_PER_FLAT = 80;

function inr(value) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function cleanFileName(name) {
  return (name || "Society").replace(/[^a-z0-9]/gi, "_");
}

function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.30),transparent_32%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.24),transparent_28%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.20),transparent_36%),linear-gradient(135deg,#020617,#0f172a_48%,#082f49)]" />
      <motion.div className="absolute left-[-15%] top-[15%] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" animate={{ x: [0, 80, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 10 }} />
      <motion.div className="absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" animate={{ x: [0, -70, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 12 }} />
      <motion.div className="absolute bottom-[-10%] left-[30%] h-80 w-80 rounded-full bg-violet-500/18 blur-3xl" animate={{ y: [0, -50, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 14 }} />
    </div>
  );
}

function CountUp({ value, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(value);

  React.useEffect(() => {
    const start = 0;
    const end = Number(value) || 0;
    const steps = 30;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setDisplay(Math.round(start + ((end - start) * current) / steps));
      if (current >= steps) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [value]);

  return <>{prefix}{display.toLocaleString("en-IN")}{suffix}</>;
}

function MetricTile({ icon: Icon, label, value, sub, tone = "text-cyan-300", numeric, prefix = "", suffix = "" }) {
  return (
    <motion.div layout className="rounded-[1.5rem] bg-slate-950/50 p-5">
      <Icon className={tone} />
      <p className="mt-3 text-sm text-slate-400">{label}</p>
      <h4 className="text-3xl font-black">
        {numeric ? <CountUp value={numeric} prefix={prefix} suffix={suffix} /> : value}
      </h4>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </motion.div>
  );
}

function PlanSelector({ selectedPlan, setSelectedPlanId }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {plans.map((plan, index) => {
        const selected = selectedPlan.id === plan.id;
        return (
          <motion.button
            key={plan.id}
            onClick={() => setSelectedPlanId(plan.id)}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ y: -6, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className={`relative min-h-[300px] overflow-hidden rounded-[2rem] border p-6 text-left transition ${
              selected ? "border-cyan-300 bg-cyan-300/10 shadow-2xl shadow-cyan-950/40" : "border-white/10 bg-white/[0.05] hover:bg-white/[0.08]"
            }`}
          >
            <div className={`absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${plan.tone} opacity-35 blur-xl`} />
            {selected && (
              <motion.div layoutId="selectedPlanPill" className="absolute right-5 top-5 rounded-full bg-cyan-300 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-slate-950">
                Selected
              </motion.div>
            )}
            <div className={`relative inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.tone} p-3`}>
              <Sparkles size={24} />
            </div>
            <p className="relative mt-6 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">{plan.badge}</p>
            <h3 className="relative mt-2 text-3xl font-black tracking-tight">{plan.name}</h3>
            <p className="relative mt-2 min-h-[44px] text-sm leading-6 text-slate-400">{plan.label}</p>
            <p className="relative mt-5 text-5xl font-black">₹{plan.price}<span className="text-sm text-slate-400">/flat</span></p>
            <div className="relative mt-5 space-y-2">
              {plan.features.slice(0, 4).map((feature) => (
                <div key={feature} className="flex items-start gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={16} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

function FeatureTile({ name, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-300">
        <Zap size={20} />
      </div>
      <p className="mt-4 font-black">{name}</p>
    </motion.div>
  );
}

function ComparisonBar({ label, value, max, color, note }) {
  const width = Math.max(8, Math.min(100, (value / max) * 100));
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="font-black">{label}</p>
          {note && <p className="text-xs text-slate-400">{note}</p>}
        </div>
        <b className="text-xl">{inr(value)}/mo</b>
      </div>
      <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/10">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${width}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={`h-4 rounded-full ${color}`} />
      </div>
    </div>
  );
}

function ProposalModal({ open, onClose, data, onPrint }) {
  if (!open) return null;

  const { societyName, flats, selectedPlan, calc } = data;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }} className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[2rem] border border-white/10 bg-slate-950 p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">Proposal Preview</p>
              <h2 className="mt-2 text-3xl font-black">{societyName}</h2>
            </div>
            <button onClick={onClose} className="rounded-2xl bg-white/10 p-3 hover:bg-white/15"><X /></button>
          </div>

          <div className="mt-6 rounded-[2rem] bg-gradient-to-br from-blue-700 to-cyan-500 p-6">
            <h3 className="text-4xl font-black">SocioGate Proposal</h3>
            <p className="mt-2 text-cyan-50">AI Powered Society Management Platform</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-5"><p className="text-slate-400">Society Size</p><b className="text-2xl">{flats} flats</b></div>
            <div className="rounded-2xl bg-white/5 p-5"><p className="text-slate-400">Selected Plan</p><b className="text-2xl text-cyan-300">{selectedPlan.name}</b></div>
            <div className="rounded-2xl bg-white/5 p-5"><p className="text-slate-400">Monthly Subscription</p><b className="text-2xl">{inr(calc.monthly)}</b></div>
            <div className="rounded-2xl bg-white/5 p-5"><p className="text-slate-400">{calc.selectedCycle.label} Payable</p><b className="text-2xl text-emerald-300">{inr(calc.cyclePayable)}</b></div>
            <div className="rounded-2xl bg-white/5 p-5"><p className="text-slate-400">Market Benchmark</p><b className="text-2xl">{inr(calc.marketMonthly)}/mo</b></div>
            <div className="rounded-2xl bg-white/5 p-5"><p className="text-slate-400">Estimated Saving</p><b className="text-2xl text-emerald-300">{inr(calc.yearlySaving)}/year</b></div>
          </div>

          <div className="mt-6 rounded-2xl bg-white/5 p-5">
            <h4 className="text-xl font-black">Included Features</h4>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {selectedPlan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-emerald-300" /> {feature}</div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button onClick={onClose} className="rounded-2xl bg-white/10 px-5 py-3 font-bold hover:bg-white/15">Close</button>
            <button onClick={onPrint} className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-black"><Printer className="inline" size={17} /> Print / Save PDF</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function SalesToolkit({ onBack, onLaunchProduct }) {
  const [societyName, setSocietyName] = useState("Green Meadows Society");
  const [flats, setFlats] = useState(250);
  const [selectedPlanId, setSelectedPlanId] = useState("professional");
  const [cycle, setCycle] = useState("yearly");
  const [proposalOpen, setProposalOpen] = useState(false);

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) || plans[2];

  const calc = useMemo(() => {
    const selectedCycle = cycles[cycle];
    const monthly = flats * selectedPlan.price;
    const cycleGross = monthly * selectedCycle.months;
    const cyclePayable = cycleGross - (cycleGross * selectedCycle.discount) / 100;
    const marketMonthly = flats * MARKET_RATE_PER_FLAT;
    const monthlySaving = Math.max(0, marketMonthly - monthly);
    const yearlySaving = monthlySaving * 12;
    const savingPercent = marketMonthly > 0 ? Math.round((monthlySaving / marketMonthly) * 100) : 0;
    return { selectedCycle, monthly, cyclePayable, marketMonthly, monthlySaving, yearlySaving, savingPercent };
  }, [flats, selectedPlan, cycle]);

  const proposalHtml = () => `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>SocioGate Proposal - ${societyName}</title>
<style>
@media print { button { display:none!important; } body { padding: 0; } }
body{font-family:Arial,sans-serif;color:#0f172a;padding:36px;line-height:1.55}
.hero{background:linear-gradient(135deg,#020617,#0369a1);color:white;padding:34px;border-radius:24px}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:24px}
.card{border:1px solid #e2e8f0;border-radius:18px;padding:18px}.big{font-size:28px;font-weight:800}.green{color:#059669}.blue{color:#2563eb}
.footer{margin-top:28px;border-top:1px solid #e2e8f0;padding-top:16px;color:#64748b;font-size:12px}
</style></head><body>
<div class="hero"><h1>SocioGate Proposal</h1><p>AI Powered Society Management Platform</p><h2>${societyName}</h2></div>
<div class="grid">
<div class="card"><h3>Society Size</h3><div class="big">${flats} flats</div></div>
<div class="card"><h3>Selected Plan</h3><div class="big blue">${selectedPlan.name}</div><p>₹${selectedPlan.price}/flat/month</p></div>
<div class="card"><h3>Monthly Subscription</h3><div class="big">${inr(calc.monthly)}</div></div>
<div class="card"><h3>${calc.selectedCycle.label} Payable</h3><div class="big green">${inr(calc.cyclePayable)}</div></div>
<div class="card"><h3>Market Benchmark</h3><div class="big">${inr(calc.marketMonthly)}/mo</div></div>
<div class="card"><h3>Estimated Saving</h3><div class="big green">${inr(calc.yearlySaving)}/year</div></div>
</div>
<h2 style="margin-top:28px">Included Features</h2><ul>${selectedPlan.features.map((f) => `<li>${f}</li>`).join("")}</ul>
<p style="margin-top:28px">For ${societyName}, SocioGate recommends ${selectedPlan.name} at ₹${selectedPlan.price}/flat/month. Estimated yearly saving versus ₹${MARKET_RATE_PER_FLAT}/flat benchmark is ${inr(calc.yearlySaving)}.</p>
<div class="footer">Generated by SocioGate Sales Experience. Pricing is indicative and can be customized after final scope confirmation.</div>
</body></html>`;

  const downloadProposal = () => {
    const blob = new Blob([proposalHtml()], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SocioGate_Proposal_${cleanFileName(societyName)}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printProposal = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(proposalHtml());
    win.document.close();
    setTimeout(() => win.print(), 300);
  };

  const startClientDemo = () => {
    localStorage.setItem(
      "sociogateClientDemo",
      JSON.stringify({
        societyName,
        flats,
        plan: selectedPlan.name,
        rate: selectedPlan.price,
        monthly: calc.monthly,
        yearlySaving: calc.yearlySaving,
      })
    );
    onLaunchProduct();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <AuroraBackground />

      <ProposalModal open={proposalOpen} onClose={() => setProposalOpen(false)} onPrint={printProposal} data={{ societyName, flats, selectedPlan, calc }} />

      <div className="relative">
        <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <button onClick={onBack} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/15">
              <ArrowLeft className="inline" size={17} /> Back
            </button>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">SocioGate Sales Experience v3.0</p>
              <h1 className="text-lg font-black">Premium Pricing</h1>
            </div>
            <button onClick={onLaunchProduct} className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-black">
              Launch Live Platform
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-5 pt-28">
          <section className="flex min-h-[calc(100vh-7rem)] flex-col justify-center py-12">
            <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.45em] text-cyan-300">AI Powered Society Platform</p>
              <h2 className="mt-5 text-6xl font-black leading-[0.95] tracking-tight sm:text-8xl">
                Sell smarter with <span className="text-cyan-300">SocioGate</span>.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Create a client-ready price proposal in seconds and launch the live product demo with the selected plan.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[360px_1fr]">
              <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl">
                <h3 className="text-2xl font-black">Client Setup</h3>
                <p className="mt-2 text-sm text-slate-400">Only two inputs.</p>

                <label className="mt-6 block">
                  <span className="text-sm font-bold text-slate-300">Society Name</span>
                  <input value={societyName} onChange={(e) => setSocietyName(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 font-black text-white outline-none focus:border-cyan-400" />
                </label>

                <div className="mt-5">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-slate-300">Number of Flats</span>
                    <b className="text-cyan-300">{flats}</b>
                  </div>
                  <input type="range" min="25" max="5000" step="25" value={flats} onChange={(e) => setFlats(Number(e.target.value))} className="mt-4 w-full accent-cyan-300" />
                  <input type="number" min="25" max="5000" value={flats} onChange={(e) => setFlats(Math.min(5000, Math.max(25, Number(e.target.value || 25))))} className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-xl font-black text-white outline-none focus:border-cyan-400" />
                </div>

                <div className="mt-5">
                  <span className="text-sm font-bold text-slate-300">Billing Cycle</span>
                  <div className="mt-2 grid grid-cols-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-1">
                    {Object.entries(cycles).map(([key, item]) => (
                      <button key={key} onClick={() => setCycle(key)} className={`rounded-xl px-2 py-3 text-xs font-black transition ${cycle === key ? "bg-cyan-300 text-slate-950" : "text-white hover:bg-white/10"}`}>
                        {item.label}
                        {item.discount > 0 && <span className="block text-[9px] opacity-75">{item.discount}% off</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div layout initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2.5rem] border border-cyan-300/20 bg-cyan-300/10 p-8 shadow-2xl shadow-cyan-950/30">
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-200">{societyName}</p>
                <AnimatePresence mode="wait">
                  <motion.div key={`${flats}-${selectedPlan.id}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                    <h3 className="mt-4 text-5xl font-black">{flats} Flats</h3>
                    <p className="mt-3 text-3xl font-black text-cyan-300">{selectedPlan.name}</p>
                    <p className="mt-2 text-xl text-slate-300">₹{selectedPlan.price} / flat / month</p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 grid gap-4 sm:grid-cols-4">
                  <MetricTile icon={IndianRupee} label="Monthly" numeric={calc.monthly} prefix="₹" tone="text-emerald-300" />
                  <MetricTile icon={IndianRupee} label={`${calc.selectedCycle.label} Payable`} numeric={calc.cyclePayable} prefix="₹" tone="text-cyan-300" />
                  <MetricTile icon={TrendingUp} label="Yearly Saving" numeric={calc.yearlySaving} prefix="₹" tone="text-amber-300" />
                  <MetricTile icon={Rocket} label="Go Live" value="7 Days" tone="text-violet-300" />
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => setProposalOpen(true)} className="rounded-2xl bg-white/10 px-6 py-4 font-black hover:bg-white/15">
                    <FileText className="inline" size={18} /> Preview Proposal
                  </button>
                  <button onClick={downloadProposal} className="rounded-2xl bg-white/10 px-6 py-4 font-black hover:bg-white/15">
                    <Download className="inline" size={18} /> Download
                  </button>
                  <button onClick={startClientDemo} className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-black">
                    <ShieldCheck className="inline" size={18} /> Start Live Demo
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-16">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">Plans</p>
              <h2 className="mt-3 text-5xl font-black">Choose the right package.</h2>
            </div>
            <PlanSelector selectedPlan={selectedPlan} setSelectedPlanId={setSelectedPlanId} />
          </section>

          <section className="grid gap-6 py-16 lg:grid-cols-2">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8">
              <h2 className="text-4xl font-black">Market comparison</h2>
              <p className="mt-2 text-slate-400">Benchmark uses estimated market average ₹{MARKET_RATE_PER_FLAT}/flat/month.</p>
              <div className="mt-8 space-y-7">
                <ComparisonBar label="Market Average" value={calc.marketMonthly} max={calc.marketMonthly} color="bg-red-400" note={`₹${MARKET_RATE_PER_FLAT} / flat / month`} />
                <ComparisonBar label="SocioGate" value={calc.monthly} max={calc.marketMonthly} color="bg-emerald-400" note={`₹${selectedPlan.price} / flat / month`} />
              </div>
              <div className="mt-8 rounded-[2rem] bg-emerald-400/10 p-6">
                <p className="text-sm text-emerald-200">Estimated annual saving</p>
                <h3 className="mt-1 text-5xl font-black text-emerald-300">{inr(calc.yearlySaving)}</h3>
                <p className="mt-2 text-sm text-slate-400">{calc.savingPercent}% lower than market benchmark</p>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8">
              <h2 className="text-4xl font-black">AI feature suite</h2>
              <p className="mt-2 text-slate-400">Everything your client expects from a premium society platform.</p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {features.map((feature, index) => <FeatureTile key={feature} name={feature} index={index} />)}
              </div>
            </div>
          </section>

          <section className="pb-20">
            <div className="rounded-[2.5rem] border border-cyan-300/20 bg-gradient-to-br from-blue-600/20 to-cyan-400/10 p-8 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">Proposal Summary</p>
              <h2 className="mt-3 text-5xl font-black">{societyName}</h2>
              <p className="mt-4 text-xl text-slate-300">
                {flats} flats · {selectedPlan.name} · ₹{selectedPlan.price}/flat/month · {inr(calc.monthly)}/month · {calc.selectedCycle.label}: {inr(calc.cyclePayable)}
              </p>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
                Estimated yearly saving versus the ₹{MARKET_RATE_PER_FLAT}/flat benchmark is <b className="text-emerald-300">{inr(calc.yearlySaving)}</b>.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button onClick={() => setProposalOpen(true)} className="rounded-2xl bg-white/10 px-6 py-4 font-black hover:bg-white/15">
                  <FileText className="inline" size={18} /> Preview Proposal
                </button>
                <button onClick={downloadProposal} className="rounded-2xl bg-white/10 px-6 py-4 font-black hover:bg-white/15">
                  <Download className="inline" size={18} /> Download Proposal
                </button>
                <button onClick={startClientDemo} className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-black">
                  <ShieldCheck className="inline" size={18} /> Start Live Demo
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
