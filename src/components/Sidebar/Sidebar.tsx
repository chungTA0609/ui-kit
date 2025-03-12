"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import "./Sidebar.scss"

export type SidebarPosition = "left" | "right" | "top" | "bottom" | "fullscreen"

export interface SidebarProps {
    position?: SidebarPosition
    onClose?: () => void
    className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ position = "left", onClose, className = "" }) => {
    const [username, setUsername] = useState("")

    const positionClass = `sidebar--${position}`

    return (
        <div className={`sidebar ${positionClass} ${className}`}>
            <div className="sidebar__header">
                <h2 className="sidebar__title">{position.charAt(0).toUpperCase() + position.slice(1)} Sidebar</h2>
                <button className="sidebar__close" onClick={onClose} aria-label="Close sidebar">
                    <X size={20} />
                </button>
            </div>

            <div className="sidebar__content">
                <section className="sidebar__section">
                    <h3 className="sidebar__section-title">Dialog</h3>
                    <button className="sidebar__button sidebar__button--primary">Show</button>
                </section>

                <section className="sidebar__section">
                    <h3 className="sidebar__section-title">Overlay Panel</h3>
                    <div className="sidebar__button-group">
                        <button className="sidebar__button sidebar__button--success">Image</button>
                        <button className="sidebar__button sidebar__button--success">DataTable</button>
                    </div>
                </section>

                <section className="sidebar__section">
                    <h3 className="sidebar__section-title">Tooltip</h3>
                    <div className="sidebar__tooltip-form">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="sidebar__input"
                        />
                        <button className="sidebar__button sidebar__button--primary">Save</button>
                    </div>
                </section>
            </div>
        </div>
    )
}

