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
                className="flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm transition hover:bg-gray-50"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
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
            <>
              <Link
                href="/sign-in"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Sign in
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
              >
                Get Started
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