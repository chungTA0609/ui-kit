"use client"

import type React from "react"

export interface CheckboxProps {
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  className = "",
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked)
  }

  return (
    <label className={`ui-checkbox ${className}`}>
      <input
        type="checkbox"
        className="ui-checkbox__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="ui-checkbox__control"></span>
      {label && <span className="ui-checkbox__label">{label}</span>}
    </label>
  )
}

export interface CheckboxOption {
  label: string
  value: string
}

export interface CheckboxGroupProps {
  options: CheckboxOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  className?: string
  disabled?: boolean
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  value = [],
  onChange,
  className = "",
  disabled = false,
}) => {
  const handleChange = (optionValue: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked ? [...value, optionValue] : value.filter((v) => v !== optionValue)
    onChange?.(newValue)
  }

  return (
    <div className={`ui-checkbox-group ${className}`}>
      {options.map((option) => (
        <label key={option.value} className="ui-checkbox">
          <input
            type="checkbox"
            className="ui-checkbox__input"
            checked={value.includes(option.value)}
            onChange={handleChange(option.value)}
            disabled={disabled}
          />
          <span className="ui-checkbox__control"></span>
          <span className="ui-checkbox__label">{option.label}</span>
        </label>
      ))}
    </div>
  )
}

