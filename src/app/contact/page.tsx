"use client";

import BackgroundWrapper from "@/components/backgroundWrapper";
import Link from "next/link";

export default function Page() {
  return (
    <BackgroundWrapper>
      <div className="min-h-screen text-white px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p className="text-white/80 mt-2">
          For support or requests, reach us at{" "}
          <a className="underline" href="mailto:hello@richardoo.cyou">
            hello@richardoo.cyou
          </a>
          .
        </p>

        <div className="mt-8 grid gap-3">
          <a
            href="mailto:hello@richardoo.cyou"
            className="rounded-xl bg-white text-[#0e2b4c] px-4 py-2 font-semibold hover:bg-white/90 inline-block"
          >
            Email us
          </a>
          <Link
            href="/"
            className="inline-block rounded-xl border border-white/20 px-4 py-2 hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </BackgroundWrapper>
  );
}
