import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2 } from "lucide-react";

const notifications = [
  "Visitor Rahul approved",
  "Maintenance bill paid",
  "Water notice read",
  "Poll vote submitted",
  "Complaint updated",
  "SOS monitoring active",
];

export default function NotificationTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((value) => (value + 1) % notifications.length), 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto mt-6 max-w-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={notifications[index]}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.96 }}
          transition={{ duration: 0.32 }}
          className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-white shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300/12 text-cyan-300">
            <Bell size={17} />
          </div>
          <p className="flex-1 text-sm font-black">{notifications[index]}</p>
          <CheckCircle2 className="text-emerald-300" size={18} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
