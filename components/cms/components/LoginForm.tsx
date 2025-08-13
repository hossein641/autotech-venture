// components/cms/components/LoginForm.tsx
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<{success: boolean, error?: string}>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    const result = await onLogin(credentials.email, credentials.password);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">AutoTech CMS</h1>
          <p className="text-gray-600">Sign in to manage your blog</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@atechv.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin123"
              required
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: admin@atechv.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
};
