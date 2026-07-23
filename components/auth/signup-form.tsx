import React, { useState } from "react"
import { motion, Variants } from "framer-motion"
import { Mail, Phone, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PasswordInputWithToggle from "@/components/password-toggle-input"

export const SignUpForm = ({variants}:{variants:Variants}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle registration logic
  }

  return (
    <motion.form
      key="signup"
      initial="hidden"
      variants={variants}
      animate="visible"
      exit="exit"
      onSubmit={handleSubmit}
      className="space-y-3.5"
    >
      {/* Name Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="first-name">First name</Label>
          <div className="relative">
            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="first-name"
              type="text"
              required
              placeholder="Alex"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="last-name">Last name</Label>
          <Input
            id="last-name"
            type="text"
            required
            placeholder="Rivera"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="space-y-1.5">
        <Label htmlFor="signup-email">Email address</Label>
        <div className="relative">
          <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="signup-email"
            type="email"
            required
            placeholder="alex@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Phone Input */}
      <div className="space-y-1.5">
        <Label htmlFor="signup-phone">Phone number</Label>
        <div className="relative">
          <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="signup-phone"
            type="tel"
            required
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Password Inputs with Custom PasswordWithToggle */}
      <div className="space-y-1.5">
        <Label htmlFor="signup-password">Password</Label>
        <PasswordInputWithToggle
          id="signup-password"
          required
          placeholder="Min. 8 parameters"
          value={formData.password}

          onChange={(e) => handleChange("password", e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-confirm-password">Confirm password</Label>
        <Input
          type="password"
          id="signup-confirm-password"
          required
          placeholder="Repeat password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full gap-1.5">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Generate Platform Account</span>
      </Button>
    </motion.form>
  )
}
