const express = require("express");
const videosRouter = express.Router();
const videoModel = require("../models/videoModel");

videosRouter.get("/", async (req, res) => {
  try {
    const pageNumber = Number(req.query.page) || 1;
    const itemsPerPage = Number(req.query.limit) || 10;

    const videos = await videoModel.find({})
      .sort({ publishedAt: 'desc' })
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.render('dashboard', { videos });
  } catch (error) {
      console.error('Error fetching videos:', error.message);
      res.status(500).send('Internal Server Error');
  }
});

videosRouter.get("/search", async (req, res) => {
  try {
    console.log("Searching videos in the database...");

    const query = req.query.q;
    const pageNumber = Number(req.query.page) || 1;
    const itemsPerPage = Number(req.query.limit) || 10;

    const allVideos = await videoModel.find(
      {
        $or: [
          { $text: { $search: query } }, 
          { title: { $regex: query, $options: 'i' } }, 
          { description: { $regex: query, $options: 'i' } },
        ],
      },
      { score: { $meta: 'textScore' } } 
    )
      .sort({ publishedAt: 'desc' })
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const videos = allVideos;

    res.render('dashboard', { videos });
  } catch(error){
      console.error('Error fetching videos: ', error.message);
      res.status(500).send('Interval Server Error');
  }
});

videosRouter.post("/save", async (req, res) => {
  try{
    console.log("Storing video details to the database...");

    const videosToStore = req.body.videos;

    const videoObjects = videosToStore.map((video) => new videoModel(video));

    const savePromises = videoObjects.map((video) => video.save());

    const savedVideos = await Promise.all(savePromises);

    savedVideos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    res.status(201).json({ latestDate: savedVideos[0].publishedAt });
  } catch(error){
    console.error('Error fetching videos: ', error.message);
    res.status(500).send('Interval Server Error');
  }
  
});

module.exports = videosRouter;
