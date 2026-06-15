import React, { useEffect, useState } from "react";

export default function AnimatedCounter({ value = 0, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    setDisplay(0);
    const steps = 28;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setDisplay(Math.round((target * current) / steps));
      if (current >= steps) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [value]);

  return <span>{prefix}{display.toLocaleString("en-IN")}{suffix}</span>;
}
