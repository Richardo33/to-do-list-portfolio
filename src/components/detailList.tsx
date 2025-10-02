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

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (taskId: string) => void;
}

export default function TaskDetailModal({
  task,
  isOpen,
  onClose,
  onDelete,
}: TaskDetailModalProps) {
  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white rounded-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{task.title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Deskripsi: </span>
            {task.description}
          </p>
          <p>
            <span className="font-semibold">Kategori: </span>
            {task.category}
          </p>
          <p>
            <span className="font-semibold">Status: </span>
            {task.status}
          </p>
        </div>

        <DialogFooter className="flex justify-between mt-6">
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
