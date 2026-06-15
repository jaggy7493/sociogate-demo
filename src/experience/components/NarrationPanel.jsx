import React, { useEffect, useState } from "react";
import { Bot, Volume2, VolumeX } from "lucide-react";

export default function NarrationPanel({ scene }) {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (muted || typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(scene.narration);
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.volume = 0.9;
    window.speechSynthesis.speak(utterance);

    return () => window.speechSynthesis.cancel();
  }, [scene.id, scene.narration, muted]);

  return (
    <div className="mt-7 rounded-[2rem] border border-white/10 bg-slate-900/80 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Bot className="mt-1 text-cyan-300" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">AI Narration</p>
            <p className="mt-2 text-lg leading-8 text-slate-200">{scene.narration}</p>
          </div>
        </div>
        <button onClick={() => setMuted((v) => !v)} className="rounded-xl bg-white/10 p-2 hover:bg-white/15">
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}
