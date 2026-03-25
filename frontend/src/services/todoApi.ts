import type { TodoItem } from "../types";

const API_URL = "http://localhost:5000/api/todos";

export async function fetchTodos(): Promise<TodoItem[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(
  title: string,
  deadline: string | null
): Promise<TodoItem> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, deadline: deadline || null }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to create todo");
  }
  return res.json();
}

export async function updateTodo(
  id: string,
  todo: Partial<TodoItem>
): Promise<TodoItem> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update todo");
  }
  return res.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
}
