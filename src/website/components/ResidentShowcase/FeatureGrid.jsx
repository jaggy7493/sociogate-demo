import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Visitor Approval",
  "Maintenance Bills",
  "Society Notices",
  "Community Polls",
  "Complaints",
  "SOS Protection",
  "Digital Passes",
  "Visitor History",
];

export default function FeatureGrid() {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {features.map((item, index) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.035 }}
          whileHover={{ y: -4 }}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4"
        >
          <CheckCircle2 className="shrink-0 text-emerald-300" size={18} />
          <span className="font-bold text-slate-200">{item}</span>
        </motion.div>
      ))}
    </div>
  );
}
