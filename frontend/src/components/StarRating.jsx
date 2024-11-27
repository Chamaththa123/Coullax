import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStar as faStarEmpty } from "@fortawesome/free-solid-svg-icons";

export const StarRating = ({ rating, maxStars = 5, onClick, size  }) => {
  const handleClick = (value) => {
    if (onClick) {
      onClick(value);
    }
  };

  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className="text-yellow-500 cursor-pointer"
          size={size}
          onClick={() => handleClick(i)}
        />
      );
    } else {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStarEmpty}
          className="text-gray-400 cursor-pointer"
          size={size}
          onClick={() => handleClick(i)}
        />
      );
    }
  }

  return <div className="flex space-x-1">{stars}</div>;
};
