"use client"

import { useState } from "react"
import { useToast } from "./ToastProvider"
import { Button } from "../../ui/Button/Button"
import type { ToastPosition } from "./Toast"

export function ToastDemo() {
    const toast = useToast()
    const [position, setPosition] = useState<ToastPosition>("top-right")
    const [duration, setDuration] = useState(5000)
    const [dismissible, setDismissible] = useState(true)

    const showSuccessToast = () => {
        toast.success("Operation completed successfully!", {
            title: "Success",
            position,
            duration,
            dismissible,
        })
    }

    const showErrorToast = () => {
        toast.error("An error occurred while processing your request.", {
            title: "Error",
            position,
            duration,
            dismissible,
        })
    }

    const showInfoToast = () => {
        toast.info("This is an informational message.", {
            title: "Information",
            position,
            duration,
            dismissible,
        })
    }

    const showWarningToast = () => {
        toast.warning("Please review your information before proceeding.", {
            title: "Warning",
            position,
            duration,
            dismissible,
        })
    }

    const showCustomToast = () => {
        toast.toast("This is a custom toast message with no auto-dismiss.", {
            title: "Custom Toast",
            type: "info",
            position,
            duration: Number.POSITIVE_INFINITY,
            dismissible,
        })
    }

    return (
        <div className="form-layout">
            <h2 className="form-layout__title">Toast Notifications</h2>
            <div className="form-layout__section">
                <div style={{ marginBottom: "1rem" }}>
                    <label className="form-layout__label">Position</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                        <Button
                            variant={position === "top-right" ? "primary" : "secondary"}
                            buttonStyle={position === "top-right" ? "contained" : "outlined"}
                            onClick={() => setPosition("top-right")}
                        >
                            Top Right
                        </Button>
                        <Button
                            variant={position === "top-left" ? "primary" : "secondary"}
                            buttonStyle={position === "top-left" ? "contained" : "outlined"}
                            onClick={() => setPosition("top-left")}
                        >
                            Top Left
                        </Button>
                        <Button
                            variant={position === "bottom-right" ? "primary" : "secondary"}
                            buttonStyle={position === "bottom-right" ? "contained" : "outlined"}
                            onClick={() => setPosition("bottom-right")}
                        >
                            Bottom Right
                        </Button>
                        <Button
                            variant={position === "bottom-left" ? "primary" : "secondary"}
                            buttonStyle={position === "bottom-left" ? "contained" : "outlined"}
                            onClick={() => setPosition("bottom-left")}
                        >
                            Bottom Left
                        </Button>
                        <Button
                            variant={position === "top-center" ? "primary" : "secondary"}
                            buttonStyle={position === "top-center" ? "contained" : "outlined"}
                            onClick={() => setPosition("top-center")}
                        >
                            Top Center
                        </Button>
                        <Button
                            variant={position === "bottom-center" ? "primary" : "secondary"}
                            buttonStyle={position === "bottom-center" ? "contained" : "outlined"}
                            onClick={() => setPosition("bottom-center")}
                        >
                            Bottom Center
                        </Button>
                    </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label className="form-layout__label">Duration (ms)</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                        <Button
                            variant={duration === 3000 ? "primary" : "secondary"}
                            buttonStyle={duration === 3000 ? "contained" : "outlined"}
                            onClick={() => setDuration(3000)}
                        >
                            3000
                        </Button>
                        <Button
                            variant={duration === 5000 ? "primary" : "secondary"}
                            buttonStyle={duration === 5000 ? "contained" : "outlined"}
                            onClick={() => setDuration(5000)}
                        >
                            5000
                        </Button>
                        <Button
                            variant={duration === 10000 ? "primary" : "secondary"}
                            buttonStyle={duration === 10000 ? "contained" : "outlined"}
                            onClick={() => setDuration(10000)}
                        >
                            10000
                        </Button>
                    </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label className="form-layout__label">Options</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                        <input
                            type="checkbox"
                            id="dismissible"
                            checked={dismissible}
                            onChange={(e) => setDismissible(e.target.checked)}
                        />
                        <label htmlFor="dismissible">Dismissible</label>
                    </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    <Button variant="success" onClick={showSuccessToast}>
                        Success Toast
                    </Button>
                    <Button variant="danger" onClick={showErrorToast}>
                        Error Toast
                    </Button>
                    <Button variant="info" onClick={showInfoToast}>
                        Info Toast
                    </Button>
                    <Button variant="warning" onClick={showWarningToast}>
                        Warning Toast
                    </Button>
                    <Button variant="primary" onClick={showCustomToast}>
                        Custom Toast
                    </Button>
                    <Button variant="secondary" onClick={() => toast.dismissAll()}>
                        Dismiss All
                    </Button>
                </div>
            </div>
        </div>
    )
}

