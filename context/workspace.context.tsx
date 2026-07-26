"use client"

import { Shop } from "@/types/shop.types"
import { createContext, use, useContext, useState } from "react"

const WorkspaceContext = createContext<WorkspaceContextType>({
  shopList: [],
})

export const WorkspaceContextProvider = ({
  shopListPromise,
  children,
}: {
  children: React.ReactNode
  shopListPromise: Promise<Shop[]>
}) => {
  const shopList = use(shopListPromise)
  const [data, setData] = useState<WorkspaceContextType>({
    shopList,
  })

  return (
    <WorkspaceContext.Provider value={data}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export interface WorkspaceContextType {
  shopList: Shop[]
}

export default function useShopContext() {
  return useContext(WorkspaceContext)
}
