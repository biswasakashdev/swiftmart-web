import PasswordInputWithToggle from "@/components/password-toggle-input"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { countryCallingCodes } from "@/constants/number-codes"
import { motion, Variants } from "framer-motion"
import { Mail, Sparkles, User } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import OptionPicker from "../option-picker"
import { AuthMode } from "@/app/auth/page"
import { CardDescription } from "../ui/card"
import { signUp } from "@/app/auth/action"

export const SignUpForm = ({
  variants,
  updateFormError,
}: {
  variants: Variants
  updateAuthMode: (authMode: AuthMode) => void

  updateFormError: (formError: string | undefined) => void
}) => {
  const [formState, action, isLoading] = useActionState<SignUpForm, FormData>(
    signUp,
    { state: {}, errors: {} }
  )

  const [errors, setErrors] = useState<SignUpFormError>(formState.errors)

  const [prevStateError, setPrevStateError] = useState<SignUpFormError>(
    formState.errors
  )

  if (formState.errors !== prevStateError) {
    setErrors(formState.errors)
    setPrevStateError(formState.errors)
  }

  useEffect(() => {
    updateFormError(errors.err)
  }, [errors.err, updateFormError])

  return (
    <motion.form
      key="signup"
      initial="hidden"
      variants={variants}
      animate="visible"
      exit="exit"
      action={action}
      className="space-y-3.5"
    >
      {errors.err && <CardDescription>{errors.err}</CardDescription>}
      <FieldSet>
        {/* Name Inputs */}
        <Field className="space-y-1.5">
          <FieldLabel htmlFor="first-name">Full Name</FieldLabel>
          <div className="relative">
            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="fullName"
              id="full-name"
              type="text"
              required
              placeholder="John Dow"
              className="pl-9"
            />
          </div>
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </Field>

        <FieldGroup className="flex flex-row gap-2">
          <Field className="w-1/3">
            <FieldLabel htmlFor="country-code">Country Code</FieldLabel>
            <OptionPicker
              fieldName="countryCode"
              id="country-code"
              className="space-y-1.5"
              options={countryCallingCodes}
            />

            {errors.countryCode && (
              <FieldError>{errors.countryCode}</FieldError>
            )}
          </Field>

          <Field className="w-2/3">
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="9129367291"
              required
            />
          </Field>

          {errors.phone && <FieldError>{errors.phone}</FieldError>}
        </FieldGroup>

        {/* Email Input */}
        <Field className="space-y-1.5">
          <Label htmlFor="signup-email">Email address</Label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="signup-email"
              type="email"
              name="email"
              required
              placeholder="alex@example.com"
              className="pl-9"
            />
          </div>

          {errors.email && <FieldError>{errors.email}</FieldError>}
        </Field>

        {/* Password Inputs with Custom PasswordWithToggle */}
        <Field className="space-y-1.5">
          <Label htmlFor="signup-password">Password</Label>
          <PasswordInputWithToggle
            id="signup-password"
            required
            name="password"
            placeholder="Min. 8 parameters"
          />

          {errors.password && <FieldError>{errors.password}</FieldError>}
        </Field>

        <Field className="space-y-1.5">
          <Label htmlFor="signup-confirm-password">Confirm password</Label>
          <Input
            type="password"
            id="signup-confirm-password"
            required
            name="confirmPassword"
            placeholder="Repeat password"
          />

          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword}</FieldError>
          )}
        </Field>

        {/* Submit Button */}
        <Button disabled={isLoading} type="submit" className="w-full gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          <span>
            {isLoading ? <span>Signing up ...</span> : <span>Sign Up</span>}
          </span>
        </Button>
      </FieldSet>
    </motion.form>
  )
}

export interface SignUpForm {
  errors: SignUpFormError
  state: SignUpFormFields
}

export interface SignUpFormFields {
  email?: string
  name?: string
  password?: string
  confirmPassword?: string
  phone?: string
  countryCode?: string
}

export interface SignUpFormError {
  err?: string
  email?: string
  password?: string
  confirmPassword?: string
  name?: string
  phone?: string
  countryCode?: string
}
