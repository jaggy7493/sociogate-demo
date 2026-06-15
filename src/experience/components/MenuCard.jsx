import React from "react";
import { ArrowRight } from "lucide-react";

export default function MenuCard({ Icon, title, subtitle, onClick, tone }) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${tone} p-5 text-left text-white shadow-xl transition hover:-translate-y-1 active:scale-[0.98]`}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 transition group-hover:scale-125" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <Icon size={25} />
          </div>
          <ArrowRight className="opacity-70 transition group-hover:translate-x-1" size={20} />
        </div>
        <h3 className="mt-5 text-xl font-black">{title}</h3>
        <p className="mt-2 text-sm text-white/80">{subtitle}</p>
      </div>
    </button>
  );
}
