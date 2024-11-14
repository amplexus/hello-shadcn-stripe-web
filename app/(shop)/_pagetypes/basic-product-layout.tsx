
import Image from "next/image"
import products from "@/data/product-pages"
import { formatCurrency } from "@/lib/currency"
import Link from "next/link"
import Rating from "../_components/rating"
import ProductImageCarousel from "../_components/product-image-carousel"

export async function ProductLayout({
  product }: { product: typeof products[number] | null }) {

  console.log("ProductLayout::product", product)
  if (!product) {
    console.log("ProductLayout::product is null")
    return null
  }

  return <>
    <section className="container py-8 md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <ProductImageCarousel product={product} />
            <hr className="my-6 border-gray-200 dark:border-gray-800" />
            <div className="flex justify-center">
              {/* Customer reviews for this product */}
            </div>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="font-semibold text-gray-900 sm:text-2xl md:text-4xl dark:text-white">
              {product.name}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {formatCurrency(product.priceExTax * 1.1)}
              </p>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Rating rating={5} />
                <p
                  className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                >
                  (5.0)
                </p>
                <Link
                  href="#"
                  className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                >
                  345 Reviews
                </Link>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              {/* <AddToCartFormButton size="lg" product={product} /> */}
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            {/* <div className="mb-6 text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: product.richTextDescription }}></div> */}
            <div className="mb-6 text-gray-500 dark:text-gray-400">{product.seoDescription}</div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            {/* <ProductsVariantsPanel product={product} /> */}

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            {/* <AddonProductsPanel /> */}

          </div>
        </div>
      </div>
    </section>
  </>
}
