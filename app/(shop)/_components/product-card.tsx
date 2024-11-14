"use server"
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
import { formatCurrency } from "@/lib/currency";
// import { AddToCartButton } from "./add-to-cart-button";
import products from "@/data/product-pages"
import collections from "@/data/collection-pages"

export async function ProductCard({ collection, product }: { collection: typeof collections[number]; product: typeof products[number] }) {
  // console.log("ProductCard(): product", product)
  return (
    <Card className="flex flex-col justify-between mx-auto">
      <CardHeader className="flex-row gap-4 items-center">
        <Link href={`${collection.seoUrl}/${product.seoUrl}`}>
          <div>
            <CardTitle className="uppercase">{product.name}</CardTitle>
            <CardDescription className="line-clamp-3 mt-3">
              {/* <div dangerouslySetInnerHTML= */}
              {/*   {{ __html: product.richTextDescription }}> */}
              {/* </div> */}
              {product.seoDescription}
            </CardDescription>
          </div>
        </Link>
      </CardHeader>
      <CardContent>
        <Link href={`${collection.seoUrl}/${product.seoUrl}`}>
          <Image className="mx-auto"
            src={product.mainImage}
            alt={product.name}
            // priority={true}
            loading="lazy"
            width={400}
            height={400}
          />
        </Link>

      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <AddToCartButton product={product} size="sm" /> */}
        <Link className="text-2xl font-bold" href={`${collection.seoUrl}/${product.seoUrl}`}>
          {formatCurrency(product.priceExTax * 1.1)}
        </Link>
      </CardFooter>
    </Card>
  )
}

ProductCard.displayName = "ProductCard"

