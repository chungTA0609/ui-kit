"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download } from "lucide-react"
import "./ImageLightbox.scss"

export interface ImageItem {
  src: string
  alt: string
  thumbnail?: string
}

export interface ImageLightboxProps {
  images: ImageItem[]
  initialIndex?: number
  onClose?: () => void
  className?: string
}

export function ImageLightbox({ images, initialIndex = 0, onClose, className = "" }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentImage = images[currentIndex]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          navigatePrev()
          break
        case "ArrowRight":
          navigateNext()
          break
        case "Escape":
          handleClose()
          break
        case " ": // Space key
          toggleZoom()
          e.preventDefault()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, isZoomed])

  const navigateNext = () => {
    if (isZoomed) return
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const navigatePrev = () => {
    if (isZoomed) return
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleClose = () => {
    if (onClose) onClose()
  }

  const toggleZoom = () => {
    if (isZoomed) {
      setIsZoomed(false)
      setPosition({ x: 0, y: 0 })
    } else {
      setIsZoomed(true)
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y
    setPosition({ x: newX, y: newY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = currentImage.src
    link.download = currentImage.alt || "image"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={`image-lightbox ${className}`}>
      <div className="image-lightbox__overlay" onClick={handleClose}>
        <div className="image-lightbox__container" onClick={(e) => e.stopPropagation()} ref={containerRef}>
          <div
            className={`image-lightbox__image-wrapper ${isZoomed ? "image-lightbox__image-wrapper--zoomed" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <img
              ref={imageRef}
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.alt}
              className="image-lightbox__image"
              style={{
                transform: isZoomed ? `scale(2) translate(${position.x / 20}px, ${position.y / 20}px)` : "none",
                cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "default",
              }}
            />
          </div>

          <div className="image-lightbox__controls">
            <button className="image-lightbox__control-btn" onClick={handleClose} aria-label="Close">
              <X />
            </button>
            <button className="image-lightbox__control-btn" onClick={toggleZoom} aria-label="Zoom">
              {isZoomed ? <ZoomOut /> : <ZoomIn />}
            </button>
            <button className="image-lightbox__control-btn" onClick={handleDownload} aria-label="Download">
              <Download />
            </button>
          </div>

          {images.length > 1 && !isZoomed && (
            <>
              <button
                className="image-lightbox__nav-btn image-lightbox__nav-btn--prev"
                onClick={navigatePrev}
                aria-label="Previous image"
              >
                <ChevronLeft />
              </button>
              <button
                className="image-lightbox__nav-btn image-lightbox__nav-btn--next"
                onClick={navigateNext}
                aria-label="Next image"
              >
                <ChevronRight />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="image-lightbox__thumbnails">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`image-lightbox__thumbnail ${
                    index === currentIndex ? "image-lightbox__thumbnail--active" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img src={image.thumbnail || image.src} alt={image.alt} />
                </button>
              ))}
            </div>
          )}

          <div className="image-lightbox__caption">{currentImage.alt}</div>
        </div>
      </div>
    </div>
  )
}

