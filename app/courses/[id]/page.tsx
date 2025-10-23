import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Progress } from "@/components/ui/Progress"
import AddToCartButton from "@/components/AddToCartButton"
import AddToWishlistButton from "@/components/AddToWishlistButton"
import { Heart, ShoppingCart, CreditCard } from "lucide-react"
import toast from "react-hot-toast"

async function getCourse(id: string, userId?: string) {
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      instructor: {
        select: { name: true, email: true }
      },
      lessons: {
        orderBy: { order: "asc" }
      },
      enrollments: true
    }
  })

  if (!course) {
    return null
  }

  // Get user enrollment and progress if logged in
  let enrollment = null
  let progress = []
  let isInWishlist = false

  if (userId) {
    enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: id
        }
      }
    })

    if (enrollment) {
      progress = await prisma.progress.findMany({
        where: {
          userId: userId,
          lesson: {
            courseId: id
          }
        },
        include: {
          lesson: true
        }
      })
    }

    // Check if course is in user's wishlist
    const wishlistItem = await prisma.wishlist.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: id
        }
      }
    })
    isInWishlist = !!wishlistItem
  }

  return { course, enrollment, progress, isInWishlist }
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  const result = await getCourse(id, session?.user?.id)

  if (!result) {
    notFound()
  }

  const { course, enrollment, progress, isInWishlist } = result

  const isEnrolled = !!enrollment
  const isInstructor = session && course.instructorId === (session.user as any)?.id
  const totalLessons = course.lessons.length
  const completedLessons = progress.filter((p: any) => p.completed).length
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Course Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-600 to-purple-700">
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
                <p className="text-lg opacity-90">By {course.instructor.name}</p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Course Info */}
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Deskripsi Kelas</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {course.description || "Belum ada deskripsi untuk kelas ini."}
                      </p>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{totalLessons}</div>
                      <div className="text-sm text-gray-600">Pelajaran</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{course.enrollments.length}</div>
                      <div className="text-sm text-gray-600">Siswa</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {course.price === 0 ? 'Gratis' : `$${course.price}`}
                      </div>
                      <div className="text-sm text-gray-600">Harga</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {Math.round(progressPercentage)}%
                      </div>
                      <div className="text-sm text-gray-600">Selesai</div>
                    </div>
                  </div>

                  {/* Lessons Preview */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Konten Kursus</h3>
                    <div className="space-y-2">
                      {course.lessons.slice(0, 5).map((lesson: any, index: number) => {
                        const isCompleted = progress.some((p: any) => p.lessonId === lesson.id && p.completed)
                        const hasAccess = isEnrolled || isInstructor

                        return (
                          <div
                            key={lesson.id}
                            className={`flex items-center justify-between p-4 rounded-lg border ${
                              hasAccess ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                isCompleted
                                  ? 'bg-green-500 text-white'
                                  : hasAccess
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-300 text-gray-600'
                              }`}>
                                {isCompleted ? '✓' : index + 1}
                              </div>
                              <div>
                                <p className={`font-medium ${
                                  hasAccess ? 'text-gray-900' : 'text-gray-500'
                                }`}>
                                  {lesson.title}
                                </p>
                                {lesson.videoUrl && (
                                  <p className="text-sm text-gray-500">Video pembelajaran</p>
                                )}
                              </div>
                            </div>
                            {hasAccess ? (
                              <Link href={`/courses/${id}/lessons/${lesson.id}`}>
                                <Button variant="outline" size="sm">
                                  {isCompleted ? 'Ulangi' : 'Tonton'}
                                </Button>
                              </Link>
                            ) : (
                              <div className="text-sm text-gray-500">🔒 Daftar untuk mengakses</div>
                            )}
                          </div>
                        )
                      })}

                      {course.lessons.length > 5 && (
                        <div className="text-center py-4">
                          <p className="text-gray-600">
                            Dan {course.lessons.length - 5} pelajaran lainnya...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enrollment Card */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-6">
                    <CardHeader>
                      <CardTitle>Pendaftaran</CardTitle>
                      <CardDescription>
                        {isEnrolled ? 'Anda sudah terdaftar di kursus ini' : 'Bergabunglah dengan kursus ini untuk mulai belajar'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isEnrolled ? (
                        <div className="space-y-4">
                          {/* Progress */}
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Progress Anda</span>
                              <span>{Math.round(progressPercentage)}%</span>
                            </div>
                            <Progress value={progressPercentage} className="h-3" />
                            <p className="text-xs text-gray-600 mt-1">
                              {completedLessons} dari {totalLessons} pelajaran selesai
                            </p>
                          </div>

                          <Link href={`/courses/${id}/lessons/${course.lessons[0]?.id}`}>
                            <Button className="w-full">
                              {completedLessons === 0 ? 'Mulai Belajar' : 'Lanjutkan Belajar'}
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Action Buttons */}
                          <div className="space-y-3">
                            {course.price === 0 ? (
                              <Button className="w-full" id="enroll-btn">
                                Daftar Sekarang - Gratis
                              </Button>
                            ) : (
                              <div className="space-y-3">
                                <div className="text-center">
                                  <div className="text-3xl font-bold text-green-600">${course.price}</div>
                                  <div className="text-sm text-gray-600">Pembayaran sekali</div>
                                </div>

                                {/* Buy Now Button */}
                                <Button className="w-full bg-green-600 hover:bg-green-700" id="purchase-btn">
                                  <CreditCard className="w-4 h-4 mr-2" />
                                  Beli Sekarang
                                </Button>

                                {/* Add to Cart Button */}
                                <AddToCartButton
                                  courseId={course.id}
                                  courseTitle={course.title}
                                  isEnrolled={isEnrolled}
                                  price={course.price}
                                />

                                {/* Add to Wishlist Button */}
                                <AddToWishlistButton
                                  courseId={course.id}
                                  courseTitle={course.title}
                                  isInWishlist={isInWishlist}
                                />
                              </div>
                            )}
                          </div>

                          {!session && (
                            <div className="text-center text-sm text-gray-600">
                              <Link href="/auth/signin" className="text-blue-600 hover:underline">
                                Masuk
                              </Link>
                              {' '}untuk mendaftar kursus
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
