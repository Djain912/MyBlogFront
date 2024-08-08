// src/pages/SubscribePage.js
import React, { useState } from 'react';
import 'daisyui/dist/full.css'; // Import DaisyUI styles

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
      const response = await fetch('https://myblogbackend-fk9u.onrender.com/subscribe', {
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
        setMessage('Subscription failed. Please try again.');
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
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Subscribe to Our Newsletter</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <button
          type="submit"
          className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <div className={`mt-4 alert ${alertType === 'success' ? 'alert-success' : 'alert-error'}`}>
          <div>
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribePage;
