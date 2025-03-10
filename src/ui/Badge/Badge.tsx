import type React from "react"
import { Badge as MuiBadge, type BadgeProps as MuiBadgeProps, Box } from "@mui/material"

export type BadgeVariant = "primary" | "secondary" | "success" | "error" | "warning" | "info"

export interface BadgeProps extends Omit<MuiBadgeProps, "variant"> {
  variant?: BadgeVariant
  standalone?: boolean
  label?: string
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  className = "",
  standalone = false,
  label,
  children,
  ...props
}) => {
  const badgeClass = `ui-badge ui-badge--${variant} ${className}`

  if (standalone) {
    return <Box className={`ui-badge--standalone ${badgeClass}`}>{label || props.badgeContent}</Box>
  }

  return (
    <MuiBadge className={badgeClass} {...props}>
      {children}
    </MuiBadge>
  )
}

