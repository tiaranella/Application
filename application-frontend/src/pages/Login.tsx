import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// 1. Define the Yup Schema
const schema = yup.object({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

export default function Login() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Incorrect email or password. Please try again.');
            }
        throw new Error('Server is not response.');
      }

      setAuth(result.access_token, result.user);

    } catch {
        toast.remove();
      toast.error('Could not load events.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">      
      <div className="flex flex-col justify-center items-center p-8 sm:p-12 md:p-24">
        <div className="w-full max-w-md mb-8">
          <span className="flex items-center gap-2 text-[#1e3a8a] font-bold text-xl">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-2 9a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /></svg>
            Evento
          </span>
        </div>

        <div className="w-full max-w-md mb-8">
          <h1 className="text-5xl font-display font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Hey, welcome back to your special place</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-5" autoComplete="off">
          <div className="flex flex-col relative">
            <div className="absolute top-0 left-0 pl-4 pt-[14px] flex pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input 
              type="email" 
              placeholder="Email Address" 
              autoComplete="new-email"
              className={`w-full pl-11 pr-4 py-3 rounded-lg border bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
              {...register('email')} 
            />
            {errors.email && <span className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col relative">
            <div className="absolute top-0 left-0 pl-4 pt-[14px] flex pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              type="password" 
              placeholder="Password" 
              autoComplete="new-password"
              className={`w-full pl-11 pr-4 py-3 rounded-lg border bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'}`} 
              {...register('password')}
            />
            {errors.password && <span className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.password.message}</span>}
          </div>

          <button 
            type="submit" 
            className="w-full sm:w-[140px] py-3 px-4 bg-[#1e3a8a] hover:bg-[#4f46e5] text-white font-semibold rounded-lg shadow-md transition-colors disabled:opacity-50 mt-4" 
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          
        </form>

        <div className="w-full max-w-md mt-8 text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-[#1e3a8a] font-bold hover:underline">Sign Up</Link>
        </div>

      </div>

      <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
           <img 
            src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Event Atmosphere" 
            className="w-full h-full object-cover object-[25%_0%] scale-125 origin-top opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
        </div>
      </div>

    </div>
  );
}
