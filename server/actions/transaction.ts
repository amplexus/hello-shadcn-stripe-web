"use server"
import { redirect } from 'next/navigation'
import Stripe from "stripe";
import { v4 as uuid } from 'uuid';

export declare type CheckoutTransactionParams = {
  plan: string;
  priceInCents: number;
  orderId: string;
  buyerId: string;
  stripeSessionId?: string;
  createdAt?: Date;
};

export async function create(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(transaction.priceInCents);

  // TODO: Create a pending order in your db so you have an order id to pass to stripe
  const orderId = uuid(); // Let's generate a fake one for now...

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'aud',
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          }
        },
        quantity: 1
      }
    ],
    metadata: {
      plan: transaction.plan,
      buyerId: transaction.buyerId,
      orderId: orderId,
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/shop/thankyou?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  })

  redirect(session.url!)
}

export async function complete(transaction: CheckoutTransactionParams) {
  console.log("Confirmed transaction: ", transaction)
  // TODO: Save to DB
}

export async function get(sessionId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  console.log("get(): stripe session", session)
  return session.metadata
}
