import type { Filter } from "../types";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

interface TodoFiltersProps {
  current: Filter;
  onChange: (filter: Filter) => void;
}

export default function TodoFilters({ current, onChange }: TodoFiltersProps) {
  return (
    <div className="btn-group mb-3">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={`btn btn-sm ${current === f.value ? "btn-outline-danger active" : "btn-outline-secondary"}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
