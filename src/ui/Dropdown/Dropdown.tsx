"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export interface DropdownOption {
    label: string
    value: string
}

export interface DropdownProps {
    options: DropdownOption[]
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    className?: string
    disabled?: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select option",
    className = "",
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen)
        }
    }

    const handleOptionClick = (optionValue: string) => {
        onChange?.(optionValue)
        setIsOpen(false)
    }

    const selectedOption = options.find((option) => option.value === value)

    return (
        <div ref={wrapperRef} className={`ui-dropdown ${className}`}>
            <div
                className={`ui-dropdown__control ${isOpen ? "ui-dropdown__control--open" : ""}`}
                onClick={handleToggle}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls="dropdown-list"
            >
                <div className="ui-dropdown__value">{selectedOption ? selectedOption.label : placeholder}</div>
                <ChevronDown className={`ui-dropdown__arrow ${isOpen ? "ui-dropdown__arrow--open" : ""}`} size={20} />
            </div>

            {isOpen && (
                <div className="ui-dropdown__menu" role="listbox" id="dropdown-list">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`ui-dropdown__option ${value === option.value ? "ui-dropdown__option--selected" : ""}`}
                            onClick={() => handleOptionClick(option.value)}
                            role="option"
                            aria-selected={value === option.value}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

