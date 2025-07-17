'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { Cart, CartItem, Product, ProductVariant } from '@/types/ecommerce'
import { useToast } from '@/hooks/use-toast'

interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: string, variantId?: string) => boolean
  getCartItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; variant?: ProductVariant } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart }

const calculateCartTotals = (items: CartItem[]): Omit<Cart, 'items'> => {
  const subtotal = items.reduce((sum, item) => {
    const price = item.selectedVariant?.price || item.product.price
    return sum + (price * item.quantity)
  }, 0)
  
  const tax = subtotal * 0.08 // 8% tax rate
  const shipping = subtotal > 50 ? 0 : 9.99 // Free shipping over $50
  const total = subtotal + tax + shipping
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    total: Math.round(total * 100) / 100,
    itemCount
  }
}

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, variant } = action.payload
      const itemId = `${product.id}-${variant?.id || 'default'}`
      
      const existingItemIndex = state.items.findIndex(item => 
        item.id === itemId
      )

      let newItems: CartItem[]
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Add new item
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          product,
          quantity,
          selectedVariant: variant,
          addedAt: new Date()
        }
        newItems = [...state.items, newItem]
      }

      const totals = calculateCartTotals(newItems)
      return { items: newItems, ...totals }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.itemId)
      const totals = calculateCartTotals(newItems)
      return { items: newItems, ...totals }
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload
      
      if (quantity <= 0) {
        const newItems = state.items.filter(item => item.id !== itemId)
        const totals = calculateCartTotals(newItems)
        return { items: newItems, ...totals }
      }

      const newItems = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
      const totals = calculateCartTotals(newItems)
      return { items: newItems, ...totals }
    }

    case 'CLEAR_CART': {
      return {
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0,
        shipping: 0,
        itemCount: 0
      }
    }

    case 'LOAD_CART': {
      return action.payload
    }

    default:
      return state
  }
}

const initialCart: Cart = {
  items: [],
  total: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  itemCount: 0
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  const { toast } = useToast()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        // Recalculate totals in case of any changes
        const totals = calculateCartTotals(parsedCart.items || [])
        dispatch({ 
          type: 'LOAD_CART', 
          payload: { 
            items: parsedCart.items || [], 
            ...totals 
          } 
        })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecommerce-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive"
      })
      return
    }

    if (variant && !variant.inStock) {
      toast({
        title: "Variant Out of Stock",
        description: "This variant is currently out of stock.",
        variant: "destructive"
      })
      return
    }

    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, variant } })
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } })
    
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const isInCart = (productId: string, variantId?: string): boolean => {
    const itemId = `${productId}-${variantId || 'default'}`
    return cart.items.some(item => item.id === itemId)
  }

  const getCartItemCount = (): number => {
    return cart.itemCount
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
