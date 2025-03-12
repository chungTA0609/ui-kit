"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { Toast, type ToastProps, type ToastType, type ToastPosition } from "./Toast"

export interface ToastOptions {
    title?: string
    type?: ToastType
    duration?: number
    position?: ToastPosition
    dismissible?: boolean
}

interface ToastContextValue {
    toast: (message: string, options?: ToastOptions) => string
    success: (message: string, options?: Omit<ToastOptions, "type">) => string
    error: (message: string, options?: Omit<ToastOptions, "type">) => string
    info: (message: string, options?: Omit<ToastOptions, "type">) => string
    warning: (message: string, options?: Omit<ToastOptions, "type">) => string
    dismiss: (id: string) => void
    dismissAll: () => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

interface ToastItem extends Omit<ToastProps, "onClose"> {
    position: ToastPosition
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    const createToast = useCallback((message: string, options: ToastOptions = {}): string => {
        const id = Math.random().toString(36).substring(2, 9)
        const toast: ToastItem = {
            id,
            message,
            title: options.title,
            type: options.type || "info",
            duration: options.duration !== undefined ? options.duration : 5000,
            position: options.position || "top-right",
            dismissible: options.dismissible !== undefined ? options.dismissible : true,
        }

        setToasts((prev) => [...prev, toast])
        return id
    }, [])

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    const dismissAll = useCallback(() => {
        setToasts([])
    }, [])

    const success = useCallback(
        (message: string, options?: Omit<ToastOptions, "type">) => {
            return createToast(message, { ...options, type: "success" })
        },
        [createToast],
    )

    const error = useCallback(
        (message: string, options?: Omit<ToastOptions, "type">) => {
            return createToast(message, { ...options, type: "error" })
        },
        [createToast],
    )

    const info = useCallback(
        (message: string, options?: Omit<ToastOptions, "type">) => {
            return createToast(message, { ...options, type: "info" })
        },
        [createToast],
    )

    const warning = useCallback(
        (message: string, options?: Omit<ToastOptions, "type">) => {
            return createToast(message, { ...options, type: "warning" })
        },
        [createToast],
    )

    // Group toasts by position
    const positionGroups = toasts.reduce<Record<ToastPosition, ToastItem[]>>(
        (acc, toast) => {
            if (!acc[toast.position]) {
                acc[toast.position] = []
            }
            acc[toast.position].push(toast)
            return acc
        },
        {
            "top-right": [],
            "top-left": [],
            "bottom-right": [],
            "bottom-left": [],
            "top-center": [],
            "bottom-center": [],
        },
    )

    return (
        <ToastContext.Provider
            value={{
                toast: createToast,
                success,
                error,
                info,
                warning,
                dismiss,
                dismissAll,
            }}
        >
            {children}

            {typeof window !== "undefined" &&
                Object.entries(positionGroups).map(
                    ([position, toastsInPosition]) =>
                        toastsInPosition.length > 0 &&
                        createPortal(
                            <div className={`toast-container toast-container--${position}`}>
                                {toastsInPosition.map((toast) => (
                                    <Toast key={toast.id} {...toast} onClose={dismiss} />
                                ))}
                            </div>,
                            document.body,
                        ),
                )}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}

