import type React from "react"
import {
  Select as MuiSelect,
  type SelectProps as MuiSelectProps,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Chip,
  Box,
} from "@mui/material"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<MuiSelectProps, "variant"> {
  options: SelectOption[]
  label?: string
  helperText?: string
  multiple?: boolean
}

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  helperText,
  className = "",
  multiple = false,
  ...props
}) => {
  const labelId = `select-label-${label?.toLowerCase().replace(/\s+/g, "-") || "default"}`

  return (
    <FormControl fullWidth className={`ui-component ui-select ${className}`}>
      {label && (
        <InputLabel id={labelId} className="ui-select__label">
          {label}
        </InputLabel>
      )}
      <MuiSelect
        labelId={labelId}
        variant="outlined"
        multiple={multiple}
        renderValue={
          multiple
            ? (selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[]).map((value) => {
                    const option = options.find((opt) => opt.value === value)
                    return <Chip key={value} label={option?.label || value} className="ui-select__chip" />
                  })}
                </Box>
              )
            : undefined
        }
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText className="ui-helper-text">{helperText}</FormHelperText>}
    </FormControl>
  )
}

