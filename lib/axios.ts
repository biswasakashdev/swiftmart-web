// lib/api.ts
import axios from "axios"

export const graphqlClient = axios.create({
  baseURL: "http://localhost:8080/graphql",
  headers: {
    "Content-Type": "application/json",
  },
})
