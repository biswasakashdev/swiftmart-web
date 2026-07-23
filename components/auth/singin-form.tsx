import React, { useState } from "react"
import { motion, Variants } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PasswordInputWithToggle from "@/components/password-toggle-input"

export const SignInForm = ({ variants }: { variants: Variants }) => {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle authentication logic
  }

  return (
    <motion.form
      key="signin"
      initial="hidden"
      animate="visible"
      variants={variants}
      exit="exit"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Email / Phone Field */}
      <div className="space-y-1.5">
        <Label htmlFor="signin-identifier">Email or Phone</Label>
        <div className="relative">
          <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="signin-identifier"
            type="text"
            required
            placeholder="name@example.com"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="signin-password">Password</Label>
          <a
            href="#"
            className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            Forgot?
          </a>
        </div>
        <PasswordInputWithToggle
          id="signin-password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full gap-2">
        <span>Sign In to Cluster</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Button>
    </motion.form>
  )
}
