'use client'

import { useState } from 'react'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import { SearchFilters as SearchFiltersType } from '@/types/ecommerce'
import { categories } from '@/lib/sample-products'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'

interface SearchFiltersProps {
  filters: SearchFiltersType
  onFiltersChange: (filters: SearchFiltersType) => void
  resultCount?: number
}

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' }
]

const brands = ['Apple', 'Sony', 'Samsung', 'Nike', 'Adidas', 'EcoWear', 'TechFlow', 'LightCraft']

export function SearchFilters({ filters, onFiltersChange, resultCount }: SearchFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || 0,
    filters.maxPrice || 1000
  ])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const updateFilters = (updates: Partial<SearchFiltersType>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const clearFilters = () => {
    onFiltersChange({})
    setPriceRange([0, 1000])
  }

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value)
    updateFilters({
      minPrice: value[0],
      maxPrice: value[1]
    })
  }

  const toggleBrand = (brand: string) => {
    const currentBrands = filters.brands || []
    const updatedBrands = currentBrands.includes(brand)
      ? currentBrands.filter(b => b !== brand)
      : [...currentBrands, brand]
    
    updateFilters({ brands: updatedBrands })
  }

  const toggleTag = (tag: string) => {
    const currentTags = filters.tags || []
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag]
    
    updateFilters({ tags: updatedTags })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.category) count++
    if (filters.brands?.length) count += filters.brands.length
    if (filters.minPrice || filters.maxPrice) count++
    if (filters.rating) count++
    if (filters.inStock) count++
    if (filters.tags?.length) count += filters.tags.length
    return count
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-medium mb-3">Category</h3>
        <Select value={filters.category || ''} onValueChange={(value) => updateFilters({ category: value || undefined })}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            max={1000}
            min={0}
            step={10}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-medium mb-3">Brands</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands?.includes(brand) || false}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-medium mb-3">Minimum Rating</h3>
        <Select 
          value={filters.rating?.toString() || ''} 
          onValueChange={(value) => updateFilters({ rating: value ? parseInt(value) : undefined })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Rating</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="3">3+ Stars</SelectItem>
            <SelectItem value="2">2+ Stars</SelectItem>
            <SelectItem value="1">1+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Availability */}
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStock || false}
            onCheckedChange={(checked) => updateFilters({ inStock: checked as boolean })}
          />
          <label
            htmlFor="in-stock"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            In Stock Only
          </label>
        </div>
      </div>

      {/* Popular Tags */}
      <div>
        <h3 className="font-medium mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['premium', 'wireless', 'organic', 'fast', 'portable', 'sustainable'].map((tag) => (
            <Badge
              key={tag}
              variant={filters.tags?.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {getActiveFiltersCount() > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Search Bar and Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={filters.query || ''}
            onChange={(e) => updateFilters({ query: e.target.value })}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select 
            value={filters.sortBy || 'relevance'} 
            onValueChange={(value) => updateFilters({ sortBy: value as any })}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Mobile Filter Button */}
          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="sm:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              {categories.find(c => c.slug === filters.category)?.name}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ category: undefined })}
              />
            </Badge>
          )}
          
          {filters.brands?.map((brand) => (
            <Badge key={brand} variant="secondary" className="gap-1">
              {brand}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleBrand(brand)}
              />
            </Badge>
          ))}
          
          {(filters.minPrice || filters.maxPrice) && (
            <Badge variant="secondary" className="gap-1">
              ${filters.minPrice || 0} - ${filters.maxPrice || 1000}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ minPrice: undefined, maxPrice: undefined })}
              />
            </Badge>
          )}
          
          {filters.rating && (
            <Badge variant="secondary" className="gap-1">
              {filters.rating}+ Stars
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ rating: undefined })}
              />
            </Badge>
          )}
          
          {filters.inStock && (
            <Badge variant="secondary" className="gap-1">
              In Stock
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ inStock: undefined })}
              />
            </Badge>
          )}
          
          {filters.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleTag(tag)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Results Count */}
      {resultCount !== undefined && (
        <div className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? 'product' : 'products'} found
        </div>
      )}

      {/* Desktop Filters Sidebar */}
      <div className="hidden sm:block">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="border rounded-lg p-4">
              <FilterContent />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
