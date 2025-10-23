"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/Button"
import { ShoppingCart, Check } from "lucide-react"
import toast from "react-hot-toast"

interface AddToCartButtonProps {
  courseId: string
  courseTitle: string
  isEnrolled?: boolean
  price: number
}

export default function AddToCartButton({
  courseId,
  courseTitle,
  isEnrolled = false,
  price
}: AddToCartButtonProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isInCart, setIsInCart] = useState(false)

  const handleAddToCart = async () => {
    if (!session) {
      toast.error("Silakan login terlebih dahulu")
      return
    }

    if (isEnrolled) {
      toast.error("Anda sudah terdaftar di kursus ini")
      return
    }

    if (price === 0) {
      toast.error("Kursus gratis tidak perlu ditambahkan ke keranjang")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsInCart(true)
        toast.success(`"${courseTitle}" berhasil ditambahkan ke keranjang`)
      } else {
        toast.error(data.error || "Gagal menambahkan ke keranjang")
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Terjadi kesalahan saat menambahkan ke keranjang")
    } finally {
      setIsLoading(false)
    }
  }

  if (isEnrolled) {
    return (
      <Button disabled className="w-full">
        <Check className="w-4 h-4 mr-2" />
        Sudah Terdaftar
      </Button>
    )
  }

  if (price === 0) {
    return (
      <Button className="w-full">
        Kursus Gratis
      </Button>
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading || isInCart}
      className="w-full"
      variant="outline"
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Menambahkan...
        </div>
      ) : isInCart ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Di Keranjang
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Tambah ke Keranjang
        </>
      )}
    </Button>
  )
}
