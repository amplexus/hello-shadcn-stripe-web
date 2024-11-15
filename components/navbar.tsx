"use client"

import { forwardRef, useEffect, useState } from "react";

import Link from "next/link";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { usePathname } from "next/navigation";

import { useSession, signIn } from "next-auth/react";

import { SearchIcon, PhoneIcon, Globe2Icon, MenuIcon, LogOutIcon, ChevronRightIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { ThemeToggle } from "@/components/theme-toggle";
import UserMenu from "@/components/user-menu";

import { cn } from "@/lib/utils";
import { getMenu, MenuType } from "@/server/actions/menu"

export default function NavBar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [menu, setMenu] = useState<MenuType[]>([])

  useEffect(() => {
    const fetchMenu = async () => {
      setMenu(await getMenu())
    }
    fetchMenu()
  }, [])

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">

      {/* Mobile menu */}
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
            {menu.map((item) => {
              if (item.submenu && item.submenu.length > 0) {
                return (
                  <Collapsible key={item.name} className="grid">
                    <CollapsibleTrigger className="my-2 flex w-full items-center text-md [&[data-state=open]>svg]:rotate-90">
                      <span className="">{item.name} </span>
                      <ChevronRightIcon className="ml-auto h-4 w-4 transition-all" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col">
                      {item.submenu.map((subitem) => {
                        const isActive = subitem.href === pathname
                        return (
                          <SheetClose key={subitem.name} asChild>
                            <Link
                              key={subitem.name}
                              title={subitem.name}
                              href={"/shop/" + subitem.href}
                              className={`ml-4 my-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${isActive ? "text-gray-900 dark:text-gray-50" : ""}`}
                            >
                              {subitem.name}
                            </Link>
                          </SheetClose>
                        )
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                )
              } else {
                const isActive = item.href === pathname

                return (
                  <SheetClose key={item.name} asChild>
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${isActive ? "text-gray-900 dark:text-gray-50" : ""}`}
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                )
              }
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop menu */}
      <NavigationMenu orientation="horizontal" className="hidden container flex-col gap-6 text-md font-medium md:flex md:items-center md:gap-3 md:text-sm lg:gap-3">
        <NavigationMenuList>
          <NavigationMenuItem key="home">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Globe2Icon className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {menu.map((item) => {
            // const isActive = item.href === pathname

            if (item.submenu && item.submenu.length > 0) {
              return (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {item.submenu.map((subitem) => {
                        return (
                          <ListItem
                            key={subitem.name}
                            title={subitem.name}
                            href={"/shop/" + subitem.href}
                          >
                            {subitem.name}
                          </ListItem>
                        )
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            } else {
              return (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            }
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="ml-auto flex items-center gap-4">
        <div className="hidden items-center gap-2 text-sm font-medium md:flex">
          <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400">0409 123 456</span>
        </div>
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

      </div>
    </header >
  )
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  const pathname = usePathname()
  // const isActive = item.href === pathname
  //     className={`text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${isActive ? "text-gray-900 dark:text-gray-50" : ""}`}
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
