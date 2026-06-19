import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import PremiumButton from "../PremiumButton";

export default function FeatureModal({ open, title, subtitle, features = [], onClose, onLaunchDemo }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-black/76 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="feature-modal-scroll relative w-[92vw] max-w-[900px] overflow-x-hidden overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/80"
            style={{
              maxHeight: "82vh",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <style>{`
              .feature-modal-scroll::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">Feature Details</p>
                <h3 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">{title}</h3>
                {subtitle && <p className="mt-2 max-w-2xl leading-7 text-slate-300">{subtitle}</p>}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3">
                  <CheckCircle2 className="shrink-0 text-emerald-300" size={18} />
                  <span className="font-bold text-slate-200">{feature}</span>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 -mx-5 mt-5 flex flex-col justify-end gap-3 border-t border-white/10 bg-slate-950/96 px-5 pt-4 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[50px] rounded-full border border-white/10 bg-white/[0.07] px-6 py-3 font-black text-white transition hover:bg-white/[0.12] active:scale-[0.98]"
              >
                Close
              </button>
              <PremiumButton onClick={onLaunchDemo}>Launch Demo</PremiumButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
