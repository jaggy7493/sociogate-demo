import React, { useState } from "react";
import WebsiteHome from "./website/pages/Home";
import ExperienceCenter from "./experience/ExperienceCenter";

export default function App() {
  const [screen, setScreen] = useState("website");
  if (screen === "experience") {
    return <ExperienceCenter onEnterProduct={() => setScreen("website")} />;
  }
  return <WebsiteHome onLaunchDemo={() => setScreen("experience")} onBookDemo={() => { window.location.href = "mailto:hello@sociogate.in?subject=Book%20SocioGate%20Demo"; }} />;
}
