export interface Fruit {
    id: string;
    name: string;
    icon: string;
}

export interface ConsumptionEntry {
    id: string;
    fruitId: string;
    timestamp: string;
    quantity: number;
}

export interface DailyConsumption {
    date: string;
    entries: ConsumptionEntry[];
}

export interface MonthlyStats {
    totalCount: number;
    byFruit: Record<string, number>;
}

export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    consumption: ConsumptionEntry[];
}
