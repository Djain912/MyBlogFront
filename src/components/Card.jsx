import React from 'react';

const Card = ({ title, subtitle, imgSrc, link }) => {
  return (
    <div className="w-80 mx-4 my-6 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl bg-gray-900">
      {/* Image container with zoom effect on hover */}
      <div className="overflow-hidden h-48">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      
      {/* Content section below the image */}
      <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-900">
        <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">{title}</h2>
        <p className="text-gray-300 mb-4 line-clamp-2">{subtitle}</p>
        
        <div className="flex items-center justify-between">
          <a
            href={link}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium group"
          >
            Read Article
            <svg
              className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;