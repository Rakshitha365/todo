import TodoItem from "@/components/TodoItem";
import { prisma } from "@/lib/db";
import Link from "next/link";

function formatDate(date: Date | null): string {
  if (!date) return '';
  // Format as YYYY-MM-DD HH:mm:ss (stable and locale-independent)
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

async function getTodos() {
  const todos = await prisma.todo.findMany();
  return todos.map(todo => ({
    ...todo,
    createdAtFormatted: formatDate(todo.createdAt),
    updatedAtFormatted: formatDate(todo.updatedAt),
  }))
}

async function toggleTodo(id: string, completed: boolean) {
  "use server"
  await prisma.todo.update({where: {id}, data : {completed}})
} 

async function deleteTodo(id:string) {
  "use server"
  await prisma.todo.delete({where : {id}})
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-700 text-slate-700 px-2 py-1 rounded hover:text-slate-300 hover:bg-slate-700 focus-within:text-slate-300 outline-none"
          href="/addTodo"
        >
          Add Todo
        </Link>
      </header>
      
      <table className="w-full text-left border border-slate-300 bg-white mt-4">
        <thead className="bg-slate-200 text-slate-900">
          <tr>
            <th className="p-2">Done</th>
            <th className="p-2">Title</th>
            <th className="p-2">Status</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Updated At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {todos.map(todo => (
            <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
          ))}
        </tbody>
      </table>
    </>
  );
}
