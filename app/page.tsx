'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductGrid } from '@/components/ecommerce/product-grid'
import { sampleProducts, categories } from '@/lib/sample-products'
import { ArrowRight, ShoppingBag, Heart, Truck, Shield, Headphones, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  // Get featured products (first 8 products)
  const featuredProducts = sampleProducts.slice(0, 8)
  
  // Get products on sale
  const saleProducts = sampleProducts.filter(product => 
    product.originalPrice && product.originalPrice > product.price
  ).slice(0, 4)

  // Get top-rated products
  const topRatedProducts = sampleProducts
    .filter(product => product.rating >= 4.5)
    .slice(0, 4)

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              🎉 Grand Opening Sale - Up to 50% Off
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl mb-6">
              Discover Amazing Products at{' '}
              <span className="text-primary">ShopHub</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your one-stop destination for quality products, unbeatable prices, and exceptional service. 
              Shop from thousands of items across all categories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="text-lg px-8">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Now
                </Button>
              </Link>
              <Link href="/deals">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  View Deals
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on orders over $50. Fast and reliable delivery.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">
                Your payment information is secure with SSL encryption.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Get help whenever you need it with our dedicated support team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">
              Explore our wide range of product categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
                  <CardContent className="p-0 text-center">
                    <div className="relative h-24 w-full group-hover:scale-110 transition-transform">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-sm p-4">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
              <p className="text-muted-foreground">
                Handpicked products just for you
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Sale Products */}
      {saleProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  🔥 Hot Deals
                </h2>
                <p className="text-muted-foreground">
                  Limited time offers you don't want to miss
                </p>
              </div>
              <Link href="/deals">
                <Button variant="outline">
                  View All Deals
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <ProductGrid products={saleProducts} />
          </div>
        </section>
      )}

      {/* Top Rated Products */}
      {topRatedProducts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  ⭐ Top Rated
                </h2>
                <p className="text-muted-foreground">
                  Customer favorites with excellent reviews
                </p>
              </div>
              <Link href="/products?sort=rating">
                <Button variant="outline">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <ProductGrid products={topRatedProducts} />
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Stay Updated</CardTitle>
              <p className="text-muted-foreground">
                Subscribe to our newsletter for exclusive deals and new product announcements
              </p>
            </CardHeader>
            <CardContent>
              <form className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-primary-foreground/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5K+</div>
              <div className="text-primary-foreground/80">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-primary-foreground/80">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99%</div>
              <div className="text-primary-foreground/80">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



