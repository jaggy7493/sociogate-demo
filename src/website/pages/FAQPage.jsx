import React from "react";
import { HelpCircle, CheckCircle2 } from "lucide-react";
import PageShell from "../components/PageShell";
import PageHero from "../components/PageHero";
import PremiumButton from "../components/PremiumButton";

const faqs = [
  {
    q: "What is SocioGate AI?",
    a: "SocioGate AI is an AI-powered society management platform for visitor entry, resident approvals, vehicle intelligence, billing, ERP, SOS alerts and analytics.",
  },
  {
    q: "Is SocioGate only for large societies?",
    a: "No. SocioGate supports small RWAs, growing societies, premium apartments, villas, townships and commercial communities with flexible pricing plans.",
  },
  {
    q: "Does SocioGate support AI face recognition?",
    a: "Yes. The Professional AI and Enterprise AI plans include AI face recognition workflows, watchlist detection and security intelligence features.",
  },
  {
    q: "Can guards use SocioGate at the gate?",
    a: "Yes. SocioGate includes guard workflows for visitor entry, vehicle entry, resident approval, emergency alerts and gate activity tracking.",
  },
  {
    q: "Can residents approve visitors?",
    a: "Yes. Residents can approve visitors, view activity, handle bills, notices, polls, complaints and SOS workflows from the resident experience.",
  },
  {
    q: "What is the pricing model?",
    a: "Pricing starts at ₹20 per flat per month and scales based on society size, AI requirements and enterprise needs.",
  },
  {
    q: "How fast can SocioGate go live?",
    a: "For a standard society setup, the target go-live timeline is around 7 days after onboarding and data setup.",
  },
  {
    q: "Is this suitable for builders and townships?",
    a: "Yes. Enterprise AI is designed for large communities, multi-gate operations, white-label branding, API access and dedicated success support.",
  },
];

export default function FAQPage({ onNavigate, onLaunchDemo, onBookDemo }) {
  return (
    <PageShell activePage="faq" onNavigate={onNavigate} onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo}>
      <PageHero
        eyebrow="FAQs"
        title="Answers before your first demo."
        subtitle="Quick answers for RWAs, builders, security teams and residents evaluating SocioGate AI."
      />

      <section className="px-5 pb-24 pt-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4">
            {faqs.map((item, index) => (
              <div
                key={item.q}
                className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-slate-950/20"
                style={{ animation: `fadeUp 520ms ease ${index * 45}ms both` }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-300">
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{item.q}</h3>
                    <p className="mt-2 leading-7 text-slate-300">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2.5rem] border border-cyan-300/20 bg-cyan-300/10 p-8 text-center">
            <CheckCircle2 className="mx-auto text-emerald-300" size={32} />
            <h2 className="mt-4 text-4xl font-black text-white">Still have questions?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">Book a live walkthrough and we will explain SocioGate with your society size, gates and pricing.</p>
            <div className="mt-7 flex justify-center">
              <PremiumButton onClick={onBookDemo}>Book Live Demo</PremiumButton>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
