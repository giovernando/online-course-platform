import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10)

  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@example.com' },
    update: {},
    create: {
      name: 'John Instructor',
      email: 'instructor@example.com',
      password: hashedPassword,
      role: 'INSTRUCTOR',
    },
  })

  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      name: 'Jane Student',
      email: 'student@example.com',
      password: hashedPassword,
      role: 'STUDENT',
    },
  })

  console.log('✅ Users created:', { instructor: instructor.id, student: student.id })

  // Create courses
  const course1 = await prisma.course.upsert({
    where: { id: 'course-1' },
    update: {},
    create: {
      id: 'course-1',
      title: 'Belajar React untuk Pemula',
      description: 'Pelajari dasar-dasar React dengan proyek praktis. Kursus ini cocok untuk pemula yang ingin memahami konsep fundamental React.',
      price: 0,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      instructorId: instructor.id,
    },
  })

  const course2 = await prisma.course.upsert({
    where: { id: 'course-2' },
    update: {},
    create: {
      id: 'course-2',
      title: 'Next.js Advanced Course',
      description: 'Kuasai Next.js dengan fitur-fitur advanced seperti SSR, SSG, API Routes, dan deployment.',
      price: 49.99,
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
      instructorId: instructor.id,
    },
  })

  const course3 = await prisma.course.upsert({
    where: { id: 'course-3' },
    update: {},
    create: {
      id: 'course-3',
      title: 'TypeScript Mastery',
      description: 'Pelajari TypeScript dari nol hingga mahir. Tingkatkan kualitas kode Anda dengan type safety.',
      price: 39.99,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
      instructorId: instructor.id,
    },
  })

  const course4 = await prisma.course.upsert({
    where: { id: 'course-4' },
    update: {},
    create: {
      id: 'course-4',
      title: 'Node.js Backend Development',
      description: 'Bangun backend yang powerful dengan Node.js, Express, dan MongoDB. Pelajari REST APIs dan authentication.',
      price: 59.99,
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
      instructorId: instructor.id,
    },
  })

  const course5 = await prisma.course.upsert({
    where: { id: 'course-5' },
    update: {},
    create: {
      id: 'course-5',
      title: 'UI/UX Design Fundamentals',
      description: 'Pelajari prinsip-prinsip desain UI/UX yang efektif. Dari wireframing hingga prototyping dengan Figma.',
      price: 29.99,
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      instructorId: instructor.id,
    },
  })

  const course6 = await prisma.course.upsert({
    where: { id: 'course-6' },
    update: {},
    create: {
      id: 'course-6',
      title: 'Python untuk Data Science',
      description: 'Mulai perjalanan Anda di data science dengan Python. Pelajari pandas, numpy, dan matplotlib.',
      price: 69.99,
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
      instructorId: instructor.id,
    },
  })

  console.log('✅ Courses created:', {
    course1: course1.id,
    course2: course2.id,
    course3: course3.id,
    course4: course4.id,
    course5: course5.id,
    course6: course6.id,
  })

  // Create lessons for course 1
  const lesson1 = await prisma.lesson.upsert({
    where: { id: 'lesson-1' },
    update: {},
    create: {
      id: 'lesson-1',
      title: 'Pengenalan React',
      videoUrl: 'https://example.com/video1.mp4',
      courseId: course1.id,
      order: 1,
    },
  })

  const lesson2 = await prisma.lesson.upsert({
    where: { id: 'lesson-2' },
    update: {},
    create: {
      id: 'lesson-2',
      title: 'Komponen dan Props',
      videoUrl: 'https://example.com/video2.mp4',
      courseId: course1.id,
      order: 2,
    },
  })

  const lesson3 = await prisma.lesson.upsert({
    where: { id: 'lesson-3' },
    update: {},
    create: {
      id: 'lesson-3',
      title: 'State Management',
      videoUrl: 'https://example.com/video3.mp4',
      courseId: course1.id,
      order: 3,
    },
  })

  console.log('✅ Lessons created for course 1')

  // Create enrollment for student in course 1
  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: student.id,
        courseId: course1.id,
      },
    },
    update: {},
    create: {
      userId: student.id,
      courseId: course1.id,
    },
  })

  // Create progress for student
  await prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId: student.id,
        lessonId: lesson1.id,
      },
    },
    update: {},
    create: {
      userId: student.id,
      lessonId: lesson1.id,
      completed: true,
    },
  })

  await prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId: student.id,
        lessonId: lesson2.id,
      },
    },
    update: {},
    create: {
      userId: student.id,
      lessonId: lesson2.id,
      completed: true,
    },
  })

  console.log('✅ Enrollment and progress created')

  console.log('🎉 Database seeded successfully!')
  console.log('')
  console.log('📋 Test Accounts:')
  console.log('Instructor: instructor@example.com / password123')
  console.log('Student: student@example.com / password123')
  console.log('')
  console.log('📚 Available Courses:')
  console.log('- Belajar React untuk Pemula (Free)')
  console.log('- Next.js Advanced Course ($49.99)')
  console.log('- TypeScript Mastery ($39.99)')
  console.log('- Node.js Backend Development ($59.99)')
  console.log('- UI/UX Design Fundamentals ($29.99)')
  console.log('- Python untuk Data Science ($69.99)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
