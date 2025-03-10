"use client"

import type React from "react"

import { useState } from "react"
import { Container, Box, Typography, Tabs, Tab, useMediaQuery } from "@mui/material"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import UIElementsShowcase from "./components/UIElementsShowcase"
import FormComponentsShowcase from "./components/FormComponentsShowcase"
import FormControlsShowcase from "./components/FormControlsShowcase"

// Import the main SCSS file
import "./styles/index.scss"
import MultiSelectExample from "./components/MultiSelectExample"
import AdvancedUIShowcase from "./components/AdvancedUIShowcase"
import { FormLayoutsShowcase } from "./components/FormLayouts"
import { TableExample } from "./components/TableExample"
import DataViewPage from "./pages/data-view"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const isMobile = useMediaQuery("(max-width:600px)")

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
    // Scroll to top when changing tabs on mobile
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Responsive tab labels
  const getTabLabel = (label: string) => {
    if (isMobile) {
      // Shorten labels on mobile
      switch (label) {
        case "Dashboard":
          return "Home"
        case "UI Elements":
          return "UI"
        case "Form Components":
          return "Forms"
        case "Form Controls":
          return "Controls"
        case "MultiSelect Example":
          return "Multi"
        case "Advanced Example":
          return "Advanced"
        case "Form Layout":
          return "Layout"
        case "Table Example":
          return "Table"
        case "Data View":
          return "Data"
        default:
          return label
      }
    }
    return label
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }} className={darkMode ? "dark" : ""}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <Container component="main" sx={{ mt: 4, mb: 4, flex: "1 0 auto" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          React + Vite + TypeScript + Material UI
        </Typography>

        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 3,
            overflowX: "auto",
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "#CBD5E0", borderRadius: "3px" },
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="app tabs"
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : undefined}
            allowScrollButtonsMobile
            sx={{
              minHeight: { xs: "42px", sm: "48px" },
              "& .MuiTab-root": {
                minHeight: { xs: "42px", sm: "48px" },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                padding: { xs: "6px 12px", sm: "12px 16px" },
              },
            }}
          >
            <Tab label={getTabLabel("Dashboard")} />
            <Tab label={getTabLabel("UI Elements")} />
            <Tab label={getTabLabel("Form Components")} />
            <Tab label={getTabLabel("Advanced Example")} />
            <Tab label={getTabLabel("Form Layout")} />
            <Tab label={getTabLabel("Table Example")} />
            <Tab label={getTabLabel("Data View")} />
          </Tabs>
        </Box>

        {activeTab === 0 && <Dashboard />}
        {activeTab === 1 && <UIElementsShowcase />}
        {activeTab === 2 && <FormComponentsShowcase />}
        {activeTab === 3 && <AdvancedUIShowcase />}
        {activeTab === 4 && <FormLayoutsShowcase />}
        {activeTab === 5 && <TableExample />}
        {activeTab === 6 && <DataViewPage />}
      </Container>

      <Box
        component="footer"
        sx={{
          py: { xs: 2, sm: 3 },
          px: { xs: 1, sm: 2 },
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

