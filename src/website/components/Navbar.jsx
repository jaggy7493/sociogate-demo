import React, { useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";
import PremiumButton from "./PremiumButton";

const navItems = [
  { label: "Home", page: "home" },
  { label: "Products", page: "products" },
  { label: "AI Engine", page: "ai" },
  { label: "Pricing", page: "pricing" },
  { label: "Company", page: "company" },
  { label: "Contact", page: "contact" },
];

export default function Navbar({ activePage = "home", onNavigate, onLaunchDemo, onBookDemo }) {
  const [open, setOpen] = useState(false);

  const navigate = (page) => {
    setOpen(false);
    if (typeof onNavigate === "function") onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[1.75rem] border border-white/12 bg-slate-950/86 px-4 py-3 shadow-2xl shadow-slate-950/45 backdrop-blur-2xl">
        <button onClick={() => navigate("home")} className="flex min-w-[230px] items-center gap-3 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-cyan-950/30">
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="text-lg font-black leading-none text-white">SocioGate AI</p>
            <p className="mt-1 hidden text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200 sm:block">
              Smart Living Begins at the Gate
            </p>
          </div>
        </button>

        <nav className="hidden items-center justify-center rounded-full border border-white/10 bg-white/[0.055] p-1 lg:flex">
          {navItems.map((item) => {
            const active = activePage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`relative rounded-full px-4 py-2.5 text-sm font-black transition ${
                  active ? "text-slate-950" : "text-slate-300 hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 to-blue-300 shadow-lg shadow-cyan-950/20" />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="hidden min-w-[230px] items-center justify-end gap-3 lg:flex">
          <button
            onClick={onLaunchDemo}
            className="rounded-full border border-white/12 bg-white/[0.07] px-5 py-3 text-sm font-black text-white transition hover:border-cyan-300/40 hover:bg-white/[0.12]"
          >
            Watch Tour
          </button>
          <button
            onClick={onBookDemo}
            className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-950/30 transition hover:shadow-cyan-400/20"
          >
            Book Demo
          </button>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="rounded-2xl bg-white/10 p-3 text-white lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950/96 p-4 shadow-2xl shadow-slate-950/50 backdrop-blur-2xl lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`rounded-2xl px-4 py-3 text-left font-bold ${
                  activePage === item.page ? "bg-cyan-300 text-slate-950" : "bg-white/5 text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <PremiumButton onClick={onLaunchDemo} variant="glass">Watch Product Tour</PremiumButton>
            <PremiumButton onClick={onBookDemo}>Book Demo</PremiumButton>
          </div>
        </div>
      )}
    </header>
  );
}
