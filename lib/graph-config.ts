// lib/api.ts
import axios from "axios"
import { SERVER_URL, SESSION } from "./config"
import { cookies } from "next/headers"

const instance = axios.create({
  baseURL: `${SERVER_URL}/api/v1/graphql`,
  headers: {
    "Content-Type": "application/json",
  },
})

export async function getInstance(query: string) {
  const cookieStore = await cookies()

  const cookie = cookieStore.get(SESSION)

  return instance.post("/", query, {
    headers: {
      Authorization: cookie?.value,
    },
  })
}
