import type React from "react"

export type IconButtonVariant = "primary" | "secondary" | "success" | "info" | "warning" | "help" | "danger"

export type IconButtonStyle = "filled" | "outlined"

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode
    variant?: IconButtonVariant
    buttonStyle?: IconButtonStyle
    size?: "small" | "medium" | "large"
    loading?: boolean
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    variant = "primary",
    buttonStyle = "filled",
    size = "medium",
    loading = false,
    className = "",
    disabled,
    ...props
}) => {
    const baseClassName = "ui-icon-button"
    const variantClassName = `${baseClassName}--${variant}`
    const styleClassName = buttonStyle === "outlined" ? `${baseClassName}--outlined` : ""
    const sizeClassName = size !== "medium" ? `${baseClassName}--${size}` : ""
    const loadingClassName = loading ? `${baseClassName}--loading` : ""

    const classes = [baseClassName, variantClassName, styleClassName, sizeClassName, loadingClassName, className]
        .filter(Boolean)
        .join(" ")

    return (
        <button className={classes} disabled={disabled || loading} {...props}>
            {icon}
        </button>
    )
}

