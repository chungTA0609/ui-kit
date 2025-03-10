export type StockStatus = "INSTOCK" | "OUTOFSTOCK" | "LOWSTOCK"
export type Category = "Accessories" | "Clothing" | "Fitness" | "Electronics"

export interface Product {
    id: string
    name: string
    description: string
    category: Category
    status: StockStatus
    price: number
    rating: number
    image: string
}

