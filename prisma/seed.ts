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

  // Create additional instructor
  const instructor2 = await prisma.user.upsert({
    where: { email: 'sarah@example.com' },
    update: {},
    create: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      password: '$2b$10$dummy.hash.for.demo',
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
      instructorId: instructor2.id,
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

  // Add more courses
  const course7 = await prisma.course.upsert({
    where: { id: 'course-7' },
    update: {},
    create: {
      id: 'course-7',
      title: 'Full-Stack Web Development',
      description: 'Complete guide to building full-stack applications with MERN stack',
      price: 129.99,
      thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop',
      instructorId: instructor.id,
      lessons: {
        create: [
          {
            title: 'MERN Stack Overview',
            videoUrl: 'https://example.com/video25.mp4',
            order: 1,
          },
          {
            title: 'MongoDB Fundamentals',
            videoUrl: 'https://example.com/video26.mp4',
            order: 2,
          },
          {
            title: 'Express.js API Development',
            videoUrl: 'https://example.com/video27.mp4',
            order: 3,
          },
          {
            title: 'React Frontend Integration',
            videoUrl: 'https://example.com/video28.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  const course8 = await prisma.course.upsert({
    where: { id: 'course-8' },
    update: {},
    create: {
      id: 'course-8',
      title: 'DevOps with Docker & Kubernetes',
      description: 'Learn containerization and orchestration for scalable applications',
      price: 89.99,
      thumbnail: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=250&fit=crop',
      instructorId: instructor2.id,
      lessons: {
        create: [
          {
            title: 'Introduction to Docker',
            videoUrl: 'https://example.com/video29.mp4',
            order: 1,
          },
          {
            title: 'Container Orchestration',
            videoUrl: 'https://example.com/video30.mp4',
            order: 2,
          },
          {
            title: 'Kubernetes Fundamentals',
            videoUrl: 'https://example.com/video31.mp4',
            order: 3,
          },
          {
            title: 'CI/CD Pipelines',
            videoUrl: 'https://example.com/video32.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  const course9 = await prisma.course.upsert({
    where: { id: 'course-9' },
    update: {},
    create: {
      id: 'course-9',
      title: 'Machine Learning with Python',
      description: 'Comprehensive introduction to machine learning algorithms and implementation',
      price: 149.99,
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
      instructorId: instructor.id,
      lessons: {
        create: [
          {
            title: 'ML Fundamentals',
            videoUrl: 'https://example.com/video33.mp4',
            order: 1,
          },
          {
            title: 'Supervised Learning',
            videoUrl: 'https://example.com/video34.mp4',
            order: 2,
          },
          {
            title: 'Neural Networks',
            videoUrl: 'https://example.com/video35.mp4',
            order: 3,
          },
          {
            title: 'Model Deployment',
            videoUrl: 'https://example.com/video36.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  const course10 = await prisma.course.upsert({
    where: { id: 'course-10' },
    update: {},
    create: {
      id: 'course-10',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn essential cybersecurity concepts and best practices',
      price: 79.99,
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
      instructorId: instructor2.id,
      lessons: {
        create: [
          {
            title: 'Security Principles',
            videoUrl: 'https://example.com/video37.mp4',
            order: 1,
          },
          {
            title: 'Network Security',
            videoUrl: 'https://example.com/video38.mp4',
            order: 2,
          },
          {
            title: 'Ethical Hacking',
            videoUrl: 'https://example.com/video39.mp4',
            order: 3,
          },
          {
            title: 'Security Tools',
            videoUrl: 'https://example.com/video40.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  const course11 = await prisma.course.upsert({
    where: { id: 'course-11' },
    update: {},
    create: {
      id: 'course-11',
      title: 'Cloud Computing with AWS',
      description: 'Master Amazon Web Services for scalable cloud solutions',
      price: 109.99,
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
      instructorId: instructor.id,
      lessons: {
        create: [
          {
            title: 'AWS Fundamentals',
            videoUrl: 'https://example.com/video41.mp4',
            order: 1,
          },
          {
            title: 'EC2 and Compute Services',
            videoUrl: 'https://example.com/video42.mp4',
            order: 2,
          },
          {
            title: 'Storage Solutions',
            videoUrl: 'https://example.com/video43.mp4',
            order: 3,
          },
          {
            title: 'Serverless Architecture',
            videoUrl: 'https://example.com/video44.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  const course12 = await prisma.course.upsert({
    where: { id: 'course-12' },
    update: {},
    create: {
      id: 'course-12',
      title: 'Blockchain Development',
      description: 'Build decentralized applications with Ethereum and smart contracts',
      price: 119.99,
      thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
      instructorId: instructor2.id,
      lessons: {
        create: [
          {
            title: 'Blockchain Basics',
            videoUrl: 'https://example.com/video45.mp4',
            order: 1,
          },
          {
            title: 'Ethereum Network',
            videoUrl: 'https://example.com/video46.mp4',
            order: 2,
          },
          {
            title: 'Smart Contracts',
            videoUrl: 'https://example.com/video47.mp4',
            order: 3,
          },
          {
            title: 'DApp Development',
            videoUrl: 'https://example.com/video48.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  // Free courses
  const course13 = await prisma.course.upsert({
    where: { id: 'course-13' },
    update: {},
    create: {
      id: 'course-13',
      title: 'Introduction to Programming',
      description: 'Perfect starting point for beginners learning to code',
      price: 0,
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      instructorId: instructor.id,
      lessons: {
        create: [
          {
            title: 'What is Programming?',
            videoUrl: 'https://example.com/video49.mp4',
            order: 1,
          },
          {
            title: 'Your First Program',
            videoUrl: 'https://example.com/video50.mp4',
            order: 2,
          },
          {
            title: 'Basic Concepts',
            videoUrl: 'https://example.com/video51.mp4',
            order: 3,
          },
          {
            title: 'Next Steps',
            videoUrl: 'https://example.com/video52.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  const course14 = await prisma.course.upsert({
    where: { id: 'course-14' },
    update: {},
    create: {
      id: 'course-14',
      title: 'Web Development Basics',
      description: 'Learn HTML, CSS, and JavaScript fundamentals for free',
      price: 0,
      thumbnail: 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=400&h=250&fit=crop',
      instructorId: instructor2.id,
      lessons: {
        create: [
          {
            title: 'HTML Structure',
            videoUrl: 'https://example.com/video53.mp4',
            order: 1,
          },
          {
            title: 'CSS Styling',
            videoUrl: 'https://example.com/video54.mp4',
            order: 2,
          },
          {
            title: 'JavaScript Basics',
            videoUrl: 'https://example.com/video55.mp4',
            order: 3,
          },
          {
            title: 'Building Your First Website',
            videoUrl: 'https://example.com/video56.mp4',
            order: 4,
          },
        ],
      },
    },
  })

  const course15 = await prisma.course.upsert({
    where: { id: 'course-15' },
    update: {},
    create: {
      id: 'course-15',
      title: 'Digital Marketing Essentials',
      description: 'Free course covering the fundamentals of digital marketing',
      price: 0,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      instructorId: instructor.id,
      lessons: {
        create: [
          {
            title: 'Marketing Fundamentals',
            videoUrl: 'https://example.com/video57.mp4',
            order: 1,
          },
          {
            title: 'Social Media Marketing',
            videoUrl: 'https://example.com/video58.mp4',
            order: 2,
          },
          {
            title: 'SEO Basics',
            videoUrl: 'https://example.com/video59.mp4',
            order: 3,
          },
          {
            title: 'Content Marketing',
            videoUrl: 'https://example.com/video60.mp4',
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
