"use client"

import { Button } from "../../ui/Button/Button"
import type { SidebarPosition } from "../Sidebar/Sidebar"
import { useSidebar } from "../../context/SidebarContext"
import "./SidebarDemo.scss"

export const SidebarDemo = () => {
    const { openSidebar } = useSidebar()

    const handleOpenSidebar = (position: SidebarPosition) => {
        openSidebar(position)
    }

    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Sidebar Positions</h2>
            <div className="sidebar-demo">
                <div className="sidebar-demo__buttons">
                    <Button variant="primary" onClick={() => handleOpenSidebar("left")} className="sidebar-demo__button">
                        Left Sidebar
                    </Button>
                    <Button variant="primary" onClick={() => handleOpenSidebar("right")} className="sidebar-demo__button">
                        Right Sidebar
                    </Button>
                    <Button variant="primary" onClick={() => handleOpenSidebar("top")} className="sidebar-demo__button">
                        Top Sidebar
                    </Button>
                    <Button variant="primary" onClick={() => handleOpenSidebar("bottom")} className="sidebar-demo__button">
                        Bottom Sidebar
                    </Button>
                    <Button variant="primary" onClick={() => handleOpenSidebar("fullscreen")} className="sidebar-demo__button">
                        Fullscreen Sidebar
                    </Button>
                </div>
            </div>
        </div>
    )
}

