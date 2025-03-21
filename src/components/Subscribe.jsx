import React, { useState } from 'react';

const SubscribePage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setAlertType('');

    try {
      const response = await fetch('https://server-vpao.onrender.com/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setAlertType('success');
        setMessage('Subscription successful!');
        setEmail('');
      } else {
        setAlertType('error');
        setMessage('Email already subscribed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertType('error');
      setMessage('Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          <span className="relative inline-block">
            Subscribe to Our Newsletter
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          </span>
        </h1>
        
        <p className="text-gray-300 mb-6 text-center">
          Get the latest articles and coding tips delivered straight to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <button
            type="submit"
            className={`px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-blue-500/30 transform hover:-translate-y-1'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        {message && (
          <div className={`mt-6 p-4 rounded-lg ${alertType === 'success' ? 'bg-green-500/20 border border-green-500 text-green-400' : 'bg-red-500/20 border border-red-500 text-red-400'}`}>
            <div className="flex items-center">
              {alertType === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
              <span>{message}</span>
            </div>
          </div>
        )}
        
        <p className="text-gray-400 text-sm mt-6 text-center">
          We respect your privacy and won't share your information.
        </p>
      </div>
    </div>
  );
};

export default SubscribePage;