"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Clock, Play, Calendar, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/Button"
import AddToCartButton from "./AddToCartButton"
import AddToWishlistButton from "./AddToWishlistButton"

interface CourseQuickViewModalProps {
  course: {
    id: string
    title: string
    description: string | null
    price: number
    thumbnail: string | null
    category: string | null
    instructor: {
      name: string
    }
    lessons: {
      id: string
      title: string
      videoUrl: string | null
      duration: number | null
    }[]
    createdAt: string
    updatedAt: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function CourseQuickViewModal({ course, isOpen, onClose }: CourseQuickViewModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!course || !isOpen) return null

  const totalDuration = course.lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0)
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-500 ${
        isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-8'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Image */}
          <div className="lg:w-2/5 relative">
            <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-t-none">
              {course.thumbnail ? (
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Play className="w-8 h-8 text-gray-500" />
                    </div>
                    <span className="text-gray-500 font-medium">No Image</span>
                  </div>
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Quick Action Buttons - Repositioned */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                <AddToWishlistButton courseId={course.id} courseTitle={course.title} />
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                <AddToCartButton courseId={course.id} courseTitle={course.title} price={course.price} />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-3/5 p-10 flex flex-col">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-full shadow-lg">
                  {course.category || 'Uncategorized'}
                </span>
                <span className="text-3xl font-bold text-green-600 bg-green-50 px-4 py-2 rounded-2xl">
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                {course.title}
              </h2>

              <p className="text-gray-600 text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                By {course.instructor.name}
              </p>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <div className="bg-blue-500 p-3 rounded-xl shadow-lg">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{course.lessons.length}</p>
                  <p className="text-sm text-gray-600 font-medium">Lessons</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200">
                <div className="bg-green-500 p-3 rounded-xl shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{formatDuration(totalDuration)}</p>
                  <p className="text-sm text-gray-600 font-medium">Duration</p>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-base text-gray-800 font-medium">
                Last updated: {formatDate(course.updatedAt)}
              </span>
            </div>

            {/* Description */}
            <div className="flex-1 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Course Description</h3>
              <p className="text-gray-700 text-base leading-relaxed line-clamp-4">
                {course.description || 'No description available for this course.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                onClick={() => {
                  window.location.href = `/courses/${course.id}`
                }}
              >
                View Full Course Details
              </Button>

              <div className="grid grid-cols-2 gap-4">
                <AddToWishlistButton courseId={course.id} courseTitle={course.title} />
                <AddToCartButton courseId={course.id} courseTitle={course.title} price={course.price} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
