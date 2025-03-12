"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { SidebarPosition } from "../components/Sidebar/Sidebar"

interface SidebarContextType {
    activeSidebar: SidebarPosition | null
    openSidebar: (position: SidebarPosition) => void
    closeSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [activeSidebar, setActiveSidebar] = useState<SidebarPosition | null>(null)

    const openSidebar = (position: SidebarPosition) => {
        setActiveSidebar(position)
    }

    const closeSidebar = () => {
        setActiveSidebar(null)
    }

    return (
        <SidebarContext.Provider value={{ activeSidebar, openSidebar, closeSidebar }}>{children}</SidebarContext.Provider>
    )
}

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}

