import React, { useState, useEffect, useMemo } from 'react';
import Card from '../components/Card';
import Loader from '../components/Loader';

export default function Carddisplay() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://myblogbackend-fk9u.onrender.com/getrecentposts');
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
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {renderedCards}
    </div>
  );
}
