import type { TodoItem } from "../types";

interface TodoTableProps {
  todos: TodoItem[];
  onToggle: (todo: TodoItem) => void;
  onDelete: (id: string) => void;
}

export default function TodoTable({ todos, onToggle, onDelete }: TodoTableProps) {
  return (
    <table className="table" style={{ tableLayout: "fixed" }}>
      <thead>
        <tr>
          <th style={{ width: "50%" }}>Task</th>
          <th style={{ width: "18%" }}>Deadline</th>
          <th style={{ width: "12%" }}>Status</th>
          <th style={{ width: "20%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id} className={todo.isOverdue ? "overdue" : ""}>
            <td>
              <div className="task-cell" onClick={() => onToggle(todo)}>
                <span className={`task-checkbox ${todo.isCompleted ? "checked" : ""}`} />
                <span className={`task-text ${todo.isCompleted ? "done" : ""}`}>
                  {todo.title}
                </span>
              </div>
            </td>
            <td>
              {todo.deadline
                ? new Date(todo.deadline).toLocaleDateString()
                : "\u2014"}
            </td>
            <td>{todo.isCompleted ? "Completed" : "Active"}</td>
            <td>
              <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(todo.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
        {todos.length === 0 && (
          <tr>
            <td colSpan={4} className="text-center text-muted">
              No todos found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
