"use client"

import { CourseCard } from "@/components/CourseCard"
import { AnimatedSection } from "@/components/AnimatedSection"
import { BannerCarousel } from "@/components/BannerCarousel"
import { CategoryNavbar } from "@/components/CategoryNavbar"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'

interface Course {
  id: string
  title: string
  description: string | null
  price: number
  thumbnail: string | null
  category: string | null
  instructor: {
    name: string
  }
  enrollments: any[]
}

type FilterType = 'all' | 'free' | 'paid' | 'popular' | 'business' | 'design' | 'marketing' | 'health' | 'music' | 'development'

async function getCourses(): Promise<Course[]> {
  const response = await fetch('/api/courses')
  if (!response.ok) {
    throw new Error('Failed to fetch courses')
  }
  return response.json()
}

export default function Home() {
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

  useEffect(() => {
    // Add a small delay to prevent rapid API calls
    const timer = setTimeout(() => {
      getCourses().then((data) => {
        setCourses(data)
        setLoading(false)
      }).catch((error) => {
        console.error('Error fetching courses:', error)
        setLoading(false)
      })
    }, 100) // 100ms delay

    return () => clearTimeout(timer)
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
      case 'business':
        return filtered.filter(course => course.category?.toLowerCase() === 'business')
      case 'design':
        return filtered.filter(course => course.category?.toLowerCase() === 'design')
      case 'marketing':
        return filtered.filter(course => course.category?.toLowerCase() === 'marketing')
      case 'health':
        return filtered.filter(course => course.category?.toLowerCase() === 'health & fitness')
      case 'music':
        return filtered.filter(course => course.category?.toLowerCase() === 'music')
      case 'development':
        return filtered.filter(course => course.category?.toLowerCase() === 'development')
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
      case 'business':
        return 'Business Courses'
      case 'design':
        return 'Design Courses'
      case 'marketing':
        return 'Marketing Courses'
      case 'health':
        return 'Health & Fitness Courses'
      case 'music':
        return 'Music Courses'
      case 'development':
        return 'Development Courses'
      case 'all':
      default:
        return 'Direkomendasikan untuk Anda'
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
      case 'business':
        return { text: `${filteredCourses.length} courses`, color: 'bg-indigo-100 text-indigo-800' }
      case 'design':
        return { text: `${filteredCourses.length} courses`, color: 'bg-pink-100 text-pink-800' }
      case 'marketing':
        return { text: `${filteredCourses.length} courses`, color: 'bg-yellow-100 text-yellow-800' }
      case 'health':
        return { text: `${filteredCourses.length} courses`, color: 'bg-red-100 text-red-800' }
      case 'music':
        return { text: `${filteredCourses.length} courses`, color: 'bg-purple-100 text-purple-800' }
      case 'development':
        return { text: `${filteredCourses.length} courses`, color: 'bg-blue-100 text-blue-800' }
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
        {/* Category Navbar */}
        <CategoryNavbar />

        {/* Banner Carousel */}
        <AnimatedSection>
          <div className="mt-8">
            <BannerCarousel />
          </div>
        </AnimatedSection>

        {/* Filter Buttons */}
        <AnimatedSection delay={200}>
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
            <button
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                activeFilter === 'business' && !searchQuery
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'border-gray-300 hover:bg-indigo-50 hover:border-indigo-300'
              }`}
              onClick={() => {
                setActiveFilter('business')
                setSearchQuery('')
              }}
            >
              Business ({courses.filter(c => c.category?.toLowerCase() === 'business').length})
            </button>
            <button
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                activeFilter === 'design' && !searchQuery
                  ? 'bg-pink-600 text-white border-pink-600'
                  : 'border-gray-300 hover:bg-pink-50 hover:border-pink-300'
              }`}
              onClick={() => {
                setActiveFilter('design')
                setSearchQuery('')
              }}
            >
              Design ({courses.filter(c => c.category?.toLowerCase() === 'design').length})
            </button>
            <button
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                activeFilter === 'marketing' && !searchQuery
                  ? 'bg-yellow-600 text-white border-yellow-600'
                  : 'border-gray-300 hover:bg-yellow-50 hover:border-yellow-300'
              }`}
              onClick={() => {
                setActiveFilter('marketing')
                setSearchQuery('')
              }}
            >
              Marketing ({courses.filter(c => c.category?.toLowerCase() === 'marketing').length})
            </button>
            <button
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                activeFilter === 'health' && !searchQuery
                  ? 'bg-red-600 text-white border-red-600'
                  : 'border-gray-300 hover:bg-red-50 hover:border-red-300'
              }`}
              onClick={() => {
                setActiveFilter('health')
                setSearchQuery('')
              }}
            >
              Health & Fitness ({courses.filter(c => c.category?.toLowerCase() === 'health & fitness').length})
            </button>
            <button
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                activeFilter === 'music' && !searchQuery
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'border-gray-300 hover:bg-purple-50 hover:border-purple-300'
              }`}
              onClick={() => {
                setActiveFilter('music')
                setSearchQuery('')
              }}
            >
              Music ({courses.filter(c => c.category?.toLowerCase() === 'music').length})
            </button>
            <button
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                activeFilter === 'development' && !searchQuery
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'border-gray-300 hover:bg-teal-50 hover:border-teal-300'
              }`}
              onClick={() => {
                setActiveFilter('development')
                setSearchQuery('')
              }}
            >
              Development ({courses.filter(c => c.category?.toLowerCase() === 'development').length})
            </button>
          </div>
        </AnimatedSection>

        {/* Filtered Courses Section */}
        <AnimatedSection delay={300}>
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
                          : activeFilter === 'business'
                            ? 'No business courses available yet.'
                            : activeFilter === 'design'
                              ? 'No design courses available yet.'
                              : activeFilter === 'marketing'
                                ? 'No marketing courses available yet.'
                              : activeFilter === 'health'
                                ? 'No health & fitness courses available yet.'
                              : activeFilter === 'music'
                            ? 'No music courses available yet.'
                            : activeFilter === 'development'
                              ? 'No development courses available yet.'
                              : 'No courses available yet.'
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredCourses.map((course, index) => (
                  <AnimatedSection
                    key={course.id}
                    delay={400 + index * 50}
                    direction="up"
                  >
                    <CourseCard
                      id={course.id}
                      title={course.title}
                      description={course.description || ""}
                      price={course.price}
                      thumbnail={course.thumbnail || undefined}
                      instructor={course.instructor}
                    />
                  </AnimatedSection>
                ))}
              </div>
            )}
          </section>
        </AnimatedSection>
      </div>
    </div>
  )
}
