"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

export interface ColorPickerProps {
    value?: string
    onChange?: (value: string) => void
    className?: string
    disabled?: boolean
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
    value = "#1976d2",
    onChange,
    className = "",
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [color, setColor] = useState(value)
    const [hue, setHue] = useState(0)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const colorAreaRef = useRef<HTMLDivElement>(null)
    const hueSliderRef = useRef<HTMLDivElement>(null)
    const pickerRef = useRef<HTMLDivElement>(null)

    // Initialize position and hue based on the initial color
    useEffect(() => {
        if (value !== color) {
            setColor(value)
            // We would need to convert the hex color to hsv and set position/hue accordingly
            // This is a simplified implementation - in a real component, use a color conversion library
        }
    }, [value])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleColorAreaMouseDown = (e: React.MouseEvent) => {
        if (disabled || !colorAreaRef.current) return

        const rect = colorAreaRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))

        setPosition({ x, y })

        // This is a simplified color calculation - in a real component, convert HSV to hex properly
        const saturation = x * 100
        const brightness = (1 - y) * 100
        const newColor = hsvToHex(hue, saturation, brightness)
        setColor(newColor)
        onChange?.(newColor)

        const handleMouseMove = (e: MouseEvent) => {
            const rect = colorAreaRef.current!.getBoundingClientRect()
            const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
            const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))

            setPosition({ x, y })

            const saturation = x * 100
            const brightness = (1 - y) * 100
            const newColor = hsvToHex(hue, saturation, brightness)
            setColor(newColor)
            onChange?.(newColor)
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleHueSliderMouseDown = (e: React.MouseEvent) => {
        if (disabled || !hueSliderRef.current) return

        const rect = hueSliderRef.current.getBoundingClientRect()
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
        const newHue = y * 360
        setHue(newHue)

        // Recalculate color with new hue
        const saturation = position.x * 100
        const brightness = (1 - position.y) * 100
        const newColor = hsvToHex(newHue, saturation, brightness)
        setColor(newColor)
        onChange?.(newColor)

        const handleMouseMove = (e: MouseEvent) => {
            const rect = hueSliderRef.current!.getBoundingClientRect()
            const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
            const newHue = y * 360
            setHue(newHue)

            const saturation = position.x * 100
            const brightness = (1 - position.y) * 100
            const newColor = hsvToHex(newHue, saturation, brightness)
            setColor(newColor)
            onChange?.(newColor)
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const togglePicker = () => {
        if (!disabled) {
            setIsOpen(!isOpen)
        }
    }

    // Simplified HSV to Hex conversion - in a real component, use a color library
    const hsvToHex = (h: number, s: number, v: number): string => {
        // This is a very simplified conversion - you should use a proper color library
        h = h % 360
        s = s / 100
        v = v / 100

        let r = 0,
            g = 0,
            b = 0
        const i = Math.floor(h / 60)
        const f = h / 60 - i
        const p = v * (1 - s)
        const q = v * (1 - f * s)
        const t = v * (1 - (1 - f) * s)

        switch (i % 6) {
            case 0:
                r = v
                g = t
                b = p
                break
            case 1:
                r = q
                g = v
                b = p
                break
            case 2:
                r = p
                g = v
                b = t
                break
            case 3:
                r = p
                g = q
                b = v
                break
            case 4:
                r = t
                g = p
                b = v
                break
            case 5:
                r = v
                g = p
                b = q
                break
        }

        const toHex = (x: number) => {
            const hex = Math.round(x * 255).toString(16)
            return hex.length === 1 ? "0" + hex : hex
        }

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`
    }

    return (
        <div ref={pickerRef} className={`ui-colorpicker ${className}`}>
            <div className="ui-colorpicker__preview" style={{ backgroundColor: color }} onClick={togglePicker} />

            {isOpen && (
                <div className="ui-colorpicker__popup">
                    <div
                        ref={colorAreaRef}
                        className="ui-colorpicker__color-area"
                        style={{ backgroundColor: hsvToHex(hue, 100, 100) }}
                        onMouseDown={handleColorAreaMouseDown}
                    >
                        <div className="ui-colorpicker__white-gradient" />
                        <div className="ui-colorpicker__black-gradient" />
                        <div
                            className="ui-colorpicker__pointer"
                            style={{
                                left: `${position.x * 100}%`,
                                top: `${position.y * 100}%`,
                            }}
                        />
                    </div>

                    <div ref={hueSliderRef} className="ui-colorpicker__hue-slider" onMouseDown={handleHueSliderMouseDown}>
                        <div className="ui-colorpicker__hue-slider-thumb" style={{ top: `${(hue / 360) * 100}%` }} />
                    </div>

                    <div className="ui-colorpicker__color-preview" style={{ backgroundColor: color }} />
                </div>
            )}
        </div>
    )
}

