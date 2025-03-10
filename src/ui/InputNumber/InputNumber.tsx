"use client"

import type React from "react"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

export interface InputNumberProps {
    value?: number
    onChange?: (value: number) => void
    min?: number
    max?: number
    step?: number
    placeholder?: string
    className?: string
    disabled?: boolean
}

export const InputNumber: React.FC<InputNumberProps> = ({
    value,
    onChange,
    min,
    max,
    step = 1,
    placeholder = "Enter number",
    className = "",
    disabled = false,
}) => {
    const [localValue, setLocalValue] = useState<string>(value?.toString() || "")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setLocalValue(newValue)

        const numberValue = Number.parseFloat(newValue)
        if (!isNaN(numberValue)) {
            onChange?.(numberValue)
        }
    }

    const handleIncrement = () => {
        const currentValue = Number.parseFloat(localValue) || 0
        const newValue = currentValue + step
        if (max === undefined || newValue <= max) {
            setLocalValue(newValue.toString())
            onChange?.(newValue)
        }
    }

    const handleDecrement = () => {
        const currentValue = Number.parseFloat(localValue) || 0
        const newValue = currentValue - step
        if (min === undefined || newValue >= min) {
            setLocalValue(newValue.toString())
            onChange?.(newValue)
        }
    }

    return (
        <div className={`ui-input-number ${className}`}>
            <input
                type="text"
                className="ui-input-number__input"
                value={localValue}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
            />
            <div className="ui-input-number__buttons">
                <button
                    className="ui-input-number__button"
                    onClick={handleIncrement}
                    disabled={disabled || (max !== undefined && (Number.parseFloat(localValue) || 0) >= max)}
                >
                    <ChevronUp className="ui-input-number__icon" />
                </button>
                <button
                    className="ui-input-number__button"
                    onClick={handleDecrement}
                    disabled={disabled || (min !== undefined && (Number.parseFloat(localValue) || 0) <= min)}
                >
                    <ChevronDown className="ui-input-number__icon" />
                </button>
            </div>
        </div>
    )
}

