const { Review } = require("../models/reviewModel");

const getOneMovieReviews = async (id) => {
  return await Review.find({ movieId: id });
};
const getOneReview = async (id) => {
  return await Review.findOne({ _id: id });
};
const getAllReviews = async () => {
  return await Review.find();
};

const addNewReview = async (newReview) => {
  const review = new Review(newReview);
  return await review.save();
};

const updateOneReview = async (updates, allowedUpdates, review, reqbody) => {
  const isValidKeys = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidKeys) {
    return false;
  }
  updates.forEach((update) => (review[update] = reqbody[update]));
  return await review.save();
};

const deleteOneReview = async (review) => {
  return await Review.findByIdAndDelete(review._id);
};

module.exports = {
  getOneMovieReviews,
  addNewReview,
  getAllReviews,
  getOneReview,
  updateOneReview,
  deleteOneReview,
};
