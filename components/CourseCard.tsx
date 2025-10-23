import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'

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
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video relative overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>
      <CardHeader className="group-hover:bg-gray-50 transition-colors duration-300">
        <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{title}</CardTitle>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardContent className="group-hover:bg-gray-50 transition-colors duration-300">
        <p className="text-sm text-gray-600">By {instructor.name}</p>
        <p className="text-lg font-semibold text-green-600 group-hover:text-green-700 transition-colors duration-300">
          {price === 0 ? 'Free' : `$${price}`}
        </p>
      </CardContent>
      <CardFooter className="group-hover:bg-gray-50 transition-colors duration-300">
        <Link href={`/courses/${id}`} className="w-full">
          <Button className="w-full group-hover:bg-blue-600 group-hover:scale-105 transition-all duration-300">
            View Course
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
