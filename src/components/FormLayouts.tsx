"use client"

import { useState } from "react"
import { Input } from "../ui/Input/Input"
import { Button } from "../ui/Button/Button"
import { FileUploadForm } from "./FileUploadForm"
import { Dialog } from "./Dialog/Dialog"
import { ArrowRight, ArrowLeft, ArrowDown, ArrowUp, RotateCw, HelpCircle, Info } from "lucide-react"
import { ButtonGroup } from "../ui/Button/Button"
import { SidebarButtonGroup } from "./SidebarButtonGroup/SidebarButtonGroup"
import { SidebarDemo } from "./SidebarDemo/SidebarDemo"
import { useSidebar } from "../context/SidebarContext"
import type { SidebarPosition } from "./Sidebar/Sidebar"
import { Tooltip } from "./Tooltip/Tooltip"
import { Carousel, type CarouselItem } from "./Carousel/Carousel"
import { Galleria, type GalleriaImage } from "./Galleria/Galleria"
import { ToastDemo } from "./Toast/ToastDemo"
import { AnimationDemo } from "./AnimationDemo/AnimationDemo"
import { AdvancedComponentsDemo } from "./AdvancedComponentsDemo/AdvancedComponentsDemo"

export const VerticalForm = () => {
    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Vertical</h2>
            <form className="form-layout__vertical">
                <div className="form-layout__field">
                    <label className="form-layout__label">Name</label>
                    <Input placeholder="Enter your name" />
                </div>
                <div className="form-layout__field">
                    <label className="form-layout__label">Email</label>
                    <Input type="email" placeholder="Enter your email" />
                </div>
                <div className="form-layout__field">
                    <label className="form-layout__label">Age</label>
                    <Input type="number" placeholder="Enter your age" />
                </div>
            </form>
        </div>
    )
}

export const HorizontalForm = () => {
    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Horizontal</h2>
            <form className="form-layout__horizontal">
                <div className="form-layout__field">
                    <label className="form-layout__label">Name</label>
                    <Input placeholder="Enter your name" />
                </div>
                <div className="form-layout__field">
                    <label className="form-layout__label">Email</label>
                    <Input type="email" placeholder="Enter your email" />
                </div>
            </form>
        </div>
    )
}

export const InlineForm = () => {
    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Inline</h2>
            <form className="form-layout__inline">
                <Input placeholder="Firstname" className="form-layout__inline-field" />
                <Input placeholder="Lastname" className="form-layout__inline-field" />
                <Button variant="primary">Submit</Button>
            </form>
        </div>
    )
}

export const VerticalGridForm = () => {
    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Vertical Grid</h2>
            <form className="form-layout__grid">
                <div className="form-layout__grid-field">
                    <label className="form-layout__label">Name</label>
                    <Input placeholder="Enter your name" />
                </div>
                <div className="form-layout__grid-field">
                    <label className="form-layout__label">Email</label>
                    <Input type="email" placeholder="Enter your email" />
                </div>
            </form>
        </div>
    )
}

export const HelpTextForm = () => {
    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Help Text</h2>
            <form className="form-layout__vertical">
                <div className="form-layout__field">
                    <label className="form-layout__label">Username</label>
                    <Input placeholder="Enter your username" />
                    <span className="form-layout__help-text">Enter your username to reset your password.</span>
                </div>
            </form>
        </div>
    )
}

export const DialogDemo = () => {
    const [visible, setVisible] = useState(false)

    const showDialog = () => {
        console.log("Showing dialog")
        setVisible(true)
    }

    const hideDialog = () => {
        console.log("Hiding dialog")
        setVisible(false)
    }

    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Dialog Demo</h2>
            <div className="form-layout__section">
                <Button variant="primary" onClick={showDialog}>
                    Show Dialog
                </Button>

                <Dialog
                    visible={visible}
                    onHide={hideDialog}
                    header="Dialog Title"
                    footer={
                        <div>
                            <Button variant="secondary" buttonStyle="outlined" onClick={hideDialog}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={hideDialog} style={{ marginLeft: "0.5rem" }}>
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <p>This is a simple dialog component with fade in/out animations.</p>
                    <p>You can close it by:</p>
                    <ul>
                        <li>Clicking outside the dialog</li>
                        <li>Pressing the ESC key</li>
                        <li>Using the Cancel or Submit buttons</li>
                    </ul>
                    <Input placeholder="Try typing something here" />
                </Dialog>
            </div>
        </div>
    )
}

export const ButtonGroupDemo = () => {
    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Button Group</h2>
            <div className="form-layout__section">
                <ButtonGroup variant="warning">
                    <Button icon={<ArrowRight size={16} />} iconPosition="only" />
                    <Button icon={<ArrowLeft size={16} />} iconPosition="only" />
                    <Button icon={<ArrowDown size={16} />} iconPosition="only" />
                    <Button icon={<ArrowUp size={16} />} iconPosition="only" />
                    <Button icon={<RotateCw size={16} />} iconPosition="only" />
                </ButtonGroup>
            </div>
        </div>
    )
}

