import Link from "next/link";

export const metadata = {
  title: "WGN — WorkGroup Navigation | To-Do & Kanban",
  description:
    "WGN (WorkGroup Navigation): a lightweight drag-and-drop to-do & kanban app for Work, Personal, and Urgent tasks.",
};

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0e2b4c] text-white">
      <BackgroundWaves />

      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#0e2b4c]/70">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 grid place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
              <span className="font-black">W</span>
            </div>
            <span className="font-semibold tracking-tight">
              WGN — WorkGroup Navigation
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-white/80 hover:text-white">
              Features
            </a>
            <a href="#how" className="text-white/80 hover:text-white">
              How It Works
            </a>
            <a href="#trust" className="text-white/80 hover:text-white">
              Trust & Safety
            </a>
            <Link
              href="/login"
              className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-white text-[#0e2b4c] px-4 py-2 text-sm font-semibold hover:bg-white/90"
            >
              Try Free
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pt-14 md:pt-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Organize your work & life with WGN
              <span className="block text-lg md:text-xl text-white/60 font-medium mt-2">
                WorkGroup Navigation
              </span>
            </h1>

            <p className="text-white/80 max-w-prose">
              A lightweight To‑Do & Kanban for{" "}
              <span className="font-semibold">Work, Personal, and Urgent</span>{" "}
              categories. Create tasks, label them, move across columns, and
              track progress without friction.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-xl bg-white text-[#0e2b4c] px-5 py-3 font-semibold hover:bg-white/90"
              >
                Get Started — Free
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-white/20 px-5 py-3 hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-2 text-xs text-white/70">
              <div className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                No ads
              </div>
              <div className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                Data-safe
              </div>
              <div className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                Free
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur p-5 md:p-6">
            <div className="flex items-center justify-between pb-3">
              <div className="font-semibold">Board Preview</div>
              <div className="text-xs text-white/60">
                To-Do / Doing / Done • Drag & drop
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <PreviewColumn title="To Do" accent="ring-emerald-300/40">
                <PreviewCard
                  label="Work"
                  title="Code"
                  desc="Implement Bookus task"
                />
              </PreviewColumn>
              <PreviewColumn title="Doing" accent="ring-blue-300/40">
                <PreviewCard
                  label="Personal"
                  title="Groceries"
                  desc="Vitamins & essentials"
                />
              </PreviewColumn>
              <PreviewColumn title="Done" accent="ring-indigo-300/40">
                <PreviewCard
                  label="Urgent"
                  title="Send docs"
                  desc="HR paperwork"
                />
              </PreviewColumn>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="relative z-10 mx-auto max-w-6xl px-4 py-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
        <p className="text-white/80 mt-2">Simple, fast, and focused.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10 transition"
            >
              <div className="mb-4" aria-hidden>
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-white/80 text-sm mt-2">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="relative z-10 mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur">
          <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                n: 1,
                t: "Sign up / Sign in",
                d: "Create an account or sign in to an existing one.",
              },
              {
                n: 2,
                t: "Add tasks",
                d: "Title, quick description, and label Work/Personal/Urgent.",
              },
              {
                n: 3,
                t: "Track progress",
                d: "Move tasks through To‑Do → Doing → Done.",
              },
            ].map((s) => (
              <li
                key={s.n}
                className="rounded-2xl bg-white/5 p-6 border border-white/10"
              >
                <div className="text-sm text-white/70">Step {s.n}</div>
                <div className="mt-2 font-semibold">{s.t}</div>
                <div className="text-white/80 text-sm mt-1">{s.d}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="trust"
        className="relative z-10 mx-auto max-w-6xl px-4 pb-24"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {trust.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="mb-3" aria-hidden>
                {t.icon}
              </div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-white/80 text-sm mt-1">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-black/10">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="font-semibold">WGN — WorkGroup Navigation</div>
            <p className="text-white/70 text-sm max-w-prose">
              A minimalist to‑do & kanban app. Create, organize, and complete
              tasks peacefully.
            </p>
          </div>
          <div className="md:text-right text-sm text-white/70 flex md:justify-end items-center gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-8 text-xs text-white/50">
          © {new Date().getFullYear()} WGN. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function PreviewColumn({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl bg-white/5 p-4 border border-white/10 ring-1 ${accent}`}
    >
      <div className="font-semibold mb-3">{title}</div>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}

function PreviewCard({
  label,
  title,
  desc,
}: {
  label: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl bg-black/20 p-4 border border-white/10 shadow">
      <div className="text-xs inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-white/80 ring-1 ring-white/15">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
        {label}
      </div>
      <div className="mt-3 font-semibold">{title}</div>
      <div className="text-white/70 text-sm">{desc}</div>
    </div>
  );
}

function BackgroundWaves() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <svg
        className="absolute -top-40 left-0 w-[140%] opacity-30"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="url(#g1)"
          d="M0,64L48,69.3C96,75,192,85,288,90.7C384,96,480,96,576,128C672,160,768,224,864,224C960,224,1056,160,1152,149.3C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#12395f" />
            <stop offset="100%" stopColor="#0e2b4c" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-[140%] opacity-40"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="url(#g2)"
          d="M0,288L60,272C120,256,240,224,360,224C480,224,600,256,720,234.7C840,213,960,139,1080,106.7C1200,75,1320,85,1380,90.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
        <defs>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#165086" />
            <stop offset="100%" stopColor="#0e2b4c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const features = [
  {
    title: "Three-column Kanban",
    desc: "To-Do, Doing, Done — move tasks as you progress.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        <rect
          x="3"
          y="3"
          width="6"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="10"
          y="3"
          width="4"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="16"
          y="3"
          width="5"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Labels & filters",
    desc: "Group tasks by Work, Personal, and Urgent.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        <path
          d="M3 7h18M3 12h12M3 17h6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Fast & lightweight",
    desc: "No bloat. Focus on shipping work.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        <path
          d="M21 12a9 9 0 1 1-18 0"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M12 3v9l5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Free forever",
    desc: "Basic plan is free for personal use.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        <path
          d="M3 6h18M3 12h18M3 18h18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Comfortable dark UI",
    desc: "Consistent deep-blue theme like your app.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
];

const trust = [
  {
    title: "Clear identity",
    desc: "Brand, description, and contact are visible on the front page.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        <path
          d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M3 22a9 9 0 0 1 18 0"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Separate login",
    desc: "Credential forms only on /login with robots noindex.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        <path
          d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M12 10v4M10 12h4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Security headers",
    desc: "Ready for HSTS, CSP, and basic privacy/terms.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        <path
          d="M12 2 3 7v6c0 5 4.03 7.74 9 9 4.97-1.26 9-4 9-9V7l-9-5Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M9 12h6M9 15h6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];
