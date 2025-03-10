"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"

export type FilterRule = {
    matchType: "all" | "any"
    operator: "equals" | "startsWith" | "contains" | "endsWith"
    value: string
}

interface ColumnFilterProps {
    column: string
    onApply: (rules: FilterRule[]) => void
    onClose: () => void
    initialRules?: FilterRule[]
}

export const ColumnFilter: React.FC<ColumnFilterProps> = ({ column, onApply, onClose, initialRules = [] }) => {
    const [rules, setRules] = useState<FilterRule[]>(
        initialRules.length
            ? initialRules
            : [
                {
                    matchType: "all",
                    operator: "equals",
                    value: "",
                },
            ],
    )

    const handleAddRule = () => {
        setRules([
            ...rules,
            {
                matchType: "all",
                operator: "equals",
                value: "",
            },
        ])
    }

    const handleRemoveRule = (index: number) => {
        setRules(rules.filter((_, i) => i !== index))
    }

    const handleRuleChange = (index: number, field: keyof FilterRule, value: string) => {
        setRules(
            rules.map((rule, i) => {
                if (i === index) {
                    return { ...rule, [field]: value }
                }
                return rule
            }),
        )
    }

    const handleClear = () => {
        setRules([
            {
                matchType: "all",
                operator: "equals",
                value: "",
            },
        ])
    }

    const handleApply = () => {
        onApply(rules)
        onClose()
    }

    return (
        <div className="column-filter" onClick={(e) => e.stopPropagation()}>
            {rules.map((rule, index) => (
                <div key={index} className="column-filter__rule">
                    {index === 0 && (
                        <select
                            className="column-filter__select"
                            value={rule.matchType}
                            onChange={(e) => handleRuleChange(index, "matchType", e.target.value)}
                        >
                            <option value="all">Match All</option>
                            <option value="any">Match Any</option>
                        </select>
                    )}

                    <select
                        className="column-filter__select"
                        value={rule.operator}
                        onChange={(e) => handleRuleChange(index, "operator", e.target.value)}
                    >
                        <option value="equals">Equals</option>
                        <option value="startsWith">Starts with</option>
                        <option value="contains">Contains</option>
                        <option value="endsWith">Ends with</option>
                    </select>

                    <input
                        type="text"
                        className="column-filter__input"
                        placeholder={`Search by ${column.toLowerCase()}`}
                        value={rule.value}
                        onChange={(e) => handleRuleChange(index, "value", e.target.value)}
                    />

                    {rules.length > 1 && (
                        <button className="column-filter__remove" onClick={() => handleRemoveRule(index)}>
                            ×
                        </button>
                    )}
                </div>
            ))}

            <button className="column-filter__add" onClick={handleAddRule}>
                <Plus size={14} />
                Add Rule
            </button>

            <div className="column-filter__actions">
                <button className="column-filter__clear" onClick={handleClear}>
                    Clear
                </button>
                <button className="column-filter__apply" onClick={handleApply}>
                    Apply
                </button>
            </div>
        </div>
    )
}

