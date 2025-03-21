import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from './Loader';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://server-vpao.onrender.com/getposts/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load the post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 flex items-center justify-center bg-red-600/20 rounded-full mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-medium text-white mb-2">Error</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
        >
          Back to Posts
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 flex items-center justify-center bg-yellow-600/20 rounded-full mb-4">
          <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-medium text-white mb-2">Post Not Found</h2>
        <p className="text-gray-400 mb-6">We couldn't find the post you're looking for.</p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
        >
          Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back button */}
        <Link
          to="/getpost"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all posts
        </Link>

        {/* Main content card */}
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
          {/* Featured image */}
          <div className="relative h-80 md:h-96 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-24"></div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            {/* Category tag */}
            <div className="inline-block px-3 py-1 text-sm bg-blue-600/20 text-blue-400 rounded-full mb-4">
              {post.category}
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            {/* Subtitle */}
            <h2 className="text-xl text-gray-300 mb-8">{post.subtitle}</h2>
            
            {/* Content divider */}
            <div className="w-16 h-1 bg-blue-500 mb-8"></div>
            
            {/* Main content */}
            <div
              dangerouslySetInnerHTML={{ __html: post.description }}
              className="prose prose-invert prose-blue max-w-none"
            />
          </div>
        </div>
        
        {/* Share and related section could go here */}
      </div>
    </div>
  );
}