"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    startOfWeek,
    endOfWeek,
} from "date-fns"

export interface CalendarProps {
    value?: Date
    onChange?: (date: Date) => void
    placeholder?: string
    className?: string
    disabled?: boolean
}

export const Calendar: React.FC<CalendarProps> = ({
    value,
    onChange,
    placeholder = "Select date",
    className = "",
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const handleDateSelect = (date: Date) => {
        onChange?.(date)
        setIsOpen(false)
    }

    const handlePreviousMonth = () => {
        setCurrentMonth((prev) => subMonths(prev, 1))
    }

    const handleNextMonth = () => {
        setCurrentMonth((prev) => addMonths(prev, 1))
    }

    const handleToday = () => {
        const today = new Date()
        setCurrentMonth(today)
        handleDateSelect(today)
    }

    const handleClear = () => {
        onChange?.(undefined)
        setIsOpen(false)
    }

    const getDaysInMonth = (date: Date) => {
        const start = startOfWeek(startOfMonth(date))
        const end = endOfWeek(endOfMonth(date))
        return eachDayOfInterval({ start, end })
    }

    const days = getDaysInMonth(currentMonth)
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    return (
        <div className={`ui-calendar ${className}`}>
            <div className="ui-calendar__input-wrapper">
                <input
                    type="text"
                    className="ui-calendar__input"
                    value={value ? format(value, "MM/dd/yyyy") : ""}
                    readOnly
                    placeholder={placeholder}
                    onClick={() => !disabled && setIsOpen(true)}
                    disabled={disabled}
                />
                <button className="ui-calendar__toggle" onClick={() => !disabled && setIsOpen(!isOpen)} disabled={disabled}>
                    <CalendarIcon className="ui-calendar__icon" />
                </button>
            </div>

            {isOpen && (
                <div className="ui-calendar__dropdown">
                    <div className="ui-calendar__header">
                        <span className="ui-calendar__month-year">{format(currentMonth, "MMMM yyyy")}</span>
                        <div className="ui-calendar__nav">
                            <button className="ui-calendar__nav-button" onClick={handlePreviousMonth} aria-label="Previous month">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="ui-calendar__nav-button" onClick={handleNextMonth} aria-label="Next month">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="ui-calendar__weekdays">
                        {weekDays.map((day) => (
                            <div key={day} className="ui-calendar__weekday">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="ui-calendar__days">
                        {days.map((day, index) => (
                            <button
                                key={index}
                                className={`ui-calendar__day ${!isSameMonth(day, currentMonth) ? "ui-calendar__day--disabled" : ""} ${value && isSameDay(day, value) ? "ui-calendar__day--selected" : ""
                                    } ${isSameDay(day, new Date()) ? "ui-calendar__day--today" : ""}`}
                                onClick={() => handleDateSelect(day)}
                                disabled={!isSameMonth(day, currentMonth)}
                            >
                                {format(day, "d")}
                            </button>
                        ))}
                    </div>

                    <div className="ui-calendar__footer">
                        <button className="ui-calendar__footer-button ui-calendar__footer-button--today" onClick={handleToday}>
                            Today
                        </button>
                        <button className="ui-calendar__footer-button ui-calendar__footer-button--clear" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

