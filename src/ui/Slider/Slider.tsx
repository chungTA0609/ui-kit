import type React from "react"
import {
  Slider as MuiSlider,
  type SliderProps as MuiSliderProps,
  FormControl,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material"

export interface SliderProps extends MuiSliderProps {
  label?: string
  helperText?: string
  showValue?: boolean
}

export const Slider: React.FC<SliderProps> = ({
  label,
  helperText,
  className = "",
  showValue = false,
  value,
  ...props
}) => {
  return (
    <FormControl className={`ui-component ui-slider ${className}`}>
      <Box className="ui-slider__header">
        {label && <Typography className="ui-label">{label}</Typography>}
        {showValue && (
          <Typography className="ui-slider__value">
            {Array.isArray(value) ? `${value[0]} - ${value[1]}` : value}
          </Typography>
        )}
      </Box>
      <MuiSlider className="ui-slider__control" value={value} {...props} />
      {helperText && <FormHelperText className="ui-helper-text">{helperText}</FormHelperText>}
    </FormControl>
  )
}

