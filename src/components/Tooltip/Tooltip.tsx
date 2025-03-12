"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"
import "./Tooltip.scss"

export type TooltipPosition = "top" | "right" | "bottom" | "left"
export type TooltipTrigger = "hover" | "click" | "both"

interface TooltipProps {
    content: ReactNode
    position?: TooltipPosition
    trigger?: TooltipTrigger
    className?: string
    children: ReactNode
    showArrow?: boolean
    delay?: number
}

export function Tooltip({
    content,
    position = "top",
    trigger = "hover",
    className = "",
    children,
    showArrow = true,
    delay = 200,
}: TooltipProps) {
    const [visible, setVisible] = useState(false)
    const [coords, setCoords] = useState({ top: 0, left: 0 })
    const targetRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Calculate position when tooltip becomes visible
    useEffect(() => {
        if (visible && targetRef.current && tooltipRef.current) {
            const targetRect = targetRef.current.getBoundingClientRect()
            const tooltipRect = tooltipRef.current.getBoundingClientRect()

            // Calculate position based on the specified position prop
            let top = 0
            let left = 0

            switch (position) {
                case "top":
                    top = targetRect.top - tooltipRect.height - 8
                    left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
                    break
                case "right":
                    top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
                    left = targetRect.right + 8
                    break
                case "bottom":
                    top = targetRect.bottom + 8
                    left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
                    break
                case "left":
                    top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
                    left = targetRect.left - tooltipRect.width - 8
                    break
            }

            // Adjust for window boundaries
            if (left < 0) left = 0
            if (top < 0) top = 0
            if (left + tooltipRect.width > window.innerWidth) {
                left = window.innerWidth - tooltipRect.width
            }
            if (top + tooltipRect.height > window.innerHeight) {
                top = window.innerHeight - tooltipRect.height
            }

            setCoords({ top, left })
        }
    }, [visible, position])

    // Handle click outside to close tooltip
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                visible &&
                trigger !== "hover" &&
                targetRef.current &&
                !targetRef.current.contains(event.target as Node) &&
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target as Node)
            ) {
                setVisible(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [visible, trigger])

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const showTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            setVisible(true)
        }, delay)
    }

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        if (trigger !== "click") {
            setVisible(false)
        }
    }

    const toggleTooltip = () => {
        setVisible((prev) => !prev)
    }

    const handleClick = () => {
        if (trigger === "click" || trigger === "both") {
            toggleTooltip()
        }
    }

    const handleMouseEnter = () => {
        if (trigger === "hover" || trigger === "both") {
            showTooltip()
        }
    }

    const handleMouseLeave = () => {
        if (trigger === "hover" || trigger === "both") {
            hideTooltip()
        }
    }

    return (
        <>
            <div
                ref={targetRef}
                className="tooltip-trigger"
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>

            {visible &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        className={`tooltip tooltip--${position} ${className}`}
                        style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="tooltip__content">{content}</div>
                        {showArrow && <div className={`tooltip__arrow tooltip__arrow--${position}`} />}
                    </div>,
                    document.body,
                )}
        </>
    )
}

