import React, { useState } from "react";
import PremiumButton from "../PremiumButton";
import ResidentPhone from "./ResidentPhone";
import FeatureGrid from "./FeatureGrid";
import ResidentStats from "./ResidentStats";
import FeatureModal from "../ProductModals/FeatureModal";

export default function ResidentShowcase({ onLaunchDemo }) {
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <section className="relative pb-20 pt-4">
      <div className="rounded-[2.75rem] border border-cyan-300/15 bg-gradient-to-br from-blue-600/12 to-cyan-400/8 p-6 md:p-9">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Resident Experience</p>
            <h2 className="mt-4 text-5xl font-black leading-tight text-white sm:text-6xl">Everything your residents need in one beautiful app.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Residents can approve visitors, pay bills, read notices, vote in polls, raise complaints, generate passes and trigger SOS from a premium mobile experience.
            </p>

            <FeatureGrid />

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <PremiumButton onClick={onLaunchDemo}>Launch Resident Experience</PremiumButton>
              <button onClick={() => setFeaturesOpen(true)} className="min-h-[56px] rounded-full border border-white/10 bg-white/[0.07] px-6 py-4 font-black text-white transition hover:border-cyan-300/40 hover:bg-white/[0.12] active:scale-[0.98]">
                View Resident Features
              </button>
            </div>
          </div>

          <div>
            <ResidentPhone />
            <ResidentStats />
          </div>
        </div>
      </div>

      <FeatureModal
        open={featuresOpen}
        onClose={() => setFeaturesOpen(false)}
        onLaunchDemo={onLaunchDemo}
        title="Resident Features"
        subtitle="Everything a resident needs for daily society life, approvals, communication and safety."
        features={["Visitor Approval", "Digital Pass", "Maintenance Bills", "Society Notices", "Community Polls", "Complaints", "SOS Protection", "Visitor History"]}
      />
    </section>
  );
}
