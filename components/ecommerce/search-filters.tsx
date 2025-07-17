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
  onFiltersChange: (filters: Partial<SearchFiltersType>) => void
  resultCount?: number
  tags: string[]
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

export function SearchFilters({ filters, onFiltersChange, resultCount, tags }: SearchFiltersProps) {
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

  const activeFilterCount = () => {
    let count = 0
    if (filters.category) count++
    if (filters.minPrice || filters.maxPrice) count++
    if (filters.brands && filters.brands.length > 0) count++
    if (filters.tags && filters.tags.length > 0) count++
    // if (filters.rating) count++
    if (filters.inStock) count++
    return count
  }

  const renderFilters = (isMobile: boolean = false) => (
    <div className="space-y-6">
      {/* Category Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h4 className="text-lg font-semibold">Category</h4>
          <ChevronDown className="w-5 h-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.id}>
                <Button
                  variant={filters.category === category.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => updateFilters({ category: category.id })}
                >
                  {category.name}
                </Button>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Price Range Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h4 className="text-lg font-semibold">Price Range</h4>
          <ChevronDown className="w-5 h-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Rating Filter */}
      {/* <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h4 className="text-lg font-semibold">Rating</h4>
          <ChevronDown className="w-5 h-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <Select
            // value={filters.rating?.toString() || ''}
            // onValueChange={(value) => updateFilters({ rating: value ? parseInt(value) : undefined })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select minimum rating" />
            </SelectTrigger>
            <SelectContent>
              {[4, 3, 2, 1].map(star => (
                <SelectItem key={star} value={star.toString()}>
                  {star} & up
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible> */}

      <Separator />

      {/* Brands Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h4 className="text-lg font-semibold">Brands</h4>
          <ChevronDown className="w-5 h-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-2">
            {brands.map(brand => (
              <div key={brand} className="flex items-center">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands?.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                />
                <label htmlFor={`brand-${brand}`} className="ml-2 text-sm">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Tags Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h4 className="text-lg font-semibold">Tags</h4>
          <ChevronDown className="w-5 h-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge
                key={tag}
                variant={filters.tags?.includes(tag) ? 'default' : 'outline'}
                onClick={() => toggleTag(tag)}
                className="cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* In Stock Filter */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">In Stock Only</h4>
        <Checkbox
          checked={filters.inStock}
          onCheckedChange={(checked) => updateFilters({ inStock: !!checked })}
        />
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <aside className="hidden lg:block lg:w-72 xl:w-80 lg:flex-shrink-0">
        <div className="p-6 border-r border-border h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Filters</h3>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
          {renderFilters()}
        </div>
      </aside>

      {/* Mobile Filters */}
      <div className="lg:hidden mb-4">
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <Input
            placeholder="Search products..."
            // value={filters.query || ''}
            // onChange={(e) => updateFilters({ query: e.target.value })}
            className="flex-grow"
          />
          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="w-5 h-5 mr-2" />
                Filters
                {activeFilterCount() > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 rounded-full h-5 w-5 p-0 flex items-center justify-center">
                    {activeFilterCount()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-sm">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="p-4 overflow-y-auto">
                {renderFilters(true)}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="p-4 flex flex-wrap gap-2 items-center">
          {filters.category && (
            <Badge variant="secondary">
              {categories.find(c => c.id === filters.category)?.name}
              <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => updateFilters({ category: undefined })} />
            </Badge>
          )}
          {/* {filters.rating && (
            <Badge variant="secondary">
              {filters.rating}+ Stars
              <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => updateFilters({ rating: undefined })} />
            </Badge>
          )} */}
          {filters.brands?.map(brand => (
            <Badge key={brand} variant="secondary">
              {brand}
              <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleBrand(brand)} />
            </Badge>
          ))}
          {filters.tags?.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
              <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleTag(tag)} />
            </Badge>
          ))}
          {activeFilterCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

