"use client";

import { useEffect, useState } from "react";

// Renders the final number on the server, then counts up once on the client.
export default function CountUp({ to }: { to: number }) {
  const [n, setN] = useState(to);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let start: number | null = null;
    const delay = 900;
    const duration = 900;
    setN(0);
    const tick = (t: number) => {
      if (start === null) start = t;
      const k = Math.min(Math.max((t - start - delay) / duration, 0), 1);
      setN(Math.round(to * k));
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to]);

  return <span>{n}</span>;
}
