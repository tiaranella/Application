import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './pages/DashboardLayout';
import Dashboard from './pages/Dashboard';
import MyEvents from './pages/MyEvents';
// import CreateEvent from './pages/CreateEvent';

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <BrowserRouter>
      <Toaster position="top-center" />       
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        
        <Route path="/dashboard" element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
           <Route index element={<Dashboard />} />
           <Route path="my-events" element={<MyEvents />} />
        </Route>

        {/* <Route path="/create-event" element={<CreateEvent />} /> */}
        
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}
