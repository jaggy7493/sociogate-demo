import React, { useState } from "react";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import PageShell from "../components/PageShell";
import PremiumButton from "../components/PremiumButton";

export default function ContactPage({ onNavigate, onLaunchDemo, onBookDemo }) {
  const [society, setSociety] = useState("Green Meadows Society");
  const [flats, setFlats] = useState("250");
  const [city, setCity] = useState("Noida");

  const sendMail = () => {
    const subject = encodeURIComponent("Book SocioGate Demo");
    const body = encodeURIComponent(`Hi SocioGate Team,\n\nI want to book a demo.\n\nSociety: ${society}\nFlats: ${flats}\nCity: ${city}\n\nRegards`);
    window.location.href = `mailto:hello@sociogate.in?subject=${subject}&body=${body}`;
  };

  return (
    <PageShell activePage="contact" onNavigate={onNavigate} onLaunchDemo={onLaunchDemo} onBookDemo={onBookDemo}>
      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Contact</p>
            <h1 className="mt-4 text-6xl font-black leading-tight text-white">Book a live SocioGate demo.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Share your society details and we’ll prepare a tailored walkthrough with pricing, ROI and product demo.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                [Mail, "Email", "hello@sociogate.in"],
                [Phone, "Phone", "Add your sales number later"],
                [MessageCircle, "WhatsApp", "Add WhatsApp CTA later"],
              ].map(([Icon, title, text]) => (
                <div key={title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5">
                  <Icon className="text-cyan-300" />
                  <p className="mt-3 font-black text-white">{title}</p>
                  <p className="mt-1 text-sm text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-cyan-300/20 bg-white/[0.06] p-7">
            <h2 className="text-3xl font-black text-white">Demo Request</h2>
            <p className="mt-2 text-slate-400">This opens your email with pre-filled details.</p>

            <div className="mt-6 grid gap-4">
              <label>
                <span className="text-sm font-bold text-slate-300">Society Name</span>
                <input value={society} onChange={(e) => setSociety(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 font-bold text-white outline-none focus:border-cyan-300" />
              </label>
              <label>
                <span className="text-sm font-bold text-slate-300">Number of Flats</span>
                <input value={flats} onChange={(e) => setFlats(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 font-bold text-white outline-none focus:border-cyan-300" />
              </label>
              <label>
                <span className="text-sm font-bold text-slate-300">City</span>
                <input value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 font-bold text-white outline-none focus:border-cyan-300" />
              </label>
              <PremiumButton onClick={sendMail} icon={Send}>Send Demo Request</PremiumButton>
              <PremiumButton onClick={onLaunchDemo} variant="glass">Watch Product Tour First</PremiumButton>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
