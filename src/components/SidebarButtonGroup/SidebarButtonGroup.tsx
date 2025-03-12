"use client"

import type React from "react"
import { ArrowRight, ArrowLeft, ArrowDown, ArrowUp, RotateCw } from "lucide-react"
import "./SidebarButtonGroup.scss"

export interface SidebarButtonGroupProps {
    onNavigateRight?: () => void
    onNavigateLeft?: () => void
    onNavigateDown?: () => void
    onNavigateUp?: () => void
    onRefresh?: () => void
    className?: string
    activeDirection?: "right" | "left" | "down" | "up" | null
}

export const SidebarButtonGroup: React.FC<SidebarButtonGroupProps> = ({
    onNavigateRight,
    onNavigateLeft,
    onNavigateDown,
    onNavigateUp,
    onRefresh,
    className = "",
    activeDirection = null,
}) => {
    return (
        <div className={`sidebar-button-group ${className}`}>
            <button
                className={`sidebar-button-group__button ${activeDirection === "right" ? "sidebar-button-group__button--active" : ""}`}
                onClick={onNavigateRight}
                aria-label="Navigate right"
            >
                <ArrowRight size={16} />
            </button>
            <button
                className={`sidebar-button-group__button ${activeDirection === "left" ? "sidebar-button-group__button--active" : ""}`}
                onClick={onNavigateLeft}
                aria-label="Navigate left"
            >
                <ArrowLeft size={16} />
            </button>
            <button
                className={`sidebar-button-group__button ${activeDirection === "down" ? "sidebar-button-group__button--active" : ""}`}
                onClick={onNavigateDown}
                aria-label="Navigate down"
            >
                <ArrowDown size={16} />
            </button>
            <button
                className={`sidebar-button-group__button ${activeDirection === "up" ? "sidebar-button-group__button--active" : ""}`}
                onClick={onNavigateUp}
                aria-label="Navigate up"
            >
                <ArrowUp size={16} />
            </button>
            <button className="sidebar-button-group__button" onClick={onRefresh} aria-label="Refresh">
                <RotateCw size={16} />
            </button>
        </div>
    )
}

