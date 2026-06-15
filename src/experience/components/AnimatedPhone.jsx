import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import CameraFlash from "./CameraFlash";
import SecurityAlarm from "./SecurityAlarm";
import GateBarrier from "./GateBarrier";
import MovingVehicle from "./MovingVehicle";
import ResidentNotification from "./ResidentNotification";
import { phoneMotion } from "../styles/animations";

export default function AnimatedPhone({ scene }) {
  const Icon = scene.icon;

  return (
    <div className="relative">
      <CameraFlash active={scene.id === "ai-scan"} />
      <SecurityAlarm active={scene.danger} label={scene.id === "vehicle" ? "WATCHLIST VEHICLE" : scene.id === "sos" ? "SOS ACTIVE" : "SECURITY ALERT"} />
      {/* Glow only. No label here, because the old spotlight label was covering the phone header on every slide. */}
      <div className="pointer-events-none absolute -inset-4 z-0">
        <motion.div
          className={`absolute inset-0 rounded-[2.8rem] ${scene.danger ? "bg-red-500/22" : "bg-cyan-400/18"} blur-2xl`}
          animate={{ opacity: [0.35, 0.85, 0.35], scale: [0.98, 1.03, 0.98] }}
          transition={{ repeat: Infinity, duration: scene.danger ? 0.85 : 2.2 }}
        />
      </div>

      <motion.div
        key={scene.id}
        {...phoneMotion}
        className="relative z-10 mx-auto w-full max-w-[330px] rounded-[2.4rem] bg-slate-950 p-2 shadow-2xl"
      >
        <div className="overflow-hidden rounded-[2rem] bg-slate-100">
          {/* Safe device top area. Content starts below this, so no text can hide behind notch/status bar. */}
          <div className="relative h-14 bg-slate-950">
            <div className="absolute left-1/2 top-4 h-2 w-20 -translate-x-1/2 rounded-full bg-slate-700" />
            <div className="absolute right-5 top-4 flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
            </div>
          </div>

          <div className={`relative overflow-hidden bg-gradient-to-br ${scene.tone} p-5 pt-5 text-white`}>
            {/* Header card is now fully below notch. */}
            <div className="rounded-2xl bg-black/28 p-3 backdrop-blur-md border border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-black uppercase tracking-wider text-white leading-none">
                    {scene.panel}
                  </p>
                  <p className="mt-1 truncate text-[10px] text-white/70">Live scene preview</p>
                </div>

                <motion.div
                  className="shrink-0 rounded-xl bg-white/14 p-2"
                  animate={scene.danger ? { rotate: [-10, 10, -10] } : { y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: scene.danger ? 0.28 : 1.4 }}
                >
                  <Bell size={16} />
                </motion.div>
              </div>
            </div>

            <div className="mt-5 flex h-48 items-center justify-center rounded-[1.5rem] bg-black/24 shadow-inner">
              <motion.div
                animate={{
                  scale: scene.danger ? [1, 1.14, 1] : [1, 1.05, 1],
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{ repeat: Infinity, duration: scene.danger ? 0.75 : 1.8 }}
                className="px-3 text-center"
              >
                <Icon className="mx-auto" size={72} />
                <p className="mt-4 text-xl font-black leading-tight text-white drop-shadow">
                  {scene.status}
                </p>
              </motion.div>
            </div>
            {scene.id === "resident-approval" && <ResidentNotification active approved={false} />}
            {scene.id === "access-granted" && <ResidentNotification active approved />}
            {scene.id === "access-granted" && <GateBarrier mode="open" />}
            {scene.id === "blacklist" && <GateBarrier mode="blocked" />}
            {scene.id === "vehicle" && <MovingVehicle danger />}
            {scene.id === "sos" && <div className="absolute bottom-5 left-5 right-5 z-20 rounded-3xl border border-red-300/30 bg-red-950/75 p-4 text-center text-sm font-black text-red-100 shadow-2xl shadow-red-950/40">Emergency response dispatched to A-1204</div>}
          </div>

          <div className="grid grid-cols-2 gap-3 p-4">
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <p className="text-xs text-slate-400">{scene.metric1}</p>
              <b className="text-slate-950">{scene.value1}</b>
            </div>
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <p className="text-xs text-slate-400">{scene.metric2}</p>
              <b className={scene.danger ? "text-red-600" : "text-emerald-600"}>{scene.value2}</b>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
