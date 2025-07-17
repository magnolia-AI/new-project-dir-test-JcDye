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

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product: any) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  if (wishlist.items.length === 0) {
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
                {wishlist.items.length} {wishlist.items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            {wishlist.items.length > 0 && (
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
          {wishlist.items.map((item) => (
            <Card key={item.product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  
                  {/* Remove from Wishlist Button */}
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFromWishlist(item.product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  {/* Stock Badge */}
                  {item.product.stock === 0 && (
                    <Badge variant="destructive" className="absolute top-2 left-2">
                      Out of Stock
                    </Badge>
                  )}
                  {item.product.stock > 0 && item.product.stock <= 5 && (
                    <Badge variant="secondary" className="absolute top-2 left-2">
                      Low Stock
                    </Badge>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.product.brand}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({item.product.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">
                        ${item.product.price.toFixed(2)}
                      </span>
                      {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(item.product)}
                      disabled={item.product.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {item.product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => removeFromWishlist(item.product.id)}
                    >
                      <Heart className="w-4 h-4 mr-2 fill-current" />
                      Remove from Wishlist
                    </Button>
                  </div>

                  {/* Added Date */}
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Added {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        {wishlist.items.length > 0 && (
          <div className="mt-12 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    wishlist.items.forEach(item => {
                      if (item.product.stock > 0) {
                        addToCart(item.product)
                      }
                    })
                    clearWishlist()
                  }}
                >
                  Add All to Cart
                </Button>
                <Link href="/products">
                  <Button variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
