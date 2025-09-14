import Review from "../models/reviewModel.js";

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { name, rating, text } = req.body;

    if (!name || !rating || !text) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Assuming you have req.user._id from authentication middleware
    const review = await Review.create({
      name,
      rating,
      text,
      user: req.body.user,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
