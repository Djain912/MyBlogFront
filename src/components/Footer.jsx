import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await fetch('https://myblogback-0tsr72u7.b4a.run/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
        setEmail(''); // Clear the input field
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer bg-base-200 text-base-content p-10">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">IT Services</a>
        
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <Link to="/about" className="link link-hover">About us</Link>
        <Link to="/contact" className="link link-hover">Contact</Link>  
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <Link to="/tandc" className="link link-hover">Terms of use</Link> 
      </nav>
      <form onSubmit={handleSubscribe}>
        <h6 className="footer-title">Newsletter</h6>
        <fieldset className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="join">
            <input
              type="email"
              placeholder="username@site.com"
              className="input input-bordered join-item"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn w-[50%] mt-2 btn-primary join-item"
            disabled={loading}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
          {success && <p className="text-green-500 mt-2">Subscribed successfully!</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </fieldset>
      </form>
    </footer>
  );
}
