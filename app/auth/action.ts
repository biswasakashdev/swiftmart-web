"use server"

import { SESSION } from "@/lib/config"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signout() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION)
  redirect("/auth")
}
