import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll position for parallax and navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollPosition > 100 
          ? "bg-gray-900/90 backdrop-blur-md shadow-lg py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          <span className="text-blue-400">{'<'}</span>
          CodeBlog
          <span className="text-blue-400">{'/>'}</span>
        </Link>
        
        {/* Mobile menu button */}
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-900/95 backdrop-blur-md rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/getpost" className="text-gray-300 hover:text-white">Articles</Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
            </li>
          </ul>
        </div>
        
        {/* Desktop menu */}
        <div className="hidden lg:flex space-x-1 md:space-x-4">
          <Link to="/" className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/getpost" className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
            Articles
          </Link>
          <Link to="/about" className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link to="/contact" className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
        
        {/* Subscribe button */}
        <div className="hidden lg:block">
          <Link
            to="/subscribe"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
}