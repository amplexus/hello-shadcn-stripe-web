"use client"
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

export function SignInButton({ callbackUrl, buttonText }: { callbackUrl?: string, buttonText?: string }) {
  return (
    <Button className="text-lg rounded-xl flex gap-2 w-full"
      onClick={() => signIn(undefined, { callbackUrl: callbackUrl ? callbackUrl : "/dashboard" })}>
      {buttonText ? buttonText : "Sign In"}<ArrowRightIcon className="size-5" />
    </Button>
  );
}


