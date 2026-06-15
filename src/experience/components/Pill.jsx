import React from "react";

export default function Pill({ children }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-cyan-50">
      {children}
    </span>
  );
}
