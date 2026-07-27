"use client";
import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook, FaGithub } from 'react-icons/fa'
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react";


const Page = () => {


  const router = useRouter();
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);

  if (status === "loading") return null;


  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-md w-[30vw]">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <input type="email" placeholder="Email" className="w-full mb-3 p-2 rounded-md" />
        <input type="password" placeholder="Password" className="w-full mb-4 p-2 rounded-md" />

        <button className="w-full bg-green-500 text-white p-2 rounded-md mb-4">
          Login
        </button>

        <div className="text-center text-gray-500 mb-3">or</div>

        <button className="flex items-center justify-center gap-2 w-full bg-white p-2 rounded-md mb-2">
          <FcGoogle size={20} /> Continue with Google
        </button>
        <button className="flex items-center justify-center gap-2 w-full bg-blue-700 text-white p-2 rounded-md mb-2">
          <FaFacebook size={20} /> Continue with Facebook
        </button>
        <button onClick={() => signIn("github", { callbackUrl: "/" })} className="flex items-center justify-center gap-2 w-full bg-gray-800 text-white p-2 rounded-md">
          <FaGithub size={20} /> Continue with GitHub
        </button>
      </div>
    </div>
  )
}

export default Page