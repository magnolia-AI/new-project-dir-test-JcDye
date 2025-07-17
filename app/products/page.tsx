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
    sortBy: 'name'
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
      filtered = filtered.filter(product => product.stock > 0)
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
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [filters])

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setIsLoading(true)
    setFilters(newFilters)
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 1000,
      brands: [],
      minRating: 0,
      inStock: false,
      tags: [],
      sortBy: 'name'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-2">
            Discover our collection of {sampleProducts.length} amazing products
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              <SearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                categories={categories}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters & Search
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="p-6">
                    <SearchFilters
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                      categories={categories}
                      onClearFilters={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Results Summary */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {sampleProducts.length} products
                {filters.search && (
                  <span> for "{filters.search}"</span>
                )}
                {filters.category && (
                  <span> in {categories.find(c => c.id === filters.category)?.name}</span>
                )}
              </p>
              
              {(filters.search || filters.category || filters.brands.length > 0 || 
                filters.minRating > 0 || filters.inStock || filters.tags.length > 0 ||
                filters.minPrice > 0 || filters.maxPrice < 1000) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all filters
                </Button>
              )}
            </div>

            {/* Product Grid */}
            <ProductGrid products={filteredProducts} isLoading={isLoading} />

            {/* No Results Message */}
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
