import { ReactNode } from "react"
import { CheckIcon } from "lucide-react"

import CheckoutForm from "@/components/checkout-form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { cn } from "@/lib/utils"
import { auth } from "@/auth"
import { SUBSCRIPTION_TIERS } from "@/data/plans"
import { createSubscription } from "@/server/actions/transaction"
import { loadStripe } from "@stripe/stripe-js"

type SearchParams = Promise<{ selectedPlan: string | undefined }>

export default async function PricingPage(props: { searchParams: SearchParams }) {
  const session = await auth()
  const searchParams = await props.searchParams

  // In case the user selected a pricing plan while unauthenticated, they will redirect to login, then back to the pricing page
  // So rather than making them choose a pricing plan again, we continue them on in their checkout journey...
  if (session?.user && searchParams?.selectedPlan) {

    const foundPlan = SUBSCRIPTION_TIERS.find(tier => tier.plan === searchParams.selectedPlan)
    if (foundPlan) {

      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      const transaction = {
        plan: searchParams.selectedPlan,
        priceId: foundPlan.priceId,
        priceInCents: foundPlan.priceInCents,
        orderId: "",
        email: session.user.email || ""
      };
      await createSubscription(transaction);
    }
  }

  return (
    <div className="bg-muted/60 px-8 py-16">
      <h2 className="text-4xl text-center text-balance font-semibold mb-8">
        Enhance Your Productivity Today
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
        {SUBSCRIPTION_TIERS.map(tier => (
          <PricingCard key={tier.name} {...tier} />
        ))}
      </div>
    </div>
  )
}

function PricingCard({
  name,
  plan,
  priceInCents,
  description,
  features,
}: (typeof SUBSCRIPTION_TIERS)[number]) {
  const isMostPopular = name === "Standard"

  return (
    <Card
      className={cn(
        "relative shadow-none rounded-3xl overflow-hidden",
        isMostPopular ? "border-accent border-2" : "border-none"
      )}
    >
      {isMostPopular && (
        <div className="bg-accent text-accent-foreground absolute py-1 px-10 -right-8 top-24 rotate-45 origin-top-right">
          Most popular
        </div>
      )}
      <CardHeader>
        <div className={cn("text-accent-foreground font-semibold mb-8")}>{name}</div>
        <CardTitle className="text-xl font-bold">
          ${priceInCents / 100} /mo
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {name === "Free" ? (
          <Button className="text-lg w-full rounded-lg">
            FREE
          </Button>
        ) : (
          <CheckoutForm
            plan={plan}
            priceInCents={priceInCents}
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4 items-start">
        {features.map(feature => (
          <Feature key={feature} className="font-bold">{feature}</Feature>
        ))}
      </CardFooter>
    </Card>
  )
}

function Feature({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CheckIcon className="size-5 stroke-foreground bg-accent/25 rounded-full p-0.5" />
      <span>{children}</span>
    </div>
  )
}
