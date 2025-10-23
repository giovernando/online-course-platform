import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Trash2, ShoppingCart } from "lucide-react"

async function getCartItems(userId: string) {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          instructor: {
            select: { name: true },
          },
        },
      },
    },
  })
  return cartItems
}

export default async function CartPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const cartItems = await getCartItems(session.user.id)
  const totalPrice = cartItems.reduce((total, item) => total + item.course.price, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-8 h-8" />
          Keranjang Belanja
        </h1>
        <p className="text-gray-600 mt-2">
          {cartItems.length} kursus dalam keranjang
        </p>
      </div>

      {cartItems.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Keranjang Kosong</h3>
            <p className="text-gray-500 mb-6">Belum ada kursus yang ditambahkan ke keranjang.</p>
            <Link href="/">
              <Button>Jelajahi Kursus</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-48 h-32 bg-gradient-to-br from-blue-100 to-purple-100 relative">
                    {item.course.thumbnail ? (
                      <img
                        src={item.course.thumbnail}
                        alt={item.course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{item.course.title}</h3>
                        <p className="text-gray-600 mb-2">By {item.course.instructor.name}</p>
                        <p className="text-sm text-gray-500 line-clamp-2">{item.course.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-blue-600">
                          ${item.course.price.toFixed(2)}
                        </p>
                        <button
                          className="text-red-500 hover:text-red-700 mt-2 p-2 rounded-full hover:bg-red-50 transition-colors"
                          onClick={() => {
                            // This would need to be handled with client-side JavaScript
                            // For now, we'll show a placeholder
                          }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ringkasan Pembelian</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} kursus)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="pt-4 space-y-3">
                  <Button className="w-full" size="lg">
                    Beli Sekarang
                  </Button>
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Lanjut Belanja
                    </Button>
                  </Link>
                </div>

                <div className="text-xs text-gray-500 text-center pt-4 border-t">
                  Pembayaran aman dengan enkripsi SSL
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
