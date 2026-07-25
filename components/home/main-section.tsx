import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { ArrowUpRight, ExternalLink, Plus, Search, Store } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Variants } from "framer-motion"
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PrimaryDetails } from "./primary-details"

// --- Framer Motion Animations ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
}

export default function HomeMain() {
  return (
    <>
      <SidebarInset className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-lg font-semibold">Stores Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm">
              <Plus className="mr-2 size-4" />
              Create New Store
            </Button>
          </div>
        </header>

        {/* Main Dashboard Section */}
        <main className="p-6">
          <div className="flex flex-col gap-6">
            {/* 1. Add the Metrics Analytics Section Here */}
            <PrimaryDetails />

            {/* Search and Filters Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search stores or domains..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-3 py-1 font-normal">
                  Total Stores: {mockShops.length}
                </Badge>
              </div>
            </div>

            {/* Stores Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
            >
              {filteredShops.map((shop) => (
                <motion.div key={shop.id} variants={cardVariants}>
                  <Card className="flex h-full flex-col justify-between transition-all hover:border-muted-foreground/30 hover:shadow-sm">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg border bg-muted/40">
                          <Store className="size-5 text-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-medium">
                            {shop.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 text-xs">
                            {shop.domain}
                            <ExternalLink className="size-3" />
                          </CardDescription>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <MoreVertical className="size-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            Dashboard
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Store Settings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            Delete Store
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>

                    <CardContent className="space-y-4 py-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Role</span>
                        <Badge variant="secondary" className="font-normal">
                          {shop.role}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Status</span>
                        <Badge
                          variant={
                            shop.status === "Active" ? "default" : "outline"
                          }
                          className="font-normal"
                        >
                          {shop.status}
                        </Badge>
                      </div>

                      <Separator className="my-2" />

                      {/* Store Statistics */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-md border bg-muted/20 p-2">
                          <p className="text-[10px] text-muted-foreground uppercase">
                            Revenue
                          </p>
                          <p className="text-xs font-medium">{shop.revenue}</p>
                        </div>
                        <div className="rounded-md border bg-muted/20 p-2">
                          <p className="text-[10px] text-muted-foreground uppercase">
                            Orders
                          </p>
                          <p className="text-xs font-medium">
                            {shop.ordersCount}
                          </p>
                        </div>
                        <div className="rounded-md border bg-muted/20 p-2">
                          <p className="text-[10px] text-muted-foreground uppercase">
                            Products
                          </p>
                          <p className="text-xs font-medium">
                            {shop.productsCount}
                          </p>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-2">
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                        size="sm"
                      >
                        <span>Manage Store</span>
                        <ArrowUpRight className="size-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredShops.length === 0 && (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                  <Store className="size-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-sm font-semibold">No stores found</h3>

                {searc}
                <p className="mt-1 text-xs text-muted-foreground">
                  No matching stores were found for &quot;{searchQuery}
                  &ldquo;.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
