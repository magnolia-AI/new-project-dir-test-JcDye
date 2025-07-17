'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { Product } from '@/types/ecommerce'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useCart } from '@/contexts/cart-context'
import { useWishlist } from '@/contexts/wishlist-context'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
  showQuickView?: boolean
}

export function ProductCard({ product, className, showQuickView = true }: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addToCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleImageHover = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1)
    }
  }

  const handleImageLeave = () => {
    setCurrentImageIndex(0)
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className={cn("group relative overflow-hidden transition-all duration-300 hover:shadow-lg", className)}>
      <div className="relative">
        {/* Product Image */}
        <div 
          className="relative aspect-square overflow-hidden bg-gray-100"
          onMouseEnter={handleImageHover}
          onMouseLeave={handleImageLeave}
        >
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-300 group-hover:scale-105",
              imageLoading ? "blur-sm" : "blur-0"
            )}
            onLoad={() => setImageLoading(false)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Loading skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {!product.inStock && (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="secondary">-{discountPercentage}%</Badge>
          )}
          {product.tags.includes('new') && (
            <Badge>New</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
          onClick={handleWishlistToggle}
        >
          <Heart 
            className={cn(
              "h-4 w-4 transition-colors",
              isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
            )} 
          />
        </Button>

        {/* Quick Actions */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!product.inStock || isInCart(product.id)}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
            </Button>
            
            {showQuickView && (
              <Button
                variant="secondary"
                size="sm"
                asChild
              >
                <Link href={`/products/${product.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Brand */}
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          
          {/* Product Name */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {product.inStock ? (
            <p className="text-sm text-green-600">
              {product.stockQuantity > 10 
                ? 'In Stock' 
                : `Only ${product.stockQuantity} left`
              }
            </p>
          ) : (
            <p className="text-sm text-red-600">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
