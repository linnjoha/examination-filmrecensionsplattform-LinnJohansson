require("dotenv").config();
const express = require("express");
const { connectToMongoDb } = require("./db/connectToDb");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const app = express();
const URL = process.env.URL;
const PORT = process.env.PORT || 3000;
connectToMongoDb();

app.use(express.json());

app.use("/", userRoutes);
app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);

app.listen(PORT, URL, () => {
  console.log(`Connected to http://${URL}:${PORT}`);
});
