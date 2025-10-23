import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Progress } from "@/components/ui/Progress"
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
  }

  return { course, enrollment, progress }
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  const result = await getCourse(id, session?.user?.id as string)

  if (!result) {
    notFound()
  }

  const { course, enrollment, progress } = result

  const isEnrolled = !!enrollment
  const isInstructor = session && course.instructorId === session.user.id
  const totalLessons = course.lessons.length
  const completedLessons = progress.filter(p => p.completed).length
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
                    <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {course.description || "No description available."}
                    </p>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{totalLessons}</div>
                      <div className="text-sm text-gray-600">Lessons</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{course.enrollments.length}</div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
            <Link href="/auth/signin">
              <Button className="flex-1">Sign in to Enroll</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
