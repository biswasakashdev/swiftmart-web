export interface Shop {
  id: string
  name: string
  domain: string
  role: "Owner" | "Admin" | "Member"
  status: "Active" | "Maintenance" | "Draft"
  revenue: string
  ordersCount: number
  productsCount: number
}
