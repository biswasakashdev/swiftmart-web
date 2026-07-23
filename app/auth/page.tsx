"use client"
import React, { useState } from "react"
import { AnimatePresence, Variants } from "framer-motion"
import { Navbar } from "@/components/home/navbar"
import { SignInForm } from "@/components/auth/singin-form"
import { SignUpForm } from "@/components/auth/signup-form"
import { SocialAuth } from "@/components/auth/social-auth"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const formTransition: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: 10, transition: { duration: 0.15 } },
}

export const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")

  const toggleAuthMode = () => {
    setAuthMode((prev) => (prev === "signin" ? "signup" : "signin"))
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-background text-foreground antialiased">
      {/* 1. Header */}
      <Navbar />

      {/* 2. Main Authentication Container */}
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-110 shadow-sm">
          <CardHeader className="space-y-1 pb-4 text-left">
            <CardTitle className="text-xl font-semibold">
              {authMode === "signin"
                ? "Login to instance"
                : "Create merchant seat"}
            </CardTitle>
            <CardDescription className="text-xs">
              {authMode === "signin"
                ? "New to the ecosystem?"
                : "Already mapped your handles?"}{" "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="cursor-pointer font-medium text-foreground underline underline-offset-4 focus:outline-none"
              >
                {authMode === "signin" ? "Join" : "Sign in"}
              </button>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              {authMode === "signin" ? (
                <SignInForm variants={formTransition} />
              ) : (
                <SignUpForm variants={formTransition} />
              )}
            </AnimatePresence>

            <SocialAuth />
          </CardContent>
        </Card>
      </main>

      {/* 3. Footer */}
      <footer className="w-full border-t bg-background py-4 text-center font-mono text-[10px] text-muted-foreground">
        Instance access logs are bound by token security handshakes.
      </footer>
    </div>
  )
}

export default AuthPage
