const mongoose = require("mongoose");

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb");
  } catch (error) {
    console.log("error connecting to mongodb", error.message);
  }
};

module.exports = { connectToMongoDb };
