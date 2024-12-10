"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { createSubscription } from "@/server/actions/transaction";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { getPlanByName } from "@/server/actions/plans";
import { SignInButton } from "@/components/signin-button";

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

  const validPlan = async (plan: string) => {
    const found = await getPlanByName(plan)
    return !!found
  }

  useEffect(() => {
    if (!validPlan(plan) || !priceInCents) {
      redirect("/pricing")
    }
  }, [plan, priceInCents])

  if (!session || session.status !== "authenticated")
    return <SignInButton callbackUrl={`/pricing?selectedPlan=${plan}`} buttonText={plan.toUpperCase()} />

  const onCheckout = async () => {
    console.log("CheckoutForm::onCheckout(): searching for plan", plan)
    const found = await getPlanByName(plan)
    console.log("CheckoutForm::onCheckout(): found plan", found)
    if (!found)
      redirect("/")
    const transaction = {
      plan,
      priceInCents: found.priceInCents,
      orderId: "",
      priceId: found.priceId || "",
      email: session.data.user?.email || ""
    };
    console.log("CheckoutForm::onCheckout(): creating transaction", transaction)

    await createSubscription(transaction);
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
