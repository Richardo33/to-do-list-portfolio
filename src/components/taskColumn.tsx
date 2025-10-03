"use client";

import { useState } from "react";
import { Task } from "./taskBoard";
import TaskCard from "./taskCard";
import TaskDetailModal from "./detailList";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { MoreVertical } from "lucide-react";

interface TaskColumnsProps {
  tasks: Task[];
  filter: string;
  onTaskStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDelete: (taskId: string) => void;
}

interface SortableTaskProps {
  task: Task;
  onClick: (task: Task) => void;
}

function SortableTask({ task, onClick }: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Drag handle: paku + tali */}
      <div
        className="flex items-center gap-2 mb-2 cursor-grab select-none"
        {...listeners}
        {...attributes}
      >
        {/* paku */}
        <div className="w-3 h-3 rounded-full bg-gray-400 shadow-md"></div>
        {/* tali */}
        <div className="flex-1 h-0.5 bg-gray-400"></div>
      </div>

      {/* Card utama, klik untuk buka detail */}
      <TaskCard task={task} onClick={onClick} />
    </div>
  );
}

function DroppableColumn({
  status,
  children,
}: {
  status: Task["status"];
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id: status });
  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-4 bg-[rgba(0,0,0,0.16)] p-4 rounded-2xl min-h-[150px]"
    >
      <h2 className="text-white font-bold mb-2">{status}</h2>
      {children}
    </div>
  );
}

export default function TaskColumns({
  tasks,
  filter,
  onTaskStatusChange,
  onDelete,
}: TaskColumnsProps) {
  const statuses: Task["status"][] = ["To Do", "Doing", "Done"];
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = (status: Task["status"]) =>
    tasks.filter(
      (t) => t.status === status && (filter === "All" || t.category === filter)
    );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const draggedTask = tasks.find((t) => t.id === active.id);
    if (!draggedTask) return;

    let newStatus: Task["status"] | null = null;
    const overTask = tasks.find((t) => t.id === over.id);

    if (overTask) {
      newStatus = overTask.status;
    } else if (statuses.includes(over.id as Task["status"])) {
      newStatus = over.id as Task["status"];
    }

    if (newStatus && draggedTask.status !== newStatus) {
      onTaskStatusChange(draggedTask.id, newStatus);
    }
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statuses.map((status) => {
            const tasksForStatus = filteredTasks(status);
            return (
              <DroppableColumn key={status} status={status}>
                <SortableContext
                  items={tasksForStatus.map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {tasksForStatus.map((task) => (
                    <SortableTask
                      key={task.id}
                      task={task}
                      onClick={(t) => setSelectedTask(t)}
                    />
                  ))}
                </SortableContext>
              </DroppableColumn>
            );
          })}
        </div>
      </DndContext>

      <TaskDetailModal
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onDelete={onDelete}
      />
    </>
  );
}
