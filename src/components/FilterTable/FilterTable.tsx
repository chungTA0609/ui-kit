"use client"

import React from "react"

import { useState, useMemo, useRef, useEffect } from "react"
import {
    Search,
    ChevronDown,
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
    Check,
    X,
    FilterX,
} from "lucide-react"
import type { TableData, FilterState } from "../../types/table"
import { ColumnFilter, type FilterRule } from "./ColumnFilter"

// Add to the FilterState interface in types/table.ts:
interface ColumnFilters {
    [key: string]: FilterRule[]
}

interface FilterTableProps {
    data: TableData[]
}

export const FilterTable: React.FC<FilterTableProps> = ({ data }) => {
    const [filters, setFilters] = useState<FilterState>({})
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const itemsPerPage = 10
    const [columnFilters, setColumnFilters] = useState<ColumnFilters>({})
    const [activeFilter, setActiveFilter] = useState<string | null>(null)
    const filterTriggerRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement> }>({})

    // Initialize refs for each column
    useEffect(() => {
        const columns = ["name", "country", "agent", "date", "balance", "status", "activity", "verified"]
        columns.forEach((column) => {
            if (!filterTriggerRefs.current[column]) {
                filterTriggerRefs.current[column] = React.createRef()
            }
        })
    }, [])

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            // Search filter
            if (search) {
                const searchLower = search.toLowerCase()
                if (
                    !item.name.toLowerCase().includes(searchLower) &&
                    !item.country.name.toLowerCase().includes(searchLower) &&
                    !item.agent.name.toLowerCase().includes(searchLower)
                ) {
                    return false
                }
            }

            // Name filter
            if (filters.name && !item.name.toLowerCase().includes(filters.name.toLowerCase())) {
                return false
            }

            // Country filter
            if (filters.country?.length && !filters.country.includes(item.country.code)) {
                return false
            }

            // Agent filter
            if (filters.agent?.length && !filters.agent.includes(item.agent.id)) {
                return false
            }

            // Status filter
            if (filters.status?.length && !filters.status.includes(item.status)) {
                return false
            }

            // Verified filter
            if (filters.verified !== null && filters.verified !== undefined && item.verified !== filters.verified) {
                return false
            }

            // Balance range filter
            if (filters.balance) {
                const [min, max] = filters.balance
                if (min !== null && item.balance < min) return false
                if (max !== null && item.balance > max) return false
            }

            // Activity range filter
            if (filters.activity) {
                const [min, max] = filters.activity
                if (min !== null && item.activity < min) return false
                if (max !== null && item.activity > max) return false
            }

            // Apply column filters
            for (const [column, rules] of Object.entries(columnFilters)) {
                const value = item[column as keyof TableData]
                if (typeof value === "string") {
                    const matches = rules.map((rule) => {
                        const testValue = value.toLowerCase()
                        const ruleValue = rule.value.toLowerCase()

                        switch (rule.operator) {
                            case "equals":
                                return testValue === ruleValue
                            case "startsWith":
                                return testValue.startsWith(ruleValue)
                            case "contains":
                                return testValue.includes(ruleValue)
                            case "endsWith":
                                return testValue.endsWith(ruleValue)
                            default:
                                return true
                        }
                    })

                    const matchType = rules[0]?.matchType || "all"
                    if (matchType === "all" && !matches.every(Boolean)) return false
                    if (matchType === "any" && !matches.some(Boolean)) return false
                }
            }

            return true
        })
    }, [data, filters, search, columnFilters])

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage
        return filteredData.slice(start, start + itemsPerPage)
    }, [filteredData, currentPage])

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    const handleClearFilters = () => {
        setFilters({})
        setSearch("")
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(value)
    }

    const getStatusColor = (status: TableData["status"]) => {
        const colors = {
            UNQUALIFIED: "bg-red-100 text-red-800",
            PROPOSAL: "bg-orange-100 text-orange-800",
            QUALIFIED: "bg-green-100 text-green-800",
            NEW: "bg-blue-100 text-blue-800",
            RENEWAL: "bg-purple-100 text-purple-800",
        }
        return colors[status]
    }

    const handleFilterClick = (column: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveFilter(activeFilter === column ? null : column)
    }

    const handleFilterApply = (column: string, rules: FilterRule[]) => {
        setColumnFilters((prev) => ({
            ...prev,
            [column]: rules,
        }))
    }

    return (
        <div className="filter-table">
            <div className="filter-table__header">
                <h2 className="filter-table__title">Filter Menu</h2>

            </div>
            <div style={{ padding: '2rem' }}>
                <div className="filter-table__controls" style={{ marginBottom: '1rem' }}>
                    <button className="filter-table__clear-btn" onClick={handleClearFilters}>
                        <FilterX size={16} />
                        Clear
                    </button>
                    <div className="filter-table__search">
                        <Search size={16} className="filter-table__search-icon" />
                        <input
                            type="text"
                            placeholder="Keyword Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="filter-table__search-input"
                        />
                    </div>
                </div>
                <div className="filter-table__content">
                    <table className="filter-table__table">
                        <thead>
                            <tr>
                                <th>
                                    <div className="filter-table__column-header">
                                        Name
                                        <button
                                            ref={filterTriggerRefs.current["name"]}
                                            className="filter-table__column-filter"
                                            onClick={(e) => handleFilterClick("name", e)}
                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                        {activeFilter === "name" && (
                                            <ColumnFilter
                                                column="name"
                                                onApply={(rules) => handleFilterApply("name", rules)}
                                                onClose={() => setActiveFilter(null)}
                                                initialRules={columnFilters["name"]}
                                                triggerRef={filterTriggerRefs.current["name"]}
                                            />
                                        )}
                                    </div>
                                </th>
                                <th>
                                    <div className="filter-table__column-header">
                                        Country
                                        <button
                                            ref={filterTriggerRefs.current["country"]}
                                            className="filter-table__column-filter"
                                            onClick={(e) => handleFilterClick("country", e)}
                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                        {activeFilter === "country" && (
                                            <ColumnFilter
                                                column="country"
                                                onApply={(rules) => handleFilterApply("country", rules)}
                                                onClose={() => setActiveFilter(null)}
                                                initialRules={columnFilters["country"]}
                                                triggerRef={filterTriggerRefs.current["country"]}
                                            />
                                        )}
                                    </div>
                                </th>
                                <th>
                                    <div className="filter-table__column-header">
                                        Agent
                                        <button
                                            ref={filterTriggerRefs.current["agent"]}
                                            className="filter-table__column-filter"
                                            onClick={(e) => handleFilterClick("agent", e)}
                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                        {activeFilter === "agent" && (
                                            <ColumnFilter
                                                column="agent"
                                                onApply={(rules) => handleFilterApply("agent", rules)}
                                                onClose={() => setActiveFilter(null)}
                                                initialRules={columnFilters["agent"]}
                                                triggerRef={filterTriggerRefs.current["agent"]}
                                            />
                                        )}
                                    </div>
                                </th>
                                <th>
                                    <div className="filter-table__column-header">
                                        Date
                                        <button
                                            ref={filterTriggerRefs.current["date"]}
                                            className="filter-table__column-filter"
                                            onClick={(e) => handleFilterClick("date", e)}
                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                        {activeFilter === "date" && (
                                            <ColumnFilter
                                                column="date"
                                                onApply={(rules) => handleFilterApply("date", rules)}
                                                onClose={() => setActiveFilter(null)}
                                                initialRules={columnFilters["date"]}
                                                triggerRef={filterTriggerRefs.current["date"]}
                                            />
                                        )}
                                    </div>
                                </th>
                                <th>
                                    <div className="filter-table__column-header">
                                        Balance
                                        <button
                                            ref={filterTriggerRefs.current["balance"]}
                                            className="filter-table__column-filter"
                                            onClick={(e) => handleFilterClick("balance", e)}
                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                        {activeFilter === "balance" && (
                                            <ColumnFilter
                                                column="balance"
                                                onApply={(rules) => handleFilterApply("balance", rules)}
                                                onClose={() => setActiveFilter(null)}
                                                initialRules={columnFilters["balance"]}
                                                triggerRef={filterTriggerRefs.current["balance"]}
                                            />
                                        )}
                                    </div>
                                </th>
                                <th>
                                    <div className="filter-table__column-header">
                                        Status
                                        <button
                                            ref={filterTriggerRefs.current["status"]}
                                            className="filter-table__column-filter"
                                            onClick={(e) => handleFilterClick("status", e)}
                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                        {activeFilter === "status" && (
                                            <ColumnFilter
                                                column="status"
                                                onApply={(rules) => handleFilterApply("status", rules)}
                                                onClose={() => setActiveFilter(null)}
                                                initialRules={columnFilters["status"]}
                                                triggerRef={filterTriggerRefs.current["status"]}
                                            />
                                        )}
                                    </div>
                                </th>
                                <th>
                                    <div className="filter-table__column-header">
                                        Activity
                                        <button
                                            ref={filterTriggerRefs.current["activity"]}
                                            className="filter-table__column-filter"
                                            onClick={(e) => handleFilterClick("activity", e)}
                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                        {activeFilter === "activity" && (
                                            <ColumnFilter
                                                column="activity"
                                                onApply={(rules) => handleFilterApply("activity", rules)}
                                                onClose={() => setActiveFilter(null)}
                                                initialRules={columnFilters["activity"]}
                                                triggerRef={filterTriggerRefs.current["activity"]}
                                            />
                                        )}
                                    </div>
                                </th>
                                <th>
                                    <div className="filter-table__column-header">
                                        Verified
                                        <button
                                            ref={filterTriggerRefs.current["verified"]}
                                            className="filter-table__column-filter"
                                            onClick={(e) => handleFilterClick("verified", e)}
                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                        {activeFilter === "verified" && (
                                            <ColumnFilter
                                                column="verified"
                                                onApply={(rules) => handleFilterApply("verified", rules)}
                                                onClose={() => setActiveFilter(null)}
                                                initialRules={columnFilters["verified"]}
                                                triggerRef={filterTriggerRefs.current["verified"]}
                                            />
                                        )}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="filter-table__country">
                                            <img
                                                src={`https://flagcdn.com/w20/${item.country.code.toLowerCase()}.png`}
                                                alt={item.country.name}
                                                className="filter-table__flag"
                                            />
                                            {item.country.name}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="filter-table__agent">
                                            <img
                                                src={item.agent.avatar || "/placeholder.svg"}
                                                alt={item.agent.name}
                                                className="filter-table__avatar"
                                            />
                                            {item.agent.name}
                                        </div>
                                    </td>
                                    <td>{item.date}</td>
                                    <td>{formatCurrency(item.balance)}</td>
                                    <td>
                                        <span className={`filter-table__status ${getStatusColor(item.status)}`}>{item.status}</span>
                                    </td>
                                    <td>
                                        <div className="filter-table__activity">
                                            <div className="filter-table__activity-bar" style={{ width: `${item.activity}%` }} />
                                            <div className="filter-table__activity-bg" />
                                        </div>
                                    </td>
                                    <td>
                                        {item.verified ? (
                                            <Check className="filter-table__verified filter-table__verified--true" />
                                        ) : (
                                            <X className="filter-table__verified filter-table__verified--false" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="filter-table__pagination">
                    <button className="filter-table__page-btn" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                        <ChevronFirst size={16} />
                    </button>
                    <button
                        className="filter-table__page-btn"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`filter-table__page-btn ${page === currentPage ? "filter-table__page-btn--active" : ""}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className="filter-table__page-btn"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight size={16} />
                    </button>
                    <button
                        className="filter-table__page-btn"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronLast size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

