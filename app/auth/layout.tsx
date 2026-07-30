import { redirect } from "next/navigation"
import { fetchAuthorization } from "../action"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authorization = await fetchAuthorization()

  if (authorization) {
    redirect("/home", "push")
  }

  return <>{children}</>
}
