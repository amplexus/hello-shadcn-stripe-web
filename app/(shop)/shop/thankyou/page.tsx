"use client"
import { getSubscription } from "@/server/actions/transaction";
import { Metadata } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ThankyouPage = () => {
  const searchParams = useSearchParams()
  const session_id = searchParams.get("session_id")
  const [sessionMetadata, setSessionMetadata] = useState<Metadata | null>(null)

  console.log("SuccessPage: Session ID returned from stripe", session_id)
  useEffect(() => {
    const fetchCompletedOrder = async () => {
      if (!session_id) return

      console.log("Fetching session")
      setSessionMetadata(await getSubscription(session_id as string))
    }
    fetchCompletedOrder()
  }, [session_id])

  useEffect(() => {
    console.log("SuccessPage: sessionMetadata", sessionMetadata)
  }, [sessionMetadata])

  // useEffect(() => {
  //   console.log("SuccessPage: sessionMetadata", sessionMetadata)
  // }, [sessionMetadata])

  if (!session_id || !sessionMetadata) return <div>Transaction not found...</div>

  return (
    <div className="bg-muted/60
      min-h-screen 
      flex flex-col items-center justify-center text-center text-balance gap-8 px-4">
      <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">Order Placed!</h1>
      <p className="text-lg lg:text-3xl max-w-screen-xl">
        Thankyou for your order!
      </p>
      <p>Order: {sessionMetadata.orderId}</p>
      <p>Customer: {sessionMetadata.email}</p>
      <p>Plan: {sessionMetadata.plan}</p>
    </div>
  );
};

export default ThankyouPage;
