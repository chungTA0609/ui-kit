/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import "./Toast.scss"

export type ToastType = "success" | "error" | "info" | "warning"
export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"

export interface ToastProps {
    id: string
    title?: string
    message: string
    type?: ToastType
    duration?: number
    onClose: (id: string) => void
    position?: ToastPosition
    dismissible?: boolean
}

export function Toast({
    id,
    title,
    message,
    type = "info",
    duration = 3000,
    onClose,
    position = "top-right",
    dismissible = true,
}: ToastProps) {
    const [isExiting, setIsExiting] = useState(false)
    const [progress, setProgress] = useState(100)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        if (duration === Number.POSITIVE_INFINITY) return

        let startTime = Date.now()
        let remainingTime = duration
        let animationFrame: number

        const updateProgress = () => {
            if (isPaused) {
                startTime = Date.now() - (duration - remainingTime)
                animationFrame = requestAnimationFrame(updateProgress)
                return
            }

            const elapsed = Date.now() - startTime
            remainingTime = duration - elapsed
            const newProgress = Math.max(0, (remainingTime / duration) * 100)

            setProgress(newProgress)

            if (newProgress > 0) {
                animationFrame = requestAnimationFrame(updateProgress)
            } else {
                handleClose()
            }
        }

        animationFrame = requestAnimationFrame(updateProgress)

        return () => {
            cancelAnimationFrame(animationFrame)
        }
    }, [duration, isPaused])

    const handleClose = () => {
        setIsExiting(true)
        setTimeout(() => {
            onClose(id)
        }, 300) // Match this with the CSS exit animation duration
    }

    const handleMouseEnter = () => {
        setIsPaused(true)
    }

    const handleMouseLeave = () => {
        setIsPaused(false)
    }

    const getIcon = () => {
        switch (type) {
            case "success":
                return <CheckCircle className="toast__icon toast__icon--success" />
            case "error":
                return <AlertCircle className="toast__icon toast__icon--error" />
            case "warning":
                return <AlertTriangle className="toast__icon toast__icon--warning" />
            case "info":
            default:
                return <Info className="toast__icon toast__icon--info" />
        }
    }

    return (
        <div
            className={`toast toast--${type} toast--${isExiting ? "exit" : "enter"}`}
            role="alert"
            aria-live="assertive"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="toast__content">
                {getIcon()}
                <div className="toast__text">
                    {title && <div className="toast__title">{title}</div>}
                    <div className="toast__message">{message}</div>
                </div>
                {dismissible && (
                    <button className="toast__close" onClick={handleClose} aria-label="Close notification">
                        <X size={18} />
                    </button>
                )}
            </div>
            {duration !== Number.POSITIVE_INFINITY && (
                <div className="toast__progress-container">
                    <div className="toast__progress-bar" style={{ width: `${progress}%` }} />
                </div>
            )}
        </div>
    )
}

