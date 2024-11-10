import { CheckoutTransactionParams, complete } from '@/server/actions/transaction';
import { NextResponse } from 'next/server'

import Stripe from "stripe"
//import { Resend } from "resend"
//import PurchaseReceiptEmail from "@/email/PurchaseReceipt"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
// const resend = new Resend(process.env.NEXT_RESEND_API_KEY as string)

// Takes payment method type (e.g. card) and currency (e.g. AUD), creates a payment intent and returns the clientSecret value

export async function POST(req: Request) {
  const payload = await req.text()
  console.log('POST /api/stripe starts');
  const event = stripe.webhooks.constructEvent(
    payload,
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  )

  if (event.type === "charge.succeeded") {
    // console.log('POST /api/stripe charge.succeeded event', payload);
    // const charge = event.data.object
    //
    // const trans: CheckoutTransactionParams = {
    //   plan: "",
    //   priceInCents: 0,
    //   email: ""
    // }
    //
    // await complete(trans)
    //
    // await resend.emails.send({
    //   from: `Support <${process.env.NEXT_SENDER_EMAIL}>`,
    //   to: email,
    //   subject: "Order Confirmation",
    //   react: (
    //     <PurchaseReceiptEmail
    //       order= { order }
    //   />
    //   ),
    // })
    console.log('POST /api/stripe got charge.succeeded', event.type);
  } else if (event.type === "checkout.session.completed") {
    // Here, you would:
    // - update your local order db to indicate the order has been paid
    // - reconcile the payment with the sale in your accounting db
    // - update your inventory SOH
    // - trigger provisioning / delivery of the purchased product or service to fulfil the order
    // - send an email receipt to the customer

    const { id, amount_total, metadata } = event.data.object;

    const trans: CheckoutTransactionParams = {
      plan: metadata?.plan || "",
      priceInCents: amount_total ? amount_total : 0,
      email: metadata?.email || "",
      orderId: metadata?.orderId || "",
      stripeSessionId: id,
      createdAt: new Date(),
    }
    console.log('POST /api/stripe got checkout.session.completed', event.type);
    await complete(trans);

    return NextResponse.json({ message: "OK", transaction: trans });

  } else {
    console.log('POST /api/stripe ignoring event', event.type);
  }

  console.log('POST /api/stripe ends');
  return new NextResponse()
}


