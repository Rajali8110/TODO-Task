import { useEffect, useState } from "react";
import type { TodoItem, Filter } from "./types";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./services/todoApi";
import TodoForm from "./components/TodoForm";
import TodoFilters from "./components/TodoFilters";
import TodoTable from "./components/TodoTable";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .catch(() => setError("Failed to load todos"));
  }, []);

  const handleAdd = async (title: string, deadline: string | null) => {
    const created = await createTodo(title, deadline);
    setTodos((prev) => [created, ...prev]);
  };

  const handleToggle = (todo: TodoItem) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, isCompleted: !t.isCompleted, isOverdue: false } : t
      )
    );
    updateTodo(todo.id, {
      title: todo.title,
      deadline: todo.deadline,
      isCompleted: !todo.isCompleted,
    }).then((updated) => {
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    }).catch(() => {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === todo.id ? { ...t, isCompleted: todo.isCompleted, isOverdue: todo.isOverdue } : t
        )
      );
      setError("Failed to update todo");
    });
  };

  const handleDelete = (id: string) => {
    const prev = todos;
    setTodos((t) => t.filter((todo) => todo.id !== id));
    deleteTodo(id).catch(() => {
      setTodos(prev);
      setError("Failed to delete todo");
    });
  };

  const activeCount = todos.reduce((n, t) => n + (t.isCompleted ? 0 : 1), 0);

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.isCompleted;
    if (filter === "completed") return t.isCompleted;
    return true;
  });

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "850px", minHeight: "600px" }}>
        <h1 className="text-center text-danger mb-4">Todo App</h1>
        <TodoForm onAdd={handleAdd} />
        {error && <p className="text-danger small">{error}</p>}
        <TodoFilters current={filter} onChange={setFilter} />
        <TodoTable
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
        <p className="text-center text-muted small mt-3">
          {activeCount} item{activeCount !== 1 ? "s" : ""} left
        </p>
      </div>
    </div>
  );
}

export default App;
