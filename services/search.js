const { google } = require("googleapis");
const { YOUTUBE_API_KEY } = require("../config");

const searchForNewVideos = (publishedAfter) => {
  google
    .youtube("v3")
    .search.list({
      key: YOUTUBE_API_KEY,
      part: "snippet",
      q: "Finance",
      publishedAfter: publishedAfter,
      maxResults: 5,
    })
    .then((response) => {
      console.log("Search successful...");
      const { data } = response;
      const videoDetails = data.items.map((item) => item.snippet);
      console.log(videoDetails[0].thumbnails);
    })
    .catch((err) => {
      console.log("Search failed!!!");
      console.error(err);
    });
};


module.exports = searchForNewVideos;