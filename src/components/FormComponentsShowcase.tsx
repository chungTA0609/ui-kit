"use client"

import { useState } from "react"
import { Container, Grid, Typography, Paper } from "@mui/material"
import { AutoComplete } from "../ui/AutoComplete/AutoComplete"
import { Calendar } from "../ui/Calendar/Calendar"
import { InputNumber } from "../ui/InputNumber/InputNumber"
import { Chips } from "../ui/Chips/Chips"
import { RadioGroup } from "../ui/Radio/Radio"
import { CheckboxGroup } from "../ui/Checkbox/Checkbox"
import { Switch } from "../ui/Switch/Switch"

const cityOptions = [
    { label: "Chicago", value: "chicago" },
    { label: "Los Angeles", value: "los-angeles" },
    { label: "New York", value: "new-york" },
]
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
    const [radioValue, setRadioValue] = useState<string>()
    const [checkboxValues, setCheckboxValues] = useState<string[]>([])
    const [switchValue, setSwitchValue] = useState(false)
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
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-medium mb-4">RadioButton</h3>
                    <RadioGroup options={cityOptions} value={radioValue} onChange={setRadioValue} />
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-4">Checkbox</h3>
                    <CheckboxGroup options={cityOptions} value={checkboxValues} onChange={setCheckboxValues} />
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-4">Input Switch</h3>
                    <Switch checked={switchValue} onChange={setSwitchValue} />
                </div>
            </div>
        </Container>
    )
}

export default FormComponentsShowcase

