"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import Image from "next/image";

interface Profile {
  full_name: string;
  email: string;
  avatar_url: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", session.user.id)
        .single();

      if (profileData) {
        setProfile({
          full_name: profileData.full_name,
          email: session.user.email ?? "",
          avatar_url: profileData.avatar_url || "/WGN.png",
        });
        setNewName(profileData.full_name);
      }
    };

    getProfile();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session || !profile) return;

    let avatarUrl = profile.avatar_url;

    if (newAvatar) {
      const fileExt = newAvatar.name.split(".").pop();
      const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, newAvatar, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      avatarUrl = publicUrlData.publicUrl;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: newName,
        avatar_url: avatarUrl,
      })
      .eq("id", session.user.id);

    if (updateError) {
      console.error("Update error:", updateError);
      return;
    }

    setProfile({ ...profile, full_name: newName, avatar_url: avatarUrl });
    setIsEditing(false);
    setPreviewUrl(null);
    setNewAvatar(null);
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-[#184A7E]">
        <div className="bg-white shadow-xl rounded-2xl p-8 flex w-[600px] relative">
          <div className="flex flex-col items-center w-1/3 border-r pr-6">
            <Image
              src={previewUrl || profile.avatar_url}
              alt="Profile picture"
              width={100}
              height={100}
              className="rounded-full border-4 border-[#0E2A47]"
            />
            <h2 className="mt-4 text-lg font-bold text-gray-800">
              {profile.full_name}
            </h2>
            <p className="text-gray-500 text-sm">{profile.email}</p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-[#117bd5] text-white rounded-lg hover:bg-[#0f6ab7]"
            >
              Edit Profile
            </button>
          </div>

          <div className="w-2/3 pl-6 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Account Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-800">{profile.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{profile.email}</p>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="absolute inset-0 bg-black/60 flex justify-center items-center z-10">
              <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
                <div className="flex flex-col gap-3">
                  <label className="text-sm text-gray-600">Full Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="p-2 border rounded"
                  />

                  <label className="text-sm text-gray-600">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="rounded-full mt-2 border"
                    />
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#117bd5] text-white rounded hover:bg-[#0f6ab7]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
