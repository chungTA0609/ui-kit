"use client"

import { useState, useEffect } from "react"

// Types for chart data
export interface SalesData {
    month: string
    sales: number
    profit: number
    expenses: number
}

export interface PieData {
    name: string
    value: number
}

export interface ChartData {
    salesData: SalesData[]
    categoryData: PieData[]
    customerData: PieData[]
}

// Sample data
const defaultSalesData: SalesData[] = [
    { month: "Jan", sales: 4000, profit: 2400, expenses: 1600 },
    { month: "Feb", sales: 3000, profit: 1398, expenses: 1602 },
    { month: "Mar", sales: 2000, profit: 9800, expenses: 2200 },
    { month: "Apr", sales: 2780, profit: 3908, expenses: 2500 },
    { month: "May", sales: 1890, profit: 4800, expenses: 2181 },
    { month: "Jun", sales: 2390, profit: 3800, expenses: 2500 },
    { month: "Jul", sales: 3490, profit: 4300, expenses: 2100 },
    { month: "Aug", sales: 4300, profit: 4300, expenses: 2100 },
    { month: "Sep", sales: 3600, profit: 4300, expenses: 2100 },
    { month: "Oct", sales: 3800, profit: 4300, expenses: 2100 },
    { month: "Nov", sales: 4100, profit: 4300, expenses: 2100 },
    { month: "Dec", sales: 4900, profit: 4300, expenses: 2100 },
]

const defaultCategoryData: PieData[] = [
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Food", value: 300 },
    { name: "Books", value: 200 },
    { name: "Other", value: 100 },
]

const defaultCustomerData: PieData[] = [
    { name: "18-24", value: 400 },
    { name: "25-34", value: 300 },
    { name: "35-44", value: 300 },
    { name: "45-54", value: 200 },
    { name: "55+", value: 100 },
]

export type TimeRange = "quarter" | "half" | "year"

export function useChartData(timeRange: TimeRange = "year") {
    const [data, setData] = useState<ChartData>({
        salesData: defaultSalesData,
        categoryData: defaultCategoryData,
        customerData: defaultCustomerData,
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        setLoading(true)

        // Simulate API call with setTimeout
        const timer = setTimeout(() => {
            try {
                // Filter data based on time range
                let filteredSalesData = defaultSalesData

                if (timeRange === "quarter") {
                    filteredSalesData = defaultSalesData.slice(0, 3)
                } else if (timeRange === "half") {
                    filteredSalesData = defaultSalesData.slice(0, 6)
                }

                setData({
                    salesData: filteredSalesData,
                    categoryData: defaultCategoryData,
                    customerData: defaultCustomerData,
                })
                setLoading(false)
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Unknown error occurred"))
                setLoading(false)
            }
        }, 500) // Simulate network delay

        return () => clearTimeout(timer)
    }, [timeRange])

    return { data, loading, error }
}

