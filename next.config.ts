import type { NextConfig } from "next";

const dev = process.env.NODE_ENV !== "production";

// Build a CSP that works with Next.js (dev & prod)
const csp = [
  "default-src 'self'",
  // Next.js dev needs 'unsafe-eval' and inline runtime; prod can drop 'unsafe-eval'
  `script-src 'self' ${
    dev ? "'unsafe-eval' 'unsafe-inline'" : "'unsafe-inline'"
  } blob:`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  // Allow API/auth to Supabase + dev websockets
  "connect-src 'self' https://lnqvxubshhweawgvtbcf.supabase.co https://lnqvxubshhweawgvtbcf.supabase.co/auth/v1 https://*.supabase.co ws://localhost:* wss://*.supabase.co",
  "font-src 'self' data: https:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lnqvxubshhweawgvtbcf.supabase.co",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(login|register)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=15552000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
