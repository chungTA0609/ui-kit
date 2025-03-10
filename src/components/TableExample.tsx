import { FilterTable } from "./FilterTable/FilterTable"
import { ExpandableTable } from "./ExpandableTable/ExpandableTable"
import type { Product } from "../types/product"

const sampleTableData = [
    {
        id: "1",
        name: "James Butt",
        country: { name: "Algeria", code: "DZ" },
        agent: {
            id: "1",
            name: "Ioni Bowcher",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        date: "09/13/2015",
        balance: 70663.0,
        status: "UNQUALIFIED" as const,
        activity: 75,
        verified: true,
    },
    {
        id: "2",
        name: "Josephine Darakjy",
        country: { name: "Egypt", code: "EG" },
        agent: {
            id: "2",
            name: "Amy Elsner",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        date: "02/09/2019",
        balance: 82429.0,
        status: "PROPOSAL" as const,
        activity: 90,
        verified: true,
    },
    // Add more sample data...
]

const productData: Product[] = [
    {
        id: "1",
        name: "Bamboo Watch",
        image: "/placeholder.svg?height=80&width=80",
        price: 65.0,
        category: "Accessories",
        rating: 5,
        status: "INSTOCK",
        description:
            "Handcrafted bamboo watch with leather strap. Sustainable and eco-friendly design with precise Japanese movement.",
        details: {
            color: "Brown",
            material: "Bamboo, Leather",
            weight: "75g",
            dimensions: "40mm x 40mm",
        },
    },
    {
        id: "2",
        name: "Black Watch",
        image: "/placeholder.svg?height=80&width=80",
        price: 72.0,
        category: "Accessories",
        rating: 4,
        status: "INSTOCK",
        description:
            "Classic black watch with stainless steel case and premium leather band. Water-resistant up to 30 meters.",
        details: {
            color: "Black",
            material: "Stainless Steel, Leather",
            weight: "85g",
            dimensions: "42mm x 42mm",
        },
    },
    {
        id: "3",
        name: "Blue Band",
        image: "/placeholder.svg?height=80&width=80",
        price: 79.0,
        category: "Fitness",
        rating: 3,
        status: "LOWSTOCK",
        description:
            "Activity tracker with heart rate monitoring, sleep tracking, and smartphone notifications. Waterproof design.",
        details: {
            color: "Blue",
            material: "Silicone",
            weight: "32g",
            dimensions: "One size fits all",
        },
    },
    {
        id: "4",
        name: "Blue T-Shirt",
        image: "/placeholder.svg?height=80&width=80",
        price: 29.0,
        category: "Clothing",
        rating: 5,
        status: "INSTOCK",
        description:
            "Comfortable cotton t-shirt in classic blue. Pre-shrunk fabric with relaxed fit and reinforced stitching.",
        details: {
            color: "Blue",
            material: "100% Cotton",
            weight: "180g",
            dimensions: "S, M, L, XL",
        },
    },
    {
        id: "5",
        name: "Bracelet",
        image: "/placeholder.svg?height=80&width=80",
        price: 15.0,
        category: "Accessories",
        rating: 4,
        status: "INSTOCK",
        description: "Handmade beaded bracelet with adjustable fit. Each piece is unique with natural stone beads.",
        details: {
            color: "Multi",
            material: "Glass beads, Elastic cord",
            weight: "15g",
            dimensions: "18cm circumference",
        },
    },
]

export const TableExample = () => {
    return (
        <div className="p-4 space-y-8">
            <ExpandableTable data={productData} />
            <FilterTable data={sampleTableData} />
        </div>
    )
}

