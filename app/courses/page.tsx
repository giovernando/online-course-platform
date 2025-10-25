"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CourseCard } from '../../components/CourseCard'
import { Button } from '../../components/ui/Button'

interface Course {
  id: string
  title: string
  description: string
  price: number
  thumbnail: string
  category: string
  instructor: {
    name: string
  }
  _count: {
    enrollments: number
  }
}

const categories = [
  { name: 'All Categories', value: '' },
  { name: 'Development', value: 'Development' },
  { name: 'Business', value: 'Business' },
  { name: 'Design', value: 'Design' },
  { name: 'Marketing', value: 'Marketing' },
  { name: 'Health & Fitness', value: 'Health & Fitness' },
  { name: 'Music', value: 'Music' },
]

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const searchParam = searchParams.get('search')

  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '')
  const [searchQuery, setSearchQuery] = useState(searchParam || '')

  useEffect(() => {
    fetchCourses()
  }, [selectedCategory, searchQuery])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory) params.append('category', selectedCategory)
      if (searchQuery) params.append('search', searchQuery)

      const response = await fetch(`/api/courses?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setCourses(data.courses || [])
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    // Update URL without causing a page reload
    const url = new URL(window.location.href)
    if (category) {
      url.searchParams.set('category', category)
    } else {
      url.searchParams.delete('category')
    }
    window.history.replaceState({}, '', url.toString())
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search query
    const url = new URL(window.location.href)
    if (searchQuery.trim()) {
      url.searchParams.set('search', searchQuery.trim())
    } else {
      url.searchParams.delete('search')
    }
    window.history.replaceState({}, '', url.toString())
    fetchCourses()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedCategory ? `${selectedCategory} Courses` : 'All Courses'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover courses from top instructors and advance your career
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-full focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category.value)}
                className="text-sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {selectedCategory || searchQuery
                ? `No courses found for "${selectedCategory || searchQuery}"`
                : 'No courses available'
              }
            </div>
            <Link href="/">
              <Button variant="outline">
                Browse All Courses
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
