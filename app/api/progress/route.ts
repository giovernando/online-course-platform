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

    const { lessonId, completed } = await request.json()

    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 })
    }

    // Check if lesson exists and user is enrolled in the course
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { course: { include: { enrollments: true } } }
    })

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    // Check if user is enrolled in the course
    const isEnrolled = lesson.course.enrollments.some(
      enrollment => enrollment.userId === session.user.id
    )

    if (!isEnrolled) {
      return NextResponse.json({ error: 'Not enrolled in this course' }, { status: 403 })
    }

    // Update or create progress
    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId: lessonId
        }
      },
      update: {
        completed: completed ?? true
      },
      create: {
        userId: session.user.id,
        lessonId: lessonId,
        completed: completed ?? true
      }
    })

    return NextResponse.json({
      message: 'Progress updated successfully',
      progress
    })

  } catch (error) {
    console.error('Progress update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    // Check if user is enrolled in the course
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: courseId
        }
      }
    })

    if (!enrollment) {
      return NextResponse.json({ error: 'Not enrolled in this course' }, { status: 403 })
    }

    // Get progress for all lessons in the course
    const progress = await prisma.progress.findMany({
      where: {
        userId: session.user.id,
        lesson: {
          courseId: courseId
        }
      },
      include: {
        lesson: true
      }
    })

    return NextResponse.json({ progress })

  } catch (error) {
    console.error('Progress fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
