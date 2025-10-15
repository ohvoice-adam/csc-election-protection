import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, UserIcon } from 'lucide-react';
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    // For demo purposes, just navigate to home page
    navigate('/');
  };
  return <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <ShieldCheckIcon className="h-16 w-16 text-blue-600" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
            EP Defenders
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Protecting voter rights and ensuring electoral accessibility
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>
          </div>
          {error && <div className="text-red-600 text-sm text-center" role="alert">
              {error}
            </div>}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default LoginPage;