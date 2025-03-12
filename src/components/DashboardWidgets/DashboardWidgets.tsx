"use client"

import type React from "react"

import { useState } from "react"
import { BarChartIcon, TrendingUp, TrendingDown, MoreVertical, RefreshCw, Download, Calendar } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import "./DashboardWidgets.scss"

// Types for dashboard data
export interface KpiData {
  title: string
  value: number
  unit?: string
  change?: number
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
  color?: string
}

export interface ChartData {
  type: "bar" | "line" | "pie"
  title: string
  data: any[]
  colors?: string[]
}

export interface DashboardWidgetsProps {
  kpis?: KpiData[]
  charts?: ChartData[]
  className?: string
  timeRange?: "day" | "week" | "month" | "year"
  onTimeRangeChange?: (range: "day" | "week" | "month" | "year") => void
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function DashboardWidgets({
  kpis = [],
  charts = [],
  className = "",
  timeRange = "month",
  onTimeRangeChange,
}: DashboardWidgetsProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange)

  const handleTimeRangeChange = (range: "day" | "week" | "month" | "year") => {
    setSelectedTimeRange(range)
    if (onTimeRangeChange) {
      onTimeRangeChange(range)
    }
  }

  const renderKpiCard = (kpi: KpiData, index: number) => {
    const changeIcon =
      kpi.changeType === "positive" ? (
        <TrendingUp className="dashboard-widgets__kpi-change-icon dashboard-widgets__kpi-change-icon--positive" />
      ) : kpi.changeType === "negative" ? (
        <TrendingDown className="dashboard-widgets__kpi-change-icon dashboard-widgets__kpi-change-icon--negative" />
      ) : null

    return (
      <div key={index} className="dashboard-widgets__kpi-card">
        <div className="dashboard-widgets__kpi-header">
          <div className="dashboard-widgets__kpi-title">{kpi.title}</div>
          <button className="dashboard-widgets__kpi-menu" aria-label="More options">
            <MoreVertical size={16} />
          </button>
        </div>
        <div className="dashboard-widgets__kpi-content">
          <div className="dashboard-widgets__kpi-icon" style={{ backgroundColor: kpi.color || "#4154F1" }}>
            {kpi.icon || <BarChartIcon size={24} />}
          </div>
          <div className="dashboard-widgets__kpi-data">
            <div className="dashboard-widgets__kpi-value">
              {kpi.value.toLocaleString()}
              {kpi.unit && <span className="dashboard-widgets__kpi-unit">{kpi.unit}</span>}
            </div>
            {kpi.change !== undefined && (
              <div
                className={`dashboard-widgets__kpi-change dashboard-widgets__kpi-change--${kpi.changeType || "neutral"}`}
              >
                {changeIcon}
                {kpi.change > 0 && "+"}
                {kpi.change}%
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderChart = (chart: ChartData, index: number) => {
    const chartColors = chart.colors || COLORS

    return (
      <div key={index} className="dashboard-widgets__chart-card">
        <div className="dashboard-widgets__chart-header">
          <div className="dashboard-widgets__chart-title">{chart.title}</div>
          <div className="dashboard-widgets__chart-actions">
            <button className="dashboard-widgets__chart-action" aria-label="Refresh">
              <RefreshCw size={16} />
            </button>
            <button className="dashboard-widgets__chart-action" aria-label="Download">
              <Download size={16} />
            </button>
            <button className="dashboard-widgets__chart-action" aria-label="More options">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
        <div className="dashboard-widgets__chart-content">
          <ResponsiveContainer width="100%" height={250}>
            {chart.type === "bar" ? (
              <BarChart data={chart.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={chartColors[0]} />
                {chart.data[0] && chart.data[0].value2 !== undefined && <Bar dataKey="value2" fill={chartColors[1]} />}
              </BarChart>
            ) : chart.type === "line" ? (
              <LineChart data={chart.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke={chartColors[0]} activeDot={{ r: 8 }} />
                {chart.data[0] && chart.data[0].value2 !== undefined && (
                  <Line type="monotone" dataKey="value2" stroke={chartColors[1]} />
                )}
              </LineChart>
            ) : (
              <PieChart>
                <Pie
                  data={chart.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chart.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  return (
    <div className={`dashboard-widgets ${className}`}>
      <div className="dashboard-widgets__header">
        <h2 className="dashboard-widgets__title">Dashboard Overview</h2>
        <div className="dashboard-widgets__time-range">
          <Calendar size={16} />
          <select
            value={selectedTimeRange}
            onChange={(e) => handleTimeRangeChange(e.target.value as any)}
            className="dashboard-widgets__time-select"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {kpis.length > 0 && (
        <div className="dashboard-widgets__kpi-grid">{kpis.map((kpi, index) => renderKpiCard(kpi, index))}</div>
      )}

      {charts.length > 0 && (
        <div className="dashboard-widgets__chart-grid">{charts.map((chart, index) => renderChart(chart, index))}</div>
      )}
    </div>
  )
}

