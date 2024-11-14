"use server"
import { redirect } from 'next/navigation'
import Stripe from "stripe";
import { v4 as uuid } from 'uuid';
import { Resend } from 'resend';
import OrderConfirmationEmailTemplate from '@/email/order-confirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export declare type CheckoutTransactionParams = {
  plan: string;
  priceInCents: number;
  orderId: string;
  email: string;
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
      email: transaction.email,
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

  // Send confirmation email
  const { data, error } = await resend.emails.send({
    from: process.env.SENDER_EMAIL || "sender@example.com",
    to: [transaction.email],
    subject: "We have received your order",
    react: OrderConfirmationEmailTemplate({ firstName: "John" }) as React.ReactElement,
  });
  console.log("Resend response: ", data, error)

  if (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function get(sessionId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  // console.log("get(): stripe session", session)
  return session.metadata
}
