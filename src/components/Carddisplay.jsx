import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Loader from '../components/Loader';

export default function Carddisplay() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://myblogbackend-fk9u.onrender.com/getrecentposts');
        const data = await response.json();
        setArticles(data.slice(0, 10)); // Fetching up to 10 most recent posts
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {loading ? (
        <Loader /> // Show loader if loading
      ) : (
        articles.map((article, index) => (
          <Card 
            key={index} 
            title={article.title} 
            subtitle={article.subtitle} 
            imgSrc={article.image} 
            link={`/post/${article._id}`}
          />
        ))
      )}
    </div>
  );
}
