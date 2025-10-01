"use client";

import { Task } from "./taskBoard";
import TaskCard from "./taskCard";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskColumnsProps {
  tasks: Task[];
  filter: string;
  onTaskStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDeleteTask: (taskId: string) => void;
}

interface SortableTaskProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

function SortableTask({ task, onDelete }: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onDelete={onDelete} />
    </div>
  );
}

export default function TaskColumns({
  tasks,
  filter,
  onTaskStatusChange,
  onDeleteTask,
}: TaskColumnsProps) {
  const statuses: Task["status"][] = ["To Do", "Doing", "Done"];

  const filteredTasks = (status: Task["status"]) =>
    tasks.filter(
      (t) => t.status === status && (filter === "All" || t.category === filter)
    );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const draggedTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);

    // Jika drop di column kosong, ambil status kolom dari over.id yang merupakan column id
    if (!draggedTask) return;

    let newStatus: Task["status"] | null = null;
    if (overTask) {
      newStatus = overTask.status;
    } else {
      // over.id = status string
      if (statuses.includes(over.id as Task["status"])) {
        newStatus = over.id as Task["status"];
      }
    }

    if (newStatus && draggedTask.status !== newStatus) {
      onTaskStatusChange(draggedTask.id, newStatus);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map((status) => {
          const tasksForStatus = filteredTasks(status);
          return (
            <div
              key={status}
              id={status}
              className="flex flex-col gap-4 bg-[rgba(0,0,0,0.16)] p-4 rounded-2xl"
              style={{
                minHeight: `${Math.max(tasksForStatus.length, 1) * 90}px`,
              }}
            >
              <h2 className="text-white font-bold mb-2">{status}</h2>
              <SortableContext
                items={tasksForStatus.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                {tasksForStatus.map((task) => (
                  <SortableTask
                    key={task.id}
                    task={task}
                    onDelete={onDeleteTask}
                  />
                ))}
              </SortableContext>
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}
