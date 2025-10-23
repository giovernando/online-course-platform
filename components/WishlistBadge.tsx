"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Heart } from "lucide-react"

export function WishlistBadge() {
  const { data: session } = useSession()
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    if (session) {
      fetchWishlistCount()
    }
  }, [session])

  const fetchWishlistCount = async () => {
    try {
      const response = await fetch('/api/wishlist')
      if (response.ok) {
        const wishlistItems = await response.json()
        setWishlistCount(wishlistItems.length)
      }
    } catch (error) {
      console.error('Error fetching wishlist count:', error)
    }
  }

  // Listen for wishlist updates
  useEffect(() => {
    const handleWishlistUpdate = () => {
      if (session) {
        fetchWishlistCount()
      }
    }

    window.addEventListener('wishlistUpdated', handleWishlistUpdate)
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
  }, [session])

  if (!session || wishlistCount === 0) {
    return (
      <Link href="/wishlist" className="text-gray-700 hover:text-gray-900 p-2">
        <Heart className="h-5 w-5" />
      </Link>
    )
  }

  return (
    <Link href="/wishlist" className="relative text-gray-700 hover:text-gray-900 p-2">
      <Heart className="h-5 w-5" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {wishlistCount}
      </span>
    </Link>
  )
}
