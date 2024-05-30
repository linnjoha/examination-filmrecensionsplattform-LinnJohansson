const { Movie } = require("../models/movieModel");

const addNewMovie = async (movie) => {
  const newMovie = new Movie(movie);
  return await newMovie.save();
};
const searchOneMovie = async (movie) => {
  return await Movie.findOne({ _id: movie });
};
const searchAllMovies = async () => {
  return await Movie.find();
};

const updateOneMovie = async (updates, allowedUpdates, movie, reqbody) => {
  const isValidKeys = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  console.log("isvalidkeys", isValidKeys);
  if (!isValidKeys) {
    return false;
  }
  updates.forEach((update) => (movie[update] = reqbody[update]));
  return await movie.save();
};

const deleteOneMovie = async (movie) => {
  return await Movie.findByIdAndDelete(movie);
};
module.exports = {
  addNewMovie,
  searchOneMovie,
  searchAllMovies,
  updateOneMovie,
  deleteOneMovie,
};
