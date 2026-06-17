import React from "react";
import { ShieldCheck } from "lucide-react";
import PremiumButton from "./PremiumButton";

const groups = [
  { title: "Product", items: ["Visitor AI", "Vehicle AI", "ERP", "Billing"] },
  { title: "Solutions", items: ["Apartments", "Villas", "Townships", "Commercial"] },
  { title: "Company", items: ["About", "Pricing", "Contact", "Careers"] },
];

export default function Footer({ onLaunchDemo }) {
  return (
    <footer id="contact" className="relative border-t border-white/10 px-5 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400">
                <ShieldCheck />
              </div>
              <div>
                <p className="text-2xl font-black text-white">SocioGate AI</p>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Smart Living Begins at the Gate</p>
              </div>
            </div>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              AI-powered society management for visitor intelligence, resident experience, security, billing and ERP.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PremiumButton onClick={onLaunchDemo} variant="glass">Launch Demo</PremiumButton>
              <a href="mailto:hello@sociogate.in" className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 px-7 py-4 text-sm font-black text-white shadow-2xl shadow-cyan-950/30">
                Contact Sales
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="font-black text-white">{group.title}</p>
                <div className="mt-4 grid gap-3">
                  {group.items.map((item) => (
                    <button key={item} className="text-left text-sm font-bold text-slate-400 transition hover:text-cyan-200">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>© 2026 SocioGate AI. All rights reserved.</p>
          <p>Built in India for smarter communities.</p>
        </div>
      </div>
    </footer>
  );
}
