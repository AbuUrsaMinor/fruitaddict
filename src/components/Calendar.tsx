import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { useFruitStore } from '../store/fruitStore';
import type { CalendarDay } from '../types';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DayCell = ({ day, fruits }: { day: CalendarDay; fruits: any[] }) => {
    const fruitCounts = useMemo(
        () =>
            day.consumption.reduce<Record<string, number>>((acc, entry) => {
                acc[entry.fruitId] = (acc[entry.fruitId] ?? 0) + entry.quantity;
                return acc;
            }, {}),
        [day.consumption]
    );

    return (
        <div
            className={clsx(
                'min-h-24 p-2 border border-gray-200',
                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                day.isToday && 'ring-2 ring-blue-600'
            )}
        >
            <p
                className={clsx(
                    'text-sm font-semibold',
                    !day.isCurrentMonth && 'text-gray-400'
                )}
            >
                {format(day.date, 'd')}
            </p>
            <div className="mt-1 flex flex-wrap gap-1">
                {fruits.map((fruit) => {
                    const count = fruitCounts[fruit.id] ?? 0;
                    if (count === 0) return null;
                    return (
                        <div key={fruit.id} className="flex items-center text-sm">
                            <span>{fruit.icon}</span>
                            <span className="ml-1 text-xs text-gray-600">×{count}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export function Calendar() {
    const { currentDate, days, nextMonth, prevMonth } = useCalendar();
    const fruits = useFruitStore((state) => state.fruits ?? []);

    const monthlyStats = useMemo(() => {
        const getStats = useFruitStore.getState().getMonthlyStats;
        return getStats(currentDate);
    }, [currentDate]);

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-3 flex items-center justify-between border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={prevMonth}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        aria-label="Previous month"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        aria-label="Next month"
                    >
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-200">
                {weekDays.map((day) => (
                    <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium">
                        {day}
                    </div>
                ))}
                {days.map((day) => (
                    <DayCell key={day.date.toISOString()} day={day} fruits={fruits} />
                ))}
            </div>
            <div className="border-t p-4">
                <h3 className="text-lg font-semibold mb-2">Monthly Total</h3>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                        <span className="font-medium">Total:</span>
                        <span className="ml-2">{monthlyStats.totalCount}</span>
                    </div>
                    {fruits.map((fruit) => (
                        <div key={fruit.id} className="flex items-center">
                            <span>{fruit.icon}</span>
                            <span className="ml-1">{monthlyStats.byFruit[fruit.id] ?? 0}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
