import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create instructor user
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'instructor@example.com',
      password: '$2b$10$dummy.hash.for.demo', // This would be hashed in real app
      role: 'INSTRUCTOR',
    },
  })

  // Create courses
  const course1 = await prisma.course.upsert({
    where: { id: 'course-1' },
    update: {},
    create: {
      id: 'course-1',
      title: 'Introduction to React',
      description: 'Learn the fundamentals of React.js and build modern web applications',
      price: 49.99,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      instructorId: instructor.id,
      lessons: {
        create: [
          {
            title: 'What is React?',
            videoUrl: 'https://example.com/video1.mp4',
            order: 1,
          },
          {
            title: 'Setting up your development environment',
            videoUrl: 'https://example.com/video2.mp4',
            order: 2,
          },
          {
            title: 'Creating your first component',
            videoUrl: 'https://example.com/video3.mp4',
            order: 3,
          },
          {
            title: 'Understanding JSX',
            videoUrl: 'https://example.com/video4.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  const course2 = await prisma.course.upsert({
    where: { id: 'course-2' },
    update: {},
    create: {
      id: 'course-2',
      title: 'Advanced JavaScript Concepts',
      description: 'Master advanced JavaScript features including closures, prototypes, and async programming',
      price: 79.99,
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
      instructorId: instructor.id,
      lessons: {
        create: [
          {
            title: 'Closures and Scope',
            videoUrl: 'https://example.com/video5.mp4',
            order: 1,
          },
          {
            title: 'Prototypes and Inheritance',
            videoUrl: 'https://example.com/video6.mp4',
            order: 2,
          },
          {
            title: 'Promises and Async/Await',
            videoUrl: 'https://example.com/video7.mp4',
            order: 3,
          },
          {
            title: 'ES6+ Features',
            videoUrl: 'https://example.com/video8.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  const course3 = await prisma.course.upsert({
    where: { id: 'course-3' },
    update: {},
    create: {
      id: 'course-3',
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB',
      price: 89.99,
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      instructorId: instructor.id,
      lessons: {
        create: [
          {
            title: 'Introduction to Node.js',
            videoUrl: 'https://example.com/video9.mp4',
            order: 1,
          },
          {
            title: 'Express.js Fundamentals',
            videoUrl: 'https://example.com/video10.mp4',
            order: 2,
          },
          {
            title: 'REST API Design',
            videoUrl: 'https://example.com/video11.mp4',
            order: 3,
          },
          {
            title: 'Database Integration',
            videoUrl: 'https://example.com/video12.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  const course4 = await prisma.course.upsert({
    where: { id: 'course-4' },
    update: {},
    create: {
      id: 'course-4',
      title: 'Python for Data Science',
      description: 'Learn Python programming and data analysis with pandas, numpy, and matplotlib',
      price: 69.99,
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
      instructorId: instructor.id,
      lessons: {
        create: [
          {
            title: 'Python Basics',
            videoUrl: 'https://example.com/video13.mp4',
            order: 1,
          },
          {
            title: 'Data Analysis with Pandas',
            videoUrl: 'https://example.com/video14.mp4',
            order: 2,
          },
          {
            title: 'Data Visualization',
            videoUrl: 'https://example.com/video15.mp4',
            order: 3,
          },
          {
            title: 'Machine Learning Basics',
            videoUrl: 'https://example.com/video16.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  const course5 = await prisma.course.upsert({
    where: { id: 'course-5' },
    update: {},
    create: {
      id: 'course-5',
      title: 'UI/UX Design Principles',
      description: 'Master the fundamentals of user interface and user experience design',
      price: 59.99,
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      instructorId: instructor.id,
      lessons: {
        create: [
          {
            title: 'Design Thinking Process',
            videoUrl: 'https://example.com/video17.mp4',
            order: 1,
          },
          {
            title: 'User Research Methods',
            videoUrl: 'https://example.com/video18.mp4',
            order: 2,
          },
          {
            title: 'Wireframing and Prototyping',
            videoUrl: 'https://example.com/video19.mp4',
            order: 3,
          },
          {
            title: 'Design Systems',
            videoUrl: 'https://example.com/video20.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  const course6 = await prisma.course.upsert({
    where: { id: 'course-6' },
    update: {},
    create: {
      id: 'course-6',
      title: 'Mobile App Development with React Native',
      description: 'Build cross-platform mobile applications using React Native',
      price: 99.99,
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      instructorId: instructor.id,
      lessons: {
        create: [
          {
            title: 'React Native Setup',
            videoUrl: 'https://example.com/video21.mp4',
            order: 1,
          },
          {
            title: 'Components and Navigation',
            videoUrl: 'https://example.com/video22.mp4',
            order: 2,
          },
          {
            title: 'State Management',
            videoUrl: 'https://example.com/video23.mp4',
            order: 3,
          },
          {
            title: 'Native Features',
            videoUrl: 'https://example.com/video24.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
