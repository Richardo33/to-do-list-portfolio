"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Sparkles } from "lucide-react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string, category: string) => void;
}

type GenDescOK = { description: string; source?: string };
type GenDescErr = { error: string; details?: string };
type GenDescResponse = GenDescOK | GenDescErr;

// Auto-continue list when pressing Enter inside a Markdown list
function continueListOnEnter(
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  value: string,
  setValue: (v: string) => void
) {
  if (e.key !== "Enter") return;

  const el = e.currentTarget;
  const start = el.selectionStart;
  const end = el.selectionEnd;

  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const line = value.slice(lineStart, start);

  const unordered = line.match(/^(\s*)([-*])\s+/);
  const ordered = line.match(/^(\s*)(\d+)\.\s+/);

  if (!unordered && !ordered) return;

  e.preventDefault();

  const trimmed = line.trim();
  const isEmptyUnordered = trimmed === "-" || trimmed === "*";
  const isEmptyOrdered = /^\d+\.$/.test(trimmed);

  // kalau barisnya kosong list, stop list
  if (isEmptyUnordered || isEmptyOrdered) {
    const next = value.slice(0, lineStart) + "\n" + value.slice(end);
    setValue(next);
    queueMicrotask(() => {
      const pos = lineStart + 1;
      el.selectionStart = el.selectionEnd = pos;
    });
    return;
  }

  let prefix = "";
  if (unordered) {
    prefix = `${unordered[1]}${unordered[2]} `;
  } else if (ordered) {
    const indent = ordered[1];
    const n = parseInt(ordered[2], 10) + 1;
    prefix = `${indent}${n}. `;
  }

  const insert = "\n" + prefix;
  const next = value.slice(0, start) + insert + value.slice(end);
  setValue(next);

  queueMicrotask(() => {
    const pos = start + insert.length;
    el.selectionStart = el.selectionEnd = pos;
  });
}

// Ubah multiline plain text jadi markdown list otomatis
function normalizeToMarkdownList(input: string): string {
  const raw = input.replace(/\r\n/g, "\n").trimEnd();
  if (!raw.trim()) return "";

  const lines = raw.split("\n");

  // kalau sudah markdown list / numbered list, jangan diubah
  const alreadyList = lines.every((l) => {
    const s = l.trim();
    if (!s) return true;
    return s.startsWith("- ") || s.startsWith("* ") || /^\d+\.\s+/.test(s);
  });

  if (alreadyList) return raw;

  // kalau multi-line: ubah jadi "- "
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  if (nonEmpty.length >= 2) {
    return lines
      .map((l) => {
        const s = l.trim();
        if (!s) return "";
        return `- ${s}`;
      })
      .join("\n")
      .trimEnd();
  }

  return raw;
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

    const t = title.trim();
    const normalizedDesc = normalizeToMarkdownList(description);

    onAddTask(t, normalizedDesc, category);

    setTitle("");
    setDescription("");
    setCategory("Work");
    onClose();
  };

  const handleGenerateDescription = async (): Promise<void> => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });

      const data = (await res.json()) as GenDescResponse;

      if (!res.ok) {
        throw new Error("error" in data ? data.error : "Gagal generate");
      }

      if ("description" in data && typeof data.description === "string") {
        setDescription(data.description);
      }
    } catch (err) {
      console.error("generate-description:", err);
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
              💡 Supports Markdown list. Ketik{" "}
              <span className="text-white/80">- </span> lalu Enter untuk lanjut
              list otomatis.
            </p>

            <textarea
              rows={6}
              placeholder="Description (Markdown: -, *, 1., `code`)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) =>
                continueListOnEnter(e, description, setDescription)
              }
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
                className="px-4 py-1 rounded bg-[#117bd5] hover:bg-[#0f6ab7] disabled:opacity-50"
                disabled={!title.trim()}
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
