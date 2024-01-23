const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const cors = require("cors");
const { MONGODB_URI, PORT } = require("./config");
const videoRouter = require("./routes/videoRoute");
const searchForNewVideos = require("./services/search");

const app = express();

mongoose.connect(MONGODB_URI);

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB on port ${PORT}`);
});

app.use(cors());

app.use(express.json());

app.use("/api/videos", videoRouter);

let currDateTime = "2024-01-23T17:50:25Z";

const getNewVideos = async (intervalInSeconds) => {
  setInterval(async () => {
    try {
      const videos = await searchForNewVideos(currDateTime);
      await axios.post("http://localhost:3000/api/videos/save", {
        videos,
      });
    } catch (error) {
      console.error("Error loading new videos:", error.message);
    }
  }, intervalInSeconds * 1000);
};

getNewVideos(10);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

