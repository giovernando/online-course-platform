import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

async function getUserData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      courses: {
        include: {
          lessons: true,
          enrollments: true,
        },
      },
      enrollments: {
        include: {
          course: {
            include: {
              instructor: {
                select: { name: true },
              },
              lessons: true,
            },
          },
        },
      },
      progress: {
        include: {
          lesson: true,
        },
      },
    },
  })
  return user
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const user = await getUserData(session.user.id)

  if (!user) {
    redirect("/auth/signin")
  }

  const isInstructor = (user as any).role === "INSTRUCTOR"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mt-2">
          {isInstructor ? "Manage your courses and track student progress" : "Continue your learning journey"}
        </p>
      </div>

      {isInstructor ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Courses you've created</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{user.courses.length}</p>
              <Link href="/instructor/courses">
                <Button className="mt-4 w-full">Manage Courses</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Students</CardTitle>
              <CardDescription>Across all your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {user.courses.reduce((total, course) => total + course.enrollments.length, 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create New Course</CardTitle>
              <CardDescription>Start teaching something new</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/instructor/create">
                <Button className="w-full">Create Course</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
            {user.enrollments.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                  <Link href="/">
                    <Button>Browse Courses</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.enrollments.map((enrollment) => {
                  const course = enrollment.course
                  const totalLessons = course.lessons.length
                  const completedLessons = user.progress.filter(
                    (p) => p.lesson.courseId === course.id && p.completed
                  ).length
                  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

                  return (
                    <Card key={enrollment.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>By {course.instructor.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <Link href={`/courses/${course.id}`}>
                          <Button className="w-full">Continue Learning</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
