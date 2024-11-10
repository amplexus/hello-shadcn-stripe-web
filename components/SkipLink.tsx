import React from "react"
import Link from "next/link";

// components/SkipLink.js
const SkipLink = () => {
  return (
    <Link href="#main-content"
      className="text-center bg-black text-white underline text-2xl sr-only focus:not-sr-only">
      Skip to main content
    </Link>
  )
}

export default SkipLink
