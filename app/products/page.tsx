'use client'

import { useState, useMemo } from 'react'
import { ProductGrid } from '@/components/ecommerce/product-grid'
import { SearchFilters } from '@/components/ecommerce/search-filters'
import { sampleProducts, categories } from '@/lib/sample-products'
import { Product, SearchFilters as SearchFiltersType } from '@/types/ecommerce'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Filter } from 'lucide-react'

export default function ProductsPage() {
  const [filters, setFilters] = useState<SearchFiltersType>({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    brands: [],
    minRating: 0,
    inStock: false,
    tags: [],
    sortBy: 'relevance'
  })

  const [isLoading, setIsLoading] = useState(false)

  // Filter and sort products based on current filters
  const filteredProducts = useMemo(() => {
    let filtered = [...sampleProducts]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category)
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    )

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => filters.brands.includes(product.brand))
    }

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.minRating)
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stockQuantity > 0)
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(product =>
        filters.tags.some(tag => product.tags.includes(tag))
      )
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        // relevance (default) - could be based on a combination of factors
        // for now, we'll just use the default order
        break
    }

    return filtered
  }, [filters])

  const handleFiltersChange = (newFilters: Partial<SearchFiltersType>) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setFilters(prev => ({ ...prev, ...newFilters }))
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <SearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            tags={[...new Set(sampleProducts.flatMap(p => p.tags))]}
          />
        </div>

        {/* Mobile Filters & Products */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Products</h1>
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SearchFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    tags={[...new Set(sampleProducts.flatMap(p => p.tags))]}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  )
}

