/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AddTaskModal from "./createTaskDialog";
import TaskColumns from "./taskColumn";
import FilterBar from "./filterAdd";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "To Do" | "Doing" | "Done";
  list_id: string;
}

export interface List {
  id: string;
  title: string;
  position: number;
  board_id?: string;
}

export default function TaskBoard() {
  const [filter, setFilter] = useState<string>("All");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [boardId, setBoardId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData?.user) return;

      setUserId(userData.user.id);

      // 1) get/create board
      const { data: boards, error: boardError } = await supabase
        .from("boards")
        .select("*")
        .eq("owner_id", userData.user.id);

      if (boardError) return;

      let bId = boards && boards.length > 0 ? boards[0].id : null;

      if (!bId) {
        const { data: newBoard } = await supabase
          .from("boards")
          .insert([{ title: "My Board", owner_id: userData.user.id }])
          .select()
          .single();
        bId = newBoard?.id || null;
      }
      if (!bId) return;
      setBoardId(bId);

      // 2) get/create lists
      const { data: existingLists } = await supabase
        .from("lists")
        .select("*")
        .eq("board_id", bId)
        .order("position", { ascending: true });

      let finalLists: List[] = existingLists || [];

      if (!finalLists || finalLists.length === 0) {
        const defaultLists = [
          { board_id: bId, title: "To Do", position: 1 },
          { board_id: bId, title: "Doing", position: 2 },
          { board_id: bId, title: "Done", position: 3 },
        ];

        const { data: newLists } = await supabase
          .from("lists")
          .insert(defaultLists)
          .select();

        finalLists = newLists || [];
      }

      setLists(finalLists);

      // 3) fetch tasks by list ids (gunakan finalLists, bukan existingLists)
      const listIds = finalLists.map((l) => l.id);
      if (listIds.length === 0) {
        setTasks([]);
        return;
      }

      const { data: taskData } = await supabase
        .from("tasks")
        .select("*")
        .in("list_id", listIds)
        .order("created_at", { ascending: true });

      setTasks(taskData || []);
    };

    fetchData();
  }, []);

  const categories = ["Work", "Personal", "Urgent"];

  const handleAddTask = async (
    title: string,
    description: string,
    category: string
  ) => {
    const defaultList = lists.find((l) => l.title === "To Do");
    if (!defaultList) return;

    const { data } = await supabase
      .from("tasks")
      .insert([
        {
          title,
          description,
          category,
          status: "To Do",
          list_id: defaultList.id,
        },
      ])
      .select()
      .single();

    if (data) setTasks((prev) => [...prev, data]);
    setIsModalOpen(false);
  };

  const handleTaskStatusChange = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    // update list_id juga biar konsisten
    const targetList = lists.find((l) => l.title === newStatus);

    const updatePayload: Partial<Task> = { status: newStatus };
    if (targetList) updatePayload.list_id = targetList.id;

    const { data } = await supabase
      .from("tasks")
      .update(updatePayload)
      .eq("id", taskId)
      .select()
      .single();

    if (data) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                status: newStatus,
                list_id: targetList?.id ?? t.list_id,
              }
            : t
        )
      );
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);
    if (error) {
      console.error("Delete failed:", error);
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        categories={categories}
        onAdd={() => setIsModalOpen(true)}
      />

      <TaskColumns
        tasks={tasks}
        filter={filter}
        onTaskStatusChange={handleTaskStatusChange}
        onDelete={handleDeleteTask}
      />

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
