"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className=""
          aria-label="Home"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={50}
            priority
            className="h-auto object-contain"
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Session loading */}
          {status === "loading" ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-100" />
          ) : session ? (

            /* Logged in */
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-haspopup="menu"
                aria-label="Open account menu"
                className="flex items-center rounded-full bg-white shadow-sm transition p-1 hover:bg-gray-50"
              >
                {session.user?.avatar?.url ? (
                  <Image
                    src={session.user?.avatar?.url}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-700">
                    <User size={21} />
                  </span>
                )}
              </button>

              {open && (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+8px)] w-48 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl"
                >
                  <DropdownLink
                    href="/"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </DropdownLink>

                  <DropdownLink
                    href={`/creator/@${session.user?.userName}`}
                    onClick={() => setOpen(false)}
                  >
                    Pay Gate
                  </DropdownLink>

                  <DropdownLink
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </DropdownLink>

                  <DropdownLink
                    href="/mail"
                    onClick={() => setOpen(false)}
                  >
                    Mail
                  </DropdownLink>

                  <div className="my-1 border-t border-gray-100" />

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>

          ) : (

            /* Logged out */
            /* Logged out */
            <>
              <Link
                href="/sign-in"
                className="group relative px-2 py-2 text-xs font-medium text-gray-600 transition-colors hover:text-gray-950 sm:text-sm"
              >
                Sign in
                <span className="absolute bottom-0 left-2 right-2 h-px origin-left scale-x-0 bg-purple-600 transition-transform duration-200 group-hover:scale-x-100" />
              </Link>

              <Link
                href="/sign-up"
                className="group flex items-center gap-1 px-2 py-2 text-xs font-semibold text-gray-900 transition-colors hover:text-purple-700 sm:gap-1.5 sm:text-sm"
              >
                Get Started
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

function DropdownLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      role="menuitem"
      className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-purple-50 hover:text-purple-700"
    >
      {children}
    </Link>
  );
}

export default Navbar;