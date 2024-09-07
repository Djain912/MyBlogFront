import React from 'react';

const Card = ({ title, subtitle, imgSrc, link }) => {
  return (
    <div className="card w-80 bg-base-100 shadow-md m-4">
      <figure>
        <img src={imgSrc} alt={title} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white text-lg font-bold truncate">{title}</h2>
        <p className="text-sm text-white truncate">{subtitle}</p>
        <a href={link} className="btn btn-primary mt-4">Read More</a>
      </div>
    </div>
  );
};

export default Card;
