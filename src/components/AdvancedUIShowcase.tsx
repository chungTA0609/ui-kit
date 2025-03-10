"use client"

import { useState } from "react"
import { Container, Grid, Typography, Paper, Divider } from "@mui/material"
import { Rating } from "../ui/Rating/Rating"
import { ColorPicker } from "../ui/ColorPicker/ColorPicker"

const AdvancedUIShowcase = () => {
    const [rating, setRating] = useState(0)
    const [color, setColor] = useState("#1976d2")
    const [knobValue, setKnobValue] = useState(20)

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
        </Container>
    )
}

export default AdvancedUIShowcase

