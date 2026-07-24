"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SwiftmartLogo } from "@/components/swiftmart-logo"
import { usePathname } from "next/navigation"

export const Navbar = () => {
  const pathName = usePathname()

  return (
    <header className="sticky top-0 z-50 flex w-full justify-center border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <SwiftmartLogo />
        {pathName !== "/auth" && (
          <Button asChild variant="default" size="sm">
            <Link href="/auth">Log In</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
