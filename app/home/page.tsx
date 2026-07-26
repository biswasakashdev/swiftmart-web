"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import {
  Store,
  Plus,
  ChevronsUpDown,
  LayoutDashboard,
  Settings,
  CreditCard,
  Bell,
  HelpCircle,
  ExternalLink,
  Search,
  LogOut,
  MoreVertical,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import HomeMain from "@/components/home/main-section"
import { Shop } from "@/types/shop.types"

const mockShops: Shop[] = [
  //   {
  //     id: "shop-1",
  //     name: "Aether Apparel",
  //     domain: "aether.store.com",
  //     role: "Owner",
  //     status: "Active",
  //     revenue: "$42,850.00",
  //     ordersCount: 384,
  //     productsCount: 42,
  //   },
  //   {
  //     id: "shop-2",
  //     name: "Urban Pulse Tech",
  //     domain: "urbanpulse.io",
  //     role: "Owner",
  //     status: "Active",
  //     revenue: "$128,400.00",
  //     ordersCount: 1290,
  //     productsCount: 18,
  //   },
  //   {
  //     id: "shop-3",
  //     name: "Lumina Home & Decor",
  //     domain: "luminahome.co",
  //     role: "Admin",
  //     status: "Active",
  //     revenue: "$18,210.00",
  //     ordersCount: 142,
  //     productsCount: 95,
  //   },
  //   {
  //     id: "shop-4",
  //     name: "Botanica Organics",
  //     domain: "botanica-dev.store",
  //     role: "Member",
  //     status: "Draft",
  //     revenue: "$0.00",
  //     ordersCount: 0,
  //     productsCount: 6,
  //   },
]

const currentUser = {
  name: "Alex Morgan",
  email: "alex.morgan@dev.co",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
}

export default function DashboardPage() {
  const [selectedShop, setSelectedShop] = React.useState<Shop>(mockShops[0])
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredShops = mockShops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.domain.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Collapsible Sidebar */}

        {/* Main Content Area */}
        <HomeMain />
      </div>
    </SidebarProvider>
  )
}
