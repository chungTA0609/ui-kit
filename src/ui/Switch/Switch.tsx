"use client"

import type React from "react"

export interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean,
  label?: string
}

export const Switch: React.FC<SwitchProps> = ({ checked = false, onChange, className = "", disabled = false }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked)
  }

  return (
    <label className={`ui-switch ${className}`}>
      <input
        type="checkbox"
        className="ui-switch__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="ui-switch__track">
        <span className="ui-switch__thumb"></span>
      </span>
    </label>
  )
}

