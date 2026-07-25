import { UserContextProvider } from "@/context/user.context"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <UserContextProvider>{children}</UserContextProvider>
}
