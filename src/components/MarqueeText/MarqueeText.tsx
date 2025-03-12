"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import "./MarqueeText.scss"

export interface MarqueeTextProps {
  children: React.ReactNode
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
  gap?: number
  repeat?: number
}

export function MarqueeText({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
  gap = 40,
  repeat = 2,
}: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (containerRef.current) {
      const firstChild = containerRef.current.firstElementChild as HTMLElement
      if (firstChild) {
        setContentWidth(firstChild.offsetWidth)
      }
    }

    const handleResize = () => {
      if (containerRef.current) {
        const firstChild = containerRef.current.firstElementChild as HTMLElement
        if (firstChild) {
          setContentWidth(firstChild.offsetWidth)
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [children])

  const duration = contentWidth > 0 ? contentWidth / speed : 0

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true)
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false)
    }
  }

  const renderContent = () => {
    return Array.from({ length: repeat }).map((_, index) => (
      <div key={index} className="marquee-text__content" style={{ marginRight: `${gap}px` }}>
        {children}
      </div>
    ))
  }

  return (
    <div
      className={`marquee-text ${className} ${isPaused ? "marquee-text--paused" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={containerRef}
        className={`marquee-text__container marquee-text__container--${direction}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {renderContent()}
      </div>
    </div>
  )
}

