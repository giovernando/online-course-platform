import { ReactNode } from 'react'
import { useIntersectionObserver } from '@/lib/useIntersectionObserver'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up'
}: AnimatedSectionProps) {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(50px)'
      case 'down':
        return 'translateY(-50px)'
      case 'left':
        return 'translateX(50px)'
      case 'right':
        return 'translateX(-50px)'
      case 'fade':
        return 'translateY(0px)'
      default:
        return 'translateY(50px)'
    }
  }

  const getAnimationClass = () => {
    if (!hasIntersected) {
      return 'opacity-0'
    }
    return 'opacity-100 translate-y-0 translate-x-0'
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
      style={{
        transform: hasIntersected ? 'translateY(0) translateX(0)' : getInitialTransform(),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
