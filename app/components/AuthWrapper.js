"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

export default function AuthWrapper({ children }) {
    return (
        <SessionProvider>
            <Toaster position="bottom left" />
            {children}
        </SessionProvider>
    )
}