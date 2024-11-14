const collections = [
  {
    id: "collection-1",
    name: "Main Collection",
    thumbnail: "https://placehold.co/200",
    mainImage: "https://placehold.co/400x200",
    seoTitle: "Main Collection",
    seoDescription: "Default collection",
    seoUrl: "main",
    // blocks: [{
    //   id: "block-1",
    //   containers: [
    //     {
    //       containerType: "inline-size",
    //       containerQuery: "min-width: 768px",
    //       visible: true
    //     }
    //   ],
    //   contents: "This is a test",
    // }],
    items: ["product-1", "product-2", "product-3", "product-4"],
  },
  {
    id: "collection-2",
    name: "Secondary Collection",
    thumbnail: "https://placehold.co/200",
    mainImage: "https://placehold.co/400x200",
    seoTitle: "Secondary Collection",
    seoDescription: "Secondary collection",
    seoUrl: "another",
    // blocks: [],
    items: ["product-3", "product-4"],
  },
  {
    id: "collection-3",
    name: "Tertiary Collection",
    thumbnail: "https://placehold.co/200",
    mainImage: "https://placehold.co/400x200",
    seoTitle: "Tertiary Collection",
    seoDescription: "Tertiary collection",
    seoUrl: "more",
    // blocks: [],
    items: ["product-1", "product-2"],
  },
]

export default collections
