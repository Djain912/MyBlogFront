import React from 'react';
import { Link } from 'react-router-dom';
import pg from '../assets/pgnt.png';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6">
      <img 
        src={pg}
        alt="404 Not Found" 
        className="w-full max-w-md h-auto object-contain mb-8"
      />
      <h1 className="text-4xl font-bold text-center text-primary mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-center text-lg text-base-content mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back to Home
      </Link>
    </div>
  );
};

export default Error;
