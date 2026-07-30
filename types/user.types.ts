import { AxiosInstance } from "axios"

export interface Authorization {
  user: User
  token: string
}

export interface User {
  name: string
  email: string
  avatar: string
}

export interface UserCredentials {
  email: string
  password: string
}

export interface UserDetails {
  email: string
  firstName: string
  lastName: string
  gender: string
  password: string
}
