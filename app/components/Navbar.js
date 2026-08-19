"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession()

  const [open, setOpen] = useState(false);

  if (status === "loading") return null;

  return (
    <nav className="w-full h-16 flex items-center justify-between py-6 px-8 
    bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">

      <div className="text-xl font-bold tracking-wide text-blue-900">
        <Link href={"/"}>
          PayGate
        </Link>
      </div>

      <div className="flex items-center gap-6 text-gray-700">

        {session ?
          <>
            <div className="relative">
              <button
                onBlur={() => setTimeout(() => {
                  setOpen(false)
                }, 300)}
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 rounded-full border text-gray-400 hover:bg-gray-100 transition"
              >
                {session.user?.avatar ? <div>{session.user?.avatar}</div> : <User size={22} /> }
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md p-2">
                  <Link href={'/'} className="w-full block px-2 py-1 text-left font-medium my-0.5 text-sm rounded text-gray-500 bg-gray-50 hover:bg-gray-100 transition">
                    Home
                  </Link>

                  <Link href={'/dashboard'} className="w-full block px-2 py-1 text-left font-medium my-0.5 text-sm rounded text-gray-500 bg-gray-50 hover:bg-gray-100 transition">
                    Dashboard
                  </Link>

                  <Link href={`/${session.user?.name}`} className="w-full block px-2 py-1 text-left font-medium my-0.5 text-sm rounded text-gray-500 bg-gray-50 hover:bg-gray-100 transition">
                    Your Gate
                  </Link>

                  <Link href={'/mail'} className="w-full block px-2 py-1 text-left font-medium my-0.5 text-sm rounded text-gray-500 bg-gray-50 hover:bg-gray-100 transition">
                    Mail
                  </Link>

                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full px-2 py-1 text-left font-medium my-0.5 text-sm rounded text-gray-500 bg-gray-50 hover:bg-red-100 transition"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </>
          :
          <>
            <Link className="px-3 py-2 font-medium text-sm rounded-md text-white bg-purple-600 hover:bg-purple-700 transition" href={"/sign-in"} >
              Get Started
            </Link>

            <Link className="px-3 py-2 font-medium text-sm rounded-md text-white bg-purple-600 hover:bg-purple-700 transition" href={"/sign-up"} >
              Sign Up
            </Link>
          </>}

      </div >

    </nav >
  );
};

export default Navbar;