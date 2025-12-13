import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = React.useState(0); 

  return (
    <div className='flex gap-1'>
      {[1,2,3,4,5].map((star) => (
        <FaStar
          key={star}
          size={24}
          className='cursor-pointer'
          color={star <= (hover || rating) ? "#ffc107" : "#e4e5e3"}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setRating(star)} 
        />
      ))}
    </div>
  );
};

export default StarRating;
