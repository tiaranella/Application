import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Calendar, dateFnsLocalizer, type Event as CalendarEvent } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomWeekView from './CustomWeekView';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DEFAULT_UI_DURATION_MINUTES = 30;

interface RawEvent {
  id: number;
  title: string;
  date: string;
}

export default function MyEvents() {
  const { token } = useAuthStore();
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'month' | 'week'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (!token) return;
    const fetchMyEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/users/me/events', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Failed to fetch events');
        
        const rawData: RawEvent[] = await response.json();

        const formattedEvents = rawData.map(event => {
          const startDate = new Date(event.date);
          
          const fallbackMs = DEFAULT_UI_DURATION_MINUTES * 60 * 1000;
          const endDate = new Date(startDate.getTime() + fallbackMs); 
          
          return {
            title: event.title,
            start: startDate,
            end: endDate, 
            resource: event.id, 
          };
        });

        setCalendarEvents(formattedEvents);

      } catch {
        toast.error('Could not load your calendar events.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyEvents();
  }, [token]);

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#1e3a8a',
        borderRadius: '6px',
        color: 'white',
        border: 'none',
        display: 'block',
        fontWeight: 'bold',
        fontSize: '12px',
        padding: '2px 5px'
      }
    };
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      
      {/* Page Header */}
      <div className="mb-6 mt-2 flex-shrink-0">
        <h1 className="text-4xl font-display font-extrabold text-black">My Events</h1>
        <p className="text-gray-500 text-lg mt-1 font-medium">View and manage your event calendar</p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 min-h-[600px]">
        {isLoading ? (
          <div className="h-full flex justify-center items-center"><span className="loading loading-spinner text-[#1e3a8a] loading-lg"></span></div>
        ) : (
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            date={currentDate}
            onNavigate={(newDate) => setCurrentDate(newDate)}
            
            views={{
              month: true, 
              week: CustomWeekView 
            }}
            view={currentView}
            onView={(newView) => setCurrentView(newView as 'month' | 'week')}
            
            eventPropGetter={eventStyleGetter}
            onSelectEvent={(event) => alert(`You clicked: ${event.title}`)}
            className="font-sans text-gray-700"
          />
        )}
      </div>

    </div>
  );
}
