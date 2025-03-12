"use client"

import type React from "react"

import { useEffect } from "react"
import "./Dialog.scss"
import { createPortal } from "react-dom"

export interface DialogProps {
    visible: boolean
    onHide: () => void
    header?: React.ReactNode
    children: React.ReactNode
    footer?: React.ReactNode
    modal?: boolean
    dismissable?: boolean
    className?: string
    style?: React.CSSProperties
}

export function Dialog({
    visible,
    onHide,
    header,
    children,
    footer,
    modal = true,
    dismissable = true,
    className = "",
    style,
}: DialogProps) {
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [visible])

    const handleBackdropClick = (event: React.MouseEvent) => {
        if (dismissable && event.target === event.currentTarget) {
            event.stopPropagation()
            onHide()
        }
    }

    if (!visible) return null

    const dialog = (
        <div className={`ui-dialog__mask ${modal ? "ui-dialog__mask--modal" : ""}`} onClick={handleBackdropClick}>
            <div className={`ui-dialog ${className}`} style={style} onClick={(e) => e.stopPropagation()}>
                {header && <div className="ui-dialog__header">{header}</div>}
                <div className="ui-dialog__content">{children}</div>
                {footer && <div className="ui-dialog__footer">{footer}</div>}
            </div>
        </div>
    )

    return createPortal(dialog, document.body)
}

