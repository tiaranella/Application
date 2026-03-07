import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Login from './pages/Login';
import Register from './pages/Register';

const Dashboard = () => (
  <h1 className="text-3xl font-bold">Dashboard</h1>
);

function AppNavbar() {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null; 
  }

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 flex justify-between">
        <a className="text-xl font-bold text-primary">Evento</a>
        <div>
          <button onClick={() => useAuthStore.getState().logout()} className="btn btn-ghost btn-sm text-red-500">
            Logout
          </button>
        </div>
    </div>
  );
}

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} /> 
      <AppNavbar />

      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}