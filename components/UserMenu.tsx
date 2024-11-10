"use client"

import { Key, CircleUser, LogIn, LogOut, UserRound, UserRoundPlus, ShoppingCart, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function UserMenu() {
  const { data: session } = useSession(); // Track the session state
  // console.log("UserMenu(): session", session)

  const handleSignout = () => {
    signOut({ callbackUrl: "/" })
  }

  const menuItems = [
    {
      "icon": <LayoutDashboard className="w-4 h-4 mr-2" />,
      "name": "Dashboard",
      "url": "/dashboard",
      "authenticated": true,
    },
    {
      "icon": <UserRoundPlus className="w-4 h-4 mr-2" />,
      "name": "Register",
      "url": "/register",
      // "onClick": () => signIn(),
      "authenticated": false
    },
    {
      "icon": <LogIn className="w-4 h-4 mr-2" />,
      "name": "Login",
      "url": "/login",
      // "onClick": () => signIn(),
      "authenticated": false
    },
    {
      "icon": <Key className="w-4 h-4 mr-2" />,
      "name": "Forgot Password",
      "url": "/forgotPassword",
      "authenticated": false
    },
    {
      "icon": <UserRound className="w-4 h-4 mr-2" />,
      "name": "Profile",
      "url": "/profile",
      "authenticated": true
    },
    {
      "icon": <ShoppingCart className="w-4 h-4 mr-2" />,
      "name": "Account",
      "url": "/account",
      "authenticated": true
    },
    // {
    //   "icon": <Key className="w-4 h-4 mr-2" />,
    //   "name": "Reset Password",
    //   "url": "/resetPassword",
    //   "authenticated": true
    // },
    {
      "icon": <LogOut className="w-4 h-4 mr-2" />,
      "name": "Logout",
      "url": "/logout",
      "onClick": () => handleSignout(),
      "authenticated": true
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuItems.map((item) => {
          if (session && item.authenticated) {
            return (
              <DropdownMenuItem key={item.name} asChild>
                {item.onClick ?
                  <Link onClick={item.onClick} href="#">{item.icon} {item.name}</Link>
                  :
                  <Link href={item.url}>{item.icon} {item.name}</Link>}
              </DropdownMenuItem>
            )
          } else if (!session && !item.authenticated) {

            return (
              <DropdownMenuItem key={item.name} asChild>
                <Link href={item.url}>{item.icon} {item.name}</Link>
              </DropdownMenuItem>
            )
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

