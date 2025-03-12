"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import lottie, { type AnimationItem } from "lottie-web"
import "./LottieAnimation.scss"

export interface LottieAnimationProps {
  path: string
  width?: number | string
  height?: number | string
  loop?: boolean
  autoplay?: boolean
  className?: string
  onComplete?: () => void
  speed?: number
}

export function LottieAnimation({
  path,
  width = "100%",
  height = "100%",
  loop = true,
  autoplay = true,
  className = "",
  onComplete,
  speed = 1,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Load the animation
    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop,
      autoplay,
      path, // Load animation from URL
    })

    // Set animation speed
    animationRef.current.setSpeed(speed)

    // Add complete listener if provided
    if (onComplete) {
      animationRef.current.addEventListener("complete", onComplete)
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
      }
    }
  }, [path, loop, autoplay, onComplete, speed])

  const containerStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  }

  return (
    <div ref={containerRef} className={`lottie-animation ${className}`} style={containerStyle} aria-hidden="true" />
  )
}

