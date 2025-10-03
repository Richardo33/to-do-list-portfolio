"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ full_name?: string; avatar_url?: string }>(
    {}
  );

  useEffect(() => {
    const getUser = async () => {
      const session = supabase.auth.getSession();
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", (await session).data?.session?.user.id)
        .single();

      if (profileData) setUser(profileData);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 z-40 flex items-center justify-between gap-4 bg-[#0E2A47] shadow-lg w-full h-[72px] px-10">
      <div
        className="flex items-center gap-2 min-w-[128px]"
        // onClick={() => router.push("/tasks")}
      >
        <Link
          href="/tasks"
          className="text-4 xl font-medium text-white cursor-pointer"
        >
          WGN
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Menu as="div" className="relative">
          <Menu.Button>
            <Image
              src={user.avatar_url || "/WGN.png"}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full cursor-pointer border-2 border-white"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white text-black divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
              <div className="px-4 py-2">
                <p className="text-sm font-medium">
                  {user.full_name || "User"}
                </p>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/profile"
                      // onClick={() => router.push("/profile")}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block w-full text-left px-4 py-2 text-sm text-red-600`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
}
