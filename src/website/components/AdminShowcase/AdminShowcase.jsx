import React, { useState } from "react";
import PremiumButton from "../PremiumButton";
import FeatureModal from "../ProductModals/FeatureModal";
import AdminDashboard from "./AdminDashboard";
import AdminFeatureGrid from "./AdminFeatureGrid";
import AdminStats from "./AdminStats";

export default function AdminShowcase({ onLaunchDemo }) {
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <section className="relative pb-20 pt-4">
      <div className="rounded-[2.75rem] border border-indigo-300/15 bg-gradient-to-br from-slate-900/70 via-indigo-950/25 to-cyan-400/8 p-6 md:p-9">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Admin ERP Experience</p>
            <h2 className="mt-4 text-5xl font-black leading-tight text-white sm:text-6xl">
              Complete society operations from one command center.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Track billing, complaints, visitors, staff activity, reports and AI alerts from a premium ERP dashboard built for RWAs, builders and society administrators.
            </p>

            <AdminFeatureGrid />

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <PremiumButton onClick={onLaunchDemo}>Experience Admin ERP</PremiumButton>
              <button
                onClick={() => setFeaturesOpen(true)}
                className="min-h-[56px] rounded-full border border-white/10 bg-white/[0.07] px-6 py-4 font-black text-white transition hover:border-cyan-300/40 hover:bg-white/[0.12] active:scale-[0.98]"
              >
                View Admin Features
              </button>
            </div>
          </div>

          <div>
            <AdminDashboard />
            <AdminStats />
          </div>
        </div>
      </div>

      <FeatureModal
        open={featuresOpen}
        onClose={() => setFeaturesOpen(false)}
        onLaunchDemo={onLaunchDemo}
        title="Admin ERP Features"
        subtitle="A complete management layer for billing, operations, reports and society administration."
        features={[
          "Billing Dashboard",
          "Collection Reports",
          "Complaint Management",
          "Visitor Analytics",
          "Notice Management",
          "Staff Activity",
          "Society Settings",
          "AI Reports",
        ]}
      />
    </section>
  );
}
