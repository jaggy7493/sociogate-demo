import React, { useEffect, useRef, useState } from "react";
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
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 18);

      if (!open) {
        if (currentY > lastY.current && currentY > 160) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }

      lastY.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const goTo = (id) => {
    setOpen(false);
    setHidden(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-4 pt-4 transition-transform duration-300 ${
        hidden ? "-translate-y-28" : "translate-y-0"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition ${
          scrolled
            ? "border-white/12 bg-slate-950/88 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl"
            : "border-white/8 bg-slate-950/58 backdrop-blur-xl"
        }`}
      >
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-cyan-950/30">
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="text-lg font-black leading-none text-white">SocioGate AI</p>
            <p className="mt-1 hidden text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200 sm:block">Smart Living Begins at the Gate</p>
          </div>
        </button>

        <nav className="hidden rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 lg:flex">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => goTo(item.id)} className="rounded-full px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/8 hover:text-white">
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button onClick={onLaunchDemo} className="rounded-full border border-white/12 bg-white/[0.07] px-5 py-3 text-sm font-black text-white transition hover:border-cyan-300/40 hover:bg-white/[0.12]">
            Watch Tour
          </button>
          <button onClick={onBookDemo} className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-950/30">
            Book Demo
          </button>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="rounded-full bg-white/10 p-3 text-white lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-4 backdrop-blur-2xl lg:hidden">
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
