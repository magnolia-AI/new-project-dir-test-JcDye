export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory?: string
  brand: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockQuantity: number
  tags: string[]
  features: string[]
  specifications?: Record<string, string>
  variants?: ProductVariant[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  price?: number
  image?: string
  inStock: boolean
  stockQuantity: number
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedVariant?: ProductVariant
  addedAt: Date
}

export interface Cart {
  items: CartItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  itemCount: number
}

export interface WishlistItem {
  id: string
  productId: string
  product: Product
  addedAt: Date
}

export interface Review {
  id:string
  productId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  content: string
  helpful: number
  verified: boolean
  createdAt: Date
}


export interface Category {
  id: string
  name: string

  subcategory?: string
  minPrice?: number
  maxPrice?: number
  brands?: string[]
  tags?: string[]
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest'
  inStock?: boolean
  rating?: number
  query?: string

  slug: string
  description: string
  image: string
  productCount: number
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  rating?: number;
  query?: string;
  name: string
  slug: string
  parentId: string
  productCount: number
}


export interface SearchFilters {
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  brands?: string[]
  tags?: string[]
  sortBy?: string
  inStock?: boolean
  minRating?: number
}

