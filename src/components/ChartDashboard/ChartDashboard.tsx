"use client"

import { useState } from "react"
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    type SelectChangeEvent,
    CircularProgress,
} from "@mui/material"
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts"
import { useChartData, type TimeRange } from "../../hooks/useChartData"
import "./ChartDashboard.scss"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const ChartDashboard = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>("year")
    const { data, loading, error } = useChartData(timeRange)

    const handleTimeRangeChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value as TimeRange)
    }

    if (error) {
        return (
            <Container maxWidth="lg" className="chart-dashboard">
                <Typography variant="h6" color="error">
                    Error loading chart data: {error.message}
                </Typography>
            </Container>
        )
    }

    return (
        <Container maxWidth="lg" className="chart-dashboard">
            <Box className="chart-dashboard__header">
                <Typography variant="h4" component="h1">
                    Sales Dashboard
                </Typography>
                <FormControl variant="outlined" size="small" className="chart-dashboard__time-range">
                    <InputLabel id="time-range-label">Time Range</InputLabel>
                    <Select
                        labelId="time-range-label"
                        id="time-range"
                        value={timeRange}
                        onChange={handleTimeRangeChange}
                        label="Time Range"
                    >
                        <MenuItem value="quarter">Last Quarter</MenuItem>
                        <MenuItem value="half">Last 6 Months</MenuItem>
                        <MenuItem value="year">Full Year</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <Paper className="chart-dashboard__paper">
                            <Typography variant="h6" component="h2" gutterBottom>
                                Sales Overview
                            </Typography>
                            <div className="chart-dashboard__chart-container">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart
                                        data={data.salesData}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 30,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Paper className="chart-dashboard__paper">
                            <Typography variant="h6" component="h2" gutterBottom>
                                Sales by Category
                            </Typography>
                            <div className="chart-dashboard__chart-container">
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={data.categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {data.categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value}`, "Sales"]} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className="chart-dashboard__paper">
                            <Typography variant="h6" component="h2" gutterBottom>
                                Monthly Expenses
                            </Typography>
                            <div className="chart-dashboard__chart-container">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={data.salesData}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 30,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="expenses" fill="#ff8042" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className="chart-dashboard__paper">
                            <Typography variant="h6" component="h2" gutterBottom>
                                Customer Demographics
                            </Typography>
                            <div className="chart-dashboard__chart-container">
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={data.customerData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {data.customerData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value}`, "Customers"]} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className="chart-dashboard__paper">
                            <Typography variant="h6" component="h2" gutterBottom>
                                Sales & Profit Trend
                            </Typography>
                            <div className="chart-dashboard__chart-container">
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart
                                        data={data.salesData}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 30,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                        <Area type="monotone" dataKey="profit" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Container>
    )
}

export default ChartDashboard