import React, { useState, useEffect, useMemo } from 'react';
import Card from '../components/Card';
import Loader from '../components/Loader';

export default function CardDisplay() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://server-vpao.onrender.com/getrecentposts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const renderedCards = useMemo(() => {
    return articles.map((article, index) => (
      <Card
        key={index}
        title={article.title}
        subtitle={article.subtitle}
        imgSrc={article.image}
        link={`/post/${article._id}`}
      />
    ));
  }, [articles]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="bg-red-500/10 backdrop-blur-md border border-red-500/30 text-red-400 p-6 rounded-lg max-w-md text-center">
          <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="font-medium text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title with decorative elements */}
        <div className="text-center mb-16 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10">
            <span className="relative inline-block">
              Latest Articles
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Discover our most recent and thought-provoking content curated just for you</p>
        </div>
        
        {/* Cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {renderedCards}
        </div>
        
        {/* Decorative background elements */}
        <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>
      </div>
      
    </div>
  );
}