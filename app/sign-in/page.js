// "use client";
// import React, { useEffect, useState } from 'react'
// import { FcGoogle } from 'react-icons/fc'
// import { FaFacebook, FaGithub } from 'react-icons/fa'
// import { useRouter } from 'next/navigation';
// import { useSession, signIn, signOut } from "next-auth/react";
// import toast from 'react-hot-toast';


// const Page = () => {


//   const router = useRouter();
//   const { data: session, status } = useSession()

//   const [formData, setFormData] = useState({ email: "", password: "", })
//   const [loading, setLoading] = useState(false)

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//   }


//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       setLoading(true)
//       const res = await signIn("credentials", { ...formData, redirect: false, })

//       if (!res?.ok || res.error) {
//         toast.error("Invalid credentials");
//         return;
//       }

//       toast.success("Logged in successfully");
//       router.push("/");
//     } catch (error) {
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false)
//     }

//   }

//   useEffect(() => {
//     if (session) {
//       router.replace("/");
//     }
//   }, [session]);

//   if (status === "loading") return null;


//   return (
//     <div className="flex items-center justify-center w-full min-h-screen">
//       <div className="border border-gray-200 bg-white p-8 rounded-2xl shadow-md w-[30vw]">
//         <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

//         <input name="email" type="email" placeholder="Email" onChange={(e) => handleChange(e)} className="w-full mb-3 p-2.5 rounded-md bg-zinc-50 focus:outline-1" />
//         <input name="password" type="password" placeholder="Password" onChange={(e) => handleChange(e)} className="w-full mb-4 p-2.5 rounded-md bg-zinc-50 focus:outline-1" />

//         <button onClick={handleSubmit} className="w-full bg-purple-600 text-white p-2 rounded-md mb-4">
//           Login
//         </button>

//         <div className="text-center text-gray-500 mb-3">or</div>

//         <button className="flex items-center justify-center gap-2 w-full bg-white p-2 rounded-md mb-2">
//           <FcGoogle size={20} /> Continue with Google
//         </button>
//         <button className="flex items-center justify-center gap-2 w-full bg-blue-700 text-white p-2 rounded-md mb-2">
//           <FaFacebook size={20} /> Continue with Facebook
//         </button>
//         <button onClick={() => signIn("github", { callbackUrl: "/" })} className="flex items-center justify-center gap-2 w-full bg-gray-800 text-white p-2 rounded-md">
//           <FaGithub size={20} /> Continue with GitHub
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Page

















"use client";

import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await signIn("credentials", {
        ...formData,
        redirect: false,
      });

      if (!res?.ok || res.error) {
        toast.error("Invalid credentials");
        return;
      }

      toast.success("Logged in successfully");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);

  if (status === "loading") return null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-10 sm:px-6">
      <div className="w-full max-w-md animate-[fadeIn_0.4s_ease-out]">
        {/* Header */}
        <div className="mb-7 text-center">

          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Sign in to continue to your Pay-Gate account
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7">
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/10"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/10"
              />
            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-md hover:shadow-purple-600/10 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              or continue with
            </span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          {/* Social Login */}
          <div className="space-y-2.5">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white py-2.5 text-sm font-medium text-zinc-700 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.99]"
            >
              <FcGoogle size={19} />
              Continue with Google
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white py-2.5 text-sm font-medium text-zinc-700 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.99]"
            >
              <FaFacebook
                size={18}
                className="text-blue-600"
              />
              Continue with Facebook
            </button>

            <button
              type="button"
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white py-2.5 text-sm font-medium text-zinc-700 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.99]"
            >
              <FaGithub size={18} />
              Continue with GitHub
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/sign-up")}
              className="font-medium text-purple-600 transition-colors hover:text-purple-700"
            >
              Sign up
            </button>
          </p>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-400">
          By continuing, you agree to use Pay-Gate responsibly.
        </p>
      </div>
    </main>
  );
};

export default Page;