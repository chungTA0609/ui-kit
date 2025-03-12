import type React from "react"
import "./SkeletonLoader.scss"

export type SkeletonVariant = "text" | "circular" | "rectangular" | "card" | "avatar" | "button"

export interface SkeletonLoaderProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  className?: string
  animation?: "pulse" | "wave" | "none"
  count?: number
}

export function SkeletonLoader({
  variant = "text",
  width,
  height,
  className = "",
  animation = "pulse",
  count = 1,
}: SkeletonLoaderProps) {
  const getStyle = () => {
    const style: React.CSSProperties = {}

    if (width) {
      style.width = typeof width === "number" ? `${width}px` : width
    }

    if (height) {
      style.height = typeof height === "number" ? `${height}px` : height
    }

    return style
  }

  const renderSkeleton = (index: number) => (
    <div
      key={index}
      className={`skeleton-loader skeleton-loader--${variant} skeleton-loader--${animation} ${className}`}
      style={getStyle()}
      aria-hidden="true"
    />
  )

  return <>{Array.from({ length: count }).map((_, index) => renderSkeleton(index))}</>
}

