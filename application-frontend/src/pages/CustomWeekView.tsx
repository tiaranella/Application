import { useMemo } from 'react';
import { startOfWeek, endOfWeek, addDays, subWeeks, addWeeks, format, isSameDay } from 'date-fns';
import type { Event as CalendarEvent } from 'react-big-calendar';

interface CustomWeekViewProps {
  date: Date;
  events: CalendarEvent[];
}

export default function CustomWeekView({ date, events }: CustomWeekViewProps) {
    const days = useMemo(() => {
        const start = startOfWeek(date, {weekStartsOn: 0});
        return Array.from({ length: 7}).map((_, i) => addDays(start, i));
    }, [date]);

    return (
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 h-full">
        {days.map((day) => {
            const dayEvents = events.filter((e) => e.start && isSameDay(e.start, day));

            return (
            <div 
                key={day.toISOString()} 
                className={`w-48 flex-shrink-0 border rounded-2xl p-4 flex flex-col min-h-[200px] transition-colors
                ${isSameDay(day, new Date()) ? 'border-[#1e3a8a] bg-blue-50/30' : 'border-gray-200 bg-white'}`}
            >
                <h3 className="font-display font-bold text-gray-900">{format(day, 'EEE')}</h3>
                <p className="text-gray-500 text-sm mb-4">{format(day, 'd')}</p>

                {dayEvents.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                    <span className="text-sm text-gray-400">No events</span>
                </div>
                ) : (
                <div className="space-y-3">
                    {dayEvents.map((event) => (
                    <div key={event.resource} className="bg-indigo-50 p-3 rounded-xl text-sm border border-indigo-100">
                        <div className="text-xs text-[#1e3a8a] font-bold mb-1">
                        {event.start && format(event.start, 'HH:mm')}
                        </div>
                        <div className="text-gray-700 font-medium truncate">{event.title}</div>
                    </div>
                    ))}
                </div>
                )}
            </div>
            );
        })}
        </div>
    );
}

CustomWeekView.range = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
}

CustomWeekView.navigate = (date: Date, action: string) => {
    switch (action) {
        case 'PREV': 
            return subWeeks(date, 1);
        case 'NEXT': 
            return addWeeks(date, 1);
        default: 
        return date;
    }
};

CustomWeekView.title = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = endOfWeek(date, { weekStartsOn: 0 });
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;
};