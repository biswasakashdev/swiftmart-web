"use server"

import { SERVER_URL, SESSION } from "@/lib/config"
import { UserCredentialSchema } from "@/schemas/user.schema"
import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignInForm, SignInFormError } from "@/components/auth/singin-form"
import { email } from "zod"

export async function signin(
  prevState: SignInForm,
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

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION)
  redirect("/auth")
}
