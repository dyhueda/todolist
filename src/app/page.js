"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex justify-center m-10">
      <button onClick={(e)=>{e.preventDefault();router.push('/todo') }} className="p-2 bg-blue-800 " >ToDo List</button>

    </div>
  )
}
