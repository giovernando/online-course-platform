import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import AddToCartButton from './AddToCartButton'
import AddToWishlistButton from './AddToWishlistButton'

interface CourseCardProps {
  id: string
  title: string
  description: string
  price: number
  thumbnail?: string
  instructor: {
    name: string
  }
}

export function CourseCard({ id, title, description, price, thumbnail, instructor }: CourseCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
      {/* Glassmorphism background with frosted effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-xl" />

      {/* Subtle light layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="aspect-video relative overflow-hidden rounded-t-xl">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-200/50 backdrop-blur-sm flex items-center justify-center rounded-t-xl">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          {/* Image overlay with glass effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-t-xl" />
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
              {title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium">By {instructor.name}</p>
              <p className="text-lg font-bold text-green-600 group-hover:text-green-700 transition-colors duration-300">
                {price === 0 ? 'Free' : `$${price}`}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Link href={`/courses/${id}`} className="flex-1">
                <Button className="w-full bg-blue-600/90 hover:bg-blue-600 text-white backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-500">
                  View Course
                </Button>
              </Link>
              <AddToWishlistButton courseId={id} courseTitle={title} />
            </div>

            <AddToCartButton courseId={id} courseTitle={title} price={price} />
          </div>
        </div>
      </div>

      {/* Subtle border glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
    </div>
  )
}
