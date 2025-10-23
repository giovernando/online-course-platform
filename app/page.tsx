import { CourseCard } from "@/components/CourseCard"
import { prisma } from "@/lib/prisma"

async function getCourses() {
  const courses = await prisma.course.findMany({
    include: {
      instructor: {
        select: {
          name: true,
        },
      },
    },
  })
  return courses
}

export default async function Home() {
  const courses = await getCourses()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Online Course Platform
        </h1>
        <p className="text-xl mb-8">
          Learn from the best instructors and advance your career
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
          Start Learning Today
        </button>
      </section>

      {/* Courses Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Available Courses</h2>
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No courses available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description || ""}
                price={course.price}
                thumbnail={course.thumbnail || undefined}
                instructor={course.instructor}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
