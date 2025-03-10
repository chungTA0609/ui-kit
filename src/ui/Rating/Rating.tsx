"use client"

import type React from "react"

import { useState } from "react"
import { Star, X } from "lucide-react"

export interface RatingProps {
    value?: number
    onChange?: (value: number) => void
    count?: number
    allowClear?: boolean
    className?: string
    disabled?: boolean
}

export const Rating: React.FC<RatingProps> = ({
    value = 0,
    onChange,
    count = 5,
    allowClear = true,
    className = "",
    disabled = false,
}) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null)

    const handleClick = (index: number) => {
        if (disabled) return
        if (index === -1) {
            // Clear rating
            onChange?.(0)
        } else {
            onChange?.(index + 1)
        }
    }

    const handleMouseEnter = (index: number) => {
        if (disabled) return
        setHoverValue(index + 1)
    }

    const handleMouseLeave = () => {
        if (disabled) return
        setHoverValue(null)
    }

    const displayValue = hoverValue !== null ? hoverValue : value

    return (
        <div className={`ui-rating ${className}`} onMouseLeave={handleMouseLeave}>
            {allowClear && (
                <button
                    type="button"
                    onClick={() => handleClick(-1)}
                    className={`ui-rating__clear ${value === 0 ? "ui-rating__clear--active" : ""}`}
                    disabled={disabled}
                >
                    <X size={20} />
                </button>
            )}
            {[...Array(count)].map((_, index) => (
                <button
                    key={index}
                    type="button"
                    className={`ui-rating__star ${index < displayValue ? "ui-rating__star--filled" : ""}`}
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    disabled={disabled}
                >
                    <Star size={20} />
                </button>
            ))}
        </div>
    )
}

