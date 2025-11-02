"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Sparkles } from "lucide-react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string, category: string) => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onAddTask,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");
  const [loading, setLoading] = useState(false);
  const [highlightAI, setHighlightAI] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHighlightAI(true);
      const timer = setTimeout(() => setHighlightAI(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(title, description, category);
    setTitle("");
    setDescription("");
    setCategory("Work");
  };

  const handleGenerateDescription = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (data.description) {
        setDescription(data.description);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xl"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-[rgba(0,0,0,0.16)] backdrop-blur-2xl rounded-2xl p-6 text-white">
          <Dialog.Title className="text-2xl font-bold mb-4">
            Add New Task
          </Dialog.Title>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex gap-2 items-start relative">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="flex-1 bg-[rgba(31,65,102,0.5)] p-2 rounded text-white placeholder-white/60"
              />

              <div className="relative group">
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={loading || !title.trim()}
                  className={`px-3 py-2 rounded bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-50 transition ${
                    highlightAI ? "animate-bounce" : ""
                  }`}
                >
                  {loading ? (
                    "..."
                  ) : (
                    <Sparkles className="w-5 h-5 text-white" />
                  )}
                </button>

                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs rounded bg-gray-800 text-gray-200 opacity-0 group-hover:opacity-100 transition">
                  Auto-generate description
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              💡 You can leave description empty and use{" "}
              <span className="text-green-400">AI ✨</span> to generate one.
            </p>
            <textarea
              rows={3}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="bg-[rgba(31,65,102,0.5)] p-2 rounded text-white placeholder-white/60 resize-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[rgba(31,65,102,0.5)] p-2 rounded text-white"
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Urgent</option>
              {/* <option>Other</option> */}
            </select>

            <div className="flex justify-end gap-2 mt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1 rounded bg-gray-600 hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 rounded bg-[#117bd5] hover:bg-[#0f6ab7]"
              >
                Add
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
