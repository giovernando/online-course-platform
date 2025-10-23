'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface MarkCompleteButtonProps {
  lessonId: string
  courseId: string
  isCompleted: boolean
}

export default function MarkCompleteButton({
  lessonId,
  courseId,
  isCompleted
}: MarkCompleteButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleMarkComplete = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/progress', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId,
          courseId,
          completed: true,
        }),
      })

      if (response.ok) {
        toast.success('Lesson marked as complete!')
        // Refresh the page to update the UI
        window.location.reload()
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to mark lesson as complete')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (isCompleted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <div className="text-green-600 font-semibold">✓ Lesson Completed</div>
        <p className="text-sm text-green-600 mt-1">
          Great job! You've completed this lesson.
        </p>
      </div>
    )
  }

  return (
    <Button
      className="w-full"
      onClick={handleMarkComplete}
      disabled={loading}
    >
      {loading ? 'Marking...' : 'Mark as Complete'}
    </Button>
  )
}
