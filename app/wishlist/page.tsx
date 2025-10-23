import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import AddToWishlistButton from "@/components/AddToWishlistButton"
import AddToCartButton from "@/components/AddToCartButton"
import { Heart, BookOpen, Users, DollarSign } from "lucide-react"

async function getWishlist(userId: string) {
  const wishlist = await prisma.wishlist.findMany({
    where: {
      userId: userId
    },
    include: {
      course: {
        include: {
          instructor: {
            select: { name: true }
          },
          lessons: true,
          enrollments: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return wishlist
}

export default async function WishlistPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Anda perlu masuk untuk melihat wishlist Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/auth/signin">
              <Button>Masuk</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const wishlist = await getWishlist(session.user.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Wishlist Saya</h1>
            <p className="text-gray-600">
              Kursus yang Anda simpan untuk belajar nanti
            </p>
          </div>

          {wishlist.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Wishlist Anda Kosong
                </h3>
                <p className="text-gray-600 mb-6">
                  Temukan kursus menarik dan tambahkan ke wishlist untuk disimpan
                </p>
                <Link href="/">
                  <Button>Jelajahi Kursus</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => {
                const course = item.course
                const isEnrolled = course.enrollments.some(
                  (enrollment: any) => enrollment.userId === session.user.id
                )

                return (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Course Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-700">
                      {course.thumbnail && (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 right-4">
                        <AddToWishlistButton
                          courseId={course.id}
                          courseTitle={course.title}
                          isInWishlist={true}
                        />
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-2">
                        {course.title}
                      </CardTitle>
                      <CardDescription>
                        Oleh {course.instructor.name}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Course Stats */}
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <BookOpen className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                          <div className="font-semibold">{course.lessons.length}</div>
                          <div className="text-gray-600">Pelajaran</div>
                        </div>
                        <div className="text-center">
                          <Users className="w-4 h-4 mx-auto mb-1 text-green-600" />
                          <div className="font-semibold">{course.enrollments.length}</div>
                          <div className="text-gray-600">Siswa</div>
                        </div>
                        <div className="text-center">
                          <DollarSign className="w-4 h-4 mx-auto mb-1 text-purple-600" />
                          <div className="font-semibold">
                            {course.price === 0 ? 'Gratis' : `$${course.price}`}
                          </div>
                          <div className="text-gray-600">Harga</div>
                        </div>
                      </div>

                      {/* Description Preview */}
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {course.description || "Tidak ada deskripsi"}
                      </p>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <Link href={`/courses/${course.id}`}>
                          <Button variant="outline" className="w-full">
                            Lihat Detail
                          </Button>
                        </Link>

                        {!isEnrolled && (
                          <AddToCartButton
                            courseId={course.id}
                            courseTitle={course.title}
                            isEnrolled={isEnrolled}
                            price={course.price}
                          />
                        )}

                        {isEnrolled && (
                          <Link href={`/courses/${course.id}/lessons/${course.lessons[0]?.id}`}>
                            <Button className="w-full">
                              Mulai Belajar
                            </Button>
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
