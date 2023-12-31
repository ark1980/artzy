// CreateReview.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReviewForProduct } from "../../store/reviews";
import { getProductDetails, getAllProducts } from "../../store/products";
import { useModal } from "../../context/Modal";
import "./CreateReview.css";

const CreateReview = ({ productId }) => {
  const [reviewData, setReviewData] = useState({ comment: "", rating: 1 });
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  // const singleProduct = useSelector((state) => state.products.singleProduct);

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createReviewForProduct(productId, reviewData));
    closeModal();
    await dispatch(getProductDetails(productId));
    await dispatch(getAllProducts());
    history.push(`/products/${productId}`);
  };

  return (
    <div className="create-review-container">
      <label className="labels" htmlFor="comment" style={{ display: "block" }}>
        Write your review
      </label>
      <form onSubmit={handleSubmit}>
        <textarea
          id="comment"
          name="comment"
          value={reviewData.comment}
          onChange={handleChange}
          placeholder="Your review"
          className="review-textarea-field"
        />
        <div className="rating">
          <label
            className="labels"
            htmlFor="rating"
            style={{ display: "block" }}
          >
            Stars
          </label>
          <input
            id="rating"
            type="number"
            name="rating"
            value={reviewData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="review-input-field"
          />
        </div>
        <button type="submit" className="review-submit-button">
          Submit Review
        </button>
        <button className="cancel-button" onClick={() => closeModal()}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
