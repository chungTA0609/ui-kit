"use client"

import type React from "react"
import { useState } from "react"
import { Search, User } from "lucide-react"

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, "size"> {
  label?: string
  error?: boolean
  helperText?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  multiline?: boolean
  rows?: number
  float?: boolean
  fullWidth?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  multiline = false,
  rows = 4,
  float = false,
  fullWidth = false,
  className = "",
  disabled,
  value,
  onChange,
  ...props
}) => {
  const [focused, setFocused] = useState(false)
  const [localValue, setLocalValue] = useState(value || "")

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(false)
    props.onBlur?.(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalValue(e.target.value)
    onChange?.(e)
  }

  const baseClassName = "ui-input"
  const containerClassName = [
    baseClassName,
    error ? `${baseClassName}--error` : "",
    disabled ? `${baseClassName}--disabled` : "",
    focused ? `${baseClassName}--focused` : "",
    float ? `${baseClassName}--float` : "",
    fullWidth ? `${baseClassName}--full-width` : "",
    startIcon ? `${baseClassName}--with-start-icon` : "",
    endIcon ? `${baseClassName}--with-end-icon` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const labelClassName = [
    `${baseClassName}__label`,
    float && (focused || localValue) ? `${baseClassName}__label--float` : "",
  ]
    .filter(Boolean)
    .join(" ")

  const renderInput = () => {
    const inputProps = {
      className: `${baseClassName}__field`,
      disabled,
      value: localValue,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      "aria-invalid": error,
      ...props,
    }

    if (multiline) {
      return <textarea {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} rows={rows} />
    }

    return <input {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)} />
  }

  return (
    <div className={containerClassName}>
      {label && <label className={labelClassName}>{label}</label>}
      <div className={`${baseClassName}__wrapper`}>
        {startIcon && <span className={`${baseClassName}__icon ${baseClassName}__icon--start`}>{startIcon}</span>}
        {renderInput()}
        {endIcon && <span className={`${baseClassName}__icon ${baseClassName}__icon--end`}>{endIcon}</span>}
      </div>
      {helperText && <span className={`${baseClassName}__helper-text`}>{helperText}</span>}
    </div>
  )
}

// Preset configurations
export const SearchInput: React.FC<Omit<InputProps, "startIcon" | "endIcon"> & { iconPosition?: "start" | "end" }> = ({
  iconPosition = "start",
  ...props
}) => {
  const icon = <Search size={18} />
  return (
    <Input
      {...props}
      startIcon={iconPosition === "start" ? icon : undefined}
      endIcon={iconPosition === "end" ? icon : undefined}
    />
  )
}

export const UsernameInput: React.FC<Omit<InputProps, "startIcon">> = (props) => {
  return <Input {...props} startIcon={<User size={18} />} />
}

