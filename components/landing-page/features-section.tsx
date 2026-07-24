"use client"
import React from "react"
import { motion } from "framer-motion"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ShieldCheck,
  PackageCheck,
  CreditCard,
  ShoppingBag,
} from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Instant Authentication",
    description:
      "Built-in session management, customer accounts, and secure auth flows out of the box.",
  },
  {
    icon: PackageCheck,
    title: "Product & Inventory Engine",
    description:
      "Manage variants, digital assets, stock updates, and catalog queries via simple APIs.",
  },
  {
    icon: CreditCard,
    title: "Seamless Payments",
    description:
      "Pre-integrated checkout workflows supporting webhooks, taxes, and global gateways.",
  },
  {
    icon: ShoppingBag,
    title: "Automated Orders",
    description:
      "Real-time order state tracking, customer receipts, and fulfillment pipeline hooks.",
  },
]

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Everything taken care of.
          </h2>
          <p className="mt-2 text-muted-foreground">
            Focus purely on your frontend design and customer experience.
            Swiftmart manages the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full border">
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="mt-1 text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
