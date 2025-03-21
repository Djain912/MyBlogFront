import React, { Suspense, lazy, useEffect, useState } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import bg from "../assets/bg.webp";
import Loader from "./Loader";

// Lazy load the Carddisplay component
const Carddisplay = lazy(() => import("./Carddisplay"));

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState("");
  const fullText = "Hello Coders";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Typewriter effect
  useEffect(() => {
    if (isTyping) {
      if (typedText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 150);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setIsTyping(true);
          setTypedText("");
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }
  }, [typedText, isTyping]);

  const handleGetStartedClick = () => {
    // Smooth scroll to the Carddisplay section
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when link is clicked
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating navbar that appears on scroll */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollPosition > 100 
            ? "bg-gray-900/90 backdrop-blur-md shadow-lg py-3" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl z-20">
            <span className="text-blue-400">{'<'}</span>
            CodeBlog
            <span className="text-blue-400">{'/>'}</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center text-gray-300 focus:outline-none z-20"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/getpost" className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
              Articles
            </Link>
            <Link to="/about" className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link 
              to="/subscribe" 
              className="px-3 py-2 text-gray-300 hover:text-white transition-colors bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Subscribe
            </Link>
          </div>
          
          {/* Mobile menu */}
          <div 
            className={`fixed inset-0 bg-gray-900/95 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-300 ease-in-out z-10 ${
              mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <div className="flex flex-col items-center space-y-6 text-lg">
              <Link 
                to="/" 
                className="px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/getpost" 
                className="px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={closeMobileMenu}
              >
                Articles
              </Link>
              <Link 
                to="/about" 
                className="px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                to="/subscribe" 
                className="px-5 py-3 mt-2 text-gray-200 hover:text-white transition-colors bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg"
                onClick={closeMobileMenu}
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero section with parallax effect */}
      <div
        className="relative flex items-center justify-center min-h-screen overflow-hidden"
      >
        {/* Background image with parallax effect */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollPosition * 0.5}px)`,
            filter: 'brightness(0.6)'
          }}
        ></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900 z-10"></div>
        
        {/* Animated code particles */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 text-gray-600/20 text-6xl font-mono transform -rotate-12 animate-pulse">
            {"<div>"}
          </div>
          <div className="absolute top-2/3 right-1/4 text-gray-600/20 text-4xl font-mono transform rotate-12 animate-pulse delay-300">
            {"const { data } = await"}
          </div>
          <div className="absolute bottom-1/4 left-1/3 text-gray-600/20 text-5xl font-mono transform -rotate-6 animate-pulse delay-700">
            {"function()"}
          </div>
        </div>
        
        {/* Hero content */}
        <div className="hero-content text-neutral-content text-center z-20">
          <div className="max-w-md">
            <div className="mb-2 text-blue-400 font-mono">{"// welcome to my blog"}</div>
            <h1 className="mb-5 text-5xl md:text-6xl font-bold">
              <span className="relative inline-block">
                {typedText}
                <span className={`absolute -right-4 top-0 h-full w-2 bg-blue-400 ${isTyping && typedText.length < fullText.length ? 'animate-blink' : 'opacity-0'}`}></span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              </span>
            </h1>
            <p className="mb-8 text-lg">
              Documenting my coding experiences and solutions to real-world problems.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={handleGetStartedClick}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                Explore Articles
              </button>
              <Link
                to="/about"
                className="px-8 py-3 bg-transparent border border-gray-400 hover:border-white text-white font-medium rounded-lg transition-colors duration-300"
              >
                About Me
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
      
      {/* Articles section with header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-16">
        <div className="container mx-auto px-4">
          {/* Section header with animated background */}
          <div className="relative mb-16 text-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            </div>
            {/* <h2 className="relative inline-block bg-gradient-to-r from-gray-900 to-gray-800 px-6 text-3xl font-bold text-white">
              Recent Articles
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </h2> */}
          </div>
          
          {/* Carddisplay component */}
          <Suspense fallback={
            <div className="flex justify-center items-center py-20">
              <Loader />
            </div>
          }>
            <Carddisplay />
          </Suspense>
          
          {/* View all button */}
          <div className="text-center mt-12">
            <Link
              to="/getpost"
              className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-colors duration-300"
            >
              View All Articles
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}