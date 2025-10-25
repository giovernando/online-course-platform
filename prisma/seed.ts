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
  const courses = [
    // Development (10 courses)
    {
      id: 'course-1',
      title: 'Belajar React untuk Pemula',
      description: 'Pelajari dasar-dasar React dengan proyek praktis. Kursus ini cocok untuk pemula yang ingin memahami konsep fundamental React.',
      price: 0,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      category: 'Development',
    },
    {
      id: 'course-2',
      title: 'Next.js Advanced Course',
      description: 'Kuasai Next.js dengan fitur-fitur advanced seperti SSR, SSG, API Routes, dan deployment.',
      price: 49.99,
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
      category: 'Development',
    },
    {
      id: 'course-3',
      title: 'TypeScript Mastery',
      description: 'Pelajari TypeScript dari nol hingga mahir. Tingkatkan kualitas kode Anda dengan type safety.',
      price: 39.99,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
      category: 'Development',
    },
    {
      id: 'course-4',
      title: 'Node.js Backend Development',
      description: 'Bangun backend yang powerful dengan Node.js, Express, dan MongoDB. Pelajari REST APIs dan authentication.',
      price: 59.99,
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
      category: 'Development',
    },
    {
      id: 'course-5',
      title: 'Python untuk Data Science',
      description: 'Mulai perjalanan Anda di data science dengan Python. Pelajari pandas, numpy, dan matplotlib.',
      price: 69.99,
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
      category: 'Development',
    },
    {
      id: 'course-6',
      title: 'JavaScript Fundamentals',
      description: 'Pelajari JavaScript dari dasar hingga advanced. Kursus komprehensif untuk menjadi developer JavaScript yang handal.',
      price: 29.99,
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
      category: 'Development',
    },
    {
      id: 'course-7',
      title: 'Vue.js Complete Guide',
      description: 'Master Vue.js dari awal hingga production-ready. Pelajari Vue 3, Composition API, dan ecosystem Vue.',
      price: 44.99,
      thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=400&fit=crop',
      category: 'Development',
    },
    {
      id: 'course-8',
      title: 'Angular Masterclass',
      description: 'Pelajari Angular framework secara mendalam. Dari components hingga state management dengan NgRx.',
      price: 54.99,
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop',
      category: 'Development',
    },
    {
      id: 'course-9',
      title: 'Full Stack Web Development',
      description: 'Jadi full stack developer dengan MERN stack. Pelajari MongoDB, Express, React, dan Node.js.',
      price: 79.99,
    where: { id: 'course-6' },
    update: {},
    create: {
      id: 'course-6',
      title: 'Python untuk Data Science',
      description: 'Mulai perjalanan Anda di data science dengan Python. Pelajari pandas, numpy, dan matplotlib.',
      price: 69.99,
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
      category: 'Development',
      instructorId: instructor.id,
    },
  })

  const course7 = await prisma.course.upsert({
    where: { id: 'course-7' },
    update: {},
    create: {
      id: 'course-7',
      title: 'Digital Marketing Mastery',
      description: 'Pelajari strategi digital marketing yang efektif. Dari SEO hingga social media marketing.',
      price: 45.99,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      category: 'Marketing',
      instructorId: instructor.id,
    },
  })

  const course8 = await prisma.course.upsert({
    where: { id: 'course-8' },
    update: {},
    create: {
      id: 'course-8',
      title: 'Business Strategy & Entrepreneurship',
      description: 'Kembangkan kemampuan bisnis Anda. Pelajari strategi bisnis, entrepreneurship, dan manajemen.',
      price: 79.99,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      category: 'Business',
      instructorId: instructor.id,
    },
  })

  const course9 = await prisma.course.upsert({
    where: { id: 'course-9' },
    update: {},
    create: {
      id: 'course-9',
      title: 'Music Production with Logic Pro',
      description: 'Pelajari produksi musik profesional dengan Logic Pro. Dari recording hingga mixing dan mastering.',
      price: 89.99,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      category: 'Music',
      instructorId: instructor.id,
    },
  })

  const course10 = await prisma.course.upsert({
    where: { id: 'course-10' },
    update: {},
    create: {
      id: 'course-10',
      title: 'Fitness & Nutrition Guide',
      description: 'Panduan lengkap untuk hidup sehat. Pelajari olahraga dan nutrisi yang tepat untuk tubuh Anda.',
      price: 34.99,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      category: 'Health & Fitness',
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
    course7: course7.id,
    course8: course8.id,
    course9: course9.id,
    course10: course10.id,
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
  console.log('- Belajar React untuk Pemula (Free) - Development')
  console.log('- Next.js Advanced Course ($49.99) - Development')
  console.log('- TypeScript Mastery ($39.99) - Development')
  console.log('- Node.js Backend Development ($59.99) - Development')
  console.log('- UI/UX Design Fundamentals ($29.99) - Design')
  console.log('- Python untuk Data Science ($69.99) - Development')
  console.log('- Digital Marketing Mastery ($45.99) - Marketing')
  console.log('- Business Strategy & Entrepreneurship ($79.99) - Business')
  console.log('- Music Production with Logic Pro ($89.99) - Music')
  console.log('- Fitness & Nutrition Guide ($34.99) - Health & Fitness')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
