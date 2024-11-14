"use server"
import collections from "@/data/collection-pages"
import { getProduct } from "./product"

export async function getCollection(collectionId: string) {
  return collections.find((collection) => collection.id === collectionId)
}

export async function getCollectionProducts(collectionId: string) {
  const collection = await getCollection(collectionId)
  if (collection) {
    return collection.items.map(async (item: string) => await getProduct(item))
  }
  return []
}
