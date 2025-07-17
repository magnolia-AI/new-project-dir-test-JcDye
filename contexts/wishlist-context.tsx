'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { Product, WishlistItem } from '@/types/ecommerce'
import { useToast } from '@/hooks/use-toast'

interface WishlistContextType {
  wishlist: WishlistItem[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  getWishlistCount: () => number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: { product: Product } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] }

const wishlistReducer = (state: WishlistItem[], action: WishlistAction): WishlistItem[] => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product } = action.payload
      
      // Check if item already exists
      const existingItem = state.find(item => item.productId === product.id)
      if (existingItem) {
        return state // Don't add duplicates
      }

      const newItem: WishlistItem = {
        id: `wishlist-${product.id}`,
        productId: product.id,
        product,
        addedAt: new Date()
      }

      return [...state, newItem]
    }

    case 'REMOVE_ITEM': {
      return state.filter(item => item.productId !== action.payload.productId)
    }

    case 'CLEAR_WISHLIST': {
      return []
    }

    case 'LOAD_WISHLIST': {
      return action.payload
    }

    default:
      return state
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, [])
  const { toast } = useToast()

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('ecommerce-wishlist')
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist)
        dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist || [] })
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecommerce-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (product: Product) => {
    const existingItem = wishlist.find(item => item.productId === product.id)
    
    if (existingItem) {
      toast({
        title: "Already in Wishlist",
        description: "This item is already in your wishlist.",
      })
      return
    }

    dispatch({ type: 'ADD_ITEM', payload: { product } })
    
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
    
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
    
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some(item => item.productId === productId)
  }

  const getWishlistCount = (): number => {
    return wishlist.length
  }

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist,
      getWishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
