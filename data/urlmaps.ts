import products from "@/data/product-pages"
import collections from "@/data/collection-pages"

const aliases = [
  {
    slug: "/shop/",
    key: "home",
    type: "landing",
  },
  {
    slug: "/shop/checkout",
    key: "checkout",
    type: "checkout",
  },
  {
    slug: "/shop/thankyou",
    key: "thankyou",
    type: "thankyou",
  },
  {
    slug: "/shop/landing-2",
    key: "landing-2",
    type: "landing",
  }
]

products.forEach((product) => {
  aliases.push({
    slug: `/shop/${product.seoUrl}`,
    key: product.id,
    type: "product",
  })
  aliases.push({
    slug: `/shop/${product.id}`,
    key: product.id,
    type: "product",
  })
})



collections.forEach((collection) => {
  aliases.push({
    slug: `/shop/${collection.seoUrl}`,
    key: collection.id,
    type: "collection",
  })
  aliases.push({
    slug: `/shop/${collection.id}`,
    key: collection.id,
    type: "collection",
  })
  collection.items.forEach((item) => {
    const product = products.find((product) => product.id === item)
    if (product) {
      aliases.push({
        slug: `/shop/${collection.seoUrl}/${product.seoUrl}`,
        key: product.id,
        type: "product",
      })
      aliases.push({
        slug: `/shop/${collection.seoUrl}/${product.id}`,
        key: product.id,
        type: "product",
      })
      aliases.push({
        slug: `/shop/${collection.id}/${product.id}`,
        key: product.id,
        type: "product",
      })
      aliases.push({
        slug: `/shop/${collection.id}/${product.seoUrl}`,
        key: product.id,
        type: "product",
      })
    }
  })
})

export default aliases
