import React from "react";

const stats = [["5 sec", "Average check-in"], ["99%", "Verification accuracy"], ["24×7", "Gate monitoring"]];

export default function GuardStats() {
  return (
    <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
      {stats.map(([value, label]) => (
        <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 text-center">
          <p className="text-2xl font-black text-white">{value}</p>
          <p className="mt-1 text-xs font-bold text-slate-400">{label}</p>
        </div>
      ))}
    </div>
  );
}
