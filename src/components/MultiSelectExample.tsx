"use client"

import { useState } from "react"
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
const MultiSelectExample = () => {
    const [selectedCountries, setSelectedCountries] = useState<string[]>(["au", "br", "cn", "eg"])
    const [selectedCity, setSelectedCity] = useState("istanbul")

    return (
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
    )
}

export default MultiSelectExample

