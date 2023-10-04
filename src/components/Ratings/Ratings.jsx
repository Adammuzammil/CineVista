import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const Ratings = ({ rating, max }) => {
  const formattedRating = rating.toFixed(1);

  const ratingText = `${formattedRating}/${max}`;
  return (
    <div className="circleRating">
      <CircularProgressbar
        value={rating}
        maxValue={max}
        text={ratingText}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default Ratings;
