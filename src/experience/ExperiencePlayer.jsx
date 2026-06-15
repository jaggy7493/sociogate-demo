import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, RotateCcw, ShieldCheck, X } from "lucide-react";
import { demoScenes } from "./data/demoScenes";
import { useExperienceEngine } from "./hooks/useExperienceEngine";
import FloatingBackground from "./components/FloatingBackground";
import Timeline from "./components/Timeline";
import AnimatedPhone from "./components/AnimatedPhone";
import NarrationPanel from "./components/NarrationPanel";
import Pill from "./components/Pill";
import HeroFinish from "./components/HeroFinish";
import StatusRail from "./components/StatusRail";
import AnimatedCounter from "./components/AnimatedCounter";
import Spotlight from "./components/Spotlight";
import { cinematicPanel, fadeUp } from "./styles/animations";

export default function ExperiencePlayer({ onExit }) {
  const engine = useExperienceEngine(demoScenes);
  const { scene, index, progress, playing, isFirst, isLast, back, next, restart, togglePlay } = engine;
  const Icon = scene.icon;

  if (isLast) {
    return <HeroFinish onExit={onExit} onRestart={restart} />;
  }

  return (
    <div className={`relative min-h-screen overflow-hidden bg-slate-950 text-white ${scene.danger ? "animate-pulse" : ""}`}>
      <FloatingBackground />

      <div className="relative mx-auto min-h-screen max-w-7xl px-4 py-5 sm:px-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400">
              <ShieldCheck />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">SocioGate Experience 4.2A</p>
              <h1 className="text-lg font-black">Visual Foundation</h1>
            </div>
          </div>

          <button onClick={onExit} className="rounded-2xl bg-white/10 p-3 hover:bg-white/15">
            <X size={20} />
          </button>
        </header>

        <div className="mt-5">
          <StatusRail />
        </div>

        <div className="mt-6 rounded-full bg-white/10 p-1">
          <motion.div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" animate={{ width: `${progress}%` }} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
          <Timeline scenes={demoScenes} index={index} />

          <motion.div
            key={scene.id}
            {...cinematicPanel}
            className="relative grid min-h-[calc(100vh-13rem)] gap-7 rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl lg:grid-cols-[1fr_390px] lg:p-8"
          >
            <Spotlight danger={scene.danger} label={scene.focus || scene.panel} />

            <div className="relative z-10 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div key={scene.id} {...fadeUp}>
                  <div className={`inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br ${scene.tone} shadow-2xl`}>
                    <Icon size={42} />
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Step {index + 1} of {demoScenes.length}</p>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-cyan-100">
                      {(scene.duration / 1000).toFixed(1)} sec
                    </span>
                  </div>

                  <h2 className="mt-3 max-w-3xl text-5xl font-black leading-tight sm:text-6xl">{scene.title}</h2>
                  <p className="mt-5 max-w-2xl text-xl text-cyan-100">{scene.subtitle}</p>

                  <div className="mt-6 grid max-w-xl grid-cols-2 gap-3">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{scene.statLabel || "Live Metric"}</p>
                      <p className="mt-2 text-3xl font-black text-white">
                        <AnimatedCounter value={scene.statValue || 100} prefix={scene.statPrefix || ""} suffix={scene.statSuffix || "%"} />
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Focus Area</p>
                      <p className={scene.danger ? "mt-2 text-2xl font-black text-red-300" : "mt-2 text-2xl font-black text-cyan-200"}>{scene.focus || scene.panel}</p>
                    </div>
                  </div>

                  <NarrationPanel scene={scene} />

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Pill>Spotlight Active</Pill>
                    <Pill>ERP Synced</Pill>
                    <Pill>Client Story Mode</Pill>
                  </div>

                  {playing && scene.duration > 0 && (
                    <div className="mt-5 rounded-full bg-white/10 p-1">
                      <motion.div
                        key={`timer-${scene.id}`}
                        className="h-1.5 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: scene.duration / 1000, ease: "linear" }}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={back} disabled={isFirst} className="rounded-2xl bg-white/10 px-5 py-3 font-bold disabled:opacity-40">Back</button>
                <button onClick={togglePlay} className="rounded-2xl bg-white/10 px-5 py-3 font-bold">
                  {playing ? <Pause className="inline" size={18} /> : <Play className="inline" size={18} />} {playing ? "Pause" : "Play"}
                </button>
                <button onClick={next} className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-black">Next</button>
                <button onClick={restart} className="rounded-2xl bg-white/10 px-5 py-3 font-bold">
                  <RotateCcw className="inline" size={18} /> Restart
                </button>
              </div>
            </div>

            <div className="relative z-10 flex items-center">
              <AnimatePresence mode="wait">
                <AnimatedPhone key={scene.id} scene={scene} />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
