"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { CURRENCIES, Currency } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <NavBar />
          <main className="container mx-auto px-6 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}

function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            Assetly
          </Link>
          <div className="flex items-center space-x-4">
            <select
              className="block w-28 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Select currency"
            >
              {CURRENCIES.map((curr: Currency) => (
                <option key={curr.code} value={curr.code}>
                  {curr.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-8 border-t border-gray-200 dark:border-gray-700">
          <NavLink href="/" isActive={pathname === "/"}>
            Dashboard
          </NavLink>
          <NavLink href="/assets" isActive={pathname === "/assets"}>
            Assets
          </NavLink>
          <NavLink href="/liabilities" isActive={pathname === "/liabilities"}>
            Liabilities
          </NavLink>
          <NavLink href="/income" isActive={pathname === "/income"}>
            Income
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`py-4 text-sm font-medium transition-colors ${
        isActive
          ? "text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
