import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider'
import { CartProvider } from '@/contexts/cart-context'
import { WishlistProvider } from '@/contexts/wishlist-context'
import { Header } from '@/components/ecommerce/header'
import { Footer } from '@/components/ecommerce/footer'

export const metadata: Metadata = {
  title: 'ShopHub - Modern E-commerce Store',
  description: 'Discover amazing products at unbeatable prices. Your one-stop destination for quality items with fast shipping and excellent customer service.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full flex flex-col antialiased">
        <ThemeProvider defaultTheme="light" attribute="class">
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

