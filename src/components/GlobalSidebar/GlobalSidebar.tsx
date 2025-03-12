"use client"
import { createPortal } from "react-dom"
import { Sidebar } from "../Sidebar/Sidebar"
import { useSidebar } from "../../context/SidebarContext"
import "./GlobalSidebar.scss"

export function GlobalSidebar() {
    const { activeSidebar, closeSidebar } = useSidebar()

    if (!activeSidebar) return null

    return createPortal(
        <div
            className="global-sidebar__overlay"
            onClick={(e) => {
                e.stopPropagation()
                closeSidebar()
            }}
        >
            <div onClick={(e) => e.stopPropagation()}>
                <Sidebar position={activeSidebar} onClose={closeSidebar} />
            </div>
        </div>,
        document.body,
    )
}

