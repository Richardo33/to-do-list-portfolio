"use client";

import Navbar from "@/components/navbar";
import TaskBoard from "@/components/taskBoard";
import BackgroundWrapper from "@/components/backgroundWrapper";

export default function TasksPage() {
  return (
    <BackgroundWrapper>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 pt-[100px] px-6 md:px-12 lg:px-20">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              WorkGroup Navigation
            </h1>
          </header>
          <TaskBoard />
        </div>
      </div>
    </BackgroundWrapper>
  );
}
