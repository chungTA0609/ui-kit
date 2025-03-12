"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, ZoomIn, Download } from "lucide-react"
import "./Galleria.scss"

export interface GalleriaImage {
    id: string
    src: string
    alt: string
    thumbnail?: string
}

interface GalleriaProps {
    images: GalleriaImage[]
    className?: string
    thumbnailPosition?: "bottom" | "top"
    showThumbnails?: boolean
    showNavigation?: boolean
}

export function Galleria({
    images,
    className = "",
    thumbnailPosition = "bottom",
    showThumbnails = true,
    showNavigation = true,
}: GalleriaProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const mainImageRef = useRef<HTMLImageElement>(null)
    const thumbnailsRef = useRef<HTMLDivElement>(null)

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index)
    }

    const handleFullscreen = () => {
        if (mainImageRef.current) {
            if (!isFullscreen) {
                if (mainImageRef.current.requestFullscreen) {
                    mainImageRef.current.requestFullscreen()
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                }
            }
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                handlePrev()
            } else if (e.key === "ArrowRight") {
                handleNext()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }, [])

    // Scroll active thumbnail into view
    useEffect(() => {
        if (thumbnailsRef.current) {
            const activeThumb = thumbnailsRef.current.children[currentIndex] as HTMLElement
            if (activeThumb) {
                activeThumb.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                })
            }
        }
    }, [currentIndex])

    const currentImage = images[currentIndex]

    return (
        <div className={`galleria ${className} ${thumbnailPosition === "top" ? "galleria--thumbnails-top" : ""}`}>
            <div className="galleria__main">
                {showNavigation && (
                    <>
                        <button className="galleria__nav galleria__nav--prev" onClick={handlePrev} aria-label="Previous image">
                            <ChevronLeft />
                        </button>
                        <button className="galleria__nav galleria__nav--next" onClick={handleNext} aria-label="Next image">
                            <ChevronRight />
                        </button>
                    </>
                )}

                <div className="galleria__image-container">
                    <img
                        ref={mainImageRef}
                        src={currentImage.src || "/placeholder.svg"}
                        alt={currentImage.alt}
                        className="galleria__image"
                    />

                    <div className="galleria__actions">
                        <button className="galleria__action-btn" onClick={handleFullscreen} aria-label="Toggle fullscreen">
                            <ZoomIn />
                        </button>
                        <a href={currentImage.src} download className="galleria__action-btn" aria-label="Download image">
                            <Download />
                        </a>
                    </div>
                </div>
            </div>

            {showThumbnails && (
                <div className="galleria__thumbnails-wrapper">
                    <button
                        className="galleria__thumb-nav galleria__thumb-nav--prev"
                        onClick={handlePrev}
                        aria-label="Previous thumbnails"
                    >
                        <ChevronLeft />
                    </button>

                    <div className="galleria__thumbnails" ref={thumbnailsRef}>
                        {images.map((image, index) => (
                            <button
                                key={image.id}
                                className={`galleria__thumbnail ${index === currentIndex ? "galleria__thumbnail--active" : ""}`}
                                onClick={() => handleThumbnailClick(index)}
                                aria-label={`View image ${index + 1}`}
                                aria-current={index === currentIndex}
                            >
                                <img src={image.thumbnail || image.src} alt={image.alt} loading="lazy" />
                            </button>
                        ))}
                    </div>

                    <button
                        className="galleria__thumb-nav galleria__thumb-nav--next"
                        onClick={handleNext}
                        aria-label="Next thumbnails"
                    >
                        <ChevronRight />
                    </button>
                </div>
            )}
        </div>
    )
}

