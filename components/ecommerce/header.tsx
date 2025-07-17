'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/cart-context'
import { useWishlist } from '@/contexts/wishlist-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  Store,
  User,
  Package,
  Settings
} from 'lucide-react'

export function Header() {
  const { getCartItemCount } = useCart()
  const { getWishlistCount } = useWishlist()
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const cartItemCount = getCartItemCount()
  const wishlistItemCount = getWishlistCount()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/deals', label: 'Deals' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6" />
            <span className="font-bold text-xl">ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/wishlist" className="relative">
              <Heart className="h-6 w-6" />
              {wishlistItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0"
                >
                  {wishlistItemCount}
                </Badge>
              )}
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>
            <Link href="/account" className="hidden md:block">
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm">
                <div className="p-6">
                  <Link href="/" className="flex items-center space-x-2 mb-8">
                    <Store className="h-6 w-6" />
                    <span className="font-bold text-xl">ShopHub</span>
                  </Link>
                  
                  {/* Search Bar - Mobile */}
                  <form onSubmit={handleSearch} className="relative mb-8">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-lg font-medium transition-colors hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t my-6" />

                  <div className="space-y-4">
                    <Link href="/account" className="flex items-center text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="mr-3 h-5 w-5" /> My Account
                    </Link>
                    <Link href="/orders" className="flex items-center text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      <Package className="mr-3 h-5 w-5" /> My Orders
                    </Link>
                    <Link href="/settings" className="flex items-center text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      <Settings className="mr-3 h-5 w-5" /> Settings
                    </Link>
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

