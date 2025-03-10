"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, ChevronUp, Plus, Star } from "lucide-react"
import type { Product } from "../../types/product"
import "./ExpandableTable.scss"

interface ExpandableTableProps {
    data: Product[]
}

export function ExpandableTable({ data }: ExpandableTableProps) {
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
    const [sortField, setSortField] = useState<keyof Product | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    const toggleRow = (id: string) => {
        const newExpandedRows = new Set(expandedRows)
        if (expandedRows.has(id)) {
            newExpandedRows.delete(id)
        } else {
            newExpandedRows.add(id)
        }
        setExpandedRows(newExpandedRows)
    }

    const expandAll = () => {
        if (expandedRows.size === data.length) {
            setExpandedRows(new Set())
        } else {
            setExpandedRows(new Set(data.map((item) => item.id)))
        }
    }

    const handleSort = (field: keyof Product) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const sortedData = [...data].sort((a, b) => {
        if (!sortField) return 0

        const aValue = a[sortField]
        const bValue = b[sortField]

        if (typeof aValue === "string" && typeof bValue === "string") {
            return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
            return sortDirection === "asc" ? aValue - bValue : bValue - aValue
        }

        return 0
    })

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <Star
                key={index}
                className={`expandable-table__star ${index < rating ? "expandable-table__star--filled" : "expandable-table__star--empty"
                    }`}
            />
        ))
    }

    const getStatusClass = (status: Product["status"]) => {
        switch (status) {
            case "INSTOCK":
                return "expandable-table__status--instock"
            case "LOWSTOCK":
                return "expandable-table__status--lowstock"
            case "OUTOFSTOCK":
                return "expandable-table__status--outofstock"
            default:
                return ""
        }
    }

    return (
        <div className="expandable-table">
            <div className="expandable-table__header">
                <h2 className="expandable-table__title">Row Expand</h2>
                <button onClick={expandAll} className="expandable-table__expand-btn">
                    <Plus size={20} />
                    {expandedRows.size === data.length ? "Collapse All" : "Expand All"}
                </button>
            </div>

            <div className="expandable-table__content">
                <table className="expandable-table__table">
                    <thead>
                        <tr>
                            <th className="expandable-table__th"></th>
                            <th className="expandable-table__th expandable-table__th--sortable" onClick={() => handleSort("name")}>
                                Name
                                <span
                                    className={`expandable-table__sort-icon ${sortField === "name" && sortDirection === "desc" ? "expandable-table__sort-icon--asc" : ""
                                        }`}
                                >
                                    {sortField === "name" ? <ChevronUp size={16} /> : <ChevronUp size={16} style={{ opacity: 0.3 }} />}
                                </span>
                            </th>
                            <th className="expandable-table__th">Image</th>
                            <th className="expandable-table__th expandable-table__th--sortable" onClick={() => handleSort("price")}>
                                Price
                                <span
                                    className={`expandable-table__sort-icon ${sortField === "price" && sortDirection === "desc" ? "expandable-table__sort-icon--asc" : ""
                                        }`}
                                >
                                    {sortField === "price" ? <ChevronUp size={16} /> : <ChevronUp size={16} style={{ opacity: 0.3 }} />}
                                </span>
                            </th>
                            <th
                                className="expandable-table__th expandable-table__th--sortable"
                                onClick={() => handleSort("category")}
                            >
                                Category
                                <span
                                    className={`expandable-table__sort-icon ${sortField === "category" && sortDirection === "desc" ? "expandable-table__sort-icon--asc" : ""
                                        }`}
                                >
                                    {sortField === "category" ? (
                                        <ChevronUp size={16} />
                                    ) : (
                                        <ChevronUp size={16} style={{ opacity: 0.3 }} />
                                    )}
                                </span>
                            </th>
                            <th className="expandable-table__th expandable-table__th--sortable" onClick={() => handleSort("rating")}>
                                Reviews
                                <span
                                    className={`expandable-table__sort-icon ${sortField === "rating" && sortDirection === "desc" ? "expandable-table__sort-icon--asc" : ""
                                        }`}
                                >
                                    {sortField === "rating" ? <ChevronUp size={16} /> : <ChevronUp size={16} style={{ opacity: 0.3 }} />}
                                </span>
                            </th>
                            <th className="expandable-table__th expandable-table__th--sortable" onClick={() => handleSort("status")}>
                                Status
                                <span
                                    className={`expandable-table__sort-icon ${sortField === "status" && sortDirection === "desc" ? "expandable-table__sort-icon--asc" : ""
                                        }`}
                                >
                                    {sortField === "status" ? <ChevronUp size={16} /> : <ChevronUp size={16} style={{ opacity: 0.3 }} />}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item) => (
                            <>
                                <tr key={item.id} className="expandable-table__row">
                                    <td className="expandable-table__td">
                                        <button onClick={() => toggleRow(item.id)} className="expandable-table__toggle-btn">
                                            {expandedRows.has(item.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                        </button>
                                    </td>
                                    <td className="expandable-table__td">{item.name}</td>
                                    <td className="expandable-table__td">
                                        <img
                                            src={item.image || "/placeholder.svg?height=80&width=80"}
                                            alt={item.name}
                                            className="expandable-table__product-image"
                                        />
                                    </td>
                                    <td className="expandable-table__td">{formatPrice(item.price)}</td>
                                    <td className="expandable-table__td">{item.category}</td>
                                    <td className="expandable-table__td">
                                        <div className="expandable-table__stars">{renderStars(item.rating)}</div>
                                    </td>
                                    <td className="expandable-table__td">
                                        <span className={`expandable-table__status ${getStatusClass(item.status)}`}>{item.status}</span>
                                    </td>
                                </tr>
                                {expandedRows.has(item.id) && (
                                    <tr className="expandable-table__expanded-row">
                                        <td colSpan={7} className="expandable-table__td">
                                            <div className="expandable-table__expanded-content">
                                                <div>
                                                    <h4 className="expandable-table__section-title">Description</h4>
                                                    <p className="expandable-table__description">{item.description}</p>
                                                </div>
                                                <div>
                                                    <h4 className="expandable-table__section-title">Details</h4>
                                                    <dl className="expandable-table__details-grid">
                                                        {item.details?.color && (
                                                            <>
                                                                <dt className="expandable-table__detail-label">Color</dt>
                                                                <dd className="expandable-table__detail-value">{item.details.color}</dd>
                                                            </>
                                                        )}
                                                        {item.details?.material && (
                                                            <>
                                                                <dt className="expandable-table__detail-label">Material</dt>
                                                                <dd className="expandable-table__detail-value">{item.details.material}</dd>
                                                            </>
                                                        )}
                                                        {item.details?.weight && (
                                                            <>
                                                                <dt className="expandable-table__detail-label">Weight</dt>
                                                                <dd className="expandable-table__detail-value">{item.details.weight}</dd>
                                                            </>
                                                        )}
                                                        {item.details?.dimensions && (
                                                            <>
                                                                <dt className="expandable-table__detail-label">Dimensions</dt>
                                                                <dd className="expandable-table__detail-value">{item.details.dimensions}</dd>
                                                            </>
                                                        )}
                                                    </dl>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

