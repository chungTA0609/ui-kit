"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export interface AutoCompleteOption {
    label: string
    value: string
}

export interface AutoCompleteProps {
    options: AutoCompleteOption[]
    value?: string
    onChange?: (value: string) => void
    onSearch?: (query: string) => void
    placeholder?: string
    className?: string
    disabled?: boolean
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
    options,
    onChange,
    onSearch,
    placeholder = "Search",
    className = "",
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchTerm(query)
        onSearch?.(query)
    }

    const handleOptionClick = (option: AutoCompleteOption) => {
        onChange?.(option.value)
        setSearchTerm(option.label)
        setIsOpen(false)
    }

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div ref={wrapperRef} className={`ui-autocomplete ${className}`}>
            <div className="ui-autocomplete__input-wrapper">
                <input
                    type="text"
                    className="ui-autocomplete__input"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                <button className="ui-autocomplete__toggle" onClick={() => setIsOpen(!isOpen)} disabled={disabled}>
                    <ChevronDown className={`ui-autocomplete__icon ${isOpen ? "ui-autocomplete__icon--open" : ""}`} />
                </button>
            </div>
            {isOpen && filteredOptions.length > 0 && (
                <ul className="ui-autocomplete__dropdown">
                    {filteredOptions.map((option) => (
                        <li key={option.value} className="ui-autocomplete__option" onClick={() => handleOptionClick(option)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}