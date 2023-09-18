"use client";
import { Saira_Stencil_One } from "next/font/google";
import MenuIcon from "./icons/MenuIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";

const sairaStencil = Saira_Stencil_One({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  return (
    <div className="px-6 py-4 flex justify-between">
      <button
        onClick={(e) => {
          e.preventDefault;
          router.push("/");
        }}
        className={`${sairaStencil.className} text-3xl font-normal`}
      >
        ToDo
      </button>
      <div className="relative">
        <button
          onClick={(e) => {
            e.preventDefault;
            setMenuOpen(!menuOpen);
          }}
        >
          <MenuIcon />
        </button>
        {menuOpen && (
          <ul className="absolute right-0 bg-indigo-800/80 px-6 py-4 animate-fade-down animate-once animate-duration-1500 animate-ease-out">
            <button
              onClick={(e) => {
                e.preventDefault;
                router.push("/");
                setMenuOpen(false);
              }}
              className="p-2"
            >
              Home
            </button>
            <button
              onClick={(e) => {
                e.preventDefault;
                router.push("/todo");
                setMenuOpen(false);
              }}
              className="p-2"
            >
              To Do
            </button>
          </ul>
        )}
      </div>
    </div>
  );
}
