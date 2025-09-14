import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../features/review/reviewSlice";

const Review = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();

  // Access reviews from Redux store
  const { reviews, loading, error } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <div className="space-y-10 mt-12">
      {/* Customer Reviews */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
          Customer Reviews
        </h3>

        {/* Loading or Error states */}
        {loading && <p className="text-gray-500">Loading reviews...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Show last 3 reviews */}
        {reviews && reviews.length > 0
          ? reviews.slice(0, 3).map((review) => (
              <div
                key={review._id || review.id}
                className="border-b border-gray-200 py-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">{review.name}</h4>
                  <div className="flex text-yellow-400">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-1">{review.text}</p>
              </div>
            ))
          : !loading && <p className="text-gray-500">No reviews yet.</p>}

        {/* Button to open AddReview modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          Write a Review
        </button>
      </section>
    </div>
  );
};

export default Review;
