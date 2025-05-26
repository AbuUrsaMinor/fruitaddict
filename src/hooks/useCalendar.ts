import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    isSameDay,
    isSameMonth,
    isToday,
    startOfDay,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { useCallback, useMemo, useState } from 'react';
import { useFruitStore } from '../store/fruitStore';
import type { CalendarDay } from '../types';

export const useCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const entries = useFruitStore((state) => state.entries ?? []);

    const days = useMemo(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const calendarStart = startOfWeek(monthStart);
        const calendarEnd = endOfWeek(monthEnd);

        return eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map(
            (date): CalendarDay => {
                const dayStart = startOfDay(date);
                return {
                    date,
                    isCurrentMonth: isSameMonth(date, monthStart),
                    isToday: isToday(date),
                    consumption: entries.filter((entry) =>
                        isSameDay(new Date(entry.timestamp), dayStart)
                    ),
                };
            }
        );
    }, [currentDate, entries]);

    const nextMonth = useCallback(
        () => setCurrentDate((current) => addMonths(current, 1)),
        []
    );

    const prevMonth = useCallback(
        () => setCurrentDate((current) => subMonths(current, 1)),
        []
    );

    return {
        currentDate,
        days,
        nextMonth,
        prevMonth,
    };
};
