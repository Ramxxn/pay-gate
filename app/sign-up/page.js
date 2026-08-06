"use client"

import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook, FaGithub } from 'react-icons/fa'
import { useSession, signIn, } from "next-auth/react";
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';


const Page = () => {


  const router = useRouter();
  const { data: session, status } = useSession()

  const [formData, setFormData] = useState({ userName: "", email: "", password: "", })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      console.log(1)
      const res = await api("/api/auth/sign-up", {
        method: "POST",
        body: formData,
      })
      
      console.log(2)
      toast.success("Account created successfully");
      
      console.log(3)
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        callbackUrl: "/",
      });

    } catch (error) {
       console.log(error);
    toast.error(error.message);
      toast.error("Something went wrong ka error");
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);

  if (status === "loading") return null;


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border border-gray-200 p-8 rounded-2xl shadow-md w-[30vw]">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <input name="userName" type="text" placeholder="Full Name" onChange={(e) => handleChange(e)} className="w-full mb-3 p-2.5 rounded-md bg-zinc-50 focus:outline-1" />
        <input name="email" type="email" placeholder="Email" onChange={(e) => handleChange(e)} className="w-full mb-3 p-2.5 rounded-md bg-zinc-50 focus:outline-1" />
        <input name="password" type="password" placeholder="Password" onChange={(e) => handleChange(e)} className="w-full mb-3 p-2.5 rounded-md bg-zinc-50 focus:outline-1" />

        <button onClick={handleSubmit} className="w-full bg-purple-600 text-white p-2 rounded-md my-4">
          Sign Up
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