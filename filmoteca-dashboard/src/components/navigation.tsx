"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Film, Search, List, Star, Menu, Home, Tv, Settings } from "lucide-react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigationLinks = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/catalog", label: "Catálogo", icon: Tv },
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/playlists", label: "Listas", icon: List },
    { href: "/reviews", label: "Reseñas", icon: Star },
    { href: "/admin", label: "Admin", icon: Settings },
  ]

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">FilmLibrary</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors flex items-center space-x-1"
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/catalog">
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
              </Link>
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b">
                      <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                        <Film className="h-6 w-6 text-primary" />
                        <span className="text-lg font-bold">FilmLibrary</span>
                      </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 py-4">
                      <div className="space-y-2">
                        {navigationLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center space-x-3 px-3 py-2 rounded-md text-foreground hover:bg-muted transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <link.icon className="h-5 w-5" />
                            <span>{link.label}</span>
                          </Link>
                        ))}

                        {/* Search Link for Mobile */}
                        <Link
                          href="/catalog"
                          className="flex items-center space-x-3 px-3 py-2 rounded-md text-foreground hover:bg-muted transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Search className="h-5 w-5" />
                          <span>Buscar</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
