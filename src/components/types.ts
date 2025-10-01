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
  board_id: string;
}
