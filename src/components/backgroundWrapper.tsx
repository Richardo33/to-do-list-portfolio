"use client";

import { ReactNode } from "react";

export default function BackgroundWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#0a1d32] bg-[url('/bg.svg')] bg-no-repeat bg-cover bg-[60%_50%] bg-animate">
      {children}
    </main>
  );
}
