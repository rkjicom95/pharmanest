import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../features/review/reviewSlice";
import { getUser } from "../../utils/localStorage";
import { showError, showSuccess } from "../../utils/toastMessage";

const AddReview = ({ onClose }) => {
  const dispatch = useDispatch();
  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" });

  const handleAddReview = (e) => {
    e.preventDefault();

    // Validation
    if (!newReview.name || !newReview.text) {
      showError("Please fill in all fields.");
      return;
    }

    // 🔹 LocalStorage से Logged-in User Data लो
    const loggedInUser = getUser();
    if (!loggedInUser) {
      showError("You must be logged in to submit a review.");
      return;
    }

    // 🔹 Payload बनाओ जिसमें user ID शामिल हो
    const payload = {
      ...newReview,
      user: loggedInUser.id, // backend में user field चाहिए
    };

    // 🔹 Redux Thunk Dispatch
    dispatch(postReview(payload));

    console.log("Submitted Review:", payload);
    showSuccess(" Review submitted successfully!"); // Reset और modal close
    setNewReview({ name: "", rating: 5, text: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700/70 backdrop-blur-sm z-50 overflow-auto">
      <form
        onSubmit={handleAddReview}
        className="bg-white max-h-[90vh] w-full max-w-lg p-6 rounded-md overflow-auto"
      >
        <h3 className="text-lg font-semibold mb-4">Add Your Review</h3>

        <input
          type="text"
          placeholder="Your Name"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          className="w-full border px-3 py-2 rounded mb-3 focus:ring-0 focus:ring-teal-500"
        />

        <select
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: Number(e.target.value) })
          }
          className="w-full border px-3 py-2 rounded mb-3 focus:ring-0 focus:ring-teal-500"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>

        <textarea
          placeholder="Write your review..."
          value={newReview.text}
          rows={4}
          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
          className="w-full border px-3 py-2 rounded mb-4 focus:ring-0 focus:ring-teal-500"
        ></textarea>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded border border-gray-300 text-black hover:text-white hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
