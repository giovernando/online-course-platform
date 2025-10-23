"use client"

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from './ui/Button'
import { CartBadge } from './CartBadge'
import { WishlistBadge } from './WishlistBadge'

export function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Online Course
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : session ? (
              <>
                {/* Wishlist and Cart Icons with badges */}
                <WishlistBadge />
                <CartBadge />

                <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                {(session.user as any)?.role === 'INSTRUCTOR' && (
                  <Link href="/instructor/create" className="text-gray-700 hover:text-gray-900">
                    Create Course
                  </Link>
                )}
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
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
