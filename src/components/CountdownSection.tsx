"use client";

import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-09-19T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownSection() {
  const [tl, setTl] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTl(calcTimeLeft());
    const id = setInterval(() => setTl(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!tl) {
    return (
      <section className="py-12 text-center">
        <p className="text-[#8B7355] text-sm">Loading countdown…</p>
      </section>
    );
  }

  const blocks: { label: string; value: number }[] = [
    { label: "Days", value: tl.days },
    { label: "Hours", value: tl.hours },
    { label: "Minutes", value: tl.minutes },
    { label: "Seconds", value: tl.seconds },
  ];

  return (
    <section className="py-12 text-center">
      <p className="text-xs tracking-[0.3em] text-[#C4956A] uppercase mb-5">
        Counting Down To Our Big Day
      </p>
      <div className="flex justify-center gap-3 sm:gap-5">
        {blocks.map((b) => (
          <div
            key={b.label}
            className="flex flex-col items-center rounded-xl bg-white/70 shadow-sm
                       backdrop-blur px-4 py-4 w-20 sm:w-24 border border-[#E8DDD0]/60"
          >
            <span className="font-serif text-2xl sm:text-3xl text-[#3D3027]">
              {String(b.value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[#8B7355]">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
