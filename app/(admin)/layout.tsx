import type { Metadata } from "next";
import localFont from "next/font/local";
import NavBar from "./_components/navbar";
import NextAuthProvider from "@/providers/session";
import { ThemeProvider } from "@/providers/theme"
import "@/app/globals.css";
import { auth } from "@/auth";
import DynamicBreadcrumbs from "@/components/dynamic-breadcrumbs";
import SkipLink from "@/components/skip-link";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Demo App Admin Dashboard",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background min-h-screen`}
      >
        <SkipLink />
        <aside>
          <NavBar />
        </aside>
        <DynamicBreadcrumbs />
        <main id="main-content">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}

