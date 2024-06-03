const {
  addNewMovie,
  searchOneMovie,
  searchAllMovies,
  updateOneMovie,
  deleteOneMovie,
  sumMovieRatings,
} = require("../db/movieDb");
const { getOneMovieReviews } = require("../db/reviewDb");
const { isUserAuth } = require("../utils/isUserAuth");

//add movie with token
const addMovie = async (req, res) => {
  const token = req.headers.authorization;
  const { title, director, releaseYear, genre } = req.body;
  const movie = { title, director, releaseYear, genre };
  try {
    //check if token is valid and if user.role = Admin
    const authUser = await isUserAuth(token);
    if (!authUser) {
      res.status(404).json({
        sucess: false,
        message: "Not authorized by token or user role",
      });
    }

    const newMovie = await addNewMovie(movie);
    res.status(201).json({ sucess: true, newMovie });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ sucess: false, error });
  }
};

//get all movies
const getMovies = async (req, res) => {
  try {
    const movies = await searchAllMovies();
    res.status(200).json({ sucess: true, movies });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ sucess: false, error });
  }
};

//get one movie with req params
const getMovie = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await searchOneMovie(id);

    if (!movie) {
      return res.status(404).json({ sucess: false, message: "No movie found" });
    }
    res.status(200).json({ sucess: true, movie });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ sucess: false, error });
  }
};

const updateMovie = async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization;
  try {
    const movie = await searchOneMovie(id);
    //check if token is valid and if user.role = Admin
    const authUser = await isUserAuth(token);
    if (!authUser) {
      res.status(404).json({
        sucess: false,
        message: "Not authorized by token or user role",
      });
    }
    if (!movie) {
      return res.status(404).json({
        sucess: false,
        message: "No movie found by given id",
      });
    }
    //check valid key fields from req.body
    const reqbody = req.body;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "director", "releaseYear", "genre"];

    const updatedMovie = await updateOneMovie(
      updates,
      allowedUpdates,
      movie,
      reqbody
    );
    if (!updatedMovie) {
      return res.status(404).json({
        sucess: false,
        message: "Not valid keys to update, movie was not updates",
      });
    }

    res.status(200).json({ sucess: true, updatedMovie });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ sucess: false, error });
  }
};

//get all the reviews on one movie
const getMovieReviews = async (req, res) => {
  const id = req.params.id;
  try {
    const moviewReviews = await getOneMovieReviews(id);
    if (!moviewReviews.length) {
      return res.status(400).json({
        sucess: false,
        message: "no reviews could be found on chosen movie",
      });
    }
    res.status(200).json({ success: true, moviewReviews });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error });
  }
};

const deleteMovie = async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization;
  try {
    const movie = await searchOneMovie(id);
    //check if token is valid and if user.role = Admin
    const authUser = await isUserAuth(token);
    if (!movie) {
      return res.status(404).json({
        sucess: false,
        message: "No movie found by given id",
      });
    }
    if (!authUser) {
      return res.status(404).json({
        sucess: false,
        message: "unauthorized user",
      });
    }
    await deleteOneMovie(id);
    res
      .status(200)
      .json({ success: true, message: `${movie.title} successfully removed` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

const getRatings = async (req, res) => {
  try {
    const result = await sumMovieRatings();
    if (!result) {
      return res.status(404).json({
        sucess: false,
        message: "something went wrong",
      });
    }
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error });
  }
};
module.exports = {
  addMovie,
  getMovies,
  getMovie,
  updateMovie,
  getMovieReviews,
  deleteMovie,
  getRatings,
};
