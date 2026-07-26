import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "next-themes"
import { AuthContextProvider } from "@/context/auth.context"
import { fetchAuthorization } from "./action"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authorization = await fetchAuthorization()
  const headersList = await headers()

  const requestPath = headersList.get("x-pathname")

  if (authorization && requestPath && !requestPath.startsWith("/home")) {
    // If user logged in then redirect to dashboard.
    redirect("/home")
  } else if (!authorization && requestPath && requestPath.startsWith("/home")) {
    // If user not authenticated and tried to access secured endpoint.
    redirect("/auth", "replace")
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <AuthContextProvider authorization={authorization}>
              {children}
            </AuthContextProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
