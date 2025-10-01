"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export default function LandingPage() {
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isRegister, setIsRegister] = useState(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/tasks");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
      options: {
        data: {
          full_name: registerName,
        },
      },
    });

    if (signUpError) {
      setErrorMsg(signUpError.message);
      return;
    }

    router.push("/tasks");
  };

  return (
    <main className="min-h-screen grid place-items-center bg-[#0a1d32] bg-[url('/bg.svg')] bg-no-repeat bg-cover bg-[60%_50%] bg-animate px-6">
      <div className="relative z-10 w-full max-w-md bg-[rgb(0_0_0_/16%)] backdrop-blur-2xl rounded-2xl p-10 text-center">
        {isRegister ? (
          <>
            <h2 className="text-3xl font-light text-white mb-3">Sign Up</h2>
            <h3 className="text-white/70 mb-10 font-normal text-base">
              Just a few quick details
            </h3>
            <form onSubmit={handleRegister} className="grid gap-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                required
                className="bg-[rgb(31_65_102_/50%)] text-white placeholder:text-white/40"
              />
              <Input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
                className="bg-[rgb(31_65_102_/50%)] text-white placeholder:text-white/40"
              />
              <Input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
                className="bg-[rgb(31_65_102_/50%)] text-white placeholder:text-white/40"
              />
              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
              <Button
                type="submit"
                className="h-14 text-lg font-normal bg-[#117bd5] hover:bg-[#0f6ab7] cursor-pointer"
              >
                Register
              </Button>
            </form>
            <p className="mt-6 text-white/70 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="text-[#117bd5] hover:underline cursor-pointer"
                onClick={() => setIsRegister(false)}
              >
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-light text-white mb-3">Login</h2>
            <h3 className="text-white/70 mb-10 font-normal text-base">
              Welcome back!
            </h3>
            <form onSubmit={handleLogin} className="grid gap-4">
              <Input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="bg-[rgb(31_65_102_/50%)] text-white placeholder:text-white/40"
              />
              <Input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="bg-[rgb(31_65_102_/50%)] text-white placeholder:text-white/40"
              />
              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
              <Button
                type="submit"
                className="h-14 text-lg font-normal bg-[#117bd5] hover:bg-[#0f6ab7] cursor-pointer"
              >
                Login
              </Button>
            </form>
            <p className="mt-6 text-white/70 text-sm">
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-[#117bd5] hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Register
              </button>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
