"use client"

import type React from "react"

import { useState } from "react"
import { Container, Grid, Paper, Typography, Box, Tabs, Tab } from "@mui/material"
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    AreaChart,
    Area,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts"
import "./Charts.scss"

// Sample data for charts
const monthlyData = [
    { name: "Jan", value: 400, pv: 2400, amt: 2400 },
    { name: "Feb", value: 300, pv: 1398, amt: 2210 },
    { name: "Mar", value: 200, pv: 9800, amt: 2290 },
    { name: "Apr", value: 278, pv: 3908, amt: 2000 },
    { name: "May", value: 189, pv: 4800, amt: 2181 },
    { name: "Jun", value: 239, pv: 3800, amt: 2500 },
    { name: "Jul", value: 349, pv: 4300, amt: 2100 },
    { name: "Aug", value: 430, pv: 4300, amt: 2100 },
    { name: "Sep", value: 360, pv: 4300, amt: 2100 },
    { name: "Oct", value: 380, pv: 4300, amt: 2100 },
    { name: "Nov", value: 410, pv: 4300, amt: 2100 },
    { name: "Dec", value: 490, pv: 4300, amt: 2100 },
]

const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 100 },
]

const radarData = [
    {
        subject: "Math",
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: "English",
        A: 98,
        B: 130,
        fullMark: 150,
    },
    {
        subject: "Geography",
        A: 86,
        B: 130,
        fullMark: 150,
    },
    {
        subject: "Physics",
        A: 99,
        B: 100,
        fullMark: 150,
    },
    {
        subject: "History",
        A: 85,
        B: 90,
        fullMark: 150,
    },
    {
        subject: "Chemistry",
        A: 65,
        B: 85,
        fullMark: 150,
    },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export const Charts = () => {
    const [activeTab, setActiveTab] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    return (
        <Container maxWidth="lg" className="charts-container">
            <Typography variant="h4" component="h1" gutterBottom>
                Charts
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="chart tabs">
                    <Tab label="Line Chart" />
                    <Tab label="Bar Chart" />
                    <Tab label="Pie Chart" />
                    <Tab label="Donut Chart" />
                    <Tab label="Area Chart" />
                    <Tab label="Radar Chart" />
                </Tabs>
            </Box>

            {activeTab === 0 && (
                <Paper className="chart-paper">
                    <Typography variant="h6" component="h2" gutterBottom>
                        Line Chart
                    </Typography>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                data={monthlyData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 30,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Paper>
            )}

            {activeTab === 1 && (
                <Paper className="chart-paper">
                    <Typography variant="h6" component="h2" gutterBottom>
                        Bar Chart
                    </Typography>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={monthlyData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 30,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" />
                                <Bar dataKey="pv" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Paper>
            )}

            {activeTab === 2 && (
                <Paper className="chart-paper">
                    <Typography variant="h6" component="h2" gutterBottom>
                        Pie Chart
                    </Typography>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={true}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value}`, "Value"]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Paper>
            )}

            {activeTab === 3 && (
                <Paper className="chart-paper">
                    <Typography variant="h6" component="h2" gutterBottom>
                        Donut Chart
                    </Typography>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value}`, "Value"]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Paper>
            )}

            {activeTab === 4 && (
                <Paper className="chart-paper">
                    <Typography variant="h6" component="h2" gutterBottom>
                        Area Chart
                    </Typography>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <AreaChart
                                data={monthlyData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 30,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="value" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Paper>
            )}

            {activeTab === 5 && (
                <Paper className="chart-paper">
                    <Typography variant="h6" component="h2" gutterBottom>
                        Radar Chart
                    </Typography>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                                <Radar name="Student A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                <Radar name="Student B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                <Legend />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Paper>
            )}

            <Grid container spacing={3} className="chart-grid">
                <Grid item xs={12} md={6}>
                    <Paper className="chart-paper">
                        <Typography variant="h6" component="h2" gutterBottom>
                            Line Chart
                        </Typography>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart
                                    data={monthlyData.slice(0, 6)}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 30,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className="chart-paper">
                        <Typography variant="h6" component="h2" gutterBottom>
                            Bar Chart
                        </Typography>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={monthlyData.slice(0, 6)}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 30,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className="chart-paper">
                        <Typography variant="h6" component="h2" gutterBottom>
                            Pie Chart
                        </Typography>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className="chart-paper">
                        <Typography variant="h6" component="h2" gutterBottom>
                            Area Chart
                        </Typography>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    data={monthlyData.slice(0, 6)}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 30,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Charts

