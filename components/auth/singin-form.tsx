import React, { useActionState, useEffect, useState } from "react"
import { motion, Variants } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PasswordInputWithToggle from "@/components/password-toggle-input"
import { AuthMode } from "@/app/auth/page"
import { signin } from "@/app/auth/action"
import { Field, FieldError } from "@/components/ui/field"

export const SignInForm = ({
  variants,
  updateAuthMode,
  updateFormError,
}: {
  variants: Variants
  updateAuthMode: (authMode: AuthMode) => void
  updateFormError: (formError: string | undefined) => void
}) => {
  const [state, action, isLoading] = useActionState<SignInForm, FormData>(
    signin,
    {
      state: {},
      errors: {},
    }
  )

  const [errors, setErrors] = useState<SignInFormError>(state.errors)

  const [prevStateError, setPrevStateError] = useState<SignInFormError>(
    state.errors
  )

  if (state.errors !== prevStateError) {
    setErrors(state.errors)
    setPrevStateError(state.errors)
  }

  useEffect(() => {
    updateFormError(errors.err)
  }, [errors.err, updateFormError])

  return (
    <motion.form
      key="signin"
      initial="hidden"
      animate="visible"
      variants={variants}
      exit="exit"
      action={action}
      className="space-y-4"
    >
      {/* Email */}
      <Field className="space-y-1.5">
        <Label htmlFor="signin-email">Email</Label>
        <div className="relative">
          <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="signin-email"
            type="text"
            name="email"
            required
            defaultValue={state.state.email}
            placeholder="name@example.com"
            className="pl-9"
            onFocus={() =>
              setErrors((pre) => ({ ...pre, email: undefined, err: undefined }))
            }
          />
        </div>
        {errors.email && <FieldError>{errors.email}</FieldError>}
      </Field>

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
          name="password"
          required
          placeholder="••••••••"
          onFocus={() =>
            setErrors((pre) => ({
              ...pre,
              password: undefined,
              err: undefined,
            }))
          }
        />
        {errors.password && <FieldError>{errors.password}</FieldError>}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full gap-2">
        <span>{isLoading ? "Signing In ... " : "Sign In"}</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Button>
    </motion.form>
  )
}

export interface SignInForm {
  state: SignInFormFields
  errors: SignInFormError
}

export interface SignInFormFields {
  email?: string
  rememberMe?: boolean
}

export interface SignInFormError {
  err?: string
  email?: string
  password?: string
}
