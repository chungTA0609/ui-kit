import { DataView } from "../components/DataView/DataView"
import type { Product } from "../types/data-view"

const sampleProducts: Product[] = [
    {
        id: "1",
        name: "Bamboo Watch",
        description: "Product Description",
        category: "Accessories",
        status: "INSTOCK",
        price: 65,
        rating: 5,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
    },
    {
        id: "2",
        name: "Black Watch",
        description: "Product Description",
        category: "Accessories",
        status: "OUTOFSTOCK",
        price: 72,
        rating: 4,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
    },
    {
        id: "3",
        name: "Blue Band",
        description: "Product Description",
        category: "Fitness",
        status: "LOWSTOCK",
        price: 79,
        rating: 3,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
    },
    {
        id: "4",
        name: "Blue T-Shirt",
        description: "Product Description",
        category: "Clothing",
        status: "INSTOCK",
        price: 29,
        rating: 5,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
    },
    {
        id: "5",
        name: "Bracelet",
        description: "Product Description",
        category: "Accessories",
        status: "INSTOCK",
        price: 15,
        rating: 4,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
    },
    {
        id: "6",
        name: "Brown Purse",
        description: "Elegant leather purse with multiple compartments",
        category: "Accessories",
        status: "INSTOCK",
        price: 120,
        rating: 4,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
    },
    {
        id: "7",
        name: "Chakra Bracelet",
        description: "Spiritual bracelet with healing stones",
        category: "Accessories",
        status: "LOWSTOCK",
        price: 32,
        rating: 3,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
    },
    {
        id: "8",
        name: "Galaxy Earrings",
        description: "Beautiful cosmic-themed earrings",
        category: "Accessories",
        status: "INSTOCK",
        price: 34,
        rating: 5,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
    },
    {
        id: "9",
        name: "Game Controller",
        description: "Premium gaming controller with customizable buttons",
        category: "Electronics",
        status: "LOWSTOCK",
        price: 99,
        rating: 4,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
    },
    {
        id: "10",
        name: "Gaming Set",
        description: "Complete gaming setup with headphones and mouse",
        category: "Electronics",
        status: "OUTOFSTOCK",
        price: 299,
        rating: 5,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qy282yztiVTmuDDY0CRD7qaBcJp5rN.png",
    },
] as const

export default function DataViewPage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <DataView products={sampleProducts} />
        </div>
    )
}

