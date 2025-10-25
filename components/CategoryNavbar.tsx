"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const developmentCategories = [
  { name: 'Web Development', href: '/courses?category=web-development' },
  { name: 'Mobile Development', href: '/courses?category=mobile-development' },
  { name: 'Game Development', href: '/courses?category=game-development' },
  { name: 'Programming Languages', href: '/courses?category=programming-languages' },
  { name: 'Database Development', href: '/courses?category=database-development' },
]

const businessCategories = [
  { name: 'Entrepreneurship', href: '/courses?category=entrepreneurship' },
  { name: 'Communication', href: '/courses?category=communication' },
  { name: 'Management', href: '/courses?category=management' },
  { name: 'Sales', href: '/courses?category=sales' },
  { name: 'Business Strategy', href: '/courses?category=business-strategy' },
]

const designCategories = [
  { name: 'Web Design', href: '/courses?category=web-design' },
  { name: 'Graphic Design & Illustration', href: '/courses?category=graphic-design' },
  { name: 'Design Tools', href: '/courses?category=design-tools' },
  { name: 'Game Design', href: '/courses?category=game-design' },
  { name: '3D & Animation', href: '/courses?category=3d-animation' },
  { name: 'UX/UI Design', href: '/courses?category=ux-ui-design' },
]

const marketingCategories = [
  { name: 'Digital Marketing', href: '/courses?category=digital-marketing' },
  { name: 'SEO', href: '/courses?category=seo' },
  { name: 'Social Media Marketing', href: '/courses?category=social-media-marketing' },
  { name: 'Branding', href: '/courses?category=branding' },
  { name: 'Marketing Fundamentals', href: '/courses?category=marketing-fundamentals' },
]

const healthCategories = [
  { name: 'Fitness', href: '/courses?category=fitness' },
  { name: 'Sports', href: '/courses?category=sports' },
  { name: 'Yoga', href: '/courses?category=yoga' },
  { name: 'Mental Health', href: '/courses?category=mental-health' },
  { name: 'Nutrition & Diet', href: '/courses?category=nutrition-diet' },
  { name: 'General Health', href: '/courses?category=general-health' },
]

const musicCategories = [
  { name: 'Instruments', href: '/courses?category=instruments' },
  { name: 'Music Production', href: '/courses?category=music-production' },
  { name: 'Music Fundamentals', href: '/courses?category=music-fundamentals' },
  { name: 'Vocal', href: '/courses?category=vocal' },
  { name: 'Music Theory', href: '/courses?category=music-theory' },
]

export function CategoryNavbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const navbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  const closeDropdown = () => {
    setOpenDropdown(null)
  }

  return (
    <nav
      ref={navbarRef}
      className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm relative z-40"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-12">
          <div className="flex items-center space-x-8">
            {/* Development Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('development')}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Development
                <svg
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    openDropdown === 'development' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Development Dropdown Menu */}
              {openDropdown === 'development' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {developmentCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                        onClick={closeDropdown}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Business Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('business')}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Business
                <svg
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    openDropdown === 'business' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Business Dropdown Menu */}
              {openDropdown === 'business' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {businessCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                        onClick={closeDropdown}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Design Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('design')}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Design
                <svg
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    openDropdown === 'design' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Design Dropdown Menu */}
              {openDropdown === 'design' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {designCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                        onClick={closeDropdown}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Marketing Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('marketing')}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Marketing
                <svg
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    openDropdown === 'marketing' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Marketing Dropdown Menu */}
              {openDropdown === 'marketing' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {marketingCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                        onClick={closeDropdown}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Health & Fitness Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('health')}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Health & Fitness
                <svg
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    openDropdown === 'health' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Health & Fitness Dropdown Menu */}
              {openDropdown === 'health' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {healthCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                        onClick={closeDropdown}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Music Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('music')}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Music
                <svg
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    openDropdown === 'music' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Music Dropdown Menu */}
              {openDropdown === 'music' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {musicCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                        onClick={closeDropdown}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
