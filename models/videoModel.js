const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  thumbnails: { type: Object, required: true },
  channelTitle: { type: String, required: true },
  publishedAt: { type: String, required: true },
});

videoSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject.__v;
    delete returnObject._id;
  },
});

const videoModel = mongoose.model("Video", videoSchema);

module.exports = videoModel;
