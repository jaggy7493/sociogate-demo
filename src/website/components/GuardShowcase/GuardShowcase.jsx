import React, { useState } from "react";
import PremiumButton from "../PremiumButton";
import GuardPhone from "./GuardPhone";
import GuardFeatureGrid from "./GuardFeatureGrid";
import GuardStats from "./GuardStats";
import FeatureModal from "../ProductModals/FeatureModal";

export default function GuardShowcase({ onLaunchDemo }) {
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <section className="relative pb-20 pt-4">
      <div className="rounded-[2.75rem] border border-blue-300/15 bg-gradient-to-br from-slate-800/55 via-blue-950/22 to-cyan-400/8 p-6 md:p-9">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <GuardPhone />
            <GuardStats />
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Guard Experience</p>
            <h2 className="mt-4 text-5xl font-black leading-tight text-white sm:text-6xl">Fast. Secure. Intelligent gate operations.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Built for security staff to verify visitors, scan QR passes, manage vehicles, handle deliveries and respond to emergencies in seconds.
            </p>

            <GuardFeatureGrid />

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <PremiumButton onClick={onLaunchDemo}>Experience Guard App</PremiumButton>
              <button onClick={() => setFeaturesOpen(true)} className="min-h-[56px] rounded-full border border-white/10 bg-white/[0.07] px-6 py-4 font-black text-white transition hover:border-cyan-300/40 hover:bg-white/[0.12] active:scale-[0.98]">
                View Guard Features
              </button>
            </div>
          </div>
        </div>
      </div>

      <FeatureModal
        open={featuresOpen}
        onClose={() => setFeaturesOpen(false)}
        onLaunchDemo={onLaunchDemo}
        title="Guard Features"
        subtitle="Built for faster, safer and more controlled gate operations."
        features={["Visitor Entry", "QR Verification", "Vehicle Intelligence", "Delivery Entry", "Blacklist Detection", "Emergency Response", "Visitor Logs", "Gate Activity"]}
      />
    </section>
  );
}
