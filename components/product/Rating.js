import React from 'react';
import { IoMdStar } from 'react-icons/io';
import { IoMdStarOutline } from 'react-icons/io';
import { IoMdStarHalf } from 'react-icons/io';

const Rating = ({ value, review }) => {
  return (
    <div className={'flex items-center text-[#FFC000]'}>
      <span>
        {value >= 1 ? (
          <IoMdStar />
        ) : value >= 0.5 ? (
          <IoMdStarHalf />
        ) : (
          <IoMdStarOutline />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <IoMdStar />
        ) : value >= 1.5 ? (
          <IoMdStarHalf />
        ) : (
          <IoMdStarOutline />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <IoMdStar />
        ) : value >= 2.5 ? (
          <IoMdStarHalf />
        ) : (
          <IoMdStarOutline />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <IoMdStar />
        ) : value >= 3.5 ? (
          <IoMdStarHalf />
        ) : (
          <IoMdStarOutline />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <IoMdStar />
        ) : value >= 4.5 ? (
          <IoMdStarHalf />
        ) : (
          <IoMdStarOutline />
        )}
      </span>
      <span className={'text-[#747474] text-xs'}>
        {review && ` (${review})`}
      </span>
    </div>
  );
};

export default Rating;
