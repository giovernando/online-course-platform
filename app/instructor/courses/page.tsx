import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

async function getInstructorCourses(userId: string) {
  const courses = await prisma.course.findMany({
    where: { instructorId: userId },
    include: {
      lessons: true,
      enrollments: {
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
  return courses
}

export default async function InstructorCoursesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id as string },
    select: { role: true }
  })

  if (user?.role !== 'INSTRUCTOR') {
    redirect("/dashboard")
  }

  const courses = await getInstructorCourses(session.user.id as string)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-gray-600 mt-2">Manage your created courses and track student progress</p>
        </div>
        <Link href="/instructor/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create New Course
          </Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
            <p className="text-gray-600 mb-6">Start creating your first course to begin teaching</p>
            <Link href="/instructor/create">
              <Button>Create Your First Course</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Students</p>
                      <p className="font-semibold text-lg">{course.enrollments.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Lessons</p>
                      <p className="font-semibold text-lg">{course.lessons.length}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/courses/${course.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Course
                      </Button>
                    </Link>
                    <Link href={`/instructor/courses/${course.id}/edit`} className="flex-1">
                      <Button className="w-full">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recent Enrollments */}
      {courses.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Student Enrollments</h2>
          <Card>
            <CardContent className="pt-6">
              {courses.flatMap(course =>
                course.enrollments.slice(0, 5).map(enrollment => ({
                  ...enrollment,
                  courseTitle: course.title
                }))
              ).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No enrollments yet</p>
              ) : (
                <div className="space-y-4">
                  {courses.flatMap(course =>
                    course.enrollments.slice(0, 3).map(enrollment => ({
                      ...enrollment,
                      courseTitle: course.title
                    }))
                  ).map((enrollment) => (
                    <div key={enrollment.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{enrollment.user.name}</p>
                        <p className="text-sm text-gray-600">{enrollment.user.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{enrollment.courseTitle}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(enrollment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
