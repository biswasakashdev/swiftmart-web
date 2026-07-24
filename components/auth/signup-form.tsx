import PasswordInputWithToggle from "@/components/password-toggle-input"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { countryCallingCodes } from "@/constants/number-codes"
import { motion, Variants } from "framer-motion"
import { Mail, Sparkles, User } from "lucide-react"
import React, { useActionState, useState } from "react"
import OptionPicker from "../option-picker"
import { UserSchema } from "@/schemas/user.schema"

export const SignUpForm = ({ variants }: { variants: Variants }) => {
  const [errors, setErrors] = useState({})

  const [formState, action, isLoading] = useActionState<SignUpForm, FormData>(
    async (formState: SignUpForm, formData: FormData) => {
      // Handle registration logic here

      const userData = {
        phone: formData.get("phone")?.toString(),
        countryCode: formData.get("countryCode")?.toString(),
        email: formData.get("email")?.toString(),
        name: formData.get("fullName")?.toString(),
        password: formData.get("password")?.toString(),
        confirmPassword: formData.get("confirmPassword")?.toString(),
      }

      const result = UserSchema.safeParse(userData)

      const formError: SignUpFormError = {}

      if (result.error) {
        for (const iss of result.error.issues) {
          formError[iss.path[0] as keyof SignUpFormError] = iss.message
        }

        return {
          prevState: {
            ...userData,
          },
          errors: formError,
        }
      }

      const userDetails = result.data

      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/register`,
        {
          email: userDetails.email,
          password: userDetails.password,
          gender: userDetails.gender,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
        },
        {
          validateStatus: () => true,
        }
      )

      const { status, data } = res

      if (status === 201) {
        router.replace("/auth")
        return { prevState: {}, errors: {} }
      }

      const serverError: SignUpFormError = {
        error: data.error ? data.error : "Something went wrong.",
      }

      return {
        prevState: {
          ...userData,
        },
        errors: serverError,
      }
    },
    { prevState: {}, errors: {} }
  )

  const [errors, setErrors] = useState<SignUpFormError>(formState.errors)

  const [prevStateError, setPrevStateError] = useState<SignUpFormError>(
    formState.errors
  )

  if (formState.errors !== prevStateError) {
    setErrors(formState.errors)
    setPrevStateError(formState.errors)
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
      <FieldSet>
        {/* Name Inputs */}
        <Field className="space-y-1.5">
          <Label htmlFor="first-name">Full Name</Label>
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
        </Field>

        <FieldGroup className="flex flex-row gap-2">
          <Field className="w-1/3">
            <OptionPicker
              fieldName="countryCode"
              label="Country Code"
              className="space-y-1.5"
              options={countryCallingCodes}
            />
          </Field>

          <Field className="w-2/3">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="9129367291"
              required
            />
          </Field>
        </FieldGroup>

        {/* Email Input */}
        <div className="space-y-1.5">
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
        </div>

        {/* Password Inputs with Custom PasswordWithToggle */}
        <div className="space-y-1.5">
          <Label htmlFor="signup-password">Password</Label>
          <PasswordInputWithToggle
            id="signup-password"
            required
            name="password"
            placeholder="Min. 8 parameters"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-confirm-password">Confirm password</Label>
          <Input
            type="password"
            id="signup-confirm-password"
            required
            name="confirmPassword"
            placeholder="Repeat password"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Generate Platform Account</span>
        </Button>
      </FieldSet>
    </motion.form>
  )
}

export interface SignUpForm {
  errors: SignUpFormError
  prevState: SignUpFormFields
}

export interface SignUpFormFields {
  email?: string
  firstName?: string
  lastName?: string
  gender?: string
  password?: string
  confirmPassword?: string
}

export interface SignUpFormError {
  error?: string
  email?: string
  password?: string
  confirmPassword?: string
  gender?: string
  firstName?: string
  lastName?: string
}
