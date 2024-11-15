"use server"
import siteMenu from "@/data/menu"

export type MenuType = typeof siteMenu[number]

export async function getMenu(): Promise<MenuType[]> {
  return siteMenu
}

