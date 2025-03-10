"use client"

import type React from "react"

export interface RadioOption {
    label: string
    value: string
}

export interface RadioGroupProps {
    options: RadioOption[]
    value?: string
    onChange?: (value: string) => void
    name?: string
    className?: string
    disabled?: boolean
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    options,
    value,
    onChange,
    name = "radio-group",
    className = "",
    disabled = false,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    return (
        <div className={`ui-radio-group ${className}`} role="radiogroup">
            {options.map((option) => (
                <label key={option.value} className="ui-radio">
                    <input
                        type="radio"
                        className="ui-radio__input"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={handleChange}
                        disabled={disabled}
                    />
                    <span className="ui-radio__control"></span>
                    <span className="ui-radio__label">{option.label}</span>
                </label>
            ))}
        </div>
    )
}

