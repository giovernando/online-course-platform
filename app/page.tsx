"use client"

import { CourseCard } from "@/components/CourseCard"
import { useEffect, useState } from "react"

interface Course {
  id: string
  title: string
  description: string | null
  price: number
  thumbnail: string | null
  instructor: {
    name: string
  }
  enrollments: any[]
}

type FilterType = 'all' | 'free' | 'paid' | 'popular'

async function getCourses(): Promise<Course[]> {
  const response = await fetch('/api/courses')
  if (!response.ok) {
    throw new Error('Failed to fetch courses')
  }
  return response.json()
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getCourses().then((data) => {
      setCourses(data)
      setLoading(false)
    }).catch((error) => {
      console.error('Error fetching courses:', error)
      setLoading(false)
    })
  }, [])

  // Calculate filtered courses based on active filter and search
  const getFilteredCourses = () => {
    let filtered = courses

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    switch (activeFilter) {
      case 'free':
        return filtered.filter(course => course.price === 0)
      case 'paid':
        return filtered.filter(course => course.price > 0)
      case 'popular':
        return [...filtered]
          .sort((a, b) => b.enrollments.length - a.enrollments.length)
          .slice(0, 6)
      case 'all':
      default:
        return filtered
    }
  }

  const filteredCourses = getFilteredCourses()

  const getSectionTitle = () => {
    if (searchQuery.trim()) {
      return `Search Results for "${searchQuery}"`
    }

    switch (activeFilter) {
      case 'free':
        return 'Free Courses'
      case 'paid':
        return 'Premium Courses'
      case 'popular':
        return 'Popular Courses'
      case 'all':
      default:
        return 'All Courses'
    }
  }

  const getSectionBadge = () => {
    if (searchQuery.trim()) {
      return { text: `${filteredCourses.length} results`, color: 'bg-blue-100 text-blue-800' }
    }

    switch (activeFilter) {
      case 'free':
        return { text: `${filteredCourses.length} courses`, color: 'bg-green-100 text-green-800' }
      case 'paid':
        return { text: `${filteredCourses.length} courses`, color: 'bg-purple-100 text-purple-800' }
      case 'popular':
        return { text: 'Most Enrolled', color: 'bg-orange-100 text-orange-800' }
      case 'all':
      default:
        return { text: `${filteredCourses.length} courses`, color: 'bg-blue-100 text-blue-800' }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    )
  }

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

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none transition-colors duration-300 shadow-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
              activeFilter === 'all' && !searchQuery
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 hover:bg-blue-50 hover:border-blue-300'
            }`}
            onClick={() => {
              setActiveFilter('all')
              setSearchQuery('')
            }}
          >
            All Courses ({courses.length})
          </button>
          <button
            className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
              activeFilter === 'free' && !searchQuery
                ? 'bg-green-600 text-white border-green-600'
                : 'border-gray-300 hover:bg-green-50 hover:border-green-300'
            }`}
            onClick={() => {
              setActiveFilter('free')
              setSearchQuery('')
            }}
          >
            Free Courses ({courses.filter(c => c.price === 0).length})
          </button>
          <button
            className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
              activeFilter === 'paid' && !searchQuery
                ? 'bg-purple-600 text-white border-purple-600'
                : 'border-gray-300 hover:bg-purple-50 hover:border-purple-300'
            }`}
            onClick={() => {
              setActiveFilter('paid')
              setSearchQuery('')
            }}
          >
            Premium Courses ({courses.filter(c => c.price > 0).length})
          </button>
          <button
            className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
              activeFilter === 'popular' && !searchQuery
                ? 'bg-orange-600 text-white border-orange-600'
                : 'border-gray-300 hover:bg-orange-50 hover:border-orange-300'
            }`}
            onClick={() => {
              setActiveFilter('popular')
              setSearchQuery('')
            }}
          >
            Popular Courses
          </button>
        </div>

        {/* Filtered Courses Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{getSectionTitle()}</h2>
            <span className={`text-sm px-3 py-1 rounded-full ${getSectionBadge().color}`}>
              {getSectionBadge().text}
            </span>
          </div>
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl">
              <p className="text-gray-500 text-lg">
                {searchQuery.trim()
                  ? `No courses found for "${searchQuery}". Try different keywords.`
                  : activeFilter === 'free'
                    ? 'No free courses available yet.'
                    : activeFilter === 'paid'
                      ? 'No premium courses available yet.'
                      : activeFilter === 'popular'
                        ? 'No courses available yet.'
                        : 'No courses available yet.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
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
