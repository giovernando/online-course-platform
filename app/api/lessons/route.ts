import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is instructor
    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      select: { role: true }
    })

    if (user?.role !== 'INSTRUCTOR') {
      return NextResponse.json({ error: 'Only instructors can create lessons' }, { status: 403 })
    }

    const { title, videoUrl, courseId } = await request.json()

    if (!title || !courseId) {
      return NextResponse.json({ error: 'Title and courseId are required' }, { status: 400 })
    }

    // Check if course belongs to instructor
    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
        instructorId: session.user.id as string
      }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found or access denied' }, { status: 404 })
    }

    // Get the highest order number for this course
    const lastLesson = await prisma.lesson.findFirst({
      where: { courseId: courseId },
      orderBy: { order: 'desc' }
    })

    const order = lastLesson ? lastLesson.order + 1 : 1

    // Create lesson
    const lesson = await prisma.lesson.create({
      data: {
        title,
        videoUrl: videoUrl || null,
        courseId,
        order
      }
    })

    return NextResponse.json({
      message: 'Lesson created successfully',
      lesson
    })

  } catch (error) {
    console.error('Create lesson error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const session = await getServerSession(authOptions)

    // Check if user has access to the course (enrolled or instructor)
    let hasAccess = false

    if (session?.user?.id) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id as string,
            courseId: courseId
          }
        }
      })

      const course = await prisma.course.findUnique({
        where: { id: courseId },
        select: { instructorId: true }
      })

      hasAccess = !!enrollment || course?.instructorId === session.user.id
    }

    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const lessons = await prisma.lesson.findMany({
      where: { courseId: courseId },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json({ lessons })

  } catch (error) {
    console.error('Get lessons error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
