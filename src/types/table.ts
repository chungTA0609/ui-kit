export interface Agent {
    id: string
    name: string
    avatar: string
}

export interface TableData {
    id: string
    name: string
    country: {
        name: string
        code: string
    }
    agent: Agent
    date: string
    balance: number
    status: "UNQUALIFIED" | "PROPOSAL" | "QUALIFIED" | "NEW" | "RENEWAL"
    activity: number
    verified: boolean
}

export interface FilterState {
    name?: string
    country?: string[]
    agent?: string[]
    date?: [Date | null, Date | null]
    balance?: [number | null, number | null]
    status?: string[]
    activity?: [number | null, number | null]
    verified?: boolean | null
    search?: string
}

