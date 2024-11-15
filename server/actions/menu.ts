"use server"
import siteMenu from "@/data/menu"

export async function getMenu(): Promise<typeof siteMenu> {
  return siteMenu
}

