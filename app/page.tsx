import { CourseCard } from "@/components/CourseCard"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { useState } from "react"

async function getCourses() {
  const courses = await prisma.course.findMany({
    include: {
      instructor: {
        select: {
          name: true,
        },
      },
      enrollments: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return courses
}

export default async function Home() {
  const courses = await getCourses()

  // Calculate popular courses (most enrollments)
  const popularCourses = [...courses]
    .sort((a, b) => b.enrollments.length - a.enrollments.length)
    .slice(0, 6)

  const freeCourses = courses.filter(course => course.price === 0)
  const paidCourses = courses.filter(course => course.price > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Welcome to Online Course Platform
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Learn from the best instructors and advance your career with our comprehensive course library
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Start Learning Today
            </button>
          </div>
        </section>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant="outline"
            className="px-6 py-3 rounded-full border-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
            onClick={() => {
              // Filter logic will be handled by client component
              document.getElementById('all-courses')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            All Courses ({courses.length})
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 rounded-full border-2 hover:bg-green-50 hover:border-green-300 transition-all duration-300"
            onClick={() => {
              document.getElementById('free-courses')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Free Courses ({freeCourses.length})
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 rounded-full border-2 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
            onClick={() => {
              document.getElementById('paid-courses')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Premium Courses ({paidCourses.length})
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 rounded-full border-2 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
            onClick={() => {
              document.getElementById('popular-courses')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Popular Courses
          </Button>
        </div>

        {/* Popular Courses Section */}
        <section id="popular-courses" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
            <span className="text-sm text-gray-500 bg-orange-100 px-3 py-1 rounded-full">
              Most Enrolled
            </span>
          </div>
          {popularCourses.length === 0 ? (
            <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl">
              <p className="text-gray-500 text-lg">No courses available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularCourses.map((course) => (
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

        {/* All Courses Section */}
        <section id="all-courses" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">All Courses</h2>
            <span className="text-sm text-gray-500 bg-blue-100 px-3 py-1 rounded-full">
              {courses.length} courses
            </span>
          </div>
          {courses.length === 0 ? (
            <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl">
              <p className="text-gray-500 text-lg">No courses available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Free Courses Section */}
        <section id="free-courses" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Free Courses</h2>
            <span className="text-sm text-gray-500 bg-green-100 px-3 py-1 rounded-full">
              {freeCourses.length} courses
            </span>
          </div>
          {freeCourses.length === 0 ? (
            <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl">
              <p className="text-gray-500 text-lg">No free courses available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {freeCourses.map((course) => (
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

        {/* Paid Courses Section */}
        <section id="paid-courses" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Premium Courses</h2>
            <span className="text-sm text-gray-500 bg-purple-100 px-3 py-1 rounded-full">
              {paidCourses.length} courses
            </span>
          </div>
          {paidCourses.length === 0 ? (
            <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl">
              <p className="text-gray-500 text-lg">No premium courses available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paidCourses.map((course) => (
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
    </div>
  )
}
