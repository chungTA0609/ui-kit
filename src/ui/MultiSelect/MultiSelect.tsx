"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"

export interface MultiSelectOption {
    label: string
    value: string
    flag?: string // URL or emoji for the flag
}

export interface MultiSelectProps {
    options: MultiSelectOption[]
    value?: string[]
    onChange?: (value: string[]) => void
    placeholder?: string
    className?: string
    disabled?: boolean
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
    options,
    value = [],
    onChange,
    placeholder = "Select options",
    className = "",
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const wrapperRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

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
            if (!isOpen) {
                setTimeout(() => searchInputRef.current?.focus(), 0)
            }
        }
    }

    const handleOptionClick = (optionValue: string) => {
        const newValue = value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue]
        onChange?.(newValue)
    }

    const handleRemoveOption = (optionValue: string, e: React.MouseEvent) => {
        e.stopPropagation()
        onChange?.(value.filter((v) => v !== optionValue))
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const clearSearch = () => {
        setSearchTerm("")
        searchInputRef.current?.focus()
    }

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

    const selectedOptions = options.filter((option) => value.includes(option.value))

    return (
        <div ref={wrapperRef} className={`ui-multiselect ${className}`}>
            <div
                className={`ui-multiselect__control ${isOpen ? "ui-multiselect__control--open" : ""}`}
                onClick={handleToggle}
            >
                <div className="ui-multiselect__value">
                    {selectedOptions.length > 0 ? (
                        <div className="ui-multiselect__tags">
                            {selectedOptions.map((option) => (
                                <div key={option.value} className="ui-multiselect__tag">
                                    {option.label}
                                    <button
                                        type="button"
                                        className="ui-multiselect__tag-remove"
                                        onClick={(e) => handleRemoveOption(option.value, e)}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="ui-multiselect__placeholder">{placeholder}</div>
                    )}
                </div>
                <div className="ui-multiselect__indicators">
                    <button type="button" className="ui-multiselect__dropdown-indicator" onClick={handleToggle}>
                        <svg
                            height="20"
                            width="20"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                            focusable="false"
                            className={`ui-multiselect__dropdown-arrow ${isOpen ? "ui-multiselect__dropdown-arrow--open" : ""}`}
                        >
                            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="ui-multiselect__menu">
                    <div className="ui-multiselect__search">
                        <Search className="ui-multiselect__search-icon" size={16} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            className="ui-multiselect__search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                        />
                        {searchTerm && (
                            <button type="button" className="ui-multiselect__search-clear" onClick={clearSearch}>
                                <X size={14} />
                            </button>
                        )}
                    </div>
                    <div className="ui-multiselect__options">
                        {filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                className={`ui-multiselect__option ${value.includes(option.value) ? "ui-multiselect__option--selected" : ""
                                    }`}
                                onClick={() => handleOptionClick(option.value)}
                            >
                                <div className="ui-multiselect__checkbox">
                                    <input
                                        type="checkbox"
                                        checked={value.includes(option.value)}
                                        onChange={() => { }}
                                        className="ui-multiselect__checkbox-input"
                                    />
                                    <span className="ui-multiselect__checkbox-control"></span>
                                </div>
                                {/* {option.flag && <span className="ui-multiselect__option-flag">{option.flag}</span>} */}
                                <span className="ui-multiselect__option-label">{option.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

