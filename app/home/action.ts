import { getInstance } from "@/lib/graph-config"
import { Shop } from "@/types/shop.types"

export async function fetchShops(): Promise<Shop[]> {
  const query = `
    query FetchShops{
        shops{
            name,
            domain,
            role,
            status,
            revenue,
            ordersCount,
            productsCount 
        } 
    }  
    `

  const res = await getInstance(query)

  return res.data
}
