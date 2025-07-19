import { prisma } from "@/lib/db"
import {redirect} from "next/navigation"
import Link from "next/link"

async function createTodo(data:FormData) {
    "use server"
    const title = data.get("title")?.valueOf()
    if(typeof title !== "string" || title.length === 0){
        throw new Error("Invalid Title")
    }

    await prisma.todo.create({data: {title, completed: false}})
    redirect("/")
}

export default function page() {
    return <>

    <header className="flex justify-between items-center mb-4">
    <h1 className="text-2xl">Add Todo</h1>
    </header>

    <form action={createTodo} className="flex gap-2 flex-col">
        <input type="text" name="title" placeholder="Enter Todo Title" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-700"/>

        <div className="flex gap-4 mt-2">
            <Link href="/" className="border border-red-700 text-red-700 px-2 py-1 rounded hover:bg-red-700
            hover:text-white focus-within:bg-slate-700 outline-none ">Cancel</Link>
            
            <button type="submit" className="border border-green-700 text-green-700 px-2 py-1 rounded hover:bg-green-700 hover:text-white focus-within:bg-slate-700 outline-none">Create</button>
        </div> 
    </form>
    </>
}