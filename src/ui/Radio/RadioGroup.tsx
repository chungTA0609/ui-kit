"use client"

import type React from "react"
import {
  Radio as MuiRadio,
  type RadioProps as MuiRadioProps,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material"

export interface RadioProps extends MuiRadioProps {
  label?: string
}

export const Radio: React.FC<RadioProps> = ({ label, className = "", ...props }) => {
  return <FormControlLabel control={<MuiRadio className={`ui-radio ${className}`} {...props} />} label={label} />
}

export interface RadioGroupProps {
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (value: string) => void
  label?: string
  helperText?: string
  className?: string
  row?: boolean
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  label,
  helperText,
  className = "",
  row = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <FormControl component="fieldset" className={`ui-component ui-radio-group ${className}`}>
      {label && (
        <FormLabel component="legend" className="ui-label">
          {label}
        </FormLabel>
      )}
      <MuiRadioGroup value={value} onChange={handleChange} row={row}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<MuiRadio className="ui-radio" />}
            label={option.label}
          />
        ))}
      </MuiRadioGroup>
      {helperText && <FormHelperText className="ui-helper-text">{helperText}</FormHelperText>}
    </FormControl>
  )
}

