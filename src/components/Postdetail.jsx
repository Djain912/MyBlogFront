import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://myblogbackend-fk9u.onrender.com/getposts/${postId}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

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
        className="prose prose-sm max-w-full"
      />
    </div>
  );
}
