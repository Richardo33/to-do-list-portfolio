"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(title, description, category);
    setTitle("");
    setDescription("");
    setCategory("Work");
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
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-[rgba(31,65,102,0.5)] p-2 rounded text-white placeholder-white/60"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="bg-[rgba(31,65,102,0.5)] p-2 rounded text-white placeholder-white/60"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[rgba(31,65,102,0.5)] p-2 rounded text-white"
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Urgent</option>
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
