"use client"

import { useState } from "react"
import { Container, Grid, Typography, Paper, Divider } from "@mui/material"
import { Rating } from "../ui/Rating/Rating"
import { ColorPicker } from "../ui/ColorPicker/ColorPicker"
import { MultiSelect } from "../ui/MultiSelect/MultiSelect"

const countries = [
    {
        value: "au",
        label: "Australia",
        flag: "https://flagcdn.com/w40/au.png",
    },
    {
        value: "br",
        label: "Brazil",
        flag: "https://flagcdn.com/w40/br.png",
    },
    {
        value: "cn",
        label: "China",
        flag: "https://flagcdn.com/w40/cn.png",
    },
    {
        value: "eg",
        label: "Egypt",
        flag: "https://flagcdn.com/w40/eg.png",
    },
    {
        value: "fr",
        label: "France",
        flag: "https://flagcdn.com/w40/fr.png",
    },
]
import { Dropdown } from "../ui/Dropdown/Dropdown"

const cities = [
    { value: "ny", label: "New York" },
    { value: "rome", label: "Rome" },
    { value: "london", label: "London" },
    { value: "istanbul", label: "Istanbul" },
    { value: "paris", label: "Paris" },
]
const AdvancedUIShowcase = () => {
    const [rating, setRating] = useState(0)
    const [color, setColor] = useState("#1976d2")
    const [selectedCountries, setSelectedCountries] = useState<string[]>(["au", "br", "cn", "eg"])
    const [selectedCity, setSelectedCity] = useState("istanbul")
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Rating
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Rating value={rating} onChange={setRating} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            ColorPicker
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <ColorPicker value={color} onChange={setColor} />
                    </Paper>
                </Grid>
            </Grid>

            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">MultiSelect</h2>
                <MultiSelect
                    options={countries}
                    value={selectedCountries}
                    onChange={setSelectedCountries}
                    placeholder="Select countries"
                />
                <h2 className="text-xl font-semibold mb-4">Dropdown</h2>
                <div className="max-w-xs">
                    <Dropdown options={cities} value={selectedCity} onChange={setSelectedCity} placeholder="Select city" />
                </div>
            </div>
        </Container>
    )
}

export default AdvancedUIShowcase

