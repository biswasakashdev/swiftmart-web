"use server"

import { SERVER_URL, SESSION } from "@/lib/config"
import { UserCredentialSchema, UserSchema } from "@/schemas/user.schema"
import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignInForm, SignInFormError } from "@/components/auth/singin-form"
import { SignUpForm, SignUpFormError } from "@/components/auth/signup-form"

export async function signIn(
  _prevState: SignInForm,
  formData: FormData
): Promise<SignInForm> {
  const formFields = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  }

  const result = UserCredentialSchema.safeParse(formFields)
  const rememberMe = formData.get("rememberMe") ? true : false

  if (result.error) {
    const formError: SignInFormError = {}
    for (const iss of result.error.issues) {
      formError[iss.path[0] as keyof SignInFormError] = iss.message
    }
    return {
      state: {
        email: formFields.email,
      },
      errors: formError,
    }
  }

  const res = await axios.post(`${SERVER_URL}/api/v1/auth`, result.data, {
    params: {
      rememberMe,
    },
    validateStatus: () => true,
  })

  const { data, status } = res

  if (status !== 201) {
    const err: SignInFormError = {
      err: data.error || "Something went wrong.",
    }
    return {
      state: {
        ...formFields,
        rememberMe,
      },
      errors: err,
    }
  }

  const cookieStore = await cookies()

  cookieStore.set(SESSION, data.token, {
    maxAge: data.maxAge,
  })

  redirect("/home")
}

export async function signout() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION)
  redirect("/auth")
}


export async function signUp (_state: SignUpForm, formData: FormData){
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
          state: {
            ...userData,
          },
          errors: formError,
        } as SignUpForm
      }

      const userDetails = result.data

      const res = await axios.post(
        `${SERVER_URL}/api/v1/auth/register`,
        {
          email: userDetails.email,
          password: userDetails.password,
          name: userDetails.name,
          phone: userDetails.phone,
          countryCode: userDetails.countryCode,
        },
        {
          validateStatus: () => true,
        }
      )

      const { status, data } = res

      if (status === 201) {
        redirect("/auth")
      }

      const serverError: SignUpFormError = {
        err: data.error || "Something went wrong.",
      }

      return {
        state: {
          ...userData,
        },
        errors: serverError,
      } as SignUpForm
    }
