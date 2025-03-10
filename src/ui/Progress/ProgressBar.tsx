import type React from "react"
import { LinearProgress, CircularProgress, Box, Typography } from "@mui/material"

export interface ProgressBarProps {
  variant?: "linear" | "circular"
  value?: number
  label?: string
  size?: number
  thickness?: number
  showValue?: boolean
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  variant = "linear",
  value,
  label,
  size = 40,
  thickness = 3.6,
  showValue = false,
  className = "",
}) => {
  const isIndeterminate = value === undefined

  return (
    <Box className={`ui-component ui-progress ${className}`}>
      {label && <Typography className="ui-label">{label}</Typography>}

      {variant === "linear" ? (
        <Box className="ui-progress__linear-container">
          <LinearProgress
            variant={isIndeterminate ? "indeterminate" : "determinate"}
            value={value}
            className="ui-progress__linear"
          />
          {showValue && !isIndeterminate && (
            <Typography variant="body2" className="ui-progress__value">
              {value}%
            </Typography>
          )}
        </Box>
      ) : (
        <Box className="ui-progress__circular-container">
          <CircularProgress
            variant={isIndeterminate ? "indeterminate" : "determinate"}
            value={value}
            size={size}
            thickness={thickness}
            className="ui-progress__circular"
          />
          {showValue && !isIndeterminate && (
            <Typography variant="caption" className="ui-progress__circular-value">
              {value}%
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

