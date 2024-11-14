"use server"
import products from "@/data/product-pages"

export async function getProduct(productId: string): Promise<typeof products[number] | null> {
  const product = products.find((product) => product.id === productId)
  if (!product) {
    return null
  }
  return product
}
