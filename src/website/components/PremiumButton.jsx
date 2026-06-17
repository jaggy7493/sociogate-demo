import React from "react";
import { ArrowRight } from "lucide-react";

export default function PremiumButton({ children, onClick, variant = "primary", icon: Icon, className = "" }) {
  const base =
    "group relative inline-flex min-h-[56px] items-center justify-center overflow-hidden rounded-full px-7 py-4 text-sm font-black tracking-tight transition active:scale-[0.98]";

  const styles = {
    primary:
      "bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 text-white shadow-2xl shadow-cyan-950/30 hover:shadow-cyan-500/25",
    glass:
      "border border-white/15 bg-white/[0.08] text-white backdrop-blur-xl hover:bg-white/[0.13] hover:border-cyan-300/30",
    dark:
      "border border-white/10 bg-slate-950/70 text-white backdrop-blur-xl hover:bg-slate-900",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center justify-center gap-2 leading-none text-center">
        {Icon && <Icon size={18} />}
        {children}
        <ArrowRight className="transition group-hover:translate-x-1" size={17} />
      </span>
    </button>
  );
}
