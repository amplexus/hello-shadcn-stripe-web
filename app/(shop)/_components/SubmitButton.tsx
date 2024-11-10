"use client"

// import { useformStatus } from "react-dom"

import { Button } from "@/components/ui/button"

export function SubmitButton() {
  // const { pending, data, method, action } = useFormStatus()

  return (
    <Button type="submit" className="w-full">
      Continue
    </Button>
  )
}
