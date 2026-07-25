"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import {
  ShoppingBag,
  DollarSign,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MetricCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  timeframe: string
  icon: React.ElementType
}

const metrics: MetricCardProps[] = [
  {
    title: "Total Revenue",
    value: "$189,460.00",
    change: "+12.5%",
    isPositive: true,
    timeframe: "from last month",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "1,816",
    change: "+8.2%",
    isPositive: true,
    timeframe: "from last month",
    icon: ShoppingBag,
  },
  {
    title: "Active Customers",
    value: "3,420",
    change: "+18.4%",
    isPositive: true,
    timeframe: "from last month",
    icon: Users,
  },
  {
    title: "Avg. Conversion Rate",
    value: "3.24%",
    change: "-0.4%",
    isPositive: false,
    timeframe: "from last month",
    icon: TrendingUp,
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
}

export function PrimaryDetails() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <motion.div key={metric.title} variants={itemVariants}>
            <Card className="transition-all hover:border-muted-foreground/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className="flex size-8 items-center justify-center rounded-md border bg-muted/30">
                  <Icon className="size-4 text-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">
                  {metric.value}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs">
                  <Badge
                    variant={metric.isPositive ? "secondary" : "outline"}
                    className={`flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-medium ${
                      metric.isPositive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {metric.isPositive ? (
                      <ArrowUpRight className="size-3" />
                    ) : (
                      <ArrowDownRight className="size-3" />
                    )}
                    {metric.change}
                  </Badge>
                  <span className="text-muted-foreground">
                    {metric.timeframe}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
