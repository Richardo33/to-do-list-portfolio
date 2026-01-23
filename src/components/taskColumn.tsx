"use client";

import { useMemo, useState } from "react";
import { Task } from "./taskBoard";
import TaskCard from "./taskCard";
import TaskDetailModal from "./detailList";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
  rectIntersection,
  closestCenter,
  type CollisionDetection,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";

interface SortableTaskProps {
  task: Task;
  onClick: (task: Task) => void;
}

function SortableTask({ task, onClick }: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: { type: "task", status: task.status },
    });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { type: "column", status },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-4 bg-[rgb(0_0_0_/16%)] backdrop-blur-2xl border border-white/10 p-4 rounded-2xl min-h-[220px] shadow-lg transition ${
        isOver ? "ring-2 ring-white/40" : ""
      }`}
    >
      <h2 className="text-white font-bold mb-1">{status}</h2>

      {/* area drop yang luas dan konsisten */}
      <div className="flex flex-col gap-4 flex-1 min-h-[140px]">{children}</div>
    </div>
  );
}

export default function TaskColumns({
  tasks,
  filter,
  onTaskStatusChange,
  onDelete,
}: {
  tasks: Task[];
  filter: string;
  onTaskStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDelete: (taskId: string) => void;
}) {
  const statuses: Task["status"][] = useMemo(
    () => ["To Do", "Doing", "Done"],
    []
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const collisionDetectionStrategy: CollisionDetection = (args) => {
    const pointerHits = pointerWithin(args);
    if (pointerHits.length) return pointerHits;

    const rectHits = rectIntersection(args);
    if (rectHits.length) return rectHits;

    return closestCenter(args);
  };

  const filteredTasks = (status: Task["status"]) =>
    tasks.filter(
      (t) => t.status === status && (filter === "All" || t.category === filter)
    );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const draggedTask = tasks.find((t) => t.id === activeId);
    if (!draggedTask) return;

    let newStatus: Task["status"] | null = null;

    // kalau drop di atas task lain
    const overTask = tasks.find((t) => t.id === overId);
    if (overTask) {
      newStatus = overTask.status;
    } else if (statuses.includes(overId as Task["status"])) {
      // kalau drop di kolom kosong / area kolom
      newStatus = overId as Task["status"];
    }

    if (newStatus && draggedTask.status !== newStatus) {
      onTaskStatusChange(draggedTask.id, newStatus);
    }
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-2xl">
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
