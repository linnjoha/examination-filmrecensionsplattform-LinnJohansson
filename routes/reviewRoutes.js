const { Router } = require("express");
const {
  addReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewControllers");

const router = Router();

router.post("/", addReview);

router.get("/", getReviews);

router.get("/:id", getReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

module.exports = router;
