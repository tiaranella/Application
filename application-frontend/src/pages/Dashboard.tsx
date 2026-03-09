import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

interface Event {
  id: number;
  title: string;
  description: string | null;
  date: string;
  location: string;
  capacity: number | null;
  organizer: { id: number; name: string };
  _count: { participants: number };
}

export default function Dashboard() {
  const { token } = useAuthStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/events', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch {
        toast.error('Could not load events.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 mt-2">
        <h1 className="text-4xl font-display font-extrabold text-black">Discover Events</h1>
        <p className="text-gray-500 text-lg mt-1 font-medium">Find and join exciting events happening around you</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner text-[#1e3a8a] loading-lg"></span>
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">Public</span>
              </div>
              <h2 className="text-xl font-display font-bold text-gray-900 mb-2 line-clamp-1">{event.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1">{event.description || "No description provided."}</p>
              
              <div className="space-y-3 mb-6 font-display font-medium text-gray-600">
                <div className="flex items-center text-sm gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                
                <div className="flex items-center text-sm gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="truncate">{event.location}</span>
                </div>
                
                <div className="flex items-center text-sm gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  {event._count.participants} / {event.capacity || 'Unlimited'} attending
                </div>
              </div>

              <button className="w-full py-2.5 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-bold rounded-xl shadow-sm transition-colors mt-auto">Join Event</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <h3 className="text-lg font-bold text-gray-700">No events found</h3>
        </div>
      )}
    </div>
  );
}