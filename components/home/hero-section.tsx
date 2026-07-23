"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container flex flex-col items-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 gap-1.5 px-3 py-1 text-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI-Powered Commerce Engine
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
        >
          Describe your storefront. <br />
          We handle the entire backend.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          Turn natural language prompts into a fully configured store. Swiftmart
          automatically provisions your authentication, product inventory, order
          routing, and checkout rails.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/auth">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Terminal className="h-4 w-4" /> View Docs
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
