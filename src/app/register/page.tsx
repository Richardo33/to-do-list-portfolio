"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import BackgroundWrapper from "@/components/backgroundWrapper";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    setLoading(false);
    if (error) return setErrorMsg(error.message);
    router.push("/tasks");
  };

  return (
    <BackgroundWrapper>
      <div className="min-h-screen grid place-items-center px-6">
        <div className="relative z-10 w-full max-w-md bg-[rgb(0_0_0_/16%)] backdrop-blur-2xl rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-light text-white mb-3">Sign Up</h2>
          <h3 className="text-white/70 mb-10 font-normal text-base">
            Just a few quick details
          </h3>
          <form onSubmit={onSubmit} className="grid gap-4">
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-[rgb(31_65_102_/50%)] text-white placeholder:text-white/40"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[rgb(31_65_102_/50%)] text-white placeholder:text-white/40"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[rgb(31_65_102_/50%)] text-white placeholder:text-white/40"
            />
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            <Button
              type="submit"
              className="h-14 text-lg font-normal bg-[#117bd5] hover:bg-[#0f6ab7]"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>
          <p className="mt-6 text-white/70 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#117bd5] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </BackgroundWrapper>
  );
}
