"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Search, Star, Settings } from "lucide-react"
import "./Carousel.scss"

export interface CarouselItem {
    id: string
    name: string
    image: string
    price: number
    status: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK"
}

interface CarouselProps {
    items: CarouselItem[]
    className?: string
}

export function Carousel({ items, className = "" }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const itemsPerView = 3

    const totalPages = Math.ceil(items.length / itemsPerView)
    const canGoNext = currentIndex < totalPages - 1
    const canGoPrev = currentIndex > 0

    const handleNext = () => {
        if (canGoNext && !isAnimating) {
            setIsAnimating(true)
            setCurrentIndex((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        if (canGoPrev && !isAnimating) {
            setIsAnimating(true)
            setCurrentIndex((prev) => prev - 1)
        }
    }

    const handleDotClick = (index: number) => {
        if (!isAnimating) {
            setIsAnimating(true)
            setCurrentIndex(index)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false)
        }, 300) // Match this with the CSS transition duration

        return () => clearTimeout(timer)
    }, [currentIndex])

    const getStatusClass = (status: CarouselItem["status"]) => {
        switch (status) {
            case "INSTOCK":
                return "carousel__status--instock"
            case "LOWSTOCK":
                return "carousel__status--lowstock"
            case "OUTOFSTOCK":
                return "carousel__status--outofstock"
            default:
                return ""
        }
    }

    return (
        <div className={`carousel ${className}`}>
            <div className="carousel__container" ref={containerRef}>
                <div
                    className="carousel__track"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {items.map((item) => (
                        <div key={item.id} className="carousel__item">
                            <div className="carousel__image-container">
                                <img src={item.image || "/placeholder.svg"} alt={item.name} className="carousel__image" />
                            </div>
                            <h3 className="carousel__title">{item.name}</h3>
                            <div className="carousel__price">${item.price.toLocaleString()}</div>
                            <div className={`carousel__status ${getStatusClass(item.status)}`}>{item.status}</div>
                            <div className="carousel__actions">
                                <button className="carousel__action-btn" aria-label="Search">
                                    <Search size={16} />
                                </button>
                                <button className="carousel__action-btn" aria-label="Favorite">
                                    <Star size={16} />
                                </button>
                                <button className="carousel__action-btn" aria-label="Settings">
                                    <Settings size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="carousel__nav carousel__nav--prev"
                onClick={handlePrev}
                disabled={!canGoPrev}
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                className="carousel__nav carousel__nav--next"
                onClick={handleNext}
                disabled={!canGoNext}
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            <div className="carousel__dots">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        className={`carousel__dot ${index === currentIndex ? "carousel__dot--active" : ""}`}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

