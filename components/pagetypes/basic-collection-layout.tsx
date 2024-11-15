
import Image from "next/image"
import collections from "@/data/collection-pages"
import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/product-card"
import { getCollectionProducts } from "@/server/actions/collection"

export async function CollectionLayout({ collection }: { collection: typeof collections[number] | null }) {

  console.log("CollectionLayout::collection", collection)
  if (!collection) {
    console.log("CollectionLayout::collection is null")
    return null
  }

  return <>
    <section className="container">
      {!collection.mainImage && (
        <h1 className="text-5xl uppercase font-bold my-8 text-center text-gray-800 dark:text-white">{collection.name}</h1>
      )}
      {collection.mainImage && (
        <div className="w-full h-96 relative mx-auto overflow-clip my-4">
          <Image className={cn("absolute w-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2")} alt={collection.name}
            src={collection.mainImage}
            style={{ objectFit: 'contain' }}
            sizes="800px"
            width={600} height={600}
          />
        </div>
      )}
      <ProductGrid collection={collection} />
    </section>
  </>
}

async function ProductGrid({ collection }: { collection: typeof collections[number] | null }) {

  if (!collection) {
    return <p>No collection found</p>
  } else if (!collection.items) {
    return <p>No products found</p>
  }

  const products = await getCollectionProducts(collection.id)
  // console.log("Fetched products: " + collection.products.length)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map(async (p) => {
        const prod = await p
        if (prod === null) return null
        return (
          <ProductCard collection={collection} product={prod} key={prod.id} />
        )
      })}
    </div>
  )
}
