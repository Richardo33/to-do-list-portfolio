"use client";

import { Task } from "./taskBoard";

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const categoryColors: Record<string, string> = {
    Work: "bg-[#117bd5] text-white",
    Personal: "bg-[#22c55e] text-white",
    Urgent: "bg-[#f87171] text-white",
    Other: "bg-[#9ca3af] text-white",
  };

  const tagClass = categoryColors[task.category] || categoryColors["Other"];

  return (
    <div
      onClick={() => onClick(task)}
      className="relative bg-[rgba(255,255,255,0.05)] rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <span
        className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-2 ${tagClass}`}
      >
        {task.category}
      </span>
      <h3 className="font-bold text-white text-lg mb-1">{task.title}</h3>
      <p className="text-gray-200 text-sm line-clamp-2">{task.description}</p>
    </div>
  );
}
