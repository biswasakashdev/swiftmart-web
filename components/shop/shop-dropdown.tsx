"use client"

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "radix-ui/dropdown-menu"
import { SidebarMenuButton } from "../ui/sidebar"
import { CheckCircle2, ChevronsUpDown, Plus, Store } from "lucide-react"
import { usePathname } from "next/navigation"
import { Shop } from "@/app/home/page"

export default function ShopDropDown({
  selectedShopId,
  selectedShopName,
  selectedShopRole,
  shopList,
}: {
  selectedShopId: string
  selectedShopName: string
  selectedShopRole: string
  shopList: Shop[]
}) {
  const pathName = usePathname()

  const changeShopHandle = (shopId: string) => []

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Store className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{selectedShopName}</span>
            <span className="truncate text-xs text-muted-foreground">
              {selectedShopRole}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Switch Stores
        </DropdownMenuLabel>
        {shopList.map(({ id, name, role }) => (
          <DropdownMenuItem
            key={id}
            onClick={() => changeShopHandle(id)}
            className="cursor-pointer gap-2 p-2"
          >
            <div className="flex size-6 items-center justify-center rounded-sm border bg-background">
              <Store className="size-3.5" />
            </div>
            <div className="flex-1 text-xs">
              <p className="font-medium">{name}</p>
              <p className="text-muted-foreground">{role}</p>
            </div>
            {selectedShopId === id && (
              <CheckCircle2 className="size-3.5 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2 p-2">
          <div className="flex size-6 items-center justify-center rounded-md border bg-background">
            <Plus className="size-3.5" />
          </div>
          <span className="text-xs font-medium">Create New Store</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
