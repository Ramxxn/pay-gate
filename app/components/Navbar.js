"use client";
import React from "react";
import Link from "next/link";
import { Home, User, Briefcase, Mail } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession()

  if (status === "loading") return null;

  return (
    <nav className="w-full h-16 flex items-center justify-between py-6 px-8 
    bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">

      <div className="text-xl font-semibold tracking-wide text-blue-900">
        Aozora
      </div>

      <div className="flex items-center gap-6 text-gray-700">

        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Home size={22} />
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Briefcase size={22} />
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Mail size={22} />
        </button>

        {session ?
          <>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition m-10">
              <User size={22} />
            </button>
            <button className="px-3 py-2 font-medium text-md rounded-md text-white bg-purple-600 hover:bg-purple-700 transition" onClick={() => signOut( { callbackUrl: "/"} )}>Sign out</button>
          </>
          :
          <>
              <Link className="px-3 py-2 font-medium text-md rounded-md text-white bg-purple-600 hover:bg-purple-700 transition" href={"/sign-in"} >
                Get Started
              </Link>

              <Link className="px-3 py-2 font-medium text-md rounded-md text-white bg-purple-600 hover:bg-purple-700 transition" href={"/sign-up"} >
                Sign Up
              </Link>
          </>}

      </div >

    </nav >
  );
};

export default Navbar;