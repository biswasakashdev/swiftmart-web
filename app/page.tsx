import React from "react"
import { Navbar } from "@/components/home/navbar"
import { HeroSection } from "@/components/home/hero-section"
import { PromptDemo } from "@/components/home/prompt-demo"
import { FeaturesSection } from "@/components/home/features-section"
import { SwiftmartLogo } from "@/components/swiftmart-logo"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PromptDemo />
        <FeaturesSection />
      </main>
      <footer className="border-t bg-background py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
          <SwiftmartLogo />
          <p>
            © {new Date().getFullYear()} Swiftmart Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
