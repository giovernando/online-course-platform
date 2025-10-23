"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/Button"
import toast from "react-hot-toast"

interface AddToWishlistButtonProps {
  courseId: string
  courseTitle: string
  isInWishlist?: boolean
  onWishlistChange?: (isInWishlist: boolean) => void
}

export default function AddToWishlistButton({
  courseId,
  courseTitle,
  isInWishlist = false,
  onWishlistChange
}: AddToWishlistButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [inWishlist, setInWishlist] = useState(isInWishlist)

  const handleToggleWishlist = async () => {
    setIsLoading(true)

    try {
      if (inWishlist) {
        // Remove from wishlist
        const response = await fetch(`/api/wishlist?courseId=${courseId}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          setInWishlist(false)
          onWishlistChange?.(false)
          toast.success(`"${courseTitle}" dihapus dari wishlist`)
          // Dispatch custom event to update wishlist badge
          window.dispatchEvent(new Event('wishlistUpdated'))
        } else {
          const error = await response.json()
          toast.error(error.error || "Gagal menghapus dari wishlist")
        }
      } else {
        // Add to wishlist
        const response = await fetch('/api/wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseId }),
        })

        if (response.ok) {
          setInWishlist(true)
          onWishlistChange?.(true)
          toast.success(`"${courseTitle}" ditambahkan ke wishlist`)
          // Dispatch custom event to update wishlist badge
          window.dispatchEvent(new Event('wishlistUpdated'))
        } else {
          const error = await response.json()
          toast.error(error.error || "Gagal menambahkan ke wishlist")
        }
      }
    } catch (error) {
      console.error('Wishlist error:', error)
      toast.error("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      className={`w-full ${inWishlist ? 'border-red-500 text-red-500 hover:bg-red-50' : ''}`}
      onClick={handleToggleWishlist}
      disabled={isLoading}
    >
      <Heart
        className={`w-4 h-4 mr-2 ${inWishlist ? 'fill-current' : ''}`}
      />
      {isLoading ? 'Memproses...' : inWishlist ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
    </Button>
  )
}
