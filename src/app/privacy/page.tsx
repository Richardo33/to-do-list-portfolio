"use client";

import BackgroundWrapper from "@/components/backgroundWrapper";
import Link from "next/link";

export default function Page() {
  return (
    <BackgroundWrapper>
      <div className="min-h-screen text-white px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-white/70 mb-8">
          Last updated: {new Date().toISOString().slice(0, 10)}
        </p>

        <h2 className="text-xl font-semibold mt-8">
          1. Information We Collect
        </h2>
        <p className="text-white/80 mt-2">
          We collect account information (name, email) and task data you create
          in the app.
        </p>

        <h2 className="text-xl font-semibold mt-8">
          2. How We Use Information
        </h2>
        <p className="text-white/80 mt-2">
          To provide the service, secure your account, improve features, and
          communicate important updates.
        </p>

        <h2 className="text-xl font-semibold mt-8">3. Storage & Security</h2>
        <p className="text-white/80 mt-2">
          Data is stored in our cloud database. We apply encryption in transit
          (HTTPS) and role-based access.
        </p>

        <h2 className="text-xl font-semibold mt-8">4. Your Rights</h2>
        <p className="text-white/80 mt-2">
          You can request data export or deletion by contacting us.
        </p>

        <h2 className="text-xl font-semibold mt-8">5. Contact</h2>
        <p className="text-white/80 mt-2">
          Email:{" "}
          <a className="underline" href="mailto:hello@richardoo.cyou">
            hello@richardoo.cyou
          </a>
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
