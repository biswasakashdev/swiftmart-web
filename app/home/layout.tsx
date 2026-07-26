import { WorkspaceContextProvider } from "@/context/workspace.context"
import { fetchShops } from "./action"
import { Suspense } from "react"

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const shopsPromise = fetchShops()
  return (
    <Suspense>
      <WorkspaceContextProvider shopListPromise={shopsPromise}>
        {children}
      </WorkspaceContextProvider>
    </Suspense>
  )
}
