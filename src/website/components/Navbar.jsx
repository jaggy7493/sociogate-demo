import React, { useEffect, useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";
import PremiumButton from "./PremiumButton";

const navItems = [
  { label: "Products", id: "products" },
  { label: "AI Engine", id: "ai" },
  { label: "Pricing", id: "pricing" },
  { label: "Company", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({ onLaunchDemo, onBookDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 transition-all duration-300 ${
          scrolled
            ? "border-white/12 bg-slate-950/90 py-2 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl"
            : "border-white/10 bg-slate-950/62 py-3 backdrop-blur-xl"
        }`}
      >
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 text-left">
          <div
            className={`flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-cyan-950/30 transition-all ${
              scrolled ? "h-10 w-10" : "h-11 w-11"
            }`}
          >
            <ShieldCheck size={scrolled ? 20 : 22} />
          </div>
          <div>
            <p className="text-lg font-black leading-none text-white">SocioGate AI</p>
            {!scrolled && (
              <p className="mt-1 hidden text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200 sm:block">
                Smart Living Begins at the Gate
              </p>
            )}
          </div>
        </button>

        <nav className="hidden rounded-full border border-white/10 bg-slate-950/42 px-2 py-1.5 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className="rounded-full px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={onLaunchDemo}
            className="rounded-full border border-white/12 bg-white/[0.07] px-5 py-2.5 text-sm font-black text-white transition hover:border-cyan-300/40 hover:bg-white/[0.12]"
          >
            Watch Tour
          </button>
          <button
            onClick={onBookDemo}
            className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-cyan-950/30"
          >
            Book Demo
          </button>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="rounded-full bg-white/10 p-3 text-white lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950/96 p-4 shadow-2xl shadow-slate-950/50 backdrop-blur-2xl lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => goTo(item.id)} className="rounded-2xl bg-white/5 px-4 py-3 text-left font-bold text-white">
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
