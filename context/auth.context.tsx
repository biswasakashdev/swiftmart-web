"use client"

import { Authorization, User } from "@/types/user.types"
import axios, { AxiosInstance } from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext<{
  user: User
  gpqlClient: AxiosInstance
  token: string
}>({
  user: {
    email: "",
    name: "",
    avatar: "",
  },
  gpqlClient: axios,
  token: "",
})

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [authorization, setAuthorization] = useState<Authorization | undefined>(
    undefined
  )

  useEffect(() => {
    const fetchAuthorization = async () => {
      const res = await axios.get("/api/v1/auth")

      const { status, data } = res

      if (status === 200) {
        setAuthorization(data)
      }
    }

    fetchAuthorization()
  }, [])

  if (!authorization) {
    return
  }

  const instance = axios.create({
    baseURL: "http://localhost:9000",
  })

  return (
    <AuthContext.Provider
      value={{
        user: authorization.user,
        token: authorization.token,
        gpqlClient: instance,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => {
  return useContext(AuthContext)
}

export default useAuthContext
