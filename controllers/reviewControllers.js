const {
  addNewReview,
  getAllReviews,
  getOneReview,
  updateOneReview,
  deleteOneReview,
} = require("../db/reviewDb");
const { isTokenValid } = require("../utils/jwt");

const addReview = async (req, res) => {
  const { movieId, rating, comment } = req.body;
  const token = req.headers.authorization;

  try {
    //check token on user
    const isAValidToken = isTokenValid(token);

    if (!isAValidToken.id) {
      return res.status(404).json({ success: false, message: "Unvalid token" });
    }
    const newReview = { movieId, userId: isAValidToken.id, rating, comment };
    const review = await addNewReview(newReview);
    if (!review) {
      return req.status(400).json({
        sucess: false,
        message: "something went wrong with adding review",
      });
    }
    res.status(201).json({ sucess: true, review });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await getAllReviews();
    if (!reviews) {
      return res.status(400).json({ sucess: false, message: "No reviews" });
    }
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error });
  }
};

const getReview = async (req, res) => {
  const id = req.params.id;
  try {
    const review = await getOneReview(id);
    if (!review) {
      return res.status(400).json({ sucess: false, message: "No review" });
    }
    res.status(200).json({ success: true, review });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error });
  }
};

const updateReview = async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization;
  try {
    //check token on user
    const isAValidToken = isTokenValid(token);
    const review = await getOneReview(id);
    if (!isAValidToken.id) {
      return res.status(404).json({ success: false, message: "Unvalid token" });
    }
    //make sure that its the chosen user that wrote the review
    if (isAValidToken.id != review.userId) {
      return res.status(404).json({
        success: false,
        message: "You can't update a review written by someone else",
      });
    }
    //check valid key fields from req.body
    const reqbody = req.body;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["rating", "comment"];
    const updatedReview = await updateOneReview(
      updates,
      allowedUpdates,
      review,
      reqbody
    );
    if (!updatedReview) {
      return res.status(404).json({
        sucess: false,
        message: "Not valid keys to update, movie was not updates",
      });
    }
    res.status(200).json({ sucess: true, updatedReview });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error });
  }
};

const deleteReview = async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization;
  try {
    //check to see that token is valid
    const isAValidToken = isTokenValid(token);
    const review = await getOneReview(id);
    if (!isAValidToken.id) {
      return res.status(404).json({ success: false, message: "Unvalid token" });
    }
    //make sure that its the chosen user that wrote the review
    if (isAValidToken.id != review.userId) {
      return res.status(404).json({
        success: false,
        message: "You can't remove a review written by someone else",
      });
    }
    if (!review) {
      return res
        .status(400)
        .json({ sucess: false, message: "No review could be found" });
    }
    await deleteOneReview(review);
    res
      .status(200)
      .json({ success: true, message: "Review sucessfully removed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error });
  }
};
module.exports = {
  addReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};
