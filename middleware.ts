import { auth } from "@/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

// Protected pages!
export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/shop/checkout",
    "/shop/checkout/:path*"

  ],
};
