import { FileUpload } from "../ui/FileUpload/FileUpload"

export const FileUploadForm = () => {
    const handleFileSelect = (file: File) => {
        console.log("File selected:", file)
    }

    const handleUpload = (file: File) => {
        console.log("Uploading file:", file)
    }

    const handleCancel = () => {
        console.log("Upload cancelled")
    }

    return (
        <div className="form-layout">
            <h2 className="form-layout__title">File Upload</h2>
            <div className="form-layout__section">
                <h3 className="form-layout__subtitle">Advanced</h3>
                <FileUpload
                    variant="advanced"
                    onFileSelect={handleFileSelect}
                    onUpload={handleUpload}
                    onCancel={handleCancel}
                    accept="image/*"
                    multiple
                    maxSize={976.563} // Maximum size in KB
                />
            </div>
            <div className="form-layout__section">
                <h3 className="form-layout__subtitle">Basic</h3>
                <FileUpload
                    onFileSelect={handleFileSelect}
                    accept="image/*"
                    maxSize={976.563} // Maximum size in KB
                />
            </div>
        </div>
    )
}

