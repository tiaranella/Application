import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

interface EventData {
  id: number;
  title: string;
  description: string | null;
  date: string;
  location: string;
  capacity: number | null;
  isPublic?: boolean;
}

interface EditEventModalProps {
  event: EventData; 
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditEventModal({ event, onClose, onSuccess }: EditEventModalProps) {
    const { token } = useAuthStore();
    
    const [eventTitle, setEventTitle] = useState(event.title || '');
    const [description, setDescription] = useState(event.description || '');
    
    const eventDateObj = new Date(event.date);
    const [date, setDate] = useState(eventDateObj.toISOString().split('T')[0]);
    const [time, setTime] = useState(eventDateObj.toTimeString().slice(0, 5));
    
    const [location, setLocation] = useState(event.location || '');
    const [capacity, setCapacity] = useState(event.capacity ? event.capacity.toString() : '');
    const [visibility, setVisibility] = useState('public');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEditEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!eventTitle || !description || !date || !time || !location) {
        toast.error('Please fill in all required fields.');
        return;
        }
        setIsSubmitting(true);

    const requestBody = {
      title: eventTitle,
      description: description || null,
      date: new Date(`${date}T${time}`),
      location: location,
      capacity: capacity ? parseInt(capacity, 10) : null,
      isPublic: visibility === 'public'
    };

    try {
        const response = await fetch(`http://localhost:8080/events/${event.id}`, {
            method: 'PATCH', 
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) throw new Error('Failed to update event');

        toast.success('Event updated successfully!');
        onSuccess();

    } catch {
      toast.error('Could not update event.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-display font-bold text-gray-900">Edit Event</h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Update the details for your event</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleEditEvent} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Event Title <span className="text-red-500">*</span></label>
            <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition-all text-sm" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Description <span className="text-red-500">*</span></label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition-all text-sm resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Date <span className="text-red-500">*</span></label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#1e3a8a] text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Time <span className="text-red-500">*</span></label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#1e3a8a] text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Location <span className="text-red-500">*</span></label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#1e3a8a] text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Capacity</label>
              <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#1e3a8a] text-sm" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Visibility</label>
            <div className="grid grid-cols-2 gap-3">
              <div onClick={() => setVisibility('public')} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${visibility === 'public' ? 'bg-blue-50/50 border-blue-200 ring-1 ring-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${visibility === 'public' ? 'border-[#1e3a8a] bg-[#1e3a8a]' : 'border-gray-300'}`}></div>
                <div className="flex-1"><p className="text-sm font-bold text-gray-900 leading-tight">Public</p></div>
              </div>
              <div onClick={() => setVisibility('private')} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${visibility === 'private' ? 'bg-blue-50/50 border-blue-200 ring-1 ring-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${visibility === 'private' ? 'border-[#1e3a8a] bg-[#1e3a8a]' : 'border-gray-300'}`}></div>
                <div className="flex-1"><p className="text-sm font-bold text-gray-900 leading-tight">Private</p></div>
              </div>
            </div>
          </div>

        </form>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
          <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold rounded-xl text-gray-600 hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button type="submit" onClick={handleEditEvent} disabled={isSubmitting} className="px-6 py-2.5 text-sm font-bold rounded-xl text-white bg-[#1e3a8a] hover:bg-blue-800 transition-colors flex items-center gap-2 disabled:opacity-70">
            {isSubmitting ? <span className="loading loading-spinner loading-xs"></span> : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}