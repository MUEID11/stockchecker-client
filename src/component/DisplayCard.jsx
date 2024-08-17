import React from 'react';
import { CiStar } from 'react-icons/ci';
import { FiDollarSign } from 'react-icons/fi';


const DisplayCard = ({product}) => {
    const {name, image, category, description, ratings, creationDate, price} = product;
  return (
    <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <img 
        className="object-cover object-center w-full max-h-fit" 
        src={image} 
        alt="avatar"
      />

      <div className="flex items-center px-6 py-3 bg-green-900 min-h-20">
        <h4 className="mx-1 font-semibold text-white">{name}</h4>
      </div>

      <div className="px-6 py-4">
        <h5 className="text-xl font-semibold text-gray-800 dark:text-white">{category}</h5>
        <p className="py-2 text-gray-700 dark:text-gray-400">
         {description.slice(0, 50)} . . .
        </p>

        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <span>Price: </span>
          <h1 className="px-2 text-sm flex items-center">{price} <FiDollarSign className='ml-2'/></h1>
        </div>

        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          {/* Location pin icon */}
          <span className='flex items-center'>Rating: {ratings} <CiStar className='ml-2 font-extrabold'/></span>
          
        </div>

        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          {/* Email icon */}
            <span>Creation Date: </span>
          <h1 className="px-2 text-sm">{creationDate}</h1>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
