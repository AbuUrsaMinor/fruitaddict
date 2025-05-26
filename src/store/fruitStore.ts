import { endOfMonth, isWithinInterval, parseISO, startOfMonth } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ConsumptionEntry, Fruit, MonthlyStats } from '../types';

interface FruitStore {
    fruits: Fruit[];
    entries: ConsumptionEntry[];
    addFruit: (name: string, icon: string) => void;
    removeFruit: (id: string) => void;
    addEntry: (fruitId: string, quantity?: number) => void;
    removeEntry: (entryId: string) => void;
    getMonthlyStats: (date: Date) => MonthlyStats;
}

const defaultFruits: Fruit[] = [
    { id: 'banana', name: 'Banana', icon: '🍌' },
    { id: 'apple', name: 'Apple', icon: '🍎' },
    { id: 'orange', name: 'Orange', icon: '🍊' },
];

export const useFruitStore = create<FruitStore>()(
    persist(
        (set, get) => ({
            fruits: defaultFruits,
            entries: [],

            addFruit: (name: string, icon: string) => {
                const id = uuidv4();
                set((state) => ({
                    fruits: [...(state.fruits ?? []), { id, name, icon }],
                }));
            },

            removeFruit: (id: string) => {
                set((state) => ({
                    fruits: (state.fruits ?? []).filter((fruit) => fruit.id !== id),
                    entries: (state.entries ?? []).filter((entry) => entry.fruitId !== id),
                }));
            },

            addEntry: (fruitId: string, quantity: number = 1) => {
                const id = uuidv4();
                set((state) => ({
                    entries: [
                        ...(state.entries ?? []),
                        {
                            id,
                            fruitId,
                            timestamp: new Date().toISOString(),
                            quantity,
                        },
                    ],
                }));
            },

            removeEntry: (entryId: string) => {
                set((state) => ({
                    entries: (state.entries ?? []).filter((entry) => entry.id !== entryId),
                }));
            },

            getMonthlyStats: (date: Date) => {
                const entries = get().entries ?? [];
                const start = startOfMonth(date);
                const end = endOfMonth(date);

                const monthEntries = entries.filter((entry) =>
                    isWithinInterval(parseISO(entry.timestamp), { start, end })
                );

                const stats: MonthlyStats = {
                    totalCount: 0,
                    byFruit: {},
                };

                monthEntries.forEach((entry) => {
                    stats.totalCount += entry.quantity;
                    stats.byFruit[entry.fruitId] = (stats.byFruit[entry.fruitId] ?? 0) + entry.quantity;
                });

                return stats;
            },
        }),
        {
            name: 'fruit-storage',
            version: 1,
            skipHydration: true,
            merge: (persistedState: any, currentState) => ({
                ...currentState,
                ...persistedState,
                fruits: persistedState?.fruits ?? defaultFruits,
                entries: persistedState?.entries ?? [],
            }),
        }
    )
);
