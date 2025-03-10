"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Plus, Upload, X, Download } from "lucide-react"
import { Button } from "../Button/Button"

interface FileItem {
    file: File
    id: string
    status: "pending" | "error"
    error?: string
    thumbnail?: string
}

export interface FileUploadProps {
    variant?: "basic" | "advanced"
    onFileSelect?: (file: File) => void
    onUpload?: (file: File) => void
    onCancel?: () => void
    accept?: string
    multiple?: boolean
    maxSize?: number // in KB
    className?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({
    variant = "basic",
    onFileSelect,
    onUpload,
    onCancel,
    accept,
    multiple = false,
    maxSize = 1000, // 1MB default
    className = "",
}) => {
    const [files, setFiles] = useState<FileItem[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const generateThumbnail = async (file: File): Promise<string | undefined> => {
        if (!file.type.startsWith("image/")) return undefined

        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = (e) => resolve(e.target?.result as string)
            reader.readAsDataURL(file)
        })
    }

    const validateFile = (file: File): string | undefined => {
        const sizeInKB = file.size / 1024
        if (sizeInKB > maxSize) {
            return `Invalid file size, maximum upload size is ${maxSize.toLocaleString()} KB.`
        }
        return undefined
    }

    const handleChoose = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || [])

        const newFiles = await Promise.all(
            selectedFiles.map(async (file) => {
                const error = validateFile(file)
                const thumbnail = await generateThumbnail(file)
                const fileItem: FileItem = {
                    file,
                    id: Math.random().toString(36).substring(2),
                    status: error ? "error" : "pending",
                    error,
                    thumbnail,
                }
                onFileSelect?.(file)
                return fileItem
            }),
        )

        if (multiple) {
            setFiles((prev) => [...prev, ...newFiles])
        } else {
            setFiles(newFiles.slice(-1))
        }

        // Reset input value to allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleUpload = () => {
        files.forEach((fileItem) => {
            if (fileItem.status === "pending") {
                onUpload?.(fileItem.file)
            }
        })
    }

    const handleCancel = () => {
        setFiles([])
        onCancel?.()
    }

    const handleRemoveFile = (id: string) => {
        setFiles((prev) => prev.filter((file) => file.id !== id))
    }

    const formatFileSize = (bytes: number): string => {
        const kb = bytes / 1024
        return `${kb.toFixed(3)} KB`
    }

    return (
        <div className={`ui-file-upload ${className}`}>
            <input
                type="file"
                ref={fileInputRef}
                className="ui-file-upload__input"
                onChange={handleFileChange}
                accept={accept}
                multiple={multiple && variant === "advanced"}
            />

            <div className="ui-file-upload__buttons">
                <Button variant="primary" icon={<Plus />} onClick={handleChoose}>
                    Choose
                </Button>
                {variant === "advanced" && (
                    <>
                        <Button
                            variant="secondary"
                            icon={<Upload />}
                            onClick={handleUpload}
                            disabled={!files.some((f) => f.status === "pending")}
                            buttonStyle="outlined"
                        >
                            Upload
                        </Button>
                        <Button
                            variant="danger"
                            icon={<X />}
                            onClick={handleCancel}
                            disabled={files.length === 0}
                            buttonStyle="outlined"
                        >
                            Cancel
                        </Button>
                    </>
                )}
            </div>

            {files.length > 0 && (
                <div className="ui-file-upload__file-list">
                    {files.map((fileItem) => (
                        <div
                            key={fileItem.id}
                            className={`ui-file-upload__file-item ${fileItem.status === "error" ? "ui-file-upload__file-item--error" : ""
                                }`}
                        >
                            {fileItem.error ? (
                                <div className="ui-file-upload__error">
                                    <X className="ui-file-upload__error-icon" />
                                    <span>
                                        {fileItem.file.name}: {fileItem.error}
                                    </span>
                                    <button
                                        className="ui-file-upload__remove"
                                        onClick={() => handleRemoveFile(fileItem.id)}
                                        aria-label="Remove file"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="ui-file-upload__file">
                                    {fileItem.thumbnail && (
                                        <img src={fileItem.thumbnail || "/placeholder.svg"} alt="" className="ui-file-upload__thumbnail" />
                                    )}
                                    <div className="ui-file-upload__file-info">
                                        <span className="ui-file-upload__filename">{fileItem.file.name}</span>
                                        <span className="ui-file-upload__filesize">
                                            {formatFileSize(fileItem.file.size)}
                                            {variant === "advanced" && <span className="ui-file-upload__status">Pending</span>}
                                        </span>
                                    </div>
                                    {variant === "advanced" ? (
                                        <button
                                            className="ui-file-upload__remove"
                                            onClick={() => handleRemoveFile(fileItem.id)}
                                            aria-label="Remove file"
                                        >
                                            <X size={16} />
                                        </button>
                                    ) : (
                                        <Download size={16} className="ui-file-upload__download" />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