export const SidebarButtonGroupDemo = () => {
    const { openSidebar } = useSidebar()
    const [activeDirection, setActiveDirection] = useState<"right" | "left" | "down" | "up" | null>(null)

    const handleNavigate = (position: SidebarPosition) => {
        let direction: "right" | "left" | "down" | "up" | null = null

        switch (position) {
            case "right":
                direction = "right"
                break
            case "left":
                direction = "left"
                break
            case "bottom":
                direction = "down"
                break
            case "top":
                direction = "up"
                break
            default:
                direction = null
        }

        setActiveDirection(direction)
        openSidebar(position)
    }

    const handleRefresh = () => {
        setActiveDirection(null)
    }

    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Sidebar Button Group</h2>
            <div className="form-layout__section">
                <p className="form-layout__help-text">Click on a direction button to open a sidebar in that position.</p>
                <SidebarButtonGroup
                    activeDirection={activeDirection}
                    onNavigateRight={() => handleNavigate("right")}
                    onNavigateLeft={() => handleNavigate("left")}
                    onNavigateDown={() => handleNavigate("bottom")}
                    onNavigateUp={() => handleNavigate("top")}
                    onRefresh={handleRefresh}
                />
            </div>
        </div>
    )
}

export const TooltipDemo = () => {
    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Tooltip</h2>
            <div className="form-layout__section">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                    <Tooltip content="This tooltip appears on top" position="top">
                        <Button variant="primary">Hover (Top)</Button>
                    </Tooltip>

                    <Tooltip content="This tooltip appears on the right" position="right">
                        <Button variant="secondary">Hover (Right)</Button>
                    </Tooltip>

                    <Tooltip content="This tooltip appears on the bottom" position="bottom">
                        <Button variant="success">Hover (Bottom)</Button>
                    </Tooltip>

                    <Tooltip content="This tooltip appears on the left" position="left">
                        <Button variant="info">Hover (Left)</Button>
                    </Tooltip>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                    <Tooltip content="Click to toggle this tooltip" position="top" trigger="click">
                        <Button variant="primary" buttonStyle="outlined">
                            Click (Top)
                        </Button>
                    </Tooltip>

                    <Tooltip content="Click to toggle this tooltip" position="right" trigger="click">
                        <Button variant="secondary" buttonStyle="outlined">
                            Click (Right)
                        </Button>
                    </Tooltip>

                    <Tooltip content="Click to toggle this tooltip" position="bottom" trigger="click">
                        <Button variant="success" buttonStyle="outlined">
                            Click (Bottom)
                        </Button>
                    </Tooltip>

                    <Tooltip content="Click to toggle this tooltip" position="left" trigger="click">
                        <Button variant="info" buttonStyle="outlined">
                            Click (Left)
                        </Button>
                    </Tooltip>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                    <Tooltip
                        content={
                            <div>
                                <h4 style={{ margin: "0 0 0.5rem 0" }}>Rich Content Tooltip</h4>
                                <p style={{ margin: "0 0 0.5rem 0" }}>Tooltips can contain rich HTML content.</p>
                                <Button variant="primary" size="small">
                                    Action Button
                                </Button>
                            </div>
                        }
                        position="top"
                        trigger="both"
                    >
                        <Button variant="help" icon={<HelpCircle size={16} />}>
                            Hover or Click
                        </Button>
                    </Tooltip>

                    <Tooltip content="This is an icon with a tooltip" position="right">
                        <span style={{ cursor: "pointer", display: "inline-flex" }}>
                            <Info size={24} color="#4169e1" />
                        </span>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export const CarouselDemo = () => {
    const items: CarouselItem[] = [
        {
            id: "1",
            name: "Galaxy Earrings",
            image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
            price: 34,
            status: "INSTOCK",
        },
        {
            id: "2",
            name: "Game Controller",
            image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
            price: 99,
            status: "LOWSTOCK",
        },
        {
            id: "3",
            name: "Gaming Set",
            image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
            price: 299,
            status: "INSTOCK",
        },
        {
            id: "4",
            name: "Blue Band",
            image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
            price: 79,
            status: "LOWSTOCK",
        },
        {
            id: "5",
            name: "Bluetooth Earbuds",
            image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
            price: 89,
            status: "OUTOFSTOCK",
        },
    ]

    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Carousel</h2>
            <div className="form-layout__section">
                <Carousel items={items} />
            </div>
        </div>
    )
}

export const GalleriaDemo = () => {
    const images: GalleriaImage[] = [
        {
            id: "1",
            src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
            alt: "Urban architecture",
        },
        {
            id: "2",
            src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
            alt: "Ship at sea",
        },
        {
            id: "3",
            src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
            alt: "Palm trees",
        },
        {
            id: "4",
            src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
            alt: "Mountain landscape",
        },
        {
            id: "5",
            src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
            alt: "City street",
        },
    ]

    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Galleria</h2>
            <div className="form-layout__section">
                <Galleria images={images} />
            </div>
        </div>
    )
}

// Add the AnimationDemo component to the FormLayoutsShowcase
export const FormLayoutsShowcase = () => {
    return (
        <div className="form-layouts">
            <VerticalForm />
            <HorizontalForm />
            <InlineForm />
            <VerticalGridForm />
            <HelpTextForm />
            <DialogDemo />
            <TooltipDemo />
            <CarouselDemo />
            <GalleriaDemo />
            <ToastDemo />
            <AnimationDemo />
            <AdvancedComponentsDemo />
            <SidebarButtonGroupDemo />
            <SidebarDemo />
            <FileUploadForm />
        </div>
    )
}

