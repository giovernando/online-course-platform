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
      thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop',
      category: 'Development',
    },
    {
      id: 'course-10',
      title: 'Mobile App Development with React Native',
      description: 'Bangun aplikasi mobile cross-platform dengan React Native. Dari basic hingga advanced features.',
      price: 64.99,
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
      category: 'Development',
    },

    // Business (10 courses)
    {
      id: 'course-11',
      title: 'Business Strategy & Entrepreneurship',
      description: 'Kembangkan kemampuan bisnis Anda. Pelajari strategi bisnis, entrepreneurship, dan manajemen.',
      price: 79.99,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      category: 'Business',
    },
    {
      id: 'course-12',
      title: 'Financial Management for Entrepreneurs',
      description: 'Pelajari manajemen keuangan bisnis. Budgeting, forecasting, dan financial planning untuk startup.',
      price: 59.99,
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
      category: 'Business',
    },
    {
      id: 'course-13',
      title: 'Leadership and Team Management',
      description: 'Kembangkan skill leadership Anda. Pelajari bagaimana memimpin tim dan mengelola konflik.',
      price: 49.99,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      category: 'Business',
    },
    {
      id: 'course-14',
      title: 'Project Management Professional',
      description: 'Pelajari metodologi project management. Agile, Scrum, dan tools untuk mengelola proyek.',
      price: 69.99,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      category: 'Business',
    },
    {
      id: 'course-15',
      title: 'Digital Business Transformation',
      description: 'Transformasi bisnis di era digital. Pelajari digital strategy dan implementasi teknologi.',
      price: 74.99,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      category: 'Business',
    },
    {
      id: 'course-16',
      title: 'E-commerce Business Mastery',
      description: 'Bangun dan skalakan bisnis e-commerce. Dari marketplace hingga dropshipping strategy.',
      price: 54.99,
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
      category: 'Business',
    },
    {
      id: 'course-17',
      title: 'Business Analytics and Data-Driven Decisions',
      description: 'Gunakan data untuk membuat keputusan bisnis yang lebih baik. Analytics dan reporting.',
      price: 64.99,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      category: 'Business',
    },
    {
      id: 'course-18',
      title: 'Marketing Strategy for Business Owners',
      description: 'Strategi marketing untuk pemilik bisnis. Branding, positioning, dan customer acquisition.',
      price: 44.99,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      category: 'Business',
    },
    {
      id: 'course-19',
      title: 'Operations Management Excellence',
      description: 'Optimalkan operasi bisnis Anda. Supply chain, quality control, dan process improvement.',
      price: 59.99,
      thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',
      category: 'Business',
    },
    {
      id: 'course-20',
      title: 'Startup Funding and Investment',
      description: 'Pelajari cara mendapatkan funding untuk startup. Pitch deck, investor relations, dan VC process.',
      price: 69.99,
      thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop',
      category: 'Business',
    },

    // Design (10 courses)
    {
      id: 'course-21',
      title: 'UI/UX Design Fundamentals',
      description: 'Pelajari prinsip-prinsip desain UI/UX yang efektif. Dari wireframing hingga prototyping dengan Figma.',
      price: 29.99,
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      category: 'Design',
    },
    {
      id: 'course-22',
      title: 'Graphic Design Masterclass',
      description: 'Pelajari desain grafis profesional dengan Adobe Creative Suite. Logo, branding, dan print design.',
      price: 49.99,
      thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop',
      category: 'Design',
    },
    {
      id: 'course-23',
      title: 'Adobe Photoshop for Designers',
      description: 'Master Adobe Photoshop untuk desain digital. Dari photo editing hingga digital art creation.',
      price: 39.99,
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      category: 'Design',
    },
    {
      id: 'course-24',
      title: 'Illustrator for Vector Graphics',
      description: 'Pelajari Adobe Illustrator untuk membuat vector graphics yang scalable dan professional.',
      price: 44.99,
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      category: 'Design',
    },
    {
      id: 'course-25',
      title: 'Motion Graphics with After Effects',
      description: 'Buat animasi dan motion graphics yang menakjubkan dengan Adobe After Effects.',
      price: 54.99,
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=400&fit=crop',
      category: 'Design',
    },
    {
      id: 'course-26',
      title: 'Brand Identity Design',
      description: 'Pelajari desain identitas merek yang kuat. Logo design, brand guidelines, dan brand strategy.',
      price: 59.99,
      thumbnail: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=400&fit=crop',
      category: 'Design',
    },
    {
      id: 'course-27',
      title: 'Web Design with Figma',
      description: 'Desain website modern dengan Figma. UI design, prototyping, dan design systems.',
      price: 34.99,
      thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop',
      category: 'Design',
    },
    {
      id: 'course-28',
      title: 'Typography and Layout Design',
      description: 'Master typography dan layout design. Hierarki visual, readability, dan design principles.',
      price: 29.99,
      thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop',
      category: 'Design',
    },
    {
      id: 'course-29',
      title: '3D Design with Blender',
      description: 'Pelajari 3D modeling dan animation dengan Blender. Dari basic modeling hingga rendering.',
      price: 64.99,
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      category: 'Design',
    },
    {
      id: 'course-30',
      title: 'Design Thinking and Innovation',
      description: 'Pelajari design thinking methodology untuk problem solving dan innovation.',
      price: 39.99,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      category: 'Design',
    },

    // Marketing (10 courses)
    {
      id: 'course-31',
      title: 'Digital Marketing Mastery',
      description: 'Pelajari strategi digital marketing yang efektif. Dari SEO hingga social media marketing.',
      price: 45.99,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      category: 'Marketing',
    },
    {
      id: 'course-32',
      title: 'SEO and Search Engine Optimization',
      description: 'Master SEO untuk meningkatkan visibility website. Technical SEO, content SEO, dan link building.',
      price: 39.99,
      thumbnail: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&h=400&fit=crop',
      category: 'Marketing',
    },
    {
      id: 'course-33',
      title: 'Social Media Marketing Strategy',
      description: 'Strategi marketing di platform social media. Content creation, engagement, dan advertising.',
      price: 34.99,
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      category: 'Marketing',
    },
    {
      id: 'course-34',
      title: 'Content Marketing Excellence',
      description: 'Pelajari content marketing yang efektif. Blogging, video content, dan content strategy.',
      price: 42.99,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      category: 'Marketing',
    },
    {
      id: 'course-35',
      title: 'Google Ads and PPC Advertising',
      description: 'Master Google Ads dan PPC advertising. Campaign setup, optimization, dan ROI measurement.',
      price: 49.99,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      category: 'Marketing',
    },
    {
      id: 'course-36',
      title: 'Email Marketing Automation',
      description: 'Pelajari email marketing automation. Campaign creation, segmentation, dan analytics.',
      price: 37.99,
      thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop',
      category: 'Marketing',
    },
    {
      id: 'course-37',
      title: 'Marketing Analytics and Data',
      description: 'Gunakan data untuk marketing decisions. Google Analytics, conversion tracking, dan reporting.',
      price: 44.99,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      category: 'Marketing',
    },
    {
      id: 'course-38',
      title: 'Influencer Marketing Strategy',
      description: 'Strategi influencer marketing yang sukses. Partnership, campaign management, dan ROI.',
      price: 39.99,
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      category: 'Marketing',
    },
    {
      id: 'course-39',
      title: 'Conversion Rate Optimization',
      description: 'Optimalkan conversion rate website Anda. A/B testing, user experience, dan psychology.',
      price: 46.99,
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
      category: 'Marketing',
    },
    {
      id: 'course-40',
      title: 'Marketing Automation with Tools',
      description: 'Automate marketing processes dengan tools modern. HubSpot, Mailchimp, dan Zapier integration.',
      price: 52.99,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      category: 'Marketing',
    },

    // Health & Fitness (10 courses)
    {
      id: 'course-41',
      title: 'Fitness & Nutrition Guide',
      description: 'Panduan lengkap untuk hidup sehat. Pelajari olahraga dan nutrisi yang tepat untuk tubuh Anda.',
      price: 34.99,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      category: 'Health & Fitness',
    },
    {
      id: 'course-42',
      title: 'Weight Loss and Body Transformation',
      description: 'Program transformasi tubuh yang efektif. Diet, exercise, dan lifestyle changes untuk weight loss.',
      price: 49.99,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      category: 'Health & Fitness',
    },
    {
      id: 'course-43',
      title: 'Yoga and Mindfulness Practice',
      description: 'Pelajari yoga dan mindfulness untuk kesehatan mental dan fisik. Teknik relaksasi dan meditasi.',
      price: 29.99,
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop',
      category: 'Health & Fitness',
    },
    {
      id: 'course-44',
      title: 'Strength Training Fundamentals',
      description: 'Pelajari strength training yang benar. Form, technique, dan program latihan untuk membangun otot.',
      price: 39.99,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      category: 'Health & Fitness',
    },
    {
      id: 'course-45',
      title: 'Cardio Fitness and Endurance',
      description: 'Tingkatkan stamina dan endurance dengan cardio training. Running, cycling, dan HIIT workouts.',
      price: 32.99,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      category: 'Health & Fitness',
    },
    {
      id: 'course-46',
      title: 'Nutrition for Athletes',
      description: 'Nutrisi khusus untuk atlet dan active lifestyle. Macronutrients, supplements, dan meal planning.',
      price: 42.99,
      thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop',
      category: 'Health & Fitness',
    },
    {
      id: 'course-47',
      title: 'Mental Health and Wellness',
      description: 'Pelajari kesehatan mental dan wellness. Stress management, anxiety, dan work-life balance.',
      price: 37.99,
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop',
      category: 'Health & Fitness',
    },
    {
      id: 'course-48',
      title: 'Pilates and Core Strength',
      description: 'Pelajari Pilates untuk core strength dan flexibility. Posture improvement dan injury prevention.',
      price: 35.99,
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop',
      category: 'Health & Fitness',
    },
    {
      id: 'course-49',
      title: 'Sports Nutrition and Performance',
      description: 'Optimalkan performa olahraga dengan nutrisi. Pre-workout, recovery, dan supplementation.',
      price: 44.99,
      thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop',
      category: 'Health & Fitness',
    },
    {
      id: 'course-50',
      title: 'Healthy Aging and Longevity',
      description: 'Pelajari aging dengan sehat. Anti-aging nutrition, exercise, dan lifestyle untuk longevity.',
      price: 39.99,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      category: 'Health & Fitness',
    },

    // Music (10 courses)
    {
      id: 'course-51',
      title: 'Music Production with Logic Pro',
      description: 'Pelajari produksi musik profesional dengan Logic Pro. Dari recording hingga mixing dan mastering.',
      price: 89.99,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      category: 'Music',
    },
    {
      id: 'course-52',
      title: 'Piano for Beginners',
      description: 'Pelajari piano dari nol. Teknik dasar, reading notes, dan lagu-lagu populer.',
      price: 49.99,
      thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=400&fit=crop',
      category: 'Music',
    },
    {
      id: 'course-53',
      title: 'Guitar Mastery Course',
      description: 'Master guitar dari basic hingga advanced. Acoustic, electric, dan fingerstyle techniques.',
      price: 59.99,
      thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=400&fit=crop',
      category: 'Music',
    },
    {
      id: 'course-54',
      title: 'Music Theory Fundamentals',
      description: 'Pelajari teori musik yang essential. Scales, chords, harmony, dan composition basics.',
      price: 39.99,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      category: 'Music',
    },
    {
      id: 'course-55',
      title: 'Vocal Training and Singing',
      description: 'Pelajari teknik vokal yang benar. Breathing, pitch control, dan performance techniques.',
      price: 44.99,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      category: 'Music',
    },
    {
      id: 'course-56',
      title: 'DJ Mixing and Electronic Music',
      description: 'Pelajari DJ mixing dan produksi musik elektronik. Beatmaking, mixing, dan live performance.',
      price: 64.99,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      category: 'Music',
    },
    {
      id: 'course-57',
      title: 'Songwriting and Composition',
      description: 'Pelajari menulis lagu dan komposisi musik. Lyrics, melody, dan arrangement techniques.',
      price: 49.99,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      category: 'Music',
    },
    {
      id: 'course-58',
      title: 'Audio Engineering and Recording',
      description: 'Pelajari teknik recording dan audio engineering. Studio setup, microphone techniques, dan mixing.',
      price: 74.99,
      thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=400&fit=crop',
      category: 'Music',
    },
    {
      id: 'course-59',
      title: 'Drums and Percussion',
      description: 'Master drum techniques dan ritme. Basic patterns, fills, dan drum kit setup.',
      price: 54.99,
      thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=400&fit=crop',
      category: 'Music',
    },
    {
      id: 'course-60',
      title: 'Music Business and Industry',
      description: 'Pelajari bisnis musik dan industri. Copyright, publishing, marketing, dan career development.',
      price: 59.99,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      category: 'Music',
    },
  ]

  for (const courseData of courses) {
    await prisma.course.upsert({
      where: { id: courseData.id },
      update: {},
      create: {
        id: courseData.id,
        title: courseData.title,
        description: courseData.description,
        price: courseData.price,
        thumbnail: courseData.thumbnail,
        category: courseData.category,
        instructorId: instructor.id,
      },
    })
  }

  console.log('✅ Courses created:', courses.length)

  // Create lessons for course 1
  const lesson1 = await prisma.lesson.upsert({
    where: { id: 'lesson-1' },
    update: {},
    create: {
      id: 'lesson-1',
      title: 'Pengenalan React',
      videoUrl: 'https://example.com/video1.mp4',
      courseId: 'course-1',
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
      courseId: 'course-1',
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
      courseId: 'course-1',
      order: 3,
    },
  })

  console.log('✅ Lessons created for course 1')

  // Create enrollment for student in course 1
  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: student.id,
        courseId: 'course-1',
      },
    },
    update: {},
    create: {
      userId: student.id,
      courseId: 'course-1',
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
  console.log('📚 Available Courses by Category:')
  console.log('Development: 10 courses')
  console.log('Business: 10 courses')
  console.log('Design: 10 courses')
  console.log('Marketing: 10 courses')
  console.log('Health & Fitness: 10 courses')
  console.log('Music: 10 courses')
  console.log('Total: 60 courses')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
