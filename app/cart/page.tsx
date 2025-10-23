import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import Image from "next/image"

async function getCartItems(userId: string) {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId: userId
    },
    include: {
      course: {
        include: {
          instructor: {
            select: { name: true }
          }
        }
      }
    }
  })

  return cartItems
}

export default async function CartPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Access Restricted</CardTitle>
            <CardDescription>
              Please sign in to view your cart.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth/signin">
              <Button className="w-full">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const cartItems = await getCartItems((session.user as any).id)
  const total = cartItems.reduce((sum: number, item: any) => sum + item.course.price, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-4">
                  Add some courses to get started with your learning journey.
                </p>
                <Link href="/">
                  <Button>Browse Courses</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item: any) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                          {item.course.thumbnail ? (
                            <Image
                              src={item.course.thumbnail}
                              alt={item.course.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl">📚</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.course.title}</h3>
                          <p className="text-gray-600">By {item.course.instructor.name}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.course.description?.substring(0, 100)}...
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">${item.course.price}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                    <Link href="/">
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
