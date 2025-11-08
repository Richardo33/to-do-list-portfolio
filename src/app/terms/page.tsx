"use client";

import BackgroundWrapper from "@/components/backgroundWrapper";
import Link from "next/link";

export default function Page() {
  return (
    <BackgroundWrapper>
      <div className="min-h-screen text-white px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-white/70 mb-8">
          Last updated: {new Date().toISOString().slice(0, 10)}
        </p>

        <h2 className="text-xl font-semibold mt-8">1. Using WGN</h2>
        <p className="text-white/80 mt-2">
          Use the app lawfully and do not abuse or attempt to disrupt the
          service.
        </p>

        <h2 className="text-xl font-semibold mt-8">2. Accounts</h2>
        <p className="text-white/80 mt-2">
          You are responsible for safeguarding your credentials and the content
          you create.
        </p>

        <h2 className="text-xl font-semibold mt-8">3. Content</h2>
        <p className="text-white/80 mt-2">
          You own your task content; you grant us permission to process it to
          operate the service.
        </p>

        <h2 className="text-xl font-semibold mt-8">4. Liability</h2>
        <p className="text-white/80 mt-2">
          Service is provided “as is” without warranties; we are not liable for
          indirect damages.
        </p>

        <h2 className="text-xl font-semibold mt-8">5. Changes</h2>
        <p className="text-white/80 mt-2">
          We may update these terms; we’ll notify users for material changes.
        </p>

        <div className="mt-10">
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
