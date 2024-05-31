const { Movie } = require("../models/movieModel");
const { Review } = require("../models/reviewModel");
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

//check for valid keys and update
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

const sumMovieRatings = async () => {
  console.log("i movie ratings");
  return await Movie.aggregate([
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "movieId",
        as: "reviews",
      },
    },
    {
      $unwind: "$reviews",
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        director: { $first: "$director" },
        releaseYear: { $first: "$releaseYear" },
        genre: { $first: "$genre" },
        averageRating: { $avg: "$reviews.rating" },
      },
    },
  ]).exec((err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });
};
module.exports = {
  addNewMovie,
  searchOneMovie,
  searchAllMovies,
  updateOneMovie,
  deleteOneMovie,
  sumMovieRatings,
};
