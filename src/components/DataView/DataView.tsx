"use client"

import { useState } from "react"
import { Search, LayoutGrid, ListIcon, Tag, Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "../../types/data-view"
import "./DataView.scss"

interface DataViewProps {
    products: Product[]
}

export function DataView({ products }: DataViewProps) {
    const [view, setView] = useState<"grid" | "list">("list")
    const [sortBy, setSortBy] = useState("price-asc")
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = view === "grid" ? 6 : 5 // Show fewer items in list view

    const sortedAndFilteredProducts = products
        .filter(
            (product) =>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase()),
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "price-asc":
                    return a.price - b.price
                case "price-desc":
                    return b.price - a.price
                case "name-asc":
                    return a.name.localeCompare(b.name)
                case "name-desc":
                    return b.name.localeCompare(a.name)
                default:
                    return 0
            }
        })

    // Calculate pagination
    const totalItems = sortedAndFilteredProducts.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedProducts = sortedAndFilteredProducts.slice(startIndex, startIndex + itemsPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const getStatusClass = (status: Product["status"]) => {
        switch (status) {
            case "INSTOCK":
                return "data-view__status--instock"
            case "OUTOFSTOCK":
                return "data-view__status--outofstock"
            case "LOWSTOCK":
                return "data-view__status--lowstock"
            default:
                return ""
        }
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className={index < rating ? "filled" : "empty"} />
        ))
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
    }

    return (
        <div className="data-view">
            <div className="data-view__header">
                <h1 className="data-view__title">DataView</h1>
                <div className="data-view__controls">
                    <div className="data-view__sort">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="price-asc">Sort By Price ↑</option>
                            <option value="price-desc">Sort By Price ↓</option>
                            <option value="name-asc">Sort By Name ↑</option>
                            <option value="name-desc">Sort By Name ↓</option>
                        </select>
                    </div>
                    <div className="data-view__search">
                        <Search />
                        <input
                            type="text"
                            placeholder="Search by Name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="data-view__view-toggle">
                        <button
                            className={view === "list" ? "data-view__view-toggle--active" : ""}
                            onClick={() => setView("list")}
                            title="List view"
                        >
                            <ListIcon size={20} />
                        </button>
                        <button
                            className={view === "grid" ? "data-view__view-toggle--active" : ""}
                            onClick={() => setView("grid")}
                            title="Grid view"
                        >
                            <LayoutGrid size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`data-view__content ${view === "list" ? "data-view__content--list" : "data-view__content--grid"}`}
            >
                {paginatedProducts.map((product) => (
                    <div key={product.id} className="data-view__item">
                        <div className="data-view__item-image">
                            <img src={product.image || "/placeholder.svg"} alt={product.name} />
                        </div>
                        <div className="data-view__item-details">
                            <h3 className="data-view__item-name">{product.name}</h3>
                            <p className="data-view__item-description">{product.description}</p>
                            <div className="data-view__item-rating">{renderStars(product.rating)}</div>
                            <div className="data-view__item-category">
                                <Tag size={16} />
                                <span>{product.category}</span>
                            </div>
                        </div>
                        <div className="data-view__item-actions">
                            <div className="data-view__item-price">{formatPrice(product.price)}</div>
                            <button className="data-view__add-to-cart" disabled={product.status === "OUTOFSTOCK"}>
                                {view === "list" ? "Add to Cart" : <ShoppingCart size={16} />}
                            </button>
                            <div className={`data-view__status ${getStatusClass(product.status)}`}>{product.status}</div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="data-view__pagination">
                    <button
                        className="data-view__pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div className="data-view__pagination-pages">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`data-view__pagination-page ${page === currentPage ? "data-view__pagination-page--active" : ""}`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        className="data-view__pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    )
}

