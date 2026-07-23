"use client"

import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles, CheckCircle2 } from "lucide-react"

export const PromptDemo: React.FC = () => {
  return (
    <section className="border-y bg-muted/40 py-12">
      <div className="container max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-muted shadow-lg">
            <CardHeader className="text-center sm:text-left">
              <CardTitle className="text-xl">
                Interactive Prompt Preview
              </CardTitle>
              <CardDescription>
                Try typing a prompt to see what backend infrastructure gets
                provisioned automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  defaultValue="Build a luxury mechanical watch store with multi-currency checkout and recurring subscription options."
                  className="font-mono text-sm"
                  readOnly
                />
                <Button className="shrink-0 gap-2">
                  <Sparkles className="h-4 w-4" /> Generate Store
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-4">
                {[
                  "Auth & User Roles",
                  "Catalog & Inventory",
                  "Stripe / Payments",
                  "Order Fulfillment",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-md border bg-background p-3 text-xs font-medium text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
