import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

type PageProps = {
  params: {
    id: string
  }
}

export default async function page({ params }: PageProps) {

  const todo = await prisma.todo.findUnique({ where: { id: params.id } });

  if (!todo) return <p className="text-red-500">Todo not found</p>;

  async function handleUpdate(updateData: FormData) {
    "use server";
    const title = updateData.get("newtitle")?.valueOf()
    if(typeof title !== "string" || title.length === 0){
        throw new Error("Invalid Title")
    }

    await prisma.todo.update({where : {id: params.id}, data : {title}})
    redirect("/")
  }
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Add Todo</h1>
      </header>
      <form action={handleUpdate} className="flex gap-2 flex-col">
        <input
          type="text"
          name="newtitle"
          placeholder={todo.title}
          defaultValue={todo.title}
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-700"
        />

        <div className="flex gap-4 mt-2">
          <Link
            href="/"
            className="border border-red-700 text-red-700 px-2 py-1 rounded hover:bg-red-700
            hover:text-white focus-within:bg-slate-700 outline-none "
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="border border-yellow-700 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-700 hover:text-white focus-within:bg-slate-700 outline-none"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}
