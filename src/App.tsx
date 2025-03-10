"use client"

import type React from "react"

import { useState } from "react"
import { Container, Box, Typography, Tabs, Tab } from "@mui/material"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import UIElementsShowcase from "./components/UIElementsShowcase"
import FormComponentsShowcase from "./components/FormComponentsShowcase"
import FormControlsShowcase from "./components/FormControlsShowcase"

// Import the main SCSS file
import "./styles/index.scss"
import MultiSelectExample from "./components/MultiSelectExample"
import AdvancedUIShowcase from "./components/AdvancedUIShowcase"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }} className={darkMode ? "dark" : ""}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <Container component="main" sx={{ mt: 4, mb: 4, flex: "1 0 auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React + Vite + TypeScript + Material UI
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="app tabs">
            <Tab label="Dashboard" />
            <Tab label="UI Elements" />
            <Tab label="Form Components" />
            <Tab label="Form Controls" />
            <Tab label="MultiSelect Example" />
            <Tab label="Adavanced Example" />
          </Tabs>
        </Box>

        {activeTab === 0 && <Dashboard />}
        {activeTab === 1 && <UIElementsShowcase />}
        {activeTab === 2 && <FormComponentsShowcase />}
        {activeTab === 3 && <FormControlsShowcase />}
        {activeTab === 4 && <MultiSelectExample />}
        {activeTab === 5 && <AdvancedUIShowcase />}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Your Company Name
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default App

