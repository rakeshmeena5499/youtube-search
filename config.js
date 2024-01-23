require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
};

module.exports = config;
