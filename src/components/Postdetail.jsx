// components/PostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [userRating, setUserRating] = useState(0); // Set default rating to 0

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://myblogbackend-fk9u.onrender.com/getposts/${postId}`);
        const data = await response.json();
        setPost(data);

        // Check if user has already rated this post
        const savedRating = localStorage.getItem(`rating-${postId}`);
        if (savedRating) {
          setUserRating(parseInt(savedRating, 10));
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleRating = async (rating) => {
    if (userRating > 0) { // Check if the user has already rated
      alert('You have already rated this post.');
      return;
    }

    try {
      const response = await fetch(`https://myblogbackend-fk9u.onrender.com/rate/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserRating(rating);
        localStorage.setItem(`rating-${postId}`, rating);
        alert('Thank you for your rating!');
      } else {
        alert(data.error || 'Failed to submit rating.');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating.');
    }
  };

  if (!post) {
    return <Loader />;
  }

  return (
    <div key={post.id} className="container shadow-xl border border-white rounded-xl my-4 break-words mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mt-2 mb-4">{post.title}</h1>
      <img src={post.image} alt={post.title} className="w-full h-auto mb-4" />
      <h2 className="text-xl mb-4">{post.subtitle}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: post.description }}
        className="prose prose-sm max-w-full mb-4"
      />

      {/* Rating Component */}
      <div className="rating rating-md rating-half flex justify-center mb-4">
        {[...Array(10)].map((_, i) => (
          <input
            key={i}
            type="radio"
            name="rating-10"
            className={`mask mask-star-2 mask-half-${i % 2 === 0 ? '1' : '2'} bg-green-500`}
            checked={userRating === (i + 1) / 2}
            onChange={() => handleRating((i + 1) / 2)}
          />
        ))}
      </div>
    </div>
  );
}
