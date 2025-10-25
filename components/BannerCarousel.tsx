"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BannerSlide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
}

const bannerSlides: BannerSlide[] = [
  {
    id: '1',
    title: 'Welcome to Online Course Platform',
    subtitle: 'Start Your Learning Journey',
    description: 'Learn from the best instructors and advance your career with our comprehensive course library',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    buttonText: 'Start Learning Today',
    buttonLink: '#courses'
  },
  {
    id: '2',
    title: 'Expert Instructors',
    subtitle: 'Learn from Industry Leaders',
    description: 'Get guidance from professionals with years of experience in their respective fields',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    buttonText: 'Meet Our Instructors',
    buttonLink: '#instructors'
  },
  {
    id: '3',
    title: 'Flexible Learning',
    subtitle: 'Learn at Your Own Pace',
    description: 'Access courses anytime, anywhere with our flexible learning platform',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    buttonText: 'Explore Courses',
    buttonLink: '#courses'
  },
  {
    id: '4',
    title: 'Career Advancement',
    subtitle: 'Boost Your Professional Skills',
    description: 'Gain new skills and certifications to advance your career in today\'s competitive market',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    buttonText: 'View Certifications',
    buttonLink: '#certifications'
  }
]

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  return (
    <section className="relative text-center py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl mb-12 overflow-hidden min-h-[500px] flex items-center justify-center">
      {/* Background Images */}
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            animation: index === currentSlide ? 'bannerPopup 3s ease-in-out infinite' : 'none'
          }}
        />
      ))}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-purple-900/60 to-indigo-900/70" />

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`transition-all duration-1000 ${
              index === currentSlide
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform translate-y-8 absolute inset-0'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              {slide.title}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 opacity-90 animate-fade-in-up animation-delay-200">
              {slide.subtitle}
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
              {slide.description}
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg text-lg animate-fade-in-up animation-delay-600 hover:animate-pulse">
              {slide.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
