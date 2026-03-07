import { create } from 'zustand';

// 1. Define the shape of our User data
interface User {
  id: number;
  email: string;
  name: string;
}

// 2. Define exactly what lives in our "backpack"
interface AuthState {
  token: string | null;
  user: User | null;
  
  // Actions to change the state
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

// 3. Create the actual store
// We use a trick to initialize it with values from localStorage just in case they refreshed the page!
export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('access_token') || null,
  user: JSON.parse(localStorage.getItem('user_data') || 'null'),

  // The function we call when they successfully log in
  setAuth: (token, user) => {
    // Save to local storage so it survives a page refresh
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    
    // Update the Zustand state so React re-renders immediately
    set({ token, user });
  },

  // The function we call when they click "Logout"
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    set({ token: null, user: null });
  },
}));
