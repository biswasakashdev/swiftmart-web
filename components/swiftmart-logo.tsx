import React from "react"
import Link from "next/link" // or react-router-dom Link
import { Store } from "lucide-react"

interface SwiftmartLogoProps {
  className?: string
  iconOnly?: boolean
}

export const SwiftmartLogo: React.FC<SwiftmartLogoProps> = ({
  className = "",
  iconOnly = false,
}) => {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-bold tracking-tight text-foreground transition-opacity hover:opacity-90 ${className}`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <Store className="h-4 w-4" />
      </div>
      {!iconOnly && <span className="text-lg">Swiftmart</span>}
    </Link>
  )
}
