"use client";

import Navbar from "@/components/navbar";
import TaskBoard from "@/components/taskBoard";

export default function TasksPage() {
  return (
    <main className="min-h-screen bg-[#184A7E] flex flex-col">
      <Navbar />
      <div className="flex-1 pt-[100px] px-6 md:px-12 lg:px-20">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">WGN Tasks</h1>
        </header>

        <TaskBoard />
      </div>
    </main>
  );
}
