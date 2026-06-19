import React from "react";
import { motion } from "framer-motion";

export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="px-5 pb-4 pt-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[2.8rem] border border-cyan-300/15 bg-white/[0.055] p-8 shadow-2xl shadow-slate-950/30"
        >
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-tight text-white sm:text-6xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{subtitle}</p>}
          {children && <div className="mt-7">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
