export const SUBSCRIPTION_TIERS = [
  {
    name: "Free",
    plan: "free",
    href: "#",
    price: "Free",
    priceId: "",
    priceInCents: 0,
    description: "Best for personal use and for teams up to 10 users.",
    features: [
      "Up to 2 users",
      "Up to 2 GB storage",
      "Basic Support",
    ],
  },
  {
    name: "Basic",
    plan: "basic",
    priceId: process.env.STRIPE_SUBSCRIPTION_BASIC_PRICE_ID,
    href: "#",
    price: "$19/mo",
    priceInCents: 1900,
    description: "Best for medium scale businesses requiring some technical help.",
    features: [
      "Up to 10 users",
      "Up to 10 GB storage",
      "Business Hours Support",
    ],
  },
  {
    name: "Pro",
    plan: "pro",
    priceId: process.env.STRIPE_SUBSCRIPTION_PRO_PRICE_ID,
    href: "#",
    price: "$49/mo",
    priceInCents: 4900,
    description: "Best for medium scale businesses requiring some technical help.",
    features: [
      "Up to 100 users",
      "Up to 20 GB storage",
      "Extended Hours Support",
    ],
  },
  {
    name: "Corporate",
    plan: "corporate",
    priceId: process.env.STRIPE_SUBSCRIPTION_CORPORATE_PRICE_ID,
    href: "#",
    price: "$99/mo",
    priceInCents: 9900,
    description: "Perfect for large enterprise customers.",
    features: [
      "Unlimited users",
      "50 GB storage",
      "24/7 Support",
    ],
  },
]


