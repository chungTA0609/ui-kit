import "./LoadingSpinner.scss"

export interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info"
  thickness?: number
  className?: string
  label?: string
}

export function LoadingSpinner({
  size = "medium",
  color = "primary",
  thickness = 3,
  className = "",
  label,
}: LoadingSpinnerProps) {
  return (
    <div className={`loading-spinner loading-spinner--${size} ${className}`} role="status">
      <div className={`loading-spinner__circle loading-spinner__circle--${color}`} style={{ borderWidth: thickness }} />
      {label && <div className="loading-spinner__label">{label}</div>}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

