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
  id: string
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
  slug: string
  description?: string
  image?: string
  parentId?: string
  subcategories?: Category[]
  productCount: number
}

export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  brands: string[]
  rating: number
  inStock: boolean
  tags: string[]
}

export interface SearchFilters {
  query?: string
  category?: string
  subcategory?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  tags?: string[]
  sortBy?: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'popular'
}

export interface Order {
  id: string
  userId?: string
  items: CartItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: string
  trackingNumber?: string
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

export interface ShippingOption {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: number
}
