"use server"
import aliases from "@/data/urlmaps"

export async function getAlias(slug: string) {
  return aliases.find((alias) => alias.slug === slug)
}
