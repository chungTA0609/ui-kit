"use client"

import type React from "react"
import { ChevronDown } from "lucide-react"

export type SplitButtonVariant = "primary" | "secondary" | "success" | "info" | "warning" | "danger"

export interface SplitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: SplitButtonVariant
    onSplitClick?: () => void
    loading?: boolean
}

export const SplitButton: React.FC<SplitButtonProps> = ({
    children,
    variant = "primary",
    onSplitClick,
    loading = false,
    className = "",
    onClick,
    disabled,
    ...props
}) => {
    const baseClassName = "ui-split-button"
    const variantClassName = `${baseClassName}--${variant}`
    const loadingClassName = loading ? `${baseClassName}--loading` : ""

    const classes = [baseClassName, variantClassName, loadingClassName, className].filter(Boolean).join(" ")

    const handleSplitClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onSplitClick?.()
    }

    return (
        <div className={classes}>
            <button className={`${baseClassName}__main`} onClick={onClick} disabled={disabled || loading} {...props}>
                {children}
            </button>
            <button
                className={`${baseClassName}__split`}
                onClick={handleSplitClick}
                disabled={disabled || loading}
                aria-label="Show more options"
            >
                <ChevronDown size={16} />
            </button>
        </div>
    )
}

