"use client"

import { useState } from "react"
import { RadioGroup } from "../ui/Radio/Radio"
import { CheckboxGroup } from "../ui/Checkbox/Checkbox"
import { Switch } from "../ui/Switch/Switch"

const cityOptions = [
    { label: "Chicago", value: "chicago" },
    { label: "Los Angeles", value: "los-angeles" },
    { label: "New York", value: "new-york" },
]

const FormControlsShowcase = () => {
    const [radioValue, setRadioValue] = useState<string>()
    const [checkboxValues, setCheckboxValues] = useState<string[]>([])
    const [switchValue, setSwitchValue] = useState(false)

    return (
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
    )
}

export default FormControlsShowcase

