import type React from "react"
import { CircularProgress } from "@mui/material"
import { KeyboardArrowDown } from "@mui/icons-material"

export type ButtonVariant = "primary" | "secondary" | "success" | "info" | "warning" | "help" | "danger"

export type ButtonStyle = "contained" | "outlined" | "text"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  buttonStyle?: ButtonStyle
  rounded?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  split?: boolean
  template?: "google" | "twitter" | "discord"
  fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  buttonStyle = "contained",
  rounded = false,
  loading = false,
  icon,
  iconPosition = "left",
  split = false,
  template,
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...props
}) => {
  const baseClassName = "ui-button"
  const variantClassName = `${baseClassName}--${variant}`
  const styleClassName = buttonStyle !== "contained" ? `${baseClassName}--${buttonStyle}` : ""
  const roundedClassName = rounded ? `${baseClassName}--rounded` : ""
  const loadingClassName = loading ? `${baseClassName}--loading` : ""
  const iconOnlyClassName = icon && !children ? `${baseClassName}--icon-only` : ""
  const splitClassName = split ? `${baseClassName}--split` : ""
  const templateClassName = template ? `${baseClassName}--template-${template}` : ""
  const fullWidthClassName = fullWidth ? `${baseClassName}--full-width` : ""

  const classes = [
    baseClassName,
    variantClassName,
    styleClassName,
    roundedClassName,
    loadingClassName,
    iconOnlyClassName,
    splitClassName,
    templateClassName,
    fullWidthClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <CircularProgress size={20} color="inherit" className="ui-button__spinner" />}
      <span className="ui-button__content">
        {icon && iconPosition === "left" && <span className="ui-button__icon">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ui-button__icon">{icon}</span>}
        {split && (
          <span className="ui-button__dropdown">
            <KeyboardArrowDown />
          </span>
        )}
      </span>
    </button>
  )
}

export interface ButtonGroupProps {
  children: React.ReactNode
  className?: string
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className = "" }) => {
  return <div className={`ui-button--group ${className}`}>{children}</div>
}

