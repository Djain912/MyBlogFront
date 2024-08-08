import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postResponse = await fetch(`https://myblogbackend-fk9u.onrender.com/getposts/${postId}`);
        const postData = await postResponse.json();
        setPost(postData);

        const commentsResponse = await fetch(`https://myblogbackend-fk9u.onrender.com/getcomments/${postId}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

        const ratingResponse = await fetch(`https://myblogbackend-fk9u.onrender.com/getrating/${postId}`);
        const ratingData = await ratingResponse.json();
        setAverageRating(ratingData.averageRating);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      const response = await fetch(`https://myblogbackend-fk9u.onrender.com/addcomment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: newComment }),
      });

      const data = await response.json();
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`https://myblogbackend-fk9u.onrender.com/addrating/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });

      const updatedRatingResponse = await fetch(`https://myblogbackend-fk9u.onrender.com/getrating/${postId}`);
      const updatedRatingData = await updatedRatingResponse.json();
      setAverageRating(updatedRatingData.averageRating);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  if (!post) {
    return <Loader />;
  }

  return (
    <div className="container shadow-xl border border-white rounded-xl my-4 break-words mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mt-2 mb-4">{post.title}</h1>
      <img src={post.image} alt={post.title} className="w-full h-auto mb-4" />
      <h2 className="text-xl mb-4">{post.subtitle}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: post.description }}
        className="prose prose-sm max-w-full"
      />

      {/* Rating Section */}
      <div className="my-4">
        <h3 className="text-2xl mb-2">Rate this post</h3>
        <form onSubmit={handleRatingSubmit}>
          <input 
            type="number" 
            min="1" 
            max="5" 
            value={rating} 
            onChange={(e) => setRating(parseInt(e.target.value))} 
            className="border rounded p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Rating</button>
        </form>
        <p className="mt-2">Average Rating: {averageRating}</p>
      </div>

      {/* Comments Section */}
      <div className="my-4">
        <h3 className="text-2xl mb-2">Comments</h3>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            className="border rounded p-2 w-full mb-2"
            placeholder="Write a comment..."
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Comment</button>
        </form>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="border-b border-gray-200 py-2">
              {comment.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
