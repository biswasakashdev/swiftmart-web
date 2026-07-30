import { AuthContextProvider } from "@/context/auth.context"

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
