import { MetadataRoute } from "next"

import urlAliases from "@/data/urlmaps"

export default function sitemap(): MetadataRoute.Sitemap {
  // Google's limit is 50,000 URLs per sitemap
  return urlAliases.map((alias) => ({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${alias.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
    images: ['https://example.com/image.jpg'],
  }))
}
