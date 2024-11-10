"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { create } from "@/server/actions/transaction";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { SUBSCRIPTION_TIERS } from "@/data/plans"
import { SignInButton } from "@/components/SignInButton";

const CheckoutForm = ({
  plan,
  priceInCents,
}: {
  plan: string;
  priceInCents: number;
}) => {

  const session = useSession()

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  const validPlan = (plan: string) => {
    const found = SUBSCRIPTION_TIERS.find(tier => tier.plan === plan)
    return !!found
  }
  if (!validPlan(plan) || !priceInCents) {
    redirect("/pricing")
  }

  if (!session || session.status !== "authenticated")
    return <SignInButton callbackUrl={`/pricing?selectedPlan=${plan}`} buttonText={plan.toUpperCase()} />

  const onCheckout = async () => {
    const transaction = {
      plan,
      priceInCents,
      orderId: "",
      buyerId: session.data.user?.email || ""
    };

    await create(transaction);
  };

  return (
    <form action={onCheckout}>
      <section>
        <Button
          type="submit"
          role="link"
          className="text-lg w-full rounded-lg"
        >
          {plan.toUpperCase()}
        </Button>
      </section>
    </form>
  );
};

export default CheckoutForm;
