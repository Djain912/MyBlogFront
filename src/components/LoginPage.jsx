import React, { useState } from 'react';
import 'daisyui/dist/full.css';  // Import DaisyUI styles

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://server-vpao.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('sumit-token', data.token); // Save JWT token to localStorage
        // Redirect or handle successful login
        window.location.href = '/admin';
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 bg-base-100 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <div className="alert alert-error mb-4">
            <div>
              <span>{error}</span>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          {/* <a href="/forgot-password" className="link">Forgot your password?</a> */}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
