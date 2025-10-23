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
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">By {instructor.name}</p>
        <p className="text-lg font-semibold text-green-600">
          {price === 0 ? 'Free' : `$${price}`}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/courses/${id}`} className="w-full">
          <Button className="w-full">View Course</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
