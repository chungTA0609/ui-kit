"use client"

import { useState } from "react"
import { Container, Grid, Typography, Paper } from "@mui/material"
import { AutoComplete } from "../ui/AutoComplete/AutoComplete"
import { Calendar } from "../ui/Calendar/Calendar"
import { InputNumber } from "../ui/InputNumber/InputNumber"
import { Chips } from "../ui/Chips/Chips"

const FormComponentsShowcase = () => {
    // AutoComplete state
    const [searchValue, setSearchValue] = useState("")
    const autoCompleteOptions = [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
    ]

    // Calendar state
    const [date, setDate] = useState<Date>()

    // InputNumber state
    const [number, setNumber] = useState<number>()

    // Chips state
    const [chips, setChips] = useState<string[]>(["sad"])

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Form Components
            </Typography>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            AutoComplete
                        </Typography>
                        <AutoComplete
                            options={autoCompleteOptions}
                            value={searchValue}
                            onChange={setSearchValue}
                            placeholder="Search"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Calendar
                        </Typography>
                        <Calendar value={date} onChange={setDate} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            InputNumber
                        </Typography>
                        <InputNumber value={number} onChange={setNumber} min={0} max={100} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Chips
                        </Typography>
                        <Chips value={chips} onChange={setChips} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default FormComponentsShowcase

