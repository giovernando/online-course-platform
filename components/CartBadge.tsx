"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export function CartBadge() {
  const { data: session } = useSession()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (session) {
      fetchCartCount()
    }
  }, [session])

  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const cartItems = await response.json()
        setCartCount(cartItems.length)
      }
    } catch (error) {
      console.error('Error fetching cart count:', error)
    }
  }

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      if (session) {
        fetchCartCount()
      }
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [session])

  if (!session || cartCount === 0) {
    return (
      <Link href="/cart" className="text-gray-700 hover:text-gray-900 p-2">
        <ShoppingCart className="h-5 w-5" />
      </Link>
    )
  }

  return (
    <Link href="/cart" className="relative text-gray-700 hover:text-gray-900 p-2">
      <ShoppingCart className="h-5 w-5" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {cartCount}
      </span>
    </Link>
  )
}
