export interface Authorization {
  user: User
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
