import React from "react";
import PremiumButton from "../PremiumButton";
import ResidentPhone from "./ResidentPhone";
import FeatureGrid from "./FeatureGrid";
import ResidentStats from "./ResidentStats";

export default function ResidentShowcase({ onLaunchDemo }) {
  return (
    <section className="relative pb-20 pt-4">
      <div className="rounded-[2.75rem] border border-cyan-300/15 bg-gradient-to-br from-blue-600/12 to-cyan-400/8 p-6 md:p-9">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Resident Experience</p>
            <h2 className="mt-4 text-5xl font-black leading-tight text-white sm:text-6xl">
              Everything your residents need in one beautiful app.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Residents can approve visitors, pay bills, read notices, vote in polls, raise complaints, generate passes and trigger SOS from a premium mobile experience.
            </p>

            <FeatureGrid />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PremiumButton onClick={onLaunchDemo}>Launch Resident Experience</PremiumButton>
              <button className="rounded-full border border-white/10 bg-white/[0.07] px-6 py-4 font-black text-white transition hover:bg-white/[0.12]">
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
    </section>
  );
}
