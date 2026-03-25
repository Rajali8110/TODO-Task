export interface TodoItem {
  id: string;
  title: string;
  deadline: string | null;
  isCompleted: boolean;
  isOverdue: boolean;
  createdAt: string;
}

export type Filter = "all" | "active" | "completed";
