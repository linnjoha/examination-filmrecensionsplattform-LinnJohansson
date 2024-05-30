const { Router } = require("express");
const {
  addMovie,
  getMovies,
  updateMovie,
  getMovie,
  deleteMovie,
} = require("../controllers/movieControllers");
const router = Router();

router.post("/", addMovie);
router.get("/", getMovies);
router.get("/:id", getMovie);
router.put("/:id", updateMovie);
// router.get("/:id/reviews", getMovieReviews);
router.delete("/:id", deleteMovie);
module.exports = router;
