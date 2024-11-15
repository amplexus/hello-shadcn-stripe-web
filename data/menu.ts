import collections from "@/data/collection-pages"

const siteMenu = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Plans",
    href: "/pricing",
  },
  {
    name: "Shop",
    href: "/shop",
    submenu: collections.map((c) => ({ name: c.name, href: c.seoUrl, thumbnail: c.thumbnail, description: c.seoTitle }))
  },
]

export default siteMenu
