import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    text: {
      // Changed from 'comment' to 'text' to match your frontend
      type: String,
      required: [true, "Review text is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
