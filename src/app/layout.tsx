"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { CURRENCIES, Currency } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFinancialStore } from "@/lib/store";

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
  const { currency, setCurrency, isDemoMode, setDemoMode } =
    useFinancialStore();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer hover:opacity-80"
          >
            <Image
              src="/header-banner.png"
              alt="Assetly"
              height={32}
              width={120}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
          <div className="flex items-center space-x-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDemoMode}
                onChange={(e) => setDemoMode(e.target.checked)}
                className="sr-only peer"
              />
              <div
                className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer 
                peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800
                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 
                after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500
                after:shadow-sm"
              ></div>
              <span className="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Demo
              </span>
            </label>
            <select
              className="block w-32 px-3 py-2 text-sm bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 
                rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 
                dark:focus:ring-emerald-400 focus:border-transparent appearance-none 
                cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors
                text-center font-medium"
              aria-label="Select currency"
              value={currency.code}
              onChange={(e) => {
                const newCurrency = CURRENCIES.find(
                  (c) => c.code === e.target.value
                );
                if (newCurrency) {
                  setCurrency(newCurrency);
                }
              }}
            >
              {[
                ...CURRENCIES.filter((c) => c.code === "GBP"),
                ...CURRENCIES.filter((c) => c.code === "AUD"),
                ...CURRENCIES.filter((c) => !["GBP", "AUD"].includes(c.code)),
              ].map((curr: Currency) => (
                <option
                  key={curr.code}
                  value={curr.code}
                  className="text-center font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {curr.code} - {curr.symbol}
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
