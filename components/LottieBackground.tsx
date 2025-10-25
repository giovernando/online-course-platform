"use client"

import { useEffect, useRef } from 'react'
import Lottie from 'lottie-react'

// Simple educational animation data
const educationAnimation = {
  v: "5.7.1",
  fr: 30,
  ip: 0,
  op: 180,
  w: 1920,
  h: 1080,
  layers: [
    {
      ty: 4,
      nm: "Floating Books",
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [960, 540, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              s: { k: [200, 60] },
              p: { k: [0, 0] },
              r: { k: 4 }
            },
            {
              ty: "fl",
              c: { k: [0.2, 0.4, 0.8, 1] },
              o: { k: 100 },
              r: 2
            },
            {
              ty: "tr",
              p: { k: [0, 0] },
              a: { k: [0, 0] },
              s: { k: [100, 100] },
              r: { k: 0 },
              o: { k: 100 }
            }
          ]
        }
      ]
    }
  ]
}

interface LottieBackgroundProps {
  className?: string
}

export function LottieBackground({ className = "" }: LottieBackgroundProps) {
  const lottieRef = useRef<any>()

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5) // Slow down animation
    }
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Lottie
        lottieRef={lottieRef}
        animationData={educationAnimation}
        loop={true}
        autoplay={true}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
    </div>
  )
}
