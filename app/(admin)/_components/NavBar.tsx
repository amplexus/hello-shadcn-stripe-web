"use client"
import Link from "next/link";
// import Logo from "./Logo";
import { useSession, signIn } from "next-auth/react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { SearchIcon, Globe2Icon, MenuIcon, LogOutIcon } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { usePathname } from "next/navigation";
import UserMenu from "@/components/UserMenu";

const MAIN_MENU = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
  },
]

export default function NavBar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950 shadow-xl">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2" prefetch={false}>
          <Globe2Icon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {MAIN_MENU.map((item) => {
            const isActive = item.href === pathname
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${isActive ? "text-gray-900 dark:text-gray-50" : ""}`}
                prefetch={false}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Search</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-4">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input type="search" placeholder="Search..." className="pl-8 w-full" />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
          <span>
            {session && session.user ?
              (<UserMenu />)
              :
              (<Button variant="ghost" onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}>Login</Button>)
            }
          </span>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <VisuallyHidden.Root>
                <SheetTitle>
                  Menu
                </SheetTitle>
                <SheetDescription>
                  Menu
                </SheetDescription>
              </VisuallyHidden.Root>
              <div className="grid gap-4 p-4">
                {MAIN_MENU.map((item) => {
                  const isActive = item.href === location.pathname
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${isActive ? "text-gray-900 dark:text-gray-50" : ""}`}
                      prefetch={false}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

