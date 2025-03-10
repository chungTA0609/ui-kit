"use client"

import { Input } from "../ui/Input/Input"
import { Button } from "../ui/Button/Button"
import { FileUploadForm } from "./FileUploadForm"

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

export const FormLayoutsShowcase = () => {
    return (
        <div className="form-layouts">
            <VerticalForm />
            <HorizontalForm />
            <InlineForm />
            <VerticalGridForm />
            <HelpTextForm />
            <FileUploadForm />
        </div>
    )
}

