"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

export interface ChipsProps {
    value?: string[]
    onChange?: (value: string[]) => void
    placeholder?: string
    className?: string
    disabled?: boolean
}

export const Chips: React.FC<ChipsProps> = ({
    value = [],
    onChange,
    placeholder = "Add tags",
    className = "",
    disabled = false,
}) => {
    const [inputValue, setInputValue] = useState("")

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault()
            const newValue = [...value, inputValue.trim()]
            onChange?.(newValue)
            setInputValue("")
        } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
            const newValue = value.slice(0, -1)
            onChange?.(newValue)
        }
    }

    const handleRemoveChip = (index: number) => {
        const newValue = value.filter((_, i) => i !== index)
        onChange?.(newValue)
    }

    return (
        <div className={`ui-chips ${className}`}>
            <div className="ui-chips__container">
                {value.map((chip, index) => (
                    <div key={index} className="ui-chips__chip">
                        <span className="ui-chips__chip-text">{chip}</span>
                        {!disabled && (
                            <button type="button" className="ui-chips__chip-remove" onClick={() => handleRemoveChip(index)}>
                                <X className="ui-chips__chip-icon" />
                            </button>
                        )}
                    </div>
                ))}
                <input
                    type="text"
                    className="ui-chips__input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={value.length === 0 ? placeholder : ""}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}

