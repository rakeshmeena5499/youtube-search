const express = require("express");
const videosRouter = express.Router();
const videoModel = require("../models/videoModel");

videosRouter.get("/", async (req, res) => {
  console.log("Fetching videos...");

  const pageNumber = Number(req.query.page);
  const itemsPerPage = Number(req.query.limit);

  const videos = await videoModel.find({})
    .sort({ publishedAt: "desc" })
    .skip(pageNumber)
    .limit(itemsPerPage);

  res.status(200).json({ videos });
});

videosRouter.get("/search", async (req, res) => {
  console.log("Searching videos in the database...");

  const query = req.query.q;

  const videos = await videoModel.find({});
  const filteredVideos = videos.filter((video) => {
    if (video.title.includes(query) || video.description.includes(query)) {
      return video;
    }
  });

  res.status(200).json(filteredVideos);
});

videosRouter.post("/save", async (req, res) => {
  console.log("Storing video details to the database...");

  const videosToStore = req.body.videos;

  const videoObjects = videosToStore.map((video) => new videoModel(video));

  const savePromises = videoObjects.map((video) => video.save());

  const savedVideos = await Promise.all(savePromises);

  savedVideos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  res.status(201).json({ latestDate: savedVideos[0].publishedAt });
});

module.exports = videosRouter;
