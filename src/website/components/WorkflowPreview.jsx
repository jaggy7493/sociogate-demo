import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function WorkflowPreview({ steps = [] }) {
  return (
    <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
      <div className="grid gap-3">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0.35, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-300/12 text-cyan-300">
              <CheckCircle2 size={15} />
            </div>
            <span className="text-sm font-bold text-slate-300">{step}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
