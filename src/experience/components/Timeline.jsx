import React from "react";

export default function Timeline({ scenes, index }) {
  return (
    <div className="hidden lg:flex flex-col gap-2">
      {scenes.map((scene, i) => {
        const Icon = scene.icon;
        return (
          <div
            key={scene.id}
            className={`flex items-center gap-3 rounded-2xl border px-3 py-2 text-xs transition ${
              i === index
                ? "border-cyan-400 bg-cyan-400/10 text-white"
                : i < index
                ? "border-emerald-400/25 bg-emerald-400/5 text-emerald-100"
                : "border-white/10 bg-white/5 text-slate-400"
            }`}
          >
            <Icon size={15} />
            <span className="font-bold">{scene.title}</span>
          </div>
        );
      })}
    </div>
  );
}
