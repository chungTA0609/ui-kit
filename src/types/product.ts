export interface Product {
    id: string
    name: string
    image: string
    price: number
    category: string
    rating: number
    status: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK"
    description?: string
    details?: {
        color?: string
        material?: string
        weight?: string
        dimensions?: string
    }
}

