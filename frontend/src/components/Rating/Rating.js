import React from "react";
import { Rating } from "@mui/material";

export const RatingInput = ({ rating, onRatingChange }) => {
  if (rating !== 0) {
    return (
      <Rating name="read-only-rating" value={rating} readOnly precision={0.5} />
    );
  }

  return (
    <Rating
      name="editable-rating"
      value={0}
      onChange={(e, newValue) => onRatingChange(newValue)}
      precision={0.5}
    />
  );
};
