import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path ? 'bg-[#1e3a8a] text-white' : 'text-gray-600 hover:bg-gray-100';

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden font-sans">
      <aside className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out relative
        ${isSidebarOpen ? 'w-[250px]' : 'w-[80px]'}`}>
        
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 text-gray-500 z-10">
          <svg className={`w-4 h-4 transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className={`flex items-center h-[70px] border-b border-gray-100 overflow-hidden ${isSidebarOpen ? 'px-6 justify-start' : 'justify-center'}`}>
          <span className="flex items-center gap-2 text-[#1e3a8a] font-bold text-2xl font-display whitespace-nowrap">
            <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-2 9a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            </svg>
            {isSidebarOpen && "Evento"}
          </span>
        </div>

        <nav className={`flex-1 space-y-2 overflow-hidden py-4 ${isSidebarOpen ? 'px-4' : 'px-2'}`}>
          <Link to="/dashboard" 
            className={`flex items-center py-3 rounded-xl font-bold transition-all duration-200 
            ${isActive('/dashboard')} 
            ${isSidebarOpen ? 'gap-3 px-4 justify-start' : 'justify-center'}`}>
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {isSidebarOpen && <span className="whitespace-nowrap">Public Events</span>}
          </Link>

          <Link to="/dashboard/my-events" 
            className={`flex items-center py-3 rounded-xl font-bold transition-all duration-200 
            ${isActive('/dashboard/my-events')} 
            ${isSidebarOpen ? 'gap-3 px-4 justify-start' : 'justify-center'}`}>
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {isSidebarOpen && <span className="whitespace-nowrap">My Events</span>}
          </Link>
        </nav>

        <div className={`border-t border-gray-100 flex flex-col items-center overflow-hidden ${isSidebarOpen ? 'p-4' : 'py-4 px-0 w-full'}`}>
          <div className={`flex items-center w-full mb-4 ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
            </div>
            {isSidebarOpen && (
              <div className="w-full overflow-hidden">
                <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>

          <button onClick={logout} className={`w-full py-2 px-0 text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center
            ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'}`} title="Log Out">
            <div className={`${isSidebarOpen ? 'w-12 flex justify-center' : ''}`}>
              <svg className={`w-6 h-6 flex-shrink-0 ${!isSidebarOpen ? 'translate-x-[2px]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">               
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            {isSidebarOpen && <span>Log out</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50 relative">
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 z-20">
          <span className="text-[#1e3a8a] font-bold text-xl font-display flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-2 9a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /></svg>
            Evento
          </span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> // X icon
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /> // Hamburger icon
              }
            </svg>
          </button>
        </header>

        <div className={`md:hidden absolute top-[65px] left-0 w-full bg-white border-b border-gray-200 shadow-lg z-10 transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
          <nav className="p-4 flex flex-col gap-2">
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold ${isActive('/dashboard')}`}>
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Public Events
            </Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/dashboard/my-events" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold ${isActive('/dashboard/my-events')}`}>
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              My Events
            </Link>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[#1e3a8a] bg-[#1e3a8a]/10 mt-2">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Create New Event
            </button>
            <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 mt-2">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Log Out
            </button>
          </nav>
        </div>

        <div className="hidden md:flex justify-end p-6 pb-0">
            <button className="px-6 py-2.5 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-bold rounded-lg shadow-md transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Create New Event
            </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 pb-8 pt-6 md:pt-0">
            <Outlet />
        </div>

      </main>
    </div>
  );
}
