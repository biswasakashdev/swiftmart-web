import type { NextConfig } from "next"

const API_URL = process.env.SERVER_URL || "http://localhost:9000"

const nextConfig: NextConfig = {
  async rewrites() {
    if (!process.env.NEXT_PUBLIC_SERVER_URL) {
      return [
        {
          source: "/backend/:path*",
          destination: `${API_URL}/:path*`,
        },
      ]
    }
    return []
  },
}

export default nextConfig
