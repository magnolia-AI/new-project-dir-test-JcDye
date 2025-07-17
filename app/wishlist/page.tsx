'use client'

import { useWishlist } from '@/contexts/wishlist-context'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Product } from '@/types/ecommerce'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-6">
              Save items you love to your wishlist and come back to them later.
            </p>
            <Link href="/products">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Discover Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
              <p className="text-muted-foreground mt-2">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            {wishlist.length > 0 && (
              <Button
                variant="outline"
                onClick={clearWishlist}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative">
                  <Link href={`/product/${item.product.id}`}>
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={400}
                      height={400}
                      className="object-cover w-full h-64 group-hover:scale-105 transition-transform"
                    />
                  </Link>
                  {item.product.originalPrice && (
                    <Badge
                      variant="destructive"
                      className="absolute top-3 left-3"
                    >
                      SALE
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3"
                    onClick={() => removeFromWishlist(item.productId)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    <Link href={`/product/${item.product.id}`}>{item.product.name}</Link>
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(item.product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({item.product.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <p className="text-xl font-bold">
                      ${item.product.price.toFixed(2)}
                    </p>
                    {item.product.originalPrice && (
                      <p className="text-sm text-muted-foreground line-through">
                        ${item.product.originalPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(item.product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

