"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Menu, X, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

const navigation = [
  { name: "About", href: "/about" },
  { name: "What We Do", href: "/what-we-do" },
  { name: "Issues", href: "/issues" },
  { name: "Countries", href: "/countries" },
  { name: "Resources", href: "/resources" },
  { name: "News", href: "/news" },
]

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "ar", name: "العربية" },
  { code: "zh", name: "中文" },
  { code: "ru", name: "Русский" },
]

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("en")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <svg width="40" height="81" viewBox="0 0 60 122" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto">
              <path d="M29.07 61.73H0.0300293V90.77H29.07V61.73Z" fill="#0468B1"/>
              <path d="M7.40002 66.49V77.91C7.40002 83.91 10.4 86.2 14.4 86.2C18.6 86.2 21.73 83.78 21.73 77.82V66.49H19.16V78C19.16 82.26 17.29 84.16 14.45 84.16C11.85 84.16 9.93002 82.31 9.93002 78V66.49H7.40002Z" fill="white"/>
              <path d="M59.9 61.73H30.86V90.77H59.9V61.73Z" fill="#0468B1"/>
              <path d="M40.46 86V77.67C40.46 74.44 40.46 72.11 40.29 69.67H40.38C41.4463 71.8926 42.6555 74.0438 44 76.11L50.13 86H52.66V66.56H50.31V74.7C50.31 77.7 50.31 80.05 50.59 82.64H50.5C49.5009 80.4608 48.348 78.3555 47.05 76.34L40.87 66.53H38.11V86H40.46Z" fill="white"/>
              <path d="M59.9 92.55H30.86V121.59H59.9V92.55Z" fill="#0468B1"/>
              <path d="M50.29 98.79C49.13 97.79 47.29 97.18 44.85 97.18C43.2377 97.1631 41.6274 97.2971 40.04 97.58V116.71H42.54V109C43.1982 109.132 43.8691 109.189 44.54 109.17C45.6256 109.231 46.7123 109.07 47.7336 108.697C48.7549 108.324 49.6894 107.746 50.48 107C51.0024 106.446 51.4066 105.792 51.6679 105.076C51.9293 104.361 52.0423 103.6 52 102.84C52.0182 102.089 51.8739 101.342 51.577 100.652C51.2802 99.9618 50.8378 99.3436 50.28 98.84" fill="white"/>
              <path d="M44.62 107.22C43.9212 107.236 43.223 107.169 42.54 107.02V99.48C43.3192 99.3435 44.109 99.2766 44.9 99.28C47.66 99.28 49.48 100.51 49.48 103.11C49.48 105.71 47.66 107.22 44.62 107.22Z" fill="#0468B1"/>
              <path d="M29.04 92.58H0V121.62H29.04V92.58Z" fill="#0468B1"/>
              <path d="M20.42 99.54C18.72 97.96 16.16 97.15 12.57 97.15C10.7759 97.1524 8.98448 97.2861 7.20996 97.55V116.63C8.73037 116.801 10.2602 116.874 11.79 116.85C15.56 116.85 18.55 115.85 20.39 114.07C21.3321 113.061 22.064 111.875 22.543 110.58C23.022 109.286 23.2385 107.909 23.18 106.53C23.2577 105.233 23.0509 103.934 22.5742 102.725C22.0974 101.516 21.3622 100.425 20.42 99.53" fill="white"/>
              <path d="M12.28 114.85C11.4348 114.879 10.5887 114.839 9.75 114.73V99.4C10.7146 99.2089 11.6968 99.1217 12.68 99.14C17.97 99.14 20.57 101.99 20.54 106.62C20.54 111.85 17.63 114.87 12.28 114.85Z" fill="#0468B1"/>
              <path d="M59.93 0H0.0300293V59.91H59.93V0Z" fill="#0468B1"/>
              <path d="M30 11.53C22.5 11.53 15.6 15.6 12.5 22C9.5 28.4 10.5 36 15 41.5C19.5 47 26.5 49.5 33.5 48C40.5 46.5 46 41 48 34C50 27 48 19.5 43 14C39.5 12 35 11.53 30 11.53Z" fill="white"/>
            </svg>
            <span className="sr-only">UNDP - United Nations Development Programme</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {searchOpen ? (
              <div className="hidden items-center gap-2 lg:flex">
                <input
                  type="search"
                  placeholder="Search..."
                  className="h-9 w-64 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden gap-1 lg:flex">
                  <Globe className="h-4 w-4" />
                  <span className="uppercase">{currentLang}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={currentLang === lang.code ? "bg-muted" : ""}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm">
                <div className="flex flex-col gap-6 pt-6">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="search"
                      placeholder="Search..."
                      className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-1">
                    {navigation.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          className="rounded-md px-4 py-3 text-lg font-semibold text-foreground transition-colors hover:bg-muted"
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  {/* Mobile Language */}
                  <div className="border-t pt-4">
                    <p className="mb-2 px-4 text-sm font-medium text-muted-foreground">Language</p>
                    <div className="grid grid-cols-2 gap-2 px-4">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setCurrentLang(lang.code)}
                          className={`rounded-md px-3 py-2 text-sm ${
                            currentLang === lang.code
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground hover:bg-muted/80"
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
