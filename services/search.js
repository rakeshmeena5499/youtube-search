const { google } = require("googleapis");
const { YOUTUBE_API_KEY } = require("../config");

const searchForNewVideos = async (publishedAfter) => {
  try {
    const response = await google.youtube("v3").search.list({
      key: YOUTUBE_API_KEY,
      part: "snippet",
      q: "Investing",
      publishedAfter: publishedAfter,
      maxResults: 2,
    });

    console.log("Search successful...");
    const { data } = response;
    const videoDetails = data.items.map((item) => item.snippet);
    console.log("Videos Details: ", videoDetails);

    return videoDetails;
  } catch (err) {
    console.log("Search failed!!!");
    console.error(err);
    return searchForNewVideos(publishedAfter);
  }
};


module.exports = searchForNewVideos;