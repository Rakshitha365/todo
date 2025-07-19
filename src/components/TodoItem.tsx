"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

type TodoItemProps = {
  id: string;
  title: string;
  completed: boolean;
  createdAtFormatted: string;
  updatedAtFormatted: string;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
};

export default function TodoItem({
  id,
  title,
  completed: initialCompleted,
  createdAtFormatted,
  updatedAtFormatted,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) {
  const [completed, setcompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);
  const handleCheckboxChange = useCallback(() => {
    const newStatus = !completed;
    setcompleted(newStatus);
    setLoading(true);
    setTimeout(() => {
      toggleTodo(id, newStatus);
      setLoading(false);
    }, 500);
  }, [id, completed, toggleTodo]);
  return (
    <>
      <tr
        className={`border-b ${
          completed ? "bg-slate-300 text-slate-500 line-through" : ""
        }`}
      >
        <td className="p-2">
          <input
            type="checkbox"
            placeholder="Enter Todo"
            defaultChecked={completed}
            onChange={handleCheckboxChange}
            disabled={loading}
          />
        </td>
        <td className="p-2">{title}</td>

        <td>{completed ? "✅ Done" : "❌ Pending"}</td>

        <td className="p-2">{createdAtFormatted}</td>
        
        <td className="p-2">{updatedAtFormatted}</td>

        <td className="p-2 space-x-2">
          <Link
            href={`/updateTodo/${id}`}
            className="border border-yellow-700 text-yellow-700 px-2 py-1 hover:bg-yellow-700 hover:text-white"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteTodo(id)}
            className="border border-red-700 text-red-700 px-2 py-1 hover:bg-red-700 hover:text-white"
            disabled={loading}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
