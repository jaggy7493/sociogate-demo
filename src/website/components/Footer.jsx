import React, { useState } from "react";
import { Globe, Mail, ShieldCheck, Share2, X } from "lucide-react";
import PremiumButton from "./PremiumButton";

const groups = [
  {
    title: "Product",
    items: [
      { label: "Visitor AI", page: "products" },
      { label: "Vehicle AI", page: "products" },
      { label: "ERP", page: "products" },
      { label: "Billing", page: "pricing" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "Apartments", page: "company" },
      { label: "Villas", page: "company" },
      { label: "Townships", page: "company" },
      { label: "Commercial", page: "company" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", page: "company" },
      { label: "Pricing", page: "pricing" },
      { label: "Contact", page: "contact" },
      { label: "Careers", action: "careers" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Book Demo", page: "contact" },
      { label: "Product Tour", action: "demo" },
      { label: "AI Engine", page: "ai" },
      { label: "FAQs", page: "faq" },
    ],
  },
];

export default function Footer({ onLaunchDemo, onNavigate }) {
  const [careersOpen, setCareersOpen] = useState(false);

  const go = (page) => {
    if (typeof onNavigate === "function") {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleClick = (item) => {
    if (item.action === "demo") return onLaunchDemo?.();
    if (item.action === "careers") return setCareersOpen(true);
    if (item.page) return go(item.page);
  };

  const quickActions = [
    { label: "Website", icon: Globe, onClick: () => go("home") },
    { label: "Email", icon: Mail, onClick: () => { window.location.href = "mailto:hello@sociogate.in?subject=SocioGate%20Demo%20Inquiry"; } },
    { label: "Share", icon: Share2, onClick: async () => {
      const url = "https://sociogate.in";
      try {
        if (navigator.share) {
          await navigator.share({ title: "SocioGate AI", text: "AI Powered Society Management Platform", url });
        } else {
          await navigator.clipboard.writeText(url);
          alert("Website link copied: " + url);
        }
      } catch {
        window.location.href = url;
      }
    }},
  ];

  return (
    <footer id="contact" className="relative border-t border-white/10 px-5 py-16">
      {careersOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-5 backdrop-blur">
          <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-slate-950 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black">Careers coming soon</h3>
              <button onClick={() => setCareersOpen(false)} className="rounded-full bg-white/10 p-2 hover:bg-white/15"><X /></button>
            </div>
            <p className="mt-4 leading-7 text-slate-300">
              SocioGate AI careers page is being prepared. For now, we are focused on product, pilots and society onboarding.
            </p>
            <div className="mt-6">
              <PremiumButton onClick={() => { setCareersOpen(false); go("contact"); }}>Contact Team</PremiumButton>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2.8rem] border border-cyan-300/15 bg-gradient-to-br from-blue-600/15 to-cyan-400/8 p-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1.3fr]">
            <div>
              <button onClick={() => go("home")} className="flex items-center gap-3 text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-xl shadow-cyan-950/30">
                  <ShieldCheck />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">SocioGate AI</p>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Smart Living Begins at the Gate</p>
                </div>
              </button>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                AI-powered society management for visitor intelligence, resident experience, security, billing and ERP.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PremiumButton onClick={onLaunchDemo} variant="glass">Launch Demo</PremiumButton>
                <PremiumButton onClick={() => go("contact")}>Contact Sales</PremiumButton>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      onClick={action.onClick}
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-black text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-200"
                    >
                      <Icon size={18} />
                      <span>{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {groups.map((group) => (
                <div key={group.title}>
                  <p className="font-black text-white">{group.title}</p>
                  <div className="mt-4 grid gap-3">
                    {group.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleClick(item)}
                        className="group text-left text-sm font-bold text-slate-400 transition hover:text-cyan-200"
                      >
                        <span className="inline-block transition group-hover:translate-x-1">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
            <p>© 2026 SocioGate AI. All rights reserved.</p>
            <p>Made in India 🇮🇳 · Website v2.6.2</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
