import React from "react"

export interface ButtonGroupProps {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "success" | "info" | "warning" | "help" | "danger"
    className?: string
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, variant = "primary", className = "" }) => {
    const baseClassName = "ui-button-group"
    const variantClassName = variant ? `${baseClassName}--${variant}` : ""

    const classes = [baseClassName, variantClassName, className].filter(Boolean).join(" ")

    return (
        <div className={classes}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        className: `${child.props.className || ""} ${baseClassName}__button ${baseClassName}__button-${index === 0 ? "first" : index === React.Children.count(children) - 1 ? "last" : "middle"}`,
                        variant: child.props.variant || variant,
                    })
                }
                return child
            })}
        </div>
    )
}

