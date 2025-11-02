"use client";

import { useState } from "react";
import { Task } from "./taskBoard";
import TaskCard from "./taskCard";
import TaskDetailModal from "./detailList";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";

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
  const { setNodeRef } = useDroppable({ id: status });
  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-4 bg-[rgb(0_0_0_/16%)] backdrop-blur-2xl border border-white/10 p-4 rounded-2xl min-h-[150px] shadow-lg"
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
}: {
  tasks: Task[];
  filter: string;
  onTaskStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDelete: (taskId: string) => void;
}) {
  const statuses: Task["status"][] = ["To Do", "Doing", "Done"];
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  p-4 rounded-2xl">
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
