"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Task } from "./taskBoard";
import MarkdownView from "@/components/MarkdownView";

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (taskId: string) => void;
}

// Biar task lama yang isinya cuma baris-baris tetap tampil sebagai bullet list
function normalizeToMarkdownList(input: string): string {
  const raw = (input ?? "").replace(/\r\n/g, "\n").trimEnd();
  if (!raw.trim()) return "";

  const lines = raw.split("\n");

  // Kalau sudah markdown list / numbered list, jangan diubah
  const alreadyList = lines.every((l) => {
    const s = l.trim();
    if (!s) return true;
    return s.startsWith("- ") || s.startsWith("* ") || /^\d+\.\s+/.test(s);
  });
  if (alreadyList) return raw;

  // Kalau multiline, jadikan bullet
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

  // Single line biarin
  return raw;
}

export default function TaskDetailModal({
  task,
  isOpen,
  onClose,
  onDelete,
}: TaskDetailModalProps) {
  if (!task) return null;

  const desc = normalizeToMarkdownList(task.description);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white rounded-xl max-w-md max-h-[85vh] overflow-hidden p-0">
        <div className="p-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {task.title}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-3 overflow-y-auto pr-2 max-h-[55vh]">
            <div>
              <div className="font-semibold mb-1">Deskripsi:</div>

              <MarkdownView
                value={desc.trim() ? desc : "—"}
                className="text-white/90"
              />
            </div>

            <p>
              <span className="font-semibold">Kategori: </span>
              {task.category}
            </p>
            <p>
              <span className="font-semibold">Status: </span>
              {task.status}
            </p>
          </div>
        </div>

        <DialogFooter className="sticky bottom-0 bg-gray-900 border-t border-white/10 px-6 py-4">
          <Button
            variant="destructive"
            onClick={() => {
              onDelete(task.id);
              onClose();
            }}
          >
            Hapus Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
