"use client"

import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { Button } from './ui/Button'
import { CartBadge } from './CartBadge'
import { WishlistBadge } from './WishlistBadge'
import { UserProfileDropdown } from './UserProfileDropdown'
import { useState } from 'react'

export function Navbar() {
  const { data: session, status } = useSession()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to homepage with search query
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <nav className="border-b bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Online Course
            </Link>
          </div>

          {/* Search Bar in Navbar */}
          <div className="flex-1 max-w-md mx-8 flex items-center">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search courses, instructors, or topics..."
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

          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : session ? (
              <>
                {/* Wishlist and Cart Icons with badges */}
                <WishlistBadge />
                <CartBadge />

                {(session.user as any)?.role === 'INSTRUCTOR' && (
                  <Link href="/instructor/create" className="text-gray-700 hover:text-gray-900">
                    Create Course
                  </Link>
                )}

                {/* User Profile Dropdown */}
                <UserProfileDropdown />
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => signIn()}>
                  Sign In
                </Button>
                <Link href="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
