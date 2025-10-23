import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"

async function getCourse(id: string) {
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      instructor: {
        select: { name: true },
      },
      lessons: {
        orderBy: { order: "asc" },
      },
      enrollments: true,
    },
  })
  return course
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  const course = await getCourse(id)

  if (!course) {
    notFound()
  }

  const isEnrolled = session ? course.enrollments.some(e => e.userId === session.user.id) : false
  const isInstructor = session && course.instructorId === session.user.id

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-4">By {course.instructor.name}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-green-600">
              {course.price === 0 ? 'Free' : `$${course.price}`}
            </span>
            <span className="text-gray-500">
              {course.lessons.length} lessons
            </span>
          </div>
        </div>

        {/* Course Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About this course</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{course.description || "No description available."}</p>
          </CardContent>
        </Card>

        {/* Lessons */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>
              {course.lessons.length} lessons in this course
            </CardDescription>
          </CardHeader>
          <CardContent>
            {course.lessons.length === 0 ? (
              <p className="text-gray-500">No lessons available yet.</p>
            ) : (
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {index + 1}. {lesson.title}
                      </h3>
                      {lesson.videoUrl && (
                        <p className="text-sm text-gray-500">Video lesson</p>
                      )}
                    </div>
                    {isEnrolled || isInstructor ? (
                      <Link href={`/courses/${course.id}/lessons/${lesson.id}`}>
                        <Button variant="outline">Watch</Button>
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-500">Enroll to access</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {session ? (
            isEnrolled ? (
              <Button className="flex-1" disabled>
                Already Enrolled
              </Button>
            ) : isInstructor ? (
              <Link href={`/instructor/courses/${course.id}/edit`}>
                <Button className="flex-1">Edit Course</Button>
              </Link>
            ) : (
              <Button className="flex-1">
                {course.price === 0 ? 'Enroll Now' : `Buy for $${course.price}`}
              </Button>
            )
          ) : (
            <Link href="/auth/signin">
              <Button className="flex-1">Sign in to Enroll</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
