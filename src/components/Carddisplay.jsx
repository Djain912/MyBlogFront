import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

export default function Carddisplay() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://myblogbackend-fk9u.onrender.com/getrecentposts');
        const data = await response.json();
        setArticles(data.slice(0, 10)); // Fetching up to 10 most recent posts
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex flex-wrap justify-center ">
      {articles.map((article, index) => (
        <Card 
          key={index} 
          title={article.title} 
          subtitle={article.subtitle} 
          imgSrc={article.image} 
          link={`/post/${article._id}`}
        />
      ))}
    </div>
  );
}
