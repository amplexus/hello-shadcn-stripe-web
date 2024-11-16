"use client"
import Link from "next/link";
// import Logo from "./Logo";
import { useSession, signIn } from "next-auth/react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { SearchIcon, Globe2Icon, MenuIcon, LogOutIcon, ChevronRightIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { usePathname } from "next/navigation";
import UserMenu from "@/components/user-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const MAIN_MENU = [
  {
    name: "Dashboard",
    href: "/dashboard",
    description: "Overview of your store",
  },
  {
    name: "Sales",
    href: "/dashboard/sales",
    description: "Sales and customer information",
    submenu: [
      { name: "Orders", href: "/dashboard/sales/orders", description: "Manage your orders" },
      { name: "Customers", href: "/dashboard/sales/customers", description: "Manage your customers" },
      { name: "Coupons", href: "/dashboard/sales/coupons", description: "Manage your coupons" },
      { name: "Returns", href: "/dashboard/sales/returns", description: "Manage your returns" },
    ]
  },
  {
    name: "Catalog",
    href: "/dashboard/catalog",
    submenu: [
      { name: "Products", href: "/dashboard/catalog/products", description: "Manage your products" },
      { name: "Collections", href: "/dashboard/catalog/collections", description: "Manage product collections" },
      { name: "Addons", href: "/dashboard/catalog/addons", description: "Manage product addons" },
      { name: "Attributes", href: "/dashboard/catalog/attributes", description: "Manage product attributes" },
      { name: "Variants", href: "/dashboard/catalog/variants", description: "Manage product variants" },
    ]
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    submenu: [
      { name: "Sales", href: "/dashboard/analytics/sales", description: "Sales and customer information" },
      { name: "Products", href: "/dashboard/analytics/products", description: "Product analytics" },
      { name: "Customers", href: "/dashboard/analytics/customers", description: "Customer analytics" },
      { name: "Landing Pages", href: "/dashboard/analytics/pages", description: "Landing page analytics" },
      { name: "Checkout", href: "/dashboard/analytics/checkout", description: "Checkout analytics" },
    ]
  },
  {
    name: "Settings",
    href: "/dashboard/customers",
    submenu: [
      { name: "Menu", href: "/dashboard/settings/menu", description: "Customise your site menu" },
      { name: "Landing Page", href: "/dashboard/settings/landing-page", description: "Manage your landing page experience" },
      { name: "Banners & Carousels", href: "/dashboard/settings/banners", description: "Manage your banners and carousels" },
      { name: "Alerts", href: "/dashboard/settings/alerts", description: "Manage pop-up alerts" },
      { name: "Site", href: "/dashboard/settings/site", description: "Manage your site settings" },
      { name: "Stripe", href: "/dashboard/settings/stripe", description: "Manage your Stripe settings" },
      { name: "Paypal", href: "/dashboard/settings/paypal", description: "Manage your PayPal settings" },
      { name: "Email", href: "/dashboard/settings/email", description: "Manage your email settings" },
      { name: "Facebook", href: "/dashboard/settings/facebook", description: "Manage your Facebook settings" },
      { name: "Google", href: "/dashboard/settings/google", description: "Manage your Google settings" },
      { name: "Dates", href: "/dashboard/settings/delivery-dates", description: "Manage when you deliver" },
      { name: "Locations", href: "/dashboard/settings/delivery-locations", description: "Manage where you deliver" },
      { name: "Checkout", href: "/dashboard/settings/checkout", description: "Customise the checkout experience" },
    ]
  },
]

export default function NavBar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950 shadow-xl">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">

        {/* Mobile navigation menu */}
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
                Admin Menu
              </SheetTitle>
              <SheetDescription>
                Admin Menu
              </SheetDescription>
            </VisuallyHidden.Root>
            <div className="grid gap-4 p-4">
              {MAIN_MENU.map((item) => {
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
            {MAIN_MENU.map((item) => {
              // const isActive = item.href === pathname

              if (item.submenu && item.submenu.length > 0) {
                return (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] lg:grid-cols-4 ">
                        {item.submenu.map((subitem) => {
                          return (
                            <ListItem
                              key={subitem.name}
                              title={subitem.name}
                              href={"/shop/" + subitem.href}
                            >
                              {subitem.description}
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
        </div>
      </div>
    </header>
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
