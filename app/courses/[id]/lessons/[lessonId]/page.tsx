import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Progress } from "@/components/ui/Progress"
import MarkCompleteButton from "@/components/MarkCompleteButton"

async function getLesson(courseId: string, lessonId: string, userId?: string) {
  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      courseId: courseId
    },
    include: {
      course: {
        include: {
          instructor: {
            select: { name: true }
          },
          lessons: {
            orderBy: { order: "asc" }
          }
        }
      }
    }
  })

  if (!lesson) {
    return null
  }

  // Get user progress if logged in
  let userProgress = null
  if (userId) {
    userProgress = await prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId: userId,
          lessonId: lessonId
        }
      }
    })
  }

  return { lesson, userProgress }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>
}) {
  const { id: courseId, lessonId } = await params
  const session = await getServerSession(authOptions)

  const result = await getLesson(courseId, lessonId, (session?.user as any)?.id)

  if (!result) {
    notFound()
  }

  const { lesson, userProgress } = result
  const course = lesson.course

  // Check if user is enrolled
  const isEnrolled = session ? await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: (session.user as any).id,
        courseId: courseId
      }
    }
  }) : null

  const isInstructor = session && session.user && course.instructorId === (session.user as any).id

  if (!isEnrolled && !isInstructor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Access Restricted</CardTitle>
            <CardDescription>
              You need to enroll in this course to access the lessons.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={`/courses/${courseId}`}>
              <Button className="w-full">View Course Details</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Calculate progress
  const totalLessons = course.lessons.length
  const currentLessonIndex = course.lessons.findIndex((l: any) => l.id === lessonId)
  const completedLessons = (session?.user as any)?.id ?
    await prisma.progress.count({
      where: {
        userId: (session.user as any).id,
        lesson: {
          courseId: courseId
        },
        completed: true
      }
    }) : 0

  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Course Header */}
        <div className="mb-6">
          <Link href={`/courses/${courseId}`} className="text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Course
          </Link>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-gray-600">By {course.instructor.name}</p>
        </div>

        {/* Progress Bar */}
        {session && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Course Progress</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>
                  Lesson {currentLessonIndex + 1} of {totalLessons}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {lesson.videoUrl ? (
                  <div className="aspect-video bg-black rounded-lg mb-4">
                    <video
                      controls
                      className="w-full h-full rounded-lg"
                      poster={course.thumbnail || undefined}
                    >
                      <source src={lesson.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎥</div>
                      <p className="text-gray-500">Video will be available soon</p>
                    </div>
                  </div>
                )}

                {/* Mark as Complete Button */}
                {session && (
                  <MarkCompleteButton
                    lessonId={lessonId}
                    courseId={courseId}
                    isCompleted={userProgress?.completed || false}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.lessons.map((courseLesson: any, index: number) => {
                    const isCurrentLesson = courseLesson.id === lessonId
                    const isCompleted = (session?.user as any)?.id ?
                      // In real implementation, this would check progress
                      false : false

                    return (
                      <Link
                        key={courseLesson.id}
                        href={`/courses/${courseId}/lessons/${courseLesson.id}`}
                        className={`block p-3 rounded-lg border transition-all ${
                          isCurrentLesson
                            ? 'bg-blue-50 border-blue-300'
                            : isCompleted
                            ? 'bg-green-50 border-green-300 hover:bg-green-100'
                            : 'hover:bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : isCurrentLesson
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {isCompleted ? '✓' : index + 1}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              isCurrentLesson ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {courseLesson.title}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
