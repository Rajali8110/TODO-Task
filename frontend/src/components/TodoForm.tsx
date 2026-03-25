import { useState } from "react";

const TITLE_MIN_LENGTH = 11;
const TITLE_MAX_LENGTH = 200;

interface TodoFormProps {
  onAdd: (title: string, deadline: string | null) => Promise<void>;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const trimmed = title.trim();
    if (trimmed.length < TITLE_MIN_LENGTH) {
      setError(`Task must be at least ${TITLE_MIN_LENGTH} characters long`);
      return;
    }
    if (trimmed.length > TITLE_MAX_LENGTH) {
      setError(`Task must not exceed ${TITLE_MAX_LENGTH} characters`);
      return;
    }
    setError("");
    try {
      await onAdd(trimmed, deadline || null);
      setTitle("");
      setDeadline("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to create todo");
    }
  };

  return (
    <>
      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="What needs to be done?"
          value={title}
          maxLength={TITLE_MAX_LENGTH}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <input
          type="date"
          className="form-control"
          style={{ maxWidth: "180px" }}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button className="btn btn-danger" onClick={handleSubmit}>
          Add
        </button>
      </div>
      {error && <p className="text-danger small mb-3">{error}</p>}
    </>
  );
}
