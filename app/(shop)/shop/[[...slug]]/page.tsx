import { auth } from "@/auth";
import { getAlias } from "@/server/actions/aliases";
import { getCollection } from "@/server/actions/collection";
import { getProduct } from "@/server/actions/product";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ProductLayout } from "@/components/pagetypes/basic-product-layout";
import { CollectionLayout } from "@/components/pagetypes/basic-collection-layout";

type PageProps = {
  params: Promise<{ slug: string[], objectType: string, objectKey: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ShopPage({ params, searchParams }: PageProps) {
  const session = await auth()
  const slug = (await params).slug
  let url = "/shop/"
  if (slug) {
    url = url + slug.join("/")
  }
  const alias = await getAlias(url)
  if (alias) {
    if (alias.type === 'product') {
      const product = await getProduct(alias.key)
      if (product) return <ProductLayout product={product} />
    } else if (alias.type = 'collection') {
      const collection = await getCollection(alias.key)
      if (collection) return <CollectionLayout collection={collection} />
    }
  };

  return (
    <div className="bg-muted/60
      min-h-screen 
      flex flex-col items-center justify-center text-center text-balance gap-8 px-4">
      <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">Welcome To The Shop!</h1>
      <p className="text-lg lg:text-3xl max-w-screen-xl">
        Hello {session?.user?.name || "unauthenticated user"} from the shop with url <code>{slug}</code>!
      </p>
    </div>
  );
};

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    // title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}
